// Backlink: per ogni pagina, le note che la citano nel corpo, raggruppate per tipo.
// Le note archiviate restano, ma in un gruppo a parte ("Archivio").
import { defineLoader } from 'vitepress'
import { note, linkInterni, perTitolo, ETICHETTE, ORDINE_GRUPPI, type Nota } from '../atlante'

export interface GruppoBacklink {
  gruppo: string
  etichetta: string
  note: { titolo: string; link: string }[]
}
export type Backlink = Record<string, GruppoBacklink[]>

declare const data: Backlink
export { data }

export default defineLoader({
  watch: ['../../**/*.md'],
  load(): Backlink {
    const tutte = note()
    const perRel = new Map(tutte.map((n) => [n.rel, n]))
    const entranti = new Map<string, Set<Nota>>()
    for (const n of tutte) {
      for (const dest of linkInterni(n.rel, n.corpo)) {
        if (!perRel.has(dest)) continue
        if (!entranti.has(dest)) entranti.set(dest, new Set())
        entranti.get(dest)!.add(n)
      }
    }
    const out: Backlink = {}
    for (const [dest, da] of entranti) {
      out[dest] = ORDINE_GRUPPI.map((gruppo) => ({
        gruppo,
        etichetta: ETICHETTE[gruppo],
        note: [...da].filter((n) => n.gruppo === gruppo).sort(perTitolo).map((n) => ({ titolo: n.titolo, link: n.link })),
      })).filter((g) => g.note.length)
    }
    return out
  },
})
