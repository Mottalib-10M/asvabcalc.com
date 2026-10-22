import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const E = K.E, P = K.P;
const c = (P.testLength.cat as Record<string, [number, number]>).MK, p = (P.testLength.pp as Record<string, [number, number]>).MK;
const sec = (x: [number, number]) => Math.round((x[1] * 60) / x[0]);
const fmt = (w: Partial<Record<string, number>>) => Object.entries(w).map(([k, x]) => (x === 2 ? `2${k}` : k)).join(' + ');
const mageUse = (['M', 'A', 'G', 'E'] as const).filter((k) => E.MAGE_PARTS[k].MK);
const marUse = (['MM', 'GT', 'EL', 'CL'] as const).filter((k) => E.MARINE_PARTS[k].includes('MK'));
const mageList = mageUse.map((k) => `${k} = ${fmt(E.MAGE_PARTS[k])}`).join('; ');
const marList = marUse.map((k) => `${k} = ${E.MARINE_PARTS[k].join(' + ')}`).join('; ');
/** Exemple : verbal correct, MK en retard. */
const x0 = { AR: 50, MK: 41, VE: 53, GS: 49, EI: 47 }, x1 = { ...x0, MK: 47 };
const a0 = E.afqt(x0), a1 = E.afqt(x1), mA0 = E.mage(x0).A.pct, mA1 = E.mage(x1).A.pct, mE0 = E.mage(x0).E.pct, mE1 = E.mage(x1).E.pct;

