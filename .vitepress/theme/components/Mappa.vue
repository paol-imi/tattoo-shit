<script setup lang="ts">
// La Mappa: tutte le note come un grafo. I nodi sono le note, gli archi i collegamenti del frontmatter.
// Colore = tipo, grandezza = numero di collegamenti. Il disegno è solo nel browser (force-graph, su canvas).
// Di default solo ciò che è validato. Con l'interruttore "proposte" acceso tornano le proposte di Claude
// non ancora approvate: nodi chiari con il contorno tratteggiato, fili tratteggiati.
import { computed, onBeforeUnmount, onMounted, ref, shallowRef, watch } from 'vue'
import { withBase, useRouter } from 'vitepress'
import { data, type NodoMappa, type ArcoMappa } from '../mappa.data'
import { useProposte } from '../proposte'

const TIPI = [
  { tipo: 'idea', etichetta: 'Idee', forma: 'rombo' },
  { tipo: 'spunto', etichetta: 'Spunti', forma: 'rombo' },
  { tipo: 'ricerca', etichetta: 'Ricerche', forma: 'rombo' },
  { tipo: 'concetto', etichetta: 'Concetti', forma: 'cerchio' },
  { tipo: 'emozione', etichetta: 'Emozioni', forma: 'cerchio' },
  { tipo: 'simbolo', etichetta: 'Simboli', forma: 'cerchio' },
  { tipo: 'fonte', etichetta: 'Fonti', forma: 'cerchio' },
  { tipo: 'stile', etichetta: 'Stile', forma: 'cerchio' },
  { tipo: 'percorso', etichetta: 'Percorsi e nucleo', forma: 'anello' },
]
const FORMA: Record<string, string> = Object.fromEntries(TIPI.map((t) => [t.tipo, t.forma]))
const ETICHETTA: Record<string, string> = {
  idea: 'Idea', spunto: 'Spunto', ricerca: 'Ricerca', concetto: 'Concetto', emozione: 'Emozione',
  simbolo: 'Simbolo', fonte: 'Fonte', stile: 'Stile', percorso: 'Percorso', nucleo: 'Nucleo',
}
const gruppoDi = (tipo: string) => (tipo === 'nucleo' ? 'percorso' : tipo)

// --- la vista: di default solo i nodi validati e i fili validati tra loro (il grado si riconta)
const mostra = useProposte()
const vista = computed<{ nodi: NodoMappa[]; archi: ArcoMappa[] }>(() => {
  if (mostra.value) return data
  const nodi = data.nodi.filter((n) => n.validata)
  const ids = new Set(nodi.map((n) => n.id))
  const archi = data.archi.filter((a) => !a.proposto && ids.has(a.source) && ids.has(a.target))
  const grado = new Map<string, number>()
  for (const a of archi) for (const id of [a.source, a.target]) grado.set(id, (grado.get(id) ?? 0) + 1)
  return { nodi: nodi.map((n) => ({ ...n, grado: grado.get(n.id) ?? 0 })), archi }
})
const nProposte = data.nodi.filter((n) => !n.validata).length
const nFiliProposti = data.archi.filter((a) => a.proposto).length
const conta = computed(() =>
  Object.fromEntries(TIPI.map((t) => [t.tipo, vista.value.nodi.filter((n) => gruppoDi(n.tipo) === t.tipo).length])),
)
const elencoPerTipo = computed(() =>
  Object.fromEntries(
    TIPI.map((t) => [t.tipo, vista.value.nodi.filter((x) => gruppoDi(x.tipo) === t.tipo).sort((a, b) => b.grado - a.grado)]),
  ),
)

const spenti = ref(new Set<string>())
function alterna(tipo: string) {
  const s = new Set(spenti.value)
  s.has(tipo) ? s.delete(tipo) : s.add(tipo)
  spenti.value = s
}

