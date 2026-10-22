import { defineGuide } from '../../lib/page-types';
import type { Helpers } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const E = K.E, W = K.P.armyComposites as unknown as Record<string, number[]>;
const cols = ['GS', 'AR', 'MK', 'MC', 'EI', 'AS', 'VE'];

function weights(h: Helpers) {
  const rows = E.ARMY_KEYS.map((k) => [k, ...W[k].slice(0, 7).map((x) => h.n(x, 2)), h.n(W[k][7], 1)]);
  return h.table([h.L('Line score', 'Line score'), ...cols, h.L('Constant', 'Constante')], rows,
    h.L('Weights of table 2.7 of the 1997 score scale report (2004). Each composite = sum of weight × standard score + constant, rounded.', 'Pesos de la tabla 2.7 del informe de la escala de 1997 (2004). Cada compuesto = suma de peso × puntaje estándar + constante, redondeado.'), ['l', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r']);
}

export default defineGuide({
  id: 'army', group: 'branches', order: 11,
  tool: 'army',
  related: ['army-gt', 'line-scores', 'minimum-score', 'afqt-calculator'],
  sources: ['army', 'segall', 'oa-eligibility'],
  en: {
    slug: 'army-asvab-score', nav: 'Army ASVAB score', card: 'AFQT 31, GT and the ten Army line scores',
    title: 'Army ASVAB Score 2026: AFQT 31, GT and All Line Scores',
    description: 'Army ASVAB score for 2026: the AFQT of 31 the Army asks, the prep course from 21, your exact GT score and estimates of the nine other Army line scores.',
    h1: 'Army ASVAB score: the minimum, GT and every line score',
    intro: 'Type your AR and VE for the GT, and open the other scores for the full set of Army line scores, from Clerical to Skilled Technical.',
    resume: `To enlist in the Army you need an AFQT of at least ${K.P.branches.army.min}, as goarmy.com states, which is a sum of ${E.sumForPercentile(31)} on AR + MK + 2VE. The Army also describes a Future Soldier Preparatory Course with an academic track for applicants who score 21 or more, and a second option for scores from 31 to 49. Once eligible, jobs, called MOS, are assigned on ten line scores. The General Technical score, GT, is computed exactly from Arithmetic Reasoning and Verbal Expression: 1.074292 × (AR + VE) − 7.443781, rounded, so AR 50 and VE 50 give ${E.armyGt({ AR: 50, VE: 50 })} and AR 55 and VE 57 give ${E.armyGt({ AR: 55, VE: 57 })}. The other nine, from Clerical to Skilled Technical, weight seven subtests differently; this site applies the 2004 weights and labels them as estimates, because the Army may have revised them. All Army line scores have a mean of 100 and a standard deviation of 20.`.replace('−', '-'),
    faqs: [
      { q: 'What ASVAB score do you need for the Army in 2026?', a: `The Army's recruiting site asks for an AFQT of at least 31 to enlist. Applicants from 21 can be offered the academic track of the Future Soldier Preparatory Course, which works on the skills measured by the test before enlistment. After that, each Army job asks for a minimum in one or two line scores, such as GT or MM.` },
      { q: 'What is a good Army GT score?', a: `The GT has a mean of 100 in the reference sample, so 100 is average and 110 is the level required by the Army's Officer Candidate School according to National Guard pages. A GT of 110 needs AR + VE of about ${Math.ceil((110 + 7.443781 - 0.5) / 1.074292)}. Many technical and intelligence jobs ask for GT scores above 100.` },
      { q: 'Can I see the Army line score for a specific MOS here?', a: 'No. This site gives your line scores but does not publish MOS minimums, because the current Army list could not be read in full on the day of the check. Ask your recruiter for the requirement of the MOS you want and compare it with the line score shown by the calculator.' },
    ],
    body: (h) => `<h2>The floor and the preparatory course</h2>
<p>The ${h.src('army', 'Army ASVAB page')} gives the minimum plainly: an ASVAB score of at least 31 to enlist. It adds that applicants with a minimum score of 21 may qualify for the academic track of the Future Soldier Preparatory Course, and that applicants between 31 and 49 could qualify for a second option of the course. The course is a way to reach or exceed the standard with help before basic training, not a lower standard. In sums, 21 corresponds to ${E.sumForPercentile(21)} on AR + MK + 2VE and 31 to ${E.sumForPercentile(31)}.</p>
<h2>The GT, the line score you meet everywhere</h2>
<p>The ${h.src('segall', '1997 score scale report')} gives the GT formula separately and exactly: the sum AR + VE is multiplied by 1.074292, reduced by 7.443781 and rounded, which places it on a scale with mean 100 and standard deviation 20. Each point of AR or VE adds about one point of GT. The ${h.a('army-gt', 'Army GT page')} works through targets such as 100, 107 and 110, the score that state National Guard pages give for Officer Candidate School.</p>
${h.mini('gt', { t: 'GT and the points you still need', p: ['ar', 've', 'g'] })}
<h2>The nine other composites</h2>
<p>The other line scores combine seven subtests with weights chosen to predict success in training. Table 2.7 of the same report gives them for the 1997 scale. The calculator applies them to your scores and labels the result as an estimate: the report dates from 2004, and the Army may have updated the weights since. In practice an estimate can differ from the printout by a few points, so use it to see which composites are strong or weak, and the printout for a decision near a minimum.</p>
${weights(h)}
<h2>Reading the weights</h2>
<p>The table shows what each composite rewards. Mechanical Maintenance, MM, leans heavily on Auto and Shop. Clerical, CL, ignores General Science and leans on AR, MK and VE. Combat, CO, mixes most subtests with moderate weights. Surveillance and Communications, SC, leans on MK and VE. If you want a family of jobs, the subtests with the largest weights in its composite are the ones to practice.</p>
<h2>What this page leaves out</h2>
<p>The minimum line score of each Army MOS is not on this site. The list changes and could not be read in full on the day of the check. The AFQT floor, the GT formula and the 2004 weights are documented; the job minimums come from your recruiter. The ${h.a('line-scores', 'line score page')} compares the Army composites with the Marine Corps and Air Force ones from the same scores.</p>
<h2>Raising a line score before a retest</h2>
<p>Because every composite is a weighted sum, the gain from a subtest is easy to predict. Take an applicant with AR 48 and VE 50: the GT is ${E.armyGt({ AR: 48, VE: 50 })}. Four more points of AR bring it to ${E.armyGt({ AR: 52, VE: 50 })}, and four more points of VE as well bring it to ${E.armyGt({ AR: 52, VE: 54 })}. The same AR gain also lifts the AFQT, since AR is part of it, while a gain in Auto and Shop moves MM a lot and the AFQT not at all. Retest rules apply to the whole battery: one month after the first test, one month after the second, then six months, and Official ASVAB asks for a confirmation test after a jump of 20 AFQT points or more within six months.</p>`,
  },
  es: {
    slug: 'asvab-ejercito', nav: 'ASVAB del Ejército', card: 'AFQT 31, GT y los diez line scores del Ejército',
    title: 'ASVAB del Ejército 2026: AFQT 31, GT y todos los line scores',
    description: 'ASVAB del Ejército en 2026: el AFQT de 31 que pide el Ejército, el curso preparatorio desde 21, su GT exacto y estimaciones de los otros nueve line scores.',
    h1: 'Puntaje del ASVAB para el Ejército: el mínimo, el GT y cada line score',
    intro: 'Escriba su AR y su VE para el GT, y abra los demás puntajes para ver todos los line scores del Ejército, de Administrativo a Técnico especializado.',
    resume: `Para alistarse en el Ejército necesita un AFQT de al menos ${K.P.branches.army.min}, según goarmy.com, lo que equivale a una suma de ${E.sumForPercentile(31)} en AR + MK + 2VE. El Ejército describe además un Future Soldier Preparatory Course con una vía académica para aspirantes desde 21 y una segunda opción para puntajes de 31 a 49. Una vez que califica, los empleos, llamados MOS, se asignan con diez line scores. El puntaje General Técnico, GT, se calcula de forma exacta con Razonamiento Aritmético y Expresión Verbal: 1,074292 × (AR + VE) - 7,443781, redondeado, así que AR 50 y VE 50 dan ${E.armyGt({ AR: 50, VE: 50 })} y AR 55 y VE 57 dan ${E.armyGt({ AR: 55, VE: 57 })}. Los otros nueve, de Administrativo a Técnico especializado, ponderan siete subpruebas de forma distinta; este sitio aplica los pesos de 2004 y los presenta como estimaciones, porque el Ejército puede haberlos revisado. Todos los line scores del Ejército tienen media 100 y desviación típica 20.`,
    faqs: [
      { q: '¿Qué puntaje del ASVAB pide el Ejército en 2026?', a: 'El sitio de reclutamiento del Ejército pide un AFQT de al menos 31 para alistarse. A los aspirantes desde 21 se les puede ofrecer la vía académica del Future Soldier Preparatory Course, que trabaja antes del alistamiento las habilidades que mide el examen. Después, cada empleo del Ejército pide un mínimo en uno o dos line scores, como el GT o el MM.' },
      { q: '¿Qué es un buen GT en el Ejército?', a: `El GT tiene media 100 en la muestra de referencia, así que 100 es el promedio y 110 es el nivel que pide la Officer Candidate School del Ejército según páginas de la Guardia Nacional. Un GT de 110 requiere un AR + VE de alrededor de ${Math.ceil((110 + 7.443781 - 0.5) / 1.074292)}. Muchos empleos técnicos y de inteligencia piden GT por encima de 100.` },
      { q: '¿Puedo ver aquí el line score de un MOS concreto?', a: 'No. Este sitio da sus line scores pero no publica los mínimos de cada MOS, porque la lista vigente del Ejército no pudo leerse completa el día de la verificación. Pida a su reclutador el requisito del MOS que le interesa y compárelo con el line score que muestra la calculadora.' },
    ],
    body: (h) => `<h2>El piso y el curso preparatorio</h2>
<p>La ${h.src('army', 'página del ASVAB del Ejército')} da el mínimo sin rodeos: un puntaje del ASVAB de al menos 31 para alistarse. Añade que los aspirantes con un mínimo de 21 pueden calificar para la vía académica del Future Soldier Preparatory Course, y que quienes tienen entre 31 y 49 podrían calificar para una segunda opción del curso. El curso es una manera de alcanzar o superar el estándar con ayuda antes del entrenamiento básico, no un estándar más bajo. En sumas, 21 corresponde a ${E.sumForPercentile(21)} en AR + MK + 2VE y 31 a ${E.sumForPercentile(31)}.</p>
<h2>El GT, el line score que aparece en todas partes</h2>
<p>El ${h.src('segall', 'informe de la escala de 1997')} da la fórmula del GT aparte y de forma exacta: la suma AR + VE se multiplica por 1,074292, se le restan 7,443781 y se redondea, lo que la sitúa en una escala de media 100 y desviación típica 20. Cada punto de AR o de VE añade más o menos un punto de GT. La página del ${h.a('army-gt', 'GT del Ejército')} trabaja metas como 100, 107 y 110, el puntaje que las páginas de la Guardia Nacional de los estados dan para la Officer Candidate School.</p>
${h.mini('gt', { t: 'El GT y los puntos que faltan', p: ['ar', 've', 'g'] })}
<h2>Los otros nueve compuestos</h2>
<p>Los demás line scores combinan siete subpruebas con pesos elegidos para predecir el éxito en la formación. La tabla 2.7 del mismo informe los da para la escala de 1997. La calculadora los aplica a sus puntajes y presenta el resultado como estimación: el informe es de 2004 y el Ejército puede haber actualizado los pesos desde entonces. En la práctica una estimación puede diferir de la hoja en algunos puntos, así que úsela para ver qué compuestos son fuertes o débiles, y la hoja para decidir cerca de un mínimo.</p>
${weights(h)}
<h2>Cómo leer los pesos</h2>
<p>La tabla muestra qué premia cada compuesto. Mantenimiento mecánico, MM, se apoya mucho en Autos y Taller. Administrativo, CL, no usa Ciencia General y se apoya en AR, MK y VE. Combate, CO, mezcla casi todas las subpruebas con pesos moderados. Vigilancia y comunicaciones, SC, se apoya en MK y VE. Si busca una familia de empleos, las subpruebas con más peso en su compuesto son las que conviene practicar.</p>
<h2>Lo que esta página deja fuera</h2>
<p>El line score mínimo de cada MOS del Ejército no está en este sitio. La lista cambia y no pudo leerse completa el día de la verificación. El piso AFQT, la fórmula del GT y los pesos de 2004 están documentados; los mínimos por empleo los da su reclutador. La página de ${h.a('line-scores', 'line scores')} compara los compuestos del Ejército con los de los Marines y la Fuerza Aérea con los mismos puntajes.</p>
<h2>Subir un line score antes de repetir el examen</h2>
<p>Como cada compuesto es una suma ponderada, la ganancia de una subprueba es fácil de prever. Tome a un aspirante con AR 48 y VE 50: el GT es ${E.armyGt({ AR: 48, VE: 50 })}. Cuatro puntos más de AR lo llevan a ${E.armyGt({ AR: 52, VE: 50 })}, y cuatro puntos más de VE además lo llevan a ${E.armyGt({ AR: 52, VE: 54 })}. La misma subida de AR también levanta el AFQT, porque AR forma parte de él, mientras que una subida en Autos y Taller mueve mucho el MM y nada el AFQT. Las reglas de repetición se aplican a todo el examen: un mes después del primero, un mes después del segundo y luego seis meses, y Official ASVAB pide una prueba de confirmación tras una subida de 20 puntos AFQT o más en seis meses.</p>
<h2>Lo que mira el reclutador</h2>
<p>En la oficina de reclutamiento, el AFQT decide primero si usted puede firmar, y luego la lista de empleos se filtra por line scores, por condiciones médicas y por necesidades del momento. Llevar sus puntajes estándar anotados y saber cuál de sus line scores es el más fuerte le permite preguntar por los empleos que de verdad le corresponden en lugar de recibir una lista general.</p>`,
  },
});
