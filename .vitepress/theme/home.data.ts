// Dati della home: la formula del nucleo, i percorsi, le idee con stato, formato e risonanza,
// le piste aperte (ricerche non ancora fatte).
// Si rigenera da solo a ogni build (e in sviluppo quando cambia una nota).
import { defineLoader } from 'vitepress'
import mappa from './mappa.data'
import testi from './testi.data'
import { note, perTitolo, sintesi, STATI, ETICHETTE_STATO, STATI_RICERCA, ETICHETTE_STATO_RICERCA } from '../atlante'

export interface IdeaHome {
  titolo: string
  link: string
  stato: string
  formato: string | null
  risonanza: number | null
  concetto: string
}
export interface PistaHome {
  titolo: string
  link: string
  stato: string
  oggetto: string
}
export interface DatiHome {
  formula: string
  percorsi: { titolo: string; link: string; sintesi: string }[]
  stati: { stato: string; etichetta: string; idee: IdeaHome[] }[]
  piste: PistaHome[]
  conteggi: { etichetta: string; n: number }[]
  /** per le tre porte: quanti testi, quante note e fili sulla mappa */
  porte: { testi: number; fonti: number; nodi: number; archi: number }
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

    // piste aperte: tutte le ricerche non fatte, prima quelle in corso
    const ordineStato = (s: string) => (STATI_RICERCA.includes(s) ? STATI_RICERCA.indexOf(s) : STATI_RICERCA.length)
    const piste = tutte
      .filter((n) => n.gruppo === 'ricerca' && n.fm.stato !== 'fatta')
      .sort((a, b) => ordineStato(a.fm.stato) - ordineStato(b.fm.stato) || perTitolo(a, b))
      .map((n) => ({
        titolo: n.titolo,
        link: n.link,
        stato: ETICHETTE_STATO_RICERCA[n.fm.stato] ?? n.fm.stato ?? 'senza stato',
        oggetto: n.fm.oggetto || sintesi(n.corpo),
      }))

    const conteggi = [
      ['emozione', 'emozioni'], ['concetto', 'concetti'], ['fonte', 'fonti'], ['simbolo', 'simboli'],
      ['stile', 'stili'], ['spunto', 'spunti'], ['ricerca', 'ricerche'],
    ].map(([g, etichetta]) => ({ etichetta, n: tutte.filter((n) => n.gruppo === g).length }))

    const m = (mappa as any).load()
    const t = (testi as any).load()
    const porte = { testi: t.testi.length, fonti: t.fonti.length, nodi: m.nodi.length, archi: m.archi.length }

    return { formula, percorsi, stati, piste, conteggi, porte }
  },
})
