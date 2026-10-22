import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const E = K.E, P = K.P;
const c = (P.testLength.cat as Record<string, [number, number]>).WK, p = (P.testLength.pp as Record<string, [number, number]>).WK;
const sec = (x: [number, number]) => Math.round((x[1] * 60) / x[0]);
const fmt = (w: Partial<Record<string, number>>) => Object.entries(w).map(([k, x]) => (x === 2 ? `2${k}` : k)).join(' + ');
/** WK n'entre dans les composites que par VE. */
const mageUse = (['M', 'A', 'G', 'E'] as const).filter((k) => E.MAGE_PARTS[k].VE);
const marUse = (['MM', 'GT', 'EL', 'CL'] as const).filter((k) => E.MARINE_PARTS[k].includes('VE'));
const mageList = mageUse.map((k) => `${k} = ${fmt(E.MAGE_PARTS[k])}`).join('; ');
const marList = marUse.map((k) => `${k} = ${E.MARINE_PARTS[k].join(' + ')}`).join('; ');
/** Exemple : WK faible, PC correct, maths moyennes. */
const PC = 53, wk0 = 44, wk1 = 50;
const ve0 = E.veFromWkPc(wk0, PC), ve1 = E.veFromWkPc(wk1, PC);
const a0 = E.afqt({ AR: 50, MK: 50, VE: ve0 }), a1 = E.afqt({ AR: 50, MK: 50, VE: ve1 });

