// Le proposte di Claude: di default il sito mostra solo ciò che ho validato.
// L'interruttore "proposte" (in alto) le rende visibili, marcate in rosso; la pagina Da validare le mostra sempre.
//
// Lo stato vive in una classe su <html> (`mostra-proposte`), messa prima del primo disegno da uno script
// in <head> (vedi config.mts): ?proposte=1 o ?proposte=0 nell'indirizzo, altrimenti la preferenza salvata.
// Il CSS nasconde ciò che sta dentro le pagine (blocchi proposta, collegamenti proposti); i componenti Vue
// partono sempre dalla vista validata, come la pagina statica, e leggono la classe solo dopo il montaggio:
// così non c'è disaccordo nell'idratazione.
import { computed, onMounted, ref, type ComputedRef } from 'vue'
import { CLASSE_PROPOSTE, CHIAVE_PROPOSTE, PARAM_PROPOSTE } from '../shared/proposte.ts'
import { cambiaQuery } from '../shared/indirizzo.ts'

const mostra = ref(false)

/**
 * Vero se le proposte di Claude sono visibili. Falso sul server e, per ogni componente, fino al suo
 * montaggio: un componente caricato dopo (le pagine speciali sono asincrone) si idrata anche lui sulla
 * vista validata, anche se l'interruttore, montato prima, ha già letto la classe.
 */
export function useProposte(): ComputedRef<boolean> {
  const montato = ref(false)
  onMounted(() => {
    mostra.value = document.documentElement.classList.contains(CLASSE_PROPOSTE)
    montato.value = true
  })
  return computed(() => montato.value && mostra.value)
}

/** Accende o spegne le proposte, ricorda la scelta e toglie ?proposte dall'indirizzo. */
export function impostaProposte(v: boolean) {
  mostra.value = v
  document.documentElement.classList.toggle(CLASSE_PROPOSTE, v)
  try {
    localStorage.setItem(CHIAVE_PROPOSTE, v ? '1' : '0')
  } catch {
    // senza localStorage la scelta vale finché resta aperta la pagina
  }
  try {
    cambiaQuery((q) => q.delete(PARAM_PROPOSTE))
  } catch {
    // l'indirizzo resta com'è
  }
}
