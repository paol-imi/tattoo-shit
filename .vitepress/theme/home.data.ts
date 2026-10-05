// Dati della home: la formula del nucleo, i percorsi, le idee con stato, formato e risonanza,
// le piste aperte (ricerche non ancora fatte).
// Si rigenera da solo a ogni build (e in sviluppo quando cambia una nota).
import { defineLoader } from 'vitepress'
import mappa from './mappa.data'
import testi from './testi.data'
import {
  note, perTitolo, sintesi, provenienza, proposteDi, collegamentiProposti, CAMPI_LINK,
  STATI, ETICHETTE_STATO, STATI_RICERCA, ETICHETTE_STATO_RICERCA,
} from '../atlante'

export interface IdeaHome {
  titolo: string
  link: string
  stato: string
  formato: string | null
  risonanza: number | null
  concetto: string
  /** falso per le proposte di Claude non ancora approvate */
  validata: boolean
}
export interface PistaHome {
  titolo: string
  link: string
  stato: string
  oggetto: string
  validata: boolean
}
export interface DatiHome {
  formula: string
  percorsi: { titolo: string; link: string; sintesi: string; validata: boolean }[]
  stati: { stato: string; etichetta: string; idee: IdeaHome[] }[]
  piste: PistaHome[]
  /** n: tutte le note; validate: solo quelle validate (la vista di default) */
  conteggi: { etichetta: string; n: number; validate: number }[]
  /** per le tre porte: quanti testi, quante note e fili sulla mappa; con le proposte e senza */
  porte: { testi: number; fonti: number; nodi: number; archi: number }
  porteValidate: { testi: number; fonti: number; nodi: number; archi: number }
  /** quante cose proposte da Claude aspettano un sì o un no (note, blocchi, collegamenti) */
  daValidare: number
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
      .map((n) => ({ titolo: n.titolo, link: n.link, sintesi: sintesi(n.corpo), validata: provenienza(n).validata }))

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
            validata: provenienza(n).validata,
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
        validata: provenienza(n).validata,
      }))

    const conteggi = [
      ['emozione', 'emozioni'], ['concetto', 'concetti'], ['fonte', 'fonti'], ['simbolo', 'simboli'],
      ['stile', 'stili'], ['spunto', 'spunti'], ['ricerca', 'ricerche'],
    ].map(([g, etichetta]) => {
      const delGruppo = tutte.filter((n) => n.gruppo === g)
      return { etichetta, n: delGruppo.length, validate: delGruppo.filter((n) => provenienza(n).validata).length }
    })

    const m = (mappa as any).load()
    const t = (testi as any).load()
    const porte = { testi: t.testi.length, fonti: t.fonti.length, nodi: m.nodi.length, archi: m.archi.length }
    const nodiV = new Set(m.nodi.filter((n: any) => n.validata).map((n: any) => n.id))
    const testiV = t.testi.filter((x: any) => !x.proposta)
    const porteValidate = {
      testi: testiV.length,
      fonti: new Set(testiV.map((x: any) => x.fonte).filter(Boolean)).size,
      nodi: nodiV.size,
      archi: m.archi.filter((a: any) => !a.proposto && nodiV.has(a.source) && nodiV.has(a.target)).length,
    }

    const tipi = new Set([...Object.values(CAMPI_LINK), 'nucleo'])
    const attive = tutte.filter((n) => !n.archiviata && tipi.has(n.tipo))
    const daValidare =
      attive.filter((n) => !provenienza(n).validata).length +
      attive.filter((n) => provenienza(n).validata).reduce((t, n) => t + proposteDi(n.corpo).length, 0) +
      collegamentiProposti().length

    return { formula, percorsi, stati, piste, conteggi, porte, porteValidate, daValidare }
  },
})
