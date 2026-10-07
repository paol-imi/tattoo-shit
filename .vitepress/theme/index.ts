import { defineAsyncComponent, defineComponent, h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import { onContentUpdated, type Theme } from 'vitepress'
import CollegatoDa from './components/CollegatoDa.vue'
import Scheda from './components/Scheda.vue'
import Interruttore from './components/Interruttore.vue'
import './style.css'
import './pagine.css'
import { CLASSE_PROPOSTE } from '../shared/proposte.ts'

// Nell'indice "In questa pagina" le voci dei titoli fatti solo di proposte (h2.solo-proposte, vedi
// ../proposta.ts) seguono il loro titolo: nascoste finché le proposte sono spente. L'indice c'è due volte,
// a lato e, sul telefono, nel menu a tendina che VitePress disegna solo quando si apre: per questo
// la regola è un foglio di stile della pagina, aggiornato a ogni cambio di contenuto, e non una classe.
const ID_STILE = 'atlante-indice-proposte'
function segnaIndice() {
  const titoli = [...document.querySelectorAll<HTMLElement>('.vp-doc h2.solo-proposte[id]')]
  let stile = document.getElementById(ID_STILE)
  if (!stile) {
    stile = document.createElement('style')
    stile.id = ID_STILE
    document.head.appendChild(stile)
  }
  stile.textContent = titoli.length
    ? titoli.map((t) => `html:not(.${CLASSE_PROPOSTE}) li:has(> .outline-link[href="#${CSS.escape(t.id)}"])`).join(',\n') +
      ' { display: none; }'
    : ''
}

const Layout = defineComponent({
  name: 'AtlanteLayout',
  setup() {
    onContentUpdated(segnaIndice)
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
  // i componenti delle pagine speciali (e i loro dati) si caricano solo quando servono, in chunk a parte
  enhanceApp({ app }) {
    app.component('AtlanteHome', defineAsyncComponent(() => import('./components/AtlanteHome.vue')))
    app.component('Bacheca', defineAsyncComponent(() => import('./components/Bacheca.vue')))
    app.component('Testi', defineAsyncComponent(() => import('./components/Testi.vue')))
    app.component('Mappa', defineAsyncComponent(() => import('./components/Mappa.vue')))
    app.component('DaValidare', defineAsyncComponent(() => import('./components/DaValidare.vue')))
  },
} satisfies Theme
