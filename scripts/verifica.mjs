#!/usr/bin/env node
// Verifica il repository: slug unici, link rotti, note orfane,
// coerenza tra frontmatter e sezione "## Collegamenti", provenienza (origine e validata). Stampa un riepilogo.
// Uso: node scripts/verifica.mjs
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs'
import { join, dirname, basename, relative, resolve } from 'node:path'

const ROOT = resolve(dirname(new URL(import.meta.url).pathname), '..')
const IGNORA = new Set(['node_modules', '.git', '.github', '.vitepress', '_templates', 'scripts', '.claude'])
const NON_ANALIZZARE = new Set(['diario/2026-10-04-seed.md', 'CLAUDE.md'])
const CAMPO = {
  emozione: 'emozioni', concetto: 'concetti', fonte: 'fonti', simbolo: 'simboli',
  stile: 'stile', percorso: 'percorsi', spunto: 'spunti', idea: 'idee', ricerca: 'ricerche',
}
const CAMPI = Object.values(CAMPO)

const errori = []
const avvisi = []

function file(dir) {
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n)
    if (statSync(p).isDirectory()) return IGNORA.has(n) ? [] : file(p)
    return n.endsWith('.md') ? [p] : []
  })
}

function frontmatter(testo) {
  const m = testo.match(/^---\n([\s\S]*?)\n---\n/)
  if (!m) return {}
  const fm = {}
  for (const riga of m[1].split('\n')) {
    const r = riga.match(/^([\w-]+):\s*(.*)$/)
    if (!r) continue
    let v = r[2].trim()
    if (!v.startsWith('"')) v = v.replace(/\s+#.*$/, '')
    if (v.startsWith('[')) {
      v = v.slice(1, -1).split(',').map((x) => x.trim().replace(/^"|"$/g, '')).filter(Boolean)
    } else {
      v = v.replace(/^"|"$/g, '')
    }
    fm[r[1]] = v
  }
  return fm
}

function link(testo) {
  const senzaCodice = testo.replace(/```[\s\S]*?```/g, '').replace(/`[^`\n]*`/g, '')
  return [...senzaCodice.matchAll(/\]\(([^)\s]+)\)/g)]
    .map((m) => m[1])
    .filter((u) => !/^(https?:|mailto:|#)/.test(u))
}

function risolvi(da, url) {
  const pulito = decodeURIComponent(url.split('#')[0])
  return url.startsWith('/') ? join(ROOT, pulito) : join(dirname(da), pulito)
}

const slugDi = (p) => (basename(p) === 'index.md' ? basename(dirname(p)) : basename(p, '.md'))

// --- raccolta
const note = new Map() // percorso assoluto -> nota
const perSlug = new Map()
for (const p of file(ROOT)) {
  const rel = relative(ROOT, p)
  if (NON_ANALIZZARE.has(rel)) continue
  const testo = readFileSync(p, 'utf8')
  const n = { p, rel, testo, fm: frontmatter(testo), slug: slugDi(p) }
  note.set(p, n)
  if (basename(p) === 'README.md' || rel === 'index.md') continue
  if (perSlug.has(n.slug)) errori.push(`slug duplicato "${n.slug}": ${perSlug.get(n.slug).rel} e ${rel}`)
  else perSlug.set(n.slug, n)
}
// le note in _archivio/ restano fuori dai controlli su grafo e orfani (i link rotti si controllano comunque)
const archiviata = (n) => n.rel.startsWith('_archivio/')
const grafo = [...note.values()].filter((n) => CAMPO[n.fm.tipo] && !archiviata(n))

// --- link nel testo
const entranti = new Map([...note.values()].map((n) => [n.p, new Set()]))
for (const n of note.values()) {
  for (const url of link(n.testo)) {
    const dest = risolvi(n.p, url)
    if (!existsSync(dest)) { errori.push(`link rotto in ${n.rel}: ${url}`); continue }
    if (dest !== n.p && entranti.has(dest)) entranti.get(dest).add(n.p)
  }
}

// --- frontmatter e "## Collegamenti"
const vicini = new Map()
for (const n of grafo) {
  const daFm = new Set()
  for (const campo of [...CAMPI, 'fonte']) {
    const v = n.fm[campo]
    for (const s of Array.isArray(v) ? v : v ? [v] : []) {
      const dest = perSlug.get(s)
      if (!dest) { errori.push(`${n.rel}: "${campo}" cita lo slug inesistente "${s}"`); continue }
      const atteso = campo === 'fonte' ? 'fonti' : campo
      if (CAMPO[dest.fm.tipo] !== atteso) errori.push(`${n.rel}: "${s}" è un ${dest.fm.tipo}, non va in "${campo}"`)
      daFm.add(s)
    }
  }
  const sez = n.testo.match(/\n## Collegamenti\n([\s\S]*?)(?=\n## |$)/)
  if (!sez) { errori.push(`${n.rel}: manca la sezione "## Collegamenti"`); continue }
  const daCorpo = new Set(
    link(sez[1]).map((u) => note.get(risolvi(n.p, u))).filter(Boolean).map((d) => d.slug),
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
const ORIGINI = new Set(['seme', 'mia', 'claude'])
const TERRITORIO = new Set(['spunto', 'idea', 'ricerca'])
const ETICHETTA_PROPOSTA = /^>\s?\*\*Proposta di Claude, da validare\.\*\*/
const daValidare = { note: [], proposte: 0 }
// anche il nucleo può contenere blocchi proposta
const conProvenienza = [...grafo, ...[...note.values()].filter((x) => x.rel === 'nucleo.md')]
for (const n of conProvenienza) {
  const obbligatori = TERRITORIO.has(n.fm.tipo)
  const { origine, validata } = n.fm
  if (origine == null || origine === '') {
    if (obbligatori) errori.push(`${n.rel}: manca "origine" (seme | mia | claude)`)
  } else if (!ORIGINI.has(origine)) errori.push(`${n.rel}: "origine" vale "${origine}", ammessi: seme, mia, claude`)
  if (validata == null || validata === '') {
    if (obbligatori) errori.push(`${n.rel}: manca "validata" (true | false)`)
  } else if (validata !== 'true' && validata !== 'false') errori.push(`${n.rel}: "validata" vale "${validata}", ammessi: true, false`)
  const o = origine || 'seme'
  const v = validata === 'true' || validata === 'false' ? validata === 'true' : o !== 'claude'
  // solo ciò che ho portato io è sempre validato; il seme (compilato da Claude in chat) e le proposte di Claude possono non esserlo
  if (o === 'mia' && !v) errori.push(`${n.rel}: origine "mia" vuol dire già validata (validata: true)`)
  if (!v) daValidare.note.push(n.rel)

  // i blocchi proposta: avviso GitHub "> [!NOTE]" con l'etichetta esatta sulla riga dopo
  const righe = n.testo.split('\n')
  let codice = false
  righe.forEach((r, i) => {
    if (/^\s*(```|~~~)/.test(r)) codice = !codice
    if (codice) return
    if (/^>\s?\[!NOTE\]\s*$/i.test(r) && /^>\s?\*\*Propost/i.test(righe[i + 1] ?? '')) {
      if (!ETICHETTA_PROPOSTA.test(righe[i + 1])) avvisi.push(`${n.rel}: blocco proposta con etichetta diversa da "**Proposta di Claude, da validare.**" (riga ${i + 2})`)
      else daValidare.proposte++
    } else if (/^>\s?\*\*Proposta di Claude/.test(r) && !/^>\s?\[!NOTE\]/i.test(righe[i - 1] ?? '')) {
      avvisi.push(`${n.rel}: etichetta di proposta senza "> [!NOTE]" sulla riga prima (riga ${i + 1})`)
    }
  })
}

