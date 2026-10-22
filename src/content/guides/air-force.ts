import { defineGuide } from '../../lib/page-types';
import type { Helpers } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const E = K.E, B = K.P.branches.airforce;
const parts = (k: 'M' | 'A' | 'G' | 'E') => Object.entries(E.MAGE_PARTS[k]).map(([s, x]) => (x === 2 ? `2${s}` : s)).join(' + ');
const avg = { AR: 50, MK: 50, VE: 50, GS: 50, EI: 50, AS: 50, MC: 50 };

function sums(h: Helpers) {
  const rows = (['M', 'A', 'G', 'E'] as const).map((k) => {
    const lo = E.tableRange(k).min, hi = E.tableRange(k).max, at = E.mage(avg)[k];
    return [h.L({ M: 'Mechanical', A: 'Administrative', G: 'General', E: 'Electrical' }[k], { M: 'Mecánico', A: 'Administrativo', G: 'General', E: 'Eléctrico' }[k]), parts(k), `${lo} - ${hi}`, `${at.sum} → ${at.pct}`];
  });
  return h.table([h.L('Area', 'Área'), h.L('Sum of standard scores', 'Suma de puntajes estándar'), h.L('Range of table', 'Rango de la tabla'), h.L('All subtests at 50', 'Todo en 50')], rows,
    h.L('Composites and conversion tables C.1 to C.4 of the 1997 score scale report.', 'Compuestos y tablas de conversión C.1 a C.4 del informe de la escala de 1997.'), ['l', 'l', 'r', 'r']);
}

