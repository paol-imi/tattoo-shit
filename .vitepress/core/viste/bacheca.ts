// Dati della Bacheca: una carta per ogni idea e spunto attivi (l'archivio resta fuori),
// con i pin, il testo candidato (la prima citazione, o le prime frasi del concetto)
// e i nodi collegati dal frontmatter.
import { memo, perSlug, perTitolo, collegamentiFm, testoFm, type Archivio, type Nota } from '../archivio.ts'
import { citazioniDi, primeFrasi, fraseTraVirgolette, sezione } from '../testo.ts'
import { proposteDi, senzaProposte } from '../blocchi.ts'
import { proposte as leProposte, collegamentoProposto } from '../proposte.ts'
import { pinDi, rapportiPin } from '../pin.ts'
import { STATI, STATI_SPUNTO, leggibile } from '../../shared/tipi.ts'
import { provenienza, risonanzaDi } from '../../shared/nota.ts'

export interface NodoBreve { titolo: string; tipo: string; link: string }
export interface TestoCarta { testo: string; citazione: boolean; tagliato: boolean }
export interface Carta {
  slug: string
  titolo: string
  link: string
  tipo: 'idea' | 'spunto'
  stato: string
  formato: string | null
  risonanza: number | null
  pin: { id: string; descrizione: string; rapporto: number }[]
  testo: TestoCarta | null
  /** il testo della vista di default: preso solo da ciò che è validato (fuori dai blocchi proposta) */
  testoValidato: TestoCarta | null
  /** chip: concetti, simboli, fonti, emozioni (slug) */
  chip: string[]
  /** tutti gli slug collegati dal frontmatter, per il filtro */
  nodi: string[]
  /** gli slug (tra chip e nodi) legati da un collegamento proposto da Claude: nascosti di default */
  nodiProposti: string[]
  ornamento: string
  /** seme | mia | claude */
  origine: string
  /** l'ho approvata io? */
  validata: boolean
  /** quanti blocchi "proposta di Claude" restano da validare dentro la nota */
  proposte: number
}
export interface DatiBacheca {
  carte: Carta[]
  nodi: Record<string, NodoBreve>
  stati: { stato: string; etichetta: string; n: number }[]
  /** quante carte sono tutte validate e quante hanno qualcosa da validare */
  validazione: { validate: number; daValidare: number }
}

// l'ornamento delle carte tipografiche: il primo simbolo della nota che ne ha uno, altrimenti il sole
const ORNAMENTI: Readonly<Record<string, string>> = {
  stelle: 'stella', occhi: 'occhio', clessidra: 'clessidra', ouroboros: 'ouroboros', spirale: 'spirale',
  porta: 'porta', velo: 'velo', ruote: 'ruota', 'albero-della-vita-simbolo': 'albero', 'alce-irlandese': 'stella',
  scala: 'scala', lampada: 'lampada', chiave: 'porta', sole: 'sole', viandante: 'stella',
}
const statoDi = (n: Nota) => testoFm(n.fm.stato) ?? ''
const rango = (n: Nota) => {
  const i = STATI.indexOf(statoDi(n))
  return i >= 0 ? i : STATI.length + Math.max(0, STATI_SPUNTO.indexOf(statoDi(n)))
}

function testoDi(n: Pick<Nota, 'corpo' | 'tipo'>): TestoCarta | null {
  const tutte = citazioniDi(n)
  const cit = tutte.find((c) => !c.proposta) ?? tutte[0]
  if (cit) {
    const MAX = 230
    if (cit.testo.length <= MAX) return { testo: cit.testo, citazione: true, tagliato: false }
    // la prima strofa, se è breve; altrimenti l'inizio, tagliato su una parola
    const strofa = cit.testo.split('\n\n')[0]
    const t = strofa.length <= MAX ? strofa : cit.testo.slice(0, MAX).replace(/\s+\S*$/, '')
    return { testo: t.replace(/[,;:.]?$/, '') + ' …', citazione: true, tagliato: true }
  }
  if (n.tipo === 'spunto') {
    const f = fraseTraVirgolette(sezione(n.corpo, 'Il frammento'))
    if (f) return { testo: f, citazione: true, tagliato: false }
  }
  const c = primeFrasi(n.corpo, n.tipo === 'idea' ? 'Concetto' : 'Il frammento')
  return c ? { testo: c, citazione: false, tagliato: false } : null
}

