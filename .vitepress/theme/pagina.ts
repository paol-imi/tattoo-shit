// I dati della nota aperta, che arrivano con la pagina (campo `atlante`, messo da transformPageData in
// config.mts): "Collegato da", tavole in bacheca, proposte nella pagina. Uguali sul server e nel browser.
import { computed } from 'vue'
import { useData, type PageData } from 'vitepress'
import type { DatiPagina } from '../core/viste/note.ts'

const VUOTI: DatiPagina = { collegatoDa: [], tavole: { tutte: 0, validate: 0 }, proposte: 0 }

export function useDatiPagina() {
  const { page } = useData()
  return computed(() => (page.value as PageData & { atlante?: DatiPagina }).atlante ?? VUOTI)
}
