// Dati della home (il calcolo è in ../core/viste/home.ts, sull'archivio letto una volta per build).
// Si rigenera da solo a ogni build (e in sviluppo quando cambia una nota).
import { defineLoader } from 'vitepress'
import { archivio } from '../core/archivio.ts'
import { datiHome, type DatiHome } from '../core/viste/home.ts'

export type { IdeaHome, PistaHome, DatiHome } from '../core/viste/home.ts'
declare const data: DatiHome
export { data }

export default defineLoader({
  watch: ['../../**/*.md'],
  load: (): DatiHome => datiHome(archivio()),
})
