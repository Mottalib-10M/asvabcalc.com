import { defineGuide } from '../../lib/page-types';
import type { Helpers } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const E = K.E, B = K.P.branches;
const N: Record<string, [string, string, string]> = { army: ['Army', 'Ejército', 'army'], airforce: ['Air Force', 'Fuerza Aérea', 'air-force'], navy: ['Navy', 'Armada', 'navy'], marines: ['Marine Corps', 'Cuerpo de Marines', 'marines'], coastguard: ['Coast Guard', 'Guardia Costera', 'coast-guard'], spaceforce: ['Space Force', 'Fuerza Espacial', 'space-force'] };

function mins(h: Helpers) {
  const rows = E.BRANCHES.map((b) => {
    const r = E.RULES[b];
    const word = r.min === null ? h.L('not published', 'no publicado') : h.n(r.min);
    const ged = r.min === null ? '' : r.ged === null ? h.L('no separate figure', 'sin cifra aparte') : h.n(r.ged);
    return [h.a(N[b][2], h.L(N[b][0], N[b][1])), word, ged, r.min === null ? '' : h.n(E.sumForPercentile(r.min)!), r.src ? h.src(r.src, h.L('read', 'leído')) : h.L('site refused reading', 'el sitio rechazó la lectura')];
  });
  return h.table([h.L('Branch', 'Rama'), h.L('Minimum AFQT', 'AFQT mínimo'), 'GED', h.L('Sum AR + MK + 2VE', 'Suma AR + MK + 2VE'), h.L('Source', 'Fuente')], rows,
    h.L(`Minimums as stated on each recruiting site, read on ${K.en.day(K.TODAY)}.`, `Mínimos tal como los publica cada sitio de reclutamiento, leídos el ${K.es.day(K.TODAY)}.`), ['l', 'r', 'r', 'r', 'l']);
}