export default defineGuide({
  id: 'math-knowledge', group: 'practice', order: 24,
  tool: 'quiz', toolArg: { s: 'MK', k: 0 },
  related: ['arithmetic-reasoning', 'air-force', 'practice-test', 'study-plan', 'line-scores'],
  sources: ['oa-factsheet', 'oa-samples', 'segall', 'oa-faqs'],
  en: {
    slug: 'math-knowledge-practice', nav: 'Math Knowledge', card: 'Algebra, exponents, geometry: the high school math of the ASVAB',
    title: 'Math Knowledge Practice 2026: ASVAB MK Algebra, Geometry',
    description: 'ASVAB Mathematics Knowledge practice for 2026: ten algebra and geometry questions with solutions, formulas to know, sign and exponent traps, where MK counts.',
    h1: 'Mathematics Knowledge practice: ASVAB algebra and geometry',
    intro: 'Ten questions in two sets of five on equations, exponents, fractions, triangles, circles, polygons, inequalities and volume. Pencil and paper only, as on the real test.',
    resume: `Mathematics Knowledge (MK) is the ASVAB subtest of high school math stated directly, without a story: solve an equation, simplify an exponent, find an area, a volume or an angle. Where Arithmetic Reasoning tests whether you can set up a problem, MK tests whether you know the rule. The computer version gives ${c[0]} questions in ${c[1]} minutes, about ${sec(c)} seconds each, and the paper version ${p[0]} questions in ${p[1]} minutes, about ${sec(p)} seconds each. MK counts once in the AFQT sum AR + MK + 2 × VE, and it enters the Air Force ${mageUse.join(' and ')} areas and the Marine Corps ${marUse.join(' and ')} line scores. A candidate with AR ${x0.AR} and VE ${x0.VE} who raises MK from ${x0.MK} to ${x1.MK} moves the AFQT from ${a0} to ${a1} and the Air Force Administrative percentile from ${mA0} to ${mA1}. No calculator is allowed. The ten questions are written by Radif Partners, they are not real ASVAB items, and a score on them does not convert into an AFQT.`,
    faqs: [
      { q: 'What is the difference between Math Knowledge and Arithmetic Reasoning?', a: 'Arithmetic Reasoning wraps simple arithmetic in a short story and asks you to find the operation. Mathematics Knowledge gives the math directly, an equation, an exponent or a shape, and asks you to apply the rule. A candidate can be strong in one and weak in the other, so look at both standard scores on your sheet before choosing what to study.' },
      { q: 'Which formulas should I know by heart for Math Knowledge?', a: 'At least the area and circumference of a circle, the area of a triangle and a rectangle, the volume of a box, the Pythagorean theorem, the sum of interior angles of a polygon, the exponent rules for products and powers, how to add fractions with different denominators, and how to solve a linear equation, an inequality and a simple quadratic by factoring. Learn them before test day.' },
      { q: 'Does Math Knowledge matter for Air Force jobs?', a: `Yes. MK is part of two of the four Air Force areas: Administrative (${fmt(E.MAGE_PARTS.A)}) and Electrical (${fmt(E.MAGE_PARTS.E)}). Many technical and support jobs list a minimum in one of these areas, so a weak MK can close careers even when the AFQT is well above the enlistment floor. The Air Force jobs page shows which careers each area opens.` },
    ],
    body: (h) => `<h2>What Mathematics Knowledge covers</h2>
<p>The ten questions on this page sample the main topics of the subtest. In algebra: a linear equation (3x + 7 = 25), an exponent (2 to the fifth), the product rule for powers, a quadratic solved by factoring and an inequality. In geometry: the area of a circle, the hypotenuse of a right triangle, the interior angles of a hexagon and the volume of a box. One question adds two fractions with different denominators. The real subtest stays within the same high school range, as the ${h.src('oa-samples', 'Official ASVAB sample questions')} show, but the computer version adapts and may serve harder items if you answer well.</p>
${h.mini('quiz', { t: 'Five more MK questions', p: ['q1', 'q2', 'q3', 'q4', 'q5'], d: { s: 'MK', k: 1 } })}
<h2>Time and method</h2>
<p>The ${h.src('oa-factsheet', 'Official ASVAB fact sheet')} gives ${h.n(c[0])} MK questions in ${h.n(c[1])} minutes on the computer test, about ${h.n(sec(c))} seconds each, and ${h.n(p[0])} in ${h.n(p[1])} minutes on paper, about ${h.n(sec(p))} seconds each. Because no calculator is allowed, keep the arithmetic light: work with fractions and with pi left as a symbol whenever the choices do, as in an answer written 16π. Check by substitution when you can. If x = 6 is offered for 3x + 7 = 25, compute 18 + 7 and you are done in five seconds, faster than solving.</p>
<h2>Common traps, with examples</h2>
<ul>
<li><strong>Adding fractions straight across.</strong> 3/4 + 2/3 is not 5/7. Put both over 12: 9/12 + 8/12 = 17/12.</li>
<li><strong>Multiplying exponents that should be added.</strong> x³ times x⁴ is x⁷, not x¹². Exponents multiply only when a power is raised to another power, as in (x³)⁴.</li>
<li><strong>Flipping the inequality.</strong> In 2(x − 3) > 4x + 2, the x terms end up as −2x > 8. Dividing by −2 reverses the sign: x &lt; −4. Forgetting this is one of the most frequent algebra errors.</li>
<li><strong>Area versus circumference.</strong> For a radius of 4, the area is πr² = 16π and the circumference 2πr = 8π. Both are usually among the choices.</li>
<li><strong>Polygon angles.</strong> The interior angles of an n-sided polygon add up to (n − 2) × 180. A hexagon gives 720 degrees, not 360, which is the sum of the exterior angles.</li>
</ul>
<h2>Where MK counts</h2>
<p>MK enters the AFQT once, in the sum AR + MK + 2 × VE read in the ${h.src('segall', '1997 conversion table')}. It weighs half as much as VE there, but it is the subtest that most often holds back candidates who read well. Take a candidate with AR ${x0.AR}, VE ${x0.VE}, GS ${x0.GS} and EI ${x0.EI}. With MK ${x0.MK}, the AFQT is ${a0}; with MK ${x1.MK}, it becomes ${a1}. The Air Force Administrative percentile moves from ${mA0} to ${mA1} and the Electrical percentile from ${mE0} to ${mE1}, because MK appears in ${mageList}. In the Marine Corps, MK is part of ${marList}. The ${h.a('line-scores', 'line score calculator')} shows the effect on every composite, and the ${h.a('air-force', 'Air Force page')} explains how the four areas open jobs.</p>
<h2>A study plan for MK</h2>
<p>Write one page with every formula from the list above and recite it until you can rebuild it from memory. Then work by topic: one session on equations and inequalities, one on exponents and roots, one on plane geometry, one on volume and polygons. End each session with a mixed timed set, since the real test does not announce the topic. Arithmetic Reasoning uses the same skills inside stories, so the ${h.a('arithmetic-reasoning', 'Arithmetic Reasoning page')} is the next step, and the ${h.a('study-plan', 'study plan page')} shows how many MK points your AFQT target needs. Finish with the mixed ${h.a('practice-test', 'practice test')}.</p>`,
  },
  es: {
    slug: 'conocimientos-matematicos', nav: 'Conocimientos Matemáticos', card: 'Álgebra, exponentes, geometría: las matemáticas de secundaria del ASVAB',
    title: 'Conocimientos matemáticos ASVAB 2026: álgebra y geometría',
    description: 'Práctica de Conocimientos Matemáticos del ASVAB 2026: diez preguntas de álgebra y geometría resueltas, fórmulas clave, trampas de signos y el peso de MK.',
    h1: 'Conocimientos Matemáticos: práctica de álgebra y geometría del ASVAB',
    intro: 'Diez preguntas en dos series de cinco sobre ecuaciones, exponentes, fracciones, triángulos, círculos, polígonos, desigualdades y volumen. Solo lápiz y papel, como en el examen real.',
    resume: `Conocimientos Matemáticos (MK, Mathematics Knowledge) es la subprueba del ASVAB de matemáticas de secundaria planteadas de forma directa, sin historia: resolver una ecuación, simplificar un exponente, hallar un área, un volumen o un ángulo. Mientras Razonamiento Aritmético evalúa si sabe plantear un problema, MK evalúa si conoce la regla. La versión por computadora da ${c[0]} preguntas en ${c[1]} minutos, unos ${sec(c)} segundos cada una, y la versión en papel ${p[0]} preguntas en ${p[1]} minutos, unos ${sec(p)} segundos cada una. MK cuenta una vez en la suma del AFQT, AR + MK + 2 × VE, y entra en las áreas ${mageUse.join(' y ')} de la Fuerza Aérea y en los line scores ${marUse.join(' y ')} de los Marines. Un aspirante con AR ${x0.AR} y VE ${x0.VE} que sube MK de ${x0.MK} a ${x1.MK} lleva su AFQT de ${a0} a ${a1} y su percentil Administrativo de la Fuerza Aérea de ${mA0} a ${mA1}. No se permite calculadora. Las diez preguntas las escribe Radif Partners, no son preguntas reales del ASVAB y un resultado en ellas no se convierte en AFQT.`,
    faqs: [
      { q: '¿En qué se diferencia Conocimientos Matemáticos de Razonamiento Aritmético?', a: 'Razonamiento Aritmético envuelve una aritmética sencilla en una historia corta y le pide encontrar la operación. Conocimientos Matemáticos da las matemáticas directamente, una ecuación, un exponente o una figura, y le pide aplicar la regla. Se puede ser fuerte en una y flojo en la otra, así que mire los dos puntajes estándar de su hoja antes de decidir qué estudiar.' },
      { q: '¿Qué fórmulas hay que saberse de memoria para Conocimientos Matemáticos?', a: 'Por lo menos el área y la circunferencia del círculo, el área del triángulo y del rectángulo, el volumen de una caja, el teorema de Pitágoras, la suma de los ángulos interiores de un polígono, las reglas de exponentes para productos y potencias, cómo sumar fracciones con distinto denominador y cómo resolver una ecuación lineal, una desigualdad y una cuadrática sencilla por factorización.' },
      { q: '¿Conocimientos Matemáticos cuenta para los empleos de la Fuerza Aérea?', a: `Sí. MK forma parte de dos de las cuatro áreas de la Fuerza Aérea: Administrativa (${fmt(E.MAGE_PARTS.A)}) y Eléctrica (${fmt(E.MAGE_PARTS.E)}). Muchos empleos técnicos y de apoyo piden un mínimo en una de esas áreas, así que un MK flojo puede cerrar carreras aunque el AFQT esté muy por encima del piso de alistamiento. La página de empleos de la Fuerza Aérea muestra qué abre cada área.` },
    ],
    body: (h) => `<h2>Qué cubre Conocimientos Matemáticos</h2>
<p>Las diez preguntas de esta página recorren los temas principales de la subprueba. En álgebra: una ecuación lineal (3x + 7 = 25), una potencia (2 a la quinta), la regla del producto de potencias, una cuadrática que se resuelve factorizando y una desigualdad. En geometría: el área de un círculo, la hipotenusa de un triángulo rectángulo, los ángulos interiores de un hexágono y el volumen de una caja. Una pregunta suma dos fracciones con distinto denominador. Los enunciados están en inglés, como en el examen real, con la traducción debajo; conviene aprender el vocabulario básico, como solve, simplify, area, volume o hypotenuse. El examen real se mantiene en el mismo nivel de secundaria, como muestran las ${h.src('oa-samples', 'preguntas de ejemplo de Official ASVAB')}, aunque la versión por computadora se adapta y puede dar preguntas más difíciles si usted acierta.</p>
${h.mini('quiz', { t: 'Cinco preguntas más de MK', p: ['q1', 'q2', 'q3', 'q4', 'q5'], d: { s: 'MK', k: 1 } })}
<h2>Tiempo y método</h2>
<p>La ${h.src('oa-factsheet', 'hoja informativa de Official ASVAB')} da ${h.n(c[0])} preguntas de MK en ${h.n(c[1])} minutos en el examen por computadora, unos ${h.n(sec(c))} segundos cada una, y ${h.n(p[0])} en ${h.n(p[1])} minutos en papel, unos ${h.n(sec(p))} segundos cada una. Como no se permite calculadora, mantenga las cuentas ligeras: trabaje con fracciones y deje pi como símbolo cuando las opciones lo hacen, como en una respuesta escrita 16π. Compruebe sustituyendo cuando pueda. Si para 3x + 7 = 25 se ofrece x = 6, calcule 18 + 7 y habrá terminado en cinco segundos, más rápido que resolviendo.</p>
<h2>Trampas frecuentes, con ejemplos</h2>
<ul>
<li><strong>Sumar fracciones en línea recta.</strong> 3/4 + 2/3 no es 5/7. Ponga las dos sobre 12: 9/12 + 8/12 = 17/12.</li>
<li><strong>Multiplicar exponentes que se suman.</strong> x³ por x⁴ es x⁷, no x¹². Los exponentes se multiplican solo cuando una potencia se eleva a otra, como en (x³)⁴.</li>
<li><strong>No invertir la desigualdad.</strong> En 2(x − 3) > 4x + 2, los términos en x quedan como −2x > 8. Al dividir entre −2 el signo se invierte: x &lt; −4. Olvidarlo es uno de los errores de álgebra más frecuentes.</li>
<li><strong>Área o circunferencia.</strong> Con radio 4, el área es πr² = 16π y la circunferencia 2πr = 8π. Las dos suelen estar entre las opciones.</li>
<li><strong>Ángulos de un polígono.</strong> Los ángulos interiores de un polígono de n lados suman (n − 2) × 180. Un hexágono da 720 grados, no 360, que es la suma de los ángulos exteriores.</li>
</ul>
<h2>Dónde cuenta MK</h2>
<p>MK entra una vez en el AFQT, en la suma AR + MK + 2 × VE que se lee en la ${h.src('segall', 'tabla de conversión de 1997')}. Allí pesa la mitad que VE, pero es la subprueba que más a menudo frena a los aspirantes que leen bien. Tome a un aspirante con AR ${x0.AR}, VE ${x0.VE}, GS ${x0.GS} y EI ${x0.EI}. Con MK ${x0.MK}, el AFQT es ${a0}; con MK ${x1.MK}, pasa a ${a1}. El percentil Administrativo de la Fuerza Aérea va de ${mA0} a ${mA1} y el Eléctrico de ${mE0} a ${mE1}, porque MK aparece en ${mageList}. En los Marines, MK forma parte de ${marList}. La ${h.a('line-scores', 'calculadora de line scores')} muestra el efecto en cada compuesto y la página de la ${h.a('air-force', 'Fuerza Aérea')} explica cómo las cuatro áreas abren empleos.</p>
<h2>Un plan de estudio para MK</h2>
<p>Escriba una página con todas las fórmulas de la lista anterior y repítala hasta poder reconstruirla de memoria. Luego trabaje por temas: una sesión de ecuaciones y desigualdades, otra de exponentes y raíces, otra de geometría plana y otra de volumen y polígonos. Termine cada sesión con una serie mezclada y cronometrada, porque el examen real no anuncia el tema. Razonamiento Aritmético usa las mismas destrezas dentro de historias, así que la página de ${h.a('arithmetic-reasoning', 'Razonamiento Aritmético')} es el paso siguiente, y la del ${h.a('study-plan', 'plan de estudio')} muestra cuántos puntos de MK necesita su objetivo de AFQT. Termine con el ${h.a('practice-test', 'examen de práctica')} mixto.</p>`,
  },
});
