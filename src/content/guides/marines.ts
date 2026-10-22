import { defineGuide } from '../../lib/page-types';
import type { Helpers } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const E = K.E, B = K.P.branches.marines, M = K.P.marines as unknown as Record<string, [string[], number, number]>;
const ex = { AR: 52, MC: 55, EI: 49, AS: 57, VE: 48, GS: 50, MK: 47 };

function formulas(h: Helpers) {
  const r = E.marines(ex);
  const rows = (['GT', 'MM', 'EL', 'CL'] as const).map((k) => [k, M[k][0].join(' + '), `${h.n(M[k][1], 6)} × S ${h.n(M[k][2], 6)}`.replace(' -', ' - '), r[k]]);
  return h.table([h.L('Composite', 'Compuesto'), h.L('Sum S of', 'Suma S de'), h.L('Transformation', 'Transformación'), h.L('Example', 'Ejemplo')], rows,
    h.L('Formulas of section 2.5.2 of the 1997 score scale report, rounded to the nearest whole number. Example: AR 52, MC 55, EI 49, AS 57, VE 48, GS 50, MK 47.', 'Fórmulas de la sección 2.5.2 del informe de la escala de 1997, redondeadas al entero más cercano. Ejemplo: AR 52, MC 55, EI 49, AS 57, VE 48, GS 50, MK 47.'), ['l', 'l', 'l', 'r']);
}

