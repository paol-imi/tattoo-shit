// Plugin markdown-it: una voce di elenco fatta solo di un link a un pin
// (`- [descrizione](https://www.pinterest.com/pin/ID/)`) diventa l'embed ufficiale
// di Pinterest, con la descrizione come didascalia. Su GitHub resta il link.
import type { MarkdownRenderer } from 'vitepress'
import { RE_PIN, urlPin, urlEmbedPin } from './shared/pin.ts'

export function pinterest(md: MarkdownRenderer) {
  md.core.ruler.push('pinterest', (state) => {
    const t = state.tokens
    const liste: any[] = []
    for (let i = 0; i < t.length; i++) {
      const tok = t[i]
      if (tok.type === 'bullet_list_open' || tok.type === 'ordered_list_open') { liste.push(tok); continue }
      if (tok.type === 'bullet_list_close' || tok.type === 'ordered_list_close') { liste.pop(); continue }
      if (tok.type !== 'list_item_open') continue

      const [po, inl, pc] = t.slice(i + 1, i + 4)
      if (po?.type !== 'paragraph_open' || inl?.type !== 'inline' || pc?.type !== 'paragraph_close') continue
      if (t[i + 4]?.type !== 'list_item_close') continue
      const figli = (inl.children ?? []).filter((c) => !(c.type === 'text' && !c.content.trim()))
      if (figli[0]?.type !== 'link_open' || figli[figli.length - 1]?.type !== 'link_close') continue
      if (figli.filter((c) => c.type === 'link_open').length !== 1) continue
      const id = (figli[0].attrGet('href') ?? '').match(RE_PIN)?.[1]
      if (!id) continue

      const interno = figli.slice(1, -1)
      const didascalia = md.renderer.renderInline(interno, md.options, state.env)
      const titolo = md.utils.escapeHtml(interno.map((c) => c.content ?? '').join('').trim() || 'Pin di Pinterest')
      const url = urlPin(id)

      const html = new state.Token('html_block', '', 0)
      html.block = true
      html.content =
        `<figure class="pin">` +
        `<iframe class="pin-embed" src="${urlEmbedPin(id)}" ` +
        `title="${titolo}" width="345" height="520" loading="lazy" frameborder="0" scrolling="no"></iframe>` +
        `<figcaption><a href="${url}" target="_blank" rel="noreferrer">${didascalia}</a></figcaption>` +
        `</figure>\n`
      t.splice(i + 1, 3, html)

      tok.attrJoin('class', 'pin-voce')
      const lista = liste[liste.length - 1]
      if (lista && !(lista.attrGet('class') ?? '').includes('pin-elenco')) lista.attrJoin('class', 'pin-elenco')
    }
  })
}
