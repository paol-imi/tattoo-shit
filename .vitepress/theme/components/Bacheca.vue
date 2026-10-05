<script setup lang="ts">
// La Bacheca: tutte le idee e gli spunti come un muro di tavole.
// Filtri per tipo, stato, nodo collegato (cliccando un chip) e testo libero; tutti nell'URL.
// Di default solo ciò che è validato; con l'interruttore "proposte" acceso anche le proposte di Claude,
// marcate in rosso, e il filtro per validazione.
import { computed, ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { withBase } from 'vitepress'
import { data } from '../bacheca.data'
import { filtriNellUrl } from '../url'
import { useProposte } from '../proposte'
import Tavola from './Tavola.vue'

type C = (typeof data.carte)[number]
const mostra = useProposte()
// le carte della vista: di default solo quelle validate
const base = computed(() => (mostra.value ? data.carte : data.carte.filter((c) => c.validata)))
// i nodi di una carta, senza i collegamenti proposti quando le proposte sono spente
const nodiDi = (c: C) => (mostra.value ? c.nodi : c.nodi.filter((s) => !c.nodiProposti.includes(s)))
const chipDi = (c: C) => (mostra.value ? c.chip : c.chip.filter((s) => !c.nodiProposti.includes(s)))

const tipo = ref<string>('')
const stato = ref<string>('')
const nodo = ref<string[]>([])
const q = ref<string>('')
const validazione = ref<string>('')
filtriNellUrl({ tipo, stato, nodo, q, validazione })

const TIPI = [
  { v: '', t: 'Tutto' },
  { v: 'idea', t: 'Idee' },
  { v: 'spunto', t: 'Spunti' },
]
// validate: tutto approvato; da validare: una proposta di Claude, o una nota con proposte dentro
const daValidare = (c: C) => !c.validata || c.proposte > 0
const VALIDAZIONE = [
  { v: '', t: 'tutte', n: data.carte.length },
  { v: 'validate', t: 'validate', n: data.validazione.validate },
  { v: 'da-validare', t: 'da validare', n: data.validazione.daValidare },
]
// gli stati con il numero di carte della vista
const stati = computed(() =>
  data.stati.map((s) => ({ ...s, n: base.value.filter((c) => c.stato === s.stato).length })).filter((s) => s.n),
)
const ETICHETTE_TIPO: Record<string, string> = {
  concetto: 'Concetti', simbolo: 'Simboli', fonte: 'Fonti', emozione: 'Emozioni',
  stile: 'Stile', percorso: 'Percorsi', idea: 'Idee', spunto: 'Spunti', ricerca: 'Ricerche',
}

const norma = (s: string) => s.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '')
const testoCarta = computed(() => new Map(
  base.value.map((c) => [
    c.slug,
    norma([
      c.titolo, (mostra.value ? c.testo : c.testoValidato)?.testo, c.formato, c.stato, c.tipo,
      ...c.pin.map((p) => p.descrizione),
      ...nodiDi(c).map((s) => data.nodi[s]?.titolo),
    ].filter(Boolean).join(' ')),
  ]),
))

