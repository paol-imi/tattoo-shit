<script setup lang="ts">
// Una carta della Bacheca: l'idea o lo spunto come una tavola di un vecchio libro.
// Con i pin: l'embed ufficiale di Pinterest. Senza: una carta tipografica, con un ornamento inciso.
import { computed, ref } from 'vue'
import { withBase } from 'vitepress'
import type { Carta, NodoBreve } from '../bacheca.data'
import Ornamento from './Ornamento.vue'

const props = defineProps<{
  carta: Carta
  nodi: Record<string, NodoBreve>
  attivi?: string[]
  /** se vero i chip filtrano la bacheca; altrimenti portano alla bacheca filtrata */
  filtrabile?: boolean
  /** quanti chip mostrare prima di "+N" */
  maxChip?: number
  /** vero con l'interruttore "proposte" acceso: segni rossi, testi e collegamenti proposti da Claude */
  proposte?: boolean
}>()
const emit = defineEmits<{ filtra: [slug: string] }>()

const TIPI: Record<string, string> = { idea: 'Idea', spunto: 'Spunto' }
const ETICHETTE_CHIP: Record<string, string> = { concetto: 'concetto', simbolo: 'simbolo', fonte: 'fonte', emozione: 'emozione' }

const c = computed(() => props.carta)
// di default il testo viene solo da ciò che è validato (mai da un blocco proposta)
const testo = computed(() => (props.proposte ? c.value.testo : c.value.testoValidato))
const misura = computed(() => {
  const n = testo.value?.testo.length ?? 0
  return n <= 60 ? 'grande' : n <= 140 ? 'media' : 'piccola'
})
const chip = computed(() =>
  c.value.chip
    .filter((s) => props.proposte || !c.value.nodiProposti.includes(s))
    .map((s) => ({ slug: s, ...props.nodi[s] }))
    .filter((x) => x.titolo),
)
const tuttiChip = ref(false)
const limite = computed(() => props.maxChip ?? 6)
const chipVisibili = computed(() => {
  if (tuttiChip.value || chip.value.length <= limite.value + 1) return chip.value
  // i chip attivi restano sempre visibili
  const primi = chip.value.slice(0, limite.value)
  return [...primi, ...chip.value.filter((x) => props.attivi?.includes(x.slug) && !primi.includes(x))]
})
const nascosti = computed(() => chip.value.length - chipVisibili.value.length)
// provenienza: una proposta di Claude non ancora approvata, o una nota mia con proposte dentro
const prov = computed(() =>
  !props.proposte ? null : !c.value.validata ? 'proposta' : c.value.proposte ? 'parziale' : null,
)
const meta = computed(() => [c.value.stato.replace(/-/g, ' '), c.value.formato?.replace(/-/g, ' ')].filter(Boolean))
</script>

<template>
  <article class="tavola" :class="[`tipo-${c.tipo}`, { tipografica: !c.pin.length, 'da-validare': prov === 'proposta' }]">
    <p v-if="prov === 'proposta'" class="tavola-prov proposta" title="Claude l'ha proposta di sua iniziativa: non l'hai ancora approvata">
      <span class="tavola-prov-chi">Proposta di Claude</span><span class="tavola-prov-stato">da validare</span>
    </p>
    <header class="tavola-testa">
      <span class="tavola-tipo">{{ TIPI[c.tipo] ?? c.tipo }}</span>
      <span v-for="m in meta" :key="m" class="tavola-meta">{{ m }}</span>
      <span
        v-if="c.risonanza"
        class="tavola-risonanza"
        :title="`risonanza ${c.risonanza} su 5`"
        :aria-label="`risonanza ${c.risonanza} su 5`"
      >{{ '●'.repeat(c.risonanza) }}{{ '○'.repeat(5 - c.risonanza) }}</span>
    </header>

    <p v-if="prov === 'parziale'" class="tavola-prov parziale">
      <a :href="withBase(`${c.link}#proposta-1`)">{{ c.proposte === 1 ? 'una proposta di Claude' : `${c.proposte} proposte di Claude` }} da validare</a>
    </p>

    <h3 class="tavola-titolo"><a :href="withBase(c.link)">{{ c.titolo }}</a></h3>

    <figure v-for="pin in c.pin" :key="pin.id" class="tavola-pin">
      <div class="pin-cornice" :style="{ '--rapporto': pin.rapporto }">
        <span class="pin-attesa" aria-hidden="true">Pinterest</span>
        <iframe
          :src="`https://assets.pinterest.com/ext/embed.html?id=${pin.id}`"
          :title="pin.descrizione || 'Pin di Pinterest'"
          loading="lazy"
          scrolling="no"
          frameborder="0"
        />
      </div>
      <figcaption>
        <a :href="`https://www.pinterest.com/pin/${pin.id}/`" target="_blank" rel="noreferrer">{{ pin.descrizione || 'Apri il pin' }}</a>
      </figcaption>
    </figure>

    <Ornamento v-if="!c.pin.length" class="tavola-ornamento" :nome="c.ornamento" />

    <blockquote v-if="testo?.citazione" class="tavola-citazione" :class="`misura-${misura}`">
      <p>{{ testo.testo }}</p>
    </blockquote>
    <p v-else-if="testo" class="tavola-concetto" :class="`misura-${misura}`">{{ testo.testo }}</p>

    <ul v-if="chip.length" class="tavola-chip" aria-label="Collegamenti">
      <li v-for="n in chipVisibili" :key="n.slug">
        <button
          v-if="filtrabile"
          type="button"
          class="chip"
          :class="[`chip-${n.tipo}`, { attivo: attivi?.includes(n.slug) }]"
          :aria-pressed="attivi?.includes(n.slug) ? 'true' : 'false'"
          :title="`Mostra solo le carte legate a: ${n.titolo} (${ETICHETTE_CHIP[n.tipo] ?? n.tipo})`"
          @click="emit('filtra', n.slug)"
        >{{ n.titolo }}</button>
        <a
          v-else
          class="chip"
          :class="`chip-${n.tipo}`"
          :href="withBase(`/bacheca?nodo=${n.slug}`)"
          :title="`La bacheca filtrata per: ${n.titolo}`"
        >{{ n.titolo }}</a>
      </li>
      <li v-if="nascosti > 0">
        <button type="button" class="chip-altri" :aria-label="`Mostra altri ${nascosti} collegamenti`" @click="tuttiChip = true">+{{ nascosti }}</button>
      </li>
    </ul>

    <a class="tavola-apri" :href="withBase(c.link)" :aria-label="`Apri la nota: ${c.titolo}`">Apri la nota <span aria-hidden="true">→</span></a>
  </article>
</template>
