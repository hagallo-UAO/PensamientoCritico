/* ====== CONFIGURACIÓN DE ENLACES A BIBLIOTECAS ======
   LIBBY_KEY: identificador de la biblioteca en Libby (aparece en la URL al entrar a la colección UAO, p. ej. libbyapp.com/library/XXXX).
   Si se deja vacío, el botón abre libbyapp.com y muestra el título para buscarlo.
   ELIBRO_SEARCH: plantilla de búsqueda de eLibro con {q}. Si no contiene {q}, se abre la URL tal cual. */
const LIBBY_KEY = "";
const ELIBRO_SEARCH = "https://elibro.net";
/* Pasa la Página: revistas digitales suscritas por el CRAI. Acceso UAO por proxy. */
const PASA_URL = "https://pasalapagina.proxyuao.elogim.com/uao";

const FACULTADES = [
  "Facultad de Ingeniería y Ciencias Básicas",
  "Facultad de Arquitectura, Urbanismo y Diseño",
  "Facultad de Ciencias Empresariales y Jurídicas",
  "Facultad de Comunicación Social, Humanidades y Artes"
];

const PROGRAMAS = [
  "Administración",
  "Administración Ambiental",
  "Administración de Empresas",
  "Arquitectura",
  "Cine",
  "Cine y Comunicación Digital",
  "Comunicación Publicitaria",
  "Comunicación Social- Periodismo",
  "Contaduría Pública",
  "Contaduría Pública y Finanzas",
  "Derecho",
  "Diseño de la Comunicación Gráfica",
  "Diseño Industrial",
  "Economía",
  "Ingeniería Ambiental",
  "Ingeniería Biomédica",
  "Ingeniería de Datos e Inteligencia Artificial",
  "Ingeniería de Manufactura",
  "Ingeniería Eléctrica",
  "Ingeniería Electrónica y Telecomunicaciones",
  "Ingeniería Industrial",
  "Ingeniería Informática",
  "Ingeniería Mecánica",
  "Ingeniería Mecatrónica",
  "Ingeniería Multimedia",
  "Mercadeo Global",
  "Mercadeo y Negocios Internacionales",
  "Narrativas y Entretenimiento Digital",
  "Psicología",
  "Publicidad en Medios Digitales",
  "OTRO"
];

const COMPETENCIAS = [
  "Reconocer la idea principal y las secundarias de un texto",
  "Identificar las partes de un texto y la función de cada una",
  "Valorar la función de los marcadores discursivos",
  "Reconocer fallas gramaticales y sintácticas en medios",
  "Comprender el sentido de los enunciados",
  "Inferir el significado de palabras por el contexto",
  "Detectar falacias argumentativas",
  "Reconocer estrategias discursivas y tipos de texto",
  "Identificar el punto de vista del autor",
  "Reconocer diferentes voces discursivas",
  "Detectar información implícita: supuestos y juicios de valor",
  "Conectar el texto con el contexto sociocultural"
];

const MODULOS = [
  { n: 1, titulo: "Lectura crítica: ¿qué es y cómo se logra?", semanas: [1, 2] },
  { n: 2, titulo: "El texto expositivo", semanas: [3, 4] },
  { n: 3, titulo: "El texto argumentativo", semanas: [5, 6] },
  { n: 4, titulo: "El texto literario", semanas: [7, 8] }
];

const NOVELAS = [
  { t: "Fahrenheit 451", a: "Bradbury, Ray", tema: "Censura, pantallas y el valor de leer" },
  { t: "Ensayo sobre la ceguera", a: "Saramago, José", tema: "Crisis, poder y responsabilidad colectiva", fmt: "Audiolibro" },
  { t: "1984. La novela gráfica", a: "Orwell, George", tema: "Vigilancia, propaganda y manipulación del lenguaje" },
  { t: "Un mundo feliz", a: "Huxley, Aldous", tema: "Control social mediante el placer y el consumo" },
  { t: "El cuento de la criada", a: "Atwood, Margaret", tema: "Poder, cuerpo y discurso religioso-político" }
];

/* Pesos de evaluación (escala 0,0 – 5,0) */
const PESOS = [
  { id: "quiz", nombre: "Comprobaciones de lectura (8 quizzes autocalificables)", peso: 20 },
  { id: "bit", nombre: "Bitácora de lectura (8 entradas)", peso: 15 },
  { id: "foro", nombre: "Foros de discusión (4)", peso: 15 },
  { id: "taller", nombre: "Talleres aplicados (4)", peso: 30 },
  { id: "proy", nombre: "Proyecto final: ensayo crítico", peso: 20 }
];

