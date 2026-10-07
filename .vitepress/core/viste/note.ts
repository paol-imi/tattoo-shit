// I dati delle singole note: chi le cita ("Collegato da") e cosa dice la riga in testa (tavole in bacheca,
// proposte dentro la pagina).
import { memo, linkInterni, perTitolo, type Archivio, type Nota } from '../archivio.ts'
import { senzaProposte, proposteDi } from '../blocchi.ts'
import { proposte, collegamentoProposto } from '../proposte.ts'
import { presenzeInBacheca } from './bacheca.ts'
import { ETICHETTE_GRUPPO, ORDINE_GRUPPI } from '../../shared/tipi.ts'
import { slugDaRel } from '../../shared/nota.ts'

// --- backlink: per ogni pagina, le note che la citano nel corpo, raggruppate per tipo.
// Le note archiviate restano, ma in un gruppo a parte ("Archivio").
// proposta: il link viene da una nota non validata, solo da blocchi proposta, o è un collegamento proposto;
// di default il sito non lo mostra (si vede con le proposte di Claude accese).
export interface GruppoBacklink {
  gruppo: string
  etichetta: string
  note: { titolo: string; link: string; proposta: boolean }[]
}
export type Backlink = Record<string, GruppoBacklink[]>

export const backlink = (a: Archivio): Backlink => memo(a, 'backlink', () => {
  const tutte = a.note
  const perRel = new Map(tutte.map((n) => [n.rel, n]))
  const prop = proposte(a)
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
  const proposta = (n: Nota, dest: string) =>
    !n.archiviata && (!validati.has(`${n.rel}|${dest}`) || collegamentoProposto(prop, n.slug, slugDaRel(dest)))
  const out: Backlink = {}
  for (const [dest, da] of entranti) {
    out[dest] = ORDINE_GRUPPI.map((gruppo) => ({
      gruppo,
      etichetta: ETICHETTE_GRUPPO[gruppo],
      note: [...da]
        .filter((n) => n.gruppo === gruppo)
        .sort(perTitolo)
        .map((n) => ({ titolo: n.titolo, link: n.link, proposta: proposta(n, dest) })),
    })).filter((g) => g.note.length)
  }
  return out
})

// --- per la riga in testa alle note:
// - presenze: quante carte della Bacheca sono legate a ciascuna nota (per slug), con le proposte di Claude;
// - presenzeValidate: lo stesso, contando solo carte e collegamenti validati (la vista di default);
// - proposte: quanti blocchi "proposta di Claude" ci sono in ciascuna pagina (per percorso del file).
export interface DatiSchede {
  presenze: Record<string, number>
  presenzeValidate: Record<string, number>
  proposte: Record<string, number>
}

export const schede = (a: Archivio): DatiSchede => memo(a, 'schede', () => {
  const proposte: Record<string, number> = {}
  for (const n of a.note) {
    const p = proposteDi(n.corpo).length
    if (p) proposte[n.rel] = p
  }
  return { ...presenzeInBacheca(a), proposte }
})
