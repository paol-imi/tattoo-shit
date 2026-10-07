// Dati della pagina Da validare: ciò che Claude ha proposto e io non ho ancora approvato.
// (a) le note con `validata: false`; (b) i blocchi proposta dentro le note validate;
// (c) i collegamenti aggiunti in migrazione, dall'elenco nel diario della fase 1.
// Tutto si rigenera a ogni build, leggendo le note.
import { defineLoader, createMarkdownRenderer, type SiteConfig } from 'vitepress'
import {
  note, perTitolo, sintesi, primeFrasi, proposteDi, collegamentiProposti, linkDi, ROOT, BASE, DIARIO_MIGRAZIONE, type Nota,
} from '../atlante'
import { ETICHETTE_TIPO, ETICHETTE_ORIGINE, TIPI_MAPPA } from '../shared/tipi.ts'
import { provenienza } from '../shared/nota.ts'

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

declare const data: DatiValidare
export { data }

const ORDINE = ['nucleo', 'idea', 'spunto', 'ricerca', 'percorso', 'concetto', 'simbolo', 'fonte', 'emozione', 'stile']
const rango = (n: Nota) => (ORDINE.includes(n.tipo) ? ORDINE.indexOf(n.tipo) : ORDINE.length)

function sintesiDi(n: Nota): string {
  return sintesiGrezza(n).replace(/\s*:$/, '.')
}
function sintesiGrezza(n: Nota): string {
  if (n.tipo === 'ricerca' && n.fm.oggetto) return String(n.fm.oggetto)
  if (n.tipo === 'idea') return primeFrasi(n.corpo, 'Concetto') || primeFrasi(n.corpo, 'Composizione')
  if (n.tipo === 'spunto') return primeFrasi(n.corpo, 'Il frammento')
  return sintesi(n.corpo)
}

export default defineLoader({
  watch: ['../../**/*.md'],
  async load(): Promise<DatiValidare> {
    // lo stesso renderer delle pagine, con la configurazione markdown del sito (plugin compresi):
    // VitePress lo crea una volta sola e qui lo riprende
    const sito = (globalThis as { VITEPRESS_CONFIG?: SiteConfig }).VITEPRESS_CONFIG
    const md = await createMarkdownRenderer(sito?.srcDir ?? ROOT, sito?.markdown ?? {}, sito?.site.base ?? BASE, sito?.logger)
    const cleanUrls = sito?.cleanUrls ?? true
    const html = (testo: string, rel: string) => md.render(testo, { cleanUrls, relativePath: rel })
    const tutteLeNote = note()
    const tutte = tutteLeNote.filter((n) => !n.archiviata && TIPI_MAPPA.has(n.tipo))

    const daValidare = tutte.filter((n) => !provenienza(n.fm).validata).sort((a, b) => rango(a) - rango(b) || perTitolo(a, b))
    const noteOut = daValidare.map((n) => ({
      titolo: n.titolo,
      link: n.link,
      tipo: n.tipo,
      etichetta: ETICHETTE_TIPO[n.tipo],
      sintesi: sintesiDi(n),
      origine: ETICHETTE_ORIGINE[provenienza(n.fm).origine] ?? provenienza(n.fm).origine,
      seme: provenienza(n.fm).origine === 'seme',
      creato: n.fm.creato ? String(n.fm.creato) : null,
    }))

    const proposte: PropostaDentro[] = tutte
      .filter((n) => provenienza(n.fm).validata)
      .sort((a, b) => rango(a) - rango(b) || perTitolo(a, b))
      .flatMap((n) =>
        proposteDi(n.corpo).map((p) => ({
          id: `${n.slug}-${p.n}`,
          nota: { titolo: n.titolo, link: n.link, tipo: n.tipo, etichetta: ETICHETTE_TIPO[n.tipo] },
          sezione: p.sezione,
          ancora: `#proposta-${p.n}`,
          html: html(p.md, n.rel),
        })),
      )

    const collegamenti = collegamentiProposti().map((c) => ({
      html: md.renderInline(c.md, { cleanUrls, relativePath: DIARIO_MIGRAZIONE }),
    }))
    const diario = tutteLeNote.find((n) => n.rel === DIARIO_MIGRAZIONE)

    return {
      note: noteOut,
      proposte,
      collegamenti,
      diario: { titolo: diario?.titolo ?? 'Diario della fase 1', link: diario?.link ?? linkDi(DIARIO_MIGRAZIONE) },
      totale: noteOut.length + proposte.length + collegamenti.length,
    }
  },
})
