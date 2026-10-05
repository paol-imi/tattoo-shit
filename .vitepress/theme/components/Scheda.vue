<script setup lang="ts">
// Riga in testa alla nota: il tipo e, per idee, spunti e ricerche, stato, formato e risonanza;
// poi la provenienza (dal seme, tua, proposta di Claude) e le proposte ancora da validare nella pagina.
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import { data as schede } from '../schede.data'
import { useProposte } from '../proposte'

// di default si contano solo carte e collegamenti validati; le proposte di Claude con l'interruttore acceso
const mostra = useProposte()

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
  const presenze = mostra.value ? schede.presenze : schede.presenzeValidate
  const n = tipo === 'idea' || tipo === 'spunto' ? 0 : presenze[slug] ?? 0
  // una nota non validata, a proposte spente, non è sulla mappa
  const sullaMappa = mostra.value || !provenienza.value || provenienza.value.validata
  return { mappa: sullaMappa ? withBase(`/mappa?nodo=${slug}`) : null, bacheca: n ? withBase(`/bacheca?nodo=${slug}`) : null, n }
})

// provenienza: sempre per spunti, idee e ricerche; sulle note di mappa solo se dichiarata.
// Conta solo `validata`: anche ciò che viene dal seme (compilato da Claude in chat) può essere una proposta.
const TERRITORIO = new Set(['idea', 'spunto', 'ricerca'])
const ORIGINI: Record<string, string> = { seme: 'dal seme', mia: 'tua', claude: 'proposta di Claude' }
const provenienza = computed(() => {
  const fm = frontmatter.value
  if (page.value.filePath.startsWith('_archivio/')) return null
  if (!TERRITORIO.has(fm.tipo) && fm.origine == null && fm.validata == null) return null
  const origine = String(fm.origine ?? 'seme')
  const validata = fm.validata == null ? origine !== 'claude' : String(fm.validata) === 'true'
  const daValidare = origine === 'seme' ? 'dal seme, proposta di Claude' : origine === 'mia' ? 'tua' : 'proposta di Claude'
  return { origine: ORIGINI[origine] ?? origine, validata, daValidare }
})
const proposte = computed(() => schede.proposte[page.value.filePath] ?? 0)

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
    <a
      v-if="provenienza && !provenienza.validata"
      class="scheda-voce scheda-prov da-validare"
      :href="withBase('/da-validare')"
      title="Proposta di Claude: non l'hai ancora approvata"
    ><span>{{ provenienza.daValidare }} · da validare</span></a>
    <span v-else-if="provenienza" class="scheda-voce scheda-prov">{{ provenienza.origine }}</span>
    <a v-if="mostra && proposte" class="scheda-voce scheda-prov con-proposte" href="#proposta-1">
      <span>{{ proposte === 1 ? 'una proposta di Claude' : `${proposte} proposte di Claude` }} da validare</span>
    </a>
    <span v-if="vai && (vai.mappa || vai.bacheca)" class="scheda-vai">
      <a v-if="vai.mappa" :href="vai.mappa">sulla mappa</a>
      <a v-if="vai.bacheca" :href="vai.bacheca">{{ vai.n }} {{ vai.n === 1 ? 'tavola' : 'tavole' }} in bacheca</a>
    </span>
  </p>
</template>