// --- ricerca di un nodo
const cerca = ref('')
const norma = (s: string) => s.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '')
const suggeriti = computed(() => {
  const q = norma(cerca.value.trim())
  if (!q) return []
  return vista.value.nodi
    .filter((n) => norma(n.titolo).includes(q) || n.id.includes(q))
    .sort((a, b) => Number(!norma(a.titolo).startsWith(q)) - Number(!norma(b.titolo).startsWith(q)) || b.grado - a.grado)
    .slice(0, 8)
})
const evidenziato = ref(0)
watch(suggeriti, () => (evidenziato.value = 0))

// --- stato del grafo
type N = NodoMappa & { x?: number; y?: number }
const contenitore = ref<HTMLElement>()
const grafo = shallowRef<any>()
const scelto = ref<N | null>(null) // il nodo selezionato (clic su touch, ricerca, ?nodo=)
const sopra = ref<N | null>(null) // il nodo sotto il puntatore
const attivo = computed(() => sopra.value ?? scelto.value)
const pronto = ref(false)
const router = useRouter()

const vicini = computed(() => {
  const v = new Map<string, Set<string>>()
  for (const n of vista.value.nodi) v.set(n.id, new Set())
  for (const a of vista.value.archi) { v.get(a.source)!.add(a.target); v.get(a.target)!.add(a.source) }
  return v
})
const viciniAttivi = computed(() => (attivo.value ? vicini.value.get(attivo.value.id) ?? null : null))
const viciniElenco = computed(() => {
  if (!attivo.value) return []
  const per = new Map(vista.value.nodi.map((n) => [n.id, n]))
  return [...(vicini.value.get(attivo.value.id) ?? [])].map((id) => per.get(id)!).sort((a, b) => b.grado - a.grado)
})

const raggio = (n: N) => (n.tipo === 'nucleo' ? 9 : 2.6 + Math.sqrt(n.grado) * 1.45)
const sogliaEtichetta = computed(() => {
  const nodi = vista.value.nodi
  const maxGrado = Math.max(...nodi.map((n) => n.grado), 1)
  return [...nodi].sort((a, b) => b.grado - a.grado)[Math.min(9, nodi.length - 1)]?.grado ?? maxGrado
})

let colori: Record<string, string> = {}
function leggiColori() {
  const cs = getComputedStyle(contenitore.value!)
  const v = (k: string) => cs.getPropertyValue(k).trim()
  colori = {
    carta: v('--vp-c-bg'), testo: v('--vp-c-text-1'), testo2: v('--vp-c-text-2'), arco: v('--mappa-arco'),
    arcoForte: v('--mappa-arco-forte'), arcoProposto: v('--mappa-arco-proposto'), rubrica: v('--atl-rubrica'),
    ...Object.fromEntries(TIPI.map((t) => [t.tipo, v(`--mappa-${t.tipo}`)])),
  }
  colori.nucleo = colori.percorso
  serif = v('--atl-serif') || 'serif'
}
let serif = 'serif'

function vai(n: N) { router.go(withBase(n.link)) }
function focalizza(nodo: N, zoom = 2.2) {
  const g = grafo.value
  // il nodo del grafo (con le coordinate), non la copia dei dati
  const n = ((g?.graphData().nodes as N[] | undefined)?.find((x) => x.id === nodo.id) ?? nodo)
  scelto.value = n
  cerca.value = ''
  // sul telefono la scheda copre il fondo della tela: il nodo sale un poco
  const su = (contenitore.value?.clientWidth ?? 1000) < 640 ? 90 / zoom : 0
  if (g && n.x != null) { g.centerAt(n.x, n.y! + su, 700); g.zoom(zoom, 700) }
  aggiornaUrl(n.id)
}
function scegli(n?: N) {
  const nodo = (n ?? suggeriti.value[evidenziato.value]) as N | undefined
  if (!nodo) return
  spenti.value.delete(gruppoDi(nodo.tipo))
  spenti.value = new Set(spenti.value)
  focalizza(nodo)
}
function aggiornaUrl(id: string | null) {
  const q = new URLSearchParams(location.search)
  id ? q.set('nodo', id) : q.delete('nodo')
  const s = q.toString()
  history.replaceState(history.state, '', location.pathname + (s ? `?${s}` : ''))
}
function riparti() {
  scelto.value = null
  aggiornaUrl(null)
  grafo.value?.zoomToFit(600, 30)
}

