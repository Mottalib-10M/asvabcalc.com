import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const E = K.E, P = K.P;
const c = (P.testLength.cat as Record<string, [number, number]>).MC, p = (P.testLength.pp as Record<string, [number, number]>).MC;
const sec = (x: [number, number]) => Math.round((x[1] * 60) / x[0]);
const fmt = (w: Partial<Record<string, number>>) => Object.entries(w).map(([k, x]) => (x === 2 ? `2${k}` : k)).join(' + ');
const mageUse = (['M', 'A', 'G', 'E'] as const).filter((k) => E.MAGE_PARTS[k].MC);
const marUse = (['MM', 'GT', 'EL', 'CL'] as const).filter((k) => E.MARINE_PARTS[k].includes('MC'));
const marList = marUse.map((k) => `${k} = ${E.MARINE_PARTS[k].join(' + ')}`).join('; ');
/** Exemple : candidat Marine qui vise un GT élevé. */
const x0 = { MC: 43, AR: 52, VE: 54, EI: 49, AS: 50, MK: 50 }, x1 = { ...x0, MC: 51 };
const m0 = E.marines(x0), m1 = E.marines(x1), M0 = E.mage(x0).M.pct, M1 = E.mage(x1).M.pct, ag = E.armyGt(x0), af = E.afqt(x0);

