// Per la riga in testa alle note: quante carte della Bacheca sono legate a ciascuna nota (per slug).
import { defineLoader } from 'vitepress'
import { note, collegamentiFm } from '../atlante'

declare const data: Record<string, number>
export { data }

export default defineLoader({
  watch: ['../../**/*.md'],
  load(): Record<string, number> {
    const out: Record<string, number> = {}
    for (const n of note()) {
      if (n.gruppo !== 'idea' && n.gruppo !== 'spunto') continue
      for (const s of new Set(Object.values(collegamentiFm(n)).flat())) out[s] = (out[s] ?? 0) + 1
    }
    return out
  },
})
