import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import CollegatoDa from './components/CollegatoDa.vue'
import Scheda from './components/Scheda.vue'
import AtlanteHome from './components/AtlanteHome.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      'doc-before': () => h(Scheda),
      'doc-footer-before': () => h(CollegatoDa),
    }),
  enhanceApp({ app }) {
    app.component('AtlanteHome', AtlanteHome)
  },
} satisfies Theme
