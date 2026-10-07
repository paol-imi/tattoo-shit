// Dati della home: la formula del nucleo, i percorsi, le idee con stato, formato e risonanza,
// le piste aperte (ricerche non ancora fatte), i conteggi delle tre porte.
import { memo, perTitolo, testoFm, type Archivio, type Nota } from '../archivio.ts'
import { sintesi } from '../testo.ts'
import { proposteDi } from '../blocchi.ts'
import { collegamentiProposti } from '../proposte.ts'
import { datiAtlante } from './atlante.ts'
import { datiTesti } from './testi.ts'
import { STATI, ETICHETTE_STATO, STATI_RICERCA, ETICHETTE_STATO_RICERCA, TIPI_MAPPA } from '../../shared/tipi.ts'
import { provenienza, risonanzaDi } from '../../shared/nota.ts'

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
export interface Porte { testi: number; fonti: number; domande: number; nodi: number; archi: number }
export interface DatiHome {
  formula: string
  percorsi: { titolo: string; link: string; sintesi: string; validata: boolean }[]
  stati: { stato: string; etichetta: string; idee: IdeaHome[] }[]
  piste: PistaHome[]
  /** n: tutte le note; validate: solo quelle validate (la vista di default) */
  conteggi: { etichetta: string; n: number; validate: number }[]
  /** per le tre porte: quanti testi, quante domande, nodi e fili sulla mappa; con le proposte e senza */
  porte: Porte
  porteValidate: Porte
  /** quante cose proposte da Claude aspettano un sì o un no (note, blocchi, collegamenti) */
  daValidare: number
}

// i conteggi in fondo alla home, con il loro nome al plurale
const CONTEGGI = [
  ['emozione', 'emozioni'], ['concetto', 'concetti'], ['fonte', 'fonti'], ['simbolo', 'simboli'],
  ['stile', 'stili'], ['spunto', 'spunti'], ['ricerca', 'ricerche'],
]

export const datiHome = (a: Archivio): DatiHome => memo(a, 'home', () => {
  const tutte = a.note
  const validata = (n: Nota) => provenienza(n.fm).validata
  const nucleo = a.perRel.get('nucleo.md')
  const formula = nucleo?.corpo.match(/^>\s*\*\*(.+?)\*\*\s*$/m)?.[1] ?? ''

  const percorsi = tutte
    .filter((n) => n.gruppo === 'percorso')
    .sort(perTitolo)
    .map((n) => ({ titolo: n.titolo, link: n.link, sintesi: sintesi(n.corpo), validata: validata(n) }))

  const idee = tutte.filter((n) => n.gruppo === 'idea').sort(perTitolo)
  const stati = STATI.map((stato) => ({
    stato,
    etichetta: ETICHETTE_STATO[stato],
    idee: idee
      .filter((n) => testoFm(n.fm.stato) === stato)
      .map((n) => ({
        titolo: n.titolo,
        link: n.link,
        stato,
        formato: testoFm(n.fm.formato) || null,
        risonanza: risonanzaDi(n.fm.risonanza),
        concetto: sintesi(n.corpo, 'Concetto'),
        validata: validata(n),
      })),
  }))

  // piste aperte: tutte le ricerche non fatte, prima quelle in corso
  const statoDi = (n: Nota) => testoFm(n.fm.stato)
  const ordineStato = (s: string | null) => (s != null && STATI_RICERCA.includes(s) ? STATI_RICERCA.indexOf(s) : STATI_RICERCA.length)
  const piste = tutte
    .filter((n) => n.gruppo === 'ricerca' && statoDi(n) !== 'fatta')
    .sort((x, y) => ordineStato(statoDi(x)) - ordineStato(statoDi(y)) || perTitolo(x, y))
    .map((n) => {
      const stato = statoDi(n)
      return {
        titolo: n.titolo,
        link: n.link,
        stato: (stato != null ? ETICHETTE_STATO_RICERCA[stato] ?? stato : null) ?? 'senza stato',
        oggetto: testoFm(n.fm.oggetto) || sintesi(n.corpo),
        validata: validata(n),
      }
    })

  const conteggi = CONTEGGI.map(([g, etichetta]) => {
    const delGruppo = tutte.filter((n) => n.gruppo === g)
    return { etichetta, n: delGruppo.length, validate: delGruppo.filter(validata).length }
  })

  // la Mappa è l'Atlante dei concetti: le domande, i nodi e i fili (i legami); validati come li filtra il sito
  const m = datiAtlante(a)
  const t = datiTesti(a)
  const porte = {
    testi: t.testi.length, fonti: t.fonti.length, domande: m.domande.length, nodi: m.nodi.length, archi: m.legami.length,
  }
  const nodiV = new Set(m.nodi.filter((n) => n.validata).map((n) => n.id))
  const testiV = t.testi.filter((x) => !x.proposta)
  const porteValidate = {
    testi: testiV.length,
    fonti: new Set(testiV.map((x) => x.fonte).filter(Boolean)).size,
    domande: m.domande.filter((q) => q.validata !== false).length,
    nodi: nodiV.size,
    archi: m.legami.filter((x) => !x.proposto && nodiV.has(x.da) && nodiV.has(x.a)).length,
  }

  const attive = tutte.filter((n) => !n.archiviata && TIPI_MAPPA.has(n.tipo))
  const daValidare =
    attive.filter((n) => !validata(n)).length +
    attive.filter(validata).reduce((tot, n) => tot + proposteDi(n.corpo).length, 0) +
    collegamentiProposti(a).length

  return { formula, percorsi, stati, piste, conteggi, porte, porteValidate, daValidare }
})
