import { defineGuide } from '../../lib/page-types';
import type { Helpers } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const E = K.E;
const avg = { GS: 50, AR: 50, VE: 50, MK: 50, EI: 50, AS: 50, MC: 50 };
const tech = { GS: 48, AR: 49, VE: 46, MK: 47, EI: 58, AS: 60, MC: 59 };

function compare(h: Helpers) {
  const a = E.army(avg), b = E.army(tech), ma = E.marines(avg), mb = E.marines(tech), fa = E.mage(avg), fb = E.mage(tech);
  const rows: Array<Array<string | number>> = [
    ['AFQT', E.afqt(avg), E.afqt(tech)],
    [h.L('Air Force Mechanical (percentile)', 'Fuerza Aérea, Mecánico (percentil)'), fa.M.pct, fb.M.pct],
    [h.L('Air Force General (percentile)', 'Fuerza Aérea, General (percentil)'), fa.G.pct, fb.G.pct],
    [h.L('Army GT', 'GT del Ejército'), a.GT, b.GT],
    [h.L('Army MM (estimate)', 'MM del Ejército (estimación)'), a.MM, b.MM],
    [h.L('Marine Corps MM', 'MM de los Marines'), ma.MM, mb.MM],
    [h.L('Marine Corps GT', 'GT de los Marines'), ma.GT, mb.GT],
  ];
  return h.table([h.L('Score', 'Puntaje'), h.L('All subtests at 50', 'Todas las subpruebas en 50'), h.L('Strong technical profile', 'Perfil técnico fuerte')], rows,
    h.L('Technical profile: GS 48, AR 49, VE 46, MK 47, EI 58, AS 60, MC 59.', 'Perfil técnico: GS 48, AR 49, VE 46, MK 47, EI 58, AS 60, MC 59.'), ['l', 'r', 'r']);
}

