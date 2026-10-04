// Lettura dell'archivio per il sito: note, frontmatter, link nel corpo.
// Lo usano la configurazione (barra laterale, menu) e i data loader (home, backlink).
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs'
import { join, dirname, relative, resolve, basename, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'

export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')

// cartelle e file che non diventano pagine
const IGNORA = new Set(['node_modules', '.git', '.github', '.vitepress', '.claude', '_templates', 'scripts'])
const FUORI_SITO = new Set(['README.md', 'CLAUDE.md', 'index.md'])

// i README delle cartelle diventano la pagina indice della cartella
export const REWRITES: Record<string, string> = {
  '_archivio/README.md': '_archivio/index.md',
  'inbox/README.md': 'inbox/index.md',
}

export interface Nota {
  rel: string // percorso dalla radice, con "/"
  link: string // percorso sul sito, senza base
  slug: string
  tipo: string // tipo dichiarato o dedotto dalla cartella
  gruppo: string // gruppo della barra laterale e dei backlink
  titolo: string
  fm: Record<string, any>
  corpo: string
  archiviata: boolean
}

const TIPO_DA_CARTELLA: Record<string, string> = {
  emozioni: 'emozione', concetti: 'concetto', fonti: 'fonte', simboli: 'simbolo', stile: 'stile',
  percorsi: 'percorso', spunti: 'spunto', idee: 'idea', diario: 'diario', inbox: 'inbox',
  _archivio: 'archivio',
}

export const ETICHETTE: Record<string, string> = {
  nucleo: 'Nucleo', percorso: 'Percorsi', idea: 'Idee', spunto: 'Spunti', emozione: 'Emozioni',
  concetto: 'Concetti', fonte: 'Fonti', simbolo: 'Simboli', stile: 'Stile', inbox: 'Inbox',
  diario: 'Diario', archivio: 'Archivio',
}
export const ORDINE_GRUPPI = Object.keys(ETICHETTE)

export const STATI = ['tatuata', 'scelta', 'forte', 'in-esplorazione', 'seme']
export const ETICHETTE_STATO: Record<string, string> = {
  tatuata: 'Tatuate', scelta: 'Scelte', forte: 'Forti', 'in-esplorazione': 'In esplorazione', seme: 'Semi',
}

export const SOTTOCARTELLE_FONTI: [string, string][] = [
  ['pensiero', 'Pensiero'], ['sacro-e-mito', 'Sacro e mito'], ['opere', 'Opere'], ['arte', 'Arte'],
]

// --- frontmatter: chiavi semplici, liste inline, come in scripts/verifica.mjs
export function frontmatter(testo: string): { fm: Record<string, any>; corpo: string } {
  const m = testo.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/)
  if (!m) return { fm: {}, corpo: testo }
  const fm: Record<string, any> = {}
  for (const riga of m[1].split(/\r?\n/)) {
    const r = riga.match(/^([\w-]+):\s*(.*)$/)
    if (!r) continue
    let v: any = r[2].trim()
    if (!v.startsWith('"')) v = v.replace(/\s+#.*$/, '')
    if (v.startsWith('[')) {
      v = v.slice(1, -1).split(',').map((x: string) => x.trim().replace(/^"|"$/g, '')).filter(Boolean)
    } else {
      v = v.replace(/^"|"$/g, '')
      if (v === '') v = null
    }
    fm[r[1]] = v
  }
  return { fm, corpo: testo.slice(m[0].length) }
}

const posix = (p: string) => p.split(sep).join('/')

export function linkDi(rel: string): string {
  const r = REWRITES[rel] ?? rel
  return '/' + r.replace(/\.md$/, '').replace(/(^|\/)index$/, '$1')
}

function file(dir: string): string[] {
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n)
    if (statSync(p).isDirectory()) return IGNORA.has(n) ? [] : file(p)
    return n.endsWith('.md') ? [p] : []
  })
}