// il filtro per validazione vale solo con le proposte accese
const validazioneAttiva = computed(() => (mostra.value ? validazione.value : ''))
const visibili = computed(() => {
  const parole = norma(q.value).split(/\s+/).filter(Boolean)
  return base.value.filter((c) =>
    (!tipo.value || c.tipo === tipo.value) &&
    (!stato.value || c.stato === stato.value) &&
    (!validazioneAttiva.value || (validazioneAttiva.value === 'da-validare') === daValidare(c)) &&
    nodo.value.every((s) => nodiDi(c).includes(s)) &&
    parole.every((p) => testoCarta.value.get(c.slug)!.includes(p)),
  )
})
const filtrato = computed(() => !!(tipo.value || stato.value || validazioneAttiva.value || nodo.value.length || q.value.trim()))
function azzera() { tipo.value = ''; stato.value = ''; validazione.value = ''; nodo.value = []; q.value = '' }
function filtra(s: string) {
  nodo.value = nodo.value.includes(s) ? nodo.value.filter((x) => x !== s) : [...nodo.value, s]
  nextTick(() => document.getElementById('bacheca-muro')?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
}

// i nodi più presenti, come porte d'ingresso; tutti gli altri a richiesta, per tipo
const presenze = computed(() => {
  const conta = new Map<string, number>()
  for (const c of base.value) for (const s of chipDi(c)) conta.set(s, (conta.get(s) ?? 0) + 1)
  return [...conta].filter(([s]) => data.nodi[s]).sort((a, b) => b[1] - a[1] || data.nodi[a[0]].titolo.localeCompare(data.nodi[b[0]].titolo, 'it'))
})
const principali = computed(() => presenze.value.filter(([, n]) => n >= 2).slice(0, 12))
const perTipo = computed(() => {
  const gruppi: Record<string, [string, number][]> = {}
  for (const x of presenze.value) (gruppi[data.nodi[x[0]].tipo] ??= []).push(x)
  return ['concetto', 'simbolo', 'fonte', 'emozione'].filter((t) => gruppi[t]).map((t) => ({ tipo: t, voci: gruppi[t] }))
})
const tuttiAperto = ref(false)

// --- il muro: colonne distribuite in ordine di lettura, alla colonna più corta
const muro = ref<HTMLElement>()
const ncol = ref(3)
const larghezza = ref(1100)
let ro: ResizeObserver | undefined
onMounted(() => {
  ro = new ResizeObserver(([e]) => {
    const w = e.contentRect.width
    larghezza.value = w
    ncol.value = Math.max(1, Math.min(4, Math.floor((w + 20) / (290 + 20))))
  })
  if (muro.value) ro.observe(muro.value)
})
onBeforeUnmount(() => ro?.disconnect())

const colonne = computed(() => {
  const n = ncol.value
  const cw = (larghezza.value - 20 * (n - 1)) / n
  const cols = Array.from({ length: n }, () => ({ h: 0, carte: [] as typeof data.carte }))
  for (const c of visibili.value) {
    const len = (mostra.value ? c.testo : c.testoValidato)?.testo.length ?? 0
    const h = 150 + c.pin.reduce((t, p) => t + cw * p.rapporto + 120, 0) + (c.pin.length ? 0 : 90) +
      len * (len <= 60 ? 1.6 : 0.75) * (300 / cw) + Math.ceil(chipDi(c).length / 3) * 30
    const col = cols.reduce((a, b) => (b.h < a.h - 1 ? b : a))
    col.carte.push(c)
    col.h += h + 20
  }
  return cols
})
</script>

<template>
  <div class="atl-pagina bacheca">
    <header class="atl-testata">
      <p class="atl-occhiello">Atlante · la bacheca</p>
      <h1>Tutte le tavole</h1>
      <p class="atl-sommario">
        Le idee e gli spunti, con i pin che li hanno accesi e le parole che li tengono insieme.
        Tocca un simbolo, una fonte, un concetto: il muro mostra solo ciò che vi è legato.
      </p>
    </header>

    <section class="filtri" aria-label="Filtri">
      <div class="filtri-riga">
        <label class="cerca">
          <span class="vh">Cerca nella bacheca</span>
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="M15.5 15.5 21 21" /></svg>
          <input v-model="q" type="search" placeholder="Cerca: una parola, un simbolo, una fonte…" autocomplete="off" />
        </label>
        <div class="segmenti" role="group" aria-label="Tipo">
          <button
            v-for="t in TIPI"
            :key="t.v"
            type="button"
            :aria-pressed="tipo === t.v ? 'true' : 'false'"
            @click="tipo = t.v"
          >{{ t.t }}</button>
        </div>
      </div>
      <div class="filtri-riga">
        <span class="filtri-etichetta">Stato</span>
        <div class="segmenti segmenti-leggeri" role="group" aria-label="Stato">
          <button type="button" :aria-pressed="!stato ? 'true' : 'false'" @click="stato = ''">tutti</button>
          <button
            v-for="s in stati"
            :key="s.stato"
            type="button"
            :aria-pressed="stato === s.stato ? 'true' : 'false'"
            @click="stato = stato === s.stato ? '' : s.stato"
          >{{ s.etichetta }} <span class="conta">{{ s.n }}</span></button>
        </div>
      </div>
      <div v-if="mostra" class="filtri-riga">
        <span class="filtri-etichetta">Validazione</span>
        <div class="segmenti segmenti-leggeri" role="group" aria-label="Validazione">
          <button
            v-for="v in VALIDAZIONE"
            :key="v.v"
            type="button"
            :class="{ 'segmento-proposta': v.v === 'da-validare' }"
            :aria-pressed="validazione === v.v ? 'true' : 'false'"
            @click="validazione = validazione === v.v ? '' : v.v"
          >{{ v.t }} <span class="conta">{{ v.n }}</span></button>
        </div>
        <a class="filtri-nota" :href="withBase('/da-validare')">cosa c'è da validare →</a>
      </div>
      <div class="filtri-riga porte">
        <span class="filtri-etichetta">Sfoglia per</span>
        <div class="porte-elenco">
          <button
            v-for="[s, n] in principali"
            :key="s"
            type="button"
            class="chip"
            :class="[`chip-${data.nodi[s].tipo}`, { attivo: nodo.includes(s) }]"
            :aria-pressed="nodo.includes(s) ? 'true' : 'false'"
            @click="filtra(s)"
          >{{ data.nodi[s].titolo }} <span class="conta">{{ n }}</span></button>
          <button type="button" class="altri" :aria-expanded="tuttiAperto ? 'true' : 'false'" @click="tuttiAperto = !tuttiAperto">
            {{ tuttiAperto ? 'meno' : `tutti i ${presenze.length} nodi` }}
          </button>
        </div>
      </div>
      <div v-if="tuttiAperto" class="tutti-nodi">
        <div v-for="g in perTipo" :key="g.tipo" class="tutti-gruppo">
          <span class="filtri-etichetta">{{ ETICHETTE_TIPO[g.tipo] }}</span>
          <div class="porte-elenco">
            <button
              v-for="[s, n] in g.voci"
              :key="s"
              type="button"
              class="chip"
              :class="[`chip-${g.tipo}`, { attivo: nodo.includes(s) }]"
              :aria-pressed="nodo.includes(s) ? 'true' : 'false'"
              @click="filtra(s)"
            >{{ data.nodi[s].titolo }} <span class="conta">{{ n }}</span></button>
          </div>
        </div>
      </div>
    </section>

    <div id="bacheca-muro" class="stato-filtri" aria-live="polite">
      <p>
        <strong>{{ visibili.length }}</strong>
        {{ filtrato ? `di ${base.length} tavole` : (visibili.length === 1 ? 'tavola' : 'tavole') }}
        <template v-if="nodo.length">
          legate a
          <template v-for="(s, i) in nodo" :key="s">
            <button type="button" class="chip attivo rimuovi" :aria-label="`Togli il filtro ${data.nodi[s]?.titolo ?? s}`" @click="filtra(s)">
              {{ data.nodi[s]?.titolo ?? s }} <span aria-hidden="true">×</span>
            </button><span v-if="i < nodo.length - 1"> e </span>
          </template>
        </template>
      </p>
      <button v-if="filtrato" type="button" class="azzera" @click="azzera">Azzera i filtri</button>
    </div>

    <div ref="muro" class="muro" :style="{ '--ncol': ncol }">
      <div v-for="(col, i) in colonne" :key="i" class="muro-colonna">
        <Tavola
          v-for="c in col.carte"
          :key="c.slug"
          :carta="c"
          :nodi="data.nodi"
          :attivi="nodo"
          :proposte="mostra"
          filtrabile
          @filtra="filtra"
        />
      </div>
    </div>
    <div v-if="!visibili.length" class="atl-vuoto">
      <p>Nessuna tavola con questi filtri.</p>
      <button type="button" class="azzera" @click="azzera">Azzera i filtri</button>
    </div>
  </div>
</template>
