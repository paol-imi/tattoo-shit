<script setup lang="ts">
// L'Atlante dei concetti: tre viste (Tavole, Ruota, Firmamento) sugli stessi dati, schema v2 (filtra.ts).
// Il markup è statico (la resa server coincide con la prima resa del client, niente salti); il motore
// (motore.ts, con d3) si carica solo nel browser, dopo il montaggio, e disegna dentro questo markup.
// Quando cambiano i dati o l'interruttore delle proposte il motore si smonta e si rimonta su un markup
// nuovo (:key), riprendendo vista, domanda fissata, fuoco e filo.
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRouter, withBase } from 'vitepress'
import { filtra, type DatiAtlante } from './filtra'
import type { ManigliaMappa, StatoMappa } from './motore'
import './stile.css'

const props = defineProps<{ dati: DatiAtlante; mostraProposte: boolean }>()

const radice = ref<HTMLElement | null>(null)
const chiave = ref(0)
const router = useRouter()
let maniglia: ManigliaMappa | null = null
let vivo = true
let primo = true

// gli url delle note sono percorsi del sito (senza base); un indirizzo completo si apre così com'è
const esterno = (url: string) => /^[a-z]+:\/\//i.test(url)
const href = (url: string) => (esterno(url) ? url : withBase(url))
function vai(url: string) {
  if (esterno(url)) location.href = url
  else router.go(withBase(url))
}

async function monta(stato: StatoMappa | null) {
  const { monta } = await import('./motore')
  if (!vivo || !radice.value || maniglia) return
  maniglia = monta(radice.value, filtra(props.dati, props.mostraProposte), {
    vai,
    href,
    stato,
    // ?nodo=slug vale solo al primo montaggio della pagina
    nodo: primo ? undefined : null,
  })
  primo = false
}

onMounted(() => monta(null))

watch(
  () => [props.dati, props.mostraProposte],
  async () => {
    const stato = maniglia?.smonta() ?? null
    maniglia = null
    chiave.value++
    await nextTick()
    await monta(stato)
  },
)

onBeforeUnmount(() => {
  vivo = false
  maniglia?.smonta()
  maniglia = null
})
</script>

