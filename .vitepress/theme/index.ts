import { defineComponent, h, nextTick } from 'vue'
import DefaultTheme from 'vitepress/theme'
import { onContentUpdated, type Theme } from 'vitepress'
import CollegatoDa from './components/CollegatoDa.vue'
import Scheda from './components/Scheda.vue'
import AtlanteHome from './components/AtlanteHome.vue'
import Bacheca from './components/Bacheca.vue'
import Testi from './components/Testi.vue'
import Mappa from './components/Mappa.vue'
import DaValidare from './components/DaValidare.vue'
import Interruttore from './components/Interruttore.vue'
import './style.css'
import './pagine.css'

// nell'indice "In questa pagina", le voci dei titoli fatti solo di proposte seguono il loro titolo
function segnaIndice() {
  for (const t of document.querySelectorAll<HTMLElement>('.vp-doc h2.solo-proposte[id]')) {
    document.querySelector(`.VPDocAsideOutline a.outline-link[href="#${CSS.escape(t.id)}"]`)?.parentElement?.classList.add('solo-proposte')
  }
}

const Layout = defineComponent({
  name: 'AtlanteLayout',
  setup() {
    onContentUpdated(() => nextTick(() => requestAnimationFrame(segnaIndice)))
    return () =>
      h(DefaultTheme.Layout, null, {
        'doc-before': () => h(Scheda),
        'doc-footer-before': () => h(CollegatoDa),
        'nav-bar-content-after': () => h(Interruttore),
        'nav-screen-content-after': () => h(Interruttore, { schermo: true }),
      })
  },
})

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('AtlanteHome', AtlanteHome)
    app.component('Bacheca', Bacheca)
    app.component('Testi', Testi)
    app.component('Mappa', Mappa)
    app.component('DaValidare', DaValidare)
  },
} satisfies Theme