const primoTitolo = (corpo: string) => corpo.match(/^#\s+(.+)$/m)?.[1].trim()

/** Tutte le note che diventano pagine del sito (esclusa la home). */
export function note(): Nota[] {
  return file(ROOT)
    .map((p) => posix(relative(ROOT, p)))
    .filter((rel) => !FUORI_SITO.has(rel))
    .map((rel) => {
      const { fm, corpo } = frontmatter(readFileSync(join(ROOT, rel), 'utf8'))
      const cartella = rel.split('/')[0]
      const archiviata = cartella === '_archivio'
      const tipo = fm.tipo || (rel === 'nucleo.md' ? 'nucleo' : TIPO_DA_CARTELLA[cartella]) || 'altro'
      const slug = /(^|\/)(index|README)\.md$/.test(rel) ? basename(dirname(rel)) : basename(rel, '.md')
      return {
        rel, fm, corpo, slug, tipo, archiviata,
        link: linkDi(rel),
        gruppo: archiviata ? 'archivio' : tipo,
        titolo: fm.titolo || primoTitolo(corpo) || slug,
      }
    })
}

// --- link nel corpo (stessa logica di scripts/verifica.mjs)
export function linkInterni(da: string, corpo: string): string[] {
  const senzaCodice = corpo.replace(/```[\s\S]*?```/g, '').replace(/`[^`\n]*`/g, '')
  const out = new Set<string>()
  for (const [, url] of senzaCodice.matchAll(/\]\(([^)\s]+)\)/g)) {
    if (/^(https?:|mailto:|#)/.test(url)) continue
    let pulito: string
    try { pulito = decodeURIComponent(url.split('#')[0]) } catch { continue }
    if (!pulito) continue
    const assoluto = pulito.startsWith('/') ? join(ROOT, pulito) : join(ROOT, dirname(da), pulito)
    let rel = posix(relative(ROOT, assoluto))
    if (existsSync(assoluto) && statSync(assoluto).isDirectory()) {
      rel = ['index.md', 'README.md'].map((n) => (rel ? `${rel}/${n}` : n)).find((r) => existsSync(join(ROOT, r))) ?? rel
    }
    if (rel !== da) out.add(rel)
  }
  return [...out]
}

// --- ordinamento: titolo senza articolo iniziale
const ARTICOLO = /^(il|lo|la|i|gli|le|un|uno|una|l'|l’|un')\s*/i
export const chiave = (t: string) => t.replace(/^["“«]/, '').replace(ARTICOLO, '')
export const perTitolo = (a: Nota, b: Nota) => chiave(a.titolo).localeCompare(chiave(b.titolo), 'it')

/** Data di ingresso nel repository (dalla storia git), per ordinare il diario a parità di data. */
export function aggiuntoIl(rel: string): number {
  try {
    const out = execFileSync('git', ['log', '--diff-filter=A', '--follow', '--format=%at', '--', rel], {
      cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'],
    }).trim().split('\n').filter(Boolean)
    return out.length ? Number(out[out.length - 1]) : Infinity
  } catch {
    return Infinity
  }
}

/** Voci del diario, dalla più recente. */
export function diario(tutte: Nota[]): Nota[] {
  const data = (n: Nota) => String(n.fm.data ?? basename(n.rel).slice(0, 10))
  return tutte
    .filter((n) => n.gruppo === 'diario')
    .map((n) => ({ n, d: data(n), t: aggiuntoIl(n.rel) }))
    .sort((a, b) => b.d.localeCompare(a.d) || b.t - a.t || a.n.rel.localeCompare(b.n.rel))
    .map((x) => x.n)
}

/** Primo paragrafo di testo dopo un titolo (o dopo l'h1), senza markdown. */
export function sintesi(corpo: string, sezione?: string): string {
  let testo = corpo
  if (sezione) {
    const m = corpo.match(new RegExp(`\\n## ${sezione}\\n([\\s\\S]*?)(?=\\n## |$)`))
    if (!m) return ''
    testo = m[1]
  } else {
    testo = corpo.replace(/^#\s+.+$/m, '').split(/\n## /)[0]
  }
  const par = testo.split(/\n\s*\n/).map((p) => p.trim()).find((p) => p && !/^[#>|-]/.test(p) && !p.startsWith('_'))
  return (par ?? '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*|__|`/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}
