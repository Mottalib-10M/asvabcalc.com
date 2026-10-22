import { defineGuide } from '../../lib/page-types';
import type { Helpers } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const E = K.E;
/** Plus petite somme AR + VE qui donne un GT donné. */
const need = (gt: number) => { let s = 40; while (E.armyGt({ AR: s, VE: 0 }) < gt) s++; return s; };

function targets(h: Helpers) {
  const rows = [90, 95, 100, 105, 107, 110, 115, 120].map((g) => [g, need(g), `${Math.ceil(need(g) / 2)} + ${Math.floor(need(g) / 2)}`]);
  return h.table(['GT', h.L('Smallest AR + VE', 'AR + VE mínimo'), h.L('For example AR + VE', 'Por ejemplo AR + VE')], rows,
    h.L('From the exact formula GT = Rnd(1.074292 × (AR + VE) - 7.443781).', 'Con la fórmula exacta GT = Rnd(1,074292 × (AR + VE) - 7,443781).'), ['r', 'r', 'r']);
}

export default defineGuide({
  id: 'army-gt', group: 'branches', order: 12,
  tool: 'gt',
  related: ['army', 've-score', 'arithmetic-reasoning', 'line-scores'],
  sources: ['segall', 'army-ocs-hi', 'army-ocs-mn', 'army'],
  en: {
    slug: 'army-gt-score', nav: 'Army GT score', card: 'The exact GT formula and the AR + VE behind each target',
    title: 'Army GT Score 2026: Exact Formula and the 110 for OCS',
    description: 'Army GT score in 2026: the exact formula from AR and VE, the sum needed for 100, 107 or 110, the GT listed for Officer Candidate School and how to raise it.',
    h1: 'Army GT score: the exact formula and the points you need',
    intro: 'Type your Arithmetic Reasoning and Verbal Expression standard scores and pick the GT you need: the calculator gives your GT and the points of AR + VE still missing.',
    resume: `The Army General Technical score, GT, depends on two subtests only. The 1997 score scale report gives its exact formula: GT equals 1.074292 times the sum of Arithmetic Reasoning and Verbal Expression, minus 7.443781, rounded to the nearest whole number. The result sits on a scale with a mean of 100 and a standard deviation of 20. With AR 50 and VE 50, the GT is ${E.armyGt({ AR: 50, VE: 50 })}. A GT of 100 needs AR + VE of at least ${need(100)}, a GT of 107 needs ${need(107)} and a GT of 110 needs ${need(110)}. The Hawaii and Minnesota National Guard list a GT of 110 among the requirements of Officer Candidate School. Since only AR and VE count, Mathematics Knowledge, General Science and the technical subtests do nothing for the GT, however high they are.`,
    faqs: [
      { q: 'What GT score do you need for Army OCS?', a: 'The Officer Candidate School pages of the Hawaii and Minnesota Army National Guard list a GT score of 110 among the requirements, with college credits and an age limit. Active duty and other states may phrase it differently, so check with the recruiter for your program. A GT of 110 corresponds to AR + VE of at least ' + need(110) + '.' },
      { q: 'Can I raise my GT without retaking the whole ASVAB?', a: 'No. The GT comes from your ASVAB standard scores, so a higher GT needs a new test, under the normal retest rules: one month after the first test, another month after the second, then six months. The waiting period is the time to work on AR and VE, the only two subtests the GT uses, and the score itself always comes from a full ASVAB.' },
      { q: 'Why does my GT not change when my math score improves?', a: 'Because the GT uses Arithmetic Reasoning and Verbal Expression only. Mathematics Knowledge, the algebra and geometry subtest, is part of the AFQT but not of the GT. An improvement in MK raises your AFQT and some other line scores, but to raise the GT you need word problems, vocabulary or reading.' },
    ],
    body: (h) => `<h2>The formula, exactly</h2>
<p>The ${h.src('segall', '1997 score scale report')} explains, in its section on the Army, that the GT is a unit-weighted sum of AR and VE, standardized so that it has a mean of 100 and a standard deviation of 20 in the 1997 youth sample. With the published mean and standard deviation of the sum, the transformation simplifies to 1.074292 × (AR + VE) − 7.443781, then rounded. The calculator applies that line and nothing else, so the GT you see is the one the formula gives for your standard scores.</p>
${targets(h)}
<h2>Targets that come up often</h2>
<p>A GT of 100 is the average of the reference sample. Many Army jobs ask for a GT in the 90s or 100s, often together with a second line score. A GT of 110 is the level the ${h.src('army-ocs-hi', 'Hawaii Army National Guard')} and the ${h.src('army-ocs-mn', 'Minnesota National Guard')} list for Officer Candidate School. This site does not publish job by job minimums, because the current Army list could not be read in full; for a given MOS, ask the recruiter for the number, then use the calculator to see how far you are.</p>
${h.mini('gt', { t: 'Points to a GT of 110', p: ['ar', 've'], d: { ar: 52, ve: 53, g: '110' } })}
<h2>Where the points come from</h2>
<p>Each point of AR or VE adds about 1.07 points of GT before rounding. AR measures word problems solved without a calculator; VE comes from Word Knowledge and Paragraph Comprehension, with Word Knowledge weighing more. An applicant with AR 49 and VE 53 has a GT of ${E.armyGt({ AR: 49, VE: 53 })}. Five more AR points give ${E.armyGt({ AR: 54, VE: 53 })}; five more VE points give the same, since both enter the sum with the same weight. The cheaper path is the subtest with more room: a lower standard score usually rises faster with practice. The ${h.a('arithmetic-reasoning', 'Arithmetic Reasoning practice')} and the ${h.a('ve-score', 'VE page')} help you choose.</p>
<h2>GT and AFQT together</h2>
<p>AR and VE also make up three quarters of the AFQT sum, since VE counts twice there. A gain in VE therefore raises both scores at once, while a gain in AR raises the GT and the AFQT one for one. An applicant who works on VE for the GT also moves toward the next AFQT category. The ${h.a('army', 'Army page')} shows all ten line scores from your scores, and the ${h.a('line-scores', 'line score calculator')} compares them with the other services.</p>
<h2>The GT of other services</h2>
<p>The Marine Corps also has a composite called GT, but it adds Mechanical Comprehension to AR and VE and uses different constants, so the two GT scores are not interchangeable. The Air Force General composite uses AR and VE too, yet reports a percentile. Always check which service's GT a requirement refers to before comparing numbers.</p>
<h2>Rounding near a target</h2>
<p>The rounding step matters at the edges. A sum of ${need(110) - 1} gives a GT of ${E.armyGt({ AR: need(110) - 1, VE: 0 })}, while ${need(110)} gives ${E.armyGt({ AR: need(110), VE: 0 })}: one question on one subtest separates the two. Because standard scores are themselves rounded before the addition, an applicant whose sheet shows a GT one point below a target is often within a single right answer of it. That is worth knowing before a retest decision, and it is also why a recruiter may suggest a retest when a GT falls just short of a program's requirement. The table above gives the smallest sum for each common target, so you can see exactly how many points of AR + VE you need.</p>`.replace('−', '-'),
  },
  es: {
    slug: 'puntaje-gt-ejercito', nav: 'GT del Ejército', card: 'La fórmula exacta del GT y el AR + VE de cada meta',
    title: 'GT del Ejército 2026: fórmula exacta y el 110 de la OCS',
    description: 'GT del Ejército en 2026: la fórmula exacta con AR y VE, la suma necesaria para 100, 107 o 110, el GT de la Officer Candidate School y cómo subir el suyo.',
    h1: 'GT del Ejército: la fórmula exacta y los puntos que necesita',
    intro: 'Escriba sus puntajes estándar de Razonamiento Aritmético y Expresión Verbal y elija el GT que necesita: la calculadora da su GT y los puntos de AR + VE que faltan.',
    resume: `El puntaje General Técnico del Ejército, GT, depende solo de dos subpruebas. El informe de la escala de 1997 da su fórmula exacta: el GT es 1,074292 veces la suma de Razonamiento Aritmético y Expresión Verbal, menos 7,443781, redondeado al entero más cercano. El resultado está en una escala de media 100 y desviación típica 20. Con AR 50 y VE 50, el GT es ${E.armyGt({ AR: 50, VE: 50 })}. Un GT de 100 necesita un AR + VE de al menos ${need(100)}, un GT de 107 necesita ${need(107)} y un GT de 110 necesita ${need(110)}. La Guardia Nacional de Hawái y la de Minnesota incluyen un GT de 110 entre los requisitos de la Officer Candidate School. Como solo cuentan AR y VE, Conocimientos Matemáticos, Ciencia General y las subpruebas técnicas no hacen nada por el GT, por altos que sean.`,
    faqs: [
      { q: '¿Qué GT hace falta para la OCS del Ejército?', a: 'Las páginas de la Officer Candidate School de la Guardia Nacional del Ejército de Hawái y de Minnesota incluyen un GT de 110 entre los requisitos, junto con créditos universitarios y un límite de edad. El servicio activo y otros estados pueden formularlo de otro modo, así que confírmelo con el reclutador de su programa. Un GT de 110 corresponde a un AR + VE de al menos ' + need(110) + '.' },
      { q: '¿Puedo subir mi GT sin repetir todo el ASVAB?', a: 'No. El GT sale de sus puntajes estándar del ASVAB, así que un GT más alto exige un examen nuevo, con las reglas normales de repetición: un mes después del primero, otro mes después del segundo y luego seis meses. El plazo de espera es el momento de trabajar AR y VE, las dos únicas subpruebas que usa el GT, y el puntaje siempre sale de un ASVAB completo.' },
      { q: '¿Por qué mi GT no cambia cuando mejora mi puntaje de matemáticas?', a: 'Porque el GT usa solo Razonamiento Aritmético y Expresión Verbal. Conocimientos Matemáticos, la subprueba de álgebra y geometría, forma parte del AFQT pero no del GT. Una mejora en MK sube su AFQT y algunos otros line scores, pero para subir el GT necesita problemas de palabras, vocabulario o lectura.' },
    ],
    body: (h) => `<h2>La fórmula, exacta</h2>
<p>El ${h.src('segall', 'informe de la escala de 1997')} explica, en su sección sobre el Ejército, que el GT es una suma de AR y VE con pesos iguales, estandarizada para que tenga media 100 y desviación típica 20 en la muestra juvenil de 1997. Con la media y la desviación típica publicadas de esa suma, la transformación se reduce a 1,074292 × (AR + VE) - 7,443781, y luego se redondea. La calculadora aplica esa línea y nada más, así que el GT que ve es el que da la fórmula para sus puntajes estándar.</p>
${targets(h)}
<h2>Metas que aparecen a menudo</h2>
<p>Un GT de 100 es el promedio de la muestra de referencia. Muchos empleos del Ejército piden un GT de 90 o de 100 y algo más, a menudo junto con un segundo line score. Un GT de 110 es el nivel que la ${h.src('army-ocs-hi', 'Guardia Nacional del Ejército de Hawái')} y la ${h.src('army-ocs-mn', 'Guardia Nacional de Minnesota')} indican para la Officer Candidate School. Este sitio no publica mínimos empleo por empleo, porque la lista vigente del Ejército no pudo leerse completa; para un MOS concreto, pida la cifra al reclutador y use la calculadora para ver cuánto le falta.</p>
${h.mini('gt', { t: 'Puntos para un GT de 110', p: ['ar', 've'], d: { ar: 52, ve: 53, g: '110' } })}
<h2>De dónde salen los puntos</h2>
<p>Cada punto de AR o de VE añade unos 1,07 puntos de GT antes de redondear. AR mide problemas de palabras resueltos sin calculadora; VE viene de Conocimiento de Palabras y Comprensión de Lectura, con más peso para Conocimiento de Palabras. Una aspirante con AR 49 y VE 53 tiene un GT de ${E.armyGt({ AR: 49, VE: 53 })}. Cinco puntos más de AR dan ${E.armyGt({ AR: 54, VE: 53 })}; cinco puntos más de VE dan lo mismo, porque los dos entran en la suma con el mismo peso. El camino más barato es la subprueba con más margen: un puntaje estándar más bajo suele subir más rápido con práctica. La ${h.a('arithmetic-reasoning', 'práctica de Razonamiento Aritmético')} y la página de ${h.a('ve-score', 'VE')} le ayudan a elegir.</p>
<h2>El GT y el AFQT juntos</h2>
<p>AR y VE forman también tres cuartas partes de la suma del AFQT, porque allí VE cuenta doble. Una subida en VE levanta los dos puntajes a la vez, mientras que una subida en AR levanta el GT y el AFQT uno por uno. Quien trabaja VE para el GT también se acerca a la siguiente categoría AFQT. La página del ${h.a('army', 'Ejército')} muestra los diez line scores con sus puntajes y la ${h.a('line-scores', 'calculadora de line scores')} los compara con las otras ramas.</p>
<h2>El GT de otras ramas</h2>
<p>Los Marines también tienen un compuesto llamado GT, pero suma Comprensión Mecánica a AR y VE y usa otras constantes, así que los dos GT no son intercambiables. El compuesto General de la Fuerza Aérea usa también AR y VE, pero informa un percentil. Antes de comparar números, compruebe siempre a qué rama se refiere el GT de un requisito.</p>
<h2>El redondeo cerca de una meta</h2>
<p>El paso del redondeo importa en los bordes. Una suma de ${need(110) - 1} da un GT de ${E.armyGt({ AR: need(110) - 1, VE: 0 })}, mientras que ${need(110)} da ${E.armyGt({ AR: need(110), VE: 0 })}: una pregunta en una subprueba separa los dos casos. Como los propios puntajes estándar se redondean antes de sumar, un aspirante cuya hoja muestra un GT a un punto de una meta suele estar a una sola respuesta correcta de alcanzarla. Conviene saberlo antes de decidir si repetir el examen, y por eso un reclutador puede sugerir una repetición cuando el GT se queda justo por debajo del requisito de un programa. La tabla de arriba da la suma más pequeña para cada meta habitual, así que puede ver exactamente cuántos puntos de AR + VE necesita.</p>`,
  },
});
