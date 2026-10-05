import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import CollegatoDa from './components/CollegatoDa.vue'
import Scheda from './components/Scheda.vue'
import AtlanteHome from './components/AtlanteHome.vue'
import Bacheca from './components/Bacheca.vue'
import Testi from './components/Testi.vue'
import Mappa from './components/Mappa.vue'
import DaValidare from './components/DaValidare.vue'
import './style.css'
import './pagine.css'

export default {
  extends: DefaultTheme,
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      'doc-before': () => h(Scheda),
      'doc-footer-before': () => h(CollegatoDa),
    }),
  enhanceApp({ app }) {
    app.component('AtlanteHome', AtlanteHome)
    app.component('Bacheca', Bacheca)
    app.component('Testi', Testi)
    app.component('Mappa', Mappa)
    app.component('DaValidare', DaValidare)
  },
} satisfies Theme
