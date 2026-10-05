<script setup lang="ts">
// Riga in testa alla nota: il tipo e, per idee, spunti e ricerche, stato, formato e risonanza.
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import { data as presenze } from '../schede.data'

const { frontmatter, page } = useData()

const TIPI: Record<string, string> = {
  nucleo: 'Nucleo', percorso: 'Percorso', idea: 'Idea', spunto: 'Spunto', emozione: 'Emozione',
  concetto: 'Concetto', fonte: 'Fonte', simbolo: 'Simbolo', stile: 'Stile', diario: 'Diario',
  ricerca: 'Ricerca',
}
const FONTI: Record<string, string> = {
  pensiero: 'pensiero', 'sacro-e-mito': 'sacro e mito', opere: 'opere', arte: 'arte',
}

const voci = computed(() => {
  const fm = frontmatter.value
  const rel = page.value.filePath
  const out: string[] = []
  if (rel.startsWith('_archivio/')) out.push('Archivio')
  const tipo = fm.tipo ?? (rel.startsWith('diario/') ? 'diario' : null)
  if (tipo && TIPI[tipo]) out.push(TIPI[tipo])
  if (tipo === 'fonte') {
    const sotto = rel.split('/')[1]
    if (FONTI[sotto]) out.push(FONTI[sotto])
  }
  if (tipo === 'idea' || tipo === 'spunto' || tipo === 'ricerca') {
    if (fm.stato) out.push(String(fm.stato).replace(/-/g, ' '))
    if (fm.formato) out.push(String(fm.formato).replace(/-/g, ' '))
  }
  if (tipo === 'diario' && fm.data) {
    out.push(new Date(fm.data).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }))
  }
  return out
})

// in coda: dove ritrovare la nota sulla mappa e, per i nodi, le tavole della bacheca legate a lei
const SULLA_MAPPA = new Set(['percorso', 'idea', 'spunto', 'emozione', 'concetto', 'fonte', 'simbolo', 'stile', 'ricerca'])
const vai = computed(() => {
  const rel = page.value.filePath
  const tipo = frontmatter.value.tipo
  if (rel.startsWith('_archivio/') || !SULLA_MAPPA.has(tipo)) return null
  const parti = rel.split('/')
  const slug = /^(index|README)\.md$/.test(parti[parti.length - 1]) ? parti[parti.length - 2] : parti[parti.length - 1].replace(/\.md$/, '')
  const n = tipo === 'idea' || tipo === 'spunto' ? 0 : presenze[slug] ?? 0
  return { mappa: withBase(`/mappa?nodo=${slug}`), bacheca: n ? withBase(`/bacheca?nodo=${slug}`) : null, n }
})

const risonanza = computed(() => {
  const r = Number(frontmatter.value.risonanza)
  return frontmatter.value.tipo === 'idea' && frontmatter.value.risonanza != null && r >= 1 && r <= 5 ? r : null
})
</script>

<template>
  <p v-if="voci.length" class="scheda">
    <span v-for="v in voci" :key="v" class="scheda-voce">{{ v }}</span>
    <span v-if="risonanza" class="scheda-voce" :aria-label="`risonanza ${risonanza} su 5`">
      {{ '●'.repeat(risonanza) }}{{ '○'.repeat(5 - risonanza) }}
    </span>
    <span v-if="vai" class="scheda-vai">
      <a :href="vai.mappa">sulla mappa</a>
      <a v-if="vai.bacheca" :href="vai.bacheca">{{ vai.n }} {{ vai.n === 1 ? 'tavola' : 'tavole' }} in bacheca</a>
    </span>
  </p>
</template>