/** Una carta ha qualcosa da validare se è una proposta di Claude o se contiene blocchi proposta. */
const daValidare = (c: Pick<Carta, 'validata' | 'proposte'>) => !c.validata || c.proposte > 0

/** Le carte della bacheca (senza le proporzioni dei pin, che chiedono la rete). */
const carteDi = (a: Archivio) => memo(a, 'bacheca', () => {
  const prop = leProposte(a)
  const attive = perSlug(a)
  const scelte = a.note.filter((n) => n.gruppo === 'idea' || n.gruppo === 'spunto')
  const nodi: Record<string, NodoBreve> = {}
  const usa = (s: string) => {
    const d = attive.get(s)
    if (d && !nodi[s]) nodi[s] = { titolo: d.titolo, tipo: d.tipo, link: d.link }
    return !!d
  }
  const carte = scelte.map((n) => {
    const col = collegamentiFm(n)
    const chip = ['concetti', 'simboli', 'fonti', 'emozioni'].flatMap((c) => col[c] ?? []).filter(usa)
    const tuttiNodi = [...new Set(Object.values(col).flat().filter(usa))]
    const simbolo = (col.simboli ?? []).find((s) => ORNAMENTI[s])
    const carta: Carta = {
      slug: n.slug,
      titolo: n.titolo,
      link: n.link,
      tipo: n.tipo as Carta['tipo'],
      stato: statoDi(n),
      formato: testoFm(n.fm.formato) || null,
      risonanza: risonanzaDi(n.fm.risonanza),
      pin: pinDi(n.corpo).map((p) => ({ ...p, rapporto: 0 })),
      testo: testoDi(n),
      testoValidato: testoDi({ tipo: n.tipo, corpo: senzaProposte(n.corpo) }),
      chip,
      nodi: tuttiNodi,
      nodiProposti: tuttiNodi.filter((s) => collegamentoProposto(prop, n.slug, s)),
      ornamento: simbolo ? ORNAMENTI[simbolo] : 'sole',
      ...provenienza(n.fm),
      proposte: proposteDi(n.corpo).length,
    }
    return { n, carta }
  })

  // prima le carte più piene (pin, citazioni), poi le più mature, poi per titolo
  const peso = (c: Carta) => c.pin.length * 2 + (c.testo?.citazione ? 1 : 0)
  carte.sort((x, y) => peso(y.carta) - peso(x.carta) || rango(x.n) - rango(y.n) || perTitolo(x.n, y.n))
  return { carte: carte.map((x) => x.carta), nodi }
})

/** Le carte che contano una nota (per slug): con le proposte di Claude, e solo con ciò che è validato. */
export const presenzeInBacheca = (a: Archivio) => memo(a, 'presenze', () => {
  const prop = leProposte(a)
  const presenze: Record<string, number> = {}
  const presenzeValidate: Record<string, number> = {}
  for (const n of a.note) {
    if (n.gruppo !== 'idea' && n.gruppo !== 'spunto') continue
    for (const s of new Set(Object.values(collegamentiFm(n)).flat())) {
      presenze[s] = (presenze[s] ?? 0) + 1
      if (!collegamentoProposto(prop, n.slug, s)) presenzeValidate[s] = (presenzeValidate[s] ?? 0) + 1
    }
  }
  return { presenze, presenzeValidate }
})

export async function datiBacheca(a: Archivio): Promise<DatiBacheca> {
  const { carte: base, nodi } = carteDi(a)
  const rapporti = await rapportiPin(base.flatMap((c) => c.pin.map((p) => p.id)))
  const carte = base.map((c) => ({ ...c, pin: c.pin.map((p) => ({ ...p, rapporto: rapporti[p.id] })) }))
  const stati = [...STATI, ...STATI_SPUNTO]
    .map((s) => ({ stato: s, etichetta: leggibile(s), n: carte.filter((c) => c.stato === s).length }))
    .filter((s) => s.n)
  const nDaValidare = carte.filter(daValidare).length
  return { carte, nodi, stati, validazione: { validate: carte.length - nDaValidare, daValidare: nDaValidare } }
}
