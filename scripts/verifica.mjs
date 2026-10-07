#!/usr/bin/env node
// Verifica il repository: slug unici, link rotti, note orfane,
// coerenza tra frontmatter e sezione "## Collegamenti", provenienza (origine e validata). Stampa un riepilogo.
// Uso: node scripts/verifica.mjs
//
// Legge le note con lo stesso codice del sito (.vitepress/core, .vitepress/shared: TypeScript che Node
// esegue da sé, dalla versione 22.18): stesso parser del frontmatter, stessi link, stesso riconoscitore
// del blocco proposta. Se le dipendenze sono installate (npm install), controlla anche che il sito veda
// gli stessi blocchi proposta del testo.
import { existsSync } from 'node:fs'
import { join } from 'node:path'

if (!process.features.typescript) {
  console.error(`Serve Node 22.18 o più recente (che esegue i file .ts): questo è Node ${process.versions.node}.`)
  process.exit(1)
}
const { archivio, ROOT, urlNelCorpo, risolvi, risolviNota, listaFm } = await import('../.vitepress/core/archivio.ts')
const { proposteDi, etichetteSbagliate } = await import('../.vitepress/core/blocchi.ts')
const { trovaSezione } = await import('../.vitepress/core/testo.ts')
const { CAMPI_LINK, ORIGINI, TIPI_TERRITORIO } = await import('../.vitepress/shared/tipi.ts')
const { provenienza } = await import('../.vitepress/shared/nota.ts')

const NON_ANALIZZARE = new Set(['diario/2026-10-04-seed.md', 'CLAUDE.md'])
/** Il campo del frontmatter che collega a ciascun tipo. */
const CAMPO = Object.fromEntries(Object.entries(CAMPI_LINK).map(([campo, tipo]) => [tipo, campo]))
const CAMPI = Object.keys(CAMPI_LINK)

const errori = []
const avvisi = []

const èReadme = (n) => n.rel.split('/').pop() === 'README.md'

// --- raccolta
const note = new Map() // percorso dalla radice -> nota
const perSlug = new Map()
for (const n of archivio().file) {
  if (NON_ANALIZZARE.has(n.rel)) continue
  note.set(n.rel, n)
  if (èReadme(n) || n.rel === 'index.md') continue
  if (perSlug.has(n.slug)) errori.push(`slug duplicato "${n.slug}": ${perSlug.get(n.slug).rel} e ${n.rel}`)
  else perSlug.set(n.slug, n)
}
// le note in _archivio/ restano fuori dai controlli su grafo e orfani (i link rotti si controllano comunque)
const grafo = [...note.values()].filter((n) => CAMPO[n.tipo] && !n.archiviata)

// --- link nel testo
const entranti = new Map([...note.keys()].map((rel) => [rel, new Set()]))
for (const n of note.values()) {
  for (const url of urlNelCorpo(n.corpo)) {
    const dest = risolvi(n.rel, url)
    if (dest == null || !existsSync(join(ROOT, dest))) { errori.push(`link rotto in ${n.rel}: ${url}`); continue }
    const nota = risolviNota(n.rel, url)
    if (nota !== n.rel && entranti.has(nota)) entranti.get(nota).add(n.rel)
  }
}

// --- frontmatter e "## Collegamenti"
const vicini = new Map()
for (const n of grafo) {
  const daFm = new Set()
  for (const campo of [...CAMPI, 'fonte']) {
    for (const s of listaFm(n.fm[campo])) {
      const dest = perSlug.get(s)
      if (!dest) { errori.push(`${n.rel}: "${campo}" cita lo slug inesistente "${s}"`); continue }
      const atteso = campo === 'fonte' ? 'fonti' : campo
      if (CAMPO[dest.tipo] !== atteso) errori.push(`${n.rel}: "${s}" è un ${dest.tipo}, non va in "${campo}"`)
      daFm.add(s)
    }
  }
  const sez = trovaSezione(n.corpo, 'Collegamenti')
  if (sez == null) { errori.push(`${n.rel}: manca la sezione "## Collegamenti"`); continue }
  const daCorpo = new Set(
    urlNelCorpo(sez).map((u) => note.get(risolviNota(n.rel, u))).filter(Boolean).map((d) => d.slug),
  )
  const soloFm = [...daFm].filter((s) => !daCorpo.has(s))
  const soloCorpo = [...daCorpo].filter((s) => !daFm.has(s))
  if (soloFm.length) errori.push(`${n.rel}: nel frontmatter ma non in Collegamenti: ${soloFm.join(', ')}`)
  if (soloCorpo.length) errori.push(`${n.rel}: in Collegamenti ma non nel frontmatter: ${soloCorpo.join(', ')}`)
  if (daFm.size < 2) avvisi.push(`${n.rel}: meno di due collegamenti`)
  vicini.set(n.slug, daFm)
}