export default defineGuide({
  id: 'line-scores', group: 'scores', order: 6,
  tool: 'lines',
  related: ['army', 'air-force', 'marines', 'navy', 'army-gt'],
  sources: ['segall', 'airforce', 'oa-scores'],
  en: {
    slug: 'asvab-line-scores', nav: 'ASVAB line scores', card: 'Every service composite from the same subtests',
    title: 'ASVAB Line Scores 2026: Army, Marine, Air Force Composites',
    description: 'ASVAB line scores for 2026: Army GT and nine other composites, Marine Corps MM, GT, EL and CL, Air Force MAGE percentiles, computed from your standard scores.',
    h1: 'ASVAB line scores: every service composite from your subtests',
    intro: 'Type seven standard scores once. The table under the calculator gives the Air Force MAGE percentiles, the four Marine Corps composites and the ten Army line scores.',
    resume: `Line scores, or composites, are the scores that place you in a job, while the AFQT only decides whether you can enlist. Each service builds its own from the subtests. The Air Force adds standard scores into four sums, Mechanical, Administrative, General and Electrical, and converts each into a percentile with its own 1997 table. The Marine Corps and the Army put their composites on a scale with a mean of 100 and a standard deviation of 20: the Army GT is 1.074292 times AR plus VE, minus 7.443781, rounded, so 50 and 50 give ${E.armyGt({ AR: 50, VE: 50 })} and 55 and 55 give ${E.armyGt({ AR: 55, VE: 55 })}. The Navy reports plain sums of standard scores. The formulas here come from the 1997 score scale report; the nine Army composites other than GT use weights published in 2004 and are shown as estimates.`,
    faqs: [
      { q: 'What is the difference between the AFQT and line scores?', a: 'The AFQT uses four subtests, through AR, MK and VE, and decides eligibility for enlistment. Line scores use other combinations, including the technical subtests that the AFQT ignores, and decide which jobs you qualify for. Two applicants with the same AFQT can have very different line scores, which is why job lists differ between people in the same category.' },
      { q: 'Why are Army and Marine line scores centered on 100?', a: 'Both services report composites on a standardized scale with a mean of 100 and a standard deviation of 20 in the 1997 youth sample. A GT of 100 is average, 120 is one deviation above and 80 one deviation below. The Air Force reports percentiles from 1 to 99 instead, and the Navy uses raw sums, so numbers cannot be compared across services.' },
      { q: 'Are the estimated Army composites reliable?', a: 'They follow the weights of table 2.7 of the 1997 score scale report, which converted the Army composites to the new scale in 2004. If the Army has revised those weights since, its printout will differ by a few points. The GT is not affected: its formula is given separately and exactly in the same report.' },
    ],
    body: (h) => `<h2>Three systems, one set of subtests</h2>
<p>The services did not agree on a single way to combine subtests. The ${h.src('segall', '1997 score scale report')} documents three systems. The Air Force forms unit-weighted sums, ${Object.entries(E.MAGE_PARTS).map(([k, w]) => `${k} = ${Object.entries(w).map(([s, x]) => (x === 2 ? `2${s}` : s)).join(' + ')}`).join(', ')}, and reports each as the percentile of the 1997 sample at or below that sum. The Marine Corps standardizes four sums, ${Object.entries(E.MARINE_PARTS).map(([k, w]) => `${k} = ${w.join(' + ')}`).join(', ')}, to a mean of 100 and a standard deviation of 20. The Army does the same for GT, built on AR and VE, and computes nine other composites with weights that differ for each subtest. The Navy keeps raw sums. The ${h.src('airforce', 'Air Force ASVAB page')} lists the same subtests for each MAGE area.</p>
${compare(h)}
<h2>Why a technical profile changes everything</h2>
<p>The table compares an applicant with 50 on every subtest and an applicant with a technical profile: average or slightly weak in math and verbal, strong in electronics, auto and mechanics. The second has a lower AFQT, ${E.afqt(tech)} against ${E.afqt(avg)}, yet a much higher Mechanical percentile and higher maintenance composites. For a mechanical or electrical job, the second profile is the stronger one. This is the main reason to look beyond the AFQT once you are eligible.</p>
${h.mini('mage', { t: 'Air Force percentiles from the same scores', p: ['ar', 've', 'mk', 'gs'] })}
<h2>What each Army composite is for</h2>
<p>The Army uses its line scores to qualify soldiers for its jobs, called MOS. GT, General Technical, is the most widely used, including for officer candidate programs; CL is clerical, CO combat, EL electronics, FA field artillery, GM general maintenance, MM mechanical maintenance, OF operators and food, SC surveillance and communications, and ST skilled technical. Each MOS lists one or two line scores with a minimum. This site does not publish MOS minimums, because the Army's current list could not be checked; ask your recruiter for the job you want and compare it with the ${h.a('army', 'Army line score calculator')}.</p>
<h2>Marine Corps and Navy</h2>
<p>The Marine Corps uses its four composites for its occupational fields, with MM for mechanics, EL for electronics, GT for technical and command fields and CL for administration; the ${h.a('marines', 'Marine Corps page')} computes them. The Navy states each rating requirement as a sum of standard scores, for example two or four subtests added together, and the ${h.a('navy', 'Navy page')} adds any combination you choose. Because these are raw sums, a Navy requirement can be checked by hand from the sheet.</p>
<h2>Using the calculator well</h2>
<p>Enter the standard scores exactly as printed, including AS, which on the computer version combines Auto Information and Shop Information. If you only know WK and PC, rebuild VE first with the ${h.a('ve-score', 'VE calculator')}. Then read the composite of the job you want, not the highest one. If a composite falls a few points short, the formula tells you which subtests to work on: for the Army GT, only AR and VE count, so MK practice will not help it.</p>`,
  },
  es: {
    slug: 'line-scores-asvab', nav: 'Line scores del ASVAB', card: 'Todos los compuestos de las ramas con las mismas subpruebas',
    title: 'Line scores del ASVAB 2026: Ejército, Marines y Fuerza Aérea',
    description: 'Line scores del ASVAB 2026: el GT del Ejército y otros nueve compuestos, MM, GT, EL y CL de los Marines y los percentiles MAGE de la Fuerza Aérea, al instante.',
    h1: 'Line scores del ASVAB: todos los compuestos con sus subpruebas',
    intro: 'Escriba siete puntajes estándar una sola vez. La tabla bajo la calculadora da los percentiles MAGE de la Fuerza Aérea, los cuatro compuestos de los Marines y los diez line scores del Ejército.',
    resume: `Los line scores, o compuestos, son los puntajes que lo ubican en un empleo, mientras que el AFQT solo decide si puede alistarse. Cada rama arma los suyos con las subpruebas. La Fuerza Aérea suma puntajes estándar en cuatro grupos, Mecánico, Administrativo, General y Eléctrico, y convierte cada uno en percentil con su propia tabla de 1997. Los Marines y el Ejército ponen sus compuestos en una escala de media 100 y desviación típica 20: el GT del Ejército es 1,074292 veces AR más VE, menos 7,443781, redondeado, así que 50 y 50 dan ${E.armyGt({ AR: 50, VE: 50 })} y 55 y 55 dan ${E.armyGt({ AR: 55, VE: 55 })}. La Armada informa sumas simples de puntajes estándar. Las fórmulas vienen del informe de la escala de 1997; los nueve compuestos del Ejército distintos del GT usan pesos publicados en 2004 y se muestran como estimaciones.`,
    faqs: [
      { q: '¿Qué diferencia hay entre el AFQT y los line scores?', a: 'El AFQT usa cuatro subpruebas, a través de AR, MK y VE, y decide si uno puede alistarse. Los line scores usan otras combinaciones, incluidas las subpruebas técnicas que el AFQT no tiene en cuenta, y deciden para qué empleos califica. Dos aspirantes con el mismo AFQT pueden tener line scores muy distintos, y por eso las listas de empleos cambian entre personas de la misma categoría.' },
      { q: '¿Por qué los line scores del Ejército y de los Marines giran en torno a 100?', a: 'Las dos ramas informan sus compuestos en una escala estandarizada de media 100 y desviación típica 20 en la muestra juvenil de 1997. Un GT de 100 es el promedio, 120 está una desviación por encima y 80 una por debajo. La Fuerza Aérea informa percentiles de 1 a 99 y la Armada sumas simples, así que los números no se comparan entre ramas.' },
      { q: '¿Son fiables los compuestos estimados del Ejército?', a: 'Siguen los pesos de la tabla 2.7 del informe de la escala de 1997, que pasó los compuestos del Ejército a la nueva escala en 2004. Si el Ejército revisó esos pesos después, su hoja diferirá en algunos puntos. El GT no se ve afectado: su fórmula aparece aparte y de forma exacta en el mismo informe.' },
    ],
    body: (h) => `<h2>Tres sistemas, un solo juego de subpruebas</h2>
<p>Las ramas no se pusieron de acuerdo en una sola manera de combinar las subpruebas. El ${h.src('segall', 'informe de la escala de 1997')} documenta tres sistemas. La Fuerza Aérea forma sumas de peso uno, ${Object.entries(E.MAGE_PARTS).map(([k, w]) => `${k} = ${Object.entries(w).map(([s, x]) => (x === 2 ? `2${s}` : s)).join(' + ')}`).join(', ')}, e informa cada una como el percentil de la muestra de 1997 que quedó en esa suma o por debajo. Los Marines estandarizan cuatro sumas, ${Object.entries(E.MARINE_PARTS).map(([k, w]) => `${k} = ${w.join(' + ')}`).join(', ')}, a media 100 y desviación típica 20. El Ejército hace lo mismo con el GT, basado en AR y VE, y calcula otros nueve compuestos con pesos distintos para cada subprueba. La Armada mantiene sumas simples. La ${h.src('airforce', 'página del ASVAB de la Fuerza Aérea')} da las mismas subpruebas para cada área MAGE.</p>
${compare(h)}
<h2>Por qué un perfil técnico lo cambia todo</h2>
<p>La tabla compara a un aspirante con 50 en todas las subpruebas y a uno con perfil técnico: promedio o algo débil en matemáticas y lenguaje, fuerte en electrónica, autos y mecánica. El segundo tiene un AFQT más bajo, ${E.afqt(tech)} frente a ${E.afqt(avg)}, pero un percentil Mecánico mucho más alto y compuestos de mantenimiento más altos. Para un empleo mecánico o eléctrico, el segundo perfil es el más fuerte. Esa es la razón principal para mirar más allá del AFQT una vez que uno califica.</p>
${h.mini('mage', { t: 'Percentiles de la Fuerza Aérea con los mismos puntajes', p: ['ar', 've', 'mk', 'gs'] })}
<h2>Para qué sirve cada compuesto del Ejército</h2>
<p>El Ejército usa sus line scores para calificar a los soldados para sus empleos, llamados MOS. El GT, General Técnico, es el más usado, también para los programas de candidatos a oficial; CL es administrativo, CO combate, EL electrónica, FA artillería de campaña, GM mantenimiento general, MM mantenimiento mecánico, OF operadores y alimentación, SC vigilancia y comunicaciones, y ST técnico especializado. Cada MOS pide uno o dos line scores con un mínimo. Este sitio no publica los mínimos de los MOS, porque la lista vigente del Ejército no pudo verificarse; pregunte a su reclutador por el empleo que quiere y compárelo con la ${h.a('army', 'calculadora del Ejército')}.</p>
<h2>Marines y Armada</h2>
<p>Los Marines usan sus cuatro compuestos para sus campos ocupacionales: MM para mecánica, EL para electrónica, GT para campos técnicos y de mando y CL para administración; la ${h.a('marines', 'página de los Marines')} los calcula. La Armada expresa el requisito de cada rating como una suma de puntajes estándar, por ejemplo dos o cuatro subpruebas sumadas, y la ${h.a('navy', 'página de la Armada')} suma la combinación que usted elija. Como son sumas simples, un requisito de la Armada se puede comprobar a mano con la hoja.</p>
<h2>Cómo usar bien la calculadora</h2>
<p>Escriba los puntajes estándar tal como están impresos, incluido AS, que en la versión por computadora combina Información de Autos e Información de Taller. Si solo conoce WK y PC, reconstruya primero VE con la ${h.a('ve-score', 'calculadora de VE')}. Luego lea el compuesto del empleo que busca, no el más alto. Si un compuesto se queda corto por pocos puntos, la fórmula le dice qué subpruebas trabajar: para el GT del Ejército solo cuentan AR y VE, así que practicar MK no lo sube.</p>`,
  },
});
