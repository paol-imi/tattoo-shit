---
titolo: "Mappa"
layout: page
sidebar: false
aside: false
footer: false
pageClass: atl-visiva
description: "L'Atlante dei concetti: le grandi domande e le voci che rispondono, in tre viste (Tavole, Ruota, Firmamento)."
---

<script setup>
import { data } from './.vitepress/theme/atlante.data'
import { useProposte } from './.vitepress/theme/proposte'

const mostra = useProposte()
</script>

<MappaAtlante :dati="data" :mostra-proposte="mostra" />
