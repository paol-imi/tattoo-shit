// Per la riga in testa alle note:
// - presenze: quante carte della Bacheca sono legate a ciascuna nota (per slug), con le proposte di Claude;
// - presenzeValidate: lo stesso, contando solo carte e collegamenti validati (la vista di default);
// - proposte: quanti blocchi "proposta di Claude" ci sono in ciascuna pagina (per percorso del file).
import { defineLoader } from 'vitepress'
import { note, collegamentiFm, proposteDi, proposte as leProposte, collegamentoProposto } from '../atlante'

export interface DatiSchede {
  presenze: Record<string, number>
  presenzeValidate: Record<string, number>
  proposte: Record<string, number>
}

declare const data: DatiSchede
export { data }

export default defineLoader({
  watch: ['../../**/*.md'],
  load(): DatiSchede {
    const presenze: Record<string, number> = {}
    const presenzeValidate: Record<string, number> = {}
    const proposte: Record<string, number> = {}
    const tutte = note()
    const prop = leProposte(tutte)
    for (const n of tutte) {
      const p = proposteDi(n.corpo).length
      if (p) proposte[n.rel] = p
      if (n.gruppo !== 'idea' && n.gruppo !== 'spunto') continue
      for (const s of new Set(Object.values(collegamentiFm(n)).flat())) {
        presenze[s] = (presenze[s] ?? 0) + 1
        if (!collegamentoProposto(prop, n.slug, s)) presenzeValidate[s] = (presenzeValidate[s] ?? 0) + 1
      }
    }
    return { presenze, presenzeValidate, proposte }
  },
})
