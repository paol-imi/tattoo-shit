// L'archivio letto dal disco: tutte le note .md, con frontmatter, corpo, tipo, slug e indirizzo sul sito.
// Lo usano la configurazione, i plugin markdown, i data loader e scripts/verifica.mjs (Node lo importa
// direttamente: niente dipendenze oltre a Node e a ../shared, import con l'estensione .ts, `import type` per i tipi).
//
// Una sola lettura per build: VitePress impacchetta configurazione e loader ciascuno per conto suo (ognuno con
// la sua copia di questo modulo), quindi la cache sta su globalThis. Vale finché i file non cambiano: a ogni
// richiesta (al più una volta ogni CONTROLLO ms) si confrontano nomi, date e dimensioni dei file, senza rileggerli.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs'
import { join, dirname, relative, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'
import { tipoDi, CAMPI_LINK } from '../shared/tipi.ts'
import { slugDaRel } from '../shared/nota.ts'

/** La radice del repository. */
export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
/** Il percorso del sito su GitHub Pages. */
export const BASE = '/tattoo-shit/'

/** Cartelle che non fanno parte dell'archivio. */
const IGNORA: ReadonlySet<string> = new Set(['node_modules', '.git', '.github', '.vitepress', '.claude', '_templates', 'scripts'])
/** File alla radice che non diventano pagine come le altre (README e CLAUDE fuori dal sito, index è la home). */
const FUORI_SITO: ReadonlySet<string> = new Set(['README.md', 'CLAUDE.md', 'index.md'])

/** I README delle cartelle diventano la pagina indice della cartella. */
export const REWRITES: Readonly<Record<string, string>> = {
  '_archivio/README.md': '_archivio/index.md',
  'inbox/README.md': 'inbox/index.md',
}

// --- frontmatter: chiavi semplici, liste inline; un valore vuoto vale null
export type Valore = string | string[] | null
export type Frontmatter = Record<string, Valore>

export function frontmatter(testo: string): { fm: Frontmatter; corpo: string; rigaCorpo: number } {
  const m = testo.match(/^---\n([\s\S]*?)\n---[ \t]*(?:\n|$)/)
  if (!m) return { fm: {}, corpo: testo, rigaCorpo: 0 }
  const fm: Frontmatter = {}
  for (const riga of m[1].split('\n')) {
    const r = riga.match(/^([\w-]+):\s*(.*)$/)
    if (!r) continue
    let v = r[2].trim()
    if (!v.startsWith('"')) v = v.replace(/\s+#.*$/, '')
    if (v.startsWith('[')) {
      fm[r[1]] = v.slice(1, -1).split(',').map((x) => x.trim().replace(/^"|"$/g, '')).filter(Boolean)
    } else {
      v = v.replace(/^"|"$/g, '')
      fm[r[1]] = v === '' ? null : v
    }
  }
  return { fm, corpo: testo.slice(m[0].length), rigaCorpo: m[0].split('\n').length - 1 }
}

/** Un valore del frontmatter come testo (una lista diventa il suo primo elemento), o null. */
export const testoFm = (v: Valore | undefined): string | null => (Array.isArray(v) ? v[0] ?? null : v ?? null)
/** Un valore del frontmatter come lista di testi non vuoti. */
export const listaFm = (v: Valore | undefined): string[] => (Array.isArray(v) ? v : v ? [v] : []).filter(Boolean)

/** Il testo di un file con gli a capo normalizzati (CRLF, CR) e senza BOM. */
const normalizza = (testo: string) => testo.replace(/^﻿/, '').replace(/\r\n?/g, '\n')

// --- le note
export interface Nota {
  /** percorso dalla radice, con "/" */
  rel: string
  /** percorso sul sito, senza base */
  link: string
  slug: string
  /** tipo dichiarato o dedotto dalla cartella */
  tipo: string
  /** gruppo della barra laterale e dei backlink */
  gruppo: string
  titolo: string
  fm: Frontmatter
  corpo: string
  /** l'indice (da 0) della riga del file con cui comincia il corpo, dopo il frontmatter */
  rigaCorpo: number
  archiviata: boolean
}

export function linkDi(rel: string): string {
  const r = REWRITES[rel] ?? rel
  return '/' + r.replace(/\.md$/, '').replace(/(^|\/)index$/, '$1')
}

const primoTitolo = (corpo: string) => corpo.match(/^#\s+(.+)$/m)?.[1].trim()

function nota(rel: string, testo: string): Nota {
  const { fm, corpo, rigaCorpo } = frontmatter(normalizza(testo))
  const archiviata = rel.startsWith('_archivio/')
  const tipo = tipoDi(rel, fm.tipo)
  const slug = slugDaRel(rel)
  return {
    rel, fm, corpo, rigaCorpo, slug, tipo, archiviata,
    link: linkDi(rel),
    gruppo: archiviata ? 'archivio' : tipo,
    titolo: testoFm(fm.titolo) || primoTitolo(corpo) || slug,
  }
}

export interface Archivio {
  /** tutti i file .md letti, compresi README, CLAUDE e la home alla radice (per scripts/verifica.mjs) */
  file: Nota[]
  /** le note che diventano pagine del sito (esclusa la home) */
  note: Nota[]
  /** tutti i file per percorso dalla radice */
  perRel: ReadonlyMap<string, Nota>
  /** i calcoli fatti sull'archivio (proposte, viste dei loader), per non rifarli */
  memo: Map<string, unknown>
}

/** Un calcolo sull'archivio fatto una volta sola, finché l'archivio non cambia. */
export function memo<T>(a: Archivio, chiave: string, calcola: () => T): T {
  if (!a.memo.has(chiave)) a.memo.set(chiave, calcola())
  return a.memo.get(chiave) as T
}

interface Voce { rel: string; impronta: string }

function elenco(dir: string, out: Voce[] = []): Voce[] {
  for (const d of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, d.name)
    if (d.isDirectory()) {
      if (!IGNORA.has(d.name)) elenco(p, out)
    } else if (d.name.endsWith('.md')) {
      const s = statSync(p)
      out.push({ rel: relative(ROOT, p).split(sep).join('/'), impronta: `${s.mtimeMs}:${s.size}` })
    }
  }
  return out
}

/** Ogni quanto, al più, si guarda se i file sono cambiati. */
const CONTROLLO = 250
interface Cache { impronta: string; controllato: number; archivio: Archivio }
const G = globalThis as typeof globalThis & { __atlanteArchivio?: Cache }

/** L'archivio, letto una volta e tenuto finché i file non cambiano. */
export function archivio(): Archivio {
  const ora = Date.now()
  const c = G.__atlanteArchivio
  if (c && ora - c.controllato < CONTROLLO) return c.archivio
  const voci = elenco(ROOT)
  const impronta = voci.map((v) => `${v.rel}|${v.impronta}`).join('\n')
  if (c && c.impronta === impronta) {
    c.controllato = ora
    return c.archivio
  }
  const file = voci.map((v) => nota(v.rel, readFileSync(join(ROOT, v.rel), 'utf8')))
  const a: Archivio = {
    file,
    note: file.filter((n) => !FUORI_SITO.has(n.rel)),
    perRel: new Map(file.map((n) => [n.rel, n])),
    memo: new Map(),
  }
  G.__atlanteArchivio = { impronta, controllato: ora, archivio: a }
  return a
}

/** Le note attive (fuori dall'archivio) per slug. */
export const perSlug = (a: Archivio): ReadonlyMap<string, Nota> =>
  memo(a, 'perSlug', () => new Map(a.note.filter((n) => !n.archiviata).map((n) => [n.slug, n])))

// --- link nel corpo
/** Gli indirizzi dei link markdown nel corpo, fuori dal codice, esclusi quelli esterni e le ancore. */
export function urlNelCorpo(corpo: string): string[] {
  const senzaCodice = corpo.replace(/```[\s\S]*?```/g, '').replace(/`[^`\n]*`/g, '')
  return [...senzaCodice.matchAll(/\]\(([^)\s]+)\)/g)].map((m) => m[1]).filter((u) => !/^(https?:|mailto:|#)/.test(u))
}

/** Il percorso dalla radice a cui punta un link scritto nella nota `da`; null se l'indirizzo non si decodifica. */
export function risolvi(da: string, url: string): string | null {
  let pulito: string
  try { pulito = decodeURIComponent(url.split('#')[0]) } catch { return null }
  if (!pulito) return null
  const assoluto = pulito.startsWith('/') ? join(ROOT, pulito) : join(ROOT, dirname(da), pulito)
  return relative(ROOT, assoluto).split(sep).join('/')
}

/** Come `risolvi`, ma un link a una cartella va al suo index.md o README.md (come sul sito). */
export function risolviNota(da: string, url: string): string | null {
  const rel = risolvi(da, url)
  if (rel == null) return null
  const assoluto = join(ROOT, rel)
  if (!existsSync(assoluto) || !statSync(assoluto).isDirectory()) return rel
  return ['index.md', 'README.md'].map((n) => (rel ? `${rel}/${n}` : n)).find((r) => existsSync(join(ROOT, r))) ?? rel
}

/** Le note (o i file) a cui puntano i link del corpo, senza doppioni e senza la nota stessa. */
export function linkInterni(da: string, corpo: string): string[] {
  const out = new Set<string>()
  for (const url of urlNelCorpo(corpo)) {
    const rel = risolviNota(da, url)
    if (rel != null && rel !== da) out.add(rel)
  }
  return [...out]
}

/** Gli slug collegati dal frontmatter, per campo. Il campo singolo `fonte` degli spunti va in testa alle fonti. */
export function collegamentiFm(n: Nota): Record<string, string[]> {
  const out: Record<string, string[]> = {}
  for (const campo of Object.keys(CAMPI_LINK)) {
    const v = campo === 'fonti' ? [...listaFm(n.fm.fonte), ...listaFm(n.fm.fonti)] : listaFm(n.fm[campo])
    const unici = [...new Set(v)]
    if (unici.length) out[campo] = unici
  }
  return out
}

// --- ordinamento: titolo senza articolo iniziale
const ARTICOLO = /^(il|lo|la|i|gli|le|un|uno|una|l'|l’|un')\s*/i
export const chiave = (t: string) => t.replace(/^["“«]/, '').replace(ARTICOLO, '')
export const perTitolo = (a: Nota, b: Nota) => chiave(a.titolo).localeCompare(chiave(b.titolo), 'it')

/** Data di ingresso nel repository (dalla storia git), per ordinare il diario a parità di data. */
function aggiuntoIl(rel: string): number {
  try {
    const out = execFileSync('git', ['log', '--diff-filter=A', '--follow', '--format=%at', '--', rel], {
      cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'],
    }).trim().split('\n').filter(Boolean)
    return out.length ? Number(out[out.length - 1]) : Infinity
  } catch {
    return Infinity
  }
}

/** Voci del diario tra `note`, dalla più recente. */
export function diario(note: readonly Nota[]): Nota[] {
  const data = (n: Nota) => testoFm(n.fm.data) ?? n.rel.split('/').pop()!.slice(0, 10)
  return note
    .filter((n) => n.gruppo === 'diario')
    .map((n) => ({ n, d: data(n), t: aggiuntoIl(n.rel) }))
    .sort((a, b) => b.d.localeCompare(a.d) || b.t - a.t || a.n.rel.localeCompare(b.n.rel))
    .map((x) => x.n)
}