export default defineGuide({
  id: 'marines', group: 'branches', order: 15,
  tool: 'marines',
  related: ['line-scores', 'minimum-score', 'ged', 'mechanical-comprehension', 'army-gt'],
  sources: ['marines', 'segall'],
  en: {
    slug: 'marine-corps-asvab-score', nav: 'Marine Corps ASVAB score', card: 'AFQT 31 or 50 and the GT, MM, EL and CL composites',
    title: 'Marine Corps ASVAB Score 2026: AFQT, GT, MM, EL and CL',
    description: 'Marine Corps ASVAB score in 2026: AFQT 31, or 50 with a GED, and your GT, MM, EL and CL composites computed with the exact formulas of the 1997 score scale.',
    h1: 'Marine Corps ASVAB score: the floor and the four composites',
    intro: 'Type your AR, VE and MC, then open the other subtests: the calculator gives your Marine Corps GT, MM, EL and CL with the published formulas.',
    resume: `The Marine Corps asks for an ASVAB score of ${B.min} or higher, or ${B.ged} or more for applicants holding a GED or a nontraditional diploma, as marines.com states; in sums of standard scores, ${E.sumForPercentile(B.min!)} and ${E.sumForPercentile(B.ged!)} on AR + MK + 2VE. Jobs then read four composites, placed on a scale with a mean of 100 and a standard deviation of 20: GT adds AR, MC and VE; MM adds AR, MC, EI and AS; EL adds GS, AR, MK and EI; CL adds MK and VE. Each sum goes through a rounded linear transformation published in the 1997 score scale report, so the results are exact for the scores you enter. With 50 on every subtest, the four composites come out at ${E.marines({}).GT}, ${E.marines({}).MM}, ${E.marines({}).EL} and ${E.marines({}).CL}. Unlike the Army GT, the Marine GT includes Mechanical Comprehension, so the two cannot be swapped.`,
    faqs: [
      { q: 'What is the Marine Corps GT score?', a: `The Marine GT, General Technical, is the sum of Arithmetic Reasoning, Mechanical Comprehension and Verbal Expression, multiplied by 0.755294, reduced by 13.289535 and rounded. With 50 on each it gives ${E.marines({}).GT}. It is not the Army GT, which uses only AR and VE with other constants, so a requirement written for one does not apply to the other.` },
      { q: 'What ASVAB score do Marines need with a GED?', a: `Marines.com asks for 50 or more from applicants with a GED or a nontraditional diploma, against 31 for a high school diploma. That is a sum of ${E.sumForPercentile(50)} instead of ${E.sumForPercentile(31)} on AR + MK + 2VE. The composites required for each job are the same whatever the credential.` },
      { q: 'Does this site list the minimum composite for each Marine MOS?', a: 'No. The official Marine Corps list of occupational specialties could not be read on the day of the check, so no job minimum is published here. The calculator gives your four composites exactly; compare them with the requirement your recruiter gives you for the MOS you want.' },
    ],
    body: (h) => `<h2>The enlistment floor</h2>
<p>The ${h.src('marines', 'Marine Corps requirements page')} states that aspiring Marines must reach a minimum ASVAB score of 31 or higher, or 50 or more when holding a GED or nontraditional diploma, alongside the Initial Strength Test and the other requirements. The score meant is the AFQT percentile. The gap between the two floors is large: nineteen points of the AR + MK + 2VE sum, so a GED holder needs to plan for it. The ${h.a('ged', 'GED page')} works through that case.</p>
<h2>The four composites, exactly</h2>
<p>Section 2.5.2 of the ${h.src('segall', '1997 score scale report')} defines the Marine Corps composites as unit-weighted sums of standard scores, then standardizes each to a mean of 100 and a standard deviation of 20 in the 1997 youth sample. With the published means and standard deviations, each one becomes a single line: a slope, a constant, then rounding. The table gives the four lines and their results for one example profile.</p>
${formulas(h)}
<p>The report notes that the Clerical composite was not used operationally when it was written and was included in anticipation of its use. The calculator computes it like the others; whether a given job reads it is a question for your recruiter.</p>
${h.mini('lines', { t: 'Compare with the Army and Air Force from the same scores', p: ['ar', 've', 'mk'] })}
<h2>A mechanical profile</h2>
<p>In the example, an applicant with strong Auto and Shop and Mechanical Comprehension but a VE of 48 gets an MM of ${E.marines(ex).MM}, above average, while the AFQT is ${E.afqt(ex)}. Mechanical Comprehension also enters the GT, which is why the Marine GT rewards technical aptitude more than the Army one does. For the same scores, the Army GT is ${E.armyGt(ex)} and the Marine GT ${E.marines(ex).GT}. Mechanical subtests are trained on the ${h.a('mechanical-comprehension', 'Mechanical Comprehension')} and ${h.a('auto-shop', 'Auto and Shop')} practice pages.</p>
<h2>Which composite for which field</h2>
<p>The names describe the families of jobs that read them: MM for mechanical maintenance, EL for electronics repair, GT for general technical fields and many specialties that require reasoning and reading, CL for clerical and administrative work. Many specialties ask for one of them with a minimum, and some ask for two. This site does not publish those minimums, because the current list could not be read, but it gives you the four numbers to compare.</p>
<h2>Raising a composite</h2>
<p>Each composite is a plain sum before the transformation, so every subtest in it counts equally. One more point in any of the subtests of MM raises MM by about 0.59 before rounding; one more point in MK or VE raises CL by about 1.09, since CL has only two subtests. The weakest subtest in the composite you need is usually where practice pays most. Retests follow the usual waiting periods, one month, one month, then six months, and the whole battery is retaken each time.</p>
<h2>Checking your sheet</h2>
<p>If your recruiter gave you the four composites, enter your standard scores and compare. The formulas are exact, so the numbers should match to the point. A difference usually comes from a misread subtest, often AS, which on the computer test combines Auto Information and Shop Information into a single score, or VE, which is easy to confuse with WK. When the numbers match, you can use the calculator to try what a retest would change: add three points to Mechanical Comprehension and watch GT and MM move together, or add them to VE and see GT and CL rise along with the AFQT.</p>`,
  },
  es: {
    slug: 'asvab-marines', nav: 'ASVAB de los Marines', card: 'AFQT 31 o 50 y los compuestos GT, MM, EL y CL',
    title: 'ASVAB de los Marines 2026: AFQT, GT, MM, EL y CL exactos',
    description: 'ASVAB de los Marines en 2026: AFQT 31, o 50 con GED, y sus compuestos GT, MM, EL y CL calculados con las fórmulas exactas de la escala de puntajes de 1997.',
    h1: 'ASVAB para los Marines: el piso y los cuatro compuestos',
    intro: 'Escriba su AR, su VE y su MC, y abra las demás subpruebas: la calculadora da su GT, MM, EL y CL de los Marines con las fórmulas publicadas.',
    resume: `El Cuerpo de Marines pide un puntaje del ASVAB de ${B.min} o más, o de ${B.ged} o más para quienes tienen un GED o un diploma no tradicional, según marines.com; en sumas de puntajes estándar, ${E.sumForPercentile(B.min!)} y ${E.sumForPercentile(B.ged!)} en AR + MK + 2VE. Luego los empleos leen cuatro compuestos, en una escala de media 100 y desviación típica 20: GT suma AR, MC y VE; MM suma AR, MC, EI y AS; EL suma GS, AR, MK y EI; CL suma MK y VE. Cada suma pasa por una transformación lineal redondeada publicada en el informe de la escala de 1997, así que los resultados son exactos para los puntajes que escribe. Con 50 en todas las subpruebas, los cuatro compuestos dan ${E.marines({}).GT}, ${E.marines({}).MM}, ${E.marines({}).EL} y ${E.marines({}).CL}. A diferencia del GT del Ejército, el GT de los Marines incluye Comprensión Mecánica, así que no se pueden intercambiar.`,
    faqs: [
      { q: '¿Qué es el GT de los Marines?', a: `El GT de los Marines, General Técnico, es la suma de Razonamiento Aritmético, Comprensión Mecánica y Expresión Verbal, multiplicada por 0,755294, menos 13,289535 y redondeada. Con 50 en cada una da ${E.marines({}).GT}. No es el GT del Ejército, que usa solo AR y VE con otras constantes, así que un requisito escrito para uno no se aplica al otro.` },
      { q: '¿Qué puntaje del ASVAB necesitan los Marines con GED?', a: `Marines.com pide 50 o más a quienes tienen un GED o un diploma no tradicional, frente a 31 con diploma de secundaria. Es una suma de ${E.sumForPercentile(50)} en lugar de ${E.sumForPercentile(31)} en AR + MK + 2VE. Los compuestos que pide cada empleo son los mismos sea cual sea el título.` },
      { q: '¿Este sitio da el compuesto mínimo de cada MOS de los Marines?', a: 'No. La lista oficial de especialidades del Cuerpo de Marines no pudo leerse el día de la verificación, así que aquí no se publica ningún mínimo por empleo. La calculadora da sus cuatro compuestos de forma exacta; compárelos con el requisito que le dé su reclutador para el MOS que quiere.' },
    ],
    body: (h) => `<h2>El piso para alistarse</h2>
<p>La ${h.src('marines', 'página de requisitos del Cuerpo de Marines')} indica que los aspirantes deben alcanzar un puntaje mínimo del ASVAB de 31 o más, o de 50 o más con un GED o un diploma no tradicional, además de la Initial Strength Test y los demás requisitos. El puntaje del que se habla es el percentil AFQT. La brecha entre los dos pisos es grande: diecinueve puntos de la suma AR + MK + 2VE, así que quien tiene un GED debe planearla. La página del ${h.a('ged', 'ASVAB con GED')} desarrolla ese caso.</p>
<h2>Los cuatro compuestos, exactos</h2>
<p>La sección 2.5.2 del ${h.src('segall', 'informe de la escala de 1997')} define los compuestos de los Marines como sumas de puntajes estándar con peso uno, y luego estandariza cada una a media 100 y desviación típica 20 en la muestra juvenil de 1997. Con las medias y desviaciones publicadas, cada uno se reduce a una sola línea: una pendiente, una constante y el redondeo. La tabla da las cuatro líneas y sus resultados para un perfil de ejemplo.</p>
${formulas(h)}
<p>El informe señala que el compuesto Administrativo no se usaba de forma operativa cuando se escribió y se incluyó previendo su uso. La calculadora lo calcula igual que los demás; si un empleo concreto lo lee es algo que debe preguntar a su reclutador.</p>
${h.mini('lines', { t: 'Compárelo con el Ejército y la Fuerza Aérea con los mismos puntajes', p: ['ar', 've', 'mk'] })}
<h2>Un perfil mecánico</h2>
<p>En el ejemplo, un aspirante con buenos puntajes en Autos y Taller y en Comprensión Mecánica pero con un VE de 48 obtiene un MM de ${E.marines(ex).MM}, por encima del promedio, mientras que su AFQT es ${E.afqt(ex)}. Comprensión Mecánica entra también en el GT, y por eso el GT de los Marines premia más la aptitud técnica que el del Ejército. Con los mismos puntajes, el GT del Ejército es ${E.armyGt(ex)} y el de los Marines ${E.marines(ex).GT}. Las subpruebas mecánicas se entrenan en las páginas de práctica de ${h.a('mechanical-comprehension', 'Comprensión Mecánica')} y de ${h.a('auto-shop', 'Autos y Taller')}.</p>
<h2>Qué compuesto para qué área</h2>
<p>Los nombres describen las familias de empleos que los leen: MM para mantenimiento mecánico, EL para reparación electrónica, GT para áreas técnicas generales y muchas especialidades que exigen razonamiento y lectura, CL para trabajo administrativo. Muchas especialidades piden uno de ellos con un mínimo, y algunas piden dos. Este sitio no publica esos mínimos, porque la lista vigente no pudo leerse, pero le da los cuatro números para comparar.</p>
<h2>Subir un compuesto</h2>
<p>Cada compuesto es una suma simple antes de la transformación, así que cada subprueba que contiene cuenta igual. Un punto más en cualquiera de las subpruebas de MM sube el MM unos 0,59 antes de redondear; un punto más en MK o en VE sube el CL unos 1,09, porque CL solo tiene dos subpruebas. La subprueba más débil del compuesto que necesita suele ser donde la práctica rinde más. Las repeticiones siguen los plazos habituales, un mes, un mes y luego seis meses, y cada vez se repite el examen completo.</p>
<h2>Comprobar su hoja</h2>
<p>Si su reclutador le dio los cuatro compuestos, escriba sus puntajes estándar y compare. Las fórmulas son exactas, así que los números deben coincidir punto por punto. Una diferencia suele venir de una subprueba mal leída, a menudo AS, que en el examen por computadora reúne Información de Autos e Información de Taller en un solo puntaje, o VE, fácil de confundir con WK. Cuando los números coinciden, puede usar la calculadora para probar qué cambiaría una repetición: sume tres puntos a Comprensión Mecánica y vea subir juntos el GT y el MM.</p>`,
  },
});
