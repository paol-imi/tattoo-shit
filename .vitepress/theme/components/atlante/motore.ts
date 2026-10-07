// @ts-nocheck -- il corpo è il JS del prototipo (S/prototipo-mappa/atlante.html) portato così com'è:
// i tipi stanno sull'interfaccia esportata (monta, OpzioniMappa, StatoMappa), non dentro.
//
// Il motore dell'Atlante dei concetti: tre viste sugli stessi dati (schema v2, vedi filtra.ts).
// - Tavole: le otto domande e le colonne delle discipline che rispondono; un nome fa da perno.
// - Ruota: anelli concentrici (domande, discipline, emozioni, simboli e concetti, le tue) da girare.
// - Firmamento: un cielo su canvas (d3-zoom), le regioni sono le discipline, le domande costellazioni.
// Tutto il DOM sta sotto `root` (il markup statico di MappaAtlante.vue); i listener globali, gli
// osservatori, i requestAnimationFrame e le transizioni si chiudono in smonta().
// Le proposte di Claude (nodi `validata: false`, legami `proposto: true`, `domandeProposte`) arrivano
// solo se l'interruttore è acceso (filtra.ts) e si disegnano nel rosso della rubrica, tratteggiate.
import { select } from 'd3-selection'
import { zoom, zoomIdentity } from 'd3-zoom'
import type { DatiAtlante } from './filtra'

/** Ciò che sopravvive a uno smonta/monta (cambio dei dati o dell'interruttore delle proposte). */
export interface StatoMappa {
  vista?: string
  modo?: string
  domanda?: string | null
  partenza?: string
  fuoco?: { k: string; id: string } | null
  filo?: { k: string; id: string }[]
}

export interface OpzioniMappa {
  /** Porta alla nota: il wrapper usa withBase + router.go. */
  vai(url: string): void
  /** L'href da scrivere nei link alle note (per il clic centrale); predefinito: l'url così com'è. */
  href?(url: string): string
  /** Lo stato da riprendere (vista, domanda fissata, fuoco, filo). */
  stato?: StatoMappa | null
  /** Il nodo (o la domanda) da aprire all'avvio; predefinito: ?nodo=slug dall'indirizzo. */
  nodo?: string | null
}

export interface ManigliaMappa {
  /** Toglie listener, osservatori, animazioni; restituisce lo stato da passare al prossimo monta. */
  smonta(): StatoMappa
}

const CHIAVE_VISTA = 'atlante-mappa-vista'

