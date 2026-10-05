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
  percorsi: 'percorso', spunti: 'spunto', idee: 'idea', ricerche: 'ricerca', diario: 'diario', inbox: 'inbox',
  _archivio: 'archivio',
}

export const ETICHETTE: Record<string, string> = {
  nucleo: 'Nucleo', percorso: 'Percorsi', idea: 'Idee', spunto: 'Spunti', ricerca: 'Ricerche', emozione: 'Emozioni',
  concetto: 'Concetti', fonte: 'Fonti', simbolo: 'Simboli', stile: 'Stile', inbox: 'Inbox',
  diario: 'Diario', archivio: 'Archivio',
}
export const ORDINE_GRUPPI = Object.keys(ETICHETTE)

export const STATI = ['tatuata', 'scelta', 'forte', 'in-esplorazione', 'seme']
export const ETICHETTE_STATO: Record<string, string> = {
  tatuata: 'Tatuate', scelta: 'Scelte', forte: 'Forti', 'in-esplorazione': 'In esplorazione', seme: 'Semi',
}

// le ricerche (piste da esplorare): prima quelle aperte
export const STATI_RICERCA = ['in-corso', 'da-fare', 'fatta']
export const ETICHETTE_STATO_RICERCA: Record<string, string> = {
  'in-corso': 'In corso', 'da-fare': 'Da fare', fatta: 'Fatte',
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

// --- per Bacheca, Testi e Mappa

/** I campi del frontmatter che collegano a un'altra nota, con il tipo della nota di arrivo. */
export const CAMPI_LINK: Record<string, string> = {
  emozioni: 'emozione', concetti: 'concetto', fonti: 'fonte', simboli: 'simbolo', stile: 'stile',
  percorsi: 'percorso', spunti: 'spunto', idee: 'idea', ricerche: 'ricerca',
}

const lista = (v: any): string[] => (Array.isArray(v) ? v : v ? [String(v)] : []).filter(Boolean)

/** Gli slug collegati dal frontmatter, per campo. Il campo singolo `fonte` degli spunti va in testa alle fonti. */
export function collegamentiFm(n: Nota): Record<string, string[]> {
  const out: Record<string, string[]> = {}
  for (const campo of Object.keys(CAMPI_LINK)) {
    const v = campo === 'fonti' ? [...lista(n.fm.fonte), ...lista(n.fm.fonti)] : lista(n.fm[campo])
    const unici = [...new Set(v)]
    if (unici.length) out[campo] = unici
  }
  return out
}

/** Il testo di una sezione `## Nome` (senza il titolo), o stringa vuota. */
export function sezione(corpo: string, nome: string): string {
  const m = ('\n' + corpo).match(new RegExp(`\\n## ${nome}[ \\t]*\\n([\\s\\S]*?)(?=\\n## |$)`))
  return m ? m[1] : ''
}

/** Markdown in linea → testo semplice. */
export function testoSemplice(md: string): string {
  return md
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*|__|`/g, '')
    .replace(/(^|[\s(“"])[*_]([^*_\n]+)[*_](?=[\s).,;:!?”"]|$)/g, '$1$2')
    .replace(/\\$/gm, '')
    .trim()
}

export interface Pin { id: string; descrizione: string }

/** I pin della sezione `## Pinterest`: voci di elenco fatte solo del link al pin. */
export function pinDi(corpo: string): Pin[] {
  const out: Pin[] = []
  for (const [, desc, id] of sezione(corpo, 'Pinterest').matchAll(
    /^\s*[-*]\s+\[([^\]]*)\]\(https:\/\/www\.pinterest\.com\/pin\/(\d+)\/?\)\s*$/gm,
  )) out.push({ id, descrizione: testoSemplice(desc) })
  return out
}

/** Una citazione trovata in una nota: il testo (a capo conservati) e, se c'è, il riferimento. */
export interface Citazione { testo: string; riferimento: string | null }

/**
 * Le citazioni di una nota, nell'ordine:
 * - i blocchi `>` dentro le sezioni (non quelli in testa alla nota, che sono avvertenze);
 * - nelle ricerche, i passi di `## Trovato` scritti come `**riferimento.** *"testo"*`.
 */
export function citazioniDi(n: Nota): Citazione[] {
  const out: Citazione[] = []
  const inizio = n.corpo.search(/^## /m)
  if (inizio >= 0) {
    const righe = n.corpo.slice(inizio).replace(/```[\s\S]*?```/g, '').split('\n')
    let blocco: string[] | null = null
    const chiudi = () => {
      if (!blocco) return
      // le righe che finiscono con "\" vanno a capo; una riga vuota separa le strofe; il resto si unisce
      const strofe = blocco.join('\n').split(/\n\s*\n/).map((s) =>
        s.split('\n').reduce((acc, r, i, a) => acc + r.replace(/\\$/, '') + (i === a.length - 1 ? '' : /\\$/.test(r) ? '\n' : ' '), ''),
      )
      const testo = strofe.map((s) => testoSemplice(s.split('\n').map((r) => r.trim()).join('\n'))).join('\n\n').trim()
      if (testo) out.push({ testo, riferimento: null })
      blocco = null
    }
    for (const r of righe) {
      const m = r.match(/^>\s?(.*)$/)
      if (m) (blocco ??= []).push(m[1])
      else chiudi()
    }
    chiudi()
  }
  if (n.tipo === 'ricerca') {
    for (const [, rif, testo] of sezione(n.corpo, 'Trovato').matchAll(
      /^\s*(?:\d+\.|[-*])\s+\*\*([^*]+?)\.?\*\*[^\n]*?\*["“]([^*\n]+?)["”]\*/gm,
    )) out.push({ testo: testo.trim(), riferimento: rif.trim() })
  }
  return out
}

/** La prima frase citata tra virgolette in un testo (almeno tre parole), per gli spunti di formato "frase". */
export function fraseTraVirgolette(md: string): string | null {
  const t = testoSemplice(md)
  for (const [, f] of t.matchAll(/["“]([^"”\n]{8,160})["”]/g)) if (f.trim().split(/\s+/).length >= 3) return f.trim()
  return null
}

/** Le prime frasi di un paragrafo, fino a circa `min` caratteri; salta un'avvertenza iniziale in grassetto. */
export function primeFrasi(corpo: string, nomeSezione: string, min = 70, max = 260): string {
  const testo = sezione(corpo, nomeSezione)
  const par = testo.split(/\n\s*\n/).map((p) => p.trim()).find((p) => p && !/^[#>|-]/.test(p) && !p.startsWith('_'))
  if (!par) return ''
  const pulito = testoSemplice(par.replace(/^\*\*[^*]+\*\*[^.]*\.\s+/, '')).replace(/\s+/g, ' ')
  const frasi = pulito.match(/[^.!?]+(?:[.!?]+["”»)]?|$)\s*/g) ?? [pulito]
  let out = ''
  for (const f of frasi) {
    if (out.length >= min) break
    if (out && (out + f).length > max) break
    out += f
  }
  out = out.trim()
  return out.length > max ? out.slice(0, max).replace(/\s+\S*$/, '') + '…' : out
}

// --- proporzioni dei pin (solo i numeri: larghezza e altezza dell'immagine, niente immagini)
// Servono a dare all'embed ufficiale l'altezza giusta. Se Pinterest non risponde, si usa 4:3.
const rapporti = new Map<string, number>()
export async function rapportiPin(ids: string[]): Promise<Record<string, number>> {
  const mancanti = [...new Set(ids)].filter((id) => !rapporti.has(id))
  for (let i = 0; i < mancanti.length; i += 20) {
    const gruppo = mancanti.slice(i, i + 20)
    try {
      const r = await fetch(`https://widgets.pinterest.com/v3/pidgets/pins/info/?pin_ids=${gruppo.join(',')}`, {
        signal: AbortSignal.timeout(6000),
      })
      const json: any = await r.json()
      for (const p of json?.data ?? []) {
        const img = p?.images?.['237x'] ?? p?.images?.['236x'] ?? p?.images?.['564x']
        if (p?.id && img?.width && img?.height) rapporti.set(String(p.id), +(img.height / img.width).toFixed(4))
      }
    } catch {
      // senza rete: resta il rapporto predefinito
    }
  }
  return Object.fromEntries(ids.map((id) => [id, rapporti.get(id) ?? 4 / 3]))
}
