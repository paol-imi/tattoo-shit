// Dati della pagina Da validare: ciò che Claude ha proposto e io non ho ancora approvato.
// (a) le note con `validata: false`; (b) i blocchi proposta dentro le note validate;
// (c) i collegamenti aggiunti in migrazione, dall'elenco nel diario della fase 1.
import { perTitolo, linkDi, testoFm, type Archivio, type Nota } from '../archivio.ts'
import { sintesi, primeFrasi } from '../testo.ts'
import { proposteDi } from '../blocchi.ts'
import { collegamentiProposti, DIARIO_MIGRAZIONE } from '../proposte.ts'
import { ETICHETTE_TIPO, ETICHETTE_ORIGINE, TIPI_MAPPA } from '../../shared/tipi.ts'
import { provenienza } from '../../shared/nota.ts'

export interface NotaDaValidare {
  titolo: string
  link: string
  tipo: string
  etichetta: string
  sintesi: string
  origine: string
  /** viene dal seme: una proposta di Claude nella chat d'origine */
  seme: boolean
  creato: string | null
}
export interface PropostaDentro {
  id: string
  nota: { titolo: string; link: string; tipo: string; etichetta: string }
  sezione: string
  ancora: string
  html: string
}
export interface DatiValidare {
  note: NotaDaValidare[]
  proposte: PropostaDentro[]
  collegamenti: { html: string }[]
  diario: { titolo: string; link: string }
  totale: number
}

/** Il markdown → HTML del sito, per il percorso della nota da cui viene il testo. */
export interface Renderer {
  render(testo: string, rel: string): string
  renderInline(testo: string, rel: string): string
}

const ORDINE = ['nucleo', 'idea', 'spunto', 'ricerca', 'percorso', 'concetto', 'simbolo', 'fonte', 'emozione', 'stile']
const rango = (n: Nota) => (ORDINE.includes(n.tipo) ? ORDINE.indexOf(n.tipo) : ORDINE.length)
const inOrdine = (x: Nota, y: Nota) => rango(x) - rango(y) || perTitolo(x, y)

function sintesiGrezza(n: Nota): string {
  const oggetto = testoFm(n.fm.oggetto)
  if (n.tipo === 'ricerca' && oggetto) return oggetto
  if (n.tipo === 'idea') return primeFrasi(n.corpo, 'Concetto') || primeFrasi(n.corpo, 'Composizione')
  if (n.tipo === 'spunto') return primeFrasi(n.corpo, 'Il frammento')
  return sintesi(n.corpo)
}
const sintesiDi = (n: Nota) => sintesiGrezza(n).replace(/\s*:$/, '.')

export function datiValidare(a: Archivio, md: Renderer): DatiValidare {
  const tutte = a.note.filter((n) => !n.archiviata && TIPI_MAPPA.has(n.tipo))

  const noteOut = tutte
    .filter((n) => !provenienza(n.fm).validata)
    .sort(inOrdine)
    .map((n) => {
      const { origine } = provenienza(n.fm)
      return {
        titolo: n.titolo,
        link: n.link,
        tipo: n.tipo,
        etichetta: ETICHETTE_TIPO[n.tipo],
        sintesi: sintesiDi(n),
        origine: ETICHETTE_ORIGINE[origine] ?? origine,
        seme: origine === 'seme',
        creato: testoFm(n.fm.creato),
      }
    })

  const proposte: PropostaDentro[] = tutte
    .filter((n) => provenienza(n.fm).validata)
    .sort(inOrdine)
    .flatMap((n) =>
      proposteDi(n.corpo).map((p) => ({
        id: `${n.slug}-${p.n}`,
        nota: { titolo: n.titolo, link: n.link, tipo: n.tipo, etichetta: ETICHETTE_TIPO[n.tipo] },
        sezione: p.sezione,
        ancora: `#proposta-${p.n}`,
        html: md.render(p.md, n.rel),
      })),
    )

  const collegamenti = collegamentiProposti(a).map((c) => ({ html: md.renderInline(c.md, DIARIO_MIGRAZIONE) }))
  const diario = a.perRel.get(DIARIO_MIGRAZIONE)

  return {
    note: noteOut,
    proposte,
    collegamenti,
    diario: { titolo: diario?.titolo ?? 'Diario della fase 1', link: diario?.link ?? linkDi(DIARIO_MIGRAZIONE) },
    totale: noteOut.length + proposte.length + collegamenti.length,
  }
}
