import { defineConfig, type DefaultTheme } from 'vitepress'
import { archivio, diario, perTitolo, REWRITES, BASE, type Nota } from './core/archivio.ts'
import { datiPagina } from './core/viste/note.ts'
import {
  ETICHETTE_GRUPPO, ORDINE_GRUPPI, STATI, ETICHETTE_STATO, STATI_RICERCA, ETICHETTE_STATO_RICERCA, SOTTOCARTELLE_FONTI,
} from './shared/tipi.ts'
import { provenienza } from './shared/nota.ts'
import { SCRIPT_INTERRUTTORE } from './shared/proposte.ts'
import { pinterest } from './pinterest.ts'
import { proposta } from './proposta.ts'
import { collegamenti } from './collegamenti.ts'

const REPO = 'https://github.com/paol-imi/tattoo-shit'

// --- barra laterale e menu, generati dalle cartelle a ogni build
// Solo ciò che è validato: le note proposte da Claude si aprono dal loro indirizzo,
// dalla pagina Da validare o con l'interruttore "proposte" acceso.
const tutte = archivio().note.filter((n) => n.archiviata || provenienza(n.fm).validata)
const voce = (n: Nota): DefaultTheme.SidebarItem => ({ text: n.titolo, link: n.link })
const delGruppo = (g: string) => tutte.filter((n) => n.gruppo === g)
const ordinate = (g: string) => delGruppo(g).sort(perTitolo).map(voce)

// idee e ricerche: un sottogruppo per stato, nell'ordine dato (gli stati sconosciuti in coda)
function perStato(gruppo: string, stati: string[], etichette: Readonly<Record<string, string>>): DefaultTheme.SidebarItem[] {
  const tutteDelGruppo = delGruppo(gruppo)
  const altri = [...new Set(tutteDelGruppo.map((n) => n.fm.stato))].filter((s) => !stati.includes(s))
  return [...stati, ...altri]
    .map((stato) => ({
      text: etichette[stato] ?? stato ?? 'Senza stato',
      collapsed: false,
      items: tutteDelGruppo.filter((n) => n.fm.stato === stato).sort(perTitolo).map(voce),
    }))
    .filter((g) => g.items.length)
}
const idee = () => perStato('idea', STATI, ETICHETTE_STATO)
const ricerche = () => perStato('ricerca', STATI_RICERCA, ETICHETTE_STATO_RICERCA)

function fonti(): DefaultTheme.SidebarItem[] {
  return SOTTOCARTELLE_FONTI.map(([cartella, text]) => ({
    text,
    collapsed: true,
    items: delGruppo('fonte').filter((n) => n.rel.startsWith(`fonti/${cartella}/`)).sort(perTitolo).map(voce),
  })).filter((g) => g.items.length)
}

// in testa a inbox e archivio, il README della cartella
const conIndice = (g: string) => {
  const indice = delGruppo(g).filter((n) => n.rel.endsWith('README.md')).map(voce)
  const resto = delGruppo(g).filter((n) => !n.rel.endsWith('README.md')).sort(perTitolo).map(voce)
  return [...indice, ...resto]
}

const voceDiario = diario(tutte).map(voce)

const gruppi: Record<string, () => DefaultTheme.SidebarItem[]> = {
  nucleo: () => delGruppo('nucleo').map(voce),
  idea: idee,
  ricerca: ricerche,
  fonte: fonti,
  inbox: () => conIndice('inbox'),
  diario: () => voceDiario,
  archivio: () => conIndice('archivio'),
}
const aperti = new Set(['nucleo', 'percorso', 'idea', 'ricerca'])

const sidebar: DefaultTheme.SidebarItem[] = ORDINE_GRUPPI.map((g) => ({
  text: ETICHETTE_GRUPPO[g],
  collapsed: !aperti.has(g),
  items: (gruppi[g] ?? (() => ordinate(g)))(),
})).filter((g) => g.items.length)


const SENZA_BARRA_FINALE = String.raw`if(/[^/]\/$/.test(location.pathname))location.replace(location.pathname.slice(0,-1)+location.search+location.hash)`

const percorsi = delGruppo('percorso').sort(perTitolo).map(voce)

