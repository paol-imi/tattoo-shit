<script setup lang="ts">
// La home: la formula del nucleo, i percorsi, le idee per stato, le piste aperte.
// Di default solo ciò che è validato; con l'interruttore "proposte" acceso anche le proposte di Claude.
import { computed } from 'vue'
import { withBase } from 'vitepress'
import { data } from '../home.data'
import { data as bacheca } from '../bacheca.data'
import { useProposte } from '../proposte'
import { pallini } from '../../shared/nota.ts'
import Ornamento from './Ornamento.vue'
import Tavola from './Tavola.vue'

const mostra = useProposte()
const tieni = <T extends { validata: boolean }>(v: T[]) => (mostra.value ? v : v.filter((x) => x.validata))

const stati = computed(() => data.stati.map((s) => ({ ...s, idee: tieni(s.idee) })))
const piene = computed(() => stati.value.filter((s) => s.idee.length))
const vuote = computed(() => stati.value.filter((s) => !s.idee.length).map((s) => s.etichetta.toLowerCase()))
const elenco = (v: string[]) => (v.length > 1 ? `${v.slice(0, -1).join(', ')} e ${v[v.length - 1]}` : v[0])
const totIdee = computed(() => stati.value.reduce((t, s) => t + s.idee.length, 0))
const percorsi = computed(() => tieni(data.percorsi))
const piste = computed(() => tieni(data.piste))
const carte = computed(() => tieni(bacheca.carte))
const conteggi = computed(() => data.conteggi.map((c) => ({ etichetta: c.etichetta, n: mostra.value ? c.n : c.validate })))

// la vetrina: una tavola con un pin, poi quattro tavole tipografiche (citazioni prima), in tre colonne
const vetrina = computed(() => {
  const c = carte.value
  const conPin = c.find((x) => x.pin.length)
  const tipografiche = c.filter((x) => !x.pin.length).slice(0, 4)
  const tutte = [conPin, ...tipografiche].filter(Boolean) as typeof c
  return [tutte.slice(0, 1), tutte.slice(1, 3), tutte.slice(3, 5)].filter((col) => col.length)
})
const porte = computed(() => {
  const p = mostra.value ? data.porte : data.porteValidate
  return [
    {
      link: '/bacheca', nome: 'Bacheca', ornamento: 'tavole',
      dice: 'Tutte le idee e gli spunti come un muro di tavole: i pin, le parole, i simboli. Tocca un nodo per filtrare.',
      conta: `${carte.value.length} tavole · ${carte.value.reduce((t, c) => t + c.pin.length, 0)} pin`,
    },
    {
      link: '/testi', nome: 'Testi', ornamento: 'penna',
      dice: 'Le parole che potrei portare addosso: ogni citazione dell\'archivio, composta come un saggio di stampa.',
      conta: `${p.testi} testi · ${p.fonti} fonti`,
    },
    {
      link: '/mappa', nome: 'Mappa', ornamento: 'costellazione',
      dice: 'Il cielo delle note: ogni nota una stella, ogni collegamento un filo. Esplora i vicini, apri le note.',
      conta: `${p.nodi} note · ${p.archi} fili`,
    },
  ]
})
</script>

