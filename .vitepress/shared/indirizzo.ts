// La query string dell'indirizzo, senza ricaricare la pagina e senza aggiungere voci alla cronologia.
// Solo nel browser (dopo il montaggio). Usata dai filtri delle pagine, dall'interruttore e dalla mappa.

/** Cambia i parametri dell'indirizzo con `cambia` e sostituisce la voce corrente della cronologia. */
export function cambiaQuery(cambia: (q: URLSearchParams) => void): void {
  const q = new URLSearchParams(location.search)
  cambia(q)
  // le virgole restano leggibili (?nodo=a,b)
  const s = q.toString().replace(/%2C/gi, ',')
  const url = location.pathname + (s ? `?${s}` : '') + location.hash
  if (url !== location.pathname + location.search + location.hash) history.replaceState(history.state, '', url)
}

/** Un parametro dell'indirizzo, o stringa vuota. */
export const parametro = (nome: string) => new URLSearchParams(location.search).get(nome) ?? ''
