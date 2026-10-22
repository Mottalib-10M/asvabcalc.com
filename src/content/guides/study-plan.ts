import { defineGuide } from '../../lib/page-types';
import type { Helpers } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const E = K.E;
type S3 = { AR: number; MK: number; VE: number };
const up = (x: S3, k: keyof S3, d: number) => E.afqt({ ...x, [k]: x[k] + d });
/** Trois profils d'exemple, différents de ceux des autres pages. */
const PROFILES: Array<[string, S3]> = [['Dana', { AR: 40, MK: 42, VE: 44 }], ['Luis', { AR: 52, MK: 49, VE: 50 }], ['Kim', { AR: 55, MK: 53, VE: 48 }]];
const luis = PROFILES[1][1], luisP = E.afqt(luis);
const catMin = (c: string) => Number(K.P.categories.find((x) => x[0] === c)![1]);
const MIN = K.P.branches.army.min, C3A = catMin('IIIA'), C2 = catMin('II');
const s65 = E.sumForPercentile(C2)!, luisSum = E.afqtSum(luis), gap65 = s65 - luisSum;

function gains(h: Helpers) {
  return h.table([h.L('Profile (AR / MK / VE)', 'Perfil (AR / MK / VE)'), h.L('AFQT today', 'AFQT hoy'), 'AR + 3', 'MK + 3', 'VE + 3'],
    PROFILES.map(([n, x]) => [`${n} (${x.AR} / ${x.MK} / ${x.VE})`, E.afqt(x), up(x, 'AR', 3), up(x, 'MK', 3), up(x, 'VE', 3)]),
    h.L('AFQT percentiles read in table 2.5 of the 1997 score scale report after a gain of 3 standard score points on one subtest.', 'Percentiles AFQT leídos en la tabla 2.5 del informe de la escala de 1997 tras subir 3 puntos estándar en una sola subprueba.'), ['l', 'r', 'r', 'r', 'r']);
}