// collegamenti a senso unico (solo avviso: la bidirezionalità vale "dove ha senso")
for (const [s, vs] of vicini) {
  for (const v of vs) if (vicini.has(v) && !vicini.get(v).has(s)) avvisi.push(`collegamento a senso unico: ${s} → ${v}`)
}

// --- orfani: note senza nessun link entrante
for (const n of note.values()) {
  // README e home del sito (index.md alla radice) non hanno bisogno di link entranti
  if (basename(n.p) === 'README.md' || n.rel === 'index.md' || archiviata(n)) continue
  if (entranti.get(n.p).size === 0) errori.push(`nota orfana (nessun link entrante): ${n.rel}`)
}

// --- riepilogo
const perTipo = {}
for (const n of note.values()) {
  const t = n.fm.tipo || (basename(n.p) === 'README.md' ? 'readme' : n.rel === 'index.md' ? 'home' : 'altro')
  perTipo[t] = (perTipo[t] || 0) + 1
}
console.log('Note per tipo:')
for (const [t, c] of Object.entries(perTipo).sort((a, b) => b[1] - a[1])) console.log(`  ${t.padEnd(10)} ${c}`)
console.log(`  ${'totale'.padEnd(10)} ${note.size}`)

const grado = [...vicini].map(([s, vs]) => [s, vs.size]).sort((a, b) => b[1] - a[1])
console.log('\nLe 5 note più collegate:')
for (const [s, g] of grado.slice(0, 5)) console.log(`  ${String(g).padStart(3)}  ${perSlug.get(s).fm.titolo} (${s})`)

console.log(`\nDa validare (proposte di Claude): ${daValidare.note.length} note, ${daValidare.proposte} blocchi proposta.`)
for (const r of daValidare.note) console.log(`  - ${r}`)

for (const a of avvisi) console.log(`avviso: ${a}`)
if (errori.length) {
  console.error(`\n${errori.length} errori:`)
  for (const e of errori) console.error(`  - ${e}`)
  process.exit(1)
}
console.log('\nTutto in ordine: slug unici, nessun link rotto, nessuna nota orfana.')