<template>
  <div class="atlante-home">
    <header class="testata">
      <p class="marchio">Atlante</p>
      <blockquote class="formula">
        <p>{{ data.formula }}</p>
      </blockquote>
      <p class="sottotitolo">
        Un archivio di idee per tatuaggi. Prima il concetto, poi il soggetto.
        Il tatuaggio racconta il viaggio, non la tappa.
        <a class="leggi-nucleo" :href="withBase('/nucleo')">Leggi il nucleo →</a>
      </p>
    </header>

    <nav class="porte" aria-label="Le tre porte">
      <a v-for="p in porte" :key="p.link" class="porta" :href="withBase(p.link)">
        <Ornamento class="porta-ornamento" :nome="p.ornamento" />
        <span class="porta-nome">{{ p.nome }}</span>
        <span class="porta-dice">{{ p.dice }}</span>
        <span class="porta-conta">{{ p.conta }} <span aria-hidden="true">→</span></span>
      </a>
    </nav>

    <section class="sezione vetrina">
      <h2 id="dalla-bacheca" tabindex="-1">Dalla bacheca <a class="header-anchor" href="#dalla-bacheca" aria-label="Link a Dalla bacheca">&#8203;</a></h2>
      <div class="vetrina-tavole">
        <div v-for="(col, i) in vetrina" :key="i" class="vetrina-colonna">
          <Tavola v-for="c in col" :key="c.slug" :carta="c" :nodi="bacheca.nodi" :max-chip="4" :proposte="mostra" />
        </div>
      </div>
      <p class="vetrina-tutte"><a :href="withBase('/bacheca')">Tutta la bacheca: {{ carte.length }} tavole →</a></p>
    </section>

    <div class="colonna">
    <section class="sezione">
      <h2 id="percorsi" tabindex="-1">Percorsi <a class="header-anchor" href="#percorsi" aria-label="Link a Percorsi">&#8203;</a></h2>
      <p class="nota-sezione">Fili narrativi che attraversano tutto l'archivio.</p>
      <ol class="percorsi">
        <li v-for="p in percorsi" :key="p.link">
          <a :href="withBase(p.link)">{{ p.titolo }}</a>
          <span v-if="p.sintesi" class="sintesi">{{ p.sintesi }}</span>
        </li>
      </ol>
    </section>

    <section class="sezione">
      <h2 id="le-idee" tabindex="-1">Le idee <a class="header-anchor" href="#le-idee" aria-label="Link a Le idee">&#8203;</a></h2>
      <p class="nota-sezione">
        {{ totIdee }} proposte di tatuaggio, dalla più matura al seme.
        Il cammino: seme → in esplorazione → forte → scelta → tatuata.
      </p>
      <div v-for="s in piene" :key="s.stato" class="stato">
        <h3 :id="`stato-${s.stato}`">{{ s.etichetta }} <span class="conta">{{ s.idee.length }}</span></h3>
        <ul class="idee">
          <li v-for="i in s.idee" :key="i.link" class="idea">
            <a class="titolo" :href="withBase(i.link)">{{ i.titolo }}</a>
            <span class="dettagli">
              <span :class="{ vuoto: !i.formato }">{{ i.formato ? i.formato.replace(/-/g, ' ') : 'formato da definire' }}</span>
              <span class="sep" aria-hidden="true">·</span>
              <span v-if="i.risonanza" class="risonanza" :title="`risonanza ${i.risonanza} su 5`" :aria-label="`risonanza ${i.risonanza} su 5`">{{ pallini(i.risonanza) }}</span>
              <span v-else class="vuoto">risonanza da sentire</span>
              <template v-if="mostra && !i.validata">
                <span class="sep" aria-hidden="true">·</span>
                <a class="proposta-tag" :href="withBase('/da-validare')" title="Proposta di Claude: non l'hai ancora approvata">proposta di Claude, da validare</a>
              </template>
            </span>
            <span v-if="i.concetto" class="concetto">{{ i.concetto }}</span>
          </li>
        </ul>
      </div>
      <p v-if="vuote.length" class="nota-sezione">Ancora nessuna idea tra le {{ elenco(vuote) }}.</p>
    </section>

    <section class="sezione">
      <h2 id="piste-aperte" tabindex="-1">Piste aperte <a class="header-anchor" href="#piste-aperte" aria-label="Link a Piste aperte">&#8203;</a></h2>
      <p class="nota-sezione">Ricerche da fare o in corso: quello che ne nasce diventa spunto o idea.</p>
      <ul v-if="piste.length" class="idee piste">
        <li v-for="p in piste" :key="p.link" class="idea">
          <a class="titolo" :href="withBase(p.link)">{{ p.titolo }}</a>
          <span class="dettagli">{{ p.stato.toLowerCase() }}</span>
          <span v-if="p.oggetto" class="concetto">{{ p.oggetto }}</span>
        </li>
      </ul>
      <p v-else class="nota-sezione">Nessuna pista aperta: tutte le ricerche sono fatte.</p>
    </section>

    <p class="conteggio">
      La mappa:
      <template v-for="(c, i) in conteggi" :key="c.etichetta">
        {{ c.n }} {{ c.etichetta }}<span v-if="i < conteggi.length - 1"> · </span>
      </template>.
      Tutto è nell'indice, nella ricerca e sulla <a :href="withBase('/mappa')">mappa</a>.
      <template v-if="mostra && data.daValidare">
        <br />Ci sono {{ data.daValidare }} proposte di Claude che aspettano un sì o un no:
        <a :href="withBase('/da-validare')">da validare</a>.
      </template>
    </p>
    </div>
  </div>
</template>
