// Dati della pagina Da validare: ciò che Claude ha proposto e io non ho ancora approvato.
// (a) le note con `validata: false`; (b) i blocchi proposta dentro le note validate;
// (c) i collegamenti aggiunti in migrazione, dall'elenco nel diario della fase 1.
// Tutto si rigenera a ogni build, leggendo le note.
import { defineLoader, createMarkdownRenderer } from 'vitepress'
import {
  note, perTitolo, sintesi, primeFrasi, provenienza, proposteDi, collegamentiProposti, linkDi,
  ROOT, BASE, DIARIO_MIGRAZIONE, ETICHETTE_ORIGINE, type Nota,
} from '../atlante'

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

const TIPI: Record<string, string> = {
  nucleo: 'Nucleo', idea: 'Idea', spunto: 'Spunto', ricerca: 'Ricerca', emozione: 'Emozione', concetto: 'Concetto',
  fonte: 'Fonte', simbolo: 'Simbolo', stile: 'Stile', percorso: 'Percorso',
}
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

let renderer: Awaited<ReturnType<typeof createMarkdownRenderer>> | undefined

export default defineLoader({
  watch: ['../../**/*.md'],
  async load(): Promise<DatiValidare> {
    renderer ??= await createMarkdownRenderer(ROOT, {}, BASE)
    const md = renderer
    const html = (testo: string, rel: string) => md.render(testo, { cleanUrls: true, relativePath: rel })
    const tutte = note().filter((n) => !n.archiviata && TIPI[n.tipo])

    const daValidare = tutte.filter((n) => !provenienza(n).validata).sort((a, b) => rango(a) - rango(b) || perTitolo(a, b))
    const noteOut = daValidare.map((n) => ({
      titolo: n.titolo,
      link: n.link,
      tipo: n.tipo,
      etichetta: TIPI[n.tipo],
      sintesi: sintesiDi(n),
      origine: ETICHETTE_ORIGINE[provenienza(n).origine] ?? provenienza(n).origine,
      seme: provenienza(n).origine === 'seme',
      creato: n.fm.creato ? String(n.fm.creato) : null,
    }))

    const proposte: PropostaDentro[] = tutte
      .filter((n) => provenienza(n).validata)
      .sort((a, b) => rango(a) - rango(b) || perTitolo(a, b))
      .flatMap((n) =>
        proposteDi(n.corpo).map((p) => ({
          id: `${n.slug}-${p.n}`,
          nota: { titolo: n.titolo, link: n.link, tipo: n.tipo, etichetta: TIPI[n.tipo] },
          sezione: p.sezione,
          ancora: `#proposta-${p.n}`,
          html: html(p.md, n.rel),
        })),
      )

    const collegamenti = collegamentiProposti().map((c) => ({
      html: md.renderInline(c.md, { cleanUrls: true, relativePath: DIARIO_MIGRAZIONE }),
    }))
    const diario = note().find((n) => n.rel === DIARIO_MIGRAZIONE)

    return {
      note: noteOut,
      proposte,
      collegamenti,
      diario: { titolo: diario?.titolo ?? 'Diario della fase 1', link: diario?.link ?? linkDi(DIARIO_MIGRAZIONE) },
      totale: noteOut.length + proposte.length + collegamenti.length,
    }
  },
})