export default defineGuide({
  id: 'study-plan', group: 'test', order: 35,
  tool: 'gain',
  related: ['afqt-calculator', 've-score', 'practice-test', 'word-knowledge', 'line-scores'],
  sources: ['segall', 'oa-scores', 'oa-samples'],
  en: {
    slug: 'asvab-study-plan', nav: 'Study plan', card: 'Where one more point of study is worth the most',
    title: 'ASVAB Study Guide 2026: A Free Plan Where Each Point Counts',
    description: 'ASVAB study plan for 2026: why Verbal Expression counts twice in the AFQT, what three more points on AR, MK or VE are worth, and when the other subtests matter.',
    h1: 'ASVAB study guide: spend your time where the points count',
    intro: 'Not every subtest point is worth the same. The AFQT formula, the conversion table and your own goal decide where an hour of study pays off most.',
    resume: `For the AFQT, a point of Verbal Expression is worth twice a point of Arithmetic Reasoning or Mathematics Knowledge, because the composite is AR + MK + 2VE. Take Luis, with AR ${luis.AR}, MK ${luis.MK} and VE ${luis.VE}: his AFQT is ${luisP}. Three more points on AR lift it to ${up(luis, 'AR', 3)}, three more on MK to ${up(luis, 'MK', 3)}, but three more on VE to ${up(luis, 'VE', 3)}. VE itself is built from Word Knowledge and Paragraph Comprehension, so vocabulary and reading are the most efficient lever for the AFQT. That is not the whole plan. If your gap to the next level is in the math half, or if the job you want depends on a line score that uses General Science, Mechanical Comprehension or Electronics Information, those subtests matter too. A sound plan starts from a measured weakness, aims at a figure, either an AFQT threshold or a line score, and checks progress with timed practice.`,
    faqs: [
      { q: 'Which ASVAB subtest should I study first?', a: 'For the AFQT, Word Knowledge and Paragraph Comprehension, because they form Verbal Expression, which counts twice. For a job, the subtests of the line score that job requires. Most candidates need both: start with the half of the AFQT where your scores are lowest, then add the subtests your target line score uses. A practice test tells you where you stand before you choose.' },
      { q: 'Is it better to raise math or verbal for the AFQT?', a: `Point for point, verbal. One standard score point of VE adds two points to the AFQT sum, while a point of AR or MK adds one. For Luis, three points of VE give ${up(luis, 'VE', 3)} against ${up(luis, 'AR', 3)} for three points of AR. If your math scores are far below your verbal ones, however, the math subtests may be easier to raise, so compare effort as well as weight.` },
      { q: 'Do the non-AFQT subtests matter for my study plan?', a: 'They do if your target job uses them. General Science, Electronics Information, Auto and Shop and Mechanical Comprehension do not enter the AFQT, but they feed the line scores that branches use to assign jobs. A candidate aiming at a mechanical or electronics job should give them real study time once the AFQT is safely above the branch minimum.' },
      { q: 'How do I know my study is working?', a: 'Time yourself on fresh practice items, at the pace of the real test, and track the share you get right per subtest. That share cannot be converted into a standard score, so read it as a trend, not as an AFQT. When a subtest stops improving, change the method rather than adding more of the same exercises.' },
    ],
    body: (h) => `<h2>The weight of each point</h2>
<p>The ${h.src('segall', 'technical report of the 1997 score scale')} defines the AFQT composite as AR + MK + 2 × VE, then converts the sum with a fixed table. The consequence for study is simple: Verbal Expression has double weight. The table below applies a gain of three standard score points, one subtest at a time, to three candidates with different profiles.</p>
${gains(h)}
<p>For every profile, the VE column moves the most. The size of the move depends on where the sum falls in the table, because the conversion is uneven: some sums share a percentile, others skip one. That is why the calculator above works from your own scores instead of a general rule.</p>
<h2>Verbal Expression: two subtests behind one score</h2>
<p>VE is not a subtest you take. It is built from Word Knowledge and Paragraph Comprehension, and the ${h.a('ve-score', 'VE calculator')} shows how the two combine. For study, that means two different skills. Word Knowledge rewards a wide vocabulary and the habit of reading word parts, roots and prefixes; the ${h.a('word-knowledge', 'Word Knowledge page')} has practice items. Paragraph Comprehension rewards careful reading under time pressure: finding the main idea, separating what the text says from what it implies. Both improve with regular reading of varied texts, and both improve faster when you write down and review the words and question types you miss.</p>
<h2>The math half: AR and MK</h2>
<p>Arithmetic Reasoning and Mathematics Knowledge count once each, but they are often the subtests with the most room to grow, because many errors come from a few gaps: fractions, percentages, ratios, simple equations, areas. Dana, with AR ${PROFILES[0][1].AR} and MK ${PROFILES[0][1].MK}, has an AFQT of ${E.afqt(PROFILES[0][1])}; her math scores sit below her VE, so a review of those basics may lift both subtests at once. No calculator is allowed on the ASVAB, so practise every calculation by hand, and on word problems write the equation before computing. The ${h.a('arithmetic-reasoning', 'Arithmetic Reasoning page')} and the ${h.a('math-knowledge', 'Mathematics Knowledge page')} give items with explanations.</p>
<h2>Aiming at a figure</h2>
<p>A plan needs a target. For enlistment, the target is usually an AFQT threshold: ${MIN} for most branches with a diploma, ${C3A} for Category IIIA, ${C2} for Category II. Luis has an AFQT of ${luisP}, with a sum of ${luisSum}. Category II starts at a sum of ${s65}, so he is ${gap65} points of sum away: about ${Math.ceil(gap65 / 2)} points of VE alone, or ${gap65} of AR alone. The tool below does the same reading for your scores and any target.</p>
${h.mini('target', { t: 'Points of sum to your target', p: ['t', 'ar', 'mk', 've'], d: { t: '65', ar: luis.AR, mk: luis.MK, ve: luis.VE } })}
<p>If your target is a job, the figure is a line score, not the AFQT. The ${h.a('line-scores', 'line score calculator')} shows which subtests each composite uses. A candidate aiming at an electronics job gains more from Electronics Information and Mathematics Knowledge than from a few extra AFQT percentiles once the branch minimum is met.</p>
<h2>A plan in four steps</h2>
<ul>
<li>Measure: take the ${h.a('practice-test', 'practice test')} and note the subtests where you miss the most.</li>
<li>Choose: pick one verbal and one math or technical subtest, according to the gap and the weight above.</li>
<li>Train with the real clock: the ${h.a('test-length', 'test length page')} gives the time per question of each version.</li>
<li>Check and adjust: repeat timed practice on new items, and change methods on a subtest that stops improving.</li>
</ul>
<p>This site gives no number of study hours, because no official source measures how long a gain of a given size takes; it depends on where you start. The ${h.src('oa-samples', 'Official ASVAB sample questions')} show the style of the real items, and the practice items on this site, written by Radif Partners, cover every subtest. A share of right answers in practice is a measure of progress, not an AFQT.</p>`,
  },
  es: {
    slug: 'plan-de-estudio-asvab', nav: 'Plan de estudio', card: 'Dónde rinde más un punto de estudio',
    title: 'Guía de estudio ASVAB 2026: dónde rinde más cada punto',
    description: 'Plan de estudio del ASVAB 2026: por qué Expresión Verbal cuenta doble en el AFQT, cuánto valen tres puntos más en AR, MK o VE y cuándo pesan las demás.',
    h1: 'Guía de estudio del ASVAB: dedique el tiempo donde cuentan los puntos',
    intro: 'No todos los puntos valen lo mismo. La fórmula del AFQT, la tabla de conversión y su propio objetivo deciden dónde rinde más una hora de estudio.',
    resume: `Para el AFQT, un punto de Expresión Verbal vale el doble que un punto de Razonamiento Aritmético o de Conocimientos Matemáticos, porque el compuesto es AR + MK + 2VE. Tome a Luis, con AR ${luis.AR}, MK ${luis.MK} y VE ${luis.VE}: su AFQT es ${luisP}. Tres puntos más en AR lo suben a ${up(luis, 'AR', 3)}, tres más en MK a ${up(luis, 'MK', 3)}, pero tres más en VE a ${up(luis, 'VE', 3)}. VE se construye a su vez con Conocimiento de Palabras y Comprensión de Lectura, así que el vocabulario y la lectura son la palanca más eficaz para el AFQT. Eso no es todo el plan. Si la distancia al siguiente nivel está en la mitad matemática, o si el empleo que busca depende de un line score que usa Ciencia General, Comprensión Mecánica o Información Electrónica, esas subpruebas también cuentan. Un buen plan parte de una debilidad medida, apunta a una cifra, sea un umbral de AFQT o un line score, y comprueba el avance con práctica cronometrada.`,
    faqs: [
      { q: '¿Qué subprueba del ASVAB conviene estudiar primero?', a: 'Para el AFQT, Conocimiento de Palabras y Comprensión de Lectura, porque forman Expresión Verbal, que cuenta doble. Para un empleo, las subpruebas del line score que ese empleo exige. La mayoría necesita ambas cosas: empiece por la mitad del AFQT donde sus puntajes son más bajos y luego añada las subpruebas de su line score objetivo. Un examen de práctica le dice dónde está antes de elegir.' },
      { q: '¿Conviene más subir matemáticas o la parte verbal para el AFQT?', a: `Punto por punto, la parte verbal. Un punto estándar de VE suma dos puntos a la suma del AFQT, mientras que un punto de AR o MK suma uno. Para Luis, tres puntos de VE dan ${up(luis, 'VE', 3)} frente a ${up(luis, 'AR', 3)} con tres puntos de AR. Pero si sus puntajes de matemáticas están muy por debajo de los verbales, puede que sean más fáciles de subir, así que compare el esfuerzo además del peso.` },
      { q: '¿Las subpruebas que no entran en el AFQT cuentan en mi plan de estudio?', a: 'Cuentan si el empleo que busca las usa. Ciencia General, Información Electrónica, Autos y Taller y Comprensión Mecánica no entran en el AFQT, pero alimentan los line scores que las ramas usan para asignar empleos. Quien apunta a un empleo mecánico o de electrónica debe darles tiempo de estudio real una vez que su AFQT esté con margen por encima del mínimo de la rama.' },
      { q: '¿Cómo sé si mi estudio está funcionando?', a: 'Cronométrese con preguntas de práctica nuevas, al ritmo del examen real, y anote el porcentaje de aciertos por subprueba. Ese porcentaje no se convierte en puntaje estándar, así que léalo como una tendencia, no como un AFQT. Cuando una subprueba deja de mejorar, cambie de método en lugar de repetir más de los mismos ejercicios.' },
    ],
    body: (h) => `<h2>El peso de cada punto</h2>
<p>El ${h.src('segall', 'informe técnico de la escala de 1997')} define el compuesto AFQT como AR + MK + 2 × VE y luego convierte la suma con una tabla fija. La consecuencia para el estudio es simple: Expresión Verbal pesa el doble. La tabla aplica una subida de tres puntos estándar, una subprueba a la vez, a tres aspirantes con perfiles distintos.</p>
${gains(h)}
<p>En todos los perfiles, la columna de VE es la que más se mueve. El tamaño del avance depende de dónde cae la suma en la tabla, porque la conversión es irregular: algunas sumas comparten percentil y otras saltan uno. Por eso la calculadora de arriba trabaja con sus propios puntajes y no con una regla general.</p>
<h2>Expresión Verbal: dos subpruebas detrás de un puntaje</h2>
<p>VE no es una subprueba que se hace. Se construye con Conocimiento de Palabras y Comprensión de Lectura, y la ${h.a('ve-score', 'calculadora de VE')} muestra cómo se combinan. Para estudiar, eso significa dos habilidades distintas. Conocimiento de Palabras premia un vocabulario amplio y la costumbre de leer las partes de las palabras, raíces y prefijos; la página de ${h.a('word-knowledge', 'Conocimiento de Palabras')} tiene preguntas de práctica. Comprensión de Lectura premia la lectura atenta con poco tiempo: encontrar la idea principal y separar lo que el texto dice de lo que sugiere. Las dos mejoran con la lectura regular de textos variados, y mejoran más rápido cuando anota y repasa las palabras y los tipos de pregunta que falla. Recuerde que el examen es solo en inglés, así que esa lectura debe hacerse en inglés.</p>
<h2>La mitad matemática: AR y MK</h2>
<p>Razonamiento Aritmético y Conocimientos Matemáticos cuentan una vez cada uno, pero a menudo son las subpruebas con más margen, porque muchos errores vienen de unas pocas lagunas: fracciones, porcentajes, proporciones, ecuaciones simples, áreas. Dana, con AR ${PROFILES[0][1].AR} y MK ${PROFILES[0][1].MK}, tiene un AFQT de ${E.afqt(PROFILES[0][1])}; sus puntajes de matemáticas están por debajo de su VE, así que repasar esas bases puede subir las dos subpruebas a la vez. En el ASVAB no se permite calculadora: practique cada cálculo a mano y, en los problemas con texto, escriba la ecuación antes de calcular. Las páginas de ${h.a('arithmetic-reasoning', 'Razonamiento Aritmético')} y de ${h.a('math-knowledge', 'Conocimientos Matemáticos')} tienen preguntas con explicaciones.</p>
<h2>Apuntar a una cifra</h2>
<p>Un plan necesita un objetivo. Para alistarse, suele ser un umbral de AFQT: ${MIN} para la mayoría de las ramas con diploma, ${C3A} para la categoría IIIA, ${C2} para la categoría II. Luis tiene un AFQT de ${luisP}, con una suma de ${luisSum}. La categoría II empieza en una suma de ${s65}, así que le faltan ${gap65} puntos de suma: unos ${Math.ceil(gap65 / 2)} puntos de VE solo, o ${gap65} de AR solo. La herramienta de abajo hace la misma lectura con sus puntajes y cualquier objetivo.</p>
${h.mini('target', { t: 'Puntos de suma hasta su objetivo', p: ['t', 'ar', 'mk', 've'], d: { t: '65', ar: luis.AR, mk: luis.MK, ve: luis.VE } })}
<p>Si su objetivo es un empleo, la cifra es un line score, no el AFQT. La ${h.a('line-scores', 'calculadora de line scores')} muestra qué subpruebas usa cada compuesto. Quien apunta a un empleo de electrónica gana más con Información Electrónica y Conocimientos Matemáticos que con unos percentiles más de AFQT, una vez cumplido el mínimo de la rama.</p>
<h2>Un plan en cuatro pasos</h2>
<ul>
<li>Medir: haga el ${h.a('practice-test', 'examen de práctica')} y anote las subpruebas donde más falla.</li>
<li>Elegir: tome una subprueba verbal y una matemática o técnica, según la distancia y el peso de arriba.</li>
<li>Entrenar con el reloj real: la página de ${h.a('test-length', 'duración del examen')} da el tiempo por pregunta de cada versión.</li>
<li>Comprobar y ajustar: repita la práctica cronometrada con preguntas nuevas y cambie de método en una subprueba que deja de mejorar.</li>
</ul>
<p>Este sitio no da un número de horas de estudio, porque ninguna fuente oficial mide cuánto tarda una subida de cierto tamaño; depende del punto de partida. Las ${h.src('oa-samples', 'preguntas de ejemplo de Official ASVAB')} muestran el estilo de las preguntas reales, y las preguntas de práctica de este sitio, escritas por Radif Partners, cubren todas las subpruebas. Un porcentaje de aciertos al practicar mide el progreso, no es un AFQT.</p>`,
  },
});
