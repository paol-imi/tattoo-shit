// Dati di Testi (il calcolo è in ../core/viste/testi.ts, sull'archivio letto una volta per build).
import { defineLoader } from 'vitepress'
import { archivio } from '../core/archivio.ts'
import { datiTesti, type DatiTesti } from '../core/viste/testi.ts'

export type { Testo, DatiTesti } from '../core/viste/testi.ts'
declare const data: DatiTesti
export { data }

export default defineLoader({
  watch: ['../../**/*.md'],
  load: (): DatiTesti => datiTesti(archivio()),
})
