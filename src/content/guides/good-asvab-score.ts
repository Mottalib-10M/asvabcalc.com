import { defineGuide } from '../../lib/page-types';
import type { Helpers } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const E = K.E, B = K.P.branches;
const sum = (p: number) => E.sumForPercentile(p)!;

function goals(h: Helpers) {
  const rows: Array<Array<string | number>> = [
    [h.L('Army, Air Force, Marine Corps floor (diploma)', 'Piso del Ejército, la Fuerza Aérea y los Marines (diploma)'), 31, sum(31), 'IIIB'],
    [h.L('Coast Guard floor', 'Piso de la Guardia Costera'), B.coastguard.min!, sum(B.coastguard.min!), E.category(B.coastguard.min!)],
    [h.L('Air Force and Marine Corps with a GED', 'Fuerza Aérea y Marines con GED'), B.airforce.ged!, sum(B.airforce.ged!), 'IIIA'],
    [h.L('Start of Category II', 'Inicio de la categoría II'), 65, sum(65), 'II'],
    [h.L('Start of Category I', 'Inicio de la categoría I'), 93, sum(93), 'I'],
  ];
  return h.table([h.L('Goal', 'Objetivo'), 'AFQT', h.L('Sum AR + MK + 2VE', 'Suma AR + MK + 2VE'), h.L('Category', 'Categoría')], rows,
    h.L('Smallest sum that reaches each AFQT in the 1997 table.', 'Suma más pequeña que alcanza cada AFQT en la tabla de 1997.'), ['l', 'r', 'r', 'l']);
}

