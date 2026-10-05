// Dati della Mappa: le note come nodi, i collegamenti del frontmatter come archi.
// Il nucleo, che non ha collegamenti nel frontmatter, si lega alle note che cita nel corpo.
import { defineLoader } from 'vitepress'
import { note, collegamentiFm, linkInterni, CAMPI_LINK } from '../atlante'

export interface NodoMappa { id: string; titolo: string; tipo: string; link: string; grado: number }
export interface DatiMappa { nodi: NodoMappa[]; archi: { source: string; target: string }[] }

declare const data: DatiMappa
export { data }

const TIPI = new Set([...Object.values(CAMPI_LINK), 'nucleo'])

export default defineLoader({
  watch: ['../../**/*.md'],
  load(): DatiMappa {
    const tutte = note().filter((n) => !n.archiviata && TIPI.has(n.tipo))
    const perSlug = new Map(tutte.map((n) => [n.slug, n]))
    const perRel = new Map(tutte.map((n) => [n.rel, n]))
    const archi = new Map<string, { source: string; target: string }>()
    const aggiungi = (a: string, b: string) => {
      if (a === b || !perSlug.has(a) || !perSlug.has(b)) return
      const k = a < b ? `${a}|${b}` : `${b}|${a}`
      if (!archi.has(k)) archi.set(k, { source: a, target: b })
    }
    for (const n of tutte) {
      if (n.tipo === 'nucleo') {
        for (const rel of linkInterni(n.rel, n.corpo)) { const d = perRel.get(rel); if (d) aggiungi(n.slug, d.slug) }
      } else {
        for (const s of Object.values(collegamentiFm(n)).flat()) aggiungi(n.slug, s)
      }
    }
    const grado = new Map<string, number>()
    for (const { source, target } of archi.values()) {
      grado.set(source, (grado.get(source) ?? 0) + 1)
      grado.set(target, (grado.get(target) ?? 0) + 1)
    }
    return {
      nodi: tutte.map((n) => ({ id: n.slug, titolo: n.titolo, tipo: n.tipo, link: n.link, grado: grado.get(n.slug) ?? 0 })),
      archi: [...archi.values()],
    }
  },
})
