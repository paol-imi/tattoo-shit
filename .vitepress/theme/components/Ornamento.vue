<script setup lang="ts">
// Ornamenti incisi per le carte tipografiche: piccoli simboli al tratto, nello spirito
// delle xilografie del Cinquecento. Disegnati qui, in SVG, con il colore del testo.
import { computed } from 'vue'

const props = defineProps<{ nome: string }>()

const C = 50
const rad = (g: number) => (g * Math.PI) / 180
const p = (ang: number, r: number, cx = C, cy = C) => `${(cx + r * Math.cos(rad(ang))).toFixed(2)},${(cy + r * Math.sin(rad(ang))).toFixed(2)}`
const range = (n: number) => [...Array(n).keys()]

interface Segno { d: string; fill?: boolean; sottile?: boolean; carta?: boolean }

function sole(): Segno[] {
  const out: Segno[] = []
  for (const i of range(32)) {
    const a = i * (360 / 32) - 90
    if (i % 2 === 0) {
      out.push({ d: `M${p(a - 3.2, 17)} L${p(a, 46)} L${p(a + 3.2, 17)}`, sottile: true })
      out.push({ d: `M${p(a, 17)} L${p(a, 46)} L${p(a + 3.2, 17)} Z`, fill: true })
    } else {
      // raggio fiammeggiante: una linea che ondeggia
      out.push({ d: `M${p(a, 17)} Q${p(a - 4, 23)} ${p(a, 28)} T${p(a, 36)}`, sottile: true })
    }
  }
  out.push({ d: `M${C - 14},${C} a14,14 0 1,0 28,0 a14,14 0 1,0 -28,0`, carta: true })
  out.push({ d: `M${C - 9.5},${C} a9.5,9.5 0 1,0 19,0 a9.5,9.5 0 1,0 -19,0`, sottile: true })
  for (const i of range(5)) out.push({ d: `M${C - 8 + i * 4},${C - 6 + Math.abs(i - 2) * 1.5} l0,${12 - Math.abs(i - 2) * 3}`, sottile: true })
  return out
}

function stella(): Segno[] {
  const out: Segno[] = [{ d: `M${C - 33},${C} a33,33 0 1,0 66,0 a33,33 0 1,0 -66,0`, sottile: true }]
  for (const i of range(8)) {
    const a = i * 45 - 90
    const L = i % 2 === 0 ? 47 : 27
    out.push({ d: `M${C},${C} L${p(a - 22.5, 8)} L${p(a, L)} Z`, carta: true })
    out.push({ d: `M${C},${C} L${p(a, L)} L${p(a + 22.5, 8)} Z`, fill: true })
  }
  for (const [a, r] of [[20, 40], [200, 42], [120, 44], [300, 41]]) out.push({ d: `M${p(a, r)} m-1.2,0 a1.2,1.2 0 1,0 2.4,0 a1.2,1.2 0 1,0 -2.4,0`, fill: true })
  return out
}

function occhio(): Segno[] {
  const out: Segno[] = []
  for (const i of range(11)) {
    const a = -165 + i * 15
    out.push({ d: `M${p(a, 34, C, 56)} L${p(a, i % 2 ? 41 : 46, C, 56)}`, sottile: true })
  }
  out.push({ d: `M12,56 Q50,22 88,56 Q50,90 12,56 Z` })
  out.push({ d: `M${C - 15},56 a15,15 0 1,0 30,0 a15,15 0 1,0 -30,0` })
  for (const i of range(24)) { const a = i * 15; out.push({ d: `M${p(a, 7, C, 56)} L${p(a, 14, C, 56)}`, sottile: true }) }
  out.push({ d: `M${C - 5.5},56 a5.5,5.5 0 1,0 11,0 a5.5,5.5 0 1,0 -11,0`, fill: true })
  out.push({ d: `M${C + 1},53 a1.6,1.6 0 1,0 3.2,0 a1.6,1.6 0 1,0 -3.2,0`, carta: true })
  return out
}

