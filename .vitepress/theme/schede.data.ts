// Per la riga in testa alle note: tavole in bacheca per nodo e proposte per pagina
// (il calcolo è in ../core/viste/note.ts).
import { defineLoader } from 'vitepress'
import { archivio } from '../core/archivio.ts'
import { schede, type DatiSchede } from '../core/viste/note.ts'

export type { DatiSchede } from '../core/viste/note.ts'
declare const data: DatiSchede
export { data }

export default defineLoader({
  watch: ['../../**/*.md'],
  load: (): DatiSchede => schede(archivio()),
})