<template>
  <div class="atl-mappa" :key="chiave" ref="radice">
    <header class="testa">
      <div class="riga-titolo">
        <h1>Atlante <em>dei concetti</em></h1>
        <button class="badge" id="atl-badge-dati" type="button" hidden>dati di prova</button>
      </div>
      <p class="spiega">Otto domande che ogni vita si fa, e le discipline che rispondono: filosofia, psicologia, mito, letteratura, arte, cinema, scienza. Quando mondi lontani dicono la stessa cosa, lì c'è un'idea. <b>Tavole</b> le incrocia, <b>Ruota</b> le gira, <b>Firmamento</b> le mostra come un cielo.</p>
      <nav class="viste" role="tablist" aria-label="Vista">
        <button type="button" role="tab" id="atl-tab-tavole" data-vista="tavole" aria-selected="true" aria-controls="atl-v-tavole">Tavole</button>
        <button type="button" role="tab" id="atl-tab-ruota" data-vista="ruota" aria-selected="false" aria-controls="atl-v-ruota">Ruota</button>
        <button type="button" role="tab" id="atl-tab-firmamento" data-vista="firmamento" aria-selected="false" aria-controls="atl-v-firmamento">Firmamento</button>
      </nav>
      <div class="filo-riga">
        <span class="filo-etic" title="Il filo di Arianna: il percorso che hai fatto">Filo</span>
        <ol id="atl-filo" aria-label="Percorso fatto"></ol>
        <button class="btn" type="button" id="atl-salva">Salva tavola</button>
        <button class="btn" type="button" id="atl-apri-salvate" aria-expanded="false" aria-controls="atl-salvate">Tavole <span class="n" id="atl-n-salvate">0</span></button>
        <div class="salvate" id="atl-salvate" hidden></div>
      </div>
    </header>

    <main class="corpo">
      <section class="vista" id="atl-v-tavole" role="tabpanel" aria-labelledby="atl-tab-tavole">
        <p class="consiglio" id="atl-tav-consiglio"></p>
        <div class="tav-barra">
          <span class="parti" id="atl-parti-etic">Parti da</span>
          <div class="modo" role="group" aria-labelledby="atl-parti-etic">
            <button type="button" id="atl-modo-domanda" data-modo="domanda" aria-pressed="true">Domanda</button>
            <button type="button" id="atl-modo-disciplina" data-modo="disciplina" aria-pressed="false">Disciplina</button>
          </div>
          <select id="atl-partenza" aria-label="Scegli da dove partire"></select>
        </div>
        <div class="schede" id="atl-schede" aria-label="Colonne"></div>
        <div id="atl-banner" hidden></div>
        <div class="home" id="atl-home" hidden></div>
        <div class="colonne" id="atl-colonne"></div>
      </section>

      <section class="vista" id="atl-v-ruota" role="tabpanel" aria-labelledby="atl-tab-ruota" hidden>
        <p class="consiglio">Al centro le domande, poi le discipline, le emozioni, i simboli e, fuori, le tue cose. Trascina un anello per girarlo. Tocca una domanda: i fili raggiungono chi le risponde.</p>
        <div class="ruota-layout">
          <div class="ruota-scena"><div id="atl-ruota-box"><svg id="atl-ruota" viewBox="-500 -500 1000 1000" role="img" aria-label="Ruota delle domande e delle discipline"></svg></div></div>
          <div class="ruota-lato">
            <div class="comandi">
              <label class="lettura-titolo" for="atl-anello">Anello</label>
              <select id="atl-anello"></select>
              <button class="tondo" type="button" id="atl-ruota-sx" aria-label="Gira l'anello indietro">‹</button>
              <button class="tondo" type="button" id="atl-ruota-dx" aria-label="Gira l'anello avanti">›</button>
              <button class="btn pieno" type="button" id="atl-gira">Gira le ruote</button>
            </div>
            <div class="carta" id="atl-bisoc" hidden></div>
            <div>
              <p class="lettura-titolo">Allineati sul raggio di mezzogiorno</p>
              <div class="letture" id="atl-letture"></div>
            </div>
          </div>
        </div>
      </section>

      <section class="vista" id="atl-v-firmamento" role="tabpanel" aria-labelledby="atl-tab-firmamento" hidden>
        <p class="consiglio">Le regioni sono le discipline; le domande sono costellazioni: accendile per vedere la figura delle stelle che rispondono. Avvicinati con due dita o con la rotella.</p>
        <div class="costellazioni" id="atl-costellazioni"></div>
        <div class="cielo-box" id="atl-cielo-box">
          <canvas id="atl-cielo" aria-label="Firmamento delle idee"></canvas>
          <div class="livelli" id="atl-livelli" role="group" aria-label="Livello di dettaglio"></div>
          <div class="carta carta-cielo" id="atl-salto-carta" hidden></div>
          <div class="cielo-tasti">
            <button class="salto-btn" type="button" id="atl-salto">✦ Salto</button>
            <button class="tondo" type="button" id="atl-zoom-piu" aria-label="Avvicina">+</button>
            <button class="tondo" type="button" id="atl-zoom-meno" aria-label="Allontana">−</button>
            <button class="tondo" type="button" id="atl-zoom-tutto" aria-label="Tutto il cielo">◎</button>
          </div>
        </div>
      </section>

      <aside class="dettaglio" id="atl-dettaglio" aria-label="Scheda"></aside>
    </main>
    <button class="riapri" type="button" id="atl-riapri" hidden></button>
    <div class="avviso" id="atl-avviso" role="status" hidden></div>
  </div>
</template>