const SEMANAS = [
/* ---------------- SEMANA 1 ---------------- */
{
  n: 1, mod: 1,
  titulo: "¿Cómo leemos hoy? La importancia de una lectura crítica",
  objetivos: [
    "Reconocer los hábitos de lectura propios en entornos impresos y digitales.",
    "Diferenciar los niveles de lectura: literal, inferencial y crítico.",
    "Explicar por qué la lectura crítica es necesaria para formarse un juicio propio."
  ],
  teoria: `
<p>Leemos más que nunca, pero leemos distinto. En la pantalla predomina el <strong>escaneo</strong>: saltamos entre titulares, notificaciones y fragmentos. Esa lectura rápida sirve para ubicar información, pero no basta para comprender a fondo ni para evaluar si lo leído es confiable.</p>
<h4>Leer críticamente</h4>
<p>La lectura crítica va más allá de lo que el texto dice: busca <em>cómo</em> lo dice, <em>por qué</em> y <em>con qué intención</em>, y relaciona el texto con otros textos y con su contexto. El lector crítico no acepta ni rechaza de entrada: examina, contrasta y luego decide.</p>
<h4>Tres niveles de lectura</h4>
<table class="tbl"><thead><tr><th>Nivel</th><th>Pregunta guía</th><th>Ejemplo de tarea</th></tr></thead><tbody>
<tr><td><strong>Literal</strong></td><td>¿Qué dice el texto?</td><td>Identificar datos, hechos, secuencias, la idea explícita.</td></tr>
<tr><td><strong>Inferencial</strong></td><td>¿Qué quiere decir?</td><td>Deducir ideas implícitas, el sentido de una palabra por el contexto, relaciones causa-efecto no dichas.</td></tr>
<tr><td><strong>Crítico</strong></td><td>¿Qué pienso yo y con qué fundamento?</td><td>Evaluar la solidez de los argumentos, la intención del autor, contrastar con otras fuentes y tomar postura.</td></tr>
</tbody></table>
<div class="clave"><strong>Concepto clave.</strong> Un lector crítico se hace cuatro preguntas ante cualquier texto: ¿quién habla?, ¿desde dónde?, ¿con qué propósito? y ¿con qué pruebas?</div>
<h4>La pregunta de Schopenhauer</h4>
<p>En su ensayo <em>Pensar por uno mismo</em>, Schopenhauer advierte que leer sin reflexionar equivale a pensar con la cabeza de otro. La lectura de este curso parte de esa tensión: leer mucho no garantiza pensar mejor; lo que transforma el pensamiento es leer con preguntas.</p>`,
  lecturas: [
    { t: "Pensar por ti mismo", a: "Schopenhauer, Arthur", src: "libby", fmt: "Audiolibro", req: true, nota: "Ensayo completo (breve). Anota tres afirmaciones con las que estés de acuerdo y una que discutirías." },
    { t: "Infocracia: La digitalización y la crisis de la democracia", a: "Han, Byung-Chul", src: "libby", fmt: "Audiolibro", req: false, nota: "Capítulo 1. Cómo el flujo de información afecta la deliberación." },
    { t: "lectura crítica universitaria", src: "elibro", req: false, nota: "Busca un capítulo sobre niveles de lectura y elige uno para tu bitácora." },
    { t: "Explora la plataforma", src: "pasa", req: false, nota: "Primer contacto: ingresa con tu cuenta UAO y ubica las seis revistas del curso: Forbes, Muy Interesante, Apple Magazine, National Geographic, Los Danieles y Un Pasquín. Anota en tu bitácora cuál te interesa más y por qué." }
  ],
  actividades: [
    { id: "w1-diag", tipo: "diag", titulo: "Autodiagnóstico de competencias lectoras", desc: "Valora tus 12 competencias de 1 a 5. Lo repetirás al final para comparar tu avance." },
    { id: "w1-lec", tipo: "lectura", titulo: "Lectura obligatoria", desc: "Pensar por ti mismo (Schopenhauer)." },
    { id: "w1-quiz", tipo: "quiz", titulo: "Comprobación de lectura 1" },
    { id: "w1-foro", tipo: "foro", titulo: "Foro 1 · ¿Cómo leo yo?", desc: "Preséntate y describe un día típico de lectura: qué lees, en qué soporte y cuánto tiempo. Luego responde: según Schopenhauer, ¿tu forma de leer te ayuda a pensar por ti mismo? Usa al menos una cita del texto. Responde a dos compañeros señalando una coincidencia y una diferencia con tu experiencia. (150–250 palabras)" },
    { id: "w1-bit", tipo: "bit", titulo: "Bitácora semana 1" }
  ],
  quiz: [
    { q: "Un estudiante anota la fecha y el lugar donde ocurrió el hecho que narra una noticia. ¿Qué nivel de lectura pone en juego?", o: ["Literal", "Inferencial", "Crítico"], a: 0, fb: "Recuperar datos explícitos del texto corresponde al nivel literal." },
    { q: "Al leer «el ministro, siempre tan puntual con sus promesas», el lector entiende que el autor se burla del ministro. ¿Qué nivel de lectura usa?", o: ["Literal", "Inferencial", "Crítico"], a: 1, fb: "Detectar la ironía exige deducir un sentido que no está dicho: es inferencia." },
    { q: "Una estudiante contrasta los datos de un artículo con dos fuentes oficiales y concluye que el autor exagera las cifras. ¿Qué nivel de lectura aplica?", o: ["Literal", "Inferencial", "Crítico"], a: 2, fb: "Evaluar la validez del texto contrastando fuentes y tomar postura es lectura crítica." },
    { q: "¿Cuál es la advertencia central de Schopenhauer en «Pensar por uno mismo»?", o: ["Que hay que leer la mayor cantidad posible de libros", "Que leer sin reflexión sustituye el pensamiento propio por el ajeno", "Que la lectura es inútil para la formación intelectual", "Que solo deben leerse autores clásicos"], a: 1, fb: "Schopenhauer no rechaza la lectura: critica la lectura pasiva que reemplaza la reflexión propia." },
    { q: "Recibes por WhatsApp una noticia alarmante sin autor ni fecha. ¿Qué acción refleja mejor la lectura crítica?", o: ["Compartirla para alertar a otros", "Buscar la fuente original y contrastarla antes de creerla o difundirla", "Ignorar cualquier noticia que llegue por redes", "Creerla si muchos contactos ya la compartieron"], a: 1, fb: "Verificar el origen y contrastar es la base de la lectura crítica en entornos digitales." }
  ],
  docente: "Abre el foro 1 el primer día. Pide el autodiagnóstico antes de la primera lectura. Usa las respuestas del foro para identificar a quienes leen casi solo en pantalla y proponer estrategias de lectura lenta."
},
/* ---------------- SEMANA 2 ---------------- */
{
  n: 2, mod: 1,
  titulo: "Herramientas del lector: ideas, conectores, estrategias y falacias",
  objetivos: [
    "Distinguir la idea principal de las ideas secundarias.",
    "Identificar la función de los conectores discursivos.",
    "Reconocer estrategias discursivas y falacias frecuentes.",
    "Detectar errores ortográficos y sintácticos en la prensa."
  ],
  teoria: `
<h4>Idea principal e ideas secundarias</h4>
<p>La <strong>idea principal</strong> es la afirmación más general que da sentido al párrafo; si se elimina, el párrafo pierde su razón de ser. Las <strong>ideas secundarias</strong> la amplían, la ejemplifican o la justifican. Una prueba útil: la idea principal responde a «¿qué afirma el autor sobre el tema?», no solo a «¿de qué habla?».</p>
<h4>Conectores discursivos</h4>
<table class="tbl"><thead><tr><th>Función</th><th>Conectores</th></tr></thead><tbody>
<tr><td>Adición</td><td>además, asimismo, también, incluso</td></tr>
<tr><td>Contraste</td><td>sin embargo, no obstante, en cambio, aunque</td></tr>
<tr><td>Causa</td><td>porque, ya que, debido a, puesto que</td></tr>
<tr><td>Consecuencia</td><td>por lo tanto, en consecuencia, así que</td></tr>
<tr><td>Ejemplificación</td><td>por ejemplo, es decir, en concreto</td></tr>
<tr><td>Conclusión</td><td>en síntesis, finalmente, en conclusión</td></tr>
</tbody></table>
<h4>Estrategias discursivas</h4>
<p>Comparación y contraste, ejemplificación, enumeración o seriación, explicación, causalidad y problema-solución. Reconocerlas permite anticipar la organización del texto y leer más rápido sin perder el hilo.</p>
<h4>Falacias más comunes</h4>
<table class="tbl"><thead><tr><th>Falacia</th><th>Qué hace</th><th>Ejemplo</th></tr></thead><tbody>
<tr><td>Ad hominem</td><td>Ataca a la persona, no al argumento</td><td>«No le creas, ni siquiera terminó la carrera».</td></tr>
<tr><td>Hombre de paja</td><td>Deforma la postura contraria para refutarla fácil</td><td>«Quieren regular las redes; o sea, quieren censurarlo todo».</td></tr>
<tr><td>Falso dilema</td><td>Presenta solo dos opciones</td><td>«O apoyas esta reforma o estás contra el país».</td></tr>
<tr><td>Pendiente resbaladiza</td><td>Encadena consecuencias sin probarlas</td><td>«Si hoy se permite X, mañana todo será caos».</td></tr>
<tr><td>Generalización apresurada</td><td>Concluye a partir de pocos casos</td><td>«Dos amigos lo probaron y les funcionó: sirve para todos».</td></tr>
<tr><td>Apelación a la mayoría</td><td>Lo popular sería verdadero</td><td>«Millones lo usan, por algo será».</td></tr>
<tr><td>Falsa causa</td><td>Confunde secuencia o correlación con causa</td><td>«Desde que llegó el nuevo alcalde llueve más».</td></tr>
</tbody></table>
<h4>Errores frecuentes en la prensa</h4>
<p>«Hubieron muchos heridos» (correcto: <em>hubo</em>); dequeísmo («pienso de que»); queísmo («me di cuenta que» → <em>de que</em>); concordancia («la mayoría de los votantes decidieron» admite ambas, pero «se vende casas» → <em>se venden</em>); tildes diacríticas (<em>sólo/solo</em>, <em>más/mas</em>).</p>
<div class="clave"><strong>Clasificación de los tipos de texto.</strong> Según su intención: narrativo (contar), descriptivo (caracterizar), expositivo (explicar), argumentativo (persuadir/convencer) e instructivo (orientar una acción). Los textos reales suelen mezclarlos; se clasifican por la intención dominante.</div>`,
  lecturas: [
    { t: "Nexus: Una breve historia de las redes de información desde la Edad de Piedra hasta la IA", a: "Noah Harari, Yuval", src: "libby", fmt: "Libro electrónico", req: true, nota: "Prólogo. Subraya la idea principal de cada sección y los conectores que marcan contraste." },
    { t: "Los Danieles · Forbes", src: "pasa", fmt: "Revistas", req: true, nota: "Corpus del Taller 1. Elige una columna de opinión de Los Danieles o un artículo de actualidad económica o empresarial de Forbes, de la edición más reciente." },
    { t: "Un Pasquín", src: "pasa", fmt: "Revista satírica", req: false, nota: "Humor gráfico y sátira colombiana: ejercita la lectura inferencial (ironía, doble sentido) y compara cómo la sátira critica sin argumentar de forma explícita." },
    { t: "falacias argumentativas", src: "elibro", req: false, nota: "Consulta un capítulo de lógica informal o argumentación para ampliar el catálogo de falacias." },
    { t: "ortografía y redacción periodística", src: "elibro", req: false, nota: "Material de apoyo para el punto 6 del Taller 1." }
  ],
  actividades: [
    { id: "w2-lec", tipo: "lectura", titulo: "Lectura obligatoria", desc: "Prólogo de Nexus (Harari)." },
    { id: "w2-quiz", tipo: "quiz", titulo: "Comprobación de lectura 2" },
    { id: "w2-taller", tipo: "taller", gid: "t1", titulo: "Taller 1 · Disección de una noticia u opinión", desc: "Entra a Pasa la Página con tu cuenta UAO y elige una columna de opinión o un artículo de actualidad de la edición más reciente de Los Danieles o de Forbes. Si eliges una pieza satírica de Un Pasquín, el punto 5 se centra en la ironía en lugar de las falacias. Responde:", pasos: [
      "Datos de la publicación: revista, número o fecha de la edición, autor, título y página en Pasa la Página.",
      "Idea principal del texto en una oración con tus palabras, y tres ideas secundarias.",
      "Cinco conectores del texto y la función que cumple cada uno.",
      "Estrategia discursiva dominante (comparación, causalidad, problema-solución…) y cómo la reconociste.",
      "Al menos una falacia o razonamiento débil (o explica por qué el texto no tiene ninguna).",
      "Dos errores ortográficos o sintácticos encontrados (o, si no hay, dos aciertos de redacción) con su corrección.",
      "Tipo de texto según su intención dominante y una valoración crítica de 80–120 palabras."
    ] },
    { id: "w2-bit", tipo: "bit", titulo: "Bitácora semana 2" }
  ],
  quiz: [
    { q: "«Aunque el transporte público de la ciudad ha mejorado, sigue siendo insuficiente. En horas pico, los buses van llenos y las rutas no cubren los barrios de ladera. Por eso muchos trabajadores pierden hasta tres horas diarias.» ¿Cuál es la idea principal?", o: ["Los buses van llenos en horas pico", "El transporte público ha mejorado pero sigue siendo insuficiente", "Los trabajadores pierden tres horas diarias", "Las rutas no llegan a los barrios de ladera"], a: 1, fb: "Las demás oraciones ejemplifican o derivan de esa afirmación general." },
    { q: "En «El proyecto es costoso; sin embargo, sus beneficios son duraderos», el conector «sin embargo» expresa:", o: ["Causa", "Adición", "Contraste", "Consecuencia"], a: 2, fb: "«Sin embargo» opone la segunda idea a la primera." },
    { q: "«Si dejamos usar el celular en clase, luego lo pedirán en los exámenes y al final nadie aprenderá nada.» ¿Qué falacia es?", o: ["Ad hominem", "Pendiente resbaladiza", "Falso dilema", "Apelación a la mayoría"], a: 1, fb: "Encadena consecuencias cada vez más graves sin demostrar que una lleve a la otra." },
    { q: "«No le hagas caso a lo que dice sobre reciclaje; él mismo tira basura en la calle.» ¿Qué falacia es?", o: ["Hombre de paja", "Ad hominem", "Generalización apresurada", "Falsa causa"], a: 1, fb: "Desacredita a la persona en lugar de evaluar su argumento." },
    { q: "¿Cuál de estas oraciones está escrita correctamente?", o: ["Hubieron muchos heridos en el accidente", "Pienso de que la medida es injusta", "Hubo muchos heridos en el accidente", "Me di cuenta que era tarde"], a: 2, fb: "«Haber» impersonal no se pluraliza: «hubo». Las otras tienen dequeísmo y queísmo." },
    { q: "Un texto organizado con «en primer lugar…, en segundo lugar…, finalmente…» usa principalmente la estrategia de:", o: ["Problema-solución", "Enumeración o seriación", "Comparación y contraste", "Causalidad"], a: 1, fb: "Los ordinales marcan una serie de elementos." }
  ],
  docente: "Modela el taller en clase con una noticia corta antes de asignarlo. Devuelve el Taller 1 con la rúbrica antes de la semana 4 para que los estudiantes corrijan en el Taller 2."
},
/* ---------------- SEMANA 3 ---------------- */
{
  n: 3, mod: 2,
  titulo: "El texto expositivo: tipos, estructura y rasgos",
  objetivos: [
    "Diferenciar textos expositivos divulgativos y especializados.",
    "Reconocer la estructura y los rasgos lingüísticos del texto expositivo.",
    "Identificar los recursos explicativos que usa el autor."
  ],
  teoria: `
<p>El texto expositivo tiene como propósito <strong>informar y explicar</strong> un tema de forma clara, ordenada y, en principio, objetiva. Lo encontramos en manuales, enciclopedias, artículos de divulgación, informes y libros de texto.</p>
<h4>Tipos</h4>
<ul><li><strong>Divulgativos (generales):</strong> dirigidos a un público amplio; usan ejemplos, analogías y lenguaje accesible. Ej.: un libro de divulgación científica.</li>
<li><strong>Especializados:</strong> dirigidos a expertos; usan terminología técnica, datos y referencias. Ej.: un artículo en una revista científica indexada.</li></ul>
<h4>Estructura</h4>
<p><strong>Introducción</strong> (presenta el tema y su relevancia) → <strong>desarrollo</strong> (explica, clasifica, define, ilustra) → <strong>conclusión</strong> (sintetiza). Algunos textos usan estructura de pregunta-respuesta o problema-solución.</p>
<h4>Rasgos sintácticos y gramaticales</h4>
<ul><li>Predominio de la tercera persona y de construcciones impersonales («se considera», «se observa»).</li>
<li>Presente atemporal («la célula es la unidad básica…»).</li>
<li>Léxico denotativo y preciso; tecnicismos en los especializados.</li>
<li>Oraciones enunciativas y abundantes conectores lógicos.</li></ul>
<h4>Recursos explicativos</h4>
<p>Definición, clasificación, ejemplificación, comparación y analogía, reformulación («es decir»), citas de autoridad, datos estadísticos y apoyos gráficos.</p>
<div class="clave"><strong>Mirada crítica.</strong> «Objetivo» no significa «neutral». Toda exposición elige qué incluir y qué omitir. Pregúntate: ¿qué fuentes cita?, ¿qué deja fuera?, ¿quién financia o publica?</div>`,
  lecturas: [
    { t: "El cerebro y el mito del yo: El papel de las neuronas en el pensamiento y el comportamiento humanos", a: "Llinás, Rodolfo R.", src: "libby", fmt: "Libro electrónico", req: true, nota: "Capítulo 1. Un científico colombiano explica un tema complejo: identifica definiciones, analogías y ejemplos." },
    { t: "La ciencia, su método y su filosofía", a: "Bunge, Mario", src: "libby", fmt: "Libro electrónico", req: false, nota: "Primera parte. Ejemplo de exposición rigurosa con clasificación y definición." },
    { t: "Las manos del tiempo: Todo lo que la historia de los relojes cuenta sobre nosotros", a: "Struthers, Rebecca", src: "libby", fmt: "Libro electrónico", req: false, nota: "Divulgación histórica con estilo narrativo: compárala con Llinás." },
    { t: "Muy Interesante · National Geographic", src: "pasa", fmt: "Revistas", req: false, nota: "Divulgación científica e histórica: elige un artículo para comparar sus recursos expositivos con los de Llinás en el Foro 2." },
    { t: "texto expositivo", src: "elibro", req: false, nota: "Busca un manual de redacción académica con el capítulo de tipologías textuales." }
  ],
  actividades: [
    { id: "w3-lec", tipo: "lectura", titulo: "Lectura obligatoria", desc: "Capítulo 1 de El cerebro y el mito del yo (Llinás)." },
    { id: "w3-quiz", tipo: "quiz", titulo: "Comprobación de lectura 3" },
    { id: "w3-foro", tipo: "foro", titulo: "Foro 2 · Explicar lo complejo", desc: "Elige un fragmento de Llinás (o de un artículo de divulgación de Pasa la Página: Muy Interesante o National Geographic) que te haya resultado claro y otro que te haya costado. Explica qué recursos expositivos hacen claro el primero (analogía, ejemplo, definición) y qué dificulta el segundo. Propón cómo lo reescribirías para un estudiante de colegio. Responde a dos compañeros. (150–250 palabras)" },
    { id: "w3-proy", tipo: "proy", etapa: "propuesta", titulo: "Proyecto final · Elige tu novela", desc: "Selecciona la novela del curso que leerás de forma transversal hasta la semana 8 y escribe una pregunta inicial que te gustaría responder con tu ensayo." },
    { id: "w3-bit", tipo: "bit", titulo: "Bitácora semana 3" }
  ],
  quiz: [
    { q: "¿Cuál es el propósito principal del texto expositivo?", o: ["Convencer al lector de una postura", "Informar y explicar un tema de forma ordenada", "Narrar hechos ficticios", "Expresar emociones del autor"], a: 1, fb: "El expositivo explica; el argumentativo busca convencer." },
    { q: "Un artículo dirigido a neurólogos, con terminología técnica y referencias a estudios clínicos, es un texto expositivo:", o: ["Divulgativo", "Especializado", "Literario", "Instructivo"], a: 1, fb: "Su público experto y su léxico técnico lo hacen especializado." },
    { q: "«Una neurona funciona como un cable que transmite señales eléctricas.» ¿Qué recurso explicativo se usa?", o: ["Definición", "Clasificación", "Analogía", "Cita de autoridad"], a: 2, fb: "Explica algo desconocido comparándolo con algo familiar." },
    { q: "¿Qué rasgo lingüístico es típico del texto expositivo?", o: ["Uso predominante de la primera persona y de adjetivos valorativos", "Presente atemporal y construcciones impersonales", "Diálogos entre personajes", "Abundancia de figuras literarias"], a: 1, fb: "El presente atemporal y lo impersonal dan generalidad y aparente objetividad." },
    { q: "¿Por qué conviene preguntarse qué omite un texto expositivo?", o: ["Porque los textos expositivos siempre mienten", "Porque toda exposición selecciona información y esa selección puede orientar al lector", "Porque así se memoriza mejor", "No conviene: un texto expositivo es neutral por definición"], a: 1, fb: "Objetivo no es lo mismo que neutral: la selección también comunica." }
  ],
  docente: "Proyecta dos fragmentos (uno divulgativo y uno especializado) sobre el mismo tema y pide que los comparen en parejas. Revisa las propuestas de novela para equilibrar grupos de discusión."
},
/* ---------------- SEMANA 4 ---------------- */
{
  n: 4, mod: 2,
  titulo: "Estrategias para comprender un texto expositivo",
  objetivos: [
    "Aplicar estrategias de prelectura, lectura y poslectura.",
    "Elaborar resúmenes y mapas conceptuales fieles al texto.",
    "Distinguir paráfrasis, cita y plagio."
  ],
  teoria: `
<h4>Antes de leer</h4>
<p>Revisa título, subtítulos, índice, gráficos y autor. Formula hipótesis: ¿qué sé del tema?, ¿qué espero encontrar? Define un propósito de lectura.</p>
<h4>Durante la lectura</h4>
<ul><li>Subraya solo la idea principal de cada párrafo y escribe en el margen una palabra clave.</li>
<li>Marca los conectores: te muestran la estructura lógica.</li>
<li>Resuelve vocabulario por contexto antes de ir al diccionario.</li>
<li>Detente cada sección y reformula en voz alta lo que entendiste.</li></ul>
<h4>Después de leer</h4>
<p><strong>Resumen:</strong> conserva las ideas principales, en tus palabras, sin opiniones ni ejemplos accesorios, en un 20–25 % de la extensión original. <strong>Mapa conceptual:</strong> conceptos en nodos jerarquizados unidos por palabras de enlace que forman proposiciones («la neurona → <em>transmite</em> → impulsos»). <strong>Cuadro comparativo:</strong> útil cuando el texto contrasta categorías.</p>
<h4>Paráfrasis, cita y plagio</h4>
<p>Citar es reproducir textualmente con comillas y referencia. Parafrasear es reformular la idea con palabras y estructura propias, también con referencia. Copiar sin referencia, o cambiar unas palabras manteniendo la estructura, es plagio. En la UAO se usa con frecuencia la norma APA.</p>
<div class="clave"><strong>Técnica 3-2-1.</strong> Al terminar una lectura escribe 3 ideas que aprendiste, 2 conexiones con algo que ya sabías y 1 pregunta que te queda. Úsala en tu bitácora.</div>`,
  lecturas: [
    { t: "Sapiens. De animales a dioses (Latino): Una breve historia de la humanidad", a: "Noah Harari, Yuval", src: "libby", fmt: "Audiolibro", req: true, nota: "Parte 1, capítulo 1. Material base del Taller 2." },
    { t: "El error de Descartes: La emoción, la razón y el cerebro humano", a: "Damasio, Antonio", src: "libby", fmt: "Libro electrónico", req: false, nota: "Introducción. Exposición científica con mayor densidad conceptual." },
    { t: "La inteligencia emocional: Por qué es más importante que el cociente intelectual", a: "Goleman, Daniel", src: "libby", fmt: "Libro electrónico", req: false, nota: "Compara su forma de exponer con Damasio: ¿divulgación, autoayuda o ambas?" },
    { t: "Muy Interesante · National Geographic", src: "pasa", fmt: "Revistas", req: false, nota: "Elige un artículo breve para practicar resumen y mapa conceptual antes del taller." },
    { t: "estrategias de comprensión lectora", src: "elibro", req: false, nota: "Apoyo para resumen y mapa conceptual." }
  ],
  actividades: [
    { id: "w4-lec", tipo: "lectura", titulo: "Lectura obligatoria", desc: "Sapiens, parte 1, capítulo 1." },
    { id: "w4-quiz", tipo: "quiz", titulo: "Comprobación de lectura 4" },
    { id: "w4-taller", tipo: "taller", gid: "t2", titulo: "Taller 2 · Comprender y reconstruir un texto expositivo", desc: "Trabaja con el capítulo 1 de Sapiens (o el capítulo 1 de Llinás si ya lo dominas):", pasos: [
      "Prelectura: tres hipótesis sobre el contenido a partir del título y los subtítulos.",
      "Cinco palabras desconocidas: significado inferido por contexto y luego verificado.",
      "Resumen de 200–250 palabras con tus propias palabras.",
      "Mapa conceptual descrito como proposiciones (concepto → enlace → concepto), mínimo 10 proposiciones. Puedes adjuntar imagen en el aula virtual.",
      "Una cita textual y una paráfrasis de la misma idea, ambas con referencia APA.",
      "Mirada crítica: ¿qué fuentes usa el autor y qué afirmación te parece menos sustentada? (80–120 palabras)"
    ] },
    { id: "w4-bit", tipo: "bit", titulo: "Bitácora semana 4" }
  ],
  quiz: [
    { q: "¿Qué estrategia corresponde a la prelectura?", o: ["Hacer un resumen", "Revisar título, subtítulos y gráficos para formular hipótesis", "Escribir una opinión", "Buscar cada palabra en el diccionario mientras se lee"], a: 1, fb: "La prelectura activa conocimientos previos y orienta la lectura." },
    { q: "Un buen resumen:", o: ["Incluye la opinión del lector sobre el tema", "Conserva las ideas principales con palabras propias", "Copia las oraciones más importantes", "Mantiene todos los ejemplos del original"], a: 1, fb: "El resumen es fiel al texto, breve y sin opiniones." },
    { q: "En un mapa conceptual, las palabras de enlace sirven para:", o: ["Decorar el esquema", "Formar proposiciones con sentido entre conceptos", "Indicar el número de página", "Reemplazar los conceptos"], a: 1, fb: "Concepto + enlace + concepto = una proposición que se puede leer." },
    { q: "Tomar un párrafo, cambiar algunos sinónimos y no citar la fuente es:", o: ["Paráfrasis", "Resumen", "Plagio", "Cita indirecta"], a: 2, fb: "Sin referencia y con la misma estructura, es plagio." },
    { q: "«Debido al aumento de la temperatura del océano, los arrecifes de coral pierden su color.» ¿Qué relación lógica expresa?", o: ["Contraste", "Causa-efecto", "Enumeración", "Comparación"], a: 1, fb: "«Debido a» introduce la causa del fenómeno." }
  ],
  docente: "Cierre del módulo 2. Dedica una sesión sincrónica a revisar mapas conceptuales. Recuerda que el Taller 1 debe estar devuelto antes de esta entrega."
},
/* ---------------- SEMANA 5 ---------------- */
{
  n: 5, mod: 3,
  titulo: "El texto argumentativo: tipos y estructura",
  objetivos: [
    "Reconocer los principales tipos de textos argumentativos.",
    "Identificar tesis, argumentos, contraargumentos y conclusión.",
    "Analizar argumentos con el modelo de Toulmin."
  ],
  teoria: `
<p>El texto argumentativo busca <strong>convencer o persuadir</strong> al lector de una postura mediante razones. Tipos frecuentes: el <strong>ensayo</strong>, el <strong>artículo científico</strong> (discusión de resultados), la <strong>columna de opinión</strong>, el <strong>editorial</strong>, el <strong>texto publicitario</strong> y la <strong>propaganda política</strong>.</p>
<h4>Estructura básica</h4>
<ol><li><strong>Tesis:</strong> la postura que el autor defiende. Puede estar al inicio (estructura deductiva), al final (inductiva) o en ambos (encuadrada).</li>
<li><strong>Argumentos:</strong> razones que sustentan la tesis.</li>
<li><strong>Contraargumentos y refutación:</strong> objeciones que el autor anticipa y responde.</li>
<li><strong>Conclusión:</strong> reafirma la tesis o propone una acción.</li></ol>
<h4>Tipos de argumentos</h4>
<p>De autoridad (cita a un experto o institución), de ejemplo, de analogía, de causa-efecto, de datos o estadísticas, de valores (apela a principios compartidos) y de experiencia personal.</p>
<h4>Modelo de Toulmin</h4>
<table class="tbl"><thead><tr><th>Elemento</th><th>Pregunta</th><th>Ejemplo</th></tr></thead><tbody>
<tr><td>Conclusión</td><td>¿Qué se afirma?</td><td>Hay que limitar el uso del celular en colegios.</td></tr>
<tr><td>Datos</td><td>¿En qué se basa?</td><td>Estudios asocian el uso intensivo con menor concentración.</td></tr>
<tr><td>Garantía</td><td>¿Qué principio conecta datos y conclusión?</td><td>La escuela debe proteger las condiciones para aprender.</td></tr>
<tr><td>Respaldo</td><td>¿Qué apoya la garantía?</td><td>Leyes y fines educativos del sistema escolar.</td></tr>
<tr><td>Calificador</td><td>¿Con qué fuerza?</td><td>«Probablemente», «en la mayoría de casos».</td></tr>
<tr><td>Refutación</td><td>¿En qué casos no aplica?</td><td>Salvo usos pedagógicos guiados.</td></tr>
</tbody></table>
<div class="clave"><strong>Para el foro.</strong> Haidt y Han coinciden en preocuparse por la vida digital, pero argumentan desde lugares muy distintos: un psicólogo social con datos y un filósofo con conceptos. Leerlos juntos es el primer paso hacia la intertextualidad.</div>`,
  lecturas: [
    { t: "La generación ansiosa: Por qué las redes sociales están causando una epidemia de enfermedades mentales entre nuestros jóvenes", a: "Haidt, Jonathan", src: "libby", fmt: "Libro electrónico", req: true, nota: "Introducción y capítulo 1. Identifica la tesis y tres tipos de argumento distintos." },
    { t: "Infocracia: La digitalización y la crisis de la democracia", a: "Han, Byung-Chul", src: "libby", fmt: "Audiolibro", req: true, nota: "Capítulo 1 (si ya lo leíste en la semana 1, relee con foco en la tesis)." },
    { t: "Amor líquido: Acerca de la fragilidad de los vínculos humanos", a: "Bauman, Zygmunt", src: "libby", fmt: "Libro electrónico", req: false, nota: "Ensayo sociológico; observa cómo construye su tesis con metáforas." },
    { t: "Ética para Amador", a: "Savater, Fernando", src: "libby", fmt: "Audiolibro", req: false, nota: "Ejemplo de argumentación dirigida a un joven lector." },
    { t: "Los Danieles · Apple Magazine", src: "pasa", fmt: "Revistas", req: false, nota: "Busca una columna de Los Danieles o un artículo de Apple Magazine (en inglés) sobre redes sociales, pantallas o tecnología y úsalo como tercera voz en el Foro 3. Fíjate en desde qué intereses habla cada medio." },
    { t: "argumentación ensayo académico", src: "elibro", req: false, nota: "Capítulo sobre estructura del ensayo argumentativo." }
  ],
  actividades: [
    { id: "w5-lec", tipo: "lectura", titulo: "Lecturas obligatorias", desc: "Haidt (introducción y cap. 1) y Han (cap. 1)." },
    { id: "w5-quiz", tipo: "quiz", titulo: "Comprobación de lectura 5" },
    { id: "w5-foro", tipo: "foro", titulo: "Foro 3 · Debate: ¿las redes nos están dañando?", desc: "Formula la tesis de Haidt y la de Han en una oración cada una. Elige un argumento de cada autor y clasifícalo (autoridad, datos, analogía…). Luego toma tu propia postura con al menos dos argumentos y anticipa un contraargumento. Responde a un compañero que piense distinto, refutando con respeto. (200–300 palabras)" },
    { id: "w5-bit", tipo: "bit", titulo: "Bitácora semana 5" }
  ],
  quiz: [
    { q: "La tesis de un texto argumentativo es:", o: ["El tema general del texto", "La postura que el autor defiende", "El primer párrafo", "La conclusión numérica de un estudio"], a: 1, fb: "Tema = de qué habla; tesis = qué sostiene sobre ese tema." },
    { q: "«Según la Organización Mundial de la Salud, dormir menos de seis horas afecta el rendimiento académico.» ¿Qué tipo de argumento es?", o: ["De analogía", "De autoridad", "De experiencia personal", "De valores"], a: 1, fb: "Se apoya en una institución reconocida." },
    { q: "En el modelo de Toulmin, la garantía es:", o: ["El dato estadístico", "El principio que conecta los datos con la conclusión", "La opinión contraria", "El título del texto"], a: 1, fb: "La garantía es el puente, a menudo implícito, entre datos y conclusión." },
    { q: "Un texto que presenta casos y datos y solo al final enuncia su postura tiene estructura:", o: ["Deductiva", "Inductiva", "Encuadrada", "Cronológica"], a: 1, fb: "Va de lo particular a la tesis general." },
    { q: "¿Para qué incluye un autor contraargumentos en su texto?", o: ["Para confundir al lector", "Para mostrar que considera otras posturas y fortalecer la suya al refutarlas", "Para cambiar de tesis", "Para alargar el texto"], a: 1, fb: "Anticipar y refutar objeciones aumenta la credibilidad del argumento." }
  ],
  docente: "Organiza el foro en dos bandos iniciales para provocar réplica, pero exige que cada estudiante formule la postura contraria con justicia antes de refutarla (antídoto contra el hombre de paja)."
},
/* ---------------- SEMANA 6 ---------------- */
{
  n: 6, mod: 3,
  titulo: "Estrategias persuasivas, intertextualidad y contexto",
  objetivos: [
    "Reconocer estrategias persuasivas (ethos, pathos, logos) en publicidad y política.",
    "Correlacionar textos argumentativos con posturas distintas sobre un mismo tema.",
    "Relacionar un texto con su contexto sociocultural de producción."
  ],
  teoria: `
<h4>Ethos, pathos y logos</h4>
<ul><li><strong>Ethos:</strong> credibilidad del emisor («como médico con 20 años de experiencia…»).</li>
<li><strong>Pathos:</strong> apelación a las emociones del receptor («imagina a tu hijo sin agua potable»).</li>
<li><strong>Logos:</strong> razones, datos y lógica («el 40 % de los hogares rurales no tiene acueducto»).</li></ul>
<p>Los tres son legítimos; el problema surge cuando el pathos o el ethos reemplazan por completo al logos.</p>
<h4>Publicidad, propaganda y autoayuda</h4>
<p>La publicidad y la propaganda política condensan argumentos en eslóganes, imágenes y promesas. La literatura de autoayuda a menudo usa testimonios, generalizaciones y afirmaciones no verificables («tu mente crea tu realidad»). Preguntas útiles: ¿qué se promete?, ¿con qué evidencia?, ¿quién gana si lo creo?, ¿se puede comprobar que es falso?</p>
<h4>Intertextualidad: leer textos en diálogo</h4>
<p>Para correlacionar textos argumentativos compara: <strong>tesis</strong>, <strong>tipo de evidencia</strong>, <strong>supuestos</strong> (lo que dan por hecho), <strong>valores</strong> que defienden y <strong>lo que cada uno omite</strong>. Una matriz de comparación ayuda a ver acuerdos, desacuerdos y vacíos.</p>
<h4>Contexto sociocultural</h4>
<p>Todo texto se escribe desde un lugar, un tiempo y unos intereses. Indaga: ¿quién es el autor y desde qué disciplina o ideología escribe?, ¿cuándo y dónde se publicó?, ¿a qué debate respondía?, ¿quién lo financia o lo difunde? Esto no invalida el argumento, pero ayuda a entender sus énfasis.</p>
<div class="clave"><strong>Pregunta de cierre del módulo.</strong> Stiglitz propone reformar el capitalismo; Saito propone decrecer. ¿Qué supuestos sobre el crecimiento, el bienestar y el planeta tiene cada uno?</div>`,
  lecturas: [
    { t: "Capitalismo progresista: La respuesta a la era del malestar", a: "Stiglitz, Joseph E.", src: "libby", fmt: "Audiolibro", req: true, nota: "Introducción. Tesis y evidencias económicas." },
    { t: "Slow Down: Cómo el decrecimiento puede salvar el planeta", a: "Saito, Kohei", src: "libby", fmt: "Libro electrónico", req: true, nota: "Introducción. Contrasta con Stiglitz en una matriz." },
    { t: "Piense y hágase rico", a: "Hill, Napoleon", src: "libby", fmt: "Libro electrónico", req: false, nota: "Corpus para el Taller 3: analiza un capítulo como texto persuasivo." },
    { t: "Deja de ser tú: La mente crea la realidad", a: "Dispenza, Joe", src: "libby", fmt: "Audiolibro", req: false, nota: "Alternativa para el Taller 3: examina qué evidencia ofrece para sus afirmaciones." },
    { t: "Las 48 leyes del poder", a: "Greene, Robert", src: "libby", fmt: "Libro electrónico", req: false, nota: "Retórica del poder: ejemplos históricos usados como argumento." },
    { t: "Forbes · Apple Magazine", src: "pasa", fmt: "Revistas", req: false, nota: "Corpus para la parte B del Taller 3: anuncios publicitarios, perfiles empresariales (Forbes) y reseñas de productos tecnológicos (Apple Magazine, en inglés). Observa cómo se mezclan publicidad y contenido editorial." },
    { t: "publicidad persuasión propaganda", src: "elibro", req: false, nota: "Retórica publicitaria y discurso político." }
  ],
  actividades: [
    { id: "w6-lec", tipo: "lectura", titulo: "Lecturas obligatorias", desc: "Introducciones de Stiglitz y Saito." },
    { id: "w6-quiz", tipo: "quiz", titulo: "Comprobación de lectura 6" },
    { id: "w6-taller", tipo: "taller", gid: "t3", titulo: "Taller 3 · Anatomía de la persuasión", desc: "Parte A con Stiglitz y Saito; parte B con un texto persuasivo a elección: capítulo de autoayuda de la lista, anuncio, perfil empresarial o reseña de producto de Forbes o Apple Magazine (Pasa la Página) o pieza de propaganda política reciente.", pasos: [
      "A1. Matriz comparativa Stiglitz / Saito: tesis, evidencias, supuestos, valores y omisiones.",
      "A2. Contexto: quién es cada autor, desde qué disciplina y país escribe, y a qué debate responde.",
      "A3. Esquema Toulmin de un argumento central de uno de los dos autores.",
      "B1. Identifica la pieza persuasiva elegida (revista, edición y página en Pasa la Página, o enlace/referencia).",
      "B2. Señala ejemplos de ethos, pathos y logos.",
      "B3. Detecta al menos dos falacias o afirmaciones no verificables y explica por qué lo son.",
      "Conclusión: ¿qué texto te convenció más y por qué? Distingue entre lo que te persuadió emocionalmente y lo que te convenció racionalmente (100–150 palabras)."
    ] },
    { id: "w6-proy", tipo: "proy", etapa: "borrador", titulo: "Proyecto final · Tesis y esquema", desc: "Escribe la tesis de tu ensayo sobre la novela, tres argumentos y el texto argumentativo del curso con el que la pondrás en diálogo (Han, Haidt, Bauman, Stiglitz, Saito u otro)." },
    { id: "w6-bit", tipo: "bit", titulo: "Bitácora semana 6" }
  ],
  quiz: [
    { q: "«Imagina a tu familia sin un techo seguro esta Navidad. Dona hoy.» ¿Qué estrategia predomina?", o: ["Ethos", "Pathos", "Logos", "Refutación"], a: 1, fb: "Apela a la emoción del receptor." },
    { q: "«O estás con nosotros o estás contra el progreso del país.» ¿Qué falacia contiene?", o: ["Falso dilema", "Ad hominem", "Falsa causa", "Apelación a la autoridad"], a: 0, fb: "Reduce un abanico de posturas a solo dos." },
    { q: "«9 de cada 10 dentistas recomiendan esta crema.» ¿Qué pregunta crítica es la más pertinente?", o: ["¿De qué color es la crema?", "¿Cuántos dentistas se consultaron, cómo se eligieron y quién pagó el estudio?", "¿Cuánto cuesta?", "¿Qué famoso la usa?"], a: 1, fb: "La muestra y el financiamiento determinan la validez del dato." },
    { q: "«Si no tienes éxito es porque no lo deseas con suficiente fuerza: tu mente crea tu realidad.» El problema principal de esta afirmación es que:", o: ["Es demasiado larga", "No se puede comprobar ni refutar y atribuye una causa única a un fenómeno complejo", "Usa la segunda persona", "Es una cita de autoridad"], a: 1, fb: "Es no falsable y simplifica la causalidad (falsa causa)." },
    { q: "Al correlacionar dos textos argumentativos sobre el mismo tema, lo más útil es comparar:", o: ["Solo la extensión de cada texto", "Tesis, evidencias, supuestos, valores y omisiones", "El número de citas de cada uno", "La fecha de nacimiento de los autores"], a: 1, fb: "Esos cinco elementos muestran dónde coinciden y dónde divergen realmente." },
    { q: "¿Por qué es importante conocer el contexto de producción de un texto argumentativo?", o: ["Para descartar automáticamente a los autores con intereses", "Para comprender desde dónde y para qué se argumenta, sin que eso invalide el argumento por sí solo", "Porque el contexto reemplaza el análisis del argumento", "No es importante"], a: 1, fb: "Descartar un argumento solo por su origen sería una falacia genética." }
  ],
  docente: "Revisa los esquemas del proyecto final esta semana y da retroalimentación breve (tesis clara, relación pertinente con el texto argumentativo) antes del cierre."
},
/* ---------------- SEMANA 7 ---------------- */
{
  n: 7, mod: 4,
  titulo: "El texto literario: ficción, figuras y voces narrativas",
  objetivos: [
    "Reconocer la libertad creativa y el pacto de ficción.",
    "Identificar figuras literarias y su función en el sentido del texto.",
    "Analizar la estructura narrativa y las voces del narrador."
  ],
  teoria: `
<h4>Libertad creativa y pacto de ficción</h4>
<p>El texto literario no busca informar ni probar: crea un mundo con sus propias reglas. El lector acepta un <strong>pacto de ficción</strong>: sabe que lo narrado es inventado y aun así lo vive como verosímil. La literatura no es verdadera o falsa, sino <strong>verosímil</strong> o no dentro de su lógica. Sin embargo, la ficción dice mucho sobre la realidad: Rulfo inventa Comala para hablar del México rural real.</p>
<h4>Figuras literarias</h4>
<table class="tbl"><thead><tr><th>Figura</th><th>Ejemplo</th></tr></thead><tbody>
<tr><td>Metáfora</td><td>«Tus ojos son dos luceros».</td></tr>
<tr><td>Símil</td><td>«Callado como una piedra».</td></tr>
<tr><td>Personificación</td><td>«El viento lloraba en la ventana».</td></tr>
<tr><td>Hipérbole</td><td>«Te lo he dicho un millón de veces».</td></tr>
<tr><td>Anáfora</td><td>Repetición al inicio de versos o frases.</td></tr>
<tr><td>Ironía</td><td>Decir lo contrario de lo que se quiere significar.</td></tr>
</tbody></table>
<p>Lo crítico no es nombrar la figura sino explicar <strong>qué efecto produce</strong> en el sentido.</p>
<h4>Estructura del texto narrativo</h4>
<p>Planteamiento, nudo y desenlace. Puede empezar <em>in medias res</em> (en mitad de la acción) o tener final abierto. Distingue la <strong>historia</strong> (los hechos en orden cronológico) del <strong>relato</strong> (cómo y en qué orden se cuentan).</p>
<h4>Voces narrativas</h4>
<ul><li><strong>Primera persona protagonista:</strong> «Yo no sabía que aquella tarde…».</li>
<li><strong>Primera persona testigo:</strong> narra lo que vio de otro.</li>
<li><strong>Tercera persona omnisciente:</strong> conoce pensamientos y sentimientos de todos.</li>
<li><strong>Tercera persona equisciente:</strong> sabe solo lo que sabe un personaje.</li>
<li><strong>Segunda persona:</strong> «Tú caminas por la calle…».</li></ul>
<div class="clave"><strong>Pregunta crítica.</strong> ¿Por qué el autor eligió esa voz? En «No oyes ladrar los perros», casi todo es diálogo: el narrador se retira y deja que el silencio entre padre e hijo cargue el sentido.</div>`,
  lecturas: [
    { t: "El llano en llamas", a: "Rulfo, Juan", src: "libby", fmt: "Audiolibro", req: true, nota: "Cuentos «No oyes ladrar los perros» y «Diles que no me maten»." },
    { t: "Pájaros en la boca y otros cuentos", a: "Schweblin, Samanta", src: "libby", fmt: "Audiolibro", req: true, nota: "Cuento «Pájaros en la boca». Observa cómo lo inquietante surge de lo cotidiano." },
    { t: "Primera persona", a: "García Robayo, Margarita", src: "libby", fmt: "Libro electrónico", req: false, nota: "Autora colombiana: la frontera entre autobiografía y ficción." },
    { t: "Clases de literatura: Berkeley, 1980", a: "Cortázar, Julio", src: "libby", fmt: "Audiolibro", req: false, nota: "Clase sobre el cuento: «el cuento gana por nocaut»." },
    { t: "El viaje del escritor: Las estructuras narrativas clásicas de las grandes historias", a: "Vogler, Christopher", src: "libby", fmt: "Libro electrónico", req: false, nota: "Estructura del viaje del héroe aplicada a tu novela." },
    { t: "análisis literario narratología", src: "elibro", req: false, nota: "Manual de análisis del relato." }
  ],
  actividades: [
    { id: "w7-lec", tipo: "lectura", titulo: "Lecturas obligatorias", desc: "Dos cuentos de Rulfo y uno de Schweblin." },
    { id: "w7-quiz", tipo: "quiz", titulo: "Comprobación de lectura 7" },
    { id: "w7-foro", tipo: "foro", titulo: "Foro 4 · Lo que el cuento no dice", desc: "Elige uno de los cuentos. Identifica un hecho que el narrador no cuenta directamente pero que el lector debe inferir. ¿Qué efecto produce ese silencio? Relaciónalo con un aspecto del contexto (violencia rural, familia, miedo a lo diferente). Responde a dos compañeros que hayan elegido un cuento distinto. (150–250 palabras)" },
    { id: "w7-taller", tipo: "taller", gid: "t4", titulo: "Taller 4 · Análisis de un cuento", desc: "Analiza uno de los tres cuentos obligatorios:", pasos: [
      "Resumen de la historia en orden cronológico (80–100 palabras) y explicación de cómo el relato la reordena.",
      "Estructura: planteamiento, nudo y desenlace; ¿el final es cerrado o abierto?",
      "Tipo de narrador y efecto de esa elección.",
      "Tres figuras literarias con cita textual y su función en el sentido.",
      "Espacio y tiempo: ¿cómo se construyen y qué significan?",
      "Ficción y realidad: ¿qué dice el cuento sobre la realidad social de su contexto? (100–150 palabras)"
    ] },
    { id: "w7-bit", tipo: "bit", titulo: "Bitácora semana 7" }
  ],
  quiz: [
    { q: "El pacto de ficción significa que el lector:", o: ["Cree que todo lo narrado ocurrió de verdad", "Acepta que lo narrado es inventado y aun así lo vive como verosímil", "Debe verificar los datos del cuento", "Rechaza lo que no sea realista"], a: 1, fb: "La ficción se juzga por su verosimilitud interna, no por su veracidad." },
    { q: "«Yo no sabía que aquella tarde cambiaría mi vida.» ¿Qué narrador es?", o: ["Tercera persona omnisciente", "Primera persona protagonista", "Segunda persona", "Tercera persona equisciente"], a: 1, fb: "Narra en primera persona y es protagonista de los hechos." },
    { q: "«El viento lloraba en las ventanas de la casa vacía.» ¿Qué figura literaria predomina?", o: ["Hipérbole", "Símil", "Personificación", "Anáfora"], a: 2, fb: "Atribuye una acción humana (llorar) al viento." },
    { q: "Un relato que comienza en mitad de la acción, sin presentación previa, empieza:", o: ["Ab ovo", "In medias res", "Con analepsis", "Con final abierto"], a: 1, fb: "In medias res: «en mitad del asunto»." },
    { q: "Un narrador que conoce los pensamientos y sentimientos de todos los personajes es:", o: ["Testigo", "Equisciente", "Omnisciente", "Protagonista"], a: 2, fb: "Omnisciente: lo sabe todo." },
    { q: "Al analizar críticamente una figura literaria, lo más importante es:", o: ["Nombrarla correctamente", "Explicar qué efecto produce en el sentido del texto", "Contar cuántas hay", "Copiarla en el cuaderno"], a: 1, fb: "Nombrar es el punto de partida; interpretar su función es la lectura crítica." }
  ],
  docente: "Si es posible, escuchen en clase un fragmento del audiolibro de Rulfo: la oralidad es parte del sentido. Recuerda la entrega final del ensayo la próxima semana."
},
/* ---------------- SEMANA 8 ---------------- */
{
  n: 8, mod: 4,
  titulo: "Espacio, tiempo, símbolo e imagen lírica · Cierre del curso",
  objetivos: [
    "Analizar la construcción del espacio y el tiempo en la narrativa.",
    "Interpretar símbolos e imágenes en el discurso lírico.",
    "Integrar las competencias del curso en un ensayo crítico."
  ],
  teoria: `
<h4>El tiempo en la narrativa</h4>
<ul><li><strong>Tiempo de la historia</strong> (cuánto duran los hechos) frente a <strong>tiempo del relato</strong> (cuánto espacio textual ocupan).</li>
<li><strong>Analepsis</strong> (retrospección o flashback) y <strong>prolepsis</strong> (anticipación).</li>
<li><strong>Elipsis</strong> (saltos temporales) y <strong>resumen</strong> frente a <strong>escena</strong>.</li></ul>
<p>En <em>Pedro Páramo</em>, el tiempo se fragmenta: vivos y muertos hablan desde distintos momentos, y el lector reconstruye la historia como un rompecabezas.</p>
<h4>El espacio</h4>
<p>El espacio no es solo decorado: puede reflejar el estado de los personajes o simbolizar un orden social. La casa en ruinas, el pueblo abandonado, el llano seco son espacios que significan.</p>
<h4>Símbolo e imagen en la lírica</h4>
<p>En la poesía habla un <strong>yo lírico</strong>, voz que no debe confundirse con el autor. La <strong>imagen</strong> es una representación sensorial («la noche de agua»); el <strong>símbolo</strong> es una imagen que remite a un sentido más amplio y estable (el capitán como líder caído en Whitman; la noche y el silencio en Pizarnik).</p>
<h4>Del análisis al ensayo crítico</h4>
<p>Tu ensayo final integra todo el curso: una tesis interpretativa sobre la novela (módulo 4), argumentos con evidencia textual (módulo 3), exposición clara del contexto (módulo 2) y lectura atenta de ideas, conectores y voces (módulo 1).</p>
<div class="clave"><strong>Estructura sugerida del ensayo (1.200–1.500 palabras):</strong> introducción con tesis · desarrollo con tres argumentos apoyados en citas de la novela · diálogo con un texto argumentativo del curso · contraargumento y refutación · conclusión · referencias APA.</div>`,
  lecturas: [
    { t: "Pedro Páramo", a: "Rulfo, Juan", src: "libby", fmt: "Libro electrónico / Audiolibro", req: true, nota: "Primeros 20 fragmentos: identifica cambios de tiempo y de voz." },
    { t: "Poesía completa", a: "Pizarnik, Alejandra", src: "libby", fmt: "Libro electrónico", req: true, nota: "Selección de Árbol de Diana: elige tres poemas e identifica imágenes y símbolos." },
    { t: "¡Oh, capitán!, ¡mi capitán!", a: "Whitman, Walt", src: "libby", fmt: "Libro electrónico", req: false, nota: "Símbolo y contexto histórico (asesinato de Lincoln)." },
    { t: "La mansión de Araucaima y otros relatos", a: "Mutis, Alvaro", src: "libby", fmt: "Libro electrónico", req: false, nota: "El espacio como protagonista en la narrativa colombiana." },
    { t: "La ciencia de contar historias", a: "Storr, Will", src: "libby", fmt: "Libro electrónico", req: false, nota: "Por qué las historias nos afectan: puente entre literatura y ciencia." },
    { t: "poesía análisis lírico símbolo", src: "elibro", req: false, nota: "Apoyo teórico para el análisis lírico." }
  ],
  actividades: [
    { id: "w8-lec", tipo: "lectura", titulo: "Lecturas obligatorias", desc: "Fragmentos de Pedro Páramo y tres poemas de Pizarnik." },
    { id: "w8-quiz", tipo: "quiz", titulo: "Comprobación de lectura 8" },
    { id: "w8-proy", tipo: "proy", etapa: "final", titulo: "Proyecto final · Ensayo crítico", desc: "Entrega tu ensayo (1.200–1.500 palabras) sobre la novela elegida, en diálogo con un texto argumentativo del curso. Pega aquí la versión final o un resumen y súbelo en el aula virtual." },
    { id: "w8-auto", tipo: "auto", titulo: "Autoevaluación final de competencias", desc: "Vuelve a valorar tus 12 competencias y compara con tu diagnóstico inicial en «Mi progreso»." },
    { id: "w8-bit", tipo: "bit", titulo: "Bitácora semana 8 · Balance del curso" }
  ],
  quiz: [
    { q: "Un fragmento en el que el narrador recuerda la infancia del protagonista, interrumpiendo el presente de la historia, es una:", o: ["Prolepsis", "Analepsis", "Elipsis", "Escena"], a: 1, fb: "La analepsis (flashback) vuelve al pasado." },
    { q: "Si un relato resume diez años en una línea y dedica diez páginas a una sola tarde, juega con la diferencia entre:", o: ["Narrador y personaje", "Tiempo de la historia y tiempo del relato", "Símbolo e imagen", "Ficción y realidad"], a: 1, fb: "La duración de los hechos no coincide con el espacio textual que ocupan." },
    { q: "La diferencia entre imagen y símbolo es que el símbolo:", o: ["Siempre es un color", "Remite a un sentido más amplio y estable más allá de lo sensorial", "Solo aparece en novelas", "No tiene relación con los sentidos"], a: 1, fb: "Toda imagen es sensorial; el símbolo además representa una idea más amplia." },
    { q: "El yo lírico de un poema es:", o: ["Siempre el autor real", "La voz que habla en el poema, distinta del autor", "El lector", "El título del poema"], a: 1, fb: "Como el narrador en la prosa, el yo lírico es una construcción del texto." },
    { q: "«La casa se derrumbaba al mismo ritmo que la familia.» En este caso el espacio:", o: ["Es solo decorativo", "Refleja simbólicamente la decadencia de los personajes", "Es irrelevante para el sentido", "Indica el tiempo cronológico"], a: 1, fb: "El espacio funciona como correlato del destino de los personajes." }
  ],
  docente: "Califica el ensayo con la rúbrica del proyecto final. Pide a cada estudiante enviar su código de reporte desde «Mi progreso» y cárgalos en el panel docente para el seguimiento final."
}
];

