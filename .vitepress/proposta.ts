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
// Di default il sito lo nasconde (si vede con l'interruttore "proposte"): un titolo `##` la cui sezione
// è fatta solo di blocchi proposta prende la classe `solo-proposte`, così sparisce con loro.
// Per l'indice della ricerca (env.perLaRicerca) i blocchi proposta si tolgono del tutto.
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
    if (!n) return

    // gli intervalli [inizio, fine] dei blocchi proposta
    const intervalli: [number, number][] = []
    for (let i = 0; i < t.length; i++) {
      if (t[i].type !== 'github_alert_open' || !t[i].meta?.proposta) continue
      let livello = 0
      for (let k = i; k < t.length; k++) {
        if (t[k].type === 'github_alert_open') livello++
        else if (t[k].type === 'github_alert_close' && --livello === 0) { intervalli.push([i, k]); i = k; break }
      }
    }
    const dentro = (k: number) => intervalli.some(([a, b]) => k >= a && k <= b)

    // i titoli ## con solo proposte nella loro sezione
    for (let i = 0; i < t.length; i++) {
      if (t[i].type !== 'heading_open' || t[i].tag !== 'h2') continue
      let k = i + 3
      let solo = true
      let qualcuna = false
      for (; k < t.length && !(t[k].type === 'heading_open' && (t[k].tag === 'h1' || t[k].tag === 'h2')); k++) {
        if (dentro(k)) qualcuna = true
        else solo = false
      }
      if (solo && qualcuna) t[i].attrJoin('class', 'solo-proposte')
    }

    if (state.env?.perLaRicerca) {
      for (const [a, b] of [...intervalli].reverse()) t.splice(a, b - a + 1)
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
