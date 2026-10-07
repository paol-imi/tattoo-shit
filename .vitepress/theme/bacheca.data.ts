// Dati della Bacheca (il calcolo è in ../core/viste/bacheca.ts, sull'archivio letto una volta per build;
// le proporzioni dei pin vengono dalla cache su disco o da Pinterest).
import { defineLoader } from 'vitepress'
import { archivio } from '../core/archivio.ts'
import { datiBacheca, type DatiBacheca } from '../core/viste/bacheca.ts'

export type { Carta, NodoBreve, DatiBacheca } from '../core/viste/bacheca.ts'
declare const data: DatiBacheca
export { data }

export default defineLoader({
  watch: ['../../**/*.md'],
  load: (): Promise<DatiBacheca> => datiBacheca(archivio()),
})
