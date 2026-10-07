// Plugin markdown-it: i collegamenti proposti nella sezione `## Collegamenti`.
// Di default il sito mostra solo ciò che è validato: nelle righe di `## Collegamenti`
// (`- **Idee:** [A](…) · [B](…)`) ogni link diventa uno <span class="coll">, e quelli che sono una proposta
// di Claude (verso una nota non validata, un collegamento di migrazione, un collegamento nato da un blocco
// proposta) prendono la classe `coll-proposto`. Il CSS li nasconde finché l'interruttore "proposte" è spento;
// i separatori " · " sono dentro gli span, così la riga resta pulita in tutte e due le viste.
// Una riga fatta solo di collegamenti proposti prende la classe `solo-proposte`.
// Per l'indice della ricerca (env.perLaRicerca) i collegamenti proposti si tolgono del tutto.
// Il markdown non cambia: GitHub mostra tutto.
import type { MarkdownRenderer } from 'vitepress'
import { proposte, collegamentoProposto, type Proposte } from './atlante'
import { slugDaUrl, slugDaRel } from './shared/nota.ts'

// le proposte si rileggono dalle note al massimo ogni pochi secondi (in sviluppo le note cambiano)
let memo: { t: number; p: Proposte } | undefined
function attuali(): Proposte {
  const ora = Date.now()
  if (!memo || ora - memo.t > 3000) memo = { t: ora, p: proposte() }
  return memo.p
}

const interno = (href: string) => !!href && !/^(https?:|mailto:|#)/.test(href) && /\.md(#|$)/.test(href)
// un indirizzo con una sequenza % malformata non è un collegamento a una nota
const slugDiHref = (href: string) => {
  try { return slugDaUrl(decodeURI(href)) } catch { return null }
}

export function collegamenti(md: MarkdownRenderer) {
  md.core.ruler.push('collegamenti-proposti', (state) => {
    const rel: string | undefined = state.env?.relativePath
    if (!rel) return
    const t = state.tokens
    const inizio = t.findIndex((x, i) => x.type === 'heading_open' && x.tag === 'h2' && t[i + 1]?.content.trim() === 'Collegamenti')
    if (inizio < 0) return
    const p = attuali()
    const da = slugDaRel(rel)
    const ricerca = !!state.env.perLaRicerca
    const html = (c: string) => Object.assign(new state.Token('html_inline', '', 0), { content: c })
    const testo = (c: string) => Object.assign(new state.Token('text', '', 0), { content: c })

    for (let i = inizio + 3; i < t.length; i++) {
      const tok = t[i]
      if (tok.type === 'heading_open' && (tok.tag === 'h1' || tok.tag === 'h2')) break
      if (tok.type !== 'inline' || !tok.children) continue
      const fig = tok.children
      const link: { da: number; a: number; proposto: boolean }[] = []
      for (let k = 0; k < fig.length; k++) {
        if (fig[k].type !== 'link_open') continue
        const a = fig.findIndex((x, j) => j > k && x.type === 'link_close')
        if (a < 0) break
        const href = fig[k].attrGet('href') ?? ''
        const dest = interno(href) ? slugDiHref(href) : null
        link.push({ da: k, a, proposto: !!dest && collegamentoProposto(p, da, dest) })
        k = a
      }
      if (!link.some((l) => l.proposto)) continue
      // solo le righe fatte di link separati da " · "; il resto (prosa) resta com'è
      const separati = link.every((l, j) => j === 0 || (l.da === link[j - 1].a + 2 && /^\s*·\s*$/.test(fig[l.da - 1].content)))
      if (!separati) continue

      const nuovi = fig.slice(0, link[0].da)
      let validati = 0
      link.forEach((l, j) => {
        const pezzo = fig.slice(l.da, l.a + 1)
        if (ricerca) {
          if (l.proposto) return
          if (validati++) nuovi.push(testo(' · '))
          nuovi.push(...pezzo)
          return
        }
        nuovi.push(html(`<span class="coll${l.proposto ? ' coll-proposto' : ''}">`))
        // il separatore del primo link validato si vede solo quando le proposte (prima di lui) sono visibili
        if (j > 0) nuovi.push(html(`<span class="coll-sep${!l.proposto && !validati ? ' coll-sep-primo' : ''}"> · </span>`))
        if (!l.proposto) validati++
        nuovi.push(...pezzo, html('</span>'))
      })
      nuovi.push(...fig.slice(link[link.length - 1].a + 1))
      tok.children = nuovi

      if (!validati) {
        if (ricerca) { tok.children = []; continue }
        for (let k = i - 1; k > inizio; k--) {
          if (t[k].type === 'list_item_open') { t[k].attrJoin('class', 'solo-proposte'); break }
          if (t[k].type === 'list_item_close') break
        }
      }
    }
  })
}