export default defineGuide({
  id: 'minimum-score', group: 'branches', order: 10,
  tool: 'eligibility', toolArg: { b: 'army', p: 33 },
  related: ['army', 'air-force', 'marines', 'coast-guard', 'ged'],
  sources: ['army', 'airforce', 'marines', 'coastguard', 'spaceforce', 'usc520', 'oa-eligibility'],
  en: {
    slug: 'minimum-asvab-score', nav: 'Minimum ASVAB score by branch', card: 'The floor of each branch, read on its own site',
    title: 'Minimum ASVAB Score 2026 by Branch, Read on Official Sites',
    description: 'Minimum ASVAB score by branch in 2026: Army 31, Air Force 31 or 50 with a GED, Marines 31 or 50, Coast Guard 32, as each recruiting site states it, dated.',
    h1: 'Minimum ASVAB score for each branch in 2026',
    intro: 'Type your AFQT and pick diploma or GED: the calculator compares it with the floor each branch publishes on its recruiting site.',
    resume: `The minimum ASVAB score is a minimum AFQT percentile, and each branch sets its own. Read on the recruiting sites on ${K.en.day(K.TODAY)}: the Army asks ${B.army.min}, the Air Force ${B.airforce.min} with a high school diploma and ${B.airforce.ged} with a GED, the Marine Corps ${B.marines.min} or ${B.marines.ged} with a GED or nontraditional diploma, and the Coast Guard ${B.coastguard.min}. The Space Force asks for a qualifying ASVAB score without giving a number. For the Navy, navy.com refused automated reading on the day of the check, so this site publishes no figure rather than copy one it cannot verify. An AFQT of 31 corresponds to a sum of ${E.sumForPercentile(31)} on AR + MK + 2VE, and 50 to a sum of ${E.sumForPercentile(50)}. Federal law adds two rules: at least 31 for anyone without a high school diploma, and a cap on recruits between 10 and 30.`,
    faqs: [
      { q: 'Which branch has the lowest ASVAB requirement?', a: `Among the minimums this site could verify, the Army, the Air Force and the Marine Corps all publish 31 for a high school diploma, and the Coast Guard 32. The Army also describes a Future Soldier Preparatory Course with an academic track open from an AFQT of 21, which prepares applicants to reach the standard rather than lowering it.` },
      { q: 'Is the minimum score the same for the Reserve and National Guard?', a: 'The figures on this page are the ones each branch states on its recruiting site for enlistment in general. Reserve and Guard components follow the AFQT floors of their service in most cases, but programs and waivers vary by state and by year. Confirm the floor for your component with a recruiter before testing.' },
      { q: 'Why do websites give different minimum scores for the same branch?', a: 'Minimums change over time and many pages are not updated, and some mix the AFQT with line scores or with officer test requirements. This site reads each figure on the recruiting site of the branch itself, links to it and prints the date of the reading. When a figure could not be read, as for the Navy, the site says so.' },
    ],
    body: (h) => `<h2>The minimums, branch by branch</h2>
<p>Each figure below was read on the recruiting site of the branch, which is the reference a recruiter uses with applicants. The ${h.src('army', 'Army site')} gives 31 and describes a preparatory course for applicants from 21. The ${h.src('airforce', 'Air Force site')} gives 31 for seniors and graduates and 50 for GED holders. The ${h.src('marines', 'Marine Corps site')} gives 31, or 50 with a GED or nontraditional diploma. The ${h.src('coastguard', 'Coast Guard site')} gives 32 and notes that officer programs have other test requirements. The ${h.src('spaceforce', 'Space Force site')} asks for a qualifying ASVAB score and an age of 17 to 42.</p>
${mins(h)}
<h2>The rules of the law</h2>
<p>${h.src('usc520', 'Section 520 of title 10')} of the United States Code applies to every service. It caps active duty recruits whose AFQT falls from the 10th to the 30th percentile at 4 percent of the year's enlistments, a limit the Secretary of Defense may raise up to 20 percent at a service's request. It also requires a person who is not a high school graduate to score at or above the 31st percentile, while forbidding a refusal based only on the lack of a diploma when the enlistment is needed to meet strength requirements. The branch floors are set within these rules.</p>
${h.mini('afqt', { t: 'Do your scores reach 31?', p: ['ar', 'mk', 've'], d: { ar: 47, mk: 45, ve: 46 } })}
<h2>Diploma or GED</h2>
<p>The education credential changes the floor in two branches. With a GED, the Air Force and the Marine Corps ask an AFQT of 50 instead of 31, a sum of ${E.sumForPercentile(50)} instead of ${E.sumForPercentile(31)}, which is a large gap: about nineteen points of sum, or ten points of VE. The ${h.a('ged', 'GED page')} works through that case. The Army and the Coast Guard pages read for this site give one figure without a separate GED floor; a recruiter can tell you whether another rule applies to your credential.</p>
<h2>Minimum is not the target</h2>
<p>Meeting the floor makes you eligible to apply, not to the job you want. Jobs read line scores, and some programs set their own AFQT or composite thresholds well above the branch floor. Applicants in Category IIIA, from 50, may qualify for incentives. If your AFQT is close to 31, aim higher before your first test, since retests follow waiting periods of one month, one month, then six months. The ${h.a('good-asvab-score', 'good score page')} and the ${h.a('line-scores', 'line score calculator')} show what lies beyond the floor.</p>
<h2>What is missing on this page</h2>
<p>Three figures are not published here. The Navy minimum, because navy.com refused automated reading on the day of the check and no other official Navy page could be read. A Space Force number, because its site gives none. Job minimums for the Army and the Marine Corps, because their current lists could not be read in full. Third party pages print numbers for all of them, often different from one site to the next, and some contradict the branches: one listed the Coast Guard at 36 while its own site says 32. When a figure matters for your decision, the recruiter's printout prevails.</p>
<h2>Before you book the test</h2>
<p>A recruiter often starts with a short screening, such as the AFQT Predictor Test, before sending an applicant to a MEPS. Its score is a prediction only. If your practice results put you near the floor of the branch you want, use the weeks before the real test on the subtests that move the AFQT, AR, MK, WK and PC, and keep VE in mind since it counts twice. Then check the printed AFQT against the table above the day you get it.</p>`,
  },
  es: {
    slug: 'puntaje-minimo-asvab', nav: 'Puntaje mínimo del ASVAB por rama', card: 'El piso de cada rama, leído en su propio sitio',
    title: 'Puntaje mínimo del ASVAB 2026 por rama, según cada rama',
    description: 'Puntaje mínimo del ASVAB por rama en 2026: Ejército 31, Fuerza Aérea 31 o 50 con GED, Marines 31 o 50, Guardia Costera 32, según cada sitio oficial, con fecha.',
    h1: 'Puntaje mínimo del ASVAB para cada rama en 2026',
    intro: 'Escriba su AFQT y elija diploma o GED: la calculadora lo compara con el piso que cada rama publica en su sitio de reclutamiento.',
    resume: `El puntaje mínimo del ASVAB es un percentil AFQT mínimo, y cada rama fija el suyo. Leídos en los sitios de reclutamiento el ${K.es.day(K.TODAY)}: el Ejército pide ${B.army.min}, la Fuerza Aérea ${B.airforce.min} con diploma de secundaria y ${B.airforce.ged} con GED, los Marines ${B.marines.min} o ${B.marines.ged} con GED o diploma no tradicional, y la Guardia Costera ${B.coastguard.min}. La Fuerza Espacial pide un puntaje del ASVAB que califique sin dar un número. Para la Armada, navy.com rechazó la lectura automática el día de la verificación, así que este sitio no publica cifra en lugar de copiar una que no puede verificar. Un AFQT de 31 corresponde a una suma de ${E.sumForPercentile(31)} en AR + MK + 2VE, y 50 a una suma de ${E.sumForPercentile(50)}. La ley federal añade dos reglas: al menos 31 para quien no tiene diploma de secundaria y un límite a los reclutas entre 10 y 30.`,
    faqs: [
      { q: '¿Qué rama pide el puntaje más bajo del ASVAB?', a: 'Entre los mínimos que este sitio pudo verificar, el Ejército, la Fuerza Aérea y los Marines publican 31 con diploma de secundaria, y la Guardia Costera 32. El Ejército describe además un Future Soldier Preparatory Course con una vía académica abierta desde un AFQT de 21, que prepara a los aspirantes para alcanzar el estándar en lugar de bajarlo.' },
      { q: '¿El mínimo es el mismo para la Reserva y la Guardia Nacional?', a: 'Las cifras de esta página son las que cada rama publica en su sitio de reclutamiento para el alistamiento en general. Los componentes de Reserva y de Guardia siguen en la mayoría de los casos los pisos AFQT de su rama, pero los programas y las dispensas cambian según el estado y el año. Confirme el piso de su componente con un reclutador antes del examen.' },
      { q: '¿Por qué los sitios web dan mínimos distintos para la misma rama?', a: 'Los mínimos cambian con el tiempo y muchas páginas no se actualizan, y algunas mezclan el AFQT con los line scores o con los requisitos de los exámenes de oficiales. Este sitio lee cada cifra en el sitio de reclutamiento de la propia rama, enlaza con él e imprime la fecha de la lectura. Cuando una cifra no pudo leerse, como la de la Armada, el sitio lo dice.' },
    ],
    body: (h) => `<h2>Los mínimos, rama por rama</h2>
<p>Cada cifra de abajo se leyó en el sitio de reclutamiento de la rama, que es la referencia que usa un reclutador con los aspirantes. El ${h.src('army', 'sitio del Ejército')} da 31 y describe un curso preparatorio para aspirantes desde 21. El ${h.src('airforce', 'sitio de la Fuerza Aérea')} da 31 para estudiantes del último año y graduados y 50 para quienes tienen GED. El ${h.src('marines', 'sitio de los Marines')} da 31, o 50 con GED o diploma no tradicional. El ${h.src('coastguard', 'sitio de la Guardia Costera')} da 32 y aclara que los programas de oficiales tienen otros requisitos de examen. El ${h.src('spaceforce', 'sitio de la Fuerza Espacial')} pide un puntaje del ASVAB que califique y una edad de 17 a 42 años.</p>
${mins(h)}
<h2>Las reglas de la ley</h2>
<p>La ${h.src('usc520', 'sección 520 del título 10')} del Código de los Estados Unidos se aplica a todas las ramas. Limita los reclutas en servicio activo con un AFQT del percentil 10 al 30 al 4 por ciento de los alistamientos del año, un límite que el Secretario de Defensa puede elevar hasta el 20 por ciento si una rama lo pide. Exige además que una persona sin diploma de secundaria saque el percentil 31 o más, y prohíbe rechazar a alguien solo por no tener diploma cuando su alistamiento hace falta para cubrir los efectivos. Los pisos de cada rama se fijan dentro de esas reglas.</p>
${h.mini('afqt', { t: '¿Sus puntajes llegan a 31?', p: ['ar', 'mk', 've'], d: { ar: 47, mk: 45, ve: 46 } })}
<h2>Diploma o GED</h2>
<p>El tipo de estudios cambia el piso en dos ramas. Con GED, la Fuerza Aérea y los Marines piden un AFQT de 50 en lugar de 31, una suma de ${E.sumForPercentile(50)} en lugar de ${E.sumForPercentile(31)}, una brecha grande: unos diecinueve puntos de suma, o diez puntos de VE. La página del ${h.a('ged', 'ASVAB con GED')} desarrolla ese caso. Las páginas del Ejército y de la Guardia Costera leídas para este sitio dan una sola cifra sin piso aparte para el GED; un reclutador puede decirle si otra regla se aplica a su título.</p>
<h2>El mínimo no es la meta</h2>
<p>Cumplir el piso lo habilita para postularse, no para el empleo que quiere. Los empleos leen line scores, y algunos programas fijan sus propios umbrales de AFQT o de compuestos muy por encima del piso de la rama. Los aspirantes de la categoría IIIA, desde 50, pueden calificar para incentivos. Si su AFQT está cerca de 31, apunte más alto antes del primer examen, porque las repeticiones siguen plazos de espera de un mes, un mes y luego seis meses. La página del ${h.a('good-asvab-score', 'buen puntaje')} y la ${h.a('line-scores', 'calculadora de line scores')} muestran lo que hay más allá del piso.</p>
<h2>Lo que falta en esta página</h2>
<p>Tres cifras no se publican aquí. El mínimo de la Armada, porque navy.com rechazó la lectura automática el día de la verificación y ninguna otra página oficial de la Armada pudo leerse. Un número para la Fuerza Espacial, porque su sitio no da ninguno. Los mínimos por empleo del Ejército y de los Marines, porque sus listas vigentes no pudieron leerse completas. Las páginas de terceros publican números para todos ellos, a menudo distintos de un sitio a otro, y algunas contradicen a las propias ramas: una daba 36 para la Guardia Costera cuando su propio sitio dice 32. Cuando una cifra importa para su decisión, la hoja del reclutador prevalece.</p>`,
  },
});