const RUBRICAS = {
  taller: {
    titulo: "Rúbrica de talleres",
    criterios: [
      ["Comprensión literal", "Identifica con precisión ideas, datos y estructura.", "Identifica la mayoría con errores menores.", "Identificación parcial o imprecisa.", "No identifica o confunde la información."],
      ["Inferencia", "Deduce sentidos implícitos con fundamento en el texto.", "Infiere correctamente en la mayoría de casos.", "Inferencias superficiales o poco sustentadas.", "No realiza inferencias."],
      ["Valoración crítica", "Evalúa argumentos, intención y contexto con postura propia sustentada.", "Toma postura con sustento parcial.", "Opina sin sustentar.", "No valora el texto."],
      ["Evidencia textual", "Cita y referencia de forma pertinente (APA).", "Cita con fallas menores de formato.", "Citas escasas o mal referenciadas.", "Sin evidencia textual."],
      ["Redacción y ortografía", "Texto claro, cohesionado, sin errores.", "Pocos errores que no afectan el sentido.", "Errores frecuentes que dificultan la lectura.", "Redacción confusa y muchos errores."]
    ]
  },
  foro: {
    titulo: "Rúbrica de foros",
    criterios: [
      ["Aporte original", "Responde todas las preguntas con ideas propias y profundidad.", "Responde todo con desarrollo moderado.", "Responde parcialmente.", "Aporte irrelevante o ausente."],
      ["Uso de las lecturas", "Cita y relaciona las lecturas con precisión.", "Menciona las lecturas con alguna cita.", "Alusión general sin citas.", "No usa las lecturas."],
      ["Interacción", "Responde a dos o más compañeros aportando argumentos.", "Responde a dos compañeros de forma breve.", "Responde a uno.", "No interactúa."],
      ["Claridad y respeto", "Escritura clara, respetuosa y dentro de la extensión.", "Clara con detalles mejorables.", "Poco clara o fuera de extensión.", "Confusa o irrespetuosa."]
    ]
  },
  proy: {
    titulo: "Rúbrica del ensayo crítico final",
    criterios: [
      ["Tesis", "Tesis interpretativa, original y discutible.", "Tesis clara pero predecible.", "Tesis vaga o descriptiva.", "Sin tesis identificable."],
      ["Análisis literario", "Analiza narrador, tiempo, espacio y figuras al servicio de la tesis.", "Analiza varios elementos con relación a la tesis.", "Análisis descriptivo o desconectado.", "Resume la trama sin analizar."],
      ["Diálogo intertextual y contexto", "Pone en diálogo la novela con un texto argumentativo y su contexto de forma reveladora.", "Relaciona de forma pertinente.", "Relación superficial.", "Sin relación con otros textos."],
      ["Argumentación", "Tres argumentos sólidos, contraargumento y refutación.", "Argumentos adecuados, refutación débil.", "Argumentos escasos, sin contraargumento.", "Sin argumentos."],
      ["Fuentes y citas (APA)", "Citas pertinentes, referencias completas.", "Fallas menores de formato.", "Citas escasas o incompletas.", "Sin referencias o con plagio."],
      ["Estructura y redacción", "Cohesionado, conectores precisos, sin errores.", "Pocos errores.", "Errores que afectan la lectura.", "Desorganizado, muchos errores."]
    ]
  }
};
