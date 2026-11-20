const KEY = "lpc-uao-v1";
const blank = () => ({ perfil: {}, done: {}, quiz: {}, txt: {}, bit: {}, proy: {}, notas: {}, diag: { pre: [], post: [] }, actualizado: null });
let S = blank();
try { const raw = localStorage.getItem(KEY); if (raw) S = Object.assign(blank(), JSON.parse(raw)); } catch (e) {}
let saveTimer = null;
function save(now) {
  S.actualizado = new Date().toISOString();
  clearTimeout(saveTimer);
  const doit = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} };
  now ? doit() : (saveTimer = setTimeout(doit, 300));
}
const $ = s => document.querySelector(s);
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
function toast(m) { const t = $("#toast"); t.textContent = m; t.classList.add("show"); setTimeout(() => t.classList.remove("show"), 2200); }
async function copy(text, msg) {
  try { await navigator.clipboard.writeText(text); toast(msg || "Copiado al portapapeles"); }
  catch (e) { openModal(`<h3>Copia este texto</h3><p class="muted small">Tu navegador no permitió copiar automáticamente. Selecciónalo y cópialo.</p><textarea style="min-height:220px" readonly>${esc(text)}</textarea><div class="row" style="margin-top:12px"><button class="btn" onclick="closeModal()">Cerrar</button></div>`); }
}
function openModal(html) { $("#modalBody").innerHTML = html; $("#modal").classList.add("open"); }
function closeModal() { $("#modal").classList.remove("open"); }
$("#modal").addEventListener("click", e => { if (e.target.id === "modal") closeModal(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

/* ---------- enlaces a bibliotecas ---------- */
function libLink(r) {
  if (r.src === "libby") {
    const q = encodeURIComponent(r.t);
    return LIBBY_KEY ? `https://libbyapp.com/search/${LIBBY_KEY}/search/query-${q}/page-1` : "https://libbyapp.com";
  }
  if (r.src === "pasa") return PASA_URL;
  return ELIBRO_SEARCH.includes("{q}") ? ELIBRO_SEARCH.replace("{q}", encodeURIComponent(r.t)) : ELIBRO_SEARCH;
}
function readingHTML(r, showWeek) {
  const isE = r.src === "elibro";
  const SRC = { libby: "Libby", elibro: "eLibro", pasa: "Pasa la Página" }[r.src];
  const title = isE ? `Búsqueda temática: «${esc(r.t)}»` : esc(r.t);
  return `<div class="reading">
    <div>
      <div class="row" style="gap:6px;margin-bottom:3px">
        ${r.req ? '<span class="pill req">Obligatoria</span>' : '<span class="pill">Complementaria</span>'}
        <span class="pill teal">${SRC}</span>
        ${r.fmt ? `<span class="pill">${esc(r.fmt)}</span>` : ""}
        ${showWeek ? `<span class="pill">Semana ${showWeek}</span>` : ""}
      </div>
      <div class="t">${title}</div>
      ${r.a ? `<div class="a">${esc(r.a)}</div>` : ""}
      <div class="n">${esc(r.nota || "")}</div>
    </div>
    <div class="row" style="flex-direction:column;align-items:stretch;gap:6px">
      <a class="btn sm" href="${libLink(r)}" target="_blank" rel="noopener">Abrir en ${SRC}</a>
      <button class="btn sm" onclick='copy(${JSON.stringify(r.t)}, "Título copiado: pégalo en el buscador")'>Copiar título</button>
    </div>
  </div>`;
}

/* ---------- estado de actividades ---------- */
const allActs = () => SEMANAS.flatMap(w => w.actividades.map(a => ({ ...a, w: w.n })));
function isDone(a) {
  switch (a.tipo) {
    case "quiz": return !!S.quiz[a.id];
    case "bit": { const b = S.bit[a.id]; return !!(b && b.idea && b.idea.trim()); }
    case "diag": return S.diag.pre.filter(Boolean).length === COMPETENCIAS.length;
    case "auto": return S.diag.post.filter(Boolean).length === COMPETENCIAS.length;
    case "proy": return !!S.done[a.id];
    default: return !!S.done[a.id];
  }
}
function weekPct(n) { const w = SEMANAS[n - 1]; const d = w.actividades.filter(isDone).length; return d / w.actividades.length; }
function totalPct() { const a = allActs(); return a.filter(isDone).length / a.length; }

/* ---------- calificaciones ---------- */
const GRADE_ITEMS = [
  { id: "f1", comp: "foro", n: "Foro 1 · ¿Cómo leo yo?" }, { id: "f2", comp: "foro", n: "Foro 2 · Explicar lo complejo" },
  { id: "f3", comp: "foro", n: "Foro 3 · Debate redes" }, { id: "f4", comp: "foro", n: "Foro 4 · Lo que el cuento no dice" },
  { id: "t1", comp: "taller", n: "Taller 1 · Disección de una noticia" }, { id: "t2", comp: "taller", n: "Taller 2 · Texto expositivo" },
  { id: "t3", comp: "taller", n: "Taller 3 · Anatomía de la persuasión" }, { id: "t4", comp: "taller", n: "Taller 4 · Análisis de un cuento" },
  { id: "proy", comp: "proy", n: "Ensayo crítico final" }
];
function comps(st) {
  st = st || S;
  const qs = SEMANAS.map(w => st.quiz[`w${w.n}-quiz`]);
  const quiz = qs.reduce((s, q) => s + (q ? (q.best / q.total) * 5 : 0), 0) / 8;
  const bit = SEMANAS.filter(w => { const b = st.bit[`w${w.n}-bit`]; return b && b.idea && b.idea.trim(); }).length / 8 * 5;
  const avg = c => { const it = GRADE_ITEMS.filter(i => i.comp === c); return it.reduce((s, i) => s + (parseFloat(st.notas[i.id]) || 0), 0) / it.length; };
  return { quiz, bit, foro: avg("foro"), taller: avg("taller"), proy: parseFloat(st.notas.proy) || 0 };
}
function notaFinal(st) { const c = comps(st); return PESOS.reduce((s, p) => s + c[p.id] * p.peso / 100, 0); }
const progName = P => P.programa === "OTRO" ? (P.programaOtro ? P.programaOtro + " (otro)" : "Otro") : (P.programa || "");
const f1 = x => (Math.round(x * 10) / 10).toFixed(1).replace(".", ",");

/* ---------- navegación ---------- */
const ROUTES = ["inicio", "semana-1", "semana-2", "semana-3", "semana-4", "semana-5", "semana-6", "semana-7", "semana-8", "biblioteca", "evaluacion", "progreso", "docente"];
function route() { const h = location.hash.slice(1); return ROUTES.includes(h) ? h : "inicio"; }
function renderNav() {
  const r = route();
  const dot = n => { const p = weekPct(n); return `<span class="dot ${p >= 1 ? "full" : p > 0 ? "half" : ""}"></span>`; };
  let h = `<div class="brand"><a href="#inicio" class="lockup" aria-label="UAO · CRAI, Centro de Recursos para el Aprendizaje y la Investigación" style="padding:0;background:none;box-shadow:none">${UAO_SVG}<span class="sep"></span><span class="crai"><b>CRAI</b>Centro de Recursos para el Aprendizaje y la Investigación</span></a><span class="descriptor">Lectura y Pensamiento Crítico</span></div>
  <a href="#inicio" class="${r === "inicio" ? "on" : ""}">Inicio</a>`;
  MODULOS.forEach(m => {
    h += `<div class="navgrp">Módulo ${m.n} · ${esc(m.titulo.split(":")[0])}</div>`;
    m.semanas.forEach(n => h += `<a href="#semana-${n}" class="${r === "semana-" + n ? "on" : ""}">${dot(n)}Semana ${n}</a>`);
  });
  h += `<div class="navgrp">Recursos</div>
  <a href="#biblioteca" class="${r === "biblioteca" ? "on" : ""}">Biblioteca</a>
  <a href="#evaluacion" class="${r === "evaluacion" ? "on" : ""}">Evaluación y rúbricas</a>
  <a href="#progreso" class="${r === "progreso" ? "on" : ""}">Mi progreso</a>
  <a href="#docente" class="${r === "docente" ? "on" : ""}">Panel docente</a>`;
  $("#nav").innerHTML = h;
}
function render() {
  renderNav();
  const r = route();
  const m = $("#main");
  if (r === "inicio") m.innerHTML = viewInicio();
  else if (r.startsWith("semana-")) m.innerHTML = viewSemana(+r.split("-")[1]);
  else if (r === "biblioteca") m.innerHTML = viewBiblio();
  else if (r === "evaluacion") m.innerHTML = viewEval();
  else if (r === "progreso") m.innerHTML = viewProgreso();
  else if (r === "docente") m.innerHTML = viewDocente();
  afterRender(r);
}
window.addEventListener("hashchange", () => { render(); window.scrollTo(0, 0); });

/* ---------- INICIO ---------- */
function viewInicio() {
  const pct = Math.round(totalPct() * 100);
  const next = SEMANAS.find(w => weekPct(w.n) < 1) || SEMANAS[7];
  const nombre = S.perfil.nombre ? `, ${esc(S.perfil.nombre.split(" ")[0])}` : "";
  return `<div class="stack">
  <section class="arco" aria-labelledby="hero-t">
    <span class="tag">CRAI · Curso virtual · 8 semanas</span>
    <h1 id="hero-t">Lectura y Pensamiento Crítico</h1>
    <p class="slogan">Leer para pensar por ti mismo</p>
    <p>Leer críticamente es ir más allá de lo que dice un texto para descubrir las intenciones de su autor y relacionarlas con otros textos y con su contexto. Este curso te acompaña en ese proceso con lecturas de Libby, eLibro y Pasa la Página, actividades aplicadas y seguimiento de tu avance.</p>
  </section>
  <div class="grid4">
    <div class="stat"><b>${pct}%</b><span>Avance del curso${nombre}</span><div class="bar" style="margin-top:8px"><i style="width:${pct}%"></i></div></div>
    <div class="stat"><b>${next.n}</b><span>Semana sugerida: ${esc(next.titulo.split(":")[0])}</span></div>
    <div class="stat"><b>${f1(notaFinal())}</b><span>Nota acumulada (de 5,0)</span></div>
    <div class="stat"><b>${allActs().filter(isDone).length}/${allActs().length}</b><span>Actividades completadas</span></div>
  </div>
  <div class="row"><a class="btn primary" href="#semana-${next.n}">Continuar en la semana ${next.n}</a>${!S.perfil.nombre ? '<a class="btn" href="#progreso">Registrar mis datos</a>' : ""}</div>

  <div class="card">
    <h3>Ruta del curso</h3>
    <div class="timeline" style="margin-top:14px">
      ${MODULOS.map(m => `<div class="m"><div class="small muted">Semanas ${m.semanas.join(" y ")}</div><strong>Módulo ${m.n}</strong><div class="small">${esc(m.titulo)}</div></div>`).join("")}
    </div>
  </div>

  <div class="grid2">
    <div class="card prose"><h3>Qué aprenderás</h3><ul>
      <li>Reconocer que la lectura crítica es necesaria para transformar el pensamiento, construir aprendizajes y lograr objetivos en diferentes contextos.</li>
      <li>Identificar las fortalezas y debilidades de tus procesos de lectura.</li>
      <li>Aplicar herramientas y estrategias para leer críticamente diversos tipos de texto.</li>
      <li>Comprender el proceso y los niveles de la lectura crítica.</li></ul></div>
    <div class="card prose"><h3>Cómo funciona</h3>
      <p>La metodología es de <strong>capacitación/acción</strong>: cada semana revisas y discutes conceptos (capacitación) y luego los aplicas en ejercicios y casos reales (acción).</p>
      <p>Cada semana incluye contenido, lecturas, una comprobación autocalificable y una bitácora. Los foros y talleres se publican en el aula virtual; aquí preparas tus borradores y llevas el registro.</p>
      <p class="small muted">Tu avance se guarda en este navegador. Desde «Mi progreso» puedes copiar un código de reporte para entregarlo al docente o llevarlo a otro equipo.</p></div>
  </div>

  <div class="card">
    <h3>Cronograma</h3>
    <div class="tblwrap"><table class="tbl" style="margin-top:10px"><thead><tr><th>Sem.</th><th>Tema</th><th>Lectura obligatoria</th><th>Entregas</th><th>Estado</th></tr></thead><tbody>
    ${SEMANAS.map(w => {
      const req = w.lecturas.filter(l => l.req && l.src === "libby").map(l => esc(l.t.split(":")[0])).join("; ");
      const ent = w.actividades.filter(a => ["foro", "taller", "proy"].includes(a.tipo)).map(a => esc(a.titulo.split("·")[0].trim())).join(", ");
      const p = weekPct(w.n);
      return `<tr><td><a href="#semana-${w.n}">${w.n}</a></td><td>${esc(w.titulo)}</td><td>${req}</td><td>${ent || "Quiz y bitácora"}</td><td>${p >= 1 ? '<span class="pill ok">Completa</span>' : p > 0 ? `<span class="pill warn">${Math.round(p * 100)}%</span>` : '<span class="pill">Pendiente</span>'}</td></tr>`;
    }).join("")}
    </tbody></table></div>
  </div>

  <div class="card prose">
    <h3>Novela transversal</h3>
    <p>Desde la semana 3 leerás una novela de forma paralela; sobre ella escribirás tu ensayo crítico final. Todas están disponibles en Libby.</p>
    <ul>${NOVELAS.map(n => `<li><strong>${esc(n.t)}</strong>, ${esc(n.a)} · <span class="muted">${esc(n.tema)}</span></li>`).join("")}</ul>
  </div>
  </div>`;
}

/* ---------- SEMANA ---------- */
let weekTab = "contenido";
function viewSemana(n) {
  const w = SEMANAS[n - 1];
  const m = MODULOS[w.mod - 1];
  const pct = Math.round(weekPct(n) * 100);
  const tabs = [["contenido", "Contenido"], ["lecturas", "Lecturas"], ["actividades", `Actividades (${w.actividades.filter(isDone).length}/${w.actividades.length})`], ["docente", "Para el docente"]];
  let body = "";
  if (weekTab === "contenido") body = `<div class="card"><h3>Objetivos de la semana</h3><ul>${w.objetivos.map(o => `<li>${esc(o)}</li>`).join("")}</ul></div><div class="card prose">${w.teoria}</div>`;
  if (weekTab === "lecturas") body = `<div class="card">${w.lecturas.map(r => readingHTML(r)).join("")}</div>
    ${n >= 3 ? `<div class="card small"><strong>Novela transversal:</strong> ${S.proy.novela ? esc(S.proy.novela) : "aún no la has elegido (actividad de la semana 3)"}. Avanza aproximadamente un sexto de la novela cada semana y regístralo en tu bitácora.</div>` : ""}`;
  if (weekTab === "actividades") body = `<div class="card">${w.actividades.map(a => actHTML(a, w)).join("")}</div>`;
  if (weekTab === "docente") body = `<div class="card prose"><h3>Orientaciones</h3><p>${esc(w.docente)}</p>
    <h4>Entregas y evaluación de la semana</h4><ul>${w.actividades.map(a => `<li>${esc(a.titulo)}${a.tipo === "taller" ? " · rúbrica de talleres" : a.tipo === "foro" ? " · rúbrica de foros" : a.tipo === "quiz" ? " · autocalificable" : ""}</li>`).join("")}</ul></div>`;
  return `<div class="stack">
    <div>
      <div class="eyebrow">Módulo ${m.n} · ${esc(m.titulo)} · Semana ${n} de 8</div>
      <h2 style="margin:6px 0 10px">${esc(w.titulo)}</h2>
      <div class="row" style="max-width:420px"><div class="bar" style="flex:1"><i style="width:${pct}%"></i></div><span class="small muted">${pct}% completado</span></div>
      <div class="wk-tabs" role="tablist">${tabs.map(([k, l]) => `<button role="tab" class="${weekTab === k ? "on" : ""}" onclick="weekTab='${k}';render()">${l}</button>`).join("")}</div>
    </div>
    ${body}
    <div class="row between noprint">
      ${n > 1 ? `<a class="btn" href="#semana-${n - 1}">← Semana ${n - 1}</a>` : "<span></span>"}
      ${n < 8 ? `<a class="btn" href="#semana-${n + 1}">Semana ${n + 1} →</a>` : `<a class="btn" href="#progreso">Ver mi progreso →</a>`}
    </div>
  </div>`;
}
const TIPO = { lectura: "Lectura", quiz: "Quiz", foro: "Foro", taller: "Taller", bit: "Bitácora", proy: "Proyecto", diag: "Diagnóstico", auto: "Autoevaluación" };
function actHTML(a, w) {
  const d = isDone(a);
  const manual = ["lectura", "foro", "taller", "proy"].includes(a.tipo);
  const chk = manual
    ? `<button class="chk ${d ? "on" : ""}" aria-label="Marcar ${esc(a.titulo)} como ${d ? "pendiente" : "completada"}" onclick="toggleDone('${a.id}')">${d ? "✓" : ""}</button>`
    : `<span class="chk ${d ? "on" : ""}" aria-hidden="true">${d ? "✓" : ""}</span>`;
  let inner = "";
  if (a.tipo === "lectura") inner = `<p>${esc(a.desc)} Marca la casilla cuando termines.</p>`;
  if (a.tipo === "quiz") inner = quizHTML(a, w);
  if (a.tipo === "foro") {
    const v = S.txt[a.id] || "";
    inner = `<p>${esc(a.desc)}</p><label for="t-${a.id}" style="margin-top:10px">Borrador de mi aporte</label>
      <textarea id="t-${a.id}" data-txt="${a.id}">${esc(v)}</textarea>
      <div class="row" style="margin-top:6px"><span class="small muted" data-wc="${a.id}">${wc(v)} palabras</span><button class="btn sm" onclick="copy(S.txt['${a.id}']||'')">Copiar para publicar</button><span class="small muted">Publica en el foro del aula virtual y marca la casilla.</span></div>`;
  }
  if (a.tipo === "taller") {
    const vals = S.txt[a.id] || [];
    inner = `<p>${esc(a.desc)}</p>${a.pasos.map((p, i) => `<label for="t-${a.id}-${i}" style="margin-top:12px">${i + 1}. ${esc(p)}</label><textarea id="t-${a.id}-${i}" data-tal="${a.id}" data-i="${i}">${esc(vals[i] || "")}</textarea>`).join("")}
      <div class="row" style="margin-top:10px"><button class="btn sm" onclick="copyTaller('${a.id}')">Copiar taller completo</button><span class="small muted">Entrégalo en el aula virtual y marca la casilla. Se evalúa con la rúbrica de talleres.</span></div>`;
  }
  if (a.tipo === "bit") {
    const b = S.bit[a.id] || {};
    const f = [["leido", "¿Qué leí esta semana? (incluye las páginas de tu novela)"], ["idea", "Idea principal de la lectura obligatoria, con mis palabras"], ["conexion", "Una conexión con mi vida, mi carrera u otro texto"], ["pregunta", "Una pregunta que me queda"]];
    inner = `<div class="grid2" style="margin-top:8px">${f.map(([k, l]) => `<div><label for="b-${a.id}-${k}">${l}</label><textarea id="b-${a.id}-${k}" data-bit="${a.id}" data-k="${k}" style="min-height:70px">${esc(b[k] || "")}</textarea></div>`).join("")}</div><p class="small">Se marca como completa cuando escribes la idea principal.</p>`;
  }
  if (a.tipo === "proy") inner = proyHTML(a);
  if (a.tipo === "diag" || a.tipo === "auto") inner = `<p>${esc(a.desc)}</p>${likertHTML(a.tipo === "diag" ? "pre" : "post")}`;
  return `<div class="act" id="${a.id}">${chk}<div><div class="row" style="gap:8px"><h4>${esc(a.titulo)}</h4><span class="pill">${TIPO[a.tipo]}</span></div>${inner}</div><span></span></div>`;
}
const wc = s => (String(s || "").trim().match(/\S+/g) || []).length;
function toggleDone(id) { S.done[id] = !S.done[id]; save(true); render(); }
function copyTaller(id) {
  const a = allActs().find(x => x.id === id); const v = S.txt[id] || [];
  const p = S.perfil;
  copy(`${a.titulo}\n${p.nombre || ""} ${p.codigo ? "· " + p.codigo : ""}\n\n` + a.pasos.map((s, i) => `${i + 1}. ${s}\n${v[i] || ""}\n`).join("\n"), "Taller copiado");
}
function quizHTML(a, w) {
  const r = S.quiz[a.id];
  const cur = quizDraft[a.id] || (r && !r.retry ? r.ans : []);
  const show = r && !quizRetry[a.id];
  return `<p>${w.quiz.length} preguntas · autocalificable · puedes intentarlo dos veces y se conserva el mejor puntaje.</p>
  ${r ? `<p><span class="pill ${r.best / r.total >= .6 ? "ok" : "warn"}">Mejor puntaje: ${r.best}/${r.total} (${f1(r.best / r.total * 5)})</span> <span class="small muted">Intentos: ${r.tries}/2</span></p>` : ""}
  ${w.quiz.map((q, qi) => `<div class="q"><p>${qi + 1}. ${esc(q.q)}</p>
    ${q.o.map((o, oi) => {
      let cls = "";
      if (show) { if (oi === q.a) cls = "right"; else if (r.ans[qi] === oi) cls = "wrong"; }
      return `<label class="opt ${cls}"><input type="radio" name="${a.id}-${qi}" value="${oi}" ${cur[qi] === oi ? "checked" : ""} ${show ? "disabled" : ""} onchange="quizPick('${a.id}',${qi},${oi})"> <span>${esc(o)}</span></label>`;
    }).join("")}
    ${show ? `<div class="fb">${r.ans[qi] === q.a ? "✓ Correcto. " : "✗ "}${esc(q.fb)}</div>` : ""}</div>`).join("")}
  <div class="row" style="margin-top:10px">
    ${!show ? `<button class="btn primary sm" onclick="quizSubmit('${a.id}',${w.n})">Enviar respuestas</button>` : (r.tries < 2 ? `<button class="btn sm" onclick="quizRetry['${a.id}']=true;quizDraft['${a.id}']=[];render()">Intentar de nuevo</button>` : "")}
  </div>`;
}
const quizDraft = {}, quizRetry = {};
function quizPick(id, qi, oi) { (quizDraft[id] = quizDraft[id] || [])[qi] = oi; }
function quizSubmit(id, n) {
  const w = SEMANAS[n - 1]; const ans = quizDraft[id] || [];
  if (w.quiz.some((_, i) => ans[i] === undefined)) { toast("Responde todas las preguntas antes de enviar"); return; }
  const score = w.quiz.reduce((s, q, i) => s + (ans[i] === q.a ? 1 : 0), 0);
  const prev = S.quiz[id];
  S.quiz[id] = { ans: ans.slice(), score, best: Math.max(score, prev ? prev.best : 0), total: w.quiz.length, tries: (prev ? prev.tries : 0) + 1 };
  delete quizRetry[id]; delete quizDraft[id];
  save(true); render(); toast(`Obtuviste ${score} de ${w.quiz.length}`);
  document.getElementById(id)?.scrollIntoView({ block: "start" });
}
function proyHTML(a) {
  const P = S.proy;
  let h = `<p>${esc(a.desc)}</p>`;
  if (a.etapa === "propuesta") h += `<div class="grid2"><div><label for="p-novela">Novela elegida</label><select id="p-novela" data-proy="novela"><option value="">Selecciona…</option>${NOVELAS.map(n => `<option ${P.novela === n.t ? "selected" : ""}>${esc(n.t)}</option>`).join("")}</select></div>
    <div><label for="p-pregunta">Pregunta inicial</label><textarea id="p-pregunta" data-proy="pregunta" style="min-height:60px">${esc(P.pregunta || "")}</textarea></div></div>`;
  if (a.etapa === "borrador") h += `<label for="p-tesis">Tesis</label><textarea id="p-tesis" data-proy="tesis" style="min-height:60px">${esc(P.tesis || "")}</textarea>
    <label for="p-args" style="margin-top:10px">Tres argumentos (uno por línea)</label><textarea id="p-args" data-proy="args">${esc(P.args || "")}</textarea>
    <label for="p-dialogo" style="margin-top:10px">Texto argumentativo con el que dialoga y por qué</label><textarea id="p-dialogo" data-proy="dialogo" style="min-height:60px">${esc(P.dialogo || "")}</textarea>`;
  if (a.etapa === "final") h += `<label for="p-ensayo">Ensayo (o versión resumida)</label><textarea id="p-ensayo" data-proy="ensayo" style="min-height:260px">${esc(P.ensayo || "")}</textarea>
    <div class="row" style="margin-top:6px"><span class="small muted" data-wcp>${wc(P.ensayo)} palabras · meta 1.200–1.500</span><button class="btn sm" onclick="copy(S.proy.ensayo||'')">Copiar ensayo</button></div>`;
  return h + `<p class="small">Marca la casilla cuando la etapa esté lista.</p>`;
}
function likertHTML(k) {
  const v = S.diag[k];
  return `<div class="tblwrap" style="margin-top:8px"><div class="likert head"><span>Competencia</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span></div>
  ${COMPETENCIAS.map((c, i) => `<div class="likert"><span>${esc(c)}</span>${[1, 2, 3, 4, 5].map(x => `<input type="radio" aria-label="${esc(c)}: ${x}" name="lk-${k}-${i}" ${v[i] === x ? "checked" : ""} onchange="S.diag.${k}[${i}]=${x};save(true);renderNav()">`).join("")}</div>`).join("")}
  <p class="small muted">1 = no lo logro · 3 = lo logro con apoyo · 5 = lo hago con seguridad</p></div>`;
}

/* ---------- BIBLIOTECA ---------- */
let bf = { mod: "", req: "", src: "" };
function viewBiblio() {
  const all = SEMANAS.flatMap(w => w.lecturas.map(l => ({ ...l, w: w.n, mod: w.mod })));
  const list = all.filter(l => (!bf.mod || l.mod == bf.mod) && (!bf.req || (bf.req === "req") === !!l.req) && (!bf.src || l.src === bf.src));
  return `<div class="stack">
    <div><div class="eyebrow">Recursos</div><h2 style="margin:6px 0 10px">Biblioteca del curso</h2>
    <p class="lead">Tres recursos suscritos por el CRAI: libros en Libby, libros académicos en eLibro y revistas de actualidad en Pasa la Página. Las búsquedas de eLibro son temáticas: elige el capítulo que mejor se ajuste y regístralo en tu bitácora.</p></div>
    <div class="card row">
      <div style="flex:1;min-width:160px"><label for="bf-mod">Módulo</label><select id="bf-mod" onchange="bf.mod=this.value;render()"><option value="">Todos</option>${MODULOS.map(m => `<option value="${m.n}" ${bf.mod == m.n ? "selected" : ""}>Módulo ${m.n}: ${esc(m.titulo)}</option>`).join("")}</select></div>
      <div style="flex:1;min-width:140px"><label for="bf-req">Tipo</label><select id="bf-req" onchange="bf.req=this.value;render()"><option value="">Todas</option><option value="req" ${bf.req === "req" ? "selected" : ""}>Obligatorias</option><option value="comp" ${bf.req === "comp" ? "selected" : ""}>Complementarias</option></select></div>
      <div style="flex:1;min-width:140px"><label for="bf-src">Fuente</label><select id="bf-src" onchange="bf.src=this.value;render()"><option value="">Todas las fuentes</option><option value="libby" ${bf.src === "libby" ? "selected" : ""}>Libby</option><option value="elibro" ${bf.src === "elibro" ? "selected" : ""}>eLibro</option><option value="pasa" ${bf.src === "pasa" ? "selected" : ""}>Pasa la Página</option></select></div>
    </div>
    <div class="card"><p class="small muted" style="margin:0 0 4px">${list.length} lecturas</p>${list.map(l => readingHTML(l, l.w)).join("") || "<p>No hay lecturas con esos filtros.</p>"}</div>
    <div class="card"><div class="row between"><h3>Pasa la Página: revistas recomendadas</h3><a class="btn sm" href="${PASA_URL}" target="_blank" rel="noopener">Entrar con cuenta UAO</a></div>
      <div class="tblwrap"><table class="tbl" style="margin-top:10px"><thead><tr><th>Uso en el curso</th><th>Revistas</th><th>Semanas</th></tr></thead><tbody>
      <tr><td>Columnas de opinión colombianas (Taller 1, Foro 3)</td><td>Los Danieles</td><td>2, 5</td></tr>
      <tr><td>Economía, empresas y publicidad (Taller 1, Taller 3)</td><td>Forbes</td><td>2, 6</td></tr>
      <tr><td>Sátira e ironía</td><td>Un Pasquín</td><td>2</td></tr>
      <tr><td>Divulgación científica e histórica (Foro 2, Taller 2)</td><td>Muy Interesante, National Geographic</td><td>3, 4</td></tr>
      <tr><td>Tecnología y discurso de marca (en inglés)</td><td>Apple Magazine</td><td>5, 6</td></tr>
      </tbody></table></div></div>
    <div class="card"><h3>Novelas para el proyecto final (Libby)</h3>${NOVELAS.map(n => readingHTML({ t: n.t, a: n.a, src: "libby", fmt: n.fmt, nota: n.tema })).join("")}</div>
    <div class="card prose small"><h3>Cómo acceder</h3>
      <p><strong>Libby:</strong> instala la app o entra a libbyapp.com, agrega la biblioteca de la universidad e inicia sesión con tus credenciales institucionales. Los títulos marcados como audiolibro pueden escucharse; para citarlos, indica el capítulo y el minuto aproximado.</p>
      <p><strong>Pasa la Página:</strong> entra por el enlace de acceso UAO (<a href="${PASA_URL}" target="_blank" rel="noopener">pasalapagina.proxyuao.elogim.com/uao</a>) e inicia sesión con tu cuenta institucional. En el curso usamos seis revistas: Forbes, Muy Interesante, Apple Magazine (en inglés), National Geographic, Los Danieles y Un Pasquín. Búscalas por nombre en la plataforma. Para citar, anota revista, edición, fecha, autor y página.</p>
      <p><strong>eLibro:</strong> ingresa desde el portal de bases de datos del CRAI con tu usuario institucional y usa los términos de búsqueda sugeridos.</p></div>
  </div>`;
}

/* ---------- EVALUACIÓN ---------- */
function rubricHTML(k) {
  const R = RUBRICAS[k];
  return `<div class="card"><h3>${R.titulo}</h3><div class="tblwrap"><table class="tbl" style="margin-top:10px;min-width:640px"><thead><tr><th>Criterio</th><th>Excelente (4,6–5,0)</th><th>Satisfactorio (3,6–4,5)</th><th>Básico (3,0–3,5)</th><th>Insuficiente (0–2,9)</th></tr></thead><tbody>
  ${R.criterios.map(c => `<tr><td><strong>${esc(c[0])}</strong></td>${c.slice(1).map(x => `<td>${esc(x)}</td>`).join("")}</tr>`).join("")}</tbody></table></div></div>`;
}
function viewEval() {
  return `<div class="stack">
    <div><div class="eyebrow">Evaluación</div><h2 style="margin:6px 0 10px">Evaluación y rúbricas</h2>
    <p class="lead">La escala es de 0,0 a 5,0 y se aprueba con 3,0. La evaluación combina comprobaciones automáticas, registro de lectura y trabajos calificados por el docente con rúbricas.</p></div>
    <div class="card"><div class="tblwrap"><table class="tbl"><thead><tr><th>Componente</th><th>Peso</th><th>Cómo se califica</th></tr></thead><tbody>
      <tr><td>${PESOS[0].nombre}</td><td>20 %</td><td>Automático. Mejor de dos intentos por quiz.</td></tr>
      <tr><td>${PESOS[1].nombre}</td><td>15 %</td><td>Por entrega completa (idea principal, conexión y pregunta). El docente puede revisar la calidad.</td></tr>
      <tr><td>${PESOS[2].nombre}</td><td>15 %</td><td>Rúbrica de foros: aporte, uso de lecturas, interacción y claridad.</td></tr>
      <tr><td>${PESOS[3].nombre}</td><td>30 %</td><td>Rúbrica de talleres: niveles literal, inferencial y crítico.</td></tr>
      <tr><td>${PESOS[4].nombre}</td><td>20 %</td><td>Rúbrica del ensayo. Incluye propuesta (sem. 3) y esquema (sem. 6) como retroalimentación formativa.</td></tr>
    </tbody></table></div>
    <p class="small muted">Además, el autodiagnóstico inicial y la autoevaluación final (no calificables) permiten ver el cambio en las 12 competencias del curso.</p></div>
    ${rubricHTML("taller")}${rubricHTML("foro")}${rubricHTML("proy")}
    <div class="card prose"><h3>Competencias que se evalúan</h3><ol>${COMPETENCIAS.map(c => `<li>${esc(c)}</li>`).join("")}</ol></div>
  </div>`;
}

/* ---------- PROGRESO ---------- */
function diagChart(pre, post) {
  const W = 640, rowH = 30, L = 250, H = COMPETENCIAS.length * rowH + 40, sc = (W - L - 20) / 5;
  let s = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Comparación de competencias inicial y final">`;
  for (let x = 0; x <= 5; x++) s += `<line x1="${L + x * sc}" y1="10" x2="${L + x * sc}" y2="${H - 24}" stroke="var(--line)"/><text x="${L + x * sc}" y="${H - 8}" font-size="11" text-anchor="middle">${x}</text>`;
  COMPETENCIAS.forEach((c, i) => {
    const y = 14 + i * rowH;
    const lbl = c.length > 40 ? c.slice(0, 38) + "…" : c;
    s += `<text x="${L - 8}" y="${y + 13}" font-size="11" text-anchor="end">${esc(lbl)}</text>`;
    if (pre[i]) s += `<rect x="${L}" y="${y + 2}" width="${pre[i] * sc}" height="9" rx="2" fill="var(--muted)" opacity=".45"/>`;
    if (post[i]) s += `<rect x="${L}" y="${y + 13}" width="${post[i] * sc}" height="9" rx="2" fill="var(--teal)"/>`;
  });
  return s + `</svg>`;
}
function viewProgreso() {
  const P = S.perfil; const c = comps(); const nf = notaFinal();
  const pre = S.diag.pre, post = S.diag.post;
  const avg = a => { const v = a.filter(Boolean); return v.length ? v.reduce((x, y) => x + y, 0) / v.length : 0; };
  return `<div class="stack">
    <div><div class="eyebrow">Seguimiento</div><h2 style="margin:6px 0 10px">Mi progreso</h2></div>
    <div class="card"><h3>Mis datos</h3><div class="grid4" style="margin-top:10px;grid-template-columns:repeat(auto-fit,minmax(180px,1fr))">
      ${[["nombre", "Nombre completo"], ["codigo", "Código estudiantil"], ["facultad", "Facultad"], ["programa", "Programa académico"], ["grupo", "Grupo"]].map(([k, l]) => {
        const opts = k === "facultad" ? FACULTADES : k === "programa" ? PROGRAMAS : null;
        if (!opts) return `<div><label for="pf-${k}">${l}</label><input type="text" id="pf-${k}" data-pf="${k}" value="${esc(P[k] || "")}"></div>`;
        let h = `<div><label for="pf-${k}">${l}</label><select id="pf-${k}" data-pf="${k}"><option value="">Selecciona…</option>${opts.map(f => `<option value="${esc(f)}" ${P[k] === f ? "selected" : ""}>${f === "OTRO" ? "Otro" : esc(f)}</option>`).join("")}${P[k] && !opts.includes(P[k]) ? `<option selected>${esc(P[k])}</option>` : ""}</select>`;
        if (k === "programa" && P.programa === "OTRO") h += `<label for="pf-programaOtro" style="margin-top:8px">¿Cuál programa?</label><input type="text" id="pf-programaOtro" data-pf="programaOtro" value="${esc(P.programaOtro || "")}">`;
        return h + `</div>`;
      }).join("")}
    </div></div>
    <div class="grid4">
      <div class="stat"><b>${Math.round(totalPct() * 100)}%</b><span>Actividades completadas</span></div>
      <div class="stat"><b style="color:${nf >= 3 ? "var(--ok)" : "var(--accent)"}">${f1(nf)}</b><span>Nota acumulada</span></div>
      <div class="stat"><b>${f1(c.quiz)}</b><span>Promedio quizzes</span></div>
      <div class="stat"><b>${SEMANAS.filter(w => isDone({ id: `w${w.n}-bit`, tipo: "bit" })).length}/8</b><span>Bitácoras</span></div>
    </div>
    <div class="card"><h3>Avance por semana</h3>
      ${SEMANAS.map(w => { const p = Math.round(weekPct(w.n) * 100); return `<div class="row" style="margin:8px 0"><a href="#semana-${w.n}" style="width:90px">Semana ${w.n}</a><div class="bar" style="flex:1;min-width:120px"><i style="width:${p}%;background:${p >= 100 ? "var(--ok)" : "var(--teal)"}"></i></div><span class="small" style="width:44px;text-align:right;font-variant-numeric:tabular-nums">${p}%</span></div>`; }).join("")}
    </div>
    <div class="card"><h3>Calificaciones</h3><p class="small muted">Registra las notas que el docente te asigne en el aula virtual para calcular tu nota acumulada. Quizzes y bitácoras se calculan solos.</p>
      <div class="tblwrap"><table class="tbl"><thead><tr><th>Componente</th><th>Peso</th><th>Nota</th><th>Aporte</th></tr></thead><tbody>
      ${PESOS.map(p => `<tr><td>${esc(p.nombre)}</td><td>${p.peso} %</td><td style="font-variant-numeric:tabular-nums">${f1(c[p.id])}</td><td style="font-variant-numeric:tabular-nums">${f1(c[p.id] * p.peso / 100)}</td></tr>`).join("")}
      <tr><td><strong>Total</strong></td><td>100 %</td><td></td><td><strong>${f1(nf)}</strong></td></tr></tbody></table></div>
      <div class="grid4" style="margin-top:12px">${GRADE_ITEMS.map(g => `<div><label for="g-${g.id}">${esc(g.n)}</label><input type="text" inputmode="decimal" id="g-${g.id}" data-grade="${g.id}" placeholder="0,0 – 5,0" value="${esc(S.notas[g.id] !== undefined ? String(S.notas[g.id]).replace(".", ",") : "")}"></div>`).join("")}</div>
    </div>
    <div class="card chart"><div class="row between"><h3>Competencias: inicio y cierre</h3><div class="row small"><span class="pill">Inicial ${pre.filter(Boolean).length ? f1(avg(pre)) : "—"}</span><span class="pill teal">Final ${post.filter(Boolean).length ? f1(avg(post)) : "—"}</span></div></div>
      ${pre.filter(Boolean).length || post.filter(Boolean).length ? diagChart(pre, post) : `<p class="muted">Completa el autodiagnóstico de la <a href="#semana-1">semana 1</a> para ver tu perfil. En la semana 8 lo repetirás para comparar.</p>`}
      <p class="small muted">Barra gris: autodiagnóstico inicial · barra azul: autoevaluación final.</p></div>
    <div class="card"><h3>Reporte para el docente</h3>
      <p class="small">Copia tu código de reporte y pégalo donde indique tu docente (aula virtual o formulario). El código incluye tus datos, avance, puntajes y textos. También sirve para continuar el curso en otro computador.</p>
      <div class="row"><button class="btn primary" onclick="copy(makeCode(),'Código de reporte copiado')">Copiar código de reporte</button><button class="btn" onclick="showSummary()">Ver resumen imprimible</button><button class="btn" onclick="importDialog()">Restaurar desde un código</button><button class="btn" onclick="resetDialog()">Borrar mi avance</button></div>
    </div>
  </div>`;
}
function makeCode() { return "LPC1." + btoa(unescape(encodeURIComponent(JSON.stringify(S)))); }
function parseCode(c) { c = c.trim(); if (!c.startsWith("LPC1.")) throw 0; return Object.assign(blank(), JSON.parse(decodeURIComponent(escape(atob(c.slice(5)))))); }
function importDialog() {
  openModal(`<h3>Restaurar avance</h3><p class="small muted">Pega un código de reporte. Reemplazará el avance guardado en este navegador.</p><textarea id="imp" style="min-height:140px"></textarea>
  <div class="row" style="margin-top:12px"><button class="btn primary" onclick="doImport()">Restaurar</button><button class="btn" onclick="closeModal()">Cancelar</button></div>`);
}
function doImport() { try { S = parseCode($("#imp").value); save(true); closeModal(); render(); toast("Avance restaurado"); } catch (e) { toast("El código no es válido. Revisa que esté completo."); } }
function resetDialog() {
  openModal(`<h3>¿Borrar todo tu avance?</h3><p>Se eliminarán respuestas, bitácoras, talleres y notas guardadas en este navegador. Copia antes tu código de reporte si quieres conservarlos.</p><div class="row"><button class="btn primary" onclick="S=blank();save(true);closeModal();render();toast('Avance borrado')">Sí, borrar</button><button class="btn" onclick="closeModal()">Cancelar</button></div>`);
}
function summaryHTML(st) {
  const P = st.perfil; const c = comps(st);
  const done = allActs().filter(a => { const bk = S; S = st; const d = isDone(a); S = bk; return d; }).length;
  return `<h3>${esc(P.nombre || "Estudiante sin nombre")}</h3><p class="small muted">${esc(P.codigo || "")} ${P.facultad ? "· " + esc(P.facultad) : ""} ${P.programa ? "· " + esc(progName(P)) : ""} ${P.grupo ? "· Grupo " + esc(P.grupo) : ""} · Actualizado ${st.actualizado ? new Date(st.actualizado).toLocaleString("es-CO") : "—"}</p>
  <p>Actividades: <strong>${done}/${allActs().length}</strong> · Nota acumulada: <strong>${f1(notaFinal(st))}</strong> · Novela: ${esc(st.proy.novela || "—")}</p>
  <table class="tbl"><tbody>${PESOS.map(p => `<tr><td>${esc(p.nombre)}</td><td>${f1(c[p.id])}</td></tr>`).join("")}</tbody></table>
  <h4>Quizzes</h4><p class="small">${SEMANAS.map(w => { const q = st.quiz[`w${w.n}-quiz`]; return `S${w.n}: ${q ? q.best + "/" + q.total : "—"}`; }).join(" · ")}</p>
  <h4>Bitácoras</h4>${SEMANAS.map(w => { const b = st.bit[`w${w.n}-bit`]; return b && b.idea ? `<p class="small"><strong>Semana ${w.n}.</strong> ${esc(b.idea)}${b.pregunta ? ` <em>Pregunta: ${esc(b.pregunta)}</em>` : ""}</p>` : ""; }).join("") || '<p class="small muted">Sin entradas.</p>'}
  <h4>Proyecto final</h4><p class="small"><strong>Pregunta:</strong> ${esc(st.proy.pregunta || "—")}<br><strong>Tesis:</strong> ${esc(st.proy.tesis || "—")}<br><strong>Ensayo:</strong> ${wc(st.proy.ensayo)} palabras</p>`;
}
function showSummary() { openModal(summaryHTML(S) + `<div class="row noprint" style="margin-top:12px"><button class="btn" onclick="closeModal()">Cerrar</button></div>`); }

/* ---------- DOCENTE ---------- */
let grupo = [];
function viewDocente() {
  return `<div class="stack">
    <div><div class="eyebrow">Docente</div><h2 style="margin:6px 0 10px">Panel docente</h2>
    <p class="lead">Pega los códigos de reporte que envían los estudiantes (uno por línea) para ver el avance del grupo. Los datos se procesan solo en tu navegador.</p></div>
    <div class="card"><label for="codes">Códigos de reporte</label><textarea id="codes" style="min-height:120px" placeholder="LPC1.eyJ…"></textarea>
      <div class="row" style="margin-top:10px"><button class="btn primary" onclick="loadGroup()">Ver avance del grupo</button><label class="btn" for="codefile" style="margin:0">Cargar archivo .txt<input type="file" id="codefile" accept=".txt,.csv" hidden onchange="loadFile(this)"></label><button class="btn" onclick="exportCSV()">Copiar tabla (CSV)</button></div></div>
    <div class="card" id="grupoTabla">${grupoTabla()}</div>
    <div class="card prose"><h3>Orientaciones por semana</h3>${SEMANAS.map(w => `<p><strong>Semana ${w.n}.</strong> ${esc(w.docente)}</p>`).join("")}</div>
    <div class="card prose small"><h3>Recomendaciones de implementación</h3><ul>
      <li>Crea en el aula virtual institucional un foro por cada Foro 1–4 y una tarea por cada Taller 1–4 y el ensayo final; esta plataforma es el espacio de estudio y borradores.</li>
      <li>Pide el código de reporte en las semanas 4 y 8 para hacer seguimiento intermedio y final.</li>
      <li>Para dirigir los botones de Libby a la colección de la universidad, configura el identificador de la biblioteca en el código de la página (constante LIBBY_KEY).</li>
      <li>Pasa la Página (acceso UAO: ${PASA_URL}) es el corpus de prensa del curso. El curso usa seis revistas: Forbes, Muy Interesante, Apple Magazine, National Geographic, Los Danieles y Un Pasquín. Antes del Taller 1, revisa las ediciones recientes de Los Danieles y Forbes y sugiere dos o tres piezas si el grupo lo necesita.</li>
      <li>Usa el autodiagnóstico inicial para formar grupos heterogéneos de discusión.</li></ul></div>
  </div>`;
}
function grupoTabla() {
  if (!grupo.length) return `<p class="muted">Aún no hay reportes cargados.</p>`;
  return `<div class="row between"><h3>${grupo.length} estudiantes</h3><span class="small muted">Promedio del grupo: ${f1(grupo.reduce((s, g) => s + notaFinal(g), 0) / grupo.length)}</span></div>
  <div class="tblwrap"><table class="tbl" style="min-width:720px"><thead><tr><th>Estudiante</th><th>Código</th><th>Facultad</th><th>Grupo</th><th>Avance</th><th>Quizzes</th><th>Bitácoras</th><th>Nota acum.</th><th>Actualizado</th><th></th></tr></thead><tbody>
  ${grupo.map((g, i) => { const bk = S; S = g; const pct = Math.round(totalPct() * 100); const c = comps(g); const nb = SEMANAS.filter(w => isDone({ id: `w${w.n}-bit`, tipo: "bit" })).length; S = bk; const nf = notaFinal(g);
    return `<tr><td>${esc(g.perfil.nombre || "—")}</td><td>${esc(g.perfil.codigo || "")}</td><td>${esc(g.perfil.facultad || "")}</td><td>${esc(g.perfil.grupo || "")}</td><td><div class="row" style="gap:6px;flex-wrap:nowrap"><div class="bar" style="width:70px"><i style="width:${pct}%"></i></div>${pct}%</div></td><td>${f1(c.quiz)}</td><td>${nb}/8</td><td><span class="pill ${nf >= 3 ? "ok" : pct < 40 ? "req" : "warn"}">${f1(nf)}</span></td><td class="small">${g.actualizado ? new Date(g.actualizado).toLocaleDateString("es-CO") : ""}</td><td><button class="btn sm" onclick="verEst(${i})">Ver</button></td></tr>`; }).join("")}
  </tbody></table></div>`;
}
function loadGroup() {
  const lines = $("#codes").value.split(/\s+/).filter(l => l.startsWith("LPC1."));
  let bad = 0; const map = {};
  lines.forEach(l => { try { const g = parseCode(l); const k = (g.perfil.codigo || g.perfil.nombre || Math.random()) + ""; if (!map[k] || (g.actualizado > map[k].actualizado)) map[k] = g; } catch (e) { bad++; } });
  grupo = Object.values(map).sort((a, b) => (a.perfil.nombre || "").localeCompare(b.perfil.nombre || ""));
  $("#grupoTabla").innerHTML = grupoTabla();
  toast(`${grupo.length} reportes cargados${bad ? ` · ${bad} códigos no válidos` : ""}`);
}
function loadFile(inp) { const f = inp.files[0]; if (!f) return; f.text().then(t => { $("#codes").value = t; loadGroup(); }); }
function verEst(i) {
  const g = grupo[i];
  const tal = allActs().filter(a => a.tipo === "taller").map(a => { const v = g.txt[a.id] || []; return v.some(Boolean) ? `<details><summary><strong>${esc(a.titulo)}</strong></summary>${a.pasos.map((p, j) => `<p class="small"><em>${j + 1}. ${esc(p)}</em><br>${esc(v[j] || "—")}</p>`).join("")}</details>` : ""; }).join("");
  openModal(summaryHTML(g) + (tal ? `<h4>Talleres</h4>${tal}` : "") + (g.proy.ensayo ? `<details><summary><strong>Ensayo final</strong></summary><p class="small" style="white-space:pre-wrap">${esc(g.proy.ensayo)}</p></details>` : "") + `<div class="row" style="margin-top:12px"><button class="btn" onclick="closeModal()">Cerrar</button></div>`);
}
function exportCSV() {
  if (!grupo.length) { toast("Primero carga los reportes"); return; }
  const rows = [["Nombre", "Código", "Facultad", "Programa", "Grupo", "Avance %", "Quizzes", "Bitácora", "Foros", "Talleres", "Proyecto", "Nota acumulada"]];
  grupo.forEach(g => { const bk = S; S = g; const pct = Math.round(totalPct() * 100); S = bk; const c = comps(g); rows.push([g.perfil.nombre, g.perfil.codigo, g.perfil.facultad, progName(g.perfil), g.perfil.grupo, pct, f1(c.quiz), f1(c.bit), f1(c.foro), f1(c.taller), f1(c.proy), f1(notaFinal(g))]); });
  copy(rows.map(r => r.map(x => `"${String(x ?? "").replace(/"/g, '""')}"`).join(";")).join("\n"), "Tabla copiada: pégala en Excel");
}

/* ---------- eventos de formularios ---------- */
/* Construcción del arco (Manual de Identidad UAO, p. 50):
   X = 1/4 del diámetro del círculo → radio 2X; base 4X × 2X; se resta el segmento inferior de 2/3X.
   Esquinas y uniones de la curva con radio pequeño (0,14X y 0,12X), como en el ejemplo del manual. */
function arcoPath(W, H, X) {
  const R = 2 * X, h = 2 * X / 3, r = 0.14 * X, f = 0.12 * X;
  const cx = W / 2, cy = H + R - h;               // centro del círculo, por debajo del borde inferior
  const fy = H - f;                                // centro de los empalmes
  const fx = Math.sqrt((R + f) ** 2 - (cy - fy) ** 2);
  const k = R / (R + f);
  const pR = [cx + fx * k, cy + (fy - cy) * k], pL = [cx - fx * k, cy + (fy - cy) * k];
  const n = v => v.toFixed(2);
  return `M ${n(r)} 0 H ${n(W - r)} A ${n(r)} ${n(r)} 0 0 1 ${n(W)} ${n(r)} V ${n(H - r)} A ${n(r)} ${n(r)} 0 0 1 ${n(W - r)} ${n(H)}`
    + ` H ${n(cx + fx)} A ${n(f)} ${n(f)} 0 0 1 ${n(pR[0])} ${n(pR[1])}`
    + ` A ${n(R)} ${n(R)} 0 0 0 ${n(pL[0])} ${n(pL[1])}`
    + ` A ${n(f)} ${n(f)} 0 0 1 ${n(cx - fx)} ${n(H)}`
    + ` H ${n(r)} A ${n(r)} ${n(r)} 0 0 1 0 ${n(H - r)} V ${n(r)} A ${n(r)} ${n(r)} 0 0 1 ${n(r)} 0 Z`;
}
function shapeArcos() {
  document.querySelectorAll(".arco").forEach(el => {
    const W = el.offsetWidth;
    const X = Math.min(W / 4, Math.max(56, Math.min(118, W * 0.12)));   // la base 4X nunca supera el ancho
    el.style.setProperty("--x", X + "px");
    const H = el.offsetHeight;
    el.style.clipPath = `path("${arcoPath(W, H, X)}")`;
  });
}
const arcoObs = typeof ResizeObserver !== "undefined" ? new ResizeObserver(shapeArcos) : null;
function afterRender() { shapeArcos(); if (arcoObs) document.querySelectorAll(".arco").forEach(el => arcoObs.observe(el)); }
window.addEventListener("resize", shapeArcos);
document.addEventListener("input", e => {
  const t = e.target, d = t.dataset;
  if (d.txt) { S.txt[d.txt] = t.value; const w = document.querySelector(`[data-wc="${d.txt}"]`); if (w) w.textContent = wc(t.value) + " palabras"; save(); }
  else if (d.tal) { (S.txt[d.tal] = Array.isArray(S.txt[d.tal]) ? S.txt[d.tal] : [])[+d.i] = t.value; save(); }
  else if (d.bit) { const was = isDone({ id: d.bit, tipo: "bit" }); (S.bit[d.bit] = S.bit[d.bit] || {})[d.k] = t.value; save(); if (was !== isDone({ id: d.bit, tipo: "bit" })) { renderNav(); updateCheck(d.bit); } }
  else if (d.proy) { S.proy[d.proy] = t.value; if (d.proy === "ensayo") { const w = document.querySelector("[data-wcp]"); if (w) w.textContent = wc(t.value) + " palabras · meta 1.200–1.500"; } save(); }
  else if (d.pf) { S.perfil[d.pf] = t.value; save(); }
  else if (d.grade !== undefined) { const v = t.value.trim().replace(",", "."); if (v === "") delete S.notas[d.grade]; else if (!isNaN(+v) && +v >= 0 && +v <= 5) S.notas[d.grade] = +v; save(); clearTimeout(window._gr); window._gr = setTimeout(() => { const id = t.id; render(); const el = document.getElementById(id); if (el) { el.focus(); el.setSelectionRange(el.value.length, el.value.length); } }, 900); }
});
document.addEventListener("change", e => { if (e.target.dataset.proy === "novela") { S.proy.novela = e.target.value; save(true); } if (e.target.dataset.pf === "programa") { S.perfil.programa = e.target.value; save(true); render(); if (e.target.value === "OTRO") document.getElementById("pf-programaOtro")?.focus(); } });
function updateCheck(id) { const row = document.getElementById(id); if (!row) return; const c = row.querySelector(".chk"); const d = isDone({ id, tipo: "bit" }); c.classList.toggle("on", d); c.textContent = d ? "✓" : ""; }
window.addEventListener("beforeunload", () => save(true));

/* Datos de ejemplo visibles si el estudiante aún no ha empezado: ninguno; la vista inicial muestra el curso completo. */
render();