// --- provenienza: "origine" (seme | mia | claude) e "validata" (true | false)
// obbligatori su spunti, idee e ricerche; facoltativi sulle note di mappa (se mancano: seme, true).
// "mia" è sempre validata; "seme" e "claude" possono essere false (le idee del seme sono proposte di Claude)
const daValidare = { note: [], proposte: 0 }
// anche il nucleo può contenere blocchi proposta
const conProvenienza = [...grafo, ...[...note.values()].filter((x) => x.rel === 'nucleo.md')]
for (const n of conProvenienza) {
  const obbligatori = TIPI_TERRITORIO.has(n.tipo)
  const { origine, validata } = n.fm
  if (origine == null) {
    if (obbligatori) errori.push(`${n.rel}: manca "origine" (seme | mia | claude)`)
  } else if (!ORIGINI.includes(origine)) errori.push(`${n.rel}: "origine" vale "${origine}", ammessi: seme, mia, claude`)
  if (validata == null) {
    if (obbligatori) errori.push(`${n.rel}: manca "validata" (true | false)`)
  } else if (validata !== 'true' && validata !== 'false') errori.push(`${n.rel}: "validata" vale "${validata}", ammessi: true, false`)
  const p = provenienza(n.fm)
  // solo ciò che ho portato io è sempre validato; il seme (compilato da Claude in chat) e le proposte di Claude possono non esserlo
  if (p.origine === 'mia' && !p.validata) errori.push(`${n.rel}: origine "mia" vuol dire già validata (validata: true)`)
  if (!p.validata) daValidare.note.push(n.rel)

  // i blocchi proposta: avviso GitHub "> [!NOTE]" con l'etichetta esatta sulla riga dopo
  daValidare.proposte += proposteDi(n.corpo).length
  for (const { riga, senzaAvviso } of etichetteSbagliate(n.corpo)) {
    const r = n.rigaCorpo + riga + 1
    avvisi.push(senzaAvviso
      ? `${n.rel}: etichetta di proposta senza "> [!NOTE]" sulla riga prima (riga ${r})`
      : `${n.rel}: blocco proposta con etichetta diversa da "**Proposta di Claude, da validare.**" (riga ${r})`)
  }
}

// --- il sito vede gli stessi blocchi proposta del testo? (il plugin markdown li numera: #proposta-N)
for (const e of await bloccoPropostaSulSito([...note.values()])) errori.push(e)

async function bloccoPropostaSulSito(tutte) {
  let md
  try {
    const { createMarkdownRenderer } = await import('vitepress')
    const { proposta } = await import('../.vitepress/proposta.ts')
    // senza evidenziazione del codice (non serve qui, e si risparmia il tempo di caricarla)
    md = await createMarkdownRenderer(ROOT, { highlight: (s) => s, config: (m) => m.use(proposta) }, '/', { warn() {}, info() {} })
  } catch {
    return [] // dipendenze non installate: il controllo si salta
  }
  const out = []
  for (const n of tutte) {
    if (!n.corpo.includes('[!')) continue
    // basta l'analisi (i plugin lavorano sui token): niente rendering, che su un link malformato si fermerebbe
    const sito = md.parse(n.corpo, { relativePath: n.rel, cleanUrls: true }).filter((t) => t.meta?.proposta).length
    const testo = proposteDi(n.corpo).length
    if (sito !== testo) out.push(`${n.rel}: il sito vede ${sito} blocchi proposta, il testo ${testo} (controlla "> [!NOTE]" e l'etichetta)`)
  }
  return out
}

// collegamenti a senso unico (solo avviso: la bidirezionalità vale "dove ha senso")
for (const [s, vs] of vicini) {
  for (const v of vs) if (vicini.has(v) && !vicini.get(v).has(s)) avvisi.push(`collegamento a senso unico: ${s} → ${v}`)
}

// --- orfani: note senza nessun link entrante
for (const n of note.values()) {
  // README e home del sito (index.md alla radice) non hanno bisogno di link entranti
  if (èReadme(n) || n.rel === 'index.md' || n.archiviata) continue
  if (entranti.get(n.rel).size === 0) errori.push(`nota orfana (nessun link entrante): ${n.rel}`)
}

// --- riepilogo
const perTipo = {}
for (const n of note.values()) {
  const t = n.fm.tipo ? n.tipo : èReadme(n) ? 'readme' : n.rel === 'index.md' ? 'home' : n.tipo
  perTipo[t] = (perTipo[t] || 0) + 1
}
console.log('Note per tipo:')
for (const [t, c] of Object.entries(perTipo).sort((a, b) => b[1] - a[1])) console.log(`  ${t.padEnd(10)} ${c}`)
console.log(`  ${'totale'.padEnd(10)} ${note.size}`)

const grado = [...vicini].map(([s, vs]) => [s, vs.size]).sort((a, b) => b[1] - a[1])
console.log('\nLe 5 note più collegate:')
for (const [s, g] of grado.slice(0, 5)) console.log(`  ${String(g).padStart(3)}  ${perSlug.get(s).titolo} (${s})`)

console.log(`\nDa validare (proposte di Claude): ${daValidare.note.length} note, ${daValidare.proposte} blocchi proposta.`)
for (const r of daValidare.note) console.log(`  - ${r}`)

for (const a of avvisi) console.log(`avviso: ${a}`)
if (errori.length) {
  console.error(`\n${errori.length} errori:`)
  for (const e of errori) console.error(`  - ${e}`)
  process.exit(1)
}
console.log('\nTutto in ordine: slug unici, nessun link rotto, nessuna nota orfana.')