export default defineGuide({
  id: 'word-knowledge', group: 'practice', order: 22,
  tool: 'quiz', toolArg: { s: 'WK', k: 0 },
  related: ['paragraph-comprehension', 've-score', 'practice-test', 'study-plan'],
  sources: ['oa-factsheet', 'oa-samples', 'segall', 'oa-faqs'],
  en: {
    slug: 'word-knowledge-practice', nav: 'Word Knowledge', card: 'Synonyms and words in context, at ASVAB speed',
    title: 'Word Knowledge Practice 2026: ASVAB Vocabulary Questions',
    description: 'ASVAB Word Knowledge practice for 2026: ten vocabulary questions with explanations, the seconds you get per word, roots and traps, and why WK weighs double.',
    h1: 'Word Knowledge practice: ASVAB vocabulary questions',
    intro: 'Ten vocabulary questions in two sets of five: a word alone or inside a sentence, and the choice closest in meaning. The real subtest leaves little time to think.',
    resume: `Word Knowledge (WK) is the ASVAB vocabulary subtest: each question shows a word, alone or in a short sentence, and asks which of four choices is closest in meaning. It is the fastest subtest of the test. The computer version gives ${c[0]} questions in ${c[1]} minutes, about ${sec(c)} seconds per word, and the paper version ${p[0]} questions in ${p[1]} minutes, about ${sec(p)} seconds. WK has no line of its own in the AFQT: it is combined with Paragraph Comprehension into Verbal Expression (VE), and VE counts twice in AR + MK + 2 × VE. With PC at ${PC} and average math, raising WK from ${wk0} to ${wk1} lifts the estimated VE from ${ve0} to ${ve1} and the AFQT from ${a0} to ${a1}. VE also enters the Army GT, ${mageUse.length} Air Force areas and ${marUse.length} Marine Corps line scores. The ten practice words here are chosen by Radif Partners; they are not real ASVAB items and a share of right answers is not a score.`,
    faqs: [
      { q: 'How can I study for Word Knowledge if vocabulary takes years?', a: 'Vocabulary does grow slowly, but the test favors a few levers you can train in weeks: common Latin and Greek roots, prefixes such as un, mis, ob and ambi, and the habit of reading the word inside a sentence to test each choice. Learning words in sentences rather than as bare lists makes them easier to recall under the short time limit of this subtest.' },
      { q: 'Why does Word Knowledge count so much in the AFQT?', a: 'WK feeds Verbal Expression, together with Paragraph Comprehension, and VE is counted twice in the AFQT sum. A gain on WK therefore moves the AFQT sum more than the same gain on Arithmetic Reasoning or Mathematics Knowledge alone. That makes vocabulary one of the most efficient things to study when you are close to a threshold.' },
      { q: 'Should I answer a Word Knowledge question I do not know?', a: 'Yes. On the computer test, unanswered items when time runs out carry a penalty equal to random guessing, and on paper a blank counts as wrong. With so few seconds per word, the best approach is to decide quickly: if the word is unknown, look for a root or prefix, eliminate the choices that clash with the sentence, pick one and move on.' },
    ],
    body: (h) => `<h2>What the Word Knowledge subtest asks</h2>
<p>Each question is one word and four choices. Sometimes the word stands alone, as in "Candid most nearly means", sometimes it sits in a sentence, as in "The general's terse reply ended the meeting quickly". The ten words on this page are diligent, candid, terse, mitigate, abundant, tenacity, obsolete, feasible, meticulous and ambiguous: common enough in reports and newspapers, rare enough in daily speech to cause hesitation. The real subtest uses the same two formats, as the ${h.src('oa-samples', 'Official ASVAB sample questions')} show.</p>
${h.mini('quiz', { t: 'Five more vocabulary questions', p: ['q1', 'q2', 'q3', 'q4', 'q5'], d: { s: 'WK', k: 1 } })}
<h2>Speed: the shortest time per question on the test</h2>
<p>According to the ${h.src('oa-factsheet', 'Official ASVAB fact sheet')}, the computer version gives ${h.n(c[0])} words in ${h.n(c[1])} minutes, about ${h.n(sec(c))} seconds each, and the paper version ${h.n(p[0])} words in ${h.n(p[1])} minutes, about ${h.n(sec(p))} seconds each. There is no time to reason at length: you either know the word, recognize a part of it, or use the sentence. That is why timed practice matters more here than on any math subtest. Run through a list of twenty words with a stopwatch and stop thinking after your time per word, even if you are unsure.</p>
<h2>Traps in vocabulary questions</h2>
<ul>
<li><strong>Look-alike words.</strong> Mitigate (to lessen) is not militate (to act against). Candid (honest) has nothing to do with candy or candle. Read the word letter by letter before you answer.</li>
<li><strong>The opposite among the choices.</strong> For abundant, a list may offer scarce next to plentiful. The opposite is placed there because it is related to the word; a fast reader picks it by association.</li>
<li><strong>Tone in a sentence.</strong> In "the recruit's tenacity impressed the drill instructor", the word must be something an instructor admires, which rules out laziness or fear before you even know the word.</li>
<li><strong>A second meaning.</strong> Some words carry a common meaning and a formal one. Try each choice in the sentence; the right one keeps the sentence logical.</li>
</ul>
<p>Word parts solve many unknown words. Ambi means both, so ambiguous is something with two possible meanings, unclear. Ob often means against or away, which helps with obsolete. Bene is good and mal is bad. Learn a few dozen of these and you will recognize a share of the words you have never seen.</p>
<h2>Why WK weighs double</h2>
<p>Your sheet prints WK, but the composites use Verbal Expression, a weighted mix of WK and Paragraph Comprehension. The ${h.src('segall', '1997 score scale report')} gives the formula for the reference form, and the ${h.a('ve-score', 'VE calculator')} applies it. Take a candidate with PC ${PC}, AR 50 and MK 50. With WK ${wk0}, the estimated VE is ${ve0} and the AFQT ${a0}. With WK ${wk1}, VE becomes ${ve1} and the AFQT ${a1}, because VE counts twice in AR + MK + 2 × VE. VE also enters the Army GT (AR + VE), the Air Force areas ${mageList}, and the Marine Corps line scores ${marList}. Few hours of study move so many scores at once.</p>
<h2>How to build vocabulary in a few weeks</h2>
<p>Keep a notebook of words you meet in news articles, manuals and books, each with the sentence where you found it, and review it daily. Group words by root rather than alphabetically. Test yourself in the same format as the subtest: a word, four choices, a short time. Reading also trains Paragraph Comprehension, so the ${h.a('paragraph-comprehension', 'Paragraph Comprehension page')} is the natural partner of this one. When your verbal side is solid, the ${h.a('study-plan', 'study plan page')} shows what remains to gain on the math side, and the ${h.a('practice-test', 'practice test')} checks every subtest at once.</p>`,
  },
  es: {
    slug: 'conocimiento-de-palabras', nav: 'Conocimiento de Palabras', card: 'Sinónimos y palabras en contexto, al ritmo del ASVAB',
    title: 'Conocimiento de palabras ASVAB 2026: práctica de vocabulario',
    description: 'Práctica de Conocimiento de Palabras del ASVAB 2026: diez preguntas de vocabulario, cognados y falsos amigos, tiempo por palabra y el peso de WK en el AFQT.',
    h1: 'Conocimiento de Palabras: práctica de vocabulario del ASVAB',
    intro: 'Diez preguntas de vocabulario en dos series de cinco: una palabra sola o dentro de una frase y la opción de significado más cercano. El examen real deja poco tiempo para pensar.',
    resume: `Conocimiento de Palabras (WK, Word Knowledge) es la subprueba de vocabulario del ASVAB: cada pregunta muestra una palabra en inglés, sola o en una frase corta, y pide cuál de cuatro opciones tiene el significado más cercano. Es la subprueba más rápida del examen. La versión por computadora da ${c[0]} preguntas en ${c[1]} minutos, unos ${sec(c)} segundos por palabra, y la versión en papel ${p[0]} preguntas en ${p[1]} minutos, unos ${sec(p)} segundos. WK no entra sola en el AFQT: se combina con Comprensión de Lectura en Expresión Verbal (VE), y VE cuenta doble en AR + MK + 2 × VE. Con PC en ${PC} y matemáticas en la media, subir WK de ${wk0} a ${wk1} eleva el VE estimado de ${ve0} a ${ve1} y el AFQT de ${a0} a ${a1}. VE también entra en el GT del Ejército, en ${mageUse.length} áreas de la Fuerza Aérea y en ${marUse.length} line scores de los Marines. Las diez palabras de práctica las elige Radif Partners; no son preguntas reales del ASVAB y un porcentaje de aciertos no es un puntaje.`,
    faqs: [
      { q: '¿Los hispanohablantes tienen ventaja en Conocimiento de Palabras?', a: 'A menudo sí, porque buena parte del vocabulario formal del inglés viene del latín: diligent, abundant, obsolete o meticulous se parecen a diligente, abundante, obsoleto o meticuloso. Pero hay falsos amigos: candid significa franco, no cándido, y terse significa breve, no terso. Use los cognados como pista y compruebe siempre la opción dentro de la frase en inglés.' },
      { q: '¿Por qué Conocimiento de Palabras pesa tanto en el AFQT?', a: 'WK alimenta Expresión Verbal junto con Comprensión de Lectura, y VE se cuenta dos veces en la suma del AFQT. Una mejora en WK mueve por eso la suma más que la misma mejora solo en Razonamiento Aritmético o en Conocimientos Matemáticos. El vocabulario es así una de las cosas más rentables de estudiar cuando se está cerca de un umbral.' },
      { q: '¿Debo responder una pregunta de vocabulario que no sé?', a: 'Sí. En el examen por computadora, las preguntas sin responder al acabarse el tiempo reciben una penalización equivalente a responder al azar, y en papel una pregunta en blanco cuenta como error. Con tan pocos segundos por palabra, lo mejor es decidir rápido: si no conoce la palabra, busque una raíz o un prefijo, descarte lo que no encaja en la frase, elija y siga.' },
    ],
    body: (h) => `<h2>Qué pide la subprueba de vocabulario</h2>
<p>Cada pregunta es una palabra y cuatro opciones. A veces la palabra va sola, como en "Candid most nearly means", y a veces dentro de una frase, como en "The general's terse reply ended the meeting quickly". El examen solo existe en inglés, así que las palabras y las opciones están en inglés; en esta página la traducción del enunciado aparece debajo para ayudarle a entender la explicación. Las diez palabras son diligent, candid, terse, mitigate, abundant, tenacity, obsolete, feasible, meticulous y ambiguous: frecuentes en informes y periódicos, raras en la conversación diaria. El examen real usa los mismos dos formatos, como muestran las ${h.src('oa-samples', 'preguntas de ejemplo de Official ASVAB')}.</p>
${h.mini('quiz', { t: 'Cinco preguntas más de vocabulario', p: ['q1', 'q2', 'q3', 'q4', 'q5'], d: { s: 'WK', k: 1 } })}
<h2>Velocidad: el menor tiempo por pregunta del examen</h2>
<p>Según la ${h.src('oa-factsheet', 'hoja informativa de Official ASVAB')}, la versión por computadora da ${h.n(c[0])} palabras en ${h.n(c[1])} minutos, unos ${h.n(sec(c))} segundos cada una, y la versión en papel ${h.n(p[0])} palabras en ${h.n(p[1])} minutos, unos ${h.n(sec(p))} segundos cada una. No hay tiempo para razonar largo: o conoce la palabra, o reconoce una parte de ella, o se apoya en la frase. Por eso la práctica cronometrada importa aquí más que en cualquier subprueba de matemáticas. Repase una lista de veinte palabras con cronómetro y deje de pensar al llegar a su tiempo por palabra, aunque dude.</p>
<h2>Cognados, falsos amigos y otras trampas</h2>
<ul>
<li><strong>Cognados útiles.</strong> Diligent, abundant, obsolete, meticulous, ambiguous, feasible y tenacity tienen parientes claros en español: diligente, abundante, obsoleto, meticuloso, ambiguo, factible y tenacidad. Es una ventaja real para quien habla español.</li>
<li><strong>Falsos amigos.</strong> Candid significa franco u honesto, no cándido. Terse significa breve y seco, no terso. Actual significa real, no actual. Cuando una palabra se parece demasiado a una del español, desconfíe un segundo.</li>
<li><strong>Palabras parecidas en inglés.</strong> Mitigate (aliviar) no es militate (obrar en contra). Lea la palabra letra por letra antes de responder.</li>
<li><strong>El contrario entre las opciones.</strong> Para abundant, la lista puede traer scarce junto a plentiful. El antónimo está ahí porque se asocia con la palabra, y quien lee rápido lo elige por asociación.</li>
</ul>
<p>Las partes de la palabra resuelven muchas dudas. Ambi significa ambos, así que ambiguous es algo con dos sentidos posibles. Ob suele indicar oposición o alejamiento, lo que ayuda con obsolete. Con unas decenas de raíces y prefijos reconocerá una parte de las palabras que nunca vio.</p>
<h2>Por qué WK pesa el doble</h2>
<p>Su hoja imprime WK, pero los compuestos usan Expresión Verbal, una mezcla ponderada de WK y Comprensión de Lectura. El ${h.src('segall', 'informe de la escala de 1997')} da la fórmula de la forma de referencia y la ${h.a('ve-score', 'calculadora de VE')} la aplica. Tome a un aspirante con PC ${PC}, AR 50 y MK 50. Con WK ${wk0}, el VE estimado es ${ve0} y el AFQT ${a0}. Con WK ${wk1}, VE pasa a ${ve1} y el AFQT a ${a1}, porque VE cuenta doble en AR + MK + 2 × VE. VE entra también en el GT del Ejército (AR + VE), en las áreas de la Fuerza Aérea ${mageList} y en los line scores de los Marines ${marList}. Pocas horas de estudio mueven tantos puntajes a la vez.</p>
<h2>Cómo ampliar el vocabulario en pocas semanas</h2>
<p>Lleve un cuaderno con las palabras en inglés que encuentre en noticias, manuales y libros, cada una con la frase donde apareció, y repáselo a diario. Agrupe las palabras por raíz y no por orden alfabético, y anote al lado el cognado español cuando exista, marcando los falsos amigos. Póngase a prueba con el mismo formato de la subprueba: una palabra, cuatro opciones, poco tiempo. La lectura en inglés entrena también la Comprensión de Lectura, así que la página de ${h.a('paragraph-comprehension', 'Comprensión de Lectura')} es la compañera natural de esta. Cuando su parte verbal esté firme, la del ${h.a('study-plan', 'plan de estudio')} muestra lo que queda por ganar en matemáticas, y el ${h.a('practice-test', 'examen de práctica')} revisa todas las subpruebas a la vez.</p>`,
  },
});
