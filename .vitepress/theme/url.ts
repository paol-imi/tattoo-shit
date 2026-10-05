// Filtri nella query string, così una vista filtrata si può condividere.
// La pagina parte senza filtri (come la versione statica) e li legge dall'URL dopo il montaggio.
import { onMounted, onBeforeUnmount, watch, type Ref } from 'vue'

export type Filtri = Record<string, Ref<string | string[]>>

export function filtriNellUrl(filtri: Filtri) {
  const leggi = () => {
    const q = new URLSearchParams(location.search)
    for (const [k, r] of Object.entries(filtri)) {
      const v = q.get(k) ?? ''
      r.value = Array.isArray(r.value) ? v.split(',').map((x) => x.trim()).filter(Boolean) : v
    }
  }
  const scrivi = () => {
    const q = new URLSearchParams(location.search)
    for (const [k, r] of Object.entries(filtri)) {
      const v = Array.isArray(r.value) ? r.value.join(',') : r.value.trim()
      if (v) q.set(k, v)
      else q.delete(k)
    }
    const s = q.toString().replace(/%2C/gi, ',')
    const url = location.pathname + (s ? `?${s}` : '') + location.hash
    if (url !== location.pathname + location.search + location.hash) history.replaceState(history.state, '', url)
  }
  let pronto = false
  onMounted(() => {
    leggi()
    pronto = true
    window.addEventListener('popstate', leggi)
  })
  onBeforeUnmount(() => window.removeEventListener('popstate', leggi))
  watch(Object.values(filtri), () => { if (pronto) scrivi() }, { deep: true })
}
