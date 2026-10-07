// I pin di Pinterest: l'indirizzo normalizzato e quello dell'embed ufficiale. Niente Node qui.
// Nel repository un pin è solo il suo link, `https://www.pinterest.com/pin/ID/`, in una voce di elenco.

const URL_PIN = String.raw`https:\/\/www\.pinterest\.com\/pin\/(\d+)\/?`

/** Un indirizzo che è esattamente quello di un pin; il gruppo 1 è l'ID. */
export const RE_PIN = new RegExp(`^${URL_PIN}$`)

/** Una voce di elenco fatta solo del link a un pin: `- [descrizione](https://www.pinterest.com/pin/ID/)`. */
export const RE_VOCE_PIN = new RegExp(String.raw`^\s*[-*]\s+\[([^\]]*)\]\(${URL_PIN}\)\s*$`, 'gm')

/** L'indirizzo normalizzato di un pin. */
export const urlPin = (id: string) => `https://www.pinterest.com/pin/${id}/`

/** L'indirizzo dell'embed ufficiale di un pin. */
export const urlEmbedPin = (id: string) => `https://assets.pinterest.com/ext/embed.html?id=${id}`

/** Le proporzioni di un pin quando Pinterest non le dice: 4:3. */
export const RAPPORTO_PREDEFINITO = 4 / 3
