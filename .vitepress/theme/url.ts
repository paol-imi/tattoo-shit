// Filtri nella query string, così una vista filtrata si può condividere.
// La pagina parte senza filtri (come la versione statica) e li legge dall'URL dopo il montaggio.
import { onMounted, onBeforeUnmount, watch, type Ref } from 'vue'
import { cambiaQuery, parametro } from '../shared/indirizzo.ts'

export type Filtri = Record<string, Ref<string | string[]>>

export function filtriNellUrl(filtri: Filtri) {
  const leggi = () => {
    for (const [k, r] of Object.entries(filtri)) {
      const v = parametro(k)
      r.value = Array.isArray(r.value) ? v.split(',').map((x) => x.trim()).filter(Boolean) : v
    }
  }
  const scrivi = () =>
    cambiaQuery((q) => {
      for (const [k, r] of Object.entries(filtri)) {
        const v = Array.isArray(r.value) ? r.value.join(',') : r.value.trim()
        if (v) q.set(k, v)
        else q.delete(k)
      }
    })
  let pronto = false
  onMounted(() => {
    leggi()
    pronto = true
    window.addEventListener('popstate', leggi)
  })
  onBeforeUnmount(() => window.removeEventListener('popstate', leggi))
  watch(Object.values(filtri), () => { if (pronto) scrivi() }, { deep: true })
}
