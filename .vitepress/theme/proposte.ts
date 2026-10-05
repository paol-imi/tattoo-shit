// Le proposte di Claude: di default il sito mostra solo ciò che ho validato.
// L'interruttore "proposte" (in alto) le rende visibili, marcate in rosso; la pagina Da validare le mostra sempre.
//
// Lo stato vive in una classe su <html> (`mostra-proposte`), messa prima del primo disegno da uno script
// in <head> (vedi config.mts): ?proposte=1 o ?proposte=0 nell'indirizzo, altrimenti la preferenza salvata.
// Il CSS nasconde ciò che sta dentro le pagine (blocchi proposta, collegamenti proposti); i componenti Vue
// partono sempre dalla vista validata, come la pagina statica, e leggono la classe solo dopo il montaggio:
// così non c'è disaccordo nell'idratazione.
import { onMounted, ref } from 'vue'

export const CLASSE = 'mostra-proposte'
const CHIAVE = 'atlante-proposte'

const mostra = ref(false)

/** Vero se le proposte di Claude sono visibili. Falso sul server e fino al montaggio. */
export function useProposte() {
  onMounted(() => {
    mostra.value = document.documentElement.classList.contains(CLASSE)
  })
  return mostra
}

/** Accende o spegne le proposte, ricorda la scelta e toglie ?proposte dall'indirizzo. */
export function impostaProposte(v: boolean) {
  mostra.value = v
  document.documentElement.classList.toggle(CLASSE, v)
  try {
    localStorage.setItem(CHIAVE, v ? '1' : '0')
  } catch {
    // senza localStorage la scelta vale finché resta aperta la pagina
  }
  try {
    const q = new URLSearchParams(location.search)
    if (q.has('proposte')) {
      q.delete('proposte')
      const s = q.toString()
      history.replaceState(history.state, '', location.pathname + (s ? `?${s}` : '') + location.hash)
    }
  } catch {
    // l'indirizzo resta com'è
  }
}
