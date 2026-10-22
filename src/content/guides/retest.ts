import { defineGuide } from '../../lib/page-types';
import type { Helpers } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const E = K.E, R = K.P.retest;
/** Exemple suivi sur toute la page : un premier test le 14 novembre 2026. */
const t1 = '2026-11-14', t2 = E.nextRetest(t1, 1), t3 = E.nextRetest(t2, 2), t4 = E.nextRetest(t3, 3);
const eom = '2027-01-31', eomNext = E.nextRetest(eom, 1);
const span = E.daysBetween(t1, t4), exp1 = E.addYears(t1, R.validYears);
const s31 = E.sumForPercentile(31)!, s50 = E.sumForPercentile(50)!;

function schedule(h: Helpers) {
  return h.table([h.L('Test', 'Examen'), h.L('Earliest date', 'Fecha más temprana'), h.L('Waiting period', 'Espera')], [
    [h.L('Initial test', 'Examen inicial'), h.day(t1), '']
    , [h.L('First retest', 'Primera repetición'), h.day(t2), h.L(`${R.firstMonths} calendar month`, `${R.firstMonths} mes calendario`)]
    , [h.L('Second retest', 'Segunda repetición'), h.day(t3), h.L(`${R.secondMonths} calendar month`, `${R.secondMonths} mes calendario`)]
    , [h.L('Third retest and later', 'Tercera repetición y siguientes'), h.day(t4), h.L(`${R.laterMonths} calendar months`, `${R.laterMonths} meses calendario`)],
  ], h.L('Example computed with the Official ASVAB retest policy, starting from a first test on the date shown.', 'Ejemplo calculado con la política oficial de repetición, a partir de un primer examen en la fecha indicada.'), ['l', 'l', 'l']);
}

