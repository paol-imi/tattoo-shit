// Plugin markdown-it: il blocco "proposta di Claude".
// Nel markdown è un avviso in stile GitHub, con l'etichetta in grassetto sulla prima riga:
//
//   > [!NOTE]
//   > **Proposta di Claude, da validare.**
//   >
//   > il testo proposto…
//
// Su GitHub resta una nota con l'etichetta in grassetto. Sul sito diventa un blocco "proposta"
// con il filetto rosso e l'ancora #proposta-N (N in ordine nella pagina, come nella pagina Da validare).
import type { MarkdownRenderer } from 'vitepress'

const ETICHETTA = /^\*\*Proposta di Claude, da validare\.\*\*[ \t]*\n?/

export function proposta(md: MarkdownRenderer) {
  md.core.ruler.after('github-alerts', 'proposta-di-claude', (state) => {
    const t = state.tokens
    let n = 0
    for (let i = 0; i < t.length; i++) {
      const open = t[i]
      if (open.type !== 'github_alert_open' || open.meta?.type !== 'note') continue
      const j = t.findIndex((x, k) => k > i && x.type === 'inline')
      const inl = t[j]
      if (!inl || !ETICHETTA.test(inl.content)) continue
      inl.content = inl.content.replace(ETICHETTA, '').trimStart()
      // se l'etichetta era sola nel suo paragrafo, via il paragrafo vuoto
      if (!inl.content && t[j - 1]?.type === 'paragraph_open' && t[j + 1]?.type === 'paragraph_close') t.splice(j - 1, 3)
      open.meta = { ...open.meta, proposta: ++n }
    }
  })
  const prima = md.renderer.rules.github_alert_open!
  md.renderer.rules.github_alert_open = (tokens, idx, options, env, self) => {
    const n = tokens[idx].meta?.proposta
    if (!n) return prima(tokens, idx, options, env, self)
    return (
      `<div class="proposta custom-block github-alert" id="proposta-${n}">` +
      `<p class="custom-block-title"><span class="proposta-chi">Proposta di Claude</span>` +
      `<span class="proposta-stato">da validare</span>` +
      `<a class="proposta-ancora" href="#proposta-${n}" aria-label="Link a questa proposta">#</a></p>\n`
    )
  }
}
