// Dati della home: la formula del nucleo, i percorsi, le idee con stato, formato e risonanza.
// Si rigenera da solo a ogni build (e in sviluppo quando cambia una nota).
import { defineLoader } from 'vitepress'
import { note, perTitolo, sintesi, STATI, ETICHETTE_STATO } from '../atlante'

export interface IdeaHome {
  titolo: string
  link: string
  stato: string
  formato: string | null
  risonanza: number | null
  concetto: string
}
export interface DatiHome {
  formula: string
  percorsi: { titolo: string; link: string; sintesi: string }[]
  stati: { stato: string; etichetta: string; idee: IdeaHome[] }[]
  conteggi: { etichetta: string; n: number }[]
}

declare const data: DatiHome
export { data }

export default defineLoader({
  watch: ['../../**/*.md'],
  load(): DatiHome {
    const tutte = note()
    const nucleo = tutte.find((n) => n.rel === 'nucleo.md')
    const formula = nucleo?.corpo.match(/^>\s*\*\*(.+?)\*\*\s*$/m)?.[1] ?? ''

    const percorsi = tutte
      .filter((n) => n.gruppo === 'percorso')
      .sort(perTitolo)
      .map((n) => ({ titolo: n.titolo, link: n.link, sintesi: sintesi(n.corpo) }))

    const idee = tutte.filter((n) => n.gruppo === 'idea').sort(perTitolo)
    const stati = STATI.map((stato) => ({
      stato,
      etichetta: ETICHETTE_STATO[stato],
      idee: idee
        .filter((n) => n.fm.stato === stato)
        .map((n) => {
          const r = Number(n.fm.risonanza)
          return {
            titolo: n.titolo,
            link: n.link,
            stato,
            formato: n.fm.formato || null,
            risonanza: n.fm.risonanza != null && Number.isFinite(r) ? r : null,
            concetto: sintesi(n.corpo, 'Concetto'),
          }
        }),
    }))

    const conteggi = [
      ['emozione', 'emozioni'], ['concetto', 'concetti'], ['fonte', 'fonti'], ['simbolo', 'simboli'],
      ['stile', 'stili'], ['spunto', 'spunti'],
    ].map(([g, etichetta]) => ({ etichetta, n: tutte.filter((n) => n.gruppo === g).length }))

    return { formula, percorsi, stati, conteggi }
  },
})