let ro: ResizeObserver | undefined
let mo: MutationObserver | undefined
const toccoMedia = typeof window !== 'undefined' ? window.matchMedia('(hover: none)') : null

// i nodi del grafo (con le coordinate) restano gli stessi quando la vista cambia: la mappa non riparte da zero
const nodiGrafo = new Map<string, N>()
function datiGrafo() {
  const nodes = vista.value.nodi.map((n) => {
    const g = nodiGrafo.get(n.id)
    if (g) return Object.assign(g, n, { x: g.x, y: g.y })
    const nuovo: N = { ...n }
    nodiGrafo.set(n.id, nuovo)
    return nuovo
  })
  return { nodes, links: vista.value.archi.map((a) => ({ ...a })) }
}
let rinquadra = false

onMounted(async () => {
  const { default: ForceGraph } = await import('force-graph')
  const el = contenitore.value!
  leggiColori()
  const g = new ForceGraph(el)
    .graphData(datiGrafo())
    .nodeId('id')
    .width(el.clientWidth)
    .height(el.clientHeight)
    .backgroundColor('rgba(0,0,0,0)')
    .warmupTicks(220)
    .cooldownTicks(120)
    .cooldownTime(2500)
    .minZoom(0.3)
    .maxZoom(12)
    .nodeVisibility((n: N) => !spenti.value.has(gruppoDi(n.tipo)))
    .linkVisibility((l: any) => !spenti.value.has(gruppoDi(l.source.tipo ?? '')) && !spenti.value.has(gruppoDi(l.target.tipo ?? '')))
    .linkColor((l: any) => {
      const a = attivo.value
      if (!a) return l.proposto ? colori.arcoProposto : colori.arco
      return l.source.id === a.id || l.target.id === a.id ? colori.arcoForte : 'rgba(0,0,0,0)'
    })
    .linkLineDash((l: any) => (l.proposto ? [2.2, 1.6] : null))
    .linkWidth((l: any) => (attivo.value && (l.source.id === attivo.value.id || l.target.id === attivo.value.id) ? 1.4 : 0.6))
    .nodeCanvasObject((n: N, ctx: CanvasRenderingContext2D, k: number) => disegna(n, ctx, k))
    .onRenderFramePost((ctx: CanvasRenderingContext2D, k: number) => etichette(ctx, k))
    .nodePointerAreaPaint((n: N, colore: string, ctx: CanvasRenderingContext2D, k: number) => {
      ctx.fillStyle = colore
      ctx.beginPath()
      ctx.arc(n.x!, n.y!, Math.max(raggio(n) + 2, 9 / k), 0, 2 * Math.PI)
      ctx.fill()
    })
    .onNodeHover((n: N | null) => {
      if (toccoMedia?.matches) return
      sopra.value = n
      el.style.cursor = n ? 'pointer' : ''
    })
    .onNodeClick((n: N) => {
      // con il mouse si apre subito; al tocco il primo tap sceglie, il secondo apre
      if (toccoMedia?.matches && scelto.value?.id !== n.id) { scelto.value = n; aggiornaUrl(n.id); return }
      vai(n)
    })
    .onBackgroundClick(() => { if (scelto.value) { scelto.value = null; aggiornaUrl(null) } })
  g.d3Force('charge')?.strength(-46).distanceMax(320)
  g.d3Force('link')?.distance((l: any) => (l.source.tipo === 'nucleo' || l.target.tipo === 'nucleo' ? 70 : 34))
  grafo.value = g
  // dopo il riscaldamento le posizioni ci sono già: si inquadra subito, poi di nuovo a riposo
  let inquadrata = false
  g.onEngineTick(() => {
    if (inquadrata) return
    inquadrata = true
    g.zoomToFit(0, 24)
    pronto.value = true
  })

  let primo = true
  g.onEngineStop(() => {
    if (rinquadra) { rinquadra = false; if (!scelto.value) g.zoomToFit(500, 24) }
    if (!primo) return
    primo = false
    const id = new URLSearchParams(location.search).get('nodo')
    const n = id ? (g.graphData().nodes as N[]).find((x) => x.id === id) : undefined
    if (n) focalizza(n, 2.2)
    else g.zoomToFit(500, 24)
  })

  ro = new ResizeObserver(() => g.width(el.clientWidth).height(el.clientHeight))
  ro.observe(el)
  mo = new MutationObserver(() => { leggiColori(); ridisegna() })
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
})
onBeforeUnmount(() => {
  ro?.disconnect()
  mo?.disconnect()
  grafo.value?._destructor?.()
})

