<script setup lang="ts">
// Riga in testa alla nota: il tipo e, per idee, spunti e ricerche, stato, formato e risonanza;
// poi la provenienza (dal seme, tua, proposta di Claude) e le proposte ancora da validare nella pagina.
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import { useDatiPagina } from '../pagina'
import { useProposte } from '../proposte'
import {
  tipoDi, leggibile, ETICHETTE_TIPO, SOTTOCARTELLE_FONTI, TIPI_MAPPA, TIPI_NODO_ATLANTE, TIPI_TERRITORIO, ETICHETTE_ORIGINE,
  ETICHETTE_ORIGINE_DA_VALIDARE,
} from '../../shared/tipi.ts'
import { provenienza as provenienzaDi, slugDaRel, risonanzaDi, pallini } from '../../shared/nota.ts'

// di default si contano solo carte e collegamenti validati; le proposte di Claude con l'interruttore acceso
const mostra = useProposte()

const { frontmatter, page } = useData()
const pagina = useDatiPagina()

const archiviata = computed(() => page.value.filePath.startsWith('_archivio/'))
const tipo = computed(() => tipoDi(page.value.filePath, frontmatter.value.tipo))

const voci = computed(() => {
  const fm = frontmatter.value
  const out: string[] = []
  if (archiviata.value) out.push('Archivio')
  const t = tipo.value
  if (ETICHETTE_TIPO[t]) out.push(ETICHETTE_TIPO[t])
  if (t === 'fonte') {
    const sotto = SOTTOCARTELLE_FONTI.find(([cartella]) => cartella === page.value.filePath.split('/')[1])
    if (sotto) out.push(sotto[1].toLowerCase())
  }
  if (TIPI_TERRITORIO.has(t)) {
    if (fm.stato) out.push(leggibile(fm.stato))
    if (fm.formato) out.push(leggibile(fm.formato))
  }
  if (t === 'diario' && fm.data) {
    out.push(new Date(fm.data).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }))
  }
  return out
})

// in coda: dove ritrovare la nota sulla mappa (l'Atlante dei concetti: i suoi nodi e le domande)
// e, per i nodi, le tavole della bacheca legate a lei
const vai = computed(() => {
  const t = tipo.value
  if (archiviata.value || !TIPI_MAPPA.has(t) || t === 'nucleo') return null
  const slug = slugDaRel(page.value.filePath)
  const { tavole } = pagina.value
  const n = t === 'idea' || t === 'spunto' ? 0 : mostra.value ? tavole.tutte : tavole.validate
  // stile, percorsi e discipline non sono nodi dell'Atlante; una nota non validata, a proposte spente, non è sulla mappa
  const nellAtlante = TIPI_NODO_ATLANTE.has(t) || t === 'domanda'
  const sullaMappa = nellAtlante && (mostra.value || !provenienza.value || provenienza.value.validata)
  return { mappa: sullaMappa ? withBase(`/mappa?nodo=${slug}`) : null, bacheca: n ? withBase(`/bacheca?nodo=${slug}`) : null, n }
})

// provenienza: sempre per spunti, idee e ricerche; sulle note di mappa solo se dichiarata.
// Conta solo `validata`: anche ciò che viene dal seme (compilato da Claude in chat) può essere una proposta.
const provenienza = computed(() => {
  const fm = frontmatter.value
  if (archiviata.value) return null
  if (!TIPI_TERRITORIO.has(tipo.value) && fm.origine == null && fm.validata == null) return null
  const { origine, validata } = provenienzaDi(fm)
  return {
    origine: ETICHETTE_ORIGINE[origine] ?? origine,
    validata,
    daValidare: ETICHETTE_ORIGINE_DA_VALIDARE[origine] ?? ETICHETTE_ORIGINE_DA_VALIDARE.claude,
  }
})
const proposte = computed(() => pagina.value.proposte)

const risonanza = computed(() => (tipo.value === 'idea' ? risonanzaDi(frontmatter.value.risonanza) : null))
</script>

<template>
  <p v-if="voci.length" class="scheda">
    <span v-for="v in voci" :key="v" class="scheda-voce">{{ v }}</span>
    <span v-if="risonanza" class="scheda-voce" :aria-label="`risonanza ${risonanza} su 5`">
      {{ pallini(risonanza) }}
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