export default defineGuide({
  id: 'good-asvab-score', group: 'scores', order: 3,
  tool: 'target', toolArg: { t: '50' },
  related: ['afqt-calculator', 'minimum-score', 'afqt-categories', 'study-plan', 'line-scores'],
  sources: ['segall', 'oa-eligibility', 'army', 'airforce', 'marines', 'coastguard', 'usc520'],
  en: {
    slug: 'good-asvab-score', nav: 'What is a good ASVAB score', card: 'The thresholds that matter, goal by goal',
    title: 'Good ASVAB Score 2026: The AFQT Levels That Count Most',
    description: 'Good ASVAB score in 2026: AFQT 31 to enlist in most branches, 50 for incentives, 65 and 93 for the top bands, and the sums of standard scores behind each level.',
    h1: 'What is a good ASVAB score? The levels that change something',
    intro: 'Pick the AFQT you aim for and type your scores: the calculator shows how many points of the AR + MK + 2VE sum are missing, and the cheapest way to find them.',
    resume: `A good ASVAB score is the one that clears the next threshold you need, and there are only a handful of them. AFQT 31, a sum of ${sum(31)} on AR + MK + 2VE, is the floor of the Army, the Air Force and the Marine Corps for a high school diploma; the Coast Guard asks ${B.coastguard.min}. AFQT 50, a sum of ${sum(50)}, opens Category IIIA, where Official ASVAB says applicants may qualify for enlistment incentives, and it is also the floor of the Air Force and the Marine Corps for GED holders. AFQT 65, a sum of ${sum(65)}, starts Category II, and 93, a sum of ${sum(93)}, starts Category I. Beyond eligibility, a good score is the line score the job you want requires, which can matter more than an extra AFQT point. Between two thresholds, a higher AFQT changes little by itself.`,
    faqs: [
      { q: 'Is 50 a good AFQT score?', a: `Yes for most goals. An AFQT of 50 clears every published branch minimum, including the GED floor of the Air Force and the Marine Corps, and it is the bottom of Category IIIA, the band where incentives become possible. It means you scored as well as or better than half of the 1997 reference sample. The sum behind it is ${sum(50)}.` },
      { q: 'Is a 70 on the ASVAB good?', a: 'An AFQT of 70 sits in Category II, the band from 65 to 92, above two thirds of the reference sample. It clears all published minimums. Whether it is enough for a given job depends on line scores: an AFQT of 70 with a weak Mechanical Comprehension score can still miss a mechanical job, so check the composites with the line score calculator.' },
      { q: 'What ASVAB score do you need for a good job?', a: 'Jobs are assigned on composites, not on the AFQT. The Air Force publishes a MAGE percentile for each enlisted career, the Army and the Marine Corps use line scores such as GT, and the Navy adds standard scores for each rating. Aim first for the composite of the job, then make sure the AFQT clears the branch floor.' },
    ],
    body: (h) => `<h2>The thresholds, in sums of standard scores</h2>
<p>Because the AFQT is read in a table, each threshold corresponds to a precise sum. The table below gives the smallest sum of AR + MK + 2VE that reaches each level, read in the ${h.src('segall', '1997 conversion table')}. Branch floors come from the recruiting sites of the ${h.src('army', 'Army')}, the ${h.src('airforce', 'Air Force')}, the ${h.src('marines', 'Marine Corps')} and the ${h.src('coastguard', 'Coast Guard')}.</p>
${goals(h)}
<h2>Why a few points matter more near a threshold</h2>
<p>Take two candidates. The first has AR 47, MK 46 and VE 45, a sum of 183: AFQT ${E.lookup('AFQT', 183)}, exactly at the floor of three branches. The second has AR 46, MK 46 and VE 45, a sum of 182: AFQT ${E.lookup('AFQT', 182)}, one point short. The difference between them is one question on one subtest, yet one can enlist in the Army and the other cannot. Far from a threshold the same point changes nothing that matters. This is why the calculator counts points to the next level instead of showing a grade.</p>
${h.mini('target', { t: 'Points to AFQT 31', p: ['t', 'ar', 'mk', 've'], d: { t: '31', ar: 46, mk: 46, ve: 45 } })}
<h2>What incentives mean here</h2>
<p>Official ASVAB writes on its ${h.src('oa-eligibility', 'enlistment eligibility page')} that applicants in Category IIIA or higher may qualify for enlistment incentives. The page does not list amounts, and they change with the needs of each service, so this site gives none. What the threshold tells you is simple: from AFQT 50, a recruiter can offer more, and below it, the range of choices narrows. The ${h.a('afqt-categories', 'categories page')} details each band.</p>
<h2>A good score for the job you want</h2>
<p>Once eligibility is settled, the useful target becomes a composite. A future Air Force mechanic needs a Mechanical percentile, a future intelligence analyst a General or Administrative percentile, an Army officer candidate a GT score of ${K.P.armyOcsGt}. The ${h.a('line-scores', 'line score calculator')} shows them all, and the ${h.a('study-plan', 'study plan')} shows which subtest gives the most for each extra point. If you have not tested yet, a good score is simply your best one: practice the subtests where you are slow and the rest follows.</p>
<h2>Good compared with whom</h2>
<p>The AFQT compares you with the youths of 1997, not with the other applicants at your MEPS. A percentile of 40 therefore does not mean that 60 percent of recruits beat you; it means 60 percent of that reference group scored higher. Applicants are a selected group, and the law limits how many low scorers the services may take: under ${h.src('usc520', '10 U.S.C. § 520')}, recruits in Category IV, from 10 to 30, are capped, and a person without a high school diploma needs at least 31. So a score that clears the floor is good enough to apply, while a score in Category IIIA or above makes you an applicant the services actively compete for.</p>
<h2>How to move from one level to the next</h2>
<p>The sum gives a clear plan. Verbal Expression counts twice, so each VE point is worth two points of sum; AR and MK count once each. A candidate at a sum of ${sum(50) - 6}, six points short of AFQT 50, can close the gap with three more VE points, or six AR points, or a mix. Word Knowledge is the part of VE that improves fastest with steady vocabulary work, while Arithmetic Reasoning rewards practice on word problems under time pressure. Choose the path where you have the most room, retest after the waiting period, and check the new sum against the table.</p>`,
  },
  es: {
    slug: 'buen-puntaje-asvab', nav: 'Qué es un buen puntaje del ASVAB', card: 'Los umbrales que importan, objetivo por objetivo',
    title: 'Buen puntaje del ASVAB 2026: los niveles AFQT que cuentan',
    description: 'Buen puntaje del ASVAB en 2026: AFQT 31 para alistarse en casi todas las ramas, 50 para incentivos, 65 y 93 para las franjas altas y las sumas detrás.',
    h1: '¿Qué es un buen puntaje del ASVAB? Los niveles que cambian algo',
    intro: 'Elija el AFQT que busca y escriba sus puntajes: la calculadora muestra cuántos puntos de la suma AR + MK + 2VE faltan y la forma más barata de conseguirlos.',
    resume: `Un buen puntaje del ASVAB es el que supera el siguiente umbral que usted necesita, y hay muy pocos. Un AFQT de 31, una suma de ${sum(31)} en AR + MK + 2VE, es el piso del Ejército, la Fuerza Aérea y los Marines con diploma de secundaria; la Guardia Costera pide ${B.coastguard.min}. Un AFQT de 50, una suma de ${sum(50)}, abre la categoría IIIA, donde según Official ASVAB los aspirantes pueden calificar para incentivos de alistamiento, y es también el piso de la Fuerza Aérea y los Marines para quien tiene un GED. Un AFQT de 65, una suma de ${sum(65)}, inicia la categoría II, y 93, una suma de ${sum(93)}, inicia la categoría I. Más allá de poder alistarse, un buen puntaje es el line score que pide el empleo que usted quiere, que puede importar más que un punto extra de AFQT. Entre dos umbrales, subir el AFQT cambia poco por sí solo.`,
    faqs: [
      { q: '¿Un AFQT de 50 es un buen puntaje?', a: `Sí, para casi todos los objetivos. Un AFQT de 50 supera todos los mínimos publicados por las ramas, incluido el piso con GED de la Fuerza Aérea y de los Marines, y es el inicio de la categoría IIIA, la franja en la que los incentivos se vuelven posibles. Significa que le fue igual o mejor que a la mitad de la muestra de 1997. La suma que hay detrás es ${sum(50)}.` },
      { q: '¿Un 70 en el ASVAB es bueno?', a: 'Un AFQT de 70 está en la categoría II, la franja de 65 a 92, por encima de dos tercios de la muestra de referencia. Supera todos los mínimos publicados. Que alcance para un empleo concreto depende de los line scores: un AFQT de 70 con un puntaje bajo en Comprensión Mecánica puede quedarse corto para un puesto mecánico, así que revise los compuestos.' },
      { q: '¿Qué puntaje del ASVAB hace falta para un buen empleo?', a: 'Los empleos se asignan con los compuestos, no con el AFQT. La Fuerza Aérea publica un percentil MAGE para cada carrera enlisted, el Ejército y los Marines usan line scores como el GT y la Armada suma puntajes estándar para cada rating. Apunte primero al compuesto del empleo y luego asegúrese de que el AFQT supera el piso de la rama.' },
    ],
    body: (h) => `<h2>Los umbrales, en sumas de puntajes estándar</h2>
<p>Como el AFQT se lee en una tabla, cada umbral corresponde a una suma precisa. La tabla siguiente da la suma más pequeña de AR + MK + 2VE que alcanza cada nivel, leída en la ${h.src('segall', 'tabla de conversión de 1997')}. Los pisos de cada rama vienen de los sitios de reclutamiento del ${h.src('army', 'Ejército')}, de la ${h.src('airforce', 'Fuerza Aérea')}, de los ${h.src('marines', 'Marines')} y de la ${h.src('coastguard', 'Guardia Costera')}.</p>
${goals(h)}
<h2>Por qué unos pocos puntos pesan más cerca de un umbral</h2>
<p>Tome a dos aspirantes. El primero tiene AR 47, MK 46 y VE 45, una suma de 183: AFQT ${E.lookup('AFQT', 183)}, justo en el piso de tres ramas. El segundo tiene AR 46, MK 46 y VE 45, una suma de 182: AFQT ${E.lookup('AFQT', 182)}, a un punto. La diferencia entre ellos es una pregunta en una subprueba, y sin embargo uno puede alistarse en el Ejército y el otro no. Lejos de un umbral, el mismo punto no cambia nada importante. Por eso la calculadora cuenta los puntos hasta el siguiente nivel en lugar de poner una nota.</p>
${h.mini('target', { t: 'Puntos para AFQT 31', p: ['t', 'ar', 'mk', 've'], d: { t: '31', ar: 46, mk: 46, ve: 45 } })}
<h2>Qué significan aquí los incentivos</h2>
<p>Official ASVAB escribe en su ${h.src('oa-eligibility', 'página de elegibilidad')} que los aspirantes de la categoría IIIA o superior pueden calificar para incentivos de alistamiento. La página no da montos, y estos cambian según las necesidades de cada rama, así que este sitio no publica ninguno. Lo que el umbral le dice es sencillo: desde un AFQT de 50, un reclutador puede ofrecer más, y por debajo, el abanico de opciones se estrecha. La página de ${h.a('afqt-categories', 'categorías')} detalla cada franja.</p>
<h2>Un buen puntaje para el empleo que quiere</h2>
<p>Una vez resuelta la elegibilidad, la meta útil pasa a ser un compuesto. Un futuro mecánico de la Fuerza Aérea necesita un percentil Mecánico, un futuro analista de inteligencia un percentil General o Administrativo, un candidato a oficial del Ejército un GT de ${K.P.armyOcsGt}. La ${h.a('line-scores', 'calculadora de line scores')} los muestra todos y el ${h.a('study-plan', 'plan de estudio')} indica qué subprueba rinde más por cada punto extra. Si todavía no hizo el examen, un buen puntaje es simplemente el mejor posible: practique las subpruebas en las que es lento y el resto llega solo.</p>
<h2>Bueno comparado con quién</h2>
<p>El AFQT lo compara con los jóvenes de 1997, no con los demás aspirantes de su MEPS. Un percentil de 40 no significa que el 60 por ciento de los reclutas sacó más que usted; significa que el 60 por ciento de ese grupo de referencia sacó más. Los aspirantes son un grupo seleccionado, y la ley limita cuántos puntajes bajos pueden aceptar las ramas: según el ${h.src('usc520', '10 U.S.C. § 520')}, los reclutas de la categoría IV, de 10 a 30, están limitados, y quien no tiene diploma de secundaria necesita al menos 31. Así que un puntaje que supera el piso basta para postularse, mientras que uno en la categoría IIIA o superior lo convierte en un aspirante por el que las ramas compiten.</p>
<h2>Cómo pasar de un nivel al siguiente</h2>
<p>La suma da un plan claro. Expresión Verbal cuenta doble, así que cada punto de VE vale dos puntos de suma; AR y MK cuentan uno cada uno. Un aspirante con una suma de ${sum(50) - 6}, a seis puntos del AFQT 50, puede cerrar la brecha con tres puntos más de VE, o seis de AR, o una mezcla. Conocimiento de Palabras es la parte de VE que mejora más rápido con trabajo constante de vocabulario, mientras que Razonamiento Aritmético premia la práctica de problemas con tiempo limitado. Elija el camino donde tenga más margen, repita el examen después del plazo de espera y compare la nueva suma con la tabla.</p>`,
  },
});
