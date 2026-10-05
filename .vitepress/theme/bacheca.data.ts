// Dati della Bacheca: una carta per ogni idea e spunto attivi (l'archivio resta fuori),
// con i pin, il testo candidato (la prima citazione, o le prime frasi del concetto)
// e i nodi collegati dal frontmatter. Si rigenera a ogni build.
import { defineLoader } from 'vitepress'
import {
  note, perTitolo, collegamentiFm, citazioniDi, pinDi, primeFrasi, fraseTraVirgolette, sezione, rapportiPin,
  STATI, type Nota,
} from '../atlante'

export interface NodoBreve { titolo: string; tipo: string; link: string }
export interface Carta {
  slug: string
  titolo: string
  link: string
  tipo: 'idea' | 'spunto'
  stato: string
  formato: string | null
  risonanza: number | null
  pin: { id: string; descrizione: string; rapporto: number }[]
  testo: { testo: string; citazione: boolean; tagliato: boolean } | null
  /** chip: concetti, simboli, fonti, emozioni (slug) */
  chip: string[]
  /** tutti gli slug collegati dal frontmatter, per il filtro */
  nodi: string[]
  ornamento: string
}
export interface DatiBacheca {
  carte: Carta[]
  nodi: Record<string, NodoBreve>
  stati: { stato: string; etichetta: string; n: number }[]
}

declare const data: DatiBacheca
export { data }

// l'ornamento delle carte tipografiche: il primo simbolo della nota che ne ha uno, altrimenti il sole
const ORNAMENTI: Record<string, string> = {
  stelle: 'stella', occhi: 'occhio', clessidra: 'clessidra', ouroboros: 'ouroboros', spirale: 'spirale',
  porta: 'porta', velo: 'velo', ruote: 'ruota', 'albero-della-vita-simbolo': 'albero', 'alce-irlandese': 'stella',
  scala: 'scala', lampada: 'lampada', chiave: 'porta', sole: 'sole', viandante: 'stella',
}
const STATI_SPUNTO = ['esplorato', 'grezzo', 'confluito']
export const ETICHETTA_STATO: Record<string, string> = {
  tatuata: 'tatuata', scelta: 'scelta', forte: 'forte', 'in-esplorazione': 'in esplorazione', seme: 'seme',
  esplorato: 'esplorato', grezzo: 'grezzo', confluito: 'confluito',
}
const rango = (n: Nota) => {
  const s = n.fm.stato
  const i = STATI.indexOf(s)
  return i >= 0 ? i : STATI.length + Math.max(0, STATI_SPUNTO.indexOf(s))
}

function testoDi(n: Nota): Carta['testo'] {
  const cit = citazioniDi(n)[0]
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

export default defineLoader({
  watch: ['../../**/*.md'],
  async load(): Promise<DatiBacheca> {
    const tutte = note()
    const perSlug = new Map(tutte.filter((n) => !n.archiviata).map((n) => [n.slug, n]))
    const scelte = tutte.filter((n) => (n.gruppo === 'idea' || n.gruppo === 'spunto'))
    const rapporti = await rapportiPin(scelte.flatMap((n) => pinDi(n.corpo).map((p) => p.id)))
    const nodi: Record<string, NodoBreve> = {}
    const usa = (s: string) => {
      const d = perSlug.get(s)
      if (d && !nodi[s]) nodi[s] = { titolo: d.titolo, tipo: d.tipo, link: d.link }
      return !!d
    }

    const carte: Carta[] = scelte.map((n) => {
      const col = collegamentiFm(n)
      const chip = ['concetti', 'simboli', 'fonti', 'emozioni'].flatMap((c) => col[c] ?? []).filter(usa)
      const tuttiNodi = Object.values(col).flat().filter(usa)
      const r = Number(n.fm.risonanza)
      const simbolo = (col.simboli ?? []).find((s) => ORNAMENTI[s])
      return {
        slug: n.slug,
        titolo: n.titolo,
        link: n.link,
        tipo: n.tipo as Carta['tipo'],
        stato: n.fm.stato ?? '',
        formato: n.fm.formato || null,
        risonanza: n.fm.risonanza != null && r >= 1 && r <= 5 ? r : null,
        pin: pinDi(n.corpo).map((p) => ({ ...p, rapporto: rapporti[p.id] })),
        testo: testoDi(n),
        chip,
        nodi: [...new Set(tuttiNodi)],
        ornamento: simbolo ? ORNAMENTI[simbolo] : 'sole',
      }
    })

    // prima le carte più piene (pin, citazioni), poi le più mature, poi per titolo
    const peso = (c: Carta) => c.pin.length * 2 + (c.testo?.citazione ? 1 : 0)
    const perNota = new Map(scelte.map((n) => [n.slug, n]))
    carte.sort((a, b) => peso(b) - peso(a) || rango(perNota.get(a.slug)!) - rango(perNota.get(b.slug)!) || perTitolo(perNota.get(a.slug)!, perNota.get(b.slug)!))

    const stati = [...STATI, ...STATI_SPUNTO]
      .map((s) => ({ stato: s, etichetta: ETICHETTA_STATO[s] ?? s, n: carte.filter((c) => c.stato === s).length }))
      .filter((s) => s.n)
    return { carte, nodi, stati }
  },
})
