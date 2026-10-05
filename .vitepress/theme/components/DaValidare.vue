<script setup lang="ts">
// Da validare: ciò che Claude ha proposto di sua iniziativa e io non ho ancora approvato.
// Tre parti: le note intere, i blocchi proposta dentro le mie note, i collegamenti aggiunti in migrazione.
// Si genera dalle note a ogni build (validare.data.ts): quando approvo qualcosa, sparisce da qui.
import { withBase } from 'vitepress'
import { data } from '../validare.data'

const parti = [
  { id: 'note-proposte', n: data.note.length, uno: 'nota proposta', tanti: 'note proposte' },
  { id: 'proposte-nelle-note', n: data.proposte.length, uno: 'proposta nelle tue note', tanti: 'proposte nelle tue note' },
  { id: 'collegamenti-proposti', n: data.collegamenti.length, uno: 'collegamento', tanti: 'collegamenti' },
]
</script>

<template>
  <div class="atl-pagina validare">
    <header class="atl-testata">
      <p class="atl-occhiello">Atlante · da validare</p>
      <h1>Da validare</h1>
      <p class="atl-sommario">
        Ciò che Claude ha proposto e tu non hai ancora approvato. Dimmi sì o no, una cosa alla volta.
      </p>
      <p class="validare-interruttore">
        Questa pagina mostra sempre tutto. Nel resto del sito le proposte sono nascoste: per vederle al loro posto,
        marcate in rosso, accendi l'interruttore <em>proposte</em> in alto (sul telefono, nel menu).
      </p>
    </header>

    <nav class="validare-indice" aria-label="Le tre parti">
      <a v-for="p in parti" :key="p.id" :href="`#${p.id}`" class="validare-conta" :class="{ zero: !p.n }">
        <strong>{{ p.n }}</strong>
        <span>{{ p.n === 1 ? p.uno : p.tanti }}</span>
      </a>
    </nav>

    <p class="validare-come">
      <strong>Come si valida.</strong> Quando dici sì, la nota prende <code>validata: true</code> (l'origine non
      cambia) oppure il blocco proposta si scioglie nel testo; la data finisce nell'evoluzione della nota.
      Quando dici no, la proposta si toglie o va in archivio. In ogni caso, da qui sparisce da sola.
    </p>

    <section class="validare-parte" aria-labelledby="note-proposte">
      <h2 id="note-proposte" class="validare-titolo">Note proposte da Claude <span class="conta">{{ data.note.length }}</span></h2>
      <p class="validare-nota">
        Idee, spunti e nodi proposti da Claude: di sua iniziativa qui, o nella chat da cui è nato il seme. Non li hai ancora approvati.
      </p>
      <div v-if="data.note.length" class="validare-carte">
        <article v-for="n in data.note" :key="n.link" class="validare-carta">
          <p class="validare-carta-testa">
            <span class="validare-tipo">{{ n.etichetta }}</span>
            <span class="validare-segno">proposta di Claude</span>
            <span v-if="n.seme" class="validare-segno">dal seme</span>
            <span class="validare-segno">da validare</span>
          </p>
          <h3 class="validare-carta-titolo"><a :href="withBase(n.link)">{{ n.titolo }}</a></h3>
          <p v-if="n.sintesi" class="validare-sintesi">{{ n.sintesi }}</p>
          <a class="validare-apri" :href="withBase(n.link)" :aria-label="`Apri la nota: ${n.titolo}`">Apri la nota <span aria-hidden="true">→</span></a>
        </article>
      </div>
      <p v-else class="validare-vuoto">Nessuna nota in attesa.</p>
    </section>

    <section class="validare-parte" aria-labelledby="proposte-nelle-note">
      <h2 id="proposte-nelle-note" class="validare-titolo">Proposte nelle tue note <span class="conta">{{ data.proposte.length }}</span></h2>
      <p class="validare-nota">Note che hai già approvato, o che hai portato tu, con dentro un passo scritto da Claude di sua iniziativa.</p>
      <div v-if="data.proposte.length" class="validare-proposte">
        <figure v-for="p in data.proposte" :key="p.id" class="validare-proposta">
          <figcaption>
            <span class="validare-tipo">{{ p.nota.etichetta }}</span>
            <a class="validare-proposta-nota" :href="withBase(p.nota.link)">{{ p.nota.titolo }}</a>
            <span v-if="p.sezione" class="validare-sezione">§ {{ p.sezione }}</span>
          </figcaption>
          <blockquote class="validare-proposta-testo" v-html="p.html" />
          <a class="validare-apri" :href="withBase(p.nota.link) + p.ancora">Leggila nella nota <span aria-hidden="true">→</span></a>
        </figure>
      </div>
      <p v-else class="validare-vuoto">Nessun blocco proposta in attesa.</p>
    </section>

    <section class="validare-parte" aria-labelledby="collegamenti-proposti">
      <h2 id="collegamenti-proposti" class="validare-titolo">Collegamenti aggiunti in migrazione <span class="conta">{{ data.collegamenti.length }}</span></h2>
      <p class="validare-nota">
        Claude li ha aggiunti scomponendo il seme, per dare almeno due legami a ogni nota. Sulla
        <a :href="withBase('/mappa')">mappa</a> sono i fili tratteggiati. L'elenco vive nel
        <a :href="withBase(data.diario.link)">diario della fase 1</a>.
      </p>
      <ul v-if="data.collegamenti.length" class="validare-collegamenti">
        <li v-for="(c, i) in data.collegamenti" :key="i" v-html="c.html" />
      </ul>
      <p v-else class="validare-vuoto">Nessun collegamento in attesa.</p>
    </section>

    <p v-if="!data.totale" class="atl-vuoto">Niente da validare: hai detto la tua su tutto.</p>
  </div>
</template>
