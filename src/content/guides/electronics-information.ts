import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const E = K.E, P = K.P;
const c = (P.testLength.cat as Record<string, [number, number]>).EI, p = (P.testLength.pp as Record<string, [number, number]>).EI;
const sec = (x: [number, number]) => Math.round((x[1] * 60) / x[0]);
const fmt = (w: Partial<Record<string, number>>) => Object.entries(w).map(([k, x]) => (x === 2 ? `2${k}` : k)).join(' + ');
const mageUse = (['M', 'A', 'G', 'E'] as const).filter((k) => E.MAGE_PARTS[k].EI);
const marUse = (['MM', 'GT', 'EL', 'CL'] as const).filter((k) => E.MARINE_PARTS[k].includes('EI'));
const marList = marUse.map((k) => `${k} = ${E.MARINE_PARTS[k].join(' + ')}`).join(' and ');
/** Exemple : bon en maths, faible en électricité. */
const x0 = { EI: 42, GS: 53, AR: 55, MK: 56, MC: 50, AS: 46, VE: 50 }, x1 = { ...x0, EI: 51 };
const e0 = E.mage(x0).E.pct, e1 = E.mage(x1).E.pct, m0 = E.marines(x0), m1 = E.marines(x1);

export default defineGuide({
  id: 'electronics-information', group: 'practice', order: 26,
  tool: 'quiz', toolArg: { s: 'EI', k: 0 },
  related: ['general-science', 'mechanical-comprehension', 'air-force-jobs', 'marines', 'practice-test'],
  sources: ['oa-factsheet', 'oa-samples', 'segall'],
  en: {
    slug: 'electronics-information-practice', nav: 'Electronics Information', card: 'Ohm’s law, circuits, power and components',
    title: 'Electronics Information Practice 2026: ASVAB EI Questions',
    description: 'ASVAB Electronics Information practice for 2026: ten questions on Ohm’s law, circuits, power and components, with worked answers and the line scores EI feeds.',
    h1: 'Electronics Information practice: ASVAB circuit questions',
    intro: 'Ten questions in two sets of five on current, voltage, resistance, power, conductors and components such as diodes, capacitors and transformers. Most need one formula and one line of arithmetic.',
    resume: `Electronics Information (EI) is the ASVAB subtest on electricity and electronic components: Ohm's law, series and parallel circuits, power, units, conductors, and parts such as diodes, capacitors and transformers. The computer version gives ${c[0]} questions in ${c[1]} minutes, about ${sec(c)} seconds each, and the paper version ${p[0]} questions in ${p[1]} minutes, about ${sec(p)} seconds each, so formulas must come without thinking. EI is not part of the AFQT. It decides access to technical jobs: it is one of the four parts of the Air Force Electrical area (${fmt(E.MAGE_PARTS.E)}) and appears in ${marUse.length} Marine Corps line scores, ${marList}. A candidate with strong math, AR ${x0.AR} and MK ${x0.MK}, but EI ${x0.EI}, reads an Electrical percentile of ${e0}; at EI ${x1.EI} it becomes ${e1}, and the Marine EL rises from ${m0.EL} to ${m1.EL}. The ten questions are written by Radif Partners, not taken from the ASVAB, and a count of right answers does not convert into a score.`,
    faqs: [
      { q: 'Which formulas do I need for Electronics Information?', a: 'Three cover most calculation items: Ohm’s law, voltage equals current times resistance; power equals voltage times current; and the rules for combining resistors, which add in series while in parallel the total falls below the smallest one. Add the transformer ratio, where voltage follows the ratio of turns, and the units: volts, amperes, ohms and watts.' },
      { q: 'Can I do well on Electronics Information without any shop experience?', a: 'Yes. Many items are about definitions and simple laws you can learn from a book: what a diode or a capacitor does, which metals conduct best, what voltage a U.S. wall outlet supplies. Hands-on experience helps with intuition, but a few weeks of focused study on the formulas and component functions covers most of what this subtest asks.' },
      { q: 'Which Marine Corps line scores use Electronics Information?', a: `Two of the four: MM, mechanical maintenance, built from ${E.MARINE_PARTS.MM.join(', ')}, and EL, electronics repair, built from ${E.MARINE_PARTS.EL.join(', ')}. Each is a rounded linear function of the sum of those standard scores, with a mean of 100 and a standard deviation of 20. The Marine Corps page computes both from your sheet.` },
    ],
    body: (h) => `<h2>What Electronics Information asks</h2>
<p>The ten questions on this page split between calculations and knowledge. Calculations: the current through a resistor from its voltage, a parallel pair and a series chain of resistors, the power of a heater from amps and volts, and the output of a transformer. Knowledge: the unit of power, the best conductor among four metals, the part that lets current flow one way, the voltage of a U.S. wall outlet and the part that stores energy between two plates. The ${h.src('oa-samples', 'Official ASVAB sample questions')} show the same mix of short items.</p>
${h.mini('quiz', { t: 'Five more electronics questions', p: ['q1', 'q2', 'q3', 'q4', 'q5'], d: { s: 'EI', k: 1 } })}
<h2>Little time per item</h2>
<p>According to the ${h.src('oa-factsheet', 'Official ASVAB fact sheet')}, EI has ${h.n(c[0])} questions in ${h.n(c[1])} minutes on the computer test and ${h.n(p[0])} in ${h.n(p[1])} minutes on paper, about ${h.n(sec(c))} and ${h.n(sec(p))} seconds per item. That leaves room for one formula and one product, not for deriving the formula. Learn Ohm's law as a triangle with V on top and I and R below: cover the unknown and the remaining two show whether to multiply or divide. A 12 volt battery across 4 ohms gives 12 ÷ 4 = 3 amperes.</p>
<h2>Classic traps</h2>
<ul>
<li><strong>Parallel resistance.</strong> Two resistors of 6 and 3 ohms in parallel give 2 ohms, less than either one. If your answer is larger than the smallest resistor, you added them as if they were in series. For two resistors, product over sum works: 18 ÷ 9 = 2.</li>
<li><strong>Series resistance.</strong> Three 10 ohm resistors in series simply add to 30 ohms. Do not divide.</li>
<li><strong>Power or resistance.</strong> P = V × I and V = I × R look alike. A heater drawing 5 amperes at 120 volts uses 600 watts; dividing would give 24, which is a resistance in ohms, not a power.</li>
<li><strong>Transformer direction.</strong> More turns on the secondary means higher voltage: 100 turns to 500 turns multiplies 24 volts by 5, giving 120 volts. Fewer turns would lower it.</li>
<li><strong>Best conductor.</strong> Silver conducts better than copper. Copper is used in wiring because it costs far less, which makes it the tempting wrong answer.</li>
</ul>
<h2>Where EI counts</h2>
<p>EI has no effect on the AFQT, but it is one of the four parts of the Air Force Electrical area and appears in the Marine Corps ${marList} line scores, all computed with the formulas and tables of the ${h.src('segall', '1997 score scale report')}. Take a candidate with AR ${x0.AR}, MK ${x0.MK}, GS ${x0.GS}, MC ${x0.MC}, AS ${x0.AS} and VE ${x0.VE}. With EI ${x0.EI}, the Electrical percentile is ${e0}, the Marine MM ${m0.MM} and the Marine EL ${m0.EL}. With EI ${x1.EI}, they become ${e1}, ${m1.MM} and ${m1.EL}. For someone aiming at avionics, communications or electrical work, that gap can decide which jobs are on the list. The ${h.a('air-force-jobs', 'Air Force job finder')} shows careers with an Electrical minimum, and the ${h.a('marines', 'Marine Corps page')} computes all four line scores.</p>
<h2>How to prepare</h2>
<p>Start with the units and the three formulas above, then the components: resistor, capacitor, inductor, diode, transistor, transformer, fuse and circuit breaker, each with one line on what it does and its schematic symbol. Practice series and parallel problems until you can spot the configuration at a glance. When a question describes a circuit in words, sketch it on your scratch paper: a quick drawing shows at once whether the resistors share both ends, which means parallel, or follow one another, which means series. The Electrical area also uses General Science, so review the physics part of the ${h.a('general-science', 'General Science page')}; the Marine MM score adds Mechanical Comprehension, covered on the ${h.a('mechanical-comprehension', 'Mechanical Comprehension page')}. Take the mixed ${h.a('practice-test', 'practice test')} to see how EI compares with your other subtests.</p>`,
  },
  es: {
    slug: 'informacion-electronica', nav: 'Información Electrónica', card: 'Ley de Ohm, circuitos, potencia y componentes',
    title: 'Información electrónica ASVAB 2026: práctica de circuitos',
    description: 'Práctica de Información Electrónica del ASVAB 2026: diez preguntas de ley de Ohm, circuitos, potencia y componentes, resueltas, y los line scores que usa EI.',
    h1: 'Información Electrónica: práctica de circuitos del ASVAB',
    intro: 'Diez preguntas en dos series de cinco sobre corriente, voltaje, resistencia, potencia, conductores y componentes como diodos, capacitores y transformadores. Casi todas piden una fórmula y una línea de cálculo.',
    resume: `Información Electrónica (EI, Electronics Information) es la subprueba del ASVAB sobre electricidad y componentes electrónicos: ley de Ohm, circuitos en serie y en paralelo, potencia, unidades, conductores y piezas como diodos, capacitores y transformadores. La versión por computadora da ${c[0]} preguntas en ${c[1]} minutos, unos ${sec(c)} segundos cada una, y la versión en papel ${p[0]} preguntas en ${p[1]} minutos, unos ${sec(p)} segundos cada una, así que las fórmulas deben salir sin pensar. EI no forma parte del AFQT. Decide el acceso a empleos técnicos: es una de las cuatro partes del área Eléctrica de la Fuerza Aérea (${fmt(E.MAGE_PARTS.E)}) y aparece en ${marUse.length} line scores de los Marines, ${marUse.map((k) => `${k} = ${E.MARINE_PARTS[k].join(' + ')}`).join(' y ')}. Un aspirante fuerte en matemáticas, con AR ${x0.AR} y MK ${x0.MK}, pero con EI ${x0.EI}, tiene un percentil Eléctrico de ${e0}; con EI ${x1.EI} pasa a ${e1}, y el EL de los Marines sube de ${m0.EL} a ${m1.EL}. Las diez preguntas las escribe Radif Partners, no vienen del ASVAB, y un número de aciertos no se convierte en puntaje.`,
    faqs: [
      { q: '¿Qué fórmulas necesito para Información Electrónica?', a: 'Tres cubren casi todas las preguntas de cálculo: la ley de Ohm, voltaje igual a corriente por resistencia; potencia igual a voltaje por corriente; y las reglas para combinar resistencias, que se suman en serie mientras que en paralelo el total queda por debajo de la menor. Añada la relación del transformador, donde el voltaje sigue la proporción de vueltas, y las unidades: voltios, amperios, ohmios y vatios.' },
      { q: '¿Se puede sacar buen puntaje en Información Electrónica sin experiencia de taller?', a: 'Sí. Muchas preguntas tratan de definiciones y leyes sencillas que se aprenden en un libro: qué hace un diodo o un capacitor, qué metales conducen mejor, qué voltaje da un tomacorriente en Estados Unidos. La práctica manual ayuda a la intuición, pero unas semanas de estudio centrado en las fórmulas y en la función de cada componente cubren casi todo lo que pide esta subprueba.' },
      { q: '¿Qué line scores de los Marines usan Información Electrónica?', a: `Dos de los cuatro: MM, mantenimiento mecánico, hecho con ${E.MARINE_PARTS.MM.join(', ')}, y EL, reparación electrónica, hecho con ${E.MARINE_PARTS.EL.join(', ')}. Cada uno es una función lineal redondeada de la suma de esos puntajes estándar, con media 100 y desviación típica 20. La página de los Marines calcula los dos con su hoja.` },
    ],
    body: (h) => `<h2>Qué pide Información Electrónica</h2>
<p>Las diez preguntas de esta página se reparten entre cálculos y conocimientos. Cálculos: la corriente que pasa por una resistencia a partir del voltaje, un par en paralelo y una cadena en serie, la potencia de un calefactor a partir de amperios y voltios, y la salida de un transformador. Conocimientos: la unidad de potencia, el mejor conductor entre cuatro metales, la pieza que deja pasar la corriente en un solo sentido, el voltaje de un tomacorriente en Estados Unidos y la pieza que guarda energía entre dos placas. Los enunciados están en inglés, con la traducción debajo; el vocabulario técnico es corto y vale la pena aprenderlo: resistor, capacitor, diode, current, voltage, wattage. Las ${h.src('oa-samples', 'preguntas de ejemplo de Official ASVAB')} muestran la misma mezcla de preguntas cortas.</p>
${h.mini('quiz', { t: 'Cinco preguntas más de electrónica', p: ['q1', 'q2', 'q3', 'q4', 'q5'], d: { s: 'EI', k: 1 } })}
<h2>Poco tiempo por pregunta</h2>
<p>Según la ${h.src('oa-factsheet', 'hoja informativa de Official ASVAB')}, EI tiene ${h.n(c[0])} preguntas en ${h.n(c[1])} minutos en el examen por computadora y ${h.n(p[0])} en ${h.n(p[1])} minutos en papel, unos ${h.n(sec(c))} y ${h.n(sec(p))} segundos por pregunta. Hay espacio para una fórmula y una multiplicación, no para deducir la fórmula. Aprenda la ley de Ohm como un triángulo con V arriba e I y R abajo: tape la incógnita y las otras dos le dicen si multiplicar o dividir. Una batería de 12 voltios sobre 4 ohmios da 12 ÷ 4 = 3 amperios.</p>
<h2>Trampas clásicas</h2>
<ul>
<li><strong>Resistencia en paralelo.</strong> Dos resistencias de 6 y 3 ohmios en paralelo dan 2 ohmios, menos que cualquiera de las dos. Si su resultado es mayor que la menor resistencia, las sumó como si estuvieran en serie. Para dos resistencias sirve producto entre suma: 18 ÷ 9 = 2.</li>
<li><strong>Resistencia en serie.</strong> Tres resistencias de 10 ohmios en serie suman 30 ohmios. No hay que dividir.</li>
<li><strong>Potencia o resistencia.</strong> P = V × I y V = I × R se parecen. Un calefactor que toma 5 amperios a 120 voltios usa 600 vatios; dividir daría 24, que es una resistencia en ohmios, no una potencia.</li>
<li><strong>El sentido del transformador.</strong> Más vueltas en el secundario significa más voltaje: de 100 a 500 vueltas, 24 voltios se multiplican por 5 y dan 120. Con menos vueltas bajaría.</li>
<li><strong>El mejor conductor.</strong> La plata conduce mejor que el cobre. El cobre se usa en el cableado porque cuesta mucho menos, y por eso es la respuesta equivocada tentadora.</li>
</ul>
<h2>Dónde cuenta EI</h2>
<p>EI no influye en el AFQT, pero es una de las cuatro partes del área Eléctrica de la Fuerza Aérea y aparece en los line scores ${marUse.join(' y ')} de los Marines, todos calculados con las fórmulas y tablas del ${h.src('segall', 'informe de la escala de 1997')}. Tome a un aspirante con AR ${x0.AR}, MK ${x0.MK}, GS ${x0.GS}, MC ${x0.MC}, AS ${x0.AS} y VE ${x0.VE}. Con EI ${x0.EI}, el percentil Eléctrico es ${e0}, el MM de los Marines ${m0.MM} y el EL ${m0.EL}. Con EI ${x1.EI}, pasan a ${e1}, ${m1.MM} y ${m1.EL}. Para quien apunta a aviónica, comunicaciones o trabajos eléctricos, esa diferencia puede decidir qué empleos entran en la lista. El ${h.a('air-force-jobs', 'buscador de empleos de la Fuerza Aérea')} muestra las carreras con mínimo Eléctrico y la página de los ${h.a('marines', 'Marines')} calcula los cuatro line scores.</p>
<h2>Cómo prepararse</h2>
<p>Empiece por las unidades y las tres fórmulas anteriores, y siga con los componentes: resistencia, capacitor, inductor, diodo, transistor, transformador, fusible e interruptor automático, cada uno con una línea sobre lo que hace y su símbolo en un esquema. Practique problemas en serie y en paralelo hasta reconocer la configuración de un vistazo. El área Eléctrica usa también Ciencia General, así que repase la parte de física en la página de ${h.a('general-science', 'Ciencia General')}; el MM de los Marines suma Comprensión Mecánica, que se trata en la página de ${h.a('mechanical-comprehension', 'Comprensión Mecánica')}. Haga el ${h.a('practice-test', 'examen de práctica')} mixto para comparar EI con sus otras subpruebas.</p>`,
  },
});
