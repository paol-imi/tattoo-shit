import { defineConfig, type DefaultTheme } from 'vitepress'
import {
  note, diario, perTitolo, ETICHETTE, ORDINE_GRUPPI, STATI, ETICHETTE_STATO, SOTTOCARTELLE_FONTI, REWRITES,
  type Nota,
} from './atlante'
import { pinterest } from './pinterest'

const REPO = 'https://github.com/paol-imi/tattoo-shit'

// --- barra laterale e menu, generati dalle cartelle a ogni build
const tutte = note()
const voce = (n: Nota): DefaultTheme.SidebarItem => ({ text: n.titolo, link: n.link })
const delGruppo = (g: string) => tutte.filter((n) => n.gruppo === g)
const ordinate = (g: string) => delGruppo(g).sort(perTitolo).map(voce)

function idee(): DefaultTheme.SidebarItem[] {
  const tutteIdee = delGruppo('idea')
  const altri = [...new Set(tutteIdee.map((n) => n.fm.stato))].filter((s) => !STATI.includes(s))
  return [...STATI, ...altri]
    .map((stato) => ({
      text: ETICHETTE_STATO[stato] ?? stato ?? 'Senza stato',
      collapsed: false,
      items: tutteIdee.filter((n) => n.fm.stato === stato).sort(perTitolo).map(voce),
    }))
    .filter((g) => g.items.length)
}

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
  fonte: fonti,
  inbox: () => conIndice('inbox'),
  diario: () => voceDiario,
  archivio: () => conIndice('archivio'),
}
const aperti = new Set(['nucleo', 'percorso', 'idea'])

const sidebar: DefaultTheme.SidebarItem[] = ORDINE_GRUPPI.map((g) => ({
  text: ETICHETTE[g],
  collapsed: aperti.has(g) ? false : true,
  items: (gruppi[g] ?? (() => ordinate(g)))(),
})).filter((g) => g.items.length)

const percorsi = delGruppo('percorso').sort(perTitolo).map(voce)

export default defineConfig({
  lang: 'it-IT',
  title: 'Atlante',
  description: 'Un archivio di idee per tatuaggi: concetti, simboli, fonti. Prima il concetto, poi il soggetto.',
  base: '/tattoo-shit/',
  cleanUrls: true,
  lastUpdated: true,
  srcExclude: ['README.md', 'CLAUDE.md', '_templates/**', 'node_modules/**', 'scripts/**'],
  rewrites: REWRITES,
  head: [['meta', { name: 'theme-color', content: '#111111' }]],

  // il titolo della pagina viene dal campo "titolo" del frontmatter
  transformPageData(pageData) {
    const titolo = pageData.frontmatter.titolo
    if (titolo) pageData.title = String(titolo)
  },

  markdown: {
    config(md) {
      md.use(pinterest)
    },
  },

  themeConfig: {
    nav: [
      { text: 'Nucleo', link: '/nucleo' },
      { text: 'Idee', link: '/#le-idee' },
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