function clessidra(): Segno[] {
  return [
    { d: 'M20,12 L80,12 L80,18 L20,18 Z' },
    { d: 'M20,82 L80,82 L80,88 L20,88 Z' },
    { d: 'M24,18 L24,82 M76,18 L76,82', sottile: true },
    { d: 'M30,18 C30,40 47,43 48.5,50 C47,57 30,60 30,82 M70,18 C70,40 53,43 51.5,50 C53,57 70,60 70,82' },
    { d: 'M37,33 Q50,45 63,33 Z', fill: true },
    { d: 'M33,82 Q50,62 67,82 Z', fill: true },
    { d: 'M50,50 L50,70', sottile: true },
    ...range(6).map((i) => ({ d: `M${36 + i * 5.5},26 l0.01,0`, sottile: true })),
  ]
}

function ouroboros(): Segno[] {
  const out: Segno[] = []
  const arco = (r: number) => `M${p(-78, r)} A${r},${r} 0 1,1 ${p(-102, r)}`
  out.push({ d: arco(36) }, { d: arco(26) })
  for (let a = -70; a <= 250; a += 9) out.push({ d: `M${p(a, 27)} Q${p(a + 5, 31)} ${p(a, 35)}`, sottile: true })
  // la coda che si assottiglia e la testa che la morde
  out.push({ d: `M${p(-102, 36)} Q${p(-96, 31)} ${p(-86, 31)} M${p(-102, 26)} Q${p(-96, 30)} ${p(-86, 31)}`, sottile: true })
  out.push({ d: `M${p(-78, 37)} Q${p(-88, 38)} ${p(-92, 31)} Q${p(-88, 24)} ${p(-78, 25)} Z`, fill: true })
  out.push({ d: `M${p(-84, 33)} m-1,0 a1,1 0 1,0 2,0 a1,1 0 1,0 -2,0`, carta: true })
  return out
}

function spirale(): Segno[] {
  const punti: string[] = []
  const giri = 3.4
  for (let t = 0; t <= giri * 2 * Math.PI; t += 0.12) {
    const r = 2 + (40 * t) / (giri * 2 * Math.PI)
    punti.push(`${(C + r * Math.cos(t)).toFixed(2)},${(C + r * Math.sin(t)).toFixed(2)}`)
  }
  return [
    { d: 'M' + punti.join(' L') },
    ...[[86, 30], [14, 74], [80, 84], [22, 16]].map(([x, y]) => ({ d: `M${x - 1.3},${y} a1.3,1.3 0 1,0 2.6,0 a1.3,1.3 0 1,0 -2.6,0`, fill: true })),
  ]
}

function porta(): Segno[] {
  const out: Segno[] = [
    { d: 'M26,88 L26,42 A24,24 0 0,1 74,42 L74,88' },
    { d: 'M35,88 L35,44 A15,15 0 0,1 65,44 L65,88' },
    { d: 'M14,88 L86,88 M20,94 L80,94', sottile: true },
  ]
  for (let x = 38; x <= 62; x += 3) {
    const dy = Math.sqrt(Math.max(0, 15 * 15 - (x - 50) ** 2))
    out.push({ d: `M${x},${(44 - dy + 2).toFixed(1)} L${x},86`, sottile: true })
  }
  out.push({ d: `M50,52 L52,60 L50,68 L48,60 Z M42,60 L50,58 L58,60 L50,62 Z`, carta: true })
  return out
}

function velo(): Segno[] {
  const out: Segno[] = [
    { d: 'M14,18 L86,18' },
    { d: 'M12,18 a2,2 0 1,0 0.01,0 M88,18 a2,2 0 1,0 0.01,0', fill: true },
  ]
  for (const i of range(9)) {
    const x = 20 + i * 7.5
    const amp = 2 + i * 0.4
    out.push({ d: `M${x},18 C${x + amp},40 ${x - amp},62 ${x + amp * 0.6},${84 + Math.sin(i) * 3}`, sottile: i % 2 === 1 })
  }
  out.push({ d: 'M20,84 Q35,92 50,86 Q65,80 80,88', sottile: true })
  return out
}

