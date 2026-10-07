// Dati della pagina Da validare (il calcolo è in ../core/viste/validare.ts, sull'archivio letto una volta
// per build). Il markdown delle proposte si rende con il renderer delle pagine, con la configurazione
// markdown del sito (plugin compresi): VitePress lo crea una volta sola e qui lo riprende.
import { defineLoader, createMarkdownRenderer, type SiteConfig } from 'vitepress'
import { archivio, ROOT, BASE } from '../core/archivio.ts'
import { datiValidare, type DatiValidare } from '../core/viste/validare.ts'

export type { NotaDaValidare, PropostaDentro, DatiValidare } from '../core/viste/validare.ts'
declare const data: DatiValidare
export { data }

export default defineLoader({
  watch: ['../../**/*.md'],
  async load(): Promise<DatiValidare> {
    const sito = (globalThis as { VITEPRESS_CONFIG?: SiteConfig }).VITEPRESS_CONFIG
    const md = await createMarkdownRenderer(sito?.srcDir ?? ROOT, sito?.markdown ?? {}, sito?.site.base ?? BASE, sito?.logger)
    const cleanUrls = sito?.cleanUrls ?? true
    return datiValidare(archivio(), {
      render: (testo, rel) => md.render(testo, { cleanUrls, relativePath: rel }),
      renderInline: (testo, rel) => md.renderInline(testo, { cleanUrls, relativePath: rel }),
    })
  },
})
