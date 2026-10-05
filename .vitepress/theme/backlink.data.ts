// Backlink: per ogni pagina, le note che la citano nel corpo, raggruppate per tipo.
// Le note archiviate restano, ma in un gruppo a parte ("Archivio").
// proposta: il link viene da una nota non validata, solo da blocchi proposta, o è un collegamento proposto;
// di default il sito non lo mostra (si vede con le proposte di Claude accese).
import { defineLoader } from 'vitepress'
import {
  note, linkInterni, perTitolo, senzaProposte, proposte, collegamentoProposto, slugDaUrl, ETICHETTE, ORDINE_GRUPPI, type Nota,
} from '../atlante'

export interface GruppoBacklink {
  gruppo: string
  etichetta: string
  note: { titolo: string; link: string; proposta: boolean }[]
}
export type Backlink = Record<string, GruppoBacklink[]>

declare const data: Backlink
export { data }

export default defineLoader({
  watch: ['../../**/*.md'],
  load(): Backlink {
    const tutte = note()
    const perRel = new Map(tutte.map((n) => [n.rel, n]))
    const prop = proposte(tutte)
    const entranti = new Map<string, Set<Nota>>()
    const validati = new Set<string>() // "da|a": link presenti fuori dai blocchi proposta
    for (const n of tutte) {
      for (const dest of linkInterni(n.rel, n.corpo)) {
        if (!perRel.has(dest)) continue
        if (!entranti.has(dest)) entranti.set(dest, new Set())
        entranti.get(dest)!.add(n)
      }
      for (const dest of linkInterni(n.rel, senzaProposte(n.corpo))) validati.add(`${n.rel}|${dest}`)
    }
    const slug = (rel: string) => slugDaUrl('/' + rel)
    const proposta = (n: Nota, dest: string) =>
      !n.archiviata && (!validati.has(`${n.rel}|${dest}`) || collegamentoProposto(prop, n.slug, slug(dest)))
    const out: Backlink = {}
    for (const [dest, da] of entranti) {
      out[dest] = ORDINE_GRUPPI.map((gruppo) => ({
        gruppo,
        etichetta: ETICHETTE[gruppo],
        note: [...da]
          .filter((n) => n.gruppo === gruppo)
          .sort(perTitolo)
          .map((n) => ({ titolo: n.titolo, link: n.link, proposta: proposta(n, dest) })),
      })).filter((g) => g.note.length)
    }
    return out
  },
})