function ridisegna() {
  const g = grafo.value
  if (!g) return
  g.nodeVisibility(g.nodeVisibility()).linkColor(g.linkColor())
}
watch([attivo, spenti], ridisegna)
// l'interruttore "proposte": nodi e fili entrano o escono, le posizioni restano
watch(vista, () => {
  const g = grafo.value
  if (!g) return
  if (scelto.value && !vista.value.nodi.some((n) => n.id === scelto.value!.id)) { scelto.value = null; aggiornaUrl(null) }
  sopra.value = null
  rinquadra = true
  g.graphData(datiGrafo())
})

function disegna(n: N, ctx: CanvasRenderingContext2D, k: number) {
  const a = attivo.value
  const acceso = !a || a.id === n.id || viciniAttivi.value?.has(n.id)
  const r = raggio(n)
  const x = n.x!, y = n.y!
  ctx.globalAlpha = acceso ? 1 : 0.16
  const colore = colori[n.tipo] ?? colori.testo
  ctx.lineWidth = 1.2 / k
  ctx.strokeStyle = colori.carta
  ctx.fillStyle = colore
  ctx.beginPath()
  const forma = n.tipo === 'nucleo' ? 'nucleo' : FORMA[n.tipo]
  if (!n.validata && forma !== 'anello' && forma !== 'nucleo') {
    // proposta di Claude: la forma vuota, appena velata del colore, con il contorno tratteggiato
    const d = r * 1.3
    if (forma === 'rombo') { ctx.moveTo(x, y - d); ctx.lineTo(x + d, y); ctx.lineTo(x, y + d); ctx.lineTo(x - d, y); ctx.closePath() }
    else ctx.arc(x, y, r, 0, 2 * Math.PI)
    ctx.fillStyle = colori.carta
    ctx.fill()
    const alfa = ctx.globalAlpha
    ctx.globalAlpha = alfa * 0.22
    ctx.fillStyle = colore
    ctx.fill()
    ctx.globalAlpha = alfa
    ctx.setLineDash([r * 0.42, r * 0.3])
    ctx.lineWidth = Math.max(1.3 / k, r * 0.2)
    ctx.strokeStyle = colore
    ctx.stroke()
    ctx.setLineDash([])
  } else if (forma === 'rombo') {
    const d = r * 1.3
    ctx.moveTo(x, y - d); ctx.lineTo(x + d, y); ctx.lineTo(x, y + d); ctx.lineTo(x - d, y); ctx.closePath()
    ctx.fill(); ctx.stroke()
  } else if (forma === 'anello' || forma === 'nucleo') {
    ctx.arc(x, y, r, 0, 2 * Math.PI)
    ctx.fillStyle = colori.carta
    ctx.fill()
    ctx.lineWidth = Math.max(1.6, r * 0.38)
    ctx.strokeStyle = forma === 'nucleo' ? colori.rubrica : colore
    ctx.stroke()
    if (forma === 'nucleo') { ctx.beginPath(); ctx.arc(x, y, r * 0.35, 0, 2 * Math.PI); ctx.fillStyle = colori.rubrica; ctx.fill() }
  } else {
    ctx.arc(x, y, r, 0, 2 * Math.PI)
    ctx.fill(); ctx.stroke()
  }
  if (a?.id === n.id) {
    ctx.beginPath(); ctx.arc(x, y, r + 4, 0, 2 * Math.PI)
    ctx.lineWidth = 1.4 / k; ctx.strokeStyle = colori.testo; ctx.stroke()
  }
  ctx.globalAlpha = 1
}

