import { defineGuide } from '../../lib/page-types';
import type { Helpers } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const E = K.E;
const lk = (s: number) => E.lookup('AFQT', s);
const s31 = E.sumForPercentile(31)!, s50 = E.sumForPercentile(50)!, s65 = E.sumForPercentile(65)!, s93 = E.sumForPercentile(93)!, s99 = E.sumForPercentile(99)!;

/** Extrait de la table 2.5 : une somme sur cinq, de 160 à 260. */
function extract(h: Helpers) {
  const rows: Array<Array<string | number>> = [];
  for (let s = 160; s <= 260; s += 5) rows.push([s, lk(s), E.category(lk(s))]);
  return h.table([h.L('AR + MK + 2VE', 'AR + MK + 2VE'), h.L('AFQT percentile', 'Percentil AFQT'), h.L('Category', 'Categoría')], rows,
    h.L('Extract of table 2.5 of the 1997 score scale report, one sum in five. The calculator reads every sum.', 'Extracto de la tabla 2.5 del informe de la escala de 1997, una suma de cada cinco. La calculadora lee todas las sumas.'), ['r', 'r', 'l']);
}

export default defineGuide({
  id: 'afqt-calculator', group: 'scores', order: 1,
  tool: 'afqt',
  related: ['good-asvab-score', 'afqt-categories', 've-score', 'minimum-score', 'study-plan'],
  sources: ['segall', 'oa-scores', 'oa-scoring', 'oa-eligibility'],
  en: {
    slug: 'afqt-calculator', nav: 'AFQT calculator', card: 'AR + MK + 2VE read in the official 1997 table',
    title: 'AFQT Calculator 2026: Percentile From Your ASVAB Scores',
    description: 'AFQT calculator for 2026: add AR, MK and twice VE, read the percentile in the official 1997 conversion table, then see your category and the next level.',
    h1: 'AFQT calculator: your percentile from AR, MK and VE',
    intro: 'Three standard scores from your ASVAB sheet are enough. The percentile comes straight from the conversion table published by the Defense Manpower Data Center.',
    resume: `The AFQT percentile is computed in two steps. First, add the standard scores of Arithmetic Reasoning and Mathematics Knowledge to twice the Verbal Expression score: with AR 50, MK 50 and VE 50 the sum is 200. Second, read that sum in table 2.5 of the 1997 score scale report, which lists the percentile for every sum from ${E.tableRange('AFQT').min} or less to ${E.tableRange('AFQT').max} or more. A sum of 200 gives ${lk(200)}, ${s31} gives 31, ${s50} gives 50, ${s65} gives 65, ${s93} gives 93 and ${s99} or more gives 99, the highest value reported. The percentile is the share of a national sample of youths aged 18 to 23, tested in 1997, who scored at or below the same sum. It is not a percentage of correct answers, and two people with the same sum always get the same percentile, whatever the form or the version of the test they took.`,
    faqs: [
      { q: 'Why does Verbal Expression count twice in the AFQT?', a: 'The formula weights the verbal and the math parts equally. AR and MK are two math subtests, while VE is a single verbal composite built from Word Knowledge and Paragraph Comprehension, so it is counted twice to balance the two halves. In practice, one point of VE moves the AFQT sum as much as two points spread over AR and MK.' },
      { q: 'What AFQT do I get with a sum of 183?', a: `A sum of 183 reads as ${lk(183)} in the 1997 table, the minimum of the Army, the Air Force and the Marine Corps for applicants with a high school diploma. One point less, 182, reads as ${lk(182)} and would fall short. The table moves by about one percentile per point of sum in this zone, so every point counts.` },
      { q: 'Can I compute the AFQT from raw right answers?', a: 'No. The test is scored with item response theory: the difficulty of each question you answered matters, and on the computer version the questions adapt to you. Only the standard scores printed on the score sheet can be converted. A count of right answers on a practice test does not convert into a standard score.' },
      { q: 'Is the 1997 table still the one used in 2026?', a: 'Yes. Official ASVAB states that current AFQT percentiles refer to the national sample of youths aged 18 to 23 tested in 1997, and the score scale built on that sample has been used since 2004. New test forms are equated to that scale, so the table keeps its meaning across forms and years.' },
    ],
    body: (h) => `<h2>The formula, step by step</h2>
<p>Your score sheet shows a standard score for each subtest. The AFQT uses four of them, but Word Knowledge and Paragraph Comprehension first combine into Verbal Expression, printed as VE. The ${h.src('segall', 'technical report of the 1997 scale')} defines the composite as AR + MK + 2 × VE, with each standard score rounded to a whole number before the addition. The sum is then converted into a percentile with table 2.5 of the same report.</p>
<p>Take a candidate with AR 54, MK 49 and VE 52. The sum is 54 + 49 + 104 = 207, and the table gives ${lk(207)}. If VE rose to 55, the sum would reach 213 and the percentile ${lk(213)}. If AR rose by the same three points instead, the sum would be 210 and the percentile ${lk(210)}. The calculator above does these readings for you and also shows how many points of sum you still need to reach the next threshold.</p>
${extract(h)}
<h2>Why the table and not a formula</h2>
<p>The percentiles were measured, not computed from a bell curve. The norming study weighted the answers of about six thousand youths to stand for the national population, and the table records, for each sum, the share of that population at or below it. This is why the steps are uneven: between 199 and 200 the percentile moves from ${lk(199)} to ${lk(200)}, while 215 and 216 jump from ${lk(215)} to ${lk(216)}. A calculator that fits a smooth curve can be off by two or three percentiles near the thresholds that decide eligibility.</p>
${h.mini('afqt', { t: 'Check a sum near a threshold', p: ['ar', 'mk', 've'] })}
<h2>What the percentile decides</h2>
<p>Each branch sets a minimum AFQT for enlistment, and the law caps the share of recruits in Category IV, the band from 10 to 30. The ${h.a('minimum-score', 'minimum score page')} lists the floor of each branch as its recruiting site states it, and the ${h.a('afqt-categories', 'categories page')} explains the bands from I to V. The AFQT does not assign a job: line scores do, and the ${h.a('line-scores', 'line score calculator')} uses the same inputs plus your other subtests.</p>
<h2>Limits of the calculation</h2>
<p>The calculation is exact for the inputs you give, because it uses the printed table. Two errors are still possible. The first is a typo: VE is easy to confuse with WK or PC on the sheet. If you only have WK and PC, rebuild VE with the ${h.a('ve-score', 'VE calculator')}, which is accurate within about one point. The second is a score from an older sheet: results before the 2004 change of scale were on the 1980 scale and do not convert with this table.</p>
<h2>Reading your own sheet</h2>
<p>On an enlistment score sheet from the MEPS, the subtest scores sit in one row and the AFQT in a separate box. Check that the AFQT you compute matches the printed one: if it does, your inputs are right and you can trust the line scores this site derives from them. If it does not, the most common cause is a VE taken from the wrong column. On a school score report from the Career Exploration Program, the subtests appear as standard scores too, and the AFQT is printed under the name Military Entrance Score. The same table applies, and the ${h.a('school-asvab', 'school ASVAB page')} explains when those scores can be used to enlist. If you have not taken the test yet, no calculator can give you an AFQT: start with the ${h.a('practice-test', 'practice test')} to see which subtests need work.</p>`,
  },
  es: {
    slug: 'calculadora-afqt', nav: 'Calculadora AFQT', card: 'AR + MK + 2VE leído en la tabla oficial de 1997',
    title: 'AFQT 2026: calculadora del percentil de su hoja ASVAB',
    description: 'Calculadora AFQT 2026: sume AR, MK y dos veces VE, lea el percentil en la tabla oficial de conversión de 1997 y vea su categoría y el siguiente nivel.',
    h1: 'Calculadora AFQT: su percentil a partir de AR, MK y VE',
    intro: 'Bastan tres puntajes estándar de su hoja del ASVAB. El percentil sale directamente de la tabla de conversión publicada por el Defense Manpower Data Center.',
    resume: `El percentil AFQT se calcula en dos pasos. Primero, se suman los puntajes estándar de Razonamiento Aritmético y Conocimientos Matemáticos y dos veces el de Expresión Verbal: con AR 50, MK 50 y VE 50 la suma es 200. Después, esa suma se lee en la tabla 2.5 del informe de la escala de 1997, que da el percentil de cada suma desde ${E.tableRange('AFQT').min} o menos hasta ${E.tableRange('AFQT').max} o más. Una suma de 200 da ${lk(200)}, ${s31} da 31, ${s50} da 50, ${s65} da 65, ${s93} da 93 y ${s99} o más da 99, el valor más alto que se informa. El percentil es la parte de una muestra nacional de jóvenes de 18 a 23 años, examinados en 1997, que obtuvo la misma suma o menos. No es un porcentaje de respuestas correctas, y dos personas con la misma suma siempre tienen el mismo percentil, sea cual sea la forma o la versión del examen que hicieron.`,
    faqs: [
      { q: '¿Por qué Expresión Verbal cuenta doble en el AFQT?', a: 'La fórmula da el mismo peso a la parte verbal y a la parte matemática. AR y MK son dos subpruebas de matemáticas, mientras que VE es un solo compuesto verbal hecho con Conocimiento de Palabras y Comprensión de Lectura, así que se cuenta dos veces para equilibrar las dos mitades. En la práctica, un punto de VE mueve la suma tanto como dos puntos repartidos entre AR y MK.' },
      { q: '¿Qué AFQT da una suma de 183?', a: `Una suma de 183 se lee como ${lk(183)} en la tabla de 1997, el mínimo del Ejército, la Fuerza Aérea y los Marines para quien tiene diploma de secundaria. Un punto menos, 182, se lee como ${lk(182)} y no alcanzaría. En esa zona la tabla avanza más o menos un percentil por punto de suma, así que cada punto cuenta.` },
      { q: '¿Se puede calcular el AFQT con el número de aciertos?', a: 'No. El examen se califica con la teoría de respuesta al ítem: importa la dificultad de cada pregunta respondida y, en la versión por computadora, las preguntas se adaptan a usted. Solo se pueden convertir los puntajes estándar impresos en la hoja de resultados. Un número de aciertos en un examen de práctica no se convierte en puntaje estándar.' },
      { q: '¿La tabla de 1997 sigue vigente en 2026?', a: 'Sí. Official ASVAB indica que los percentiles AFQT actuales se refieren a la muestra nacional de jóvenes de 18 a 23 años examinados en 1997, y la escala construida con esa muestra se usa desde 2004. Las nuevas formas del examen se equiparan a esa escala, así que la tabla conserva su sentido entre formas y años.' },
    ],
    body: (h) => `<h2>La fórmula, paso a paso</h2>
<p>Su hoja de resultados muestra un puntaje estándar por subprueba. El AFQT usa cuatro, pero Conocimiento de Palabras y Comprensión de Lectura se combinan antes en Expresión Verbal, impresa como VE. El ${h.src('segall', 'informe técnico de la escala de 1997')} define el compuesto como AR + MK + 2 × VE, con cada puntaje estándar redondeado a un número entero antes de sumar. Luego la suma se convierte en percentil con la tabla 2.5 del mismo informe.</p>
<p>Tome a un aspirante con AR 54, MK 49 y VE 52. La suma es 54 + 49 + 104 = 207 y la tabla da ${lk(207)}. Si VE subiera a 55, la suma llegaría a 213 y el percentil a ${lk(213)}. Si en cambio AR subiera los mismos tres puntos, la suma sería 210 y el percentil ${lk(210)}. La calculadora de arriba hace estas lecturas por usted y además muestra cuántos puntos de suma le faltan para el siguiente umbral.</p>
${extract(h)}
<h2>Por qué una tabla y no una fórmula</h2>
<p>Los percentiles se midieron, no se calcularon con una campana. El estudio de normas ponderó las respuestas de unos seis mil jóvenes para representar a la población nacional, y la tabla registra, para cada suma, la parte de esa población que quedó en ella o por debajo. Por eso los saltos son irregulares: entre 199 y 200 el percentil pasa de ${lk(199)} a ${lk(200)}, mientras que 215 y 216 saltan de ${lk(215)} a ${lk(216)}. Una calculadora que ajusta una curva suave puede equivocarse en dos o tres percentiles justo en los umbrales que deciden si uno califica.</p>
${h.mini('afqt', { t: 'Pruebe una suma cerca de un umbral', p: ['ar', 'mk', 've'] })}
<h2>Lo que decide el percentil</h2>
<p>Cada rama fija un AFQT mínimo para alistarse, y la ley limita la parte de reclutas en la categoría IV, la franja de 10 a 30. La página del ${h.a('minimum-score', 'puntaje mínimo')} lista el piso de cada rama tal como lo publica su sitio de reclutamiento, y la de ${h.a('afqt-categories', 'categorías')} explica las franjas de I a V. El AFQT no asigna un empleo: lo hacen los line scores, y la ${h.a('line-scores', 'calculadora de line scores')} usa los mismos datos más sus otras subpruebas.</p>
<h2>Límites del cálculo</h2>
<p>El cálculo es exacto para los datos que usted escribe, porque usa la tabla impresa. Aun así hay dos errores posibles. El primero es de transcripción: en la hoja es fácil confundir VE con WK o PC. Si solo tiene WK y PC, reconstruya VE con la ${h.a('ve-score', 'calculadora de VE')}, precisa a un punto. El segundo es un puntaje de una hoja antigua: los resultados anteriores al cambio de escala de 2004 estaban en la escala de 1980 y no se convierten con esta tabla.</p>
<h2>Cómo leer su propia hoja</h2>
<p>En una hoja de resultados del MEPS, los puntajes de las subpruebas están en una fila y el AFQT en un recuadro aparte. Compruebe que el AFQT que calcula coincide con el impreso: si coincide, sus datos son correctos y puede confiar en los line scores que este sitio deriva de ellos. Si no coincide, la causa más común es un VE tomado de la columna equivocada. En un informe escolar del Career Exploration Program, las subpruebas aparecen también como puntajes estándar y el AFQT figura con el nombre Military Entrance Score. Se aplica la misma tabla, y la página del ${h.a('school-asvab', 'ASVAB en la escuela')} explica cuándo esos puntajes sirven para alistarse. Si todavía no hizo el examen, ninguna calculadora puede darle un AFQT: empiece por el ${h.a('practice-test', 'examen de práctica')} para ver qué subpruebas necesitan trabajo.</p>`,
  },
});