export default defineGuide({
  id: 'mechanical-comprehension', group: 'practice', order: 28,
  tool: 'quiz', toolArg: { s: 'MC', k: 0 },
  related: ['auto-shop', 'marines', 'line-scores', 'practice-test', 'electronics-information'],
  sources: ['oa-factsheet', 'oa-samples', 'segall', 'marines'],
  en: {
    slug: 'mechanical-comprehension-practice', nav: 'Mechanical Comprehension', card: 'Levers, gears, pulleys, pressure and simple machines',
    title: 'Mechanical Comprehension Practice 2026: ASVAB MC Questions',
    description: 'ASVAB Mechanical Comprehension practice for 2026: ten questions on levers, gears, pulleys, hydraulics and ramps, worked answers, and the Marine GT that uses MC.',
    h1: 'Mechanical Comprehension practice: ASVAB simple machines',
    intro: 'Ten questions in two sets of five on levers, gears, pulleys, pressure, hydraulic jacks, ramps, work and the wheel and axle. One principle behind them all: what you save in force, you pay in distance.',
    resume: `Mechanical Comprehension (MC) is the ASVAB subtest on simple machines and basic mechanics: levers, gears, pulleys, inclined planes, the wheel and axle, pressure, hydraulics and work. Most items are solved with one balance equation or one ratio. The computer version gives ${c[0]} questions in ${c[1]} minutes, about ${sec(c)} seconds each, and the paper version ${p[0]} questions in ${p[1]} minutes, about ${sec(p)} seconds each. MC is not part of the AFQT, but it reaches further than most technical subtests: it is part of the Air Force Mechanical area (${fmt(E.MAGE_PARTS.M)}) and of ${marUse.length} Marine Corps line scores, including GT (${E.MARINE_PARTS.GT.join(' + ')}), the Marine Corps general technical score. A candidate with AR ${x0.AR} and VE ${x0.VE} who raises MC from ${x0.MC} to ${x1.MC} moves the Marine GT from ${m0.GT} to ${m1.GT} and the Mechanical percentile from ${M0} to ${M1}. The ten questions are written by Radif Partners, not real ASVAB items, and a count of right answers is not a score.`,
    faqs: [
      { q: 'Why does Mechanical Comprehension matter for the Marine Corps GT score?', a: `Because the Marine Corps GT is built from ${E.MARINE_PARTS.GT.join(', ')}, unlike the Army GT, which uses only AR and VE. A Marine candidate with strong reading and arithmetic can still see a modest GT if MC is weak. The Marine Corps page computes GT and the three other line scores from your standard scores.` },
      { q: 'Do I need physics classes for Mechanical Comprehension?', a: 'Not necessarily. The subtest uses a few ideas: a lever balances when force times distance is equal on both sides, gears trade speed for turning force, pulleys and ramps reduce effort by lengthening the distance, and pressure is force divided by area. These can be learned in a few sessions with diagrams. Physics classes help, but practice with drawings matters more.' },
      { q: 'How should I handle gear and pulley diagrams on the test?', a: 'Trace the motion with your pencil or finger. For gears in a row, each mesh reverses direction, so alternate clockwise and counterclockwise along the chain. For speed, the gear with more teeth turns slower in proportion. For pulleys, count the rope segments that hold the load: the effort is the load divided by that number, ignoring friction.' },
    ],
    body: (h) => `<h2>What Mechanical Comprehension covers</h2>
<p>The ten questions on this page touch every family of the subtest: a lever balancing a load, two gears with different tooth counts, three gears in a row, a block and tackle, pressure on an area, a hydraulic jack, a ramp, the work done lifting a box, a wheel and axle, and the class of lever a wheelbarrow belongs to. On the real test many items come with a drawing; here the setup is written out, which trains you to build the picture yourself. The ${h.src('oa-samples', 'Official ASVAB sample questions')} show the illustrated format.</p>
${h.mini('quiz', { t: 'Five more mechanics questions', p: ['q1', 'q2', 'q3', 'q4', 'q5'], d: { s: 'MC', k: 1 } })}
<h2>Time per item</h2>
<p>The ${h.src('oa-factsheet', 'Official ASVAB fact sheet')} gives MC ${h.n(c[0])} questions in ${h.n(c[1])} minutes on the computer test, about ${h.n(sec(c))} seconds each, and ${h.n(p[0])} questions in ${h.n(p[1])} minutes on paper, about ${h.n(sec(p))} seconds each. That is enough for one equation per item if you know which one to write. Spending two minutes reasoning from scratch on a pulley problem is the usual way to run out of time.</p>
<h2>The one principle and its traps</h2>
<p>Every simple machine trades force for distance: the work put in equals the work you get out, ignoring friction. Keep that in mind and most traps disappear.</p>
<ul>
<li><strong>Levers.</strong> Force times distance must match on both sides of the fulcrum. A 150 pound load 2 feet from the fulcrum needs 50 pounds 6 feet away: 150 × 2 = 50 × 6. Choosing 450 means you multiplied instead of balancing.</li>
<li><strong>Gear speed.</strong> A 20 tooth gear at 120 rpm driving a 40 tooth gear turns it at 60 rpm, not 240. More teeth, slower turn, more turning force.</li>
<li><strong>Gear direction.</strong> In a row of three gears, the first and third turn the same way. Count: each mesh reverses.</li>
<li><strong>Pulleys and ramps.</strong> Four rope segments under 400 pounds mean a pull of 100 pounds. A 12 foot ramp rising 3 feet lets 60 pounds move a 240 pound crate, because the push covers four times the height.</li>
<li><strong>Hydraulics.</strong> Pressure is the same on both pistons, so force scales with area: 50 pounds on 2 square inches becomes 500 pounds on 20. The small piston travels ten times farther.</li>
<li><strong>Lever classes.</strong> First class has the fulcrum in the middle (a seesaw), second class the load in the middle (a wheelbarrow), third class the effort in the middle (tweezers).</li>
</ul>
<h2>Where MC counts</h2>
<p>MC has no effect on the AFQT, yet it appears in ${mageUse.length} Air Force area, Mechanical, and in ${marUse.length} Marine Corps line scores: ${marList}. All of these come from the formulas of the ${h.src('segall', '1997 score scale report')}. Take a Marine candidate with AR ${x0.AR}, VE ${x0.VE}, EI ${x0.EI} and AS ${x0.AS}: the AFQT is ${af} and the Army GT, which ignores MC, would be ${ag}. With MC ${x0.MC}, the Marine GT is ${m0.GT} and MM ${m0.MM}. With MC ${x1.MC}, they become ${m1.GT} and ${m1.MM}, and the Air Force Mechanical percentile moves from ${M0} to ${M1}. The ${h.a('marines', 'Marine Corps page')} lists the line scores and what the ${h.src('marines', 'Marine Corps recruiting site')} says about requirements; the ${h.a('line-scores', 'line score calculator')} shows every composite at once.</p>
<h2>How to prepare</h2>
<p>Draw each machine as you study it, with the force, the load and the distances marked. Write the governing equation under each drawing: force × distance for levers, teeth ratio for gears, segments for pulleys, length over height for ramps, area ratio for hydraulics, force × distance for work. Then mix problems so you learn to recognize the machine before writing anything. Auto and Shop shares the Mechanical area and the Marine MM score with MC, so the ${h.a('auto-shop', 'Auto and Shop page')} is a natural partner, and the ${h.a('electronics-information', 'Electronics Information page')} completes MM. Check your balance across all subtests with the ${h.a('practice-test', 'practice test')}.</p>`,
  },
  es: {
    slug: 'comprension-mecanica', nav: 'Comprensión Mecánica', card: 'Palancas, engranajes, poleas, presión y máquinas simples',
    title: 'Comprensión mecánica ASVAB 2026: palancas y engranajes',
    description: 'Práctica de Comprensión Mecánica del ASVAB 2026: diez preguntas de palancas, engranajes, poleas, hidráulica y rampas, y el GT de los Marines que usa MC.',
    h1: 'Comprensión Mecánica: práctica de máquinas simples del ASVAB',
    intro: 'Diez preguntas en dos series de cinco sobre palancas, engranajes, poleas, presión, gatos hidráulicos, rampas, trabajo y la rueda con eje. Un solo principio detrás de todas: lo que se ahorra en fuerza se paga en distancia.',
    resume: `Comprensión Mecánica (MC, Mechanical Comprehension) es la subprueba del ASVAB sobre máquinas simples y mecánica básica: palancas, engranajes, poleas, planos inclinados, la rueda con eje, la presión, la hidráulica y el trabajo. Casi todas las preguntas se resuelven con una ecuación de equilibrio o una proporción. La versión por computadora da ${c[0]} preguntas en ${c[1]} minutos, unos ${sec(c)} segundos cada una, y la versión en papel ${p[0]} preguntas en ${p[1]} minutos, unos ${sec(p)} segundos cada una. MC no forma parte del AFQT, pero llega más lejos que la mayoría de las subpruebas técnicas: entra en el área Mecánica de la Fuerza Aérea (${fmt(E.MAGE_PARTS.M)}) y en ${marUse.length} line scores de los Marines, entre ellos el GT (${E.MARINE_PARTS.GT.join(' + ')}), el puntaje técnico general de los Marines. Un aspirante con AR ${x0.AR} y VE ${x0.VE} que sube MC de ${x0.MC} a ${x1.MC} lleva el GT de los Marines de ${m0.GT} a ${m1.GT} y el percentil Mecánico de ${M0} a ${M1}. Las diez preguntas las escribe Radif Partners, no son preguntas reales del ASVAB, y un número de aciertos no es un puntaje.`,
    faqs: [
      { q: '¿Por qué Comprensión Mecánica cuenta para el GT de los Marines?', a: `Porque el GT de los Marines se calcula con ${E.MARINE_PARTS.GT.join(', ')}, a diferencia del GT del Ejército, que usa solo AR y VE. Un aspirante a Marine que lee y calcula bien puede quedarse con un GT modesto si su MC es flojo. La página de los Marines calcula el GT y los otros tres line scores con sus puntajes estándar.` },
      { q: '¿Hace falta haber estudiado física para Comprensión Mecánica?', a: 'No necesariamente. La subprueba usa pocas ideas: una palanca está en equilibrio cuando fuerza por distancia es igual a ambos lados, los engranajes cambian velocidad por fuerza de giro, las poleas y las rampas reducen el esfuerzo alargando la distancia, y la presión es fuerza dividida por área. Se aprenden en pocas sesiones con dibujos. La física ayuda, pero practicar con esquemas importa más.' },
      { q: '¿Cómo resolver los dibujos de engranajes y poleas en el examen?', a: 'Siga el movimiento con el lápiz o el dedo. En engranajes en fila, cada contacto invierte el sentido, así que alterne horario y antihorario a lo largo de la cadena. Para la velocidad, el engranaje con más dientes gira más despacio en proporción. En las poleas, cuente los tramos de cuerda que sostienen la carga: el esfuerzo es la carga dividida entre ese número, sin contar la fricción.' },
    ],
    body: (h) => `<h2>Qué cubre Comprensión Mecánica</h2>
<p>Las diez preguntas de esta página tocan todas las familias de la subprueba: una palanca que equilibra una carga, dos engranajes con distinto número de dientes, tres engranajes en fila, un aparejo de poleas, la presión sobre un área, un gato hidráulico, una rampa, el trabajo al levantar una caja, una rueda con eje y la clase de palanca a la que pertenece una carretilla. En el examen real muchas preguntas traen un dibujo; aquí el planteamiento va escrito, lo que le entrena a construir la imagen usted mismo. Los enunciados están en inglés, con la traducción debajo, y usan unidades estadounidenses: libras, pies, pulgadas cuadradas y revoluciones por minuto (rpm). Las ${h.src('oa-samples', 'preguntas de ejemplo de Official ASVAB')} muestran el formato con ilustraciones.</p>
${h.mini('quiz', { t: 'Cinco preguntas más de mecánica', p: ['q1', 'q2', 'q3', 'q4', 'q5'], d: { s: 'MC', k: 1 } })}
<h2>Tiempo por pregunta</h2>
<p>La ${h.src('oa-factsheet', 'hoja informativa de Official ASVAB')} da a MC ${h.n(c[0])} preguntas en ${h.n(c[1])} minutos en el examen por computadora, unos ${h.n(sec(c))} segundos cada una, y ${h.n(p[0])} preguntas en ${h.n(p[1])} minutos en papel, unos ${h.n(sec(p))} segundos cada una. Alcanza para una ecuación por pregunta si sabe cuál escribir. Pasar dos minutos razonando desde cero un problema de poleas es la forma habitual de quedarse sin tiempo.</p>
<h2>El principio único y sus trampas</h2>
<p>Toda máquina simple cambia fuerza por distancia: el trabajo que entra es igual al que sale, sin contar la fricción. Con eso en mente desaparecen casi todas las trampas.</p>
<ul>
<li><strong>Palancas.</strong> Fuerza por distancia debe coincidir a ambos lados del punto de apoyo. Una carga de 150 libras a 2 pies del apoyo necesita 50 libras a 6 pies: 150 × 2 = 50 × 6. Elegir 450 significa que multiplicó en vez de equilibrar.</li>
<li><strong>Velocidad de engranajes.</strong> Un engranaje de 20 dientes a 120 rpm que mueve uno de 40 lo hace girar a 60 rpm, no a 240. Más dientes, giro más lento y más fuerza de giro.</li>
<li><strong>Sentido de los engranajes.</strong> En una fila de tres engranajes, el primero y el tercero giran en el mismo sentido. Cuente: cada contacto invierte.</li>
<li><strong>Poleas y rampas.</strong> Cuatro tramos de cuerda bajo 400 libras significan un tirón de 100 libras. Una rampa de 12 pies que sube 3 permite mover una caja de 240 libras con 60, porque el empuje recorre cuatro veces la altura.</li>
<li><strong>Hidráulica.</strong> La presión es la misma en los dos pistones, así que la fuerza crece con el área: 50 libras sobre 2 pulgadas cuadradas se convierten en 500 sobre 20. El pistón pequeño recorre diez veces más distancia.</li>
<li><strong>Clases de palanca.</strong> En la de primera clase el apoyo está en medio (un balancín), en la de segunda la carga está en medio (una carretilla) y en la de tercera el esfuerzo está en medio (unas pinzas).</li>
</ul>
<h2>Dónde cuenta MC</h2>
<p>MC no influye en el AFQT, pero aparece en ${mageUse.length} área de la Fuerza Aérea, la Mecánica, y en ${marUse.length} line scores de los Marines: ${marList}. Todos salen de las fórmulas del ${h.src('segall', 'informe de la escala de 1997')}. Tome a un aspirante a Marine con AR ${x0.AR}, VE ${x0.VE}, EI ${x0.EI} y AS ${x0.AS}: su AFQT es ${af} y el GT del Ejército, que no usa MC, sería ${ag}. Con MC ${x0.MC}, el GT de los Marines es ${m0.GT} y el MM ${m0.MM}. Con MC ${x1.MC}, pasan a ${m1.GT} y ${m1.MM}, y el percentil Mecánico de la Fuerza Aérea va de ${M0} a ${M1}. La página de los ${h.a('marines', 'Marines')} lista los line scores y lo que dice el ${h.src('marines', 'sitio de reclutamiento de los Marines')} sobre los requisitos; la ${h.a('line-scores', 'calculadora de line scores')} muestra todos los compuestos a la vez.</p>
<h2>Cómo prepararse</h2>
<p>Dibuje cada máquina mientras la estudia, con la fuerza, la carga y las distancias marcadas. Escriba debajo la ecuación que la gobierna: fuerza por distancia para las palancas, proporción de dientes para los engranajes, tramos para las poleas, longitud entre altura para las rampas, proporción de áreas para la hidráulica y fuerza por distancia para el trabajo. Después mezcle problemas para aprender a reconocer la máquina antes de escribir nada. Autos y Taller comparte con MC el área Mecánica y el MM de los Marines, así que la página de ${h.a('auto-shop', 'Autos y Taller')} es su compañera natural, y la de ${h.a('electronics-information', 'Información Electrónica')} completa el MM. Compruebe el equilibrio entre todas sus subpruebas con el ${h.a('practice-test', 'examen de práctica')}.</p>`,
  },
});
