// Backlink: per ogni pagina, le note che la citano (il calcolo è in ../core/viste/note.ts).
import { defineLoader } from 'vitepress'
import { archivio } from '../core/archivio.ts'
import { backlink, type Backlink } from '../core/viste/note.ts'

export type { GruppoBacklink, Backlink } from '../core/viste/note.ts'
declare const data: Backlink
export { data }

export default defineLoader({
  watch: ['../../**/*.md'],
  load: (): Backlink => backlink(archivio()),
})