export default defineGuide({
  id: 'retest', group: 'test', order: 32,
  tool: 'retest',
  related: ['study-plan', 'minimum-score', 'practice-test', 'cat-vs-paper', 'afqt-calculator'],
  sources: ['oa-retest', 'oa-faqs', 'segall'],
  en: {
    slug: 'asvab-retest', nav: 'Retest rules', card: 'One month, one month, then six months between attempts',
    title: 'ASVAB Retest Rules 2026: Waiting Periods and the C-Test',
    description: 'ASVAB retest rules for 2026: one month before the first and second retests, six months after that, the 20-point confirmation test and what resets the clock.',
    h1: 'ASVAB retest: when you can take the test again',
    intro: 'You can retake the ASVAB, but not whenever you want. The waiting period grows with the number of attempts, and a large jump in score triggers a check.',
    resume: `Under the Official ASVAB retest policy, you can take a first retest ${R.firstMonths} calendar month after your initial test, a second retest ${R.secondMonths} calendar month after the first retest, and every later retest only ${R.laterMonths} calendar months after the previous one. With a first test on ${K.en.day(t1)}, the earliest dates are ${K.en.day(t2)}, then ${K.en.day(t3)}, then ${K.en.day(t4)}. Two cases change the clock. If your AFQT rises by ${R.criticalGain} points or more within six months, the gain is treated as critical and you are asked to take a confirmation test, the C-Test, without waiting; missing that C-Test puts you on the ${R.laterMonths}-month wait. A test invalidated for cheating also brings a ${R.cheatingMonths}-month wait, while a test invalidated for administrative reasons does not count as an attempt. Each set of scores stays usable for ${R.validYears} years, so a retest is a way to raise a score, not a way to keep it alive.`,
    faqs: [
      { q: 'How soon can I retake the ASVAB?', a: `One calendar month after your first test, and one more calendar month after that first retest. From the third attempt on, the wait becomes ${R.laterMonths} calendar months between tests. The calculator above gives the exact dates from the day of your last test. Your recruiter schedules the retest, so talk to them about the date before you plan your study weeks.` },
      { q: 'What is the ASVAB confirmation test?', a: `It is a test given when a score rises sharply. If your AFQT goes up by ${R.criticalGain} points or more within six months of an earlier test, the policy treats the gain as critical and asks for a confirmation test, called the C-Test. It can be taken without the usual wait. If you do not show up for it, the next attempt is pushed back by ${R.laterMonths} months.` },
      { q: 'Does a cancelled ASVAB count as an attempt?', a: `It depends on why it was cancelled. A test invalidated for administrative reasons, such as a problem on the testing side, does not count in the sequence of attempts. A test invalidated because of cheating is treated differently: it brings a ${R.cheatingMonths}-month wait before you may test again. The policy is written by the Department of Defense testing program.` },
      { q: 'Is it worth retaking the ASVAB for a few AFQT points?', a: `It can be, near a threshold. An AFQT of 31 needs a sum of ${s31} and an AFQT of 50 needs ${s50}, so a few points of sum can change your category or the branches open to you. The question is whether one month of work will raise your standard scores. Measure where you stand with practice items first, then decide.` },
    ],
    body: (h) => `<h2>The waiting periods, in order</h2>
<p>The ${h.src('oa-retest', 'Official ASVAB retest policy')} counts attempts, not years. After the initial test you wait ${R.firstMonths} calendar month for the first retest, then ${R.secondMonths} more calendar month for the second retest. From the third retest on, each attempt must come at least ${R.laterMonths} calendar months after the previous one. The table follows one candidate who first tests on ${h.day(t1)}.</p>
${schedule(h)}
<p>Calendar months are counted by date, not in blocks of 30 days. The calculator follows the usual rule for short months: one month after ${h.day(eom)} is ${h.day(eomNext)}, the last day of February. If your dates fall at the end of a month, confirm the exact day with your recruiter, who books the session.</p>
<p>Put end to end, the sequence is longer than it looks. From the initial test on ${h.day(t1)} to the earliest fourth attempt on ${h.day(t4)}, ${h.n(span)} days pass, most of them in the six-month wait. The scores of the first test, meanwhile, stay usable until ${h.day(exp1)}. A candidate who needs a higher AFQT therefore has a strong reason to treat the first retest as the serious one: prepare for it as if no further chance existed, rather than spreading three quick attempts over two months and then waiting half a year.</p>
<h2>The 20-point check</h2>
<p>A sharp rise in score is not a problem in itself, but it is verified. If your AFQT goes up by ${R.criticalGain} points or more within six months of a previous test, the gain is called critical and you are asked to take a confirmation test, the C-Test. You do not wait for it: it is given without the usual retest period. Missing the C-Test has a cost, since the next attempt is then pushed back by ${R.laterMonths} months. For a candidate who studied hard and jumped from an AFQT of 28 to 49, the C-Test is just one more session to prepare for in the same way.</p>
<h2>What resets or stops the clock</h2>
<ul>
<li>A test invalidated for cheating: ${R.cheatingMonths} months before the next attempt.</li>
<li>A test invalidated for administrative reasons: it does not count as an attempt, so your sequence of waiting periods is unchanged.</li>
<li>A no-show at a C-Test: ${R.laterMonths} months before the next attempt.</li>
</ul>
<p>The policy does not set a lifetime limit in the facts reviewed for this site, but each extra attempt after the second costs half a year. That makes the first two retests the ones to plan carefully. The ${h.src('oa-faqs', 'Official ASVAB FAQ')} also reminds candidates that scores are usable for ${R.validYears} years from the test date, so an old score eventually expires even if it was good.</p>
<h2>Using the month well</h2>
<p>One month is short. The fastest gains usually come from the subtest that weighs most in the AFQT. The ${h.src('segall', '1997 score scale report')} defines the AFQT as AR + MK + 2VE, so one point of Verbal Expression moves the sum twice as much as one point of math. The tool below shows how far you are from a target with your current scores. Try the case of a candidate with AR 44, MK 46 and VE 43, whose AFQT is ${E.afqt({ AR: 44, MK: 46, VE: 43 })}: it shows how many points of VE alone, or of AR alone, close the gap to 31.</p>
${h.mini('target', { t: 'Points missing before your retest', p: ['t', 'ar', 'mk', 've'], d: { t: '31', ar: 44, mk: 46, ve: 43 } })}
<p>Then build the month around that gap. The ${h.a('study-plan', 'study plan page')} compares the value of each subtest point, the ${h.a('practice-test', 'practice test')} shows which areas are weakest, and the ${h.a('minimum-score', 'minimum score page')} gives the floor of each branch so you know the number you are aiming for. If the version changes between attempts, the ${h.a('cat-vs-paper', 'CAT versus paper page')} explains what changes in pace.</p>`,
  },
  es: {
    slug: 'repetir-el-asvab', nav: 'Repetir el examen', card: 'Un mes, un mes y luego seis meses entre intentos',
    title: 'Repetir el ASVAB 2026: plazos de espera y la prueba C-Test',
    description: 'Repetir el ASVAB en 2026: un mes antes de la primera y la segunda repetición, luego seis meses, la prueba de confirmación de 20 puntos y lo que cambia el plazo.',
    h1: 'Repetir el ASVAB: cuándo puede volver a hacer el examen',
    intro: 'Se puede repetir el ASVAB, pero no cuando uno quiera. La espera crece con el número de intentos, y una subida grande del puntaje provoca una verificación.',
    resume: `Según la política oficial de repetición del ASVAB, puede hacer una primera repetición ${R.firstMonths} mes calendario después del examen inicial, una segunda repetición ${R.secondMonths} mes calendario después de la primera, y cada repetición posterior solo ${R.laterMonths} meses calendario después de la anterior. Con un primer examen el ${K.es.day(t1)}, las fechas más tempranas son el ${K.es.day(t2)}, luego el ${K.es.day(t3)} y luego el ${K.es.day(t4)}. Dos casos cambian el plazo. Si su AFQT sube ${R.criticalGain} puntos o más en seis meses, la subida se considera crítica y se le pide una prueba de confirmación, la C-Test, sin espera; si no se presenta a esa C-Test, pasa a la espera de ${R.laterMonths} meses. Un examen anulado por trampa también impone ${R.cheatingMonths} meses de espera, mientras que un examen anulado por razones administrativas no cuenta como intento. Cada juego de puntajes sirve ${R.validYears} años, así que repetir sirve para subir un puntaje, no para mantenerlo vigente.`,
    faqs: [
      { q: '¿Cuándo se puede repetir el ASVAB?', a: `Un mes calendario después del primer examen, y otro mes calendario después de esa primera repetición. A partir del tercer intento, la espera pasa a ${R.laterMonths} meses calendario entre exámenes. La calculadora de arriba da las fechas exactas a partir del día de su último examen. Es el reclutador quien programa la repetición, así que hable con él de la fecha antes de planear sus semanas de estudio.` },
      { q: '¿Qué es la prueba de confirmación del ASVAB?', a: `Es un examen que se pide cuando un puntaje sube mucho. Si su AFQT sube ${R.criticalGain} puntos o más en los seis meses siguientes a un examen anterior, la política considera crítica la subida y pide una prueba de confirmación, llamada C-Test. Se puede hacer sin la espera habitual. Si no se presenta, el siguiente intento se aplaza ${R.laterMonths} meses.` },
      { q: '¿Un ASVAB anulado cuenta como intento?', a: `Depende del motivo. Un examen anulado por razones administrativas, por ejemplo un problema del lado de quien aplica el examen, no cuenta en la secuencia de intentos. Un examen anulado por trampa se trata distinto: impone ${R.cheatingMonths} meses de espera antes de volver a examinarse. La política la fija el programa de exámenes del Departamento de Defensa.` },
      { q: '¿Vale la pena repetir el ASVAB por unos pocos puntos de AFQT?', a: `Puede valer la pena cerca de un umbral. Un AFQT de 31 exige una suma de ${s31} y uno de 50 exige ${s50}, así que pocos puntos de suma pueden cambiar su categoría o las ramas a las que puede entrar. La pregunta es si un mes de trabajo subirá sus puntajes estándar. Mida primero dónde está con preguntas de práctica y luego decida.` },
    ],
    body: (h) => `<h2>Los plazos de espera, en orden</h2>
<p>La ${h.src('oa-retest', 'política oficial de repetición del ASVAB')} cuenta intentos, no años. Después del examen inicial se espera ${R.firstMonths} mes calendario para la primera repetición y luego ${R.secondMonths} mes calendario más para la segunda. A partir de la tercera repetición, cada intento debe llegar al menos ${R.laterMonths} meses calendario después del anterior. La tabla sigue a un aspirante que se examina por primera vez el ${h.day(t1)}.</p>
${schedule(h)}
<p>Los meses calendario se cuentan por fecha, no en bloques de 30 días. La calculadora sigue la regla habitual para los meses cortos: un mes después del ${h.day(eom)} es el ${h.day(eomNext)}, el último día de febrero. Si sus fechas caen a fin de mes, confirme el día exacto con su reclutador, que es quien reserva la sesión.</p>
<p>Puesta de punta a punta, la secuencia es más larga de lo que parece. Del examen inicial el ${h.day(t1)} al cuarto intento más temprano el ${h.day(t4)} pasan ${h.n(span)} días, casi todos en la espera de seis meses. Mientras tanto, los puntajes del primer examen siguen sirviendo hasta el ${h.day(exp1)}. Quien necesita un AFQT más alto tiene entonces una buena razón para tomarse en serio la primera repetición: prepararla como si no hubiera otra oportunidad, en lugar de repartir tres intentos rápidos en dos meses y luego esperar medio año.</p>
<h2>La verificación de los 20 puntos</h2>
<p>Una subida fuerte del puntaje no es un problema en sí, pero se verifica. Si su AFQT sube ${R.criticalGain} puntos o más en los seis meses siguientes a un examen anterior, la subida se llama crítica y se le pide una prueba de confirmación, la C-Test. No hay que esperar: se da sin el plazo habitual de repetición. Faltar a la C-Test tiene un costo, porque el siguiente intento se aplaza ${R.laterMonths} meses. Para un aspirante que estudió en serio y pasó de un AFQT de 28 a 49, la C-Test es una sesión más que se prepara igual que las otras.</p>
<h2>Lo que reinicia o detiene el plazo</h2>
<ul>
<li>Un examen anulado por trampa: ${R.cheatingMonths} meses antes del siguiente intento.</li>
<li>Un examen anulado por razones administrativas: no cuenta como intento, así que su secuencia de esperas no cambia.</li>
<li>No presentarse a una C-Test: ${R.laterMonths} meses antes del siguiente intento.</li>
</ul>
<p>En los datos revisados para este sitio la política no fija un límite de intentos de por vida, pero cada intento después del segundo cuesta medio año. Por eso las dos primeras repeticiones son las que hay que planear con cuidado. Las ${h.src('oa-faqs', 'preguntas frecuentes de Official ASVAB')} recuerdan además que los puntajes sirven ${R.validYears} años desde la fecha del examen, así que un puntaje viejo termina por vencer aunque fuera bueno.</p>
<h2>Aprovechar bien el mes</h2>
<p>Un mes es poco. Las mejoras más rápidas suelen venir de la subprueba que más pesa en el AFQT. El ${h.src('segall', 'informe de la escala de 1997')} define el AFQT como AR + MK + 2VE, así que un punto de Expresión Verbal mueve la suma el doble que un punto de matemáticas. La herramienta de abajo muestra a qué distancia está de un objetivo con sus puntajes actuales. Pruebe el caso de un aspirante con AR 44, MK 46 y VE 43, cuyo AFQT es ${E.afqt({ AR: 44, MK: 46, VE: 43 })}: verá cuántos puntos de VE solo, o de AR solo, cierran la brecha hasta 31.</p>
${h.mini('target', { t: 'Puntos que faltan antes de repetir', p: ['t', 'ar', 'mk', 've'], d: { t: '31', ar: 44, mk: 46, ve: 43 } })}
<p>Después organice el mes en torno a esa brecha. La página del ${h.a('study-plan', 'plan de estudio')} compara lo que vale un punto en cada subprueba, el ${h.a('practice-test', 'examen de práctica')} muestra qué áreas son más débiles y la página del ${h.a('minimum-score', 'puntaje mínimo')} da el piso de cada rama para que sepa a qué número apunta. Si la versión cambia entre intentos, la página ${h.a('cat-vs-paper', 'CAT o papel')} explica qué cambia en el ritmo.</p>`,
  },
});
