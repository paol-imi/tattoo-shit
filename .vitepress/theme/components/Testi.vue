<script setup lang="ts">
// Testi: le parole che potrei portare addosso. Ogni citazione dell'archivio come un saggio di stampa,
// raggruppata per fonte. Le brevi grandi, le lunghe (poesie, monologhi) con gli a capo e ripiegate.
import { computed, ref } from 'vue'
import { withBase } from 'vitepress'
import { data } from '../testi.data'
import { filtriNellUrl } from '../url'

const fonte = ref<string>('')
const misura = ref<string>('')
filtriNellUrl({ fonte, misura })

const MISURE = [
  { v: '', t: 'Tutte' },
  { v: 'breve', t: 'Brevi' },
  { v: 'media', t: 'Medie' },
  { v: 'lunga', t: 'Lunghe' },
]
const TIPI: Record<string, string> = { spunto: 'spunto', idea: 'idea', ricerca: 'ricerca' }
const perSlug = Object.fromEntries(data.fonti.map((f) => [f.slug, f]))

const gruppi = computed(() => {
  const scelti = data.testi.filter((t) => (!fonte.value || t.fonte === fonte.value) && (!misura.value || t.misura === misura.value))
  const ordine = [...data.fonti.map((f) => f.slug), null]
  return ordine
    .map((s) => ({ fonte: s ? perSlug[s] : null, testi: scelti.filter((t) => t.fonte === s) }))
    .filter((g) => g.testi.length)
})
const n = computed(() => gruppi.value.reduce((t, g) => t + g.testi.length, 0))

const aperti = ref(new Set<string>())
function apri(id: string) {
  const s = new Set(aperti.value)
  s.has(id) ? s.delete(id) : s.add(id)
  aperti.value = s
}
</script>

<template>
  <div class="atl-pagina testi">
    <header class="atl-testata">
      <p class="atl-occhiello">Atlante · i testi</p>
      <h1>Le parole che potrei portare addosso</h1>
      <p class="atl-sommario">
        Ogni citazione trovata negli spunti, nelle idee e nelle ricerche, composta come un saggio di stampa.
        Le brevi sono candidate al lettering; le lunghe restano intere, da tagliare un giorno.
      </p>
    </header>

    <section class="filtri" aria-label="Filtri">
      <div class="filtri-riga">
        <span class="filtri-etichetta">Fonte</span>
        <div class="porte-elenco">
          <button type="button" class="chip" :class="{ attivo: !fonte }" :aria-pressed="!fonte ? 'true' : 'false'" @click="fonte = ''">
            tutte <span class="conta">{{ data.testi.length }}</span>
          </button>
          <button
            v-for="f in data.fonti"
            :key="f.slug"
            type="button"
            class="chip chip-fonte"
            :class="{ attivo: fonte === f.slug }"
            :aria-pressed="fonte === f.slug ? 'true' : 'false'"
            @click="fonte = fonte === f.slug ? '' : f.slug"
          >{{ f.titolo }} <span class="conta">{{ f.n }}</span></button>
        </div>
      </div>
      <div class="filtri-riga">
        <span class="filtri-etichetta">Misura</span>
        <div class="segmenti segmenti-leggeri" role="group" aria-label="Misura">
          <button
            v-for="m in MISURE"
            :key="m.v"
            type="button"
            :aria-pressed="misura === m.v ? 'true' : 'false'"
            @click="misura = m.v"
          >{{ m.t }}</button>
        </div>
      </div>
    </section>

    <p class="stato-filtri" aria-live="polite"><span><strong>{{ n }}</strong> {{ n === 1 ? 'testo' : 'testi' }}</span></p>

    <section v-for="g in gruppi" :key="g.fonte?.slug ?? 'senza'" class="testi-gruppo">
      <h2 class="testi-fonte">
        <a v-if="g.fonte" :href="withBase(g.fonte.link)">{{ g.fonte.titolo }}</a>
        <span v-else>Senza fonte</span>
      </h2>
      <figure
        v-for="t in g.testi"
        :key="t.id"
        class="saggio"
        :class="[`misura-${t.misura}`, { aperto: aperti.has(t.id) }]"
      >
        <blockquote :id="`testo-${t.id}`"><p>{{ t.testo }}</p></blockquote>
        <button
          v-if="t.misura === 'lunga'"
          type="button"
          class="saggio-apri"
          :aria-expanded="aperti.has(t.id) ? 'true' : 'false'"
          :aria-controls="`testo-${t.id}`"
          @click="apri(t.id)"
        >{{ aperti.has(t.id) ? 'Ripiega' : 'Leggi tutto' }}</button>
        <figcaption>
          <span v-if="t.riferimento" class="saggio-rif">{{ t.riferimento }}</span>
          <span class="saggio-da">
            da
            <template v-for="(nota, i) in t.note" :key="nota.link">
              <a :href="withBase(nota.link)">{{ nota.titolo }}</a>
              <span class="saggio-tipo"> ({{ TIPI[nota.tipo] ?? nota.tipo }})</span><span v-if="i < t.note.length - 1">, </span>
            </template>
          </span>
        </figcaption>
      </figure>
    </section>
    <p v-if="!n" class="atl-vuoto">Nessun testo con questi filtri.</p>
  </div>
</template>
