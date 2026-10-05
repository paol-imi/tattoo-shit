<script setup lang="ts">
// L'interruttore "proposte": spento, il sito mostra solo ciò che ho validato; acceso, tornano le proposte
// di Claude, marcate in rosso. Nella barra in alto (compatto) e nel menu del telefono (con la spiegazione).
// L'aspetto acceso/spento viene dalla classe su <html>, già giusta al primo disegno; aria-checked dopo il montaggio.
import { withBase } from 'vitepress'
import { useProposte, impostaProposte } from '../proposte'

defineProps<{ schermo?: boolean }>()
const mostra = useProposte()
</script>

<template>
  <div class="interruttore-proposte" :class="{ 'interruttore-schermo': schermo }">
    <button
      type="button"
      role="switch"
      class="interruttore"
      :aria-checked="mostra ? 'true' : 'false'"
      aria-label="Mostra le proposte di Claude"
      title="Mostra anche le proposte di Claude, marcate in rosso"
      @click="impostaProposte(!mostra)"
    >
      <span class="interruttore-pista" aria-hidden="true"><span class="interruttore-pomello" /></span>
      <span class="interruttore-testo" aria-hidden="true">{{ schermo ? 'Mostra le proposte di Claude' : 'proposte' }}</span>
    </button>
    <a class="interruttore-validare" :href="withBase('/da-validare')">{{ schermo ? 'Tutto ciò che è da validare →' : 'da validare' }}</a>
  </div>
</template>