export function monta(root: HTMLElement, dati: DatiAtlante, opzioni: OpzioniMappa): ManigliaMappa {
  const ac = new AbortController()
  const signal = ac.signal
  const osservatori: { disconnect(): void }[] = []
  const vai = (url) => opzioni.vai(url)
  const href = (url) => (opzioni.href ? opzioni.href(url) : url)
  let tR = 0
  const $ = (s, el = root) => el.querySelector(s)
  // i listener si tolgono tutti insieme in smonta()
  const su = (el, tipo, fn) => el.addEventListener(tipo, fn, { signal })
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
  const RIDOTTO = matchMedia('(prefers-reduced-motion: reduce)').matches
  const LARGO = matchMedia('(min-width: 1000px)')
  const TAU = Math.PI * 2
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v) } catch { return d } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); return true } catch { return false } },
  }
  const caso = (arr) => arr[Math.floor(Math.random() * arr.length)]

  // ============================================================ dati
  const NOMI_FAM = {
    emozioni: ['Emozioni', 'Il livello del sentito: gli stati d\'animo del percorso, dal dolore alla pace.'],
    segni: ['Simboli e concetti', 'Le immagini e le idee portanti dell\'archivio. Non appartengono a una disciplina: le attraversano tutte.'],
    tue: ['Le tue', 'Le tue idee, i tuoi spunti e le tue ricerche.'],
  }
  const BREVE_FAM = { filosofia: 'Filosofia', psicologia: 'Psicologia', 'religioni-e-mito': 'Mito', letteratura: 'Letteratura', arte: 'Arte', 'cinema-e-serie': 'Cinema', scienza: 'Scienza', emozioni: 'Emozioni', segni: 'Simboli', tue: 'Le tue' }
  const BREVE_Q = { 'chi-sono': 'Chi sono', 'perche-soffro': 'Soffrire', 'che-senso-ha': 'Il senso', 'come-vivere': 'Vivere', 'cosa-posso-conoscere': 'Conoscere', 'cosa-c-e-oltre': 'L\'oltre', 'come-stare-con-gli-altri': 'Gli altri', 'cosa-e-reale': 'Il reale' }
  const TIPI_TUOI = new Set(['idea', 'spunto', 'ricerca'])
  const NOMI_SINT = { 'segni--simbolo': 'Simboli', 'segni--concetto': 'Concetti', 'segni--mito': 'Miti', 'tue--idea': 'Idee', 'tue--spunto': 'Spunti', 'tue--ricerca': 'Ricerche' }

  const D = prepara(dati || {})

  function prepara(r) {
    const discs = (r.discipline || []).filter((d) => d && d.id).map((d) => ({ ...d, nome: d.nome || d.id, tipo: 'disciplina' }))
    const discIds = new Set(discs.map((d) => d.id))
    const nodi = (r.nodi || []).filter((n) => n && n.id).map((n) => ({ ...n, nome: n.nome || n.id }))
    for (const n of nodi) if (n.disciplina && !discIds.has(n.disciplina) && !TIPI_TUOI.has(n.tipo)) { discs.push({ id: n.disciplina, nome: n.disciplina, descrizione: '', tipo: 'disciplina' }); discIds.add(n.disciplina) }
    for (const n of nodi) n._fam = TIPI_TUOI.has(n.tipo) ? 'tue' : n.disciplina && discIds.has(n.disciplina) ? n.disciplina : n.tipo === 'emozione' ? 'emozioni' : 'segni'
    const famTutte = [...discs, ...['emozioni', 'segni', 'tue'].map((id) => ({ id, nome: NOMI_FAM[id][0], descrizione: NOMI_FAM[id][1], tipo: id }))]
    const byId = new Map(nodi.map((n) => [n.id, n]))
    const filoni = (r.filoni || []).filter((f) => f && f.id).map((f) => ({ ...f, fam: f.disciplina }))
    const filById = new Map(filoni.map((f) => [f.id, f]))
    const sint = (id, fam, nome) => { if (!filById.has(id)) { const f = { id, fam, nome, motto: '', periodo: '', sintetico: true }; filoni.push(f); filById.set(id, f) } return id }
    for (const n of nodi) {
      const f = n.filone && filById.get(n.filone)
      if (f && f.fam === n._fam) { n._f = f.id; continue }
      if (n._fam === 'segni' || n._fam === 'tue') { const id = `${n._fam}--${n.tipo}`; n._f = sint(id, n._fam, NOMI_SINT[id] || 'Altro') }
      else n._f = sint(n._fam + '--altro', n._fam, 'Altro')
    }
    const adj = new Map(nodi.map((n) => [n.id, new Map()]))
    for (const l of r.legami || []) {
      if (!l || !byId.has(l.da) || !byId.has(l.a) || l.da === l.a) continue
      // tra due legami sulla stessa coppia vince quello approvato
      const gia = adj.get(l.da).get(l.a)
      if (gia && !(gia.proposto && !l.proposto)) continue
      adj.get(l.da).set(l.a, l); adj.get(l.a).set(l.da, l)
    }
    for (const n of nodi) n._g = adj.get(n.id).size
    const maxg = Math.max(1, ...nodi.map((n) => n._g))
    const membri = new Map(filoni.map((f) => [f.id, []]))
    for (const n of nodi) membri.get(n._f).push(n)
    for (const a of membri.values()) a.sort((x, y) => y._g - x._g || x.nome.localeCompare(y.nome, 'it'))
    const fams = famTutte.filter((d) => nodi.some((n) => n._fam === d.id))
    for (const f of filoni) if (f.sintetico && !filoni.some((g) => g !== f && g.fam === f.fam && membri.get(g.id).length)) {
      f.unico = true; f.nome = fams.find((d) => d.id === f.fam)?.nome || f.nome
    }
    const perFam = new Map(fams.map((d) => [d.id, filoni.filter((f) => f.fam === d.id && membri.get(f.id).length)
      .sort((a, b) => (a.sintetico && a.id.endsWith('--altro') ? 1 : 0) - (b.sintetico && b.id.endsWith('--altro') ? 1 : 0))]))
    const nodiFam = new Map(fams.map((d) => [d.id, perFam.get(d.id).flatMap((f) => membri.get(f.id))]))
    // le domande
    const domande = (r.domande || []).filter((q) => q && q.id).map((q) => ({ ...q, nome: q.nome || q.id }))
    const qIds = new Set(domande.map((q) => q.id))
    for (const n of nodi) {
      // le proposte di Claude: il nodo stesso (validata: false) e le domande assegnate da validare
      n._prop = n.validata === false
      const qp = (Array.isArray(n.domandeProposte) ? n.domandeProposte : []).filter((q) => qIds.has(q))
      n.domande = [...new Set([...(Array.isArray(n.domande) ? n.domande : []), ...qp])].filter((q) => qIds.has(q))
      n._q = new Set(n.domande)
      n._qProp = new Set(qp)
    }
    const perQ = new Map(domande.map((q) => [q.id, nodi.filter((n) => n._q.has(q.id)).sort((a, b) => b._g - a._g)]))
    for (const q of domande) {
      // il coro dei dati; se i dati non ne hanno uno (non se l'hanno vuoto: il filtro delle proposte
      // può averlo svuotato) lo si compone con le prime citazioni di mondi diversi
      const dato = Array.isArray(q.coro)
      q.coro = [...new Set((q.coro || []).filter((id) => byId.has(id)))]
      q._coroProp = q.coroProposto === true
      if (!dato) {
        const visti = new Set()
        for (const n of perQ.get(q.id)) if (n.citazione?.testo && !visti.has(n._fam) && q.coro.length < 4) { visti.add(n._fam); q.coro.push(n.id) }
      }
      q.breve = q.breve || BREVE_Q[q.id] || q.nome.replace(/[?¿]/g, '').split(' ').slice(-1)[0]
    }
    const costellazioni = (r.costellazioni || []).filter((c) => c && c.id)
      .map((c) => ({ ...c, nodi: [...new Set((c.nodi || []).filter((id) => byId.has(id)))] })).filter((c) => c.nodi.length >= 2)
    const meta = r._meta || {}
    return {
      fams, famById: new Map(fams.map((d) => [d.id, d])), filoni, filById, nodi, byId, adj, maxg, membri, perFam, nodiFam,
      domande, qById: new Map(domande.map((q) => [q.id, q])), perQ,
      costellazioni, meta, prova: meta.sorgente === 'stub' || nodi.some((n) => n.provvisorio),
    }
  }

  const PALETTE = ['#d3ae63', '#8fb9db', '#e49595', '#a0c49a', '#c6a2d6', '#dc9b6e', '#72cabf', '#d3ccb7']
  const NOTE_FAM = new Set(['filosofia', 'psicologia', 'religioni-e-mito', 'letteratura', 'arte', 'cinema-e-serie', 'scienza', 'emozioni', 'segni', 'tue'])
  const colFam = (d) => d === 'domande' ? 'var(--oro)' : NOTE_FAM.has(d) ? `var(--d-${d})` : PALETTE[Math.max(0, D.fams.findIndex((x) => x.id === d)) % PALETTE.length]
  const nomeFam = (d) => d === 'domande' ? 'Domande' : D.famById.get(d)?.nome ?? d
  const breveFam = (d) => BREVE_FAM[d] || nomeFam(d).split(/[ ,]/)[0]
  const isDisc = (d) => D.famById.get(d)?.tipo === 'disciplina'
  const nodo = (id) => D.byId.get(id)
  const filone = (id) => D.filById.get(id)
  const domanda = (id) => D.qById.get(id)
  const membriDi = (f) => !f ? [] : f.k === 'nodo' ? [nodo(f.id)].filter(Boolean) : f.k === 'filone' ? (D.membri.get(f.id) || []) : f.k === 'fam' ? (D.nodiFam.get(f.id) || []) : (D.perQ.get(f.id) || [])
  const famDi = (f) => f.k === 'nodo' ? nodo(f.id)?._fam : f.k === 'filone' ? filone(f.id)?.fam : f.k === 'fam' ? f.id : null
  const etichetta = (it) => it.k === 'domanda' ? domanda(it.id)?.nome : it.k === 'fam' ? (D.famById.has(it.id) ? nomeFam(it.id) : undefined) : it.k === 'filone' ? filone(it.id)?.nome : nodo(it.id)?.nome
  const anno = (a) => typeof a === 'number' ? (a < 0 ? `${-a} a.C.` : a < 1000 ? `${a} d.C.` : String(a)) : String(a ?? '')
  const TIPO_LEGAME = { archivio: 'nell\'archivio', influenza: 'influenza', tema: 'tema comune', 'autore-di': 'autore' }
  const isPerno = (f) => f && (f.k === 'nodo' || f.k === 'filone')
  // proposte: un nodo non validato, una risposta (nodo → domanda) proposta, un legame proposto
  const propQ = (n, q) => !!n && (n._prop || n._qProp.has(q))
  const propCoro = (n, q) => propQ(n, q) || !!domanda(q)?._coroProp
  const legame = (a, b) => D.adj.get(a)?.get(b)
  const propL = (a, b) => !!legame(a, b)?.proposto
  const ETIC_PROP = 'Proposta di Claude, da validare'

  function bfs(da, max = 4) {
    const dist = new Map([[da, 0]]), prev = new Map(), coda = [da]
    while (coda.length) {
      const x = coda.shift(), d = dist.get(x)
      if (d >= max) continue
      for (const y of D.adj.get(x).keys()) if (!dist.has(y)) { dist.set(y, d + 1); prev.set(y, x); coda.push(y) }
    }
    return { dist, prev }
  }
  function percorso(prev, a) { const p = [a]; while (prev.has(p[0])) p.unshift(prev.get(p[0])); return p }

  // ============================================================ stato
  const VISTE = ['tavole', 'ruota', 'firmamento']
  const primaDisc = () => (D.fams.find((f) => f.tipo === 'disciplina') || D.fams[0])?.id
  const S = {
    vista: VISTE.includes(store.get(CHIAVE_VISTA, 'tavole')) ? store.get(CHIAVE_VISTA, 'tavole') : 'tavole',
    modo: 'domanda', domanda: null, partenza: primaDisc(),
    fuoco: null, filo: [], recenti: [], pannello: false, espanso: false, tutti: new Set(), catena: null, conv: null,
  }
  // dopo uno smonta (cambio dei dati o dell'interruttore): si riprende da dove si era, se esiste ancora
  const esiste = (it) => !!it && !!etichetta(it)
  const st = opzioni.stato
  if (st) {
    if (VISTE.includes(st.vista)) S.vista = st.vista
    if (st.modo === 'domanda' || st.modo === 'disciplina') S.modo = st.modo
    if (st.domanda && D.qById.has(st.domanda)) S.domanda = st.domanda
    if (st.partenza && D.famById.has(st.partenza)) S.partenza = st.partenza
    if (esiste(st.fuoco)) S.fuoco = { k: st.fuoco.k, id: st.fuoco.id }
    S.filo = (st.filo || []).filter(esiste).map((it) => ({ k: it.k, id: it.id }))
  }

  function ricorda(id) { S.recenti = S.recenti.filter((x) => x !== id); S.recenti.push(id); if (S.recenti.length > 12) S.recenti.shift() }
  function aggiungiFilo(it) {
    const u = S.filo[S.filo.length - 1]
    if (u && u.k === it.k && u.id === it.id) return
    S.filo.push(it); if (S.filo.length > 16) S.filo.shift()
  }

  /** Il gesto unico di tutte le viste: fissa una domanda, una disciplina, un filone o un nodo. */
  function vaiA(k, id, opz = {}) {
    if (opz.domanda && D.qById.has(opz.domanda)) S.domanda = opz.domanda
    if (k === 'domanda') {
      if (!D.qById.has(id)) return
      S.domanda = id; S.fuoco = { k, id }; opz.pivot = true
      // sul telefono la domanda si legge nel suo cartiglio: la scheda si apre solo se chiesta
      S.pannello = opz.pannello === true || (opz.pannello !== false && LARGO.matches) ? true : false
    } else if (k === 'fam') {
      if (!D.famById.has(id)) return
      S.partenza = id; S.modo = 'disciplina'; S.fuoco = { k, id }; opz.pivot = true
      S.pannello = opz.pannello === true || (opz.pannello !== false && LARGO.matches)
    } else {
      const d = k === 'nodo' ? nodo(id)?._fam : filone(id)?.fam
      if (!d) return
      if (d !== S.partenza) opz.pivot = true
      S.fuoco = { k, id }; S.partenza = d
      if (k === 'nodo') ricorda(id)
      else { const m = D.membri.get(id); if (m?.[0]) ricorda(m[0].id) }
      if (opz.pannello !== false) S.pannello = true
    }
    if (!opz.catena) { S.catena = null; S.conv = null }
    if (!opz.daFilo) aggiungiFilo({ k, id })
    aggiorna(opz)
  }

  function aggiorna(opz = {}) {
    renderFilo(); renderDettaglio()
    if (S.vista === 'tavole') renderTavole(opz)
    if (S.vista === 'ruota') { aggiornaRuota(); if (opz.ruota !== false && S.fuoco && !opz.catena) portaAMezzogiorno(S.fuoco) }
    if (S.vista === 'firmamento') {
      ridimensiona()
      if (S.fuoco?.k === 'domanda') { C.qAttive.add(S.fuoco.id); aggiornaCost() }
      if (opz.vola !== false && S.fuoco) volaAlFuoco(); else disegnaPresto()
    }
  }

  function cambiaVista(v, primo = false) {
    if (!primo && !LARGO.matches) { S.pannello = false; S.espanso = false; renderDettaglio() }
    S.vista = v; store.set(CHIAVE_VISTA, v)
    for (const b of root.querySelectorAll('.viste button')) b.setAttribute('aria-selected', String(b.dataset.vista === v))
    for (const w of VISTE) $('#atl-v-' + w).hidden = w !== v
    if (v === 'tavole') renderTavole({ pivot: true })
    if (v === 'ruota') { costruisciRuota(); if (S.fuoco) portaAMezzogiorno(S.fuoco, true) }
    if (v === 'firmamento') { iniziaCielo(); if (S.fuoco?.k === 'domanda') { C.qAttive.add(S.fuoco.id); aggiornaCost() } if (S.fuoco) volaAlFuoco(true) }
  }

  // ============================================================ filo di Arianna e tavole salvate
  const CHIAVE = 'atlante-mappa-tavole'
  function renderFilo() {
    const ol = $('#atl-filo')
    const filo = S.filo.filter((it) => etichetta(it))
    if (!filo.length) { ol.innerHTML = '<li><span class="vuoto">il percorso che fai resta qui</span></li>'; return }
    ol.innerHTML = S.filo.map((it, i) => etichetta(it) ? `<li><button type="button" data-filo="${i}"${it.k === 'domanda' ? ' class="q"' : ''}${i === S.filo.length - 1 ? ' aria-current="step"' : ''}>${esc(etichetta(it))}</button></li>` : '').join('')
    ol.scrollLeft = ol.scrollWidth
  }
  function salvate() { const a = store.get(CHIAVE, []); return Array.isArray(a) ? a : [] }
  function renderSalvate() {
    const arr = salvate()
    $('#atl-n-salvate').textContent = arr.length
    const box = $('#atl-salvate')
    if (!arr.length) { box.innerHTML = '<p>Nessuna tavola salvata. Fai un percorso e tocca "Salva tavola".</p>'; return }
    box.innerHTML = '<p>Tavole salvate in questo browser</p>' + arr.map((t, i) => `<div class="salvata">
      <button type="button" class="apri" data-apri="${i}"><span>${esc(t.nome)}</span><small>${esc(new Date(t.quando).toLocaleDateString('it-IT', { day: 'numeric', month: 'short' }))} · ${(t.filo || []).length} passi</small></button>
      <button type="button" class="togli" data-togli="${i}" aria-label="Togli la tavola">×</button></div>`).join('')
  }
  function salvaTavola() {
    const filo = S.filo.filter((it) => etichetta(it))
    if (!filo.length) { avviso('Il filo è vuoto: tocca prima una domanda o un nome.'); return }
    const t = { nome: filo.slice(-3).map(etichetta).join(' › '), quando: new Date().toISOString(), filo, vista: S.vista, domanda: S.domanda, modo: S.modo }
    const arr = salvate(); arr.unshift(t); arr.length = Math.min(arr.length, 40)
    avviso(store.set(CHIAVE, arr) ? 'Tavola salvata in questo browser.' : 'Non riesco a salvare: la memoria del browser non è disponibile.')
    renderSalvate()
  }
  function apriTavola(i) {
    const t = salvate()[i]; if (!t) return
    const filo = (t.filo || []).filter((it) => it && etichetta(it))
    if (!filo.length) { avviso('Questa tavola non corrisponde più ai dati.'); return }
    S.filo = filo
    if (t.modo === 'disciplina' || t.modo === 'domanda') S.modo = t.modo
    S.domanda = t.domanda && D.qById.has(t.domanda) ? t.domanda : null
    const u = filo[filo.length - 1]
    $('#atl-salvate').hidden = true; $('#atl-apri-salvate').setAttribute('aria-expanded', 'false')
    vaiA(u.k, u.id, { daFilo: true, pivot: true })
  }
  let tAvviso
  function avviso(testo) {
    const a = $('#atl-avviso'); a.textContent = testo; a.hidden = false
    clearTimeout(tAvviso); tAvviso = setTimeout(() => { a.hidden = true }, 2600)
  }

  // ============================================================ Tavole
  function voce(n, { classi = '', via = null, legame = null, coro = false } = {}) {
    const destra = via ? `<span class="v-n" title="${via.length} legami">${via.length}</span>` : n.anno != null && n.anno !== '' ? `<span class="v-anno">${esc(anno(n.anno))}</span>` : '<span></span>'
    let sotto = ''
    if (legame) sotto = `<span class="v-via">↔ ${esc(TIPO_LEGAME[legame.tipo] || legame.tipo || 'collegato')}</span>`
    else if (via) sotto = `<span class="v-via">↔ ${via.slice(0, 3).map((m) => esc(m.nome)).join(' · ')}${via.length > 3 ? ' …' : ''}</span>`
    const tua = n._fam === 'tue' ? ' tua' : ''
    const prop = propQ(n, S.domanda) ? ` proposta" title="${ETIC_PROP}` : ''
    return `<button type="button" class="voce ${classi}${tua}${prop}" data-k="nodo" data-id="${esc(n.id)}" style="--c:${colFam(n._fam)}">
      <span class="v-nome">${esc(n.nome)}${n.provvisorio ? '<span class="v-prov" title="esempio provvisorio">*</span>' : ''}${coro ? '<span class="v-tag" title="Fa parte del coro della domanda">coro</span>' : ''}</span>${destra}
      ${n.citazione?.testo ? `<span class="v-cit">«${esc(n.citazione.testo)}»</span>` : ''}${sotto}</button>`
  }
  function testaFilone(f, { attivo = false, n = null } = {}) {
    return `<button type="button" class="filone${attivo ? ' attivo' : ''}" data-k="filone" data-id="${esc(f.id)}">
      <span class="f-riga"><span class="f-nome">${esc(f.nome)}</span>${n != null ? `<span class="f-n">${n}</span>` : f.periodo ? `<span class="f-periodo">${esc(f.periodo)}</span>` : ''}</span>
      ${f.motto ? `<span class="f-motto">«${esc(f.motto)}»</span>` : ''}</button>`
  }
  function coroVoce(n, q) {
    const testo = n.citazione?.testo ? `«${n.citazione.testo}»` : n.descrizione || ''
    const prop = propCoro(n, q) ? ` proposta" title="${ETIC_PROP}` : ''
    return `<li><button type="button" class="coro-voce${prop}" data-k="nodo" data-id="${esc(n.id)}" data-q="${esc(q)}" style="--c:${colFam(n._fam)}">
      <span class="cv-testo">${esc(testo)}</span><span class="cv-chi"><i></i><b>${esc(breveFam(n._fam))}</b><span>${esc(n.nome)}</span></span></button></li>`
  }
  function chipNodo(n, extra = '', prop = false) {
    const p = prop || n._prop ? ` proposta" title="${ETIC_PROP}` : ''
    return `<button type="button" class="chip${n._fam === 'tue' ? ' tua' : ''}${p}" data-k="nodo" data-id="${esc(n.id)}" style="--c:${colFam(n._fam)}">${esc(n.nome)}${extra}</button>`
  }
  function chipDomanda(q, extra = '', prop = false) {
    return `<button type="button" class="chip q${prop ? ` proposta" title="${ETIC_PROP}` : ''}" data-k="domanda" data-id="${esc(q.id)}">${esc(q.nome)}${extra}</button>`
  }

  const mostraHome = () => S.modo === 'domanda' && !S.domanda && !isPerno(S.fuoco)

  function renderHome() {
    $('#atl-home').innerHTML = D.domande.map((q) => {
      const risp = D.perQ.get(q.id)
      const nd = new Set(risp.filter((n) => isDisc(n._fam)).map((n) => n._fam)).size
      const tue = risp.filter((n) => n._fam === 'tue')
      return `<article class="q-carta">
        <button type="button" class="q-apri" data-k="domanda" data-id="${esc(q.id)}"><h2>${esc(q.nome)}</h2>${q.sottotitolo ? `<span class="q-sotto">${esc(q.sottotitolo)}</span>` : ''}<span class="q-meta">${risp.length} risposte da ${nd} ${nd === 1 ? 'disciplina' : 'discipline'}</span></button>
        ${q.coro.length ? `<ol class="q-coro" aria-label="Il coro">${q.coro.map((id) => coroVoce(nodo(id), q.id)).join('')}</ol>` : ''}
        ${tue.length ? `<p class="q-tue"><span>✦ Le tue</span>${tue.map((n) => chipNodo(n, '', propQ(n, q.id))).join('')}</p>` : ''}
      </article>`
    }).join('') || '<p class="col-vuota">Nei dati non ci sono domande.</p>'
  }

  function renderBanner(home) {
    const el = $('#atl-banner'), q = S.domanda && domanda(S.domanda)
    if (home || !q) { el.hidden = true; el.innerHTML = ''; return }
    el.hidden = false
    const compatto = !LARGO.matches && isPerno(S.fuoco)
    el.innerHTML = `<div class="q-banner${compatto ? ' compatto' : ''}">
      <div class="q-b-testa">
        <button type="button" class="q-torna" data-torna>${S.modo === 'domanda' ? '‹ Domande' : '× Togli'}</button>
        <button type="button" class="q-nome" data-k="domanda" data-id="${esc(q.id)}" data-scheda><h2>${esc(q.nome)}</h2>${q.sottotitolo ? `<span>${esc(q.sottotitolo)}</span>` : ''}</button>
      </div>
      ${q.coro.length ? `<ol class="q-coro-riga" aria-label="Il coro" style="list-style:none;margin:0;padding:0 0 4px">${q.coro.map((id) => coroVoce(nodo(id), q.id).replace('<li>', '<li style="display:contents">')).join('')}</ol>` : ''}
    </div>`
  }

  function consiglioTavole(home) {
    let t
    if (home) t = 'Scegli una domanda: si aprono le colonne delle discipline che rispondono. Le citazioni sono il coro, la risposta a colpo d\'occhio.'
    else if (S.modo === 'disciplina' && !S.domanda) t = 'La colonna Domande dice a cosa risponde questa disciplina: toccane una e tutte le colonne si restringono a lei.'
    else if (S.domanda) t = 'Ogni colonna è un mondo che risponde. Tocca un nome per farci perno: in cima sale ciò che vi è collegato.'
    else t = 'Tocca un filone o un nome per fissarlo: le altre colonne tengono solo ciò che vi è collegato.'
    $('#atl-tav-consiglio').textContent = t
  }

  function gruppiColonna(fam, voci, { attivoId = null, filAttivo = null, coll = null, Fid = null, coroSet = null, ordina = null } = {}) {
    let h = ''
    const ammessi = new Set(voci.map((n) => n.id))
    const gruppi = D.perFam.get(fam).map((f) => ({ f, voci: D.membri.get(f.id).filter((n) => ammessi.has(n.id)) })).filter((g) => g.voci.length)
    if (ordina) gruppi.sort((a, b) => ordina(b) - ordina(a))
    const soloUno = gruppi.length === 1 && gruppi[0].f.unico
    for (const g of gruppi) {
      const fAttivo = filAttivo === g.f.id
      if (!soloUno && !g.f.unico) h += testaFilone(g.f, { attivo: fAttivo, n: coll ? g.voci.filter((n) => coll.has(n.id)).length || null : null })
      const vv = coll ? [...g.voci].sort((a, b) => (coll.get(b.id)?.length || 0) - (coll.get(a.id)?.length || 0) || b._g - a._g) : g.voci
      for (const n of vv) {
        const cl = []
        if (attivoId === n.id) cl.push('attivo')
        else if (fAttivo || Fid?.has(n.id)) cl.push('in-fuoco')
        else if (coll?.has(n.id)) cl.push('collegato')
        h += voce(n, { classi: cl.join(' '), coro: !!coroSet?.has(n.id), via: coll && !attivoId && coll.has(n.id) ? coll.get(n.id) : null })
      }
    }
    return h
  }

  function colonnaDomande(base) {
    const ids = new Set(base.map((n) => n.id))
    const voci = D.domande.map((q) => {
      const risp = base.filter((n) => n._q.has(q.id))
      const cit = risp.find((n) => n.citazione?.testo)
      return { q, n: risp.length, cit }
    })
    const corpo = voci.map(({ q, n, cit }) => `<button type="button" class="q-voce${S.domanda === q.id ? ' attivo' : ''}${n ? '' : ' zero'}" data-qfiltro="${esc(q.id)}" aria-pressed="${S.domanda === q.id}">
      <span class="qv-nome">${esc(q.nome)}</span><span class="qv-n">${n}</span>
      ${cit ? `<span class="qv-cit">«${esc(cit.citazione.testo)}» · ${esc(cit.nome)}</span>` : q.sottotitolo ? `<span class="qv-cit">${esc(q.sottotitolo)}</span>` : ''}</button>`).join('')
    return { corpo, conta: `a cosa rispondono ${ids.size === 1 ? 'questa voce' : `queste ${ids.size} voci`}` }
  }

  function renderTavole(opz = {}) {
    // barra: parti da domanda / disciplina
    for (const b of root.querySelectorAll('.modo button')) b.setAttribute('aria-pressed', String(b.dataset.modo === S.modo))
    const sel = $('#atl-partenza')
    if (sel.dataset.modo !== S.modo) {
      sel.dataset.modo = S.modo
      sel.innerHTML = S.modo === 'domanda'
        ? '<option value="">Tutte le domande</option>' + D.domande.map((q) => `<option value="${esc(q.id)}">${esc(q.nome)}</option>`).join('')
        : D.fams.map((d) => `<option value="${esc(d.id)}">${esc(d.nome)}</option>`).join('')
    }
    sel.value = S.modo === 'domanda' ? (S.domanda || '') : S.partenza
    const home = mostraHome()
    consiglioTavole(home)
    renderBanner(home)
    $('#atl-home').hidden = !home; $('#atl-colonne').hidden = home; $('#atl-schede').hidden = home
    if (home) { renderHome(); return }

    const Q = S.domanda, coroSet = Q ? new Set(domanda(Q).coro) : null
    const perno = isPerno(S.fuoco)
    const F = perno ? membriDi(S.fuoco) : null
    const Fid = F ? new Set(F.map((n) => n.id)) : null
    const primo = perno ? famDi(S.fuoco) : S.modo === 'disciplina' ? S.partenza : null
    const passa = (n) => !Q || n._q.has(Q)
    const info = new Map()
    for (const d of D.fams) {
      const tutti = D.nodiFam.get(d.id)
      const vis = tutti.filter((n) => passa(n) || Fid?.has(n.id))
      let coll = null
      if (F) {
        coll = new Map()
        for (const n of tutti) {
          if (Fid.has(n.id)) continue
          const via = F.filter((m) => D.adj.get(m.id).has(n.id))
          if (via.length) coll.set(n.id, via)
        }
      }
      const peso = F ? (Q ? vis.filter((n) => coll.has(n.id)).length : coll.size) : vis.length
      info.set(d.id, { tutti, vis, coll, peso })
    }
    let ordine = D.fams.map((d) => d.id).filter((d) => d !== primo)
    const rango = (d) => d === 'tue' ? 0 : isDisc(d) ? 1 : d === 'emozioni' ? 2 : 3
    ordine.sort((a, b) => (rango(a) === 0 ? -1 : rango(b) === 0 ? 1 : 0) || (F || Q ? info.get(b).peso - info.get(a).peso : 0) || rango(a) - rango(b))
    // le colonne vuote spariscono (restano nelle schede, spente)
    const visibile = (d) => Q ? info.get(d).vis.length > 0 || (F && info.get(d).coll.size > 0) : !F || info.get(d).coll.size > 0 || S.tutti.has(d)
    const colonne = [...(primo ? [primo] : []), ...(S.modo === 'disciplina' ? ['domande'] : []), ...ordine.filter(visibile)]
    const spente = ordine.filter((d) => !visibile(d))

    $('#atl-schede').innerHTML = [...colonne, ...spente].map((d, i) => {
      if (d === 'domande') return `<button type="button" class="scheda" data-colonna="domande" style="--c:var(--oro)"><i></i>Domande</button>`
      const it = info.get(d)
      const n = d === primo ? (Q ? it.vis.length : it.tutti.length) : F ? (Q ? it.peso : it.coll.size) : it.vis.length
      return `<button type="button" class="scheda${i === 0 && primo ? ' prima' : ''}${d === 'tue' ? ' tue' : ''}${spente.includes(d) || !n ? ' zero' : ''}" data-colonna="${esc(d)}" style="--c:${colFam(d)}"><i></i>${esc(nomeFam(d))} <b>${n}</b></button>`
    }).join('')

    const box = $('#atl-colonne')
    const scroll = new Map([...box.querySelectorAll('.colonna')].map((c) => [c.dataset.fam, c.querySelector('.col-corpo').scrollTop]))
    const sinistra = box.scrollLeft
    const attivoId = S.fuoco?.k === 'nodo' ? S.fuoco.id : null
    const filAttivo = S.fuoco?.k === 'filone' ? S.fuoco.id : null
    box.innerHTML = colonne.map((d) => {
      let corpo = '', conta = '', ruolo = ''
      if (d === 'domande') {
        const r = colonnaDomande(F || D.nodiFam.get(primo) || [])
        corpo = r.corpo; conta = r.conta; ruolo = S.domanda ? 'tocca di nuovo per togliere il filtro' : 'tocca per filtrare'
      } else {
        const { tutti, vis, coll } = info.get(d)
        if (d === primo || !F) {
          ruolo = d === primo ? (perno ? 'fissata' : 'punto di partenza') : ''
          conta = Q ? `${vis.filter(passa).length} di ${tutti.length} rispondono` : `${tutti.length} voci`
          corpo = gruppiColonna(d, vis, { attivoId, filAttivo, coll: d === primo ? null : coll, coroSet, Fid: d === primo ? null : Fid })
          if (d === primo && F && !Q) corpo = gruppiColonna(d, vis, { attivoId, filAttivo, coroSet })
        } else {
          // colonna di un'altra famiglia, con un perno fissato
          const base = Q ? vis : tutti.filter((n) => coll.has(n.id))
          const nc = base.filter((n) => coll.has(n.id)).length
          conta = Q ? `${vis.length} rispondono · ${nc} collegati` : `${coll.size} di ${tutti.length} collegati`
          if (!base.length) corpo = `<p class="col-vuota">Nessun legame diretto con ${esc(etichetta(S.fuoco))}.</p>`
          else corpo = gruppiColonna(d, base, { coll, coroSet, ordina: (g) => g.voci.filter((n) => coll.has(n.id)).length })
        }
        const mostrati = new Set()
        corpo.replace(/data-k="nodo" data-id="([^"]+)"/g, (_, id) => mostrati.add(id))
        const resto = tutti.filter((n) => !mostrati.has(n.id))
        if (resto.length && (Q || F)) {
          if (S.tutti.has(d)) {
            for (const n of resto) corpo += voce(n, { classi: 'spento' })
            corpo += `<button type="button" class="altri" data-altri="${esc(d)}">Nascondi gli altri</button>`
          } else corpo += `<button type="button" class="altri" data-altri="${esc(d)}">Mostra anche gli altri (${resto.length})</button>`
        }
      }
      const titolo = d === 'tue' ? '✦ Le tue' : nomeFam(d)
      return `<section class="colonna${opz.pivot ? ' appena' : ''}" data-fam="${esc(d)}" style="--c:${colFam(d)}" aria-label="${esc(nomeFam(d))}">
        <header class="col-testa"><h2>${esc(titolo)}</h2><span class="conta">${conta}</span>${ruolo ? `<span class="ruolo">${ruolo}</span>` : ''}</header>
        <div class="col-corpo">${corpo}</div></section>`
    }).join('')

    for (const c of box.querySelectorAll('.colonna')) {
      const corpo = c.querySelector('.col-corpo')
      if (!opz.pivot && scroll.has(c.dataset.fam)) corpo.scrollTop = scroll.get(c.dataset.fam)
    }
    if (opz.pivot) {
      box.scrollTo({ left: 0, behavior: RIDOTTO ? 'auto' : 'smooth' })
      const prima = box.querySelector('.colonna .col-corpo')
      const att = prima?.querySelector('.attivo')
      if (att) prima.scrollTop = Math.max(0, att.offsetTop - 40)
    } else box.scrollLeft = sinistra
  }

  // ============================================================ Ruota (volvella)
  const R = { pronta: false, lato: 0, scala: 1, anelli: [], geo: new Map(), ang: new Map(), rad: new Map(), angQ: new Map(), rot: new Map(), anim: 0, trascina: null }
  const SVGNS = 'http://www.w3.org/2000/svg'
  const P = (r, a) => [r * Math.sin(a), -r * Math.cos(a)]
  const norm = (a) => ((a % TAU) + TAU) % TAU
  const avvolgi = (a) => { a = norm(a); return a > Math.PI ? a - TAU : a }
  const f2 = (x) => Math.round(x * 100) / 100
  const anelloDi = (n) => isDisc(n._fam) ? 'discipline' : n._fam
  const NOMI_ANELLO = { domande: 'Domande', discipline: 'Discipline', emozioni: 'Emozioni', segni: 'Simboli e concetti', tue: 'Le tue' }

  function settorePath(r0, r1, a0, a1) {
    const g = a1 - a0 > Math.PI ? 1 : 0
    const [x0, y0] = P(r1, a0), [x1, y1] = P(r1, a1), [x2, y2] = P(r0, a1), [x3, y3] = P(r0, a0)
    return `M${f2(x0)} ${f2(y0)}A${r1} ${r1} 0 ${g} 1 ${f2(x1)} ${f2(y1)}L${f2(x2)} ${f2(y2)}A${r0} ${r0} 0 ${g} 0 ${f2(x3)} ${f2(y3)}Z`
  }
  function arcoTesto(id, r, a0, a1, testo, classe, fs, extra = '') {
    // testo lungo l'arco; nella metà bassa il percorso va al contrario, così si legge dritto
    const basso = false, rr = r
    const [x0, y0] = P(rr, basso ? a1 : a0), [x1, y1] = P(rr, basso ? a0 : a1)
    return `<path id="atl-${id}" d="M${f2(x0)} ${f2(y0)}A${rr} ${rr} 0 ${a1 - a0 > Math.PI ? 1 : 0} ${basso ? 0 : 1} ${f2(x1)} ${f2(y1)}" fill="none"/>` +
      `<text class="${classe}" font-size="${f2(fs)}" ${extra}><textPath href="#atl-${id}" startOffset="50%" text-anchor="middle">${esc(testo)}</textPath></text>`
  }
  const stellaPath = (x, y, r) => { let d = ''; for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4, rr = i % 2 ? r * 0.38 : r; d += (i ? 'L' : 'M') + f2(x + rr * Math.sin(a)) + ' ' + f2(y - rr * Math.cos(a)) } return d + 'Z' }

  function costruisciRuota() {
    const box = $('#atl-ruota-box'), svg = $('#atl-ruota')
    const lato = box.clientWidth
    if (!lato) return
    if (R.pronta && Math.abs(lato - R.lato) < 2) { aggiornaRuota(); return }
    R.lato = lato; R.scala = lato / 1000
    const px = (v) => v / R.scala
    const piccolo = lato < 520
    const anelli = []
    if (D.domande.length) anelli.push({ id: 'domande', peso: 128 })
    const discs = D.fams.filter((f) => f.tipo === 'disciplina').map((f) => f.id)
    if (discs.length) anelli.push({ id: 'discipline', peso: 150, fams: discs })
    for (const [id, peso] of [['emozioni', 38], ['segni', 34], ['tue', 30]]) if (D.famById.has(id)) anelli.push({ id, peso, fams: [id] })
    const R0 = 62, RM = 466, GAP = 6
    const k = (RM - R0 - GAP * anelli.length) / anelli.reduce((s, a) => s + a.peso, 0)
    let r = R0
    for (const a of anelli) { a.rin = r + GAP; a.rout = a.rin + a.peso * k; r = a.rout }
    R.anelli = anelli.map((a) => a.id); R.R0 = R0; R.RM = RM
    let h = `<circle class="r-limbo" r="${RM + 8}"/><circle class="r-limbo" r="${RM + 26}" stroke-opacity=".6"/>`
    for (let i = 0; i < 72; i++) {
      const a = i * TAU / 72, l = i % 6 === 0 ? 16 : 7
      const [x0, y0] = P(RM + 8, a), [x1, y1] = P(RM + 8 + l, a)
      h += `<line class="r-tacca" x1="${f2(x0)}" y1="${f2(y0)}" x2="${f2(x1)}" y2="${f2(y1)}"/>`
    }
    h += '<g id="atl-r-anelli">'
    const fontArco = px(piccolo ? 9.5 : 11)
    anelli.forEach((A, i) => {
      const { rin, rout } = A, spess = rout - rin
      const settori = []
      h += `<g class="anello" data-anello="${A.id}"><circle class="fascia" r="${f2((rin + rout) / 2)}" stroke-width="${f2(spess)}"/><circle class="bordo" r="${f2(rout)}"/>`
      if (A.id === 'domande') {
        const n = D.domande.length, rq = rin + spess * 0.3
        R.rq = rq
        D.domande.forEach((q, j) => {
          const a0 = j * TAU / n, a1 = (j + 1) * TAU / n, c = (a0 + a1) / 2
          settori.push({ q: q.id, a0, a1, c })
          R.angQ.set(q.id, c)
          h += `<path class="q-settore" data-q="${esc(q.id)}" d="${settorePath(rin, rout, a0 + 0.004, a1 - 0.004)}"/>`
          const [x0, y0] = P(rin + 4, c), [x1, y1] = P(rq - px(7), c)
          h += `<line class="q-raggio" x1="${f2(x0)}" y1="${f2(y0)}" x2="${f2(x1)}" y2="${f2(y1)}"/>`
          const [sx, sy] = P(rq, c)
          h += `<path class="q-stella" d="${stellaPath(sx, sy, px(piccolo ? 5.5 : 6.5))}"/>`
          h += arcoTesto(`qa-${j}`, rout - px(piccolo ? 15 : 18), a0 + 0.02, a1 - 0.02, q.breve, 'r-q-testo', px(piccolo ? 11 : 14))
        })
        R.geo.set('domande', { rin, rout, rmid: (rin + rout) / 2, settori })
      } else {
        const famiglie = A.fams
        const gruppi = famiglie.flatMap((d) => D.perFam.get(d).map((f) => ({ f, d })))
        const tot = gruppi.reduce((s, g) => s + D.membri.get(g.f.id).length, 0)
        const pad = 0.7, padD = famiglie.length > 1 ? 1.6 : 0
        const slot = TAU / (tot + pad * gruppi.length + padD * famiglie.length)
        const disc = A.id === 'discipline'
        const bandaF = disc ? [rin, rin + spess * 0.2] : [rin, rout]
        const bandaD = disc ? [rout - spess * 0.15, rout] : null
        const righe = disc ? [rin + spess * 0.36, rin + spess * 0.6] : [rin + spess * (piccolo ? 0.66 : 0.62)]
        const rlab = disc ? bandaF[0] + (bandaF[1] - bandaF[0]) * 0.3 : rin + spess * (piccolo ? 0.1 : 0.16)
        let a = 0
        const archiD = []
        for (const d of famiglie) {
          const a0D = a
          a += padD * slot / 2
          for (const f of D.perFam.get(d)) {
            const membri = D.membri.get(f.id)
            const a0 = a, a1 = a + (membri.length + pad) * slot
            settori.push({ f: f.id, fam: d, a0, a1, c: (a0 + a1) / 2 })
            h += `<path class="settore" style="--c:${colFam(d)}" data-f="${esc(f.id)}" d="${settorePath(bandaF[0], disc ? bandaF[1] : bandaF[1], a0 + 0.004, a1 - 0.004)}"/>`
            const lungh = rlab * (a1 - a0) * R.scala
            if (!f.unico && lungh > f.nome.length * (piccolo ? 6 : 6.8) + 14 && (!disc || !piccolo)) {
              h += arcoTesto(`fa-${i}-${esc(f.id)}`, rlab, a0 + 0.02, a1 - 0.02, f.nome, 'r-arco', fontArco, `data-f="${esc(f.id)}"`)
            }
            membri.forEach((n, kk) => {
              const an = a0 + (pad / 2 + kk + 0.5) * slot
              const rr = righe[kk % righe.length]
              R.ang.set(n.id, an); R.rad.set(n.id, rr)
              const rp = Math.min(px(2.4 + 0.6 * Math.sqrt(n._g)), rr * slot * (righe.length > 1 ? 0.9 : 0.48), spess * 0.3)
              const [x, y] = P(rr, an)
              const raggio = Math.max(rp, px(1.6))
              if (n._fam === 'tue') h += `<path class="punto tua${n._prop ? ' proposta' : ''}" data-id="${esc(n.id)}" style="--c:${colFam(n._fam)}" d="${stellaPath(x, y, raggio * 1.9)}"/>`
              else h += `<circle class="punto${n._prop ? ' proposta' : ''}" data-id="${esc(n.id)}" style="--c:${colFam(n._fam)}" cx="${f2(x)}" cy="${f2(y)}" r="${f2(raggio)}"/>`
            })
            a = a1
          }
          a += padD * slot / 2
          archiD.push({ fam: d, a0: a0D, a1: a, c: (a0D + a) / 2 })
          if (bandaD) {
            h += `<path class="disc-arco" data-fam="${esc(d)}" style="--c:${colFam(d)}" d="${settorePath(bandaD[0], bandaD[1], a0D + 0.006, a - 0.006)}"/>`
            const fs = px(piccolo ? 8.5 : 10.5), nome = (rout * (a - a0D) * R.scala > nomeFam(d).length * fs * R.scala * 0.62 + 10) ? nomeFam(d) : breveFam(d)
            if (rout * (a - a0D) * R.scala > nome.length * fs * R.scala * 0.6) h += arcoTesto(`da-${esc(d)}`, bandaD[0] + (bandaD[1] - bandaD[0]) * 0.28, a0D + 0.01, a - 0.01, nome, 'r-arco disc', fs, `style="--c:${colFam(d)}"`)
          }
        }
        R.geo.set(A.id, { rin, rout, rmid: disc ? (righe[0] + righe[1]) / 2 : (rin + rout) / 2, settori, slot, archiD, bandaD, righe })
      }
      h += '</g>'
      if (!R.rot.has(A.id)) R.rot.set(A.id, 0)
    })
    h += '</g><g id="atl-r-fili"></g>'
    h += `<line class="r-indice" x1="0" y1="${-R0}" x2="0" y2="${-RM - 30}"/>`
    h += `<path class="r-freccia" d="M0 ${-RM - 6} l${f2(px(6))} ${f2(-px(10))} h${f2(-px(12))} Z"/>`
    h += '<g id="atl-r-mezzodi"></g>'
    h += `<circle class="r-mozzo" id="atl-r-mozzo" r="${R0 - 6}"/><circle class="r-limbo" r="${R0 - 14}" stroke-opacity=".5"/>`
    h += `<text class="r-mozzo-testo" text-anchor="middle" dy="${f2(px(5))}" font-size="${f2(px(piccolo ? 12 : 15))}">gira</text>`
    svg.innerHTML = h
    R.pronta = true
    const selA = $('#atl-anello')
    selA.innerHTML = R.anelli.map((d) => `<option value="${esc(d)}">${esc(NOMI_ANELLO[d] || d)}</option>`).join('')
    if (!R.anello || !R.anelli.includes(R.anello)) R.anello = R.anelli.includes('domande') ? 'domande' : R.anelli[0]
    for (const d of R.anelli) applicaRot(d)
    aggiornaRuota()
  }

  function applicaRot(d) {
    const g = $(`#atl-r-anelli .anello[data-anello="${CSS.escape(d)}"]`)
    if (g) g.setAttribute('transform', `rotate(${f2(R.rot.get(d) * 180 / Math.PI)})`)
  }
  function posRuota(id) {
    if (id.startsWith('q:')) { const q = id.slice(2); return P(R.rq, R.angQ.get(q) + R.rot.get('domande')) }
    const n = nodo(id)
    return P(R.rad.get(id), R.ang.get(id) + R.rot.get(anelloDi(n)))
  }

  /** Che cosa è acceso: punti in fuoco (F), punti accesi (lit), fili (coppie) e domande accese (Q). */
  function illuminati() {
    if (S.conv) {
      const { q, a, b } = S.conv
      return { F: new Set([a, b]), lit: new Set([a, b]), Q: new Set([q]), coppie: [{ a: 'q:' + q, b: a, stile: 'catena' }, { a: 'q:' + q, b, stile: 'catena' }] }
    }
    if (S.catena) {
      const lit = new Set(S.catena), coppie = []
      for (let i = 1; i < S.catena.length; i++) coppie.push({ a: S.catena[i - 1], b: S.catena[i], stile: 'catena' })
      return { F: new Set([S.catena[0], S.catena[S.catena.length - 1]]), lit, Q: new Set(), coppie }
    }
    const f = S.fuoco
    if (!f) return null
    if (f.k === 'domanda') {
      const ns = D.perQ.get(f.id) || [], coro = new Set(domanda(f.id).coro)
      return { F: new Set(), lit: new Set(ns.map((n) => n.id)), Q: new Set([f.id]), coppie: ns.map((n) => ({ a: 'q:' + f.id, b: n.id, stile: coro.has(n.id) ? 'coro' : 'domanda' })) }
    }
    if (f.k === 'fam') return { F: new Set(), lit: new Set(membriDi(f).map((n) => n.id)), Q: new Set(), coppie: [] }
    const M = membriDi(f), Fid = new Set(M.map((n) => n.id)), lit = new Set(Fid), coppie = [], visti = new Set(), Q = new Set()
    for (const m of M) for (const y of D.adj.get(m.id).keys()) {
      lit.add(y)
      const kk = m.id < y ? m.id + '|' + y : y + '|' + m.id
      if (!visti.has(kk)) { visti.add(kk); coppie.push({ a: m.id, b: y, stile: '' }) }
    }
    if (f.k === 'nodo') for (const q of nodo(f.id).domande) { Q.add(q); coppie.push({ a: 'q:' + q, b: f.id, stile: 'domanda' }) }
    return { F: Fid, lit, Q, coppie }
  }

  function disegnaFili() {
    if (!R.pronta) return
    const il = illuminati(), g = $('#atl-r-fili')
    if (!il) { g.innerHTML = ''; return }
    let h = ''
    for (const { a, b, stile } of il.coppie) {
      const [x1, y1] = posRuota(a), [x2, y2] = posRuota(b)
      const qa = a.startsWith('q:')
      const stesso = !qa && anelloDi(nodo(a)) === anelloDi(nodo(b))
      const kk = qa ? 0.75 : stesso ? 0.62 : 0.3
      const cx = (x1 + x2) / 2 * kk, cy = (y1 + y2) / 2 * kk
      const altro = qa ? nodo(b) : il.F.has(a) ? nodo(b) : nodo(a)
      h += `<path class="r-filo${stile ? ' ' + stile : ''}${(qa ? propQ(nodo(b), a.slice(2)) : propL(a, b)) ? ' proposto' : ''}" style="--c:${colFam(altro._fam)}" d="M${f2(x1)} ${f2(y1)}Q${f2(cx)} ${f2(cy)} ${f2(x2)} ${f2(y2)}"/>`
    }
    g.innerHTML = h
  }

  function aMezzogiorno(d) {
    const geo = R.geo.get(d), loc = norm(-R.rot.get(d))
    const s = geo.settori.find((s) => loc >= s.a0 && loc < s.a1) || geo.settori.reduce((m, s) => Math.abs(avvolgi(s.c - loc)) < Math.abs(avvolgi(m.c - loc)) ? s : m, geo.settori[0])
    if (d === 'domande') return { s, n: null }
    let best = null, bd = Infinity
    for (const n of D.membri.get(s.f)) { const dd = Math.abs(avvolgi(R.ang.get(n.id) - loc)); if (dd < bd) { bd = dd; best = n } }
    return { s, n: best }
  }

  function aggiornaMezzogiorno() {
    if (!R.pronta) return
    const piccolo = R.lato < 520
    const fs = (piccolo ? 10 : 12) / R.scala
    let h = ''
    const letture = []
    for (const d of R.anelli) {
      const geo = R.geo.get(d), { s, n } = aMezzogiorno(d)
      if (d === 'domande') { letture.push({ d, q: domanda(s.q) }); continue }
      const f = filone(s.f)
      const testo = f.unico ? `<tspan class="n">${esc(n?.nome || '')}</tspan>` : esc(f.nome)
      h += `<text class="r-mezzodi" x="${f2(8 / R.scala)}" y="${f2(-geo.rmid + fs * 0.36)}" font-size="${f2(fs)}" stroke-width="${f2(4 / R.scala)}">${testo}</text>`
      letture.push({ d, f, n })
      for (const t of root.querySelectorAll(`#atl-r-anelli .anello[data-anello="${CSS.escape(d)}"] .r-arco[data-f]`)) t.classList.toggle('nascosto', t.dataset.f === s.f)
    }
    $('#atl-r-mezzodi').innerHTML = h
    $('#atl-letture').innerHTML = letture.map(({ d, q, f, n }) => {
      if (q) return `<button type="button" class="lettura q${S.domanda === q.id ? ' attiva' : ''}" data-k="domanda" data-id="${esc(q.id)}" style="--c:var(--oro)"><i></i><span class="l-dim">Domanda</span><span class="l-fil">${esc(q.nome)}</span></button>`
      const nomeA = d === 'discipline' ? nomeFam(f.fam) : NOMI_ANELLO[d] || d
      if (f.unico && n) {
        const attN = S.fuoco?.k === 'nodo' && S.fuoco.id === n.id
        return `<button type="button" class="lettura${attN ? ' attiva' : ''}" data-k="nodo" data-id="${esc(n.id)}" style="--c:${colFam(f.fam)}"><i></i><span class="l-dim">${esc(nomeA)}</span><span class="l-fil">${esc(n.nome)}</span></button>`
      }
      const att = S.fuoco && ((S.fuoco.k === 'filone' && S.fuoco.id === f.id) || (S.fuoco.k === 'nodo' && nodo(S.fuoco.id)?._f === f.id))
      return `<button type="button" class="lettura${att ? ' attiva' : ''}" data-k="filone" data-id="${esc(f.id)}" style="--c:${colFam(f.fam)}"><i></i><span class="l-dim">${esc(nomeA)}</span><span class="l-fil">${esc(f.nome)}${n ? `<small>${esc(n.nome)}</small>` : ''}</span></button>`
    }).join('')
  }

  function aggiornaRuota() {
    if (!R.pronta) return
    const il = illuminati()
    const fisso = S.fuoco?.k === 'filone' ? S.fuoco.id : null
    for (const c of root.querySelectorAll('#atl-r-anelli .punto')) {
      const id = c.dataset.id
      c.classList.toggle('fuoco', !!il && il.F.has(id))
      c.classList.toggle('acceso', !!il && il.lit.has(id) && !il.F.has(id))
      c.classList.toggle('spento', !!il && !il.lit.has(id))
    }
    for (const p of root.querySelectorAll('#atl-r-anelli .settore')) {
      const acceso = !!il && D.membri.get(p.dataset.f).some((n) => il.lit.has(n.id))
      p.classList.toggle('fisso', p.dataset.f === fisso)
      p.classList.toggle('acceso', acceso && p.dataset.f !== fisso)
      p.classList.toggle('spento', !!il && !acceso && p.dataset.f !== fisso)
    }
    for (const p of root.querySelectorAll('#atl-r-anelli .q-settore')) {
      p.classList.toggle('fisso', S.fuoco?.k === 'domanda' && S.fuoco.id === p.dataset.q || (!!S.conv && S.conv.q === p.dataset.q))
      p.classList.toggle('acceso', !!il && il.Q.has(p.dataset.q))
    }
    for (const p of root.querySelectorAll('#atl-r-anelli .disc-arco')) p.classList.toggle('fisso', S.fuoco?.k === 'fam' && S.fuoco.id === p.dataset.fam)
    for (const g of root.querySelectorAll('#atl-r-anelli .anello')) g.classList.toggle('attivo', g.dataset.anello === R.anello)
    $('#atl-anello').value = R.anello
    disegnaFili(); aggiornaMezzogiorno()
  }

  let rafRuota = 0
  function ridisegnaRuota() { if (rafRuota) return; rafRuota = requestAnimationFrame(() => { rafRuota = 0; disegnaFili(); aggiornaMezzogiorno() }) }

  const easeInOut = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
  const easeOut = (t) => 1 - Math.pow(1 - t, 3)
  function animaRuote(target, durata = 650, giri = null, ease = easeInOut, fine) {
    cancelAnimationFrame(R.anim)
    const da = new Map(), delta = new Map()
    for (const [d, a] of target) {
      da.set(d, R.rot.get(d))
      let dd = avvolgi(a - R.rot.get(d))
      if (giri) dd += (giri.get(d) || 0) * TAU
      delta.set(d, dd)
    }
    if (RIDOTTO) durata = 0
    const t0 = performance.now()
    const passo = (t) => {
      const p = durata ? Math.min(1, (t - t0) / durata) : 1, e = ease(p)
      for (const [d] of target) { R.rot.set(d, da.get(d) + delta.get(d) * e); applicaRot(d) }
      disegnaFili(); aggiornaMezzogiorno()
      if (p < 1) R.anim = requestAnimationFrame(passo)
      else { for (const [d] of target) R.rot.set(d, avvolgi(R.rot.get(d))); fine?.() }
    }
    R.anim = requestAnimationFrame(passo)
  }

  function portaAMezzogiorno(f, subito = false) {
    if (!R.pronta) return
    let d, a
    if (f.k === 'domanda') { d = 'domande'; a = R.angQ.get(f.id) }
    else if (f.k === 'nodo') { const n = nodo(f.id); d = anelloDi(n); a = R.ang.get(f.id) }
    else if (f.k === 'filone') { const fl = filone(f.id); d = isDisc(fl.fam) ? 'discipline' : fl.fam; a = R.geo.get(d)?.settori.find((s) => s.f === f.id)?.c }
    else if (f.k === 'fam') { d = isDisc(f.id) ? 'discipline' : f.id; const g = R.geo.get(d); a = g?.archiD?.find((x) => x.fam === f.id)?.c ?? 0 }
    if (!R.geo.has(d) || a == null) return
    R.anello = d
    aggiornaRuota()
    animaRuote(new Map([[d, -a]]), subito ? 0 : 650)
  }

  function scattoAnello(dir) {
    if (!R.pronta) return
    const d = R.anello, geo = R.geo.get(d)
    const { s } = aMezzogiorno(d)
    const i = geo.settori.indexOf(s)
    const prossimo = geo.settori[(i + dir + geo.settori.length) % geo.settori.length]
    const centrato = Math.abs(avvolgi(-R.rot.get(d) - s.c)) < 0.01
    animaRuote(new Map([[d, -(centrato ? prossimo.c : s.c)]]), 480)
  }

  /** Convergenza: una domanda, due discipline lontane, due citazioni che le rispondono. */
  function convergenza() {
    const tra = new Map(), chiave = (a, b) => a < b ? a + '|' + b : b + '|' + a
    for (const n of D.nodi) for (const y of D.adj.get(n.id).keys()) { const m = nodo(y); if (n._fam !== m._fam) tra.set(chiave(n._fam, m._fam), (tra.get(chiave(n._fam, m._fam)) || 0) + 1) }
    const cand = []
    for (const q of D.domande) {
      const per = new Map()
      for (const n of D.perQ.get(q.id)) if (isDisc(n._fam)) { if (!per.has(n._fam)) per.set(n._fam, []); per.get(n._fam).push(n) }
      const fs = [...per.keys()]
      for (let i = 0; i < fs.length; i++) for (let j = i + 1; j < fs.length; j++) {
        const cit = per.get(fs[i]).some((n) => n.citazione?.testo) && per.get(fs[j]).some((n) => n.citazione?.testo)
        const w = (cit ? 3 : 1) / Math.pow(1 + (tra.get(chiave(fs[i], fs[j])) || 0), 0.7)
        cand.push({ q, A: fs[i], B: fs[j], w, per, cit })
      }
    }
    if (!cand.length) return null
    // meglio due vere citazioni, quando la domanda le ha
    const conCit = cand.filter((c) => c.cit)
    if (conCit.length) cand.splice(0, cand.length, ...conCit)
    let r = Math.random() * cand.reduce((s, c) => s + c.w, 0), c = cand[0]
    for (const x of cand) { r -= x.w; if (r <= 0) { c = x; break } }
    const coro = new Set(c.q.coro)
    const scegli = (fam) => {
      const tutti = c.per.get(fam), cc = tutti.filter((n) => n.citazione?.testo)
      const ns = (cc.length ? cc : tutti).map((n) => ({ n, s: (coro.has(n.id) ? 3 : 0) + (n.citazione?.testo ? 2 : 0) + Math.random() * 1.5 })).sort((a, b) => b.s - a.s)
      return caso(ns.slice(0, 3)).n
    }
    const a = scegli(c.A), b = scegli(c.B)
    return Math.random() < 0.5 ? { q: c.q.id, a: a.id, b: b.id } : { q: c.q.id, a: b.id, b: a.id }
  }

  function giraLeRuote() {
    if (!R.pronta) return
    const cv = convergenza()
    if (!cv) { avviso('Servono almeno due discipline che rispondono alla stessa domanda.'); return }
    const target = new Map(), giri = new Map()
    R.anelli.forEach((d, i) => { target.set(d, Math.random() * TAU); giri.set(d, (1 + (i % 2)) * (i % 2 ? -1 : 1)) })
    target.set('domande', -R.angQ.get(cv.q))
    target.set('discipline', -R.ang.get(cv.a))
    S.conv = null; S.catena = null; aggiornaRuota()
    $('#atl-bisoc').hidden = true
    animaRuote(target, 1700, giri, easeOut, () => {
      S.conv = cv
      S.domanda = cv.q; S.fuoco = { k: 'domanda', id: cv.q }
      aggiungiFilo({ k: 'domanda', id: cv.q })
      renderFilo(); renderDettaglio(); aggiornaRuota()
      mostraConvergenza($('#atl-bisoc'), cv)
    })
  }

  function citBlocco(n) {
    const fl = filone(n._f)
    const mondo = fl && !fl.unico && !fl.sintetico ? `${nomeFam(n._fam)} · ${fl.nome}` : nomeFam(n._fam)
    const testo = n.citazione?.testo ? `«${n.citazione.testo}»` : n.descrizione || ''
    return `<blockquote class="conv-cit" style="--c:${colFam(n._fam)}"><p>${esc(testo)}</p>
      <footer><button type="button" data-k="nodo" data-id="${esc(n.id)}" data-tieni>${esc(n.nome)}</button><span>${esc(mondo)}</span>${n.citazione?.verificata === false ? '<span class="dv">da verificare</span>' : ''}</footer></blockquote>`
  }
  function mostraConvergenza(el, { q, a, b }) {
    const Q = domanda(q)
    el.innerHTML = `<button type="button" class="chiudi-carta" data-chiudi aria-label="Chiudi">×</button>
      <p class="occhiello" style="margin-top:-38px">Convergenza</p>
      <p class="conv-q"><button type="button" data-k="domanda" data-id="${esc(q)}" data-tieni>${esc(Q.nome)}</button></p>
      <div class="conv-due">${citBlocco(nodo(a))}<p class="conv-e">e, da un altro mondo,</p>${citBlocco(nodo(b))}</div>
      <p class="domanda">Due discipline lontane, la stessa domanda. A pancia, che cosa le lega?</p>`
    el.hidden = false
  }

  function mostraCatena(el, titolo, { a, b, catena }, testo) {
    const A = nodo(a), B = nodo(b)
    const mondo = (n) => esc(nomeFam(n._fam))
    el.innerHTML = `<button type="button" class="chiudi-carta" data-chiudi aria-label="Chiudi">×</button>
      <p class="occhiello" style="margin-top:-38px">${esc(titolo)}</p>
      <p class="coppia"><button type="button" data-k="nodo" data-id="${esc(a)}" data-tieni>${esc(A.nome)}</button><span>↔</span><button type="button" data-k="nodo" data-id="${esc(b)}" data-tieni>${esc(B.nome)}</button></p>
      <p class="mondi">${mondo(A)} ↔ ${mondo(B)} · ${catena.length - 1} passi</p>
      <p class="mondi">${catena.map((id) => esc(nodo(id).nome)).join(' → ')}</p>
      ${testo ? `<p class="domanda">${esc(testo)}</p>` : ''}`
    el.hidden = false
  }

  function puntoSvg(e) {
    const svg = $('#atl-ruota'), m = svg.getScreenCTM()
    if (!m) return { x: 0, y: 0 }
    const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(m.inverse())
    return { x: p.x, y: p.y }
  }
  function anelloA(rho) { return R.anelli.find((d) => { const g = R.geo.get(d); return rho >= g.rin - 3 && rho <= g.rout + 3 }) }
  function eventiRuota() {
    const svg = $('#atl-ruota')
    su(svg, 'pointerdown', (e) => {
      if (!R.pronta) return
      const p = puntoSvg(e), rho = Math.hypot(p.x, p.y), a = Math.atan2(p.x, -p.y)
      R.trascina = { id: e.pointerId, d: anelloA(rho), mozzo: rho < R.R0 - 2, ultimo: a, x: e.clientX, y: e.clientY, mosso: false }
      cancelAnimationFrame(R.anim)
      try { svg.setPointerCapture(e.pointerId) } catch {}
    })
    su(svg, 'pointermove', (e) => {
      const t = R.trascina
      if (!t || t.id !== e.pointerId) return
      if (!t.mosso && Math.hypot(e.clientX - t.x, e.clientY - t.y) > 6 && t.d) t.mosso = true
      if (!t.mosso) return
      const p = puntoSvg(e), a = Math.atan2(p.x, -p.y)
      R.rot.set(t.d, R.rot.get(t.d) + avvolgi(a - t.ultimo)); t.ultimo = a
      applicaRot(t.d); ridisegnaRuota()
      e.preventDefault()
    })
    const fine = (e) => {
      const t = R.trascina
      if (!t || t.id !== e.pointerId) return
      R.trascina = null
      if (t.mosso) { R.anello = t.d; aggiornaRuota(); return }
      if (e.type === 'pointercancel') return
      if (t.mozzo) { giraLeRuote(); return }
      if (!t.d) return
      const p = puntoSvg(e), rho = Math.hypot(p.x, p.y), a = Math.atan2(p.x, -p.y)
      const geo = R.geo.get(t.d), loc = norm(a - R.rot.get(t.d))
      R.anello = t.d
      if (t.d === 'domande') { const s = geo.settori.find((s) => loc >= s.a0 && loc < s.a1); if (s) vaiA('domanda', s.q); return }
      if (geo.bandaD && rho >= geo.bandaD[0] - 2) { const x = geo.archiD.find((x) => loc >= x.a0 && loc < x.a1); if (x) { vaiA('fam', x.fam, { pannello: LARGO.matches }); return } }
      // il punto più vicino, misurato sullo schermo
      let best = null, bd = Infinity
      for (const n of D.nodi) {
        if (anelloDi(n) !== t.d) continue
        const [x, y] = posRuota(n.id), dd = Math.hypot(x - p.x, y - p.y) * R.scala
        if (dd < bd) { bd = dd; best = n }
      }
      const s = geo.settori.find((s) => loc >= s.a0 && loc < s.a1)
      if (best && (bd < 14 || (s && filone(s.f).unico))) vaiA('nodo', best.id)
      else if (s) vaiA('filone', s.f)
    }
    su(svg, 'pointerup', fine)
    su(svg, 'pointercancel', fine)
    su($('#atl-ruota-sx'), 'click', () => scattoAnello(-1))
    su($('#atl-ruota-dx'), 'click', () => scattoAnello(1))
    su($('#atl-anello'), 'change', (e) => { R.anello = e.target.value; aggiornaRuota() })
    su($('#atl-gira'), 'click', giraLeRuote)
    const or = new ResizeObserver(() => { clearTimeout(tR); tR = setTimeout(() => { if (S.vista === 'ruota') costruisciRuota() }, 120) })
    or.observe($('#atl-ruota-box')); osservatori.push(or)
  }

  // ============================================================ Firmamento
  const C = { pronto: false, w: 0, h: 0, dpr: 1, T: null, fitK: 1, regioni: [], ammassi: [], polvere: [], Rmondo: 1, attive: new Set(), qAttive: new Set(), col: {}, mst: new Map(), mstQ: new Map() }
  const LIVELLI = [['Regioni', 1], ['Filoni', 2.2], ['Nomi', 4.2], ['Frasi', 8]]
  const TRATTI = [[], [7, 4], [2, 4], [12, 4, 2, 4], [4, 3], [1, 3], [9, 3, 3, 3], [5, 6]]

  function rng(seme) { let s = seme >>> 0; return () => { s += 0x6D2B79F5; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296 } }
  function hash(s) { let h = 2166136261; for (const c of s) h = Math.imul(h ^ c.charCodeAt(0), 16777619); return h >>> 0 }
  function alberoMinimo(ns) {
    if (ns.length < 2) return []
    const dentro = new Set([ns[0].id]), lati = []
    const best = new Map(ns.slice(1).map((n) => [n.id, { d: Math.hypot(n._x - ns[0]._x, n._y - ns[0]._y), da: ns[0] }]))
    const byId = new Map(ns.map((n) => [n.id, n]))
    while (best.size) {
      let mid = null, md = Infinity
      for (const [id, v] of best) if (v.d < md) { md = v.d; mid = id }
      const n = byId.get(mid), v = best.get(mid)
      best.delete(mid); dentro.add(mid); lati.push([v.da, n])
      for (const [id, w] of best) { const m = byId.get(id), d = Math.hypot(m._x - n._x, m._y - n._y); if (d < w.d) best.set(id, { d, da: n }) }
    }
    return lati
  }

  function layoutCielo() {
    const regioni = []
    for (const d of D.fams) {
      const amm = D.perFam.get(d.id).map((f) => { const n = D.membri.get(f.id).length; return { f: f.id, n, r: 13 * Math.sqrt(n) + 15 } })
      amm.sort((a, b) => b.r - a.r)
      const fase = (hash(d.id) % 628) / 100, posti = []
      for (const a of amm) {
        let t = 0, x = 0, y = 0
        while (true) {
          const rr = 4 * t, an = fase + t * 0.5
          x = rr * Math.cos(an); y = rr * Math.sin(an)
          if (posti.every((b) => Math.hypot(x - b.dx, y - b.dy) >= a.r + b.r + 12)) break
          t++
        }
        a.dx = x; a.dy = y; posti.push(a)
      }
      const tot = posti.reduce((s, a) => s + a.n, 0)
      const mx = posti.reduce((s, a) => s + a.dx * a.n, 0) / tot, my = posti.reduce((s, a) => s + a.dy * a.n, 0) / tot
      for (const a of posti) { a.dx -= mx; a.dy -= my }
      const raggio = Math.max(...amm.map((a) => Math.hypot(a.dx, a.dy) + a.r)) + 24
      regioni.push({ fam: d.id, r: raggio, amm })
    }
    // regioni leggibili: le grandi si stringono, le piccole si allargano un poco
    const giro0 = regioni.filter((g) => g.fam !== 'tue').map((g) => g.r).sort((a, b) => a - b)
    const med = giro0.length ? giro0[Math.floor(giro0.length / 2)] : 100
    for (const g of regioni) {
      const target = Math.max(med * 0.62, Math.min(med * 1.3, med * Math.sqrt(g.r / med)))
      const s = g.fam === 'tue' ? Math.min(1.2, Math.max(0.9, target / g.r)) : target / g.r
      for (const a of g.amm) { a.dx *= s; a.dy *= s; a.r *= s }
      g.r *= s
    }
    const centro = regioni.find((g) => g.fam === 'tue')
    const giro = regioni.filter((g) => g !== centro)
    const m = giro.length
    let Rr = 0
    for (let i = 0; i < m; i++) { const a = giro[i], b = giro[(i + 1) % m]; if (m > 1) Rr = Math.max(Rr, (a.r + b.r + 40) / (2 * Math.sin(Math.PI / m))) }
    const maxg = Math.max(0, ...giro.map((g) => g.r))
    if (centro) Rr = Math.max(Rr, centro.r + maxg + 50)
    if (centro) { centro.x = 0; centro.y = 0 }
    giro.forEach((g, i) => { const a = -Math.PI / 2 + i * TAU / m; g.x = m > 1 || centro ? Rr * Math.cos(a) : 0; g.y = m > 1 || centro ? Rr * Math.sin(a) : 0 })
    C.ammassi = []
    for (const g of regioni) for (const a of g.amm) {
      const x = g.x + a.dx, y = g.y + a.dy
      C.ammassi.push({ f: a.f, fam: g.fam, x, y, r: a.r })
      const membri = D.membri.get(a.f), fase = (hash(a.f) % 628) / 100, rand = rng(hash(a.f))
      membri.forEach((n, i) => {
        const rr = a.r * 0.86 * Math.sqrt((i + 0.5) / membri.length), an = fase + i * 2.39996
        n._x = x + rr * Math.cos(an) + (rand() - 0.5) * 4
        n._y = y + rr * Math.sin(an) + (rand() - 0.5) * 4
      })
    }
    C.regioni = regioni
    C.Rmondo = Math.max(...regioni.map((g) => Math.hypot(g.x, g.y) + g.r))
    const rand = rng(7)
    C.polvere = Array.from({ length: 900 }, () => { const r = C.Rmondo * 1.5 * Math.sqrt(rand()), a = rand() * TAU; return { x: r * Math.cos(a), y: r * Math.sin(a), m: rand() } })
    for (const c of D.costellazioni) C.mst.set(c.id, alberoMinimo(c.nodi.map(nodo)))
    for (const q of D.domande) C.mstQ.set(q.id, alberoMinimo(D.perQ.get(q.id)))
  }

  function leggiColori() {
    const cs = getComputedStyle(root), g = (v) => cs.getPropertyValue(v).trim()
    C.col = { bg: g('--notte'), bg2: g('--notte-2'), ink: g('--inchiostro'), fumo: g('--fumo'), oro: g('--oro'), rub: g('--rubrica'), tue: g('--d-tue'), prop: g('--proposta') }
    C.serif = g('--f-titolo') || 'Georgia, serif'
    C.dim = {}
    for (const d of D.fams) C.dim[d.id] = g('--d-' + d.id) || PALETTE[D.fams.indexOf(d) % PALETTE.length]
    const hex = C.col.bg.replace('#', '')
    const lum = hex.length >= 6 ? (parseInt(hex.slice(0, 2), 16) * 0.3 + parseInt(hex.slice(2, 4), 16) * 0.59 + parseInt(hex.slice(4, 6), 16) * 0.11) : 0
    C.scuro = lum < 128
  }

  function iniziaCielo() {
    if (C.pronto) { ridimensiona(); return }
    const box = $('#atl-cielo-box'), canvas = $('#atl-cielo')
    C.pronto = true
    C.ctx = canvas.getContext('2d')
    layoutCielo(); leggiColori()
    C.zoom = zoom().on('zoom', (e) => { C.T = e.transform; disegnaPresto() })
    C.sel = select(canvas).call(C.zoom)
    su(canvas, 'click', tocco)
    ridimensiona()
    const oc = new ResizeObserver(() => { if (S.vista === 'firmamento') ridimensiona() })
    oc.observe(box); osservatori.push(oc)
    const q0 = S.domanda || D.domande[0]?.id
    if (q0) C.qAttive.add(q0)
    $('#atl-costellazioni').innerHTML = (D.domande.length ? '<span>Domande</span>' + D.domande.map((q) => `<button type="button" class="cost q" data-qcost="${esc(q.id)}" aria-pressed="false" title="${esc(q.sottotitolo || '')}">${esc(q.nome)}</button>`).join('') : '')
      + (D.costellazioni.length ? '<span>Percorsi</span>' + D.costellazioni.map((c) => `<button type="button" class="cost perc${c.validata === false ? ' proposta' : ''}" data-cost="${esc(c.id)}" aria-pressed="false" title="${esc(c.descrizione || '')}">${esc(c.nome)}</button>`).join('') : '')
    aggiornaCost()
    $('#atl-livelli').innerHTML = LIVELLI.map(([nome], i) => `<button type="button" data-livello="${i}">${nome}</button>`).join('')
  }
  function aggiornaCost() {
    for (const b of root.querySelectorAll('[data-cost]')) b.setAttribute('aria-pressed', String(C.attive.has(b.dataset.cost)))
    for (const b of root.querySelectorAll('[data-qcost]')) b.setAttribute('aria-pressed', String(C.qAttive.has(b.dataset.qcost)))
  }

  function ridimensiona() {
    if (!C.pronto) return
    const box = $('#atl-cielo-box'), canvas = $('#atl-cielo')
    const w = box.clientWidth, h = box.clientHeight
    if (!w || !h) return
    if (w === C.w && h === C.h) return
    const primo = !C.w
    C.dpr = Math.min(2.5, window.devicePixelRatio || 1); C.w = w; C.h = h
    canvas.width = Math.round(w * C.dpr); canvas.height = Math.round(h * C.dpr)
    C.fitK = Math.min(w, h) / (2 * C.Rmondo) * 0.96
    C.zoom.scaleExtent([C.fitK * 0.6, C.fitK * 40]).extent([[0, 0], [w, h]])
    if (primo || !C.T) C.sel.call(C.zoom.transform, zoomIdentity.translate(w / 2, h / 2).scale(C.fitK))
    else disegnaPresto()
  }

  let rafCielo = 0
  function disegnaPresto() { if (!C.pronto || rafCielo) return; rafCielo = requestAnimationFrame(() => { rafCielo = 0; disegna() }) }
  const rampa = (x, a, b) => Math.max(0, Math.min(1, (x - a) / (b - a)))

  function stelleIlluminate() {
    if (S.catena) return { F: new Set([S.catena[S.catena.length - 1]]), lit: new Set(S.catena), Q: new Set(), coppie: S.catena.slice(1).map((y, i) => ({ a: S.catena[i], b: y, stile: 'catena' })) }
    const il = illuminati()
    if (!il) return null
    // nel cielo le domande sono già costellazioni: i fili verso il centro non servono
    return { ...il, coppie: il.coppie.filter((c) => !c.a.startsWith('q:')) }
  }

  function avvolgiTesto(ctx, testo, larg, max) {
    const parole = testo.split(' '), righe = []
    let riga = ''
    for (const p of parole) { const prova = riga ? riga + ' ' + p : p; if (ctx.measureText(prova).width > larg && riga) { righe.push(riga); riga = p } else riga = prova }
    if (riga) righe.push(riga)
    if (righe.length > max) { righe.length = max; righe[max - 1] += ' …' }
    return righe
  }

  function disegna() {
    if (!C.pronto || !C.T || !C.w) return
    const { ctx, w, h, T, col } = C
    const k = T.k, rel = k / C.fitK
    const sx = (x) => x * k + T.x, sy = (y) => y * k + T.y
    ctx.setTransform(C.dpr, 0, 0, C.dpr, 0, 0)
    ctx.fillStyle = col.bg; ctx.fillRect(0, 0, w, h)
    const cx = sx(0), cy = sy(0)
    if (C.scuro) {
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, C.Rmondo * k * 1.3)
      g.addColorStop(0, col.bg2); g.addColorStop(1, col.bg)
      ctx.fillStyle = g; ctx.fillRect(0, 0, w, h)
    }
    // graticola
    ctx.save(); ctx.strokeStyle = col.oro; ctx.lineWidth = 1
    ctx.globalAlpha = C.scuro ? 0.09 : 0.14
    for (let i = 1; i <= 4; i++) { ctx.beginPath(); ctx.arc(cx, cy, C.Rmondo * k * i * 0.38, 0, TAU); ctx.stroke() }
    for (let i = 0; i < 24; i++) {
      const a = i * TAU / 24
      ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * C.Rmondo * k * 0.12, cy + Math.sin(a) * C.Rmondo * k * 0.12)
      ctx.lineTo(cx + Math.cos(a) * C.Rmondo * k * 1.52, cy + Math.sin(a) * C.Rmondo * k * 1.52); ctx.stroke()
    }
    ctx.restore()
    ctx.fillStyle = col.ink
    for (const p of C.polvere) {
      const x = sx(p.x), y = sy(p.y)
      if (x < -2 || y < -2 || x > w + 2 || y > h + 2) continue
      ctx.globalAlpha = (C.scuro ? 0.18 : 0.22) + p.m * 0.25
      ctx.fillRect(x, y, p.m > 0.85 ? 1.4 : 0.8, p.m > 0.85 ? 1.4 : 0.8)
    }
    ctx.globalAlpha = 1
    const aReg = 1 - 0.82 * rampa(rel, 1.5, 2.8)
    for (const g of C.regioni) {
      const x = sx(g.x), y = sy(g.y), r = g.r * k
      if (x + r < 0 || x - r > w || y + r < 0 || y - r > h) continue
      ctx.save(); ctx.strokeStyle = g.fam === 'tue' ? col.tue : C.dim[g.fam]; ctx.globalAlpha = g.fam === 'tue' ? 0.4 : 0.22; ctx.setLineDash(g.fam === 'tue' ? [1, 4] : [2, 5])
      ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.stroke(); ctx.restore()
    }
    // costellazioni delle domande
    const qOrd = D.domande.filter((q) => C.qAttive.has(q.id))
    const etichetteQ = []
    qOrd.forEach((q) => {
      const idx = D.domande.indexOf(q)
      ctx.save(); ctx.strokeStyle = col.oro; ctx.globalAlpha = S.fuoco?.k === 'domanda' && S.fuoco.id === q.id ? 0.75 : 0.5; ctx.lineWidth = 1.1
      ctx.setLineDash(TRATTI[idx % TRATTI.length])
      for (const [a, b] of C.mstQ.get(q.id) || []) {
        const x1 = sx(a._x), y1 = sy(a._y), x2 = sx(b._x), y2 = sy(b._y), L = Math.hypot(x2 - x1, y2 - y1)
        if (L < 10) continue
        const ux = (x2 - x1) / L, uy = (y2 - y1) / L
        ctx.beginPath(); ctx.moveTo(x1 + ux * 5, y1 + uy * 5); ctx.lineTo(x2 - ux * 5, y2 - uy * 5); ctx.stroke()
      }
      ctx.restore()
      const coro = q.coro.map(nodo).filter(Boolean)
      for (const n of coro) { ctx.save(); ctx.strokeStyle = col.oro; ctx.globalAlpha = 0.8; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(sx(n._x), sy(n._y), 9, 0, TAU); ctx.stroke(); ctx.restore() }
      const capo = coro.length ? coro.reduce((m, n) => n._y < m._y ? n : m, coro[0]) : D.perQ.get(q.id)[0]
      if (capo) etichetteQ.push({ q, x: sx(capo._x), y: sy(capo._y) - 18 })
    })
    // percorsi dell'archivio
    for (const c of D.costellazioni) {
      if (!C.attive.has(c.id)) continue
      ctx.save(); ctx.strokeStyle = col.rub; ctx.globalAlpha = 0.6; ctx.lineWidth = 1.2; ctx.setLineDash([3, 3])
      for (const [a, b] of C.mst.get(c.id)) {
        const x1 = sx(a._x), y1 = sy(a._y), x2 = sx(b._x), y2 = sy(b._y), L = Math.hypot(x2 - x1, y2 - y1)
        if (L < 12) continue
        const ux = (x2 - x1) / L, uy = (y2 - y1) / L
        ctx.beginPath(); ctx.moveTo(x1 + ux * 6, y1 + uy * 6); ctx.lineTo(x2 - ux * 6, y2 - uy * 6); ctx.stroke()
      }
      ctx.restore()
    }
    const il = stelleIlluminate()
    if (il) {
      for (const { a, b, stile } of il.coppie) {
        const A = nodo(a), B = nodo(b)
        const cat = stile === 'catena', prop = propL(a, b)
        ctx.save(); ctx.strokeStyle = cat ? col.rub : prop ? col.prop : C.dim[(il.F.has(a) ? B : A)._fam]
        ctx.globalAlpha = cat ? 0.95 : prop ? 0.8 : 0.5; ctx.lineWidth = cat ? 2 : 1
        if (prop) ctx.setLineDash([4, 3])
        ctx.beginPath(); ctx.moveTo(sx(A._x), sy(A._y)); ctx.lineTo(sx(B._x), sy(B._y)); ctx.stroke(); ctx.restore()
      }
    }
    // stelle
    const zf = Math.min(2.6, Math.max(1, Math.pow(rel, 0.42)))
    const visibili = []
    for (const n of D.nodi) {
      const x = sx(n._x), y = sy(n._y)
      if (x < -40 || y < -40 || x > w + 40 || y > h + 40) continue
      const r = (1.25 + 0.78 * Math.sqrt(n._g)) * zf
      const spento = il && !il.lit.has(n.id)
      const c = C.dim[n._fam]
      const tua = n._fam === 'tue'
      ctx.globalAlpha = spento ? 0.3 : 1
      if (C.scuro && (n._g >= 3 || tua) && !spento) {
        const g = ctx.createRadialGradient(x, y, 0, x, y, r * 4.2)
        g.addColorStop(0, c); g.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.globalAlpha = tua ? 0.35 : 0.22; ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r * 4.2, 0, TAU); ctx.fill()
        ctx.globalAlpha = 1
      }
      if (tua) {
        // le tue: stelle a quattro punte, sempre ben visibili
        const R4 = Math.max(6, r * 2.4)
        ctx.fillStyle = c; ctx.beginPath()
        for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4, rr = i % 2 ? R4 * 0.3 : R4; ctx[i ? 'lineTo' : 'moveTo'](x + rr * Math.sin(a), y - rr * Math.cos(a)) }
        ctx.closePath(); ctx.fill()
        ctx.strokeStyle = c; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(x, y, R4 * 0.62, 0, TAU); ctx.stroke()
      } else {
        if (n._g >= 6) {
          ctx.strokeStyle = C.scuro ? c : col.ink; ctx.lineWidth = 0.8
          ctx.beginPath(); ctx.moveTo(x - r * 2.8, y); ctx.lineTo(x + r * 2.8, y); ctx.moveTo(x, y - r * 2.8); ctx.lineTo(x, y + r * 2.8); ctx.stroke()
        }
        ctx.fillStyle = C.scuro ? c : col.ink
        ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill()
        if (C.scuro) { ctx.fillStyle = '#fffaf0'; ctx.globalAlpha *= 0.85; ctx.beginPath(); ctx.arc(x, y, r * 0.42, 0, TAU); ctx.fill() }
        else { ctx.strokeStyle = c; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(x, y, r + 1.8, 0, TAU); ctx.stroke() }
      }
      ctx.globalAlpha = 1
      if (n._prop) {
        // proposta di Claude: un anello tratteggiato nel rosso della rubrica
        ctx.save(); ctx.strokeStyle = col.prop; ctx.lineWidth = 1.2; ctx.setLineDash([2.5, 2.5]); ctx.globalAlpha = spento ? 0.35 : 0.95
        ctx.beginPath(); ctx.arc(x, y, (tua ? Math.max(6, r * 2.4) : r) + 3.5, 0, TAU); ctx.stroke(); ctx.restore()
      }
      if (S.fuoco?.k === 'nodo' && S.fuoco.id === n.id) {
        ctx.strokeStyle = col.oro; ctx.lineWidth = 1.5
        ctx.beginPath(); ctx.arc(x, y, r + 7, 0, TAU); ctx.stroke()
        ctx.beginPath(); ctx.arc(x, y, r + 11, 0, TAU); ctx.globalAlpha = 0.4; ctx.stroke(); ctx.globalAlpha = 1
      }
      visibili.push({ n, x, y, r: tua ? Math.max(6, r * 2.4) : r, spento })
    }
    // etichette, con un registro degli spazi occupati
    const occ = []
    const urta = (b) => occ.some((o) => b.x < o.x + o.w && b.x + b.w > o.x && b.y < o.y + o.h && b.y + b.h > o.y)
    const dentro = (b) => b.x >= -4 && b.y >= -4 && b.x + b.w <= w + 4 && b.y + b.h <= h + 4
    const libero = (b) => dentro(b) && !urta(b)
    // le zone dei comandi sopra il cielo
    occ.push({ x: 0, y: 0, w: Math.min(w, 300), h: 56 }, { x: w - 130, y: h - 200, w: 130, h: 200 })
    ctx.textBaseline = 'alphabetic'
    // frasi: solo quella della stella più vicina al centro (e quella fissata), dentro un cartiglio
    const aFrasi = rampa(rel, 6.5, 8)
    const frasi = []
    const fuocoN = S.fuoco?.k === 'nodo' ? visibili.find((v) => v.n.id === S.fuoco.id) : null
    if (fuocoN && fuocoN.n.citazione?.testo && rel >= 3) frasi.push(fuocoN)
    if (aFrasi > 0) {
      // la più vicina al centro tra le stelle accese; se non ce n'è, tra tutte
      for (const accese of [true, false]) {
        let best = null, bd = Math.min(w, h) * 0.45
        for (const v of visibili) if (v.n.citazione?.testo && (!accese || !v.spento) && v !== fuocoN) { const d = Math.hypot(v.x - w / 2, v.y - h / 2); if (d < bd) { bd = d; best = v } }
        if (best) { frasi.push(best); break }
      }
    }
    let nFrasi = 0
    for (const v of frasi) {
      ctx.font = `italic 13px ${C.serif}`
      const larg = Math.min(230, w - 40)
      const righe = avvolgiTesto(ctx, `«${v.n.citazione.testo}»`, larg, 5)
      const bw = Math.max(...righe.map((t) => ctx.measureText(t).width)) + 18, bh = 22 + righe.length * 16 + 16
      // posti candidati intorno alla stella: il primo libero vince, altrimenti sopra la stella
      const cl = (x, y) => ({ x: Math.max(8, Math.min(w - bw - 8, x)), y: Math.max(60, Math.min(h - bh - 8, y)), w: bw, h: bh })
      const posti = [cl(v.x + v.r + 10, v.y + 12), cl(v.x - v.r - 10 - bw, v.y + 12), cl(v.x - bw / 2, v.y + 16),
        cl(v.x - bw / 2, v.y - 16 - bh), cl(v.x + v.r + 10, v.y - 14 - bh), cl(v.x - v.r - 10 - bw, v.y - 14 - bh)]
      const vicino = (b) => !(v.x > b.x - 4 && v.x < b.x + b.w + 4 && v.y > b.y - 4 && v.y < b.y + b.h + 4)
      const b = posti.find((b) => !urta(b) && vicino(b)) || posti.find(vicino) || posti[3]
      const bx = b.x, by = b.y
      occ.push(b)
      ctx.globalAlpha = v === fuocoN ? 1 : Math.max(0.35, aFrasi)
      ctx.fillStyle = col.bg2; ctx.strokeStyle = col.oro
      ctx.beginPath(); ctx.rect(bx, by, bw, bh); ctx.globalAlpha *= 0.94; ctx.fill(); ctx.globalAlpha = v === fuocoN ? 1 : Math.max(0.35, aFrasi)
      ctx.lineWidth = 1; ctx.save(); ctx.globalAlpha *= 0.55; ctx.strokeRect(bx + 0.5, by + 0.5, bw - 1, bh - 1); ctx.strokeRect(bx + 3.5, by + 3.5, bw - 7, bh - 7); ctx.restore()
      ctx.fillStyle = col.ink; ctx.textAlign = 'left'
      righe.forEach((t, i) => ctx.fillText(t, bx + 9, by + 22 + i * 16))
      ctx.fillStyle = C.dim[v.n._fam]; ctx.font = `small-caps 12px ${C.serif}`
      ctx.fillText(`${v.n.nome} · ${breveFam(v.n._fam)}`.slice(0, 48), bx + 9, by + 22 + righe.length * 16 + 4)
      // filetto dalla stella al cartiglio
      ctx.strokeStyle = col.oro; ctx.globalAlpha = 0.5; ctx.setLineDash([2, 3])
      ctx.beginPath(); ctx.moveTo(v.x, v.y); ctx.lineTo(Math.max(bx, Math.min(bx + bw, v.x)), Math.max(by, Math.min(by + bh, v.y))); ctx.stroke(); ctx.setLineDash([])
      ctx.globalAlpha = 1; nFrasi++
    }
    $('#atl-cielo').dataset.frasi = String(nFrasi)
    // nomi delle regioni
    ctx.textAlign = 'center'
    for (const g of C.regioni) {
      const x = sx(g.x), y = sy(g.y)
      const spazia = (t) => t.toUpperCase().split('').join(String.fromCharCode(8202))
      let testo = '', b = null, yy = 0
      for (const nome of [nomeFam(g.fam), breveFam(g.fam)]) {
        testo = spazia(nome)
        let fs = Math.max(13, Math.min(30, g.r * k * 0.2))
        while (fs >= 10) {
          ctx.font = `small-caps ${fs}px ${C.serif}`
          const tw = ctx.measureText(testo).width
          yy = rel < 1.8 ? y + fs * 0.35 : y - g.r * k - 10
          b = { x: x - tw / 2, y: yy - fs, w: tw, h: fs * 1.15 }
          if (rel >= 1.8 || (!urta(b) && tw < Math.max(g.r * k * 2.6, 90))) break
          fs *= 0.86; b = null
        }
        if (b) break
      }
      if (!b || !dentro(b)) continue
      ctx.fillStyle = g.fam === 'tue' ? col.tue : C.dim[g.fam]; ctx.globalAlpha = aReg * (C.scuro ? 0.8 : 0.85)
      ctx.fillText(testo, x, yy)
      if (rel < 1.8) occ.push(b)
    }
    ctx.globalAlpha = 1
    // filoni
    const aFil = rampa(rel, 1.45, 2.0) * (1 - 0.7 * rampa(rel, 6, 9))
    if (aFil > 0.02) {
      for (const a of C.ammassi) {
        const f = filone(a.f), x = sx(a.x), y = sy(a.y) - a.r * k - 8
        if (f.unico) continue
        ctx.font = `italic 15px ${C.serif}`
        const tw = ctx.measureText(f.nome).width
        let hh = 18
        const motto = rel >= 2.3 && f.motto ? `«${f.motto}»` : ''
        ctx.font = `italic 12px ${C.serif}`
        const mw = motto ? ctx.measureText(motto).width : 0
        if (motto) hh += 15
        const bw = Math.max(tw, mw)
        const b = { x: x - bw / 2, y: y - 15, w: bw, h: hh }
        if (!libero(b)) continue
        occ.push(b)
        ctx.globalAlpha = aFil; ctx.fillStyle = C.dim[a.fam]
        ctx.font = `italic 15px ${C.serif}`; ctx.fillText(f.nome, x, y)
        if (motto) { ctx.fillStyle = col.fumo; ctx.font = `italic 12px ${C.serif}`; ctx.fillText(motto, x, y + 15) }
      }
      ctx.globalAlpha = 1
    }
    // nomi delle costellazioni-domanda
    for (const e of etichetteQ) {
      ctx.font = `italic 16px ${C.serif}`; ctx.textAlign = 'center'
      const tw = ctx.measureText(e.q.nome).width
      let b = { x: e.x - tw / 2 - 4, y: e.y - 15, w: tw + 8, h: 20 }
      if (!dentro(b)) { b.x = Math.max(4, Math.min(w - b.w - 4, b.x)); b.y = Math.max(60, Math.min(h - 24, b.y)) }
      if (urta(b)) continue
      occ.push(b)
      ctx.globalAlpha = 0.85; ctx.fillStyle = col.bg; ctx.fillRect(b.x, b.y, b.w, b.h)
      ctx.globalAlpha = 1; ctx.fillStyle = col.oro; ctx.fillText(e.q.nome, b.x + b.w / 2, b.y + 15)
    }
    // nomi delle stelle
    ctx.textAlign = 'left'
    const prio = new Set()
    if (S.fuoco?.k === 'nodo') prio.add(S.fuoco.id)
    if (il) for (const id of il.lit) prio.add(id)
    for (const q of qOrd) for (const id of q.coro) prio.add(id)
    for (const c of D.costellazioni) if (C.attive.has(c.id) && rel > 1.6) for (const id of c.nodi) prio.add(id)
    const giaFrase = new Set(frasi.map((v) => v.n.id))
    visibili.sort((a, b) => ((b.n._fam === 'tue') - (a.n._fam === 'tue')) || (prio.has(b.n.id) - prio.has(a.n.id)) || (b.n._g - a.n._g))
    for (const v of visibili) {
      const { n, x, y, r } = v
      if (giaFrase.has(n.id)) continue
      const imp = 0.55 + 1.45 * Math.sqrt(n._g / D.maxg)
      const fuoco = S.fuoco?.k === 'nodo' && S.fuoco.id === n.id
      const tua = n._fam === 'tue'
      const mostra = fuoco || tua || (prio.has(n.id) && rel >= 1.6) || rel * imp >= 3
      if (!mostra) continue
      const fs = n._g >= 6 || tua ? 15 : 13.5
      ctx.font = `${tua ? 'italic ' : ''}${fs}px ${C.serif}`
      const tw = ctx.measureText(n.nome).width
      let bx = x + r + 5
      if (bx + tw > w - 4 && x - r - 5 - tw > 4) bx = x - r - 5 - tw
      const b = { x: bx, y: y - fs * 0.75, w: tw, h: fs * 1.15 }
      if (!libero(b) && !fuoco) continue
      occ.push(b)
      ctx.globalAlpha = v.spento ? 0.45 : 1
      if (!C.scuro || tua) { ctx.fillStyle = col.bg; ctx.globalAlpha *= 0.7; ctx.fillRect(b.x - 2, b.y - 1, b.w + 4, b.h + 2); ctx.globalAlpha = v.spento ? 0.45 : 1 }
      ctx.fillStyle = fuoco ? col.oro : tua ? col.tue : col.ink
      ctx.fillText(n.nome, bx, y + fs * 0.32)
      ctx.globalAlpha = 1
    }
    // nomi dei percorsi
    for (const c of D.costellazioni) {
      if (!C.attive.has(c.id)) continue
      const ns = c.nodi.map(nodo)
      const mx = ns.reduce((s, n) => s + n._x, 0) / ns.length, my = Math.max(...ns.map((n) => n._y))
      ctx.font = `italic small-caps 13px ${C.serif}`; ctx.textAlign = 'center'
      ctx.fillStyle = col.rub; ctx.globalAlpha = 0.9
      const x = sx(mx), y = sy(my) + 26
      const tw = ctx.measureText(c.nome).width
      const b = { x: x - tw / 2, y: y - 12, w: tw, h: 15 }
      if (libero(b)) { occ.push(b); ctx.fillText(c.nome, x, y) }
      ctx.globalAlpha = 1; ctx.textAlign = 'left'
    }
    let liv = 0
    for (let i = 0; i < LIVELLI.length; i++) if (rel >= LIVELLI[i][1] * 0.8) liv = i
    for (const b of root.querySelectorAll('#atl-livelli button')) b.setAttribute('aria-current', String(+b.dataset.livello === liv))
    $('#atl-cielo').dataset.k = k.toFixed(4)
  }

  function tocco(e) {
    if (!C.T) return
    const r = $('#atl-cielo').getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top
    let best = null, bd = 24
    for (const n of D.nodi) { const d = Math.hypot(n._x * C.T.k + C.T.x - x, n._y * C.T.k + C.T.y - y); if (d < bd) { bd = d; best = n } }
    if (best) { vaiA('nodo', best.id, { morbido: true }); return }
    const [wx, wy] = C.T.invert([x, y])
    const g = C.regioni.find((g) => Math.hypot(wx - g.x, wy - g.y) < g.r)
    if (g && C.T.k / C.fitK < 1.8) vola(g.x, g.y, Math.min(C.w, C.h) / (2 * g.r) * 0.92)
  }

  function vola(x, y, k, subito = false) {
    if (!C.pronto || !C.w) return
    const t = zoomIdentity.translate(C.w / 2 - x * k, C.h / 2 - y * k).scale(k)
    if (subito || RIDOTTO) C.sel.call(C.zoom.transform, t)
    else C.sel.transition().duration(950).call(C.zoom.transform, t)
  }
  function volaAlFuoco(subito = false) {
    if (!C.pronto) return
    const f = S.fuoco
    if (!f) { disegnaPresto(); return }
    if (f.k === 'nodo') {
      const n = nodo(f.id), rel = C.T.k / C.fitK
      vola(n._x, n._y, rel < 4 ? C.fitK * 4.6 : C.T.k, subito)
    } else if (f.k === 'filone') {
      const a = C.ammassi.find((a) => a.f === f.id)
      if (a) vola(a.x, a.y, Math.min(C.fitK * 6, Math.min(C.w, C.h) / (2 * a.r) * 0.55), subito)
    } else if (f.k === 'fam') {
      const g = C.regioni.find((g) => g.fam === f.id)
      if (g) vola(g.x, g.y, Math.min(C.w, C.h) / (2 * g.r) * 0.9, subito)
    } else vola(0, 0, C.fitK, subito)
  }

  function salto() {
    let semi = S.recenti.slice(-5)
    if (!semi.length && isPerno(S.fuoco)) semi = membriDi(S.fuoco).map((n) => n.id).slice(0, 3)
    if (!semi.length && S.fuoco?.k === 'domanda') semi = domanda(S.fuoco.id).coro.slice()
    if (!semi.length) semi = D.nodi.filter((n) => n._g >= 4).map((n) => n.id)
    for (let i = 0; i < 40; i++) {
      const seme = caso(semi), n0 = nodo(seme)
      if (!n0) continue
      const { dist, prev } = bfs(seme, 4)
      const altri = [...dist].filter(([id, d]) => d >= 2 && nodo(id)._fam !== n0._fam && !S.recenti.includes(id))
      let pool = altri.filter(([, d]) => d >= 3)
      if (!pool.length) pool = altri
      if (!pool.length) continue
      const [meta] = caso(pool), catena = percorso(prev, meta)
      S.catena = catena; S.conv = null
      vaiA('nodo', meta, { catena: true, pannello: LARGO.matches })
      const comuni = nodo(meta).domande.filter((q) => n0._q.has(q)).map((q) => domanda(q).nome)
      mostraCatena($('#atl-salto-carta'), 'Salto', { a: seme, b: meta, catena }, comuni.length ? `Rispondono entrambi a: ${comuni.join(' · ')}` : `Da ${n0.nome}, che hai guardato di recente.`)
      return
    }
    avviso('Nessuna stella lontana raggiungibile da qui.')
  }

  function eventiCielo() {
    su($('#atl-zoom-piu'), 'click', () => C.pronto && C.sel.transition().duration(350).call(C.zoom.scaleBy, 1.7))
    su($('#atl-zoom-meno'), 'click', () => C.pronto && C.sel.transition().duration(350).call(C.zoom.scaleBy, 1 / 1.7))
    su($('#atl-zoom-tutto'), 'click', () => C.pronto && C.sel.transition().duration(700).call(C.zoom.transform, zoomIdentity.translate(C.w / 2, C.h / 2).scale(C.fitK)))
    su($('#atl-salto'), 'click', salto)
    su($('#atl-livelli'), 'click', (e) => {
      const b = e.target.closest('[data-livello]'); if (!b || !C.pronto) return
      const rel = LIVELLI[+b.dataset.livello][1]
      const [wx, wy] = C.T.invert([C.w / 2, C.h / 2])
      let x = wx, y = wy
      if (S.fuoco?.k === 'nodo' && rel > 1) { x = nodo(S.fuoco.id)._x; y = nodo(S.fuoco.id)._y }
      else if (rel >= 8) {
        // al livello Frasi si va sulla stella con una frase più vicina al centro della vista
        const il = stelleIlluminate()
        let best = null, bd = Infinity
        for (const n of D.nodi) if (n.citazione?.testo) { const d = Math.hypot(n._x - wx, n._y - wy) * (il && !il.lit.has(n.id) ? 3 : 1); if (d < bd) { bd = d; best = n } }
        if (best) { x = best._x; y = best._y }
      }
      if (rel === 1) { x = 0; y = 0 }
      vola(x, y, C.fitK * rel)
    })
    su($('#atl-costellazioni'), 'click', (e) => {
      const qb = e.target.closest('[data-qcost]')
      if (qb) {
        const id = qb.dataset.qcost
        if (C.qAttive.has(id)) C.qAttive.delete(id)
        else { C.qAttive.add(id); const q = domanda(id); avviso(`${q.nome} ${q.sottotitolo ? '· ' + q.sottotitolo : ''} · ${D.perQ.get(id).length} stelle`) }
        aggiornaCost(); disegnaPresto(); return
      }
      const b = e.target.closest('[data-cost]'); if (!b) return
      const id = b.dataset.cost
      if (C.attive.has(id)) C.attive.delete(id)
      else { C.attive.add(id); const c = D.costellazioni.find((c) => c.id === id); if (c?.descrizione) avviso(c.descrizione) }
      aggiornaCost(); disegnaPresto()
    })
    const tema = () => { if (C.pronto) { leggiColori(); disegnaPresto() } }
    const ot = new MutationObserver(tema)
    ot.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] }); osservatori.push(ot)
    if (document.fonts?.ready) document.fonts.ready.then(() => { if (!signal.aborted) disegnaPresto() })
  }

  // ============================================================ Scheda di dettaglio
  function renderDettaglio() {
    const el = $('#atl-dettaglio'), f = S.fuoco
    const barra = '<div class="d-barra"><button type="button" class="d-maniglia" id="atl-d-maniglia" aria-label="Allarga o riduci la scheda"></button><button type="button" class="d-chiudi" id="atl-d-chiudi" aria-label="Chiudi la scheda">×</button></div>'
    if (!f) {
      el.innerHTML = barra + `<p class="d-vuoto">Tocca una domanda, una disciplina o un nome per leggerne la scheda.</p><p>Ci trovi la frase che lo riassume, le domande a cui risponde e tutti i collegamenti.</p>${D.prova ? `<p class="d-meta"><span class="prov">*</span> ${esc(D.meta.nota || 'Dati di prova.')}</p>` : ''}`
    } else if (f.k === 'nodo') {
      const n = nodo(f.id), fl = filone(n._f)
      const gruppi = new Map()
      for (const [id, l] of D.adj.get(n.id)) { const m = nodo(id); if (!gruppi.has(m._fam)) gruppi.set(m._fam, []); gruppi.get(m._fam).push({ m, l }) }
      const ordine = D.fams.map((d) => d.id).filter((d) => gruppi.has(d))
      const meta = [n.tipo, n.anno != null && n.anno !== '' ? anno(n.anno) : '', n.archivio ? 'nell\'archivio' : 'fuori dall\'archivio'].filter(Boolean).map(esc).join(' · ')
      const cit = n.citazione?.testo ? `<blockquote class="d-cit"><p>«${esc(n.citazione.testo)}»</p><footer>${n.citazione.fonte ? `<span>${esc(n.citazione.fonte)}</span>` : ''}${n.citazione.verificata === false ? '<span class="dv" title="Testo o fonte da verificare">da verificare</span>' : ''}</footer></blockquote>` : ''
      const qs = n.domande.map(domanda).filter(Boolean)
      el.innerHTML = barra + `<p class="d-occhiello" style="--c:${colFam(n._fam)}"><i></i><button type="button" data-k="fam" data-id="${esc(n._fam)}">${esc(nomeFam(n._fam))}</button>${fl && !fl.sintetico ? ` · <button type="button" data-k="filone" data-id="${esc(fl.id)}">${esc(fl.nome)}</button>` : ''}</p>
        <h2 class="d-nome">${esc(n.nome)}</h2>
        <p class="d-meta">${meta}${n.provvisorio ? ' · <span class="prov">esempio provvisorio</span>' : ''}${n._prop ? ` <span class="dv proposta">${ETIC_PROP}</span>` : ''}</p>
        ${cit}
        ${n.descrizione ? `<p class="d-desc">${esc(n.descrizione)}</p>` : ''}
        <h3 class="d-sez">Risponde a <small>${qs.length}</small></h3>
        <div class="d-chips d-domande">${qs.length ? qs.map((q) => chipDomanda(q, q.coro.includes(n.id) ? ' <small>nel coro</small>' : '', propQ(n, q.id))).join('') : '<span class="d-meta">Nessuna domanda assegnata.</span>'}</div>
        <h3 class="d-sez">Collegamenti <small>${D.adj.get(n.id).size}</small></h3>
        ${ordine.length ? ordine.map((d) => `<div class="d-gruppo" style="--c:${colFam(d)}"><h4>${esc(nomeFam(d))}</h4><div class="d-chips">${gruppi.get(d).sort((a, b) => b.m._g - a.m._g).map(({ m, l }) => chipNodo(m, l.tipo && l.tipo !== 'archivio' ? ` <small>${esc(TIPO_LEGAME[l.tipo] || l.tipo)}${l.provvisorio ? '*' : ''}</small>` : '', !!l.proposto)).join('')}</div></div>`).join('') : '<p class="d-meta">Ancora nessun collegamento.</p>'}
        ${n.url ? `<a class="d-apri" href="${esc(href(n.url))}" data-vai="${esc(n.url)}">Apri la nota →</a>` : ''}`
    } else if (f.k === 'filone') {
      const fl = filone(f.id), membri = D.membri.get(f.id) || []
      const Fid = new Set(membri.map((n) => n.id)), per = new Map()
      for (const m of membri) for (const y of D.adj.get(m.id).keys()) {
        if (Fid.has(y)) continue
        const n = nodo(y)
        if (!per.has(n._fam)) per.set(n._fam, new Map())
        per.get(n._fam).set(y, (per.get(n._fam).get(y) || 0) + 1)
      }
      const ordine = D.fams.map((d) => d.id).filter((d) => per.has(d)).sort((a, b) => per.get(b).size - per.get(a).size)
      const qc = D.domande.map((q) => ({ q, n: membri.filter((m) => m._q.has(q.id)).length })).filter((x) => x.n).sort((a, b) => b.n - a.n)
      el.innerHTML = barra + `<p class="d-occhiello" style="--c:${colFam(fl.fam)}"><i></i><button type="button" data-k="fam" data-id="${esc(fl.fam)}">${esc(nomeFam(fl.fam))}</button> · filone</p>
        <h2 class="d-nome">${esc(fl.nome)}</h2>
        <p class="d-meta">${[fl.periodo, `${membri.length} voci`].filter(Boolean).map(esc).join(' · ')}${fl.provvisorio ? ' · <span class="prov">filone provvisorio</span>' : ''}</p>
        ${fl.motto ? `<blockquote class="d-cit"><p>«${esc(fl.motto)}»</p><footer><span>il motto del filone</span></footer></blockquote>` : ''}
        <h3 class="d-sez">Risponde a <small>${qc.length}</small></h3>
        <div class="d-chips d-domande">${qc.map(({ q, n }) => chipDomanda(q, ` <small>×${n}</small>`)).join('')}</div>
        <h3 class="d-sez">Voci del filone <small>${membri.length}</small></h3>
        <div class="d-chips">${membri.map((n) => chipNodo(n)).join('')}</div>
        <h3 class="d-sez">A cosa è collegato <small>${ordine.reduce((s, d) => s + per.get(d).size, 0)}</small></h3>
        ${ordine.map((d) => `<div class="d-gruppo" style="--c:${colFam(d)}"><h4>${esc(nomeFam(d))} · ${per.get(d).size}</h4><div class="d-chips">${[...per.get(d)].sort((a, b) => b[1] - a[1]).map(([id, c]) => chipNodo(nodo(id), c > 1 ? ` <small>×${c}</small>` : '')).join('')}</div></div>`).join('')}`
    } else if (f.k === 'domanda') {
      const q = domanda(f.id), risp = D.perQ.get(q.id)
      const per = new Map()
      for (const n of risp) { if (!per.has(n._fam)) per.set(n._fam, []); per.get(n._fam).push(n) }
      const ordine = D.fams.map((d) => d.id).filter((d) => per.has(d)).sort((a, b) => (b === 'tue') - (a === 'tue') || per.get(b).length - per.get(a).length)
      el.innerHTML = barra + `<p class="d-occhiello" style="--c:var(--oro)"><i></i>Domanda · ${risp.length} risposte</p>
        <h2 class="d-nome">${esc(q.nome)}</h2>
        ${q.sottotitolo ? `<p class="d-sotto">${esc(q.sottotitolo)}</p>` : ''}
        ${q.descrizione ? `<p class="d-desc">${esc(q.descrizione)}</p>` : ''}
        ${q.coro.length ? `<h3 class="d-sez">Il coro <small>${q.coro.length} voci</small></h3>${q.coro.map((id) => { const n = nodo(id); return `<blockquote class="d-cit piccola${propCoro(n, q.id) ? ` proposta" title="${ETIC_PROP}` : ''}" style="--c:${colFam(n._fam)}"><p>${esc(n.citazione?.testo ? `«${n.citazione.testo}»` : n.descrizione)}</p><footer><button type="button" data-k="nodo" data-id="${esc(n.id)}">${esc(n.nome)}</button><span>${esc(nomeFam(n._fam))}</span>${n.citazione?.verificata === false ? '<span class="dv">da verificare</span>' : ''}</footer></blockquote>` }).join('')}` : ''}
        <h3 class="d-sez">Chi risponde <small>${ordine.length} mondi</small></h3>
        ${ordine.map((d) => { const ns = per.get(d); return `<div class="d-gruppo" style="--c:${colFam(d)}"><h4>${esc(nomeFam(d))} · ${ns.length}</h4><div class="d-chips">${ns.slice(0, 10).map((n) => chipNodo(n, '', propQ(n, q.id))).join('')}${ns.length > 10 ? `<button type="button" class="chip" data-k="fam" data-id="${esc(d)}" style="--c:${colFam(d)}">e altri ${ns.length - 10}</button>` : ''}</div></div>` }).join('')}`
    } else {
      const fam = D.famById.get(f.id), ns = D.nodiFam.get(f.id) || []
      const qc = D.domande.map((q) => ({ q, n: ns.filter((m) => m._q.has(q.id)).length })).sort((a, b) => b.n - a.n)
      const fil = D.perFam.get(f.id).filter((x) => !x.unico)
      el.innerHTML = barra + `<p class="d-occhiello" style="--c:${colFam(f.id)}"><i></i>${fam.tipo === 'disciplina' ? 'Disciplina' : 'Famiglia'} · ${ns.length} voci</p>
        <h2 class="d-nome">${esc(fam.nome)}</h2>
        ${fam.descrizione ? `<p class="d-desc">${esc(fam.descrizione)}</p>` : ''}
        <h3 class="d-sez">Le domande a cui risponde</h3>
        <div class="d-chips d-domande">${qc.map(({ q, n }) => chipDomanda(q, ` <small>×${n}</small>`)).join('')}</div>
        ${fil.length ? `<h3 class="d-sez">Filoni <small>${fil.length}</small></h3><div class="d-chips">${fil.map((x) => `<button type="button" class="chip" data-k="filone" data-id="${esc(x.id)}" style="--c:${colFam(f.id)}">${esc(x.nome)} <small>${D.membri.get(x.id).length}</small></button>`).join('')}</div>` : ''}`
    }
    el.classList.toggle('aperto', !!f && S.pannello)
    el.classList.toggle('espanso', S.espanso)
    const rp = $('#atl-riapri')
    rp.hidden = !f || S.pannello || (f.k === 'domanda' && S.vista === 'tavole')
    root.classList.toggle('in-cammino', !!f || !!S.domanda)
    if (f) rp.innerHTML = `<span>↑</span> ${esc(etichetta(f))}`
    misuraFoglio()
  }
  /** Sul telefono la scheda aperta accorcia le viste, così nulla resta dietro. */
  function misuraFoglio() {
    const el = $('#atl-dettaglio'), app = root
    const aperto = !!S.fuoco && S.pannello && !LARGO.matches
    app.classList.toggle('foglio', aperto)
    if (aperto) app.style.setProperty('--foglio-h', Math.round(Math.min(el.scrollHeight, innerHeight * 0.38)) + 'px')
  }

  // ============================================================ eventi globali
  su(root, 'click', (e) => {
    const t = e.target
    // "Apri la nota": navigazione del sito (router), tranne clic con modificatori (nuova scheda)
    const va = t.closest('[data-vai]'); if (va) {
      if (e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      e.preventDefault(); vai(va.dataset.vai); return
    }
    const vista = t.closest('.viste [data-vista]'); if (vista) { cambiaVista(vista.dataset.vista); return }
    const fl = t.closest('[data-filo]'); if (fl) {
      const i = +fl.dataset.filo; S.filo = S.filo.slice(0, i + 1); const it = S.filo[i]
      if (it.k === 'domanda') S.modo = 'domanda'
      vaiA(it.k, it.id, { daFilo: true, pivot: true }); return
    }
    const chiudi = t.closest('[data-chiudi]'); if (chiudi) { chiudi.closest('.carta').hidden = true; return }
    const altri = t.closest('[data-altri]'); if (altri) { const d = altri.dataset.altri; S.tutti.has(d) ? S.tutti.delete(d) : S.tutti.add(d); renderTavole(); return }
    const col = t.closest('[data-colonna]'); if (col) { const c = $(`.colonna[data-fam="${CSS.escape(col.dataset.colonna)}"]`); if (c) $('#atl-colonne').scrollTo({ left: c.offsetLeft - $('#atl-colonne').offsetLeft, behavior: RIDOTTO ? 'auto' : 'smooth' }); return }
    const ap = t.closest('[data-apri]'); if (ap) { apriTavola(+ap.dataset.apri); return }
    const tg = t.closest('[data-togli]'); if (tg) { const arr = salvate(); arr.splice(+tg.dataset.togli, 1); store.set(CHIAVE, arr); renderSalvate(); return }
    const modo = t.closest('[data-modo]'); if (modo) { cambiaModo(modo.dataset.modo); return }
    const torna = t.closest('[data-torna]'); if (torna) {
      S.domanda = null
      if (S.fuoco?.k === 'domanda') S.fuoco = null
      if (S.modo === 'domanda') S.fuoco = null
      S.conv = null; S.pannello = S.pannello && !!S.fuoco
      aggiorna({ pivot: true }); return
    }
    const qf = t.closest('[data-qfiltro]'); if (qf) {
      const id = qf.dataset.qfiltro
      S.domanda = S.domanda === id ? null : id
      if (S.domanda) aggiungiFilo({ k: 'domanda', id })
      renderFilo(); renderTavole(); return
    }
    const v = t.closest('[data-k][data-id]')
    if (v) {
      e.preventDefault()
      const tieni = v.hasAttribute('data-tieni') && (S.catena || S.conv)
      const opz = tieni ? { catena: true } : {}
      if (v.dataset.q) opz.domanda = v.dataset.q
      if (v.hasAttribute('data-scheda')) opz.pannello = true
      vaiA(v.dataset.k, v.dataset.id, opz)
      return
    }
    if (!t.closest('#atl-salvate') && !t.closest('#atl-apri-salvate')) { $('#atl-salvate').hidden = true; $('#atl-apri-salvate').setAttribute('aria-expanded', 'false') }
  })
  function cambiaModo(m) {
    if (m === S.modo) return
    S.modo = m
    if (m === 'disciplina') {
      if (!D.famById.has(S.partenza)) S.partenza = primaDisc()
      if (!isPerno(S.fuoco)) { S.fuoco = { k: 'fam', id: S.partenza }; aggiungiFilo(S.fuoco) }
    } else if (S.fuoco?.k === 'fam') S.fuoco = S.domanda ? { k: 'domanda', id: S.domanda } : null
    if (!LARGO.matches) S.pannello = false
    renderFilo(); renderDettaglio(); renderTavole({ pivot: true })
  }
  su($('#atl-partenza'), 'change', (e) => {
    const v = e.target.value
    if (S.modo === 'domanda') {
      if (v) vaiA('domanda', v)
      else { S.domanda = null; S.fuoco = null; S.pannello = false; aggiorna({ pivot: true }) }
    } else vaiA('fam', v)
  })
  su($('#atl-salva'), 'click', salvaTavola)
  su($('#atl-apri-salvate'), 'click', () => {
    const box = $('#atl-salvate'); renderSalvate(); box.hidden = !box.hidden
    $('#atl-apri-salvate').setAttribute('aria-expanded', String(!box.hidden))
  })
  su($('#atl-dettaglio'), 'click', (e) => {
    if (e.target.closest('#atl-d-chiudi')) { S.pannello = false; S.espanso = false; renderDettaglio(); dopoFoglio() }
    else if (e.target.closest('#atl-d-maniglia')) { S.espanso = !S.espanso; renderDettaglio() }
  })
  su($('#atl-riapri'), 'click', () => { S.pannello = true; renderDettaglio(); dopoFoglio() })
  function dopoFoglio() { if (S.vista === 'firmamento') ridimensiona() }
  su($('#atl-badge-dati'), 'click', () => avviso(D.meta.nota || 'Dati di prova.'))
  su(document, 'keydown', (e) => {
    if (e.key === 'Escape') { $('#atl-salvate').hidden = true; if (S.pannello && !LARGO.matches) { S.pannello = false; renderDettaglio(); dopoFoglio() } }
  })
  su(window, 'resize', () => { misuraFoglio() })
  su(LARGO, 'change', () => { renderDettaglio(); if (S.vista === 'tavole') renderTavole() })

  // il clic fuori dal menu delle tavole salvate lo chiude (anche fuori dalla mappa)
  su(document, 'pointerdown', (e) => {
    if (root.contains(e.target) && (e.target.closest('#atl-salvate') || e.target.closest('#atl-apri-salvate'))) return
    $('#atl-salvate').hidden = true; $('#atl-apri-salvate').setAttribute('aria-expanded', 'false')
  })

  // ============================================================ avvio
  $('#atl-badge-dati').hidden = !D.prova
  for (const id of ['#atl-bisoc', '#atl-salto-carta', '#atl-salvate', '#atl-avviso']) $(id).hidden = true
  eventiRuota(); eventiCielo(); renderSalvate()
  if (!D.nodi.length) {
    $('#atl-colonne').innerHTML = '<p class="col-vuota">Nessun dato da mostrare.</p>'
  } else {
    // si parte dalle otto domande, ciascuna con il suo coro: la pagina mostra subito che cosa fa
    S.pannello = false
    renderFilo(); renderDettaglio()
    cambiaVista(S.vista, true)
    // ?nodo=slug (lo usa la scheda delle note): apre quel nodo, o quella domanda
    let chiesto = opzioni.nodo
    if (chiesto === undefined) { try { chiesto = new URLSearchParams(location.search).get('nodo') } catch { chiesto = null } }
    if (chiesto && D.byId.has(chiesto)) vaiA('nodo', chiesto, { pannello: true })
    else if (chiesto && D.qById.has(chiesto)) vaiA('domanda', chiesto, { pannello: true })
    else if (st && S.fuoco) aggiorna({ pivot: true, ruota: true })
  }

  return {
    smonta() {
      ac.abort()
      for (const o of osservatori) o.disconnect()
      cancelAnimationFrame(rafRuota); cancelAnimationFrame(rafCielo); cancelAnimationFrame(R.anim)
      clearTimeout(tAvviso); clearTimeout(tR)
      if (C.sel) { C.sel.interrupt(); C.sel.on('.zoom', null) }
      R.pronta = false; C.pronto = false
      return {
        vista: S.vista, modo: S.modo, domanda: S.domanda, partenza: S.partenza,
        fuoco: S.fuoco ? { ...S.fuoco } : null, filo: S.filo.map((it) => ({ ...it })),
      }
    },
  }
}
