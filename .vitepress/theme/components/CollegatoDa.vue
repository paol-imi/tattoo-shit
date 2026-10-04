<script setup lang="ts">
// "Collegato da": le note che citano questa pagina, raggruppate per tipo.
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import { data } from '../backlink.data'

const { page, frontmatter } = useData()
const gruppi = computed(() => (frontmatter.value.layout === 'home' ? [] : data[page.value.filePath] ?? []))
</script>

<template>
  <section v-if="gruppi.length" class="collegato-da" aria-labelledby="collegato-da">
    <h2 id="collegato-da">Collegato da</h2>
    <dl>
      <template v-for="g in gruppi" :key="g.gruppo">
        <dt :class="{ archivio: g.gruppo === 'archivio' }">{{ g.etichetta }}</dt>
        <dd>
          <template v-for="(n, i) in g.note" :key="n.link">
            <a :href="withBase(n.link)">{{ n.titolo }}</a><span v-if="i < g.note.length - 1" class="sep"> · </span>
          </template>
        </dd>
      </template>
    </dl>
  </section>
</template>