// le etichette, in un secondo passaggio sopra tutti i nodi, così nessun nodo le copre
function etichette(ctx: CanvasRenderingContext2D, k: number) {
  const g = grafo.value
  if (!g) return
  const a = attivo.value
  for (const n of g.graphData().nodes as N[]) {
    if (spenti.value.has(gruppoDi(n.tipo)) || n.x == null) continue
    const acceso = !a || a.id === n.id || viciniAttivi.value?.has(n.id)
    const r = raggio(n)
    const x = n.x, y = n.y!
    const forma = n.tipo === 'nucleo' ? 'nucleo' : FORMA[n.tipo]
    etichetta(n, ctx, k, a, acceso, r, x, y, forma)
  }
}
function etichetta(n: N, ctx: CanvasRenderingContext2D, k: number, a: N | null, acceso: boolean | undefined, r: number, x: number, y: number, forma: string) {
  // etichette: i nodi più collegati sempre, gli altri quando ci si avvicina o sono accesi
  const soglia = sogliaEtichetta.value
  const visibile = a ? acceso : n.tipo === 'nucleo' || (n.grado >= soglia && k > 0.45) || k > 2.6
  if (!visibile) return
  const px = (a && a.id === n.id ? 16 : n.grado >= soglia || n.tipo === 'nucleo' ? 13.5 : 12) / Math.max(k, 0.6)
  ctx.font = `${a?.id === n.id || n.tipo === 'nucleo' ? '600 ' : ''}${px}px ${serif}`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'top'
  const ty = y + r + 2.5 / k + (forma === 'rombo' ? r * 0.3 : 0)
  ctx.lineWidth = 3 / k
  ctx.strokeStyle = colori.carta
  ctx.lineJoin = 'round'
  ctx.strokeText(n.titolo, x, ty)
  ctx.fillStyle = colori.testo
  ctx.fillText(n.titolo, x, ty)
}
</script>

