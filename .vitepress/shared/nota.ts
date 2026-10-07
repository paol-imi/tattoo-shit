// Logica sulle note che serve sia a Node (configurazione, data loader, scripts/verifica.mjs) sia al browser.
// Niente dipendenze da Node qui: i componenti Vue lo importano.

/**
 * La risonanza di un'idea (quanto mi colpisce "a pancia"): un intero da 1 a 5, oppure null.
 * Accetta il valore grezzo del frontmatter (stringa, numero, vuoto); fuori scala vale null.
 */
export function risonanzaDi(v: unknown): number | null {
  if (v == null || v === '') return null
  const r = Math.round(Number(v))
  return r >= 1 && r <= 5 ? r : null
}

/** La risonanza come pallini pieni e vuoti, su 5. */
export const pallini = (r: number) => '●'.repeat(r) + '○'.repeat(5 - r)