export default defineGuide({
  id: 'air-force', group: 'branches', order: 13,
  tool: 'mage',
  related: ['air-force-jobs', 'line-scores', 'minimum-score', 'ged'],
  sources: ['airforce', 'segall', 'af-careers'],
  en: {
    slug: 'air-force-asvab-score', nav: 'Air Force ASVAB score', card: 'AFQT 31 or 50 and the four MAGE percentiles',
    title: 'Air Force ASVAB Score 2026: AFQT and MAGE Percentiles',
    description: 'Air Force ASVAB score for 2026: AFQT 31 with a diploma or 50 with a GED, and your Mechanical, Administrative, General and Electrical percentiles at once.',
    h1: 'Air Force ASVAB score: the AFQT floor and the MAGE percentiles',
    intro: 'Type your standard scores: the calculator adds them into the four Air Force composites and reads each percentile in its own 1997 table.',
    resume: `The Air Force asks an AFQT of at least ${B.min} from high school seniors and graduates and ${B.ged} from GED holders, as airforce.com states. Jobs are then assigned on four composites, known as MAGE: Mechanical = ${parts('M')}, Administrative = ${parts('A')}, General = ${parts('G')} and Electrical = ${parts('E')}. Each sum is turned into a percentile from 1 to 99 with its own table from the 1997 score scale report, so an applicant with 50 on every subtest gets ${E.mage(avg).M.pct} in Mechanical, ${E.mage(avg).A.pct} in Administrative, ${E.mage(avg).G.pct} in General and ${E.mage(avg).E.pct} in Electrical, not 50 everywhere. Each enlisted career lists a minimum in one or two areas, for example G55 or M47 with A28. The calculator gives your four percentiles and counts the ${K.JOBS.length} enlisted careers listed on airforce.com whose minimums you meet.`,
    faqs: [
      { q: 'What does MAGE stand for in the Air Force?', a: 'MAGE stands for the four Air Force aptitude areas: Mechanical, Administrative, General and Electrical. Each is a sum of ASVAB standard scores converted to a percentile. The Air Force site lists the subtests of each area: AR, AS, MC and VE for Mechanical, MK and VE for Administrative, AR and VE for General, and AR, EI, GS and MK for Electrical.' },
      { q: 'What ASVAB score do you need for the Air Force with a GED?', a: `The Air Force site asks GED holders for an AFQT of at least ${B.ged}, against ${B.min} for high school seniors and graduates. In sums of standard scores, ${B.ged} needs AR + MK + 2VE of ${E.sumForPercentile(B.ged!)}, against ${E.sumForPercentile(B.min!)} for ${B.min}. The MAGE requirements of each job are the same whatever the credential.` },
      { q: 'Why is my Mechanical percentile low when my AFQT is good?', a: 'The Mechanical area adds Auto and Shop and Mechanical Comprehension to AR and twice VE. Those technical subtests are not part of the AFQT, so a strong math and verbal profile with weak technical scores gives a good AFQT and a modest Mechanical percentile. The reverse also happens, which is why the Air Force reads each area separately.' },
    ],
    body: (h) => `<h2>The AFQT floor</h2>
<p>The ${h.src('airforce', 'Air Force ASVAB page')} states two minimums: an AFQT of ${B.min} for high school seniors and graduates, and ${B.ged} for GED holders. The second is much higher: in sums of AR + MK + 2VE, ${E.sumForPercentile(B.ged!)} instead of ${E.sumForPercentile(B.min!)}. The ${h.a('ged', 'GED page')} shows how to plan for that gap. The page also lists the nine subtests and marks the four that make up the AFQT, which matches the formula of the ${h.src('segall', '1997 score scale report')}.</p>
<h2>The four composites</h2>
<p>The report defines the Air Force composites as unit-weighted sums of standard scores, with VE counted twice in Mechanical, and gives a conversion table for each one, tables C.1 to C.4. Like the AFQT, each percentile is the share of the 1997 youth sample at or below the sum. The table below shows each sum, the range the conversion table covers and the result for an applicant with 50 everywhere.</p>
${sums(h)}
<p>The results for an average profile differ from 50 because each table was measured on real scores, and the subtests in each sum are correlated in different ways. That is also why the percentiles cannot be compared directly with the Army or Marine Corps line scores, which sit on a scale centered on 100.</p>
${h.mini('afjobs', { t: 'Air Force jobs within reach of your percentiles', p: ['m', 'a', 'g', 'e'] })}
<h2>From percentiles to careers</h2>
<p>Each enlisted career on ${h.src('af-careers', 'airforce.com')} lists its MAGE minimum, such as A55 for Administration or E70 for several electronics careers. Some list two areas joined by an ampersand; this site requires both. Of the ${K.JOBS.length} enlisted careers read on the date of this page, ${K.JOBS.filter((j) => !j.req.length).length} list no minimum. The ${h.a('air-force-jobs', 'Air Force job finder')} filters them by your four percentiles and by career field.</p>
<h2>Which subtests to work on</h2>
<p>General and Administrative depend only on AR, MK and VE, the subtests of the AFQT, so working on the AFQT lifts them too. Electrical adds General Science and Electronics Information, and Mechanical adds Auto and Shop and Mechanical Comprehension. If the career you want asks for a high E or M, the technical subtests are the lever: the ${h.a('electronics-information', 'Electronics Information')} and ${h.a('mechanical-comprehension', 'Mechanical Comprehension')} practice pages have questions written for this site.</p>
<h2>Limits</h2>
<p>The composites and tables come from the 2004 report, which documents the scale still in use; the Air Force could in principle change a composite, so the printout of your test prevails. Career minimums come from the airforce.com careers listing on the date shown, and a recruiter confirms the current ones before you sign.</p>
<h2>A worked example</h2>
<p>Consider an applicant who wants an electronics career listed at E70. Her scores are AR 55, MK 56, VE 52, GS 54 and EI 51. Her Electrical sum is ${55 + 56 + 54 + 51}, which the table converts to ${E.lookup('E', 216)}. Six more points of Electronics Information would bring the sum to 222 and the percentile to ${E.lookup('E', 222)}. Her General percentile, from AR and VE, is ${E.lookup('G', 107)}, and her AFQT is ${E.afqt({ AR: 55, MK: 56, VE: 52 })}, comfortably above both Air Force floors. For her, the useful work is in EI and GS, two subtests the AFQT does not even look at. The same reasoning applies to every career: find the area it lists, then the subtests inside that area where you have the most room.</p>`,
  },
  es: {
    slug: 'asvab-fuerza-aerea', nav: 'ASVAB de la Fuerza Aérea', card: 'AFQT 31 o 50 y los cuatro percentiles MAGE',
    title: 'ASVAB de la Fuerza Aérea 2026: AFQT y percentiles MAGE',
    description: 'ASVAB de la Fuerza Aérea en 2026: AFQT 31 con diploma o 50 con GED, y sus percentiles Mecánico, Administrativo, General y Eléctrico con las tablas de 1997.',
    h1: 'ASVAB para la Fuerza Aérea: el piso AFQT y los percentiles MAGE',
    intro: 'Escriba sus puntajes estándar: la calculadora los suma en los cuatro compuestos de la Fuerza Aérea y lee cada percentil en su propia tabla de 1997.',
    resume: `La Fuerza Aérea pide un AFQT de al menos ${B.min} a estudiantes del último año y graduados de secundaria y ${B.ged} a quienes tienen GED, según airforce.com. Luego los empleos se asignan con cuatro compuestos, llamados MAGE: Mecánico = ${parts('M')}, Administrativo = ${parts('A')}, General = ${parts('G')} y Eléctrico = ${parts('E')}. Cada suma se convierte en un percentil de 1 a 99 con su propia tabla del informe de la escala de 1997, así que un aspirante con 50 en todas las subpruebas obtiene ${E.mage(avg).M.pct} en Mecánico, ${E.mage(avg).A.pct} en Administrativo, ${E.mage(avg).G.pct} en General y ${E.mage(avg).E.pct} en Eléctrico, no 50 en todo. Cada carrera enlisted indica un mínimo en una o dos áreas, por ejemplo G55 o M47 con A28. La calculadora da sus cuatro percentiles y cuenta las ${K.JOBS.length} carreras enlisted de airforce.com cuyos mínimos cumple.`,
    faqs: [
      { q: '¿Qué significa MAGE en la Fuerza Aérea?', a: 'MAGE son las cuatro áreas de aptitud de la Fuerza Aérea: Mecánica, Administrativa, General y Eléctrica. Cada una es una suma de puntajes estándar del ASVAB convertida en percentil. El sitio de la Fuerza Aérea da las subpruebas de cada área: AR, AS, MC y VE para Mecánica, MK y VE para Administrativa, AR y VE para General, y AR, EI, GS y MK para Eléctrica.' },
      { q: '¿Qué puntaje del ASVAB pide la Fuerza Aérea con GED?', a: `El sitio de la Fuerza Aérea pide a quienes tienen GED un AFQT de al menos ${B.ged}, frente a ${B.min} para estudiantes del último año y graduados. En sumas de puntajes estándar, ${B.ged} necesita un AR + MK + 2VE de ${E.sumForPercentile(B.ged!)}, frente a ${E.sumForPercentile(B.min!)} para ${B.min}. Los requisitos MAGE de cada empleo son los mismos sea cual sea el título.` },
      { q: '¿Por qué mi percentil Mecánico es bajo si mi AFQT es bueno?', a: 'El área Mecánica suma Autos y Taller y Comprensión Mecánica a AR y dos veces VE. Esas subpruebas técnicas no forman parte del AFQT, así que un perfil fuerte en matemáticas y lenguaje con puntajes técnicos débiles da un buen AFQT y un percentil Mecánico modesto. También ocurre lo contrario, y por eso la Fuerza Aérea lee cada área por separado.' },
    ],
    body: (h) => `<h2>El piso AFQT</h2>
<p>La ${h.src('airforce', 'página del ASVAB de la Fuerza Aérea')} da dos mínimos: un AFQT de ${B.min} para estudiantes del último año y graduados de secundaria, y ${B.ged} para quienes tienen GED. El segundo es mucho más alto: en sumas de AR + MK + 2VE, ${E.sumForPercentile(B.ged!)} en lugar de ${E.sumForPercentile(B.min!)}. La página del ${h.a('ged', 'ASVAB con GED')} muestra cómo planear esa brecha. La página oficial lista además las nueve subpruebas y marca las cuatro que forman el AFQT, lo que coincide con la fórmula del ${h.src('segall', 'informe de la escala de 1997')}.</p>
<h2>Los cuatro compuestos</h2>
<p>El informe define los compuestos de la Fuerza Aérea como sumas de puntajes estándar con peso uno, con VE contado dos veces en Mecánico, y da una tabla de conversión para cada uno, las tablas C.1 a C.4. Como en el AFQT, cada percentil es la parte de la muestra juvenil de 1997 que quedó en esa suma o por debajo. La tabla siguiente muestra cada suma, el rango que cubre la tabla de conversión y el resultado para un aspirante con 50 en todo.</p>
${sums(h)}
<p>Los resultados de un perfil promedio no son 50 porque cada tabla se midió con puntajes reales, y las subpruebas de cada suma están correlacionadas de forma distinta. Por eso tampoco se pueden comparar estos percentiles con los line scores del Ejército o de los Marines, que están en una escala centrada en 100.</p>
${h.mini('afjobs', { t: 'Empleos de la Fuerza Aérea al alcance de sus percentiles', p: ['m', 'a', 'g', 'e'] })}
<h2>De los percentiles a las carreras</h2>
<p>Cada carrera enlisted de ${h.src('af-careers', 'airforce.com')} indica su mínimo MAGE, como A55 para Administración o E70 para varias carreras de electrónica. Algunas indican dos áreas unidas por un signo &amp;; este sitio exige ambas. De las ${K.JOBS.length} carreras enlisted leídas en la fecha de esta página, ${K.JOBS.filter((j) => !j.req.length).length} no indican mínimo. El ${h.a('air-force-jobs', 'buscador de empleos de la Fuerza Aérea')} las filtra por sus cuatro percentiles y por área profesional. Los títulos de las carreras se muestran en inglés, tal como los publica la Fuerza Aérea.</p>
<h2>Qué subpruebas trabajar</h2>
<p>General y Administrativo dependen solo de AR, MK y VE, las subpruebas del AFQT, así que trabajar el AFQT también los sube. Eléctrico añade Ciencia General e Información Electrónica, y Mecánico añade Autos y Taller y Comprensión Mecánica. Si la carrera que quiere pide un E o un M alto, las subpruebas técnicas son la palanca: las páginas de práctica de ${h.a('electronics-information', 'Información Electrónica')} y de ${h.a('mechanical-comprehension', 'Comprensión Mecánica')} tienen preguntas escritas para este sitio.</p>
<h2>Límites</h2>
<p>Los compuestos y las tablas vienen del informe de 2004, que documenta la escala que sigue en uso; la Fuerza Aérea podría en principio cambiar un compuesto, así que la hoja de su examen prevalece. Los mínimos de las carreras vienen de la lista de carreras de airforce.com en la fecha indicada, y un reclutador confirma los vigentes antes de firmar.</p>
<h2>Un ejemplo resuelto</h2>
<p>Piense en una aspirante que quiere una carrera de electrónica con mínimo E70. Sus puntajes son AR 55, MK 56, VE 52, GS 54 y EI 51. Su suma Eléctrica es ${55 + 56 + 54 + 51}, que la tabla convierte en ${E.lookup('E', 216)}. Seis puntos más de Información Electrónica llevarían la suma a 222 y el percentil a ${E.lookup('E', 222)}. Su percentil General, con AR y VE, es ${E.lookup('G', 107)}, y su AFQT es ${E.afqt({ AR: 55, MK: 56, VE: 52 })}, holgadamente por encima de los dos pisos de la Fuerza Aérea. Para ella, el trabajo útil está en EI y GS, dos subpruebas que el AFQT ni siquiera mira.</p>`,
  },
});