function ruota(): Segno[] {
  const out: Segno[] = [
    { d: `M${C - 40},${C} a40,40 0 1,0 80,0 a40,40 0 1,0 -80,0` },
    { d: `M${C - 32},${C} a32,32 0 1,0 64,0 a32,32 0 1,0 -64,0`, sottile: true },
    { d: `M${C - 32},${C} a32,12 0 1,0 64,0 a32,12 0 1,0 -64,0` },
    { d: `M${C},${C - 32} a12,32 0 1,0 0,64 a12,32 0 1,0 0,-64` },
  ]
  for (const i of range(12)) {
    const a = i * 30
    const [x, y] = p(a, 36).split(',').map(Number)
    out.push({ d: `M${x - 2.6},${y} Q${x},${y - 2.2} ${x + 2.6},${y} Q${x},${y + 2.2} ${x - 2.6},${y} Z`, carta: true })
    out.push({ d: `M${x - 0.9},${y} a0.9,0.9 0 1,0 1.8,0 a0.9,0.9 0 1,0 -1.8,0`, fill: true })
  }
  return out
}

function albero(): Segno[] {
  const S: [number, number][] = [[50, 8], [72, 20], [28, 20], [72, 42], [28, 42], [50, 52], [72, 66], [28, 66], [50, 78], [50, 94]]
  const archi = [[0, 1], [0, 2], [1, 2], [0, 5], [1, 3], [2, 4], [1, 5], [2, 5], [3, 4], [3, 5], [4, 5], [3, 6], [4, 7], [5, 6], [5, 7], [6, 7], [5, 8], [6, 8], [7, 8], [8, 9], [6, 9], [7, 9]]
  return [
    ...archi.map(([a, b]) => ({ d: `M${S[a][0]},${S[a][1]} L${S[b][0]},${S[b][1]}`, sottile: true })),
    ...S.map(([x, y]) => ({ d: `M${x - 6},${y} a6,6 0 1,0 12,0 a6,6 0 1,0 -12,0`, carta: true })),
    ...S.map(([x, y], i) => ({ d: `M${x - 2},${y} a2,2 0 1,0 4,0 a2,2 0 1,0 -4,0`, fill: i === 5 })),
  ]
}

function scala(): Segno[] {
  const out: Segno[] = [{ d: 'M34,94 L44,24 M66,94 L56,24' }]
  for (let y = 86; y > 28; y -= 9) {
    const t = (94 - y) / 70
    out.push({ d: `M${34 + 10 * t},${y} L${66 - 10 * t},${y}`, sottile: true })
  }
  out.push({ d: 'M50,4 L52,12 L60,14 L52,16 L50,24 L48,16 L40,14 L48,12 Z', fill: true })
  return out
}

function lampada(): Segno[] {
  const out: Segno[] = [
    { d: 'M20,70 Q22,58 50,58 Q74,58 82,64 L94,60 Q90,68 80,72 Q66,80 44,80 Q24,80 20,70 Z' },
    { d: 'M20,70 Q10,64 12,56 Q16,52 22,60', sottile: true },
    { d: 'M38,58 Q50,52 62,58', sottile: true },
    { d: 'M34,80 L32,88 L68,88 L64,79', sottile: true },
    { d: 'M92,58 Q84,46 92,30 Q100,46 92,58 Z', fill: true },
  ]
  for (const i of range(7)) { const a = -160 + i * 23; out.push({ d: `M${p(a, 15, 92, 44)} L${p(a, 22, 92, 44)}`, sottile: true }) }
  for (let x = 28; x <= 74; x += 4) out.push({ d: `M${x},${x < 50 ? 72 : 73} l2,5`, sottile: true })
  return out
}


function tavole(): Segno[] {
  const out: Segno[] = [
    { d: 'M8,22 L44,22 L44,70 L8,70 Z', carta: true },
    { d: 'M12,26 L40,26 L40,66 L12,66 Z', sottile: true },
    { d: 'M52,10 L92,10 L92,46 L52,46 Z', carta: true },
    { d: 'M56,14 L88,14 L88,42 L56,42 Z', sottile: true },
    { d: 'M52,54 L92,54 L92,94 L52,94 Z', carta: true },
    { d: 'M56,58 L88,58 L88,90 L56,90 Z', sottile: true },
    { d: 'M14,78 L44,78 M14,84 L38,84 M14,90 L42,90', sottile: true },
  ]
  for (let x = 15; x <= 38; x += 3) out.push({ d: `M${x},29 L${x},63`, sottile: true })
  out.push({ d: 'M72,20 L74,26 L80,28 L74,30 L72,36 L70,30 L64,28 L70,26 Z', fill: true })
  out.push({ d: 'M60,84 Q72,62 84,84', sottile: false })
  return out
}

