import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const E = K.E, P = K.P;
const c = (P.testLength.cat as Record<string, [number, number]>).PC, p = (P.testLength.pp as Record<string, [number, number]>).PC;
const sec = (x: [number, number]) => Math.round((x[1] * 60) / x[0]);
/** Poids d'un point de PC dans VE, rapporté à un point de WK (forme 04D, Segall 2004). */
const f = P.veForm04D, wPC = (f.w[1] / f.pc[0]) / (f.w[0] / f.wk[0]);
/** Exemple : bon vocabulaire, lecture plus lente. */
const WK = 55, pc0 = 41, pc1 = 49, AR = 48, MK = 46;
const ve0 = E.veFromWkPc(WK, pc0), ve1 = E.veFromWkPc(WK, pc1);
const a0 = E.afqt({ AR, MK, VE: ve0 }), a1 = E.afqt({ AR, MK, VE: ve1 });
const cl0 = E.marines({ MK, VE: ve0 }).CL, cl1 = E.marines({ MK, VE: ve1 }).CL;

export default defineGuide({
  id: 'paragraph-comprehension', group: 'practice', order: 23,
  tool: 'quiz', toolArg: { s: 'PC', k: 0 },
  related: ['word-knowledge', 've-score', 'practice-test', 'marines', 'cat-vs-paper'],
  sources: ['oa-factsheet', 'oa-samples', 'segall'],
  en: {
    slug: 'paragraph-comprehension-practice', nav: 'Paragraph Comprehension', card: 'Short passages: main idea, details, inference',
    title: 'Paragraph Comprehension Practice 2026: ASVAB PC Passages',
    description: 'ASVAB Paragraph Comprehension practice for 2026: ten short passages with explained answers, the five question types, reading traps and how PC enters VE.',
    h1: 'Paragraph Comprehension practice: ASVAB reading passages',
    intro: 'Ten short passages, each followed by one question, in two sets of five. They train the five question types of the PC subtest: purpose, detail, inference, meaning in context and sequence.',
    resume: `Paragraph Comprehension (PC) is the ASVAB reading subtest: a passage of a few sentences, then a question about its main idea, a stated detail, an inference, the meaning of a phrase in context or the order of steps. The computer version gives ${c[0]} questions in ${c[1]} minutes, about ${sec(c)} seconds each, enough to read the passage twice; the paper version gives ${p[0]} questions in ${p[1]} minutes, about ${sec(p)} seconds each. PC is never used alone: it is combined with Word Knowledge into Verbal Expression (VE), which counts twice in the AFQT sum AR + MK + 2 × VE. On the reference form, a point of PC moves VE about ${wPC.toFixed(2)} times as much as a point of WK. A candidate with WK ${WK}, AR ${AR} and MK ${MK} who raises PC from ${pc0} to ${pc1} sees VE go from ${ve0} to ${ve1} and the AFQT from ${a0} to ${a1}. The ten passages here are written by Radif Partners, not taken from the ASVAB, and right answers do not convert into a score.`,
    faqs: [
      { q: 'Does Paragraph Comprehension count less than Word Knowledge?', a: `Slightly, on the reference form described in the 1997 scale report. Both feed Verbal Expression, but the weights differ: one point of PC moves VE about ${wPC.toFixed(2)} times as much as one point of WK. Other forms use slightly different constants. PC still matters a lot, because VE counts twice in the AFQT and appears in many line scores.` },
      { q: 'Should I read the question before the passage?', a: 'For these short passages, reading the question first usually helps: you know whether to look for the main idea, a detail or the meaning of a phrase, and you read with that aim. The passages are short enough that you lose little by doing so. Then read the whole passage once; skimming only for a keyword is how detail questions are missed.' },
      { q: 'What makes Paragraph Comprehension answers tricky?', a: 'The wrong choices are often true in real life, or partly stated in the passage, but they do not answer the question asked. Others go one step further than the text allows. The right answer is the one the passage supports directly, even when it feels less interesting than a broader statement. Check each choice against a sentence you can point to.' },
    ],
    body: (h) => `<h2>The five kinds of PC questions</h2>
<p>The ten passages on this page cover the question types you will meet on the subtest. Purpose or main idea: a passage on breaking in new boots asks what it is mainly for. Stated detail: a passage on a street closed to cars asks why shop owners supported it. Inference: a hiker finds a trail gate closed and the question asks what can be concluded. Meaning in context: a passage on early radios asks what "focal point" means there. Sequence: a passage on changing a tire asks what comes before raising the car. The ${h.src('oa-samples', 'Official ASVAB sample questions')} use the same short format.</p>
${h.mini('quiz', { t: 'Five more passages', p: ['q1', 'q2', 'q3', 'q4', 'q5'], d: { s: 'PC', k: 1 } })}
<h2>Time: second only to AR on the computer</h2>
<p>The ${h.src('oa-factsheet', 'Official ASVAB fact sheet')} gives PC ${h.n(c[0])} questions in ${h.n(c[1])} minutes on the computer test, about ${h.n(sec(c))} seconds per passage, and ${h.n(p[0])} questions in ${h.n(p[1])} minutes on paper, about ${h.n(sec(p))} seconds. On the computer you can afford a careful second reading; on paper you cannot. Practice both ways: first untimed, checking each answer against a precise sentence, then timed at the paper pace, which is the harder of the two. The ${h.a('cat-vs-paper', 'CAT versus paper page')} explains which version you are likely to take.</p>
<h2>Reading traps, with examples</h2>
<ul>
<li><strong>True but not stated.</strong> In the passage on knuckle cracking, a choice could say that arthritis has many causes. That may be true, but the passage does not say it. The answer is that a common belief lacks support, because that is what the study described shows.</li>
<li><strong>Going too far.</strong> Maria found the trail gate closed. You can infer she could not hike that day; you cannot infer she went home angry or that the trail closes every winter.</li>
<li><strong>A detail mistaken for the point.</strong> Two pairs of thin socks appear in the boot passage, but the passage is mainly about preventing blisters. Purpose questions ask for the whole, not a line.</li>
<li><strong>Conditions in a rule.</strong> When a library stays open until midnight during exam week and requires an ID after 9 p.m., a student arriving at 10 p.m. must show an ID. Track the time and the day before you choose.</li>
<li><strong>Extreme words.</strong> Choices with always, never or all are rarely supported by a five sentence passage.</li>
</ul>
<h2>What a PC point is worth</h2>
<p>Your score sheet prints PC, but no composite uses it directly: the ${h.src('segall', '1997 score scale report')} combines it with Word Knowledge into Verbal Expression. On the reference form, PC weighs about ${h.n(wPC, 2)} of WK, so a reader with a strong vocabulary gains a little less per point of PC than per point of WK. Take a candidate with WK ${WK}, AR ${AR} and MK ${MK}. With PC ${pc0}, the estimated VE is ${ve0} and the AFQT ${a0}. With PC ${pc1}, VE becomes ${ve1} and the AFQT ${a1}. The Marine Corps clerical line score CL, built from MK and VE, moves from ${cl0} to ${cl1}; the ${h.a('marines', 'Marine Corps page')} lists the other line scores. To rebuild VE from your own WK and PC, use the ${h.a('ve-score', 'VE calculator')}.</p>
<h2>How to practice reading</h2>
<p>Read short, dense texts every day: news briefs, safety instructions, encyclopedia entries. After each one, state the main idea in a single sentence of your own, then name one detail and one thing the text implies without saying it. This is exactly the work the subtest asks for. Time a few of these summaries at the paper pace, about ${sec(p)} seconds each, so that the speed of the real test does not surprise you. Pair it with vocabulary work on the ${h.a('word-knowledge', 'Word Knowledge page')}, because an unknown word in a passage is often the reason for a wrong answer, and test yourself across all subtests with the ${h.a('practice-test', 'practice test')}.</p>`,
  },
  es: {
    slug: 'comprension-de-lectura', nav: 'Comprensión de Lectura', card: 'Textos breves: idea principal, detalles, inferencias',
    title: 'Comprensión de lectura ASVAB 2026: textos de práctica',
    description: 'Práctica de Comprensión de Lectura del ASVAB 2026: diez textos breves en inglés con respuestas explicadas, los cinco tipos de pregunta y cómo PC entra en VE.',
    h1: 'Comprensión de Lectura: práctica con textos del ASVAB',
    intro: 'Diez textos breves, cada uno con una pregunta, en dos series de cinco. Entrenan los cinco tipos de pregunta de la subprueba PC: propósito, detalle, inferencia, sentido en contexto y orden.',
    resume: `Comprensión de Lectura (PC, Paragraph Comprehension) es la subprueba de lectura del ASVAB: un texto de pocas frases en inglés y una pregunta sobre su idea principal, un detalle explícito, una inferencia, el sentido de una expresión en contexto o el orden de unos pasos. La versión por computadora da ${c[0]} preguntas en ${c[1]} minutos, unos ${sec(c)} segundos cada una, suficiente para leer el texto dos veces; la versión en papel da ${p[0]} preguntas en ${p[1]} minutos, unos ${sec(p)} segundos cada una. PC nunca se usa sola: se combina con Conocimiento de Palabras en Expresión Verbal (VE), que cuenta doble en la suma del AFQT, AR + MK + 2 × VE. En la forma de referencia, un punto de PC mueve VE unas ${wPC.toFixed(2).replace('.', ',')} veces lo que mueve un punto de WK. Un aspirante con WK ${WK}, AR ${AR} y MK ${MK} que sube PC de ${pc0} a ${pc1} ve pasar VE de ${ve0} a ${ve1} y el AFQT de ${a0} a ${a1}. Los diez textos los escribe Radif Partners, no vienen del ASVAB, y los aciertos no se convierten en puntaje.`,
    faqs: [
      { q: '¿Comprensión de Lectura cuenta menos que Conocimiento de Palabras?', a: `Un poco, en la forma de referencia que describe el informe de la escala de 1997. Las dos alimentan Expresión Verbal, pero con pesos distintos: un punto de PC mueve VE unas ${wPC.toFixed(2).replace('.', ',')} veces lo que mueve un punto de WK. Otras formas usan constantes algo distintas. PC sigue importando mucho, porque VE cuenta doble en el AFQT y aparece en muchos line scores.` },
      { q: '¿Conviene leer la pregunta antes que el texto?', a: 'Con textos tan breves, leer primero la pregunta suele ayudar: sabe si busca la idea principal, un detalle o el sentido de una expresión, y lee con ese objetivo. Los textos son lo bastante cortos para que no pierda casi nada. Después lea el texto completo una vez; buscar solo una palabra clave es la forma más común de fallar las preguntas de detalle.' },
      { q: '¿Qué hace difíciles las respuestas de Comprensión de Lectura?', a: 'Las opciones incorrectas suelen ser ciertas en la vida real o aparecer en parte en el texto, pero no responden a lo que se pregunta. Otras van un paso más allá de lo que el texto permite. La respuesta correcta es la que el texto respalda directamente, aunque parezca menos interesante que una afirmación más amplia. Compruebe cada opción con una frase concreta.' },
    ],
    body: (h) => `<h2>Los cinco tipos de pregunta de PC</h2>
<p>Los diez textos de esta página cubren los tipos de pregunta de la subprueba. Propósito o idea principal: un texto sobre ablandar botas nuevas pregunta para qué sirve. Detalle explícito: un texto sobre una calle cerrada a los autos pregunta por qué la apoyaron los comerciantes. Inferencia: una excursionista encuentra cerrada la entrada de un sendero y se pregunta qué se puede concluir. Sentido en contexto: un texto sobre las primeras radios pregunta qué significa allí "focal point". Orden: un texto sobre cambiar una llanta pregunta qué se hace antes de levantar el auto. Los textos están en inglés, como en el examen real, que solo se da en ese idioma; la traducción de la pregunta aparece debajo. Las ${h.src('oa-samples', 'preguntas de ejemplo de Official ASVAB')} usan el mismo formato breve.</p>
${h.mini('quiz', { t: 'Cinco textos más', p: ['q1', 'q2', 'q3', 'q4', 'q5'], d: { s: 'PC', k: 1 } })}
<h2>Tiempo: el segundo más amplio en computadora</h2>
<p>La ${h.src('oa-factsheet', 'hoja informativa de Official ASVAB')} da a PC ${h.n(c[0])} preguntas en ${h.n(c[1])} minutos en el examen por computadora, unos ${h.n(sec(c))} segundos por texto, y ${h.n(p[0])} preguntas en ${h.n(p[1])} minutos en papel, unos ${h.n(sec(p))} segundos. En computadora puede permitirse una segunda lectura atenta; en papel no. Practique de las dos maneras: primero sin reloj, comprobando cada respuesta con una frase precisa, y después con el ritmo del papel, que es el más exigente. Para quien lee en inglés como segunda lengua, el ritmo del papel es el verdadero reto. La página de ${h.a('cat-vs-paper', 'CAT o papel')} explica qué versión es más probable que le toque.</p>
<h2>Trampas de lectura, con ejemplos</h2>
<ul>
<li><strong>Cierto pero no dicho.</strong> En el texto sobre hacer sonar los nudillos, una opción podría decir que la artritis tiene muchas causas. Puede ser verdad, pero el texto no lo dice. La respuesta es que una creencia común carece de respaldo, porque eso es lo que muestra el estudio descrito.</li>
<li><strong>Ir demasiado lejos.</strong> María encontró cerrado el sendero. Se puede inferir que no pudo caminar ese día; no se puede inferir que volvió a casa enfadada ni que el sendero cierra todos los inviernos.</li>
<li><strong>Un detalle tomado por la idea.</strong> Los dos pares de calcetines finos aparecen en el texto de las botas, pero el texto trata sobre todo de evitar ampollas. Las preguntas de propósito piden el conjunto, no una línea.</li>
<li><strong>Condiciones de una regla.</strong> Si una biblioteca abre hasta medianoche en semana de exámenes y exige identificación después de las 9 p. m., quien llega a las 10 p. m. debe mostrarla. Fíjese en la hora y el día antes de elegir.</li>
<li><strong>Palabras extremas.</strong> Las opciones con always, never o all casi nunca están respaldadas por un texto de cinco frases.</li>
</ul>
<h2>Lo que vale un punto de PC</h2>
<p>Su hoja imprime PC, pero ningún compuesto lo usa directamente: el ${h.src('segall', 'informe de la escala de 1997')} lo combina con Conocimiento de Palabras en Expresión Verbal. En la forma de referencia, PC pesa unas ${h.n(wPC, 2)} veces lo que WK, así que quien tiene un buen vocabulario gana algo menos por punto de PC que por punto de WK. Tome a un aspirante con WK ${WK}, AR ${AR} y MK ${MK}. Con PC ${pc0}, el VE estimado es ${ve0} y el AFQT ${a0}. Con PC ${pc1}, VE pasa a ${ve1} y el AFQT a ${a1}. El line score administrativo CL de los Marines, hecho con MK y VE, pasa de ${cl0} a ${cl1}; la página de los ${h.a('marines', 'Marines')} lista los demás line scores. Para reconstruir VE con su propio WK y PC, use la ${h.a('ve-score', 'calculadora de VE')}.</p>
<h2>Cómo practicar la lectura</h2>
<p>Lea a diario textos breves y densos en inglés: noticias cortas, instrucciones de seguridad, artículos de enciclopedia. Después de cada uno, diga la idea principal en una sola frase propia, nombre un detalle y una cosa que el texto da a entender sin decirla. Es justo el trabajo que pide la subprueba. Combínelo con el vocabulario de la página de ${h.a('word-knowledge', 'Conocimiento de Palabras')}, porque una palabra desconocida en un texto suele ser la causa de una respuesta equivocada, y póngase a prueba en todas las subpruebas con el ${h.a('practice-test', 'examen de práctica')}.</p>`,
  },
});
