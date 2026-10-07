// Dati dell'Atlante dei concetti (il calcolo è in ../core/viste/atlante.ts, sull'archivio letto una volta per build).
import { defineLoader } from 'vitepress'
import { archivio } from '../core/archivio.ts'
import { datiAtlante, type DatiAtlante } from '../core/viste/atlante.ts'

export type {
  DomandaAtlante, DisciplinaAtlante, FiloneAtlante, CitazioneAtlante, NodoAtlante, LegameAtlante, TipoLegame,
  CostellazioneAtlante, DatiAtlante,
} from '../core/viste/atlante.ts'
declare const data: DatiAtlante
export { data }

export default defineLoader({
  watch: ['../../**/*.md'],
  load: (): DatiAtlante => datiAtlante(archivio()),
})
