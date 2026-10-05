<script setup lang="ts">
// "Collegato da": le note che citano questa pagina, raggruppate per tipo.
// Di default senza i link che sono proposte di Claude (si vedono con l'interruttore "proposte" acceso).
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import { data } from '../backlink.data'
import { useProposte } from '../proposte'

const { page, frontmatter } = useData()
const mostra = useProposte()
const gruppi = computed(() => {
  const tutti = frontmatter.value.layout === 'home' ? [] : data[page.value.filePath] ?? []
  if (mostra.value) return tutti
  return tutti.map((g) => ({ ...g, note: g.note.filter((n) => !n.proposta) })).filter((g) => g.note.length)
})
</script>

<template>
  <section v-if="gruppi.length" class="collegato-da" aria-labelledby="collegato-da">
    <h2 id="collegato-da">Collegato da</h2>
    <dl>
      <template v-for="g in gruppi" :key="g.gruppo">
        <dt :class="{ archivio: g.gruppo === 'archivio' }">{{ g.etichetta }}</dt>
        <dd>
          <template v-for="(n, i) in g.note" :key="n.link">
            <a :href="withBase(n.link)" :class="{ 'link-proposto': mostra && n.proposta }">{{ n.titolo }}</a><span v-if="i < g.note.length - 1" class="sep"> · </span>
          </template>
        </dd>
      </template>
    </dl>
  </section>
</template>
