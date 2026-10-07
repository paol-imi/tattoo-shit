#!/usr/bin/env node
// Verifica il repository: slug unici, link rotti, note orfane,
// coerenza tra frontmatter e sezione "## Collegamenti", provenienza (origine e validata),
// schema dell'atlante (disciplina, filone, forma, anno, autore, influenzato-da). Stampa un riepilogo.
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
const { CAMPI_LINK, ORIGINI, TIPI_TERRITORIO, FORME, disciplinaDi } = await import('../.vitepress/shared/tipi.ts')
const { noteDiscipline, filoni, righeFiloniIllegibili, annoDi, filoneDi, autoriDi, influenzatoDaDi } =
  await import('../.vitepress/core/discipline.ts')
const { collegamentiProposti, chiaveCoppia } = await import('../.vitepress/core/proposte.ts')
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
// (le discipline non sono collegabili dal frontmatter, ma collegano le loro fonti rappresentative)
const grafo = [...note.values()].filter((n) => (CAMPO[n.tipo] || n.tipo === 'disciplina') && !n.archiviata)

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

// --- schema dell'atlante: discipline, filoni e campi di classificazione (non sono collegamenti)
// disciplina: slug di una nota in discipline/, solo sulle fonti; se manca vale quella della sottocartella,
// in fonti/opere è obbligatoria. Si controlla solo quando discipline/ ha delle note.
const discipline = noteDiscipline(archivio()).filter((d) => note.has(d.rel))
const slugDiscipline = new Set(discipline.map((d) => d.slug))
for (const d of discipline) {
  for (const r of righeFiloniIllegibili(d)) errori.push(`${d.rel}: riga di "## Filoni" fuori formato (- **Nome** (\`id\`, periodo): *motto*): ${r.trim()}`)
}
// filoni: id unici e diversi da ogni slug di nota
const filonePerId = new Map()
for (const f of filoni(archivio())) {
  if (perSlug.has(f.id)) errori.push(`discipline/${f.disciplina}.md: il filone "${f.id}" ha lo stesso nome della nota ${perSlug.get(f.id).rel}`)
  if (filonePerId.has(f.id)) errori.push(`filone "${f.id}" ripetuto: in ${filonePerId.get(f.id).disciplina} e in ${f.disciplina}`)
  else filonePerId.set(f.id, f)
}
for (const n of grafo) {
  const fm = n.fm
  const èFonte = n.tipo === 'fonte'
  if (fm.disciplina != null && !èFonte) errori.push(`${n.rel}: "disciplina" va solo sulle fonti`)
  const disciplina = disciplinaDi(n.rel, fm)
  if (èFonte && slugDiscipline.size) {
    if (disciplina == null) errori.push(`${n.rel}: manca "disciplina" (obbligatoria in fonti/opere)`)
    else if (!slugDiscipline.has(disciplina)) errori.push(`${n.rel}: "disciplina" vale "${disciplina}", che non è una nota in discipline/`)
  }
  const filone = filoneDi(n)
  if (filone != null) {
    const f = filonePerId.get(filone)
    if (!f) errori.push(`${n.rel}: "filone" vale "${filone}", che non è un filone di nessuna disciplina`)
    else if (f.disciplina !== disciplina) errori.push(`${n.rel}: il filone "${filone}" è di ${f.disciplina}, la nota è di ${disciplina ?? 'nessuna disciplina'}`)
  }
  if (fm.forma != null && !FORME.includes(fm.forma)) errori.push(`${n.rel}: "forma" vale "${fm.forma}", ammessi: ${FORME.join(', ')}`)
  if (fm.anno != null && annoDi(n) == null) errori.push(`${n.rel}: "anno" vale "${fm.anno}", serve un intero (negativo = a.C.)`)
  const fonti = new Set([...listaFm(fm.fonte), ...listaFm(fm.fonti)])
  const fuori = autoriDi(n).filter((s) => !fonti.has(s))
  if (fuori.length) errori.push(`${n.rel}: "autore" deve stare anche in "fonti": ${fuori.join(', ')}`)
  const collegati = vicini.get(n.slug) ?? new Set()
  const nonCollegati = influenzatoDaDi(n).filter((s) => !collegati.has(s))
  if (nonCollegati.length) errori.push(`${n.rel}: "influenzato-da" deve stare anche nei collegamenti: ${nonCollegati.join(', ')}`)
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

// collegamenti a senso unico (solo avviso: la bidirezionalità vale "dove ha senso").
// Non si segnalano: le proposte (una nota non validata ai due capi, o un collegamento proposto in un diario:
// il ritorno si aggiunge quando le approvo), i collegamenti verso domande e discipline e quelli
// che partono da una disciplina (le fonti non tornano alla disciplina con un collegamento: la dicono nel campo).
const coppieProposte = new Set(collegamentiProposti(archivio()).flatMap((c) => c.coppie.map(([x, y]) => chiaveCoppia(x, y))))
const senzaRitorno = new Set(['domanda', 'disciplina'])
const validata = (s) => provenienza(perSlug.get(s).fm).validata
for (const [s, vs] of vicini) {
  if (perSlug.get(s).tipo === 'disciplina' || !validata(s)) continue
  for (const v of vs) {
    if (!vicini.has(v) || vicini.get(v).has(s)) continue
    if (senzaRitorno.has(perSlug.get(v).tipo) || !validata(v) || coppieProposte.has(chiaveCoppia(s, v))) continue
    avvisi.push(`collegamento a senso unico: ${s} → ${v}`)
  }
}

// --- orfani: note senza nessun link entrante
for (const n of note.values()) {
  // README e home del sito (index.md alla radice) non hanno bisogno di link entranti
  if (èReadme(n) || n.rel === 'index.md' || n.archiviata) continue
  // una disciplina con le sue fonti rappresentative è collegata anche senza link entranti
  if (n.tipo === 'disciplina' && !n.archiviata && (vicini.get(n.slug)?.size ?? 0) > 0) continue
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
