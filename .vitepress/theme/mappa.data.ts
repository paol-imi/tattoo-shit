// Dati della Mappa (il calcolo è in ../core/viste/mappa.ts, sull'archivio letto una volta per build).
import { defineLoader } from 'vitepress'
import { archivio } from '../core/archivio.ts'
import { datiMappa, type DatiMappa } from '../core/viste/mappa.ts'

export type { NodoMappa, ArcoMappa, DatiMappa } from '../core/viste/mappa.ts'
declare const data: DatiMappa
export { data }

export default defineLoader({
  watch: ['../../**/*.md'],
  load: (): DatiMappa => datiMappa(archivio()),
})