<template>
  <div class="atl-pagina mappa-pagina">
    <header class="atl-testata">
      <p class="atl-occhiello">Atlante · la mappa</p>
      <h1>Il cielo delle note</h1>
      <p class="atl-sommario">
        Ogni nota è una stella, ogni collegamento un filo. Più fili, più grande la stella.
        <template v-if="mostra">Le proposte di Claude non ancora approvate sono tratteggiate.</template>
        Passa sopra un nodo per accendere i suoi vicini, cliccalo per aprire la nota.
        <span class="solo-tocco">Al tocco: un tap sceglie, il secondo apre.</span>
      </p>
    </header>

    <div class="mappa-strumenti">
      <div class="mappa-cerca" role="combobox" :aria-expanded="suggeriti.length ? 'true' : 'false'" aria-haspopup="listbox" aria-owns="mappa-suggeriti">
        <label class="cerca">
          <span class="vh">Cerca un nodo</span>
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="M15.5 15.5 21 21" /></svg>
          <input
            v-model="cerca"
            type="search"
            placeholder="Trova una nota: occhi, Camus, Sisifo…"
            autocomplete="off"
            aria-autocomplete="list"
            aria-controls="mappa-suggeriti"
            @keydown.down.prevent="evidenziato = Math.min(evidenziato + 1, suggeriti.length - 1)"
            @keydown.up.prevent="evidenziato = Math.max(evidenziato - 1, 0)"
            @keydown.enter.prevent="scegli()"
            @keydown.esc="cerca = ''"
          />
        </label>
        <ul v-if="suggeriti.length" id="mappa-suggeriti" class="mappa-suggeriti" role="listbox">
          <li
            v-for="(n, i) in suggeriti"
            :key="n.id"
            role="option"
            :aria-selected="i === evidenziato ? 'true' : 'false'"
            @mousedown.prevent="scegli(n)"
            @mouseenter="evidenziato = i"
          >
            <span class="segno" :class="[`segno-${gruppoDi(n.tipo)}`, `forma-${n.tipo === 'nucleo' ? 'anello' : FORMA[n.tipo]}`]" aria-hidden="true" />
            <span class="nome">{{ n.titolo }}</span>
            <span class="tipo">{{ ETICHETTA[n.tipo] }}</span>
          </li>
        </ul>
      </div>
      <div class="legenda" role="group" aria-label="Tipi di nota: tocca per mostrarli o nasconderli">
        <button
          v-for="t in TIPI"
          :key="t.tipo"
          type="button"
          class="legenda-voce"
          :class="{ spento: spenti.has(t.tipo) }"
          :aria-pressed="spenti.has(t.tipo) ? 'false' : 'true'"
          @click="alterna(t.tipo)"
        >
          <span class="segno" :class="[`segno-${t.tipo}`, `forma-${t.forma}`]" aria-hidden="true" />
          {{ t.etichetta }} <span class="conta">{{ conta[t.tipo] }}</span>
        </button>
        <a v-if="mostra && (nProposte || nFiliProposti)" class="legenda-voce legenda-proposta" :href="withBase('/da-validare')" title="Ciò che Claude ha proposto e tu non hai ancora approvato">
          <span class="segno forma-rombo segno-proposta" aria-hidden="true" />
          <span class="filo-proposto" aria-hidden="true" />
          proposte di Claude, da validare
          <span class="conta">{{ nProposte }} {{ nProposte === 1 ? 'nota' : 'note' }} · {{ nFiliProposti }} {{ nFiliProposti === 1 ? 'filo' : 'fili' }}</span>
        </a>
      </div>
    </div>

    <div class="mappa-cornice">
      <div ref="contenitore" class="mappa-tela" aria-label="Grafo delle note: usa la ricerca o l'elenco qui sotto per navigare da tastiera" role="img" />
      <p v-if="!pronto" class="mappa-attesa">La mappa si sta disegnando…</p>
      <button v-if="pronto" type="button" class="mappa-riparti" @click="riparti">Vedi tutto</button>
      <aside v-if="attivo" class="mappa-scheda" aria-live="polite">
        <p class="mappa-scheda-tipo">
          <span class="segno" :class="[`segno-${gruppoDi(attivo.tipo)}`, `forma-${attivo.tipo === 'nucleo' ? 'anello' : FORMA[attivo.tipo]}`]" aria-hidden="true" />
          {{ ETICHETTA[attivo.tipo] }} · {{ attivo.grado }} {{ attivo.grado === 1 ? 'collegamento' : 'collegamenti' }}
        </p>
        <p v-if="!attivo.validata" class="mappa-scheda-proposta">Proposta di Claude · da validare</p>
        <p class="mappa-scheda-titolo">{{ attivo.titolo }}</p>
        <p v-if="viciniElenco.length" class="mappa-scheda-vicini">
          <template v-for="(v, i) in viciniElenco.slice(0, 6)" :key="v.id">
            <button type="button" @click="scegli(v)">{{ v.titolo }}</button><span v-if="i < Math.min(viciniElenco.length, 6) - 1"> · </span>
          </template>
          <span v-if="viciniElenco.length > 6"> e altri {{ viciniElenco.length - 6 }}</span>
        </p>
        <a class="mappa-scheda-apri" :href="withBase(attivo.link)">Apri la nota →</a>
      </aside>
    </div>

    <details class="mappa-elenco">
      <summary>Tutti i nodi, per tipo ({{ vista.nodi.length }})</summary>
      <div v-for="t in TIPI" :key="t.tipo" class="mappa-elenco-gruppo">
        <h2>{{ t.etichetta }}</h2>
        <p>
          <template v-for="(n, i) in elencoPerTipo[t.tipo]" :key="n.id">
            <a :href="withBase(n.link)" :class="{ proposta: !n.validata }" :title="n.validata ? undefined : 'Proposta di Claude, da validare'">{{ n.titolo }}</a><span class="conta"> {{ n.grado }}</span><span v-if="i < conta[t.tipo] - 1"> · </span>
          </template>
        </p>
      </div>
    </details>
  </div>
</template>
