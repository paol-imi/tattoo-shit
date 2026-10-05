// Dati della Mappa: le note come nodi, i collegamenti del frontmatter come archi.
// Il nucleo, che non ha collegamenti nel frontmatter, si lega alle note che cita nel corpo.
import { defineLoader } from 'vitepress'
import { note, collegamentiFm, linkInterni, CAMPI_LINK, provenienza, proposte, chiaveCoppia } from '../atlante'

export interface NodoMappa {
  id: string; titolo: string; tipo: string; link: string; grado: number
  /** falso per le proposte di Claude non ancora approvate */
  validata: boolean
}
/** proposto: un collegamento proposto da Claude (in migrazione o in un blocco proposta), non ancora approvato */
export interface ArcoMappa { source: string; target: string; proposto?: boolean }
export interface DatiMappa { nodi: NodoMappa[]; archi: ArcoMappa[] }

declare const data: DatiMappa
export { data }

const TIPI = new Set([...Object.values(CAMPI_LINK), 'nucleo'])

export default defineLoader({
  watch: ['../../**/*.md'],
  load(): DatiMappa {
    const tutteLeNote = note()
    const tutte = tutteLeNote.filter((n) => !n.archiviata && TIPI.has(n.tipo))
    const perSlug = new Map(tutte.map((n) => [n.slug, n]))
    const perRel = new Map(tutte.map((n) => [n.rel, n]))
    const archi = new Map<string, ArcoMappa>()
    const chiave = (a: string, b: string) => (a < b ? `${a}|${b}` : `${b}|${a}`)
    const aggiungi = (a: string, b: string) => {
      if (a === b || !perSlug.has(a) || !perSlug.has(b)) return
      const k = chiave(a, b)
      if (!archi.has(k)) archi.set(k, { source: a, target: b })
    }
    for (const n of tutte) {
      if (n.tipo === 'nucleo') {
        for (const rel of linkInterni(n.rel, n.corpo)) { const d = perRel.get(rel); if (d) aggiungi(n.slug, d.slug) }
      } else {
        for (const s of Object.values(collegamentiFm(n)).flat()) aggiungi(n.slug, s)
      }
    }
    // i collegamenti proposti: tratteggiati con le proposte accese, nascosti di default
    const { coppie } = proposte(tutteLeNote)
    for (const [k, arco] of archi) if (coppie.has(chiaveCoppia(arco.source, arco.target)) || coppie.has(k)) arco.proposto = true
    const grado = new Map<string, number>()
    for (const { source, target } of archi.values()) {
      grado.set(source, (grado.get(source) ?? 0) + 1)
      grado.set(target, (grado.get(target) ?? 0) + 1)
    }
    return {
      nodi: tutte.map((n) => ({
        id: n.slug, titolo: n.titolo, tipo: n.tipo, link: n.link, grado: grado.get(n.slug) ?? 0, validata: provenienza(n).validata,
      })),
      archi: [...archi.values()],
    }
  },
})
