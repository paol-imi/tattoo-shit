<script setup lang="ts">
// Riga in testa alla nota: il tipo e, per idee e spunti, stato, formato e risonanza.
import { computed } from 'vue'
import { useData } from 'vitepress'

const { frontmatter, page } = useData()

const TIPI: Record<string, string> = {
  nucleo: 'Nucleo', percorso: 'Percorso', idea: 'Idea', spunto: 'Spunto', emozione: 'Emozione',
  concetto: 'Concetto', fonte: 'Fonte', simbolo: 'Simbolo', stile: 'Stile', diario: 'Diario',
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
  if (tipo === 'idea' || tipo === 'spunto') {
    if (fm.stato) out.push(String(fm.stato).replace(/-/g, ' '))
    if (fm.formato) out.push(String(fm.formato).replace(/-/g, ' '))
  }
  if (tipo === 'diario' && fm.data) {
    out.push(new Date(fm.data).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }))
  }
  return out
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
  </p>
</template>