export default defineConfig({
  lang: 'it-IT',
  title: 'Atlante',
  description: 'Un archivio di idee per tatuaggi: concetti, simboli, fonti. Prima il concetto, poi il soggetto.',
  base: BASE,
  cleanUrls: true,
  lastUpdated: true,
  srcExclude: ['README.md', 'CLAUDE.md', '_templates/**', 'node_modules/**', 'scripts/**'],
  rewrites: REWRITES,
  head: [
    ['meta', { name: 'theme-color', content: '#111111' }],
    // le proposte di Claude: spente di default; ?proposte=1 (o 0) le forza, altrimenti vale la preferenza salvata.
    // La classe su <html> c'è prima del primo disegno: niente lampi. I componenti la leggono dopo il montaggio.
    ['script', {}, SCRIPT_INTERRUTTORE],
  ],

  // GitHub Pages serve /pagina.html anche come /pagina, ma non come /pagina/: lì risponde con il 404.
  // Nel 404, prima di tutto, un indirizzo che finisce con la barra la perde (le cartelle con index.html
  // non arrivano mai qui, quindi niente giri a vuoto).
  transformHtml(html, _id, { page }) {
    if (page !== '404.md') return
    return html.replace('<head>', `<head><script>${SENZA_BARRA_FINALE}</script>`)
  },

  // il titolo della pagina viene dal campo "titolo" del frontmatter; in `atlante` i dati della nota
  // per la riga in testa e per "Collegato da" (theme/pagina.ts)
  transformPageData(pageData) {
    const titolo = pageData.frontmatter.titolo
    if (titolo) pageData.title = String(titolo)
    if (pageData.frontmatter.layout !== 'home') Object.assign(pageData, { atlante: datiPagina(archivio(), pageData.filePath) })
  },

  markdown: {
    config(md) {
      md.use(pinterest)
      md.use(proposta)
      md.use(collegamenti)
    },
  },

  themeConfig: {
    nav: [
      { text: 'Bacheca', link: '/bacheca' },
      { text: 'Testi', link: '/testi' },
      { text: 'Mappa', link: '/mappa' },
      { text: 'Nucleo', link: '/nucleo' },
      { text: 'Idee', link: '/#le-idee' },
      { text: 'Ricerche', link: '/#piste-aperte' },
      { text: 'Percorsi', items: percorsi.map((p) => ({ text: p.text!, link: p.link! })) },
      { text: 'Diario', items: voceDiario.map((p) => ({ text: p.text!, link: p.link! })) },
    ],
    sidebar,
    outline: { level: [2, 2], label: 'In questa pagina' },
    socialLinks: [{ icon: 'github', link: REPO, ariaLabel: 'Il repository su GitHub' }],
    editLink: { pattern: `${REPO}/edit/main/:path`, text: 'Modifica su GitHub' },
    lastUpdated: { text: 'Ultima modifica', formatOptions: { dateStyle: 'long', forceLocale: true } },
    docFooter: { prev: 'Precedente', next: 'Successiva' },
    darkModeSwitchLabel: 'Aspetto',
    lightModeSwitchTitle: 'Passa al tema chiaro',
    darkModeSwitchTitle: 'Passa al tema scuro',
    sidebarMenuLabel: 'Indice',
    returnToTopLabel: 'Torna su',
    langMenuLabel: 'Lingua',
    skipToContentLabel: 'Vai al contenuto',
    externalLinkIcon: true,
    notFound: {
      title: 'PAGINA NON TROVATA',
      quote: 'Non tutti quelli che vagano sono perduti, ma questa pagina sì.',
      linkLabel: "torna all'inizio",
      linkText: "Torna all'inizio",
      code: '404',
    },
    search: {
      provider: 'local',
      options: {
        // l'indice contiene solo il validato: niente note proposte, niente blocchi proposta né collegamenti proposti.
        // Le pagine fatte solo di un componente (Bacheca, Testi, Mappa, Da validare) non hanno testo da indicizzare;
        // per togliere dalla ricerca una pagina basta `search: false` nel suo frontmatter.
        _render(src, env, md) {
          const e: any = Object.assign(env, { perLaRicerca: true })
          const html = md.render(src, e)
          const fm = e.frontmatter ?? {}
          if (fm.search === false || !provenienza(fm).validata) return ''
          return html
        },
        translations: {
          button: { buttonText: 'Cerca', buttonAriaLabel: 'Cerca' },
          modal: {
            displayDetails: 'Mostra i dettagli',
            resetButtonTitle: 'Cancella la ricerca',
            backButtonTitle: 'Chiudi la ricerca',
            noResultsText: 'Nessun risultato per',
            footer: {
              selectText: 'per aprire',
              selectKeyAriaLabel: 'invio',
              navigateText: 'per spostarti',
              navigateUpKeyAriaLabel: 'freccia su',
              navigateDownKeyAriaLabel: 'freccia giù',
              closeText: 'per chiudere',
              closeKeyAriaLabel: 'esc',
            },
          },
        },
      },
    },
  },
})