function penna(): Segno[] {
  const out: Segno[] = [{ d: 'M18,94 Q44,58 88,8' }]
  for (let t = 0.18; t <= 0.92; t += 0.045) {
    const x = (1 - t) ** 2 * 18 + 2 * (1 - t) * t * 44 + t * t * 88
    const y = (1 - t) ** 2 * 94 + 2 * (1 - t) * t * 58 + t * t * 8
    const w = Math.sin(Math.PI * Math.min(1, (t - 0.12) / 0.86)) * 15
    out.push({ d: `M${x.toFixed(1)},${y.toFixed(1)} q${(-w * 0.3).toFixed(1)},${(-w * 0.55).toFixed(1)} ${(-w * 0.9).toFixed(1)},${(-w * 0.75).toFixed(1)}`, sottile: true })
    out.push({ d: `M${x.toFixed(1)},${y.toFixed(1)} q${(w * 0.55).toFixed(1)},${(w * 0.25).toFixed(1)} ${(w * 0.8).toFixed(1)},${(w * 0.85).toFixed(1)}`, sottile: true })
  }
  out.push({ d: 'M18,94 L14,99 M8,98 Q30,92 46,97', sottile: true })
  return out
}

function costellazione(): Segno[] {
  const S: [number, number, number][] = [[14, 70, 2.4], [30, 52, 3.4], [50, 60, 2.2], [62, 34, 4.2], [84, 22, 2.6], [78, 62, 3], [40, 86, 2]]
  const archi = [[0, 1], [1, 2], [2, 3], [3, 4], [3, 5], [2, 6], [1, 3]]
  const out: Segno[] = archi.map(([a, b]) => ({ d: `M${S[a][0]},${S[a][1]} L${S[b][0]},${S[b][1]}`, sottile: true }))
  for (const [x, y, r] of S) {
    out.push({ d: `M${x - r - 1.2},${y} a${r + 1.2},${r + 1.2} 0 1,0 ${2 * r + 2.4},0 a${r + 1.2},${r + 1.2} 0 1,0 ${-2 * r - 2.4},0`, carta: true, sottile: true })
    out.push({ d: `M${x},${y - r * 1.8} L${x + r * 0.4},${y - r * 0.4} L${x + r * 1.8},${y} L${x + r * 0.4},${y + r * 0.4} L${x},${y + r * 1.8} L${x - r * 0.4},${y + r * 0.4} L${x - r * 1.8},${y} L${x - r * 0.4},${y - r * 0.4} Z`, fill: true })
  }
  out.push({ d: 'M50,50 m-46,0 a46,46 0 1,0 92,0 a46,46 0 1,0 -92,0', sottile: true })
  return out
}

const DISEGNI: Record<string, () => Segno[]> = { tavole, penna, costellazione, sole, stella, occhio, clessidra, ouroboros, spirale, porta, velo, ruota, albero, scala, lampada }
const segni = computed(() => (DISEGNI[props.nome] ?? sole)())
</script>

<template>
  <svg class="ornamento" viewBox="-6 -6 112 112" aria-hidden="true" focusable="false">
    <path
      v-for="(s, i) in segni"
      :key="i"
      :d="s.d"
      :class="{ pieno: s.fill, sottile: s.sottile, carta: s.carta }"
    />
  </svg>
</template>

<style scoped>
.ornamento { display: block; overflow: visible; }
path { fill: none; stroke: currentColor; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; }
path.sottile { stroke-width: 0.9; }
path.pieno { fill: currentColor; stroke-width: 0.6; }
path.carta { fill: var(--atl-carta-carta, var(--vp-c-bg-elv)); }
</style>
