<script setup lang="ts">
// La home: la formula del nucleo, i percorsi, le idee per stato.
import { computed } from 'vue'
import { withBase } from 'vitepress'
import { data } from '../home.data'

const piene = computed(() => data.stati.filter((s) => s.idee.length))
const vuote = computed(() => data.stati.filter((s) => !s.idee.length).map((s) => s.etichetta.toLowerCase()))
const elenco = (v: string[]) => (v.length > 1 ? `${v.slice(0, -1).join(', ')} e ${v[v.length - 1]}` : v[0])
const totIdee = computed(() => data.stati.reduce((t, s) => t + s.idee.length, 0))
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
      </p>
      <p class="azioni">
        <a class="azione primaria" :href="withBase('/nucleo')">Leggi il nucleo</a>
        <a class="azione" href="#percorsi">I percorsi</a>
        <a class="azione" href="#le-idee">Le idee</a>
      </p>
    </header>

    <section class="sezione">
      <h2 id="percorsi" tabindex="-1">Percorsi <a class="header-anchor" href="#percorsi" aria-label="Link a Percorsi">&#8203;</a></h2>
      <p class="nota-sezione">Fili narrativi che attraversano tutto l'archivio.</p>
      <ol class="percorsi">
        <li v-for="p in data.percorsi" :key="p.link">
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
              <span v-if="i.risonanza" class="risonanza" :title="`risonanza ${i.risonanza} su 5`" :aria-label="`risonanza ${i.risonanza} su 5`">{{ '●'.repeat(i.risonanza) }}{{ '○'.repeat(5 - i.risonanza) }}</span>
              <span v-else class="vuoto">risonanza da sentire</span>
            </span>
            <span v-if="i.concetto" class="concetto">{{ i.concetto }}</span>
          </li>
        </ul>
      </div>
      <p v-if="vuote.length" class="nota-sezione">Ancora nessuna idea tra le {{ elenco(vuote) }}.</p>
    </section>

    <p class="mappa">
      La mappa:
      <template v-for="(c, i) in data.conteggi" :key="c.etichetta">
        {{ c.n }} {{ c.etichetta }}<span v-if="i < data.conteggi.length - 1"> · </span>
      </template>.
      Tutto è nell'indice e nella ricerca.
    </p>
  </div>
</template>
