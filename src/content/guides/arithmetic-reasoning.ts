import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const E = K.E, P = K.P;
const c = (P.testLength.cat as Record<string, [number, number]>).AR, p = (P.testLength.pp as Record<string, [number, number]>).AR;
const sec = (x: [number, number]) => Math.round((x[1] * 60) / x[0]);
const fmt = (w: Partial<Record<string, number>>) => Object.entries(w).map(([k, x]) => (x === 2 ? `2${k}` : k)).join(' + ');
const mageUse = (['M', 'A', 'G', 'E'] as const).filter((k) => E.MAGE_PARTS[k].AR);
const marUse = (['MM', 'GT', 'EL', 'CL'] as const).filter((k) => E.MARINE_PARTS[k].includes('AR'));
const mageList = mageUse.map((k) => `${k} = ${fmt(E.MAGE_PARTS[k])}`).join('; ');
const marList = marUse.map((k) => `${k} = ${E.MARINE_PARTS[k].join(' + ')}`).join('; ');
/** Exemple : AR faible, le reste moyen. */
const x0 = { AR: 43, MK: 52, VE: 51 }, x1 = { ...x0, AR: 48 };
const a0 = E.afqt(x0), a1 = E.afqt(x1), g0 = E.armyGt(x0), g1 = E.armyGt(x1);

export default defineGuide({
  id: 'arithmetic-reasoning', group: 'practice', order: 21,
  tool: 'quiz', toolArg: { s: 'AR', k: 0 },
  related: ['math-knowledge', 'practice-test', 'army-gt', 'study-plan', 'afqt-calculator'],
  sources: ['oa-factsheet', 'oa-samples', 'segall', 'oa-scores'],
  en: {
    slug: 'arithmetic-reasoning-practice', nav: 'Arithmetic Reasoning', card: 'Word problems: rates, percents, averages, without a calculator',
    title: 'Arithmetic Reasoning Practice 2026: ASVAB AR Questions',
    description: 'ASVAB Arithmetic Reasoning practice for 2026: ten word problems with worked answers, the time allowed per question, the usual traps and how AR feeds your AFQT.',
    h1: 'Arithmetic Reasoning practice: ASVAB word problems',
    intro: 'Ten word problems in two sets of five, the kind of arithmetic the AR subtest asks for: pay, speed, discounts, averages and rates. No calculator, as on test day.',
    resume: `Arithmetic Reasoning (AR) is the ASVAB subtest of word problems: a short situation, a question, four answers, and no calculator. The computer version gives ${c[0]} questions in ${c[1]} minutes, about ${sec(c)} seconds each, the most generous time of any subtest; the paper version gives ${p[0]} questions in ${p[1]} minutes, about ${sec(p)} seconds each. AR counts once in the AFQT sum AR + MK + 2 × VE, it is half of the Army GT line score, and it enters ${mageUse.length} of the four Air Force areas and ${marUse.length} of the four Marine Corps line scores, more than any other subtest. A candidate with AR ${x0.AR}, MK ${x0.MK} and VE ${x0.VE} reads AFQT ${a0}; five more points on AR alone give ${a1}. The ten practice problems on this page are written by Radif Partners, not taken from the real test, and a share of right answers does not convert into a standard score.`,
    faqs: [
      { q: 'What kind of math is on the Arithmetic Reasoning subtest?', a: 'Everyday arithmetic set in a short story: hourly pay, distance and speed, discounts and percent change, proportions such as recipes or maps, simple interest, averages, and rates where two things work together or against each other. The math itself rarely goes beyond middle school; the difficulty is in turning the words into the right operation, quickly and without a calculator.' },
      { q: 'Why does Arithmetic Reasoning get so much time on the computer test?', a: `Because each item requires reading, setting up and computing. On the CAT-ASVAB you have about ${sec(c)} seconds per AR question, against about ${sec(p)} seconds on the paper version, which has more questions in less time. The CAT also adapts difficulty, so the later items you see may need several steps. Use the extra time to check that your answer fits the question asked.` },
      { q: 'Which jobs depend on a strong AR score?', a: `Many, because AR is part of so many composites. It is half of the Army GT score that many specialties and officer programs read, it enters the Air Force ${mageUse.join(', ')} areas and the Marine Corps ${marUse.join(', ')} line scores. A weak AR therefore narrows the choice of jobs in every branch, even when the AFQT is high enough to enlist.` },
      { q: 'Is it worth guessing on an AR question I cannot solve?', a: 'On the computer version, yes: you cannot skip and come back, and questions left unanswered when time runs out bring a penalty equal to random guessing, so an educated guess costs nothing more. Eliminate answers that are clearly too big or too small first. On paper, a blank counts as wrong too, so mark something before you move on.' },
    ],
    body: (h) => `<h2>What Arithmetic Reasoning measures</h2>
<p>AR checks whether you can pick the right operation from a description. The ten questions on this page cover the usual families: wages over a week, average speed of a convoy, a sale price after a discount, a recipe scaled up, a fraction of a group, simple interest, the score needed to reach an average, a tank filling while it leaks, a percent increase, and two pumps working together. None needs more than four operations and fractions, but each one hides the key number in a sentence. The real subtest uses the same kind of short situations, as the ${h.src('oa-samples', 'Official ASVAB sample questions')} show.</p>
<p>The second set of five sits below. Take the first set in the tool above, read every explanation, then try these without looking back.</p>
${h.mini('quiz', { t: 'Five more AR word problems', p: ['q1', 'q2', 'q3', 'q4', 'q5'], d: { s: 'AR', k: 1 } })}
<h2>Time per question and how to use it</h2>
<p>The ${h.src('oa-factsheet', 'Official ASVAB fact sheet')} gives ${h.n(c[0])} AR questions in ${h.n(c[1])} minutes on the computer test, or about ${h.n(sec(c))} seconds each. On paper the same subtest has ${h.n(p[0])} questions in ${h.n(p[1])} minutes, about ${h.n(sec(p))} seconds each, so a paper candidate must work about ${h.n(Math.round(sec(c) / sec(p)))} times faster. In practice, aim to finish a five question set in under ten minutes, then bring it down. Write every intermediate result on your scratch paper: most AR errors come from a lost digit, not from a wrong idea. The ${h.a('test-length', 'test length page')} has a pace calculator for every subtest.</p>
<h2>Traps worth knowing</h2>
<ul>
<li><strong>The base of a percent change.</strong> A price that goes from 40 to 50 rose by 10, and 10 is 25% of the old price, not 20% of the new one. Always divide by the starting value.</li>
<li><strong>Averaging rates.</strong> One pump fills a pool in 6 hours, another in 3. Together they do not take 4.5 hours, nor 9: add what each does in one hour, 1/6 + 1/3 = 1/2, so the pool fills in 2 hours.</li>
<li><strong>The complement.</strong> When 3/8 of 48 recruits failed a run, the question may ask how many passed. Compute the 18 who failed, then answer 30.</li>
<li><strong>Net rates.</strong> A tank filling at 8 gallons a minute while 3 leak out gains 5 a minute, not 8 or 11.</li>
<li><strong>Units.</strong> Minutes and hours, cents and dollars, feet and yards: convert before you compute, never after.</li>
</ul>
<p>A quick check catches most of these: estimate the answer before computing it. If the sale price comes out above the regular price, or two pumps together are slower than the faster one alone, the setup is wrong.</p>
<h2>Where the AR score goes</h2>
<p>AR enters the AFQT once, in the sum AR + MK + 2 × VE read in the ${h.src('segall', '1997 conversion table')}. Take a candidate with AR ${x0.AR}, MK ${x0.MK} and VE ${x0.VE}: the AFQT is ${a0}. With AR at ${x1.AR}, all else equal, it becomes ${a1}. The same five points move the Army GT score, built only from AR and VE, from ${g0} to ${g1}; the ${h.a('army-gt', 'Army GT page')} explains why that score matters for many specialties. In the Air Force, AR is part of ${mageUse.length} areas (${mageList}), and in the Marine Corps it is part of ${marUse.length} line scores (${marList}). No other subtest appears in so many composites, which is why AR deserves practice even after the AFQT minimum is met.</p>
<h2>A study approach that works</h2>
<p>Learn the handful of setups first: rate × time = distance, part = percent × whole, new average × count = total, and work rates added per hour. Then drill them in mixed sets, so that you practice recognizing which setup a story calls for, which is the real skill tested. Review the arithmetic you do by hand: long division, fractions to decimals, and percent of a number. Mathematics Knowledge tests the algebra behind these steps, so the ${h.a('math-knowledge', 'Math Knowledge page')} is the natural next stop; the ${h.a('study-plan', 'study plan page')} shows how many points on AR would reach your AFQT target, and the ${h.a('practice-test', 'practice test')} mixes AR with the other subtests.</p>`,
  },
  es: {
    slug: 'razonamiento-aritmetico', nav: 'Razonamiento Aritmético', card: 'Problemas con enunciado: tasas, porcentajes, promedios, sin calculadora',
    title: 'Razonamiento aritmético ASVAB 2026: preguntas de práctica',
    description: 'Práctica de Razonamiento Aritmético del ASVAB 2026: diez problemas resueltos, el tiempo por pregunta, las trampas habituales y cómo AR cuenta en su AFQT.',
    h1: 'Razonamiento Aritmético: práctica de problemas del ASVAB',
    intro: 'Diez problemas con enunciado en dos series de cinco, el tipo de aritmética que pide la subprueba AR: salario, velocidad, descuentos, promedios y tasas. Sin calculadora, como el día del examen.',
    resume: `Razonamiento Aritmético (AR) es la subprueba del ASVAB de problemas con enunciado: una situación corta, una pregunta, cuatro respuestas y ninguna calculadora. La versión por computadora da ${c[0]} preguntas en ${c[1]} minutos, unos ${sec(c)} segundos por pregunta, el tiempo más amplio de todas las subpruebas; la versión en papel da ${p[0]} preguntas en ${p[1]} minutos, unos ${sec(p)} segundos por pregunta. AR cuenta una vez en la suma del AFQT, AR + MK + 2 × VE, es la mitad del line score GT del Ejército y entra en ${mageUse.length} de las cuatro áreas de la Fuerza Aérea y en ${marUse.length} de los cuatro line scores de los Marines, más que cualquier otra subprueba. Un aspirante con AR ${x0.AR}, MK ${x0.MK} y VE ${x0.VE} tiene un AFQT de ${a0}; cinco puntos más solo en AR dan ${a1}. Los diez problemas de esta página los escribe Radif Partners, no vienen del examen real, y un porcentaje de aciertos no se convierte en puntaje estándar.`,
    faqs: [
      { q: '¿Qué tipo de matemáticas entra en Razonamiento Aritmético?', a: 'Aritmética cotidiana dentro de una historia corta: salario por hora, distancia y velocidad, descuentos y variación porcentual, proporciones como recetas o mapas, interés simple, promedios y tasas en las que dos cosas trabajan juntas o en contra. Las cuentas rara vez pasan del nivel de secundaria básica; la dificultad está en convertir las palabras en la operación correcta, rápido y sin calculadora.' },
      { q: '¿Por qué Razonamiento Aritmético tiene tanto tiempo en el examen por computadora?', a: `Porque cada pregunta exige leer, plantear y calcular. En el CAT-ASVAB tiene unos ${sec(c)} segundos por pregunta de AR, frente a unos ${sec(p)} segundos en la versión en papel, que trae más preguntas en menos tiempo. El CAT también adapta la dificultad, así que las últimas preguntas pueden pedir varios pasos. Use el tiempo extra para comprobar que su respuesta contesta lo que se pregunta.` },
      { q: '¿Qué empleos dependen de un buen puntaje en AR?', a: `Muchos, porque AR forma parte de muchos compuestos. Es la mitad del GT del Ejército, que leen numerosas especialidades y programas de oficiales, y entra en las áreas ${mageUse.join(', ')} de la Fuerza Aérea y en los line scores ${marUse.join(', ')} de los Marines. Un AR flojo reduce por eso la lista de empleos en todas las ramas, aunque el AFQT alcance para alistarse.` },
      { q: '¿Vale la pena adivinar una pregunta de AR que no sé resolver?', a: 'En la versión por computadora, sí: no puede saltarla y volver, y las preguntas sin responder al acabarse el tiempo reciben una penalización equivalente a responder al azar, así que una respuesta razonada no cuesta más. Descarte primero las opciones claramente demasiado grandes o pequeñas. En papel, una pregunta en blanco también cuenta como error, así que marque algo antes de seguir.' },
    ],
    body: (h) => `<h2>Qué mide Razonamiento Aritmético</h2>
<p>AR comprueba si usted sabe elegir la operación correcta a partir de una descripción. Las diez preguntas de esta página cubren las familias habituales: el salario de una semana, la velocidad media de un convoy, un precio con descuento, una receta ampliada, una fracción de un grupo, el interés simple, la nota necesaria para alcanzar un promedio, un tanque que se llena mientras pierde agua, un aumento porcentual y dos bombas que trabajan juntas. Ninguna necesita más que las cuatro operaciones y fracciones, pero cada una esconde el dato clave en una frase. Las preguntas siguen en inglés, como en el examen real, con la traducción debajo. El examen usa el mismo tipo de situaciones breves, como muestran las ${h.src('oa-samples', 'preguntas de ejemplo de Official ASVAB')}.</p>
<p>La segunda serie de cinco está aquí abajo. Haga la primera en la herramienta de arriba, lea cada explicación y luego intente estas sin volver atrás.</p>
${h.mini('quiz', { t: 'Cinco problemas más de AR', p: ['q1', 'q2', 'q3', 'q4', 'q5'], d: { s: 'AR', k: 1 } })}
<h2>Tiempo por pregunta y cómo aprovecharlo</h2>
<p>La ${h.src('oa-factsheet', 'hoja informativa de Official ASVAB')} da ${h.n(c[0])} preguntas de AR en ${h.n(c[1])} minutos en el examen por computadora, unos ${h.n(sec(c))} segundos cada una. En papel la misma subprueba tiene ${h.n(p[0])} preguntas en ${h.n(p[1])} minutos, unos ${h.n(sec(p))} segundos cada una, así que quien la hace en papel debe trabajar unas ${h.n(Math.round(sec(c) / sec(p)))} veces más rápido. Al practicar, intente terminar una serie de cinco en menos de diez minutos y luego baje ese tiempo. Escriba cada resultado intermedio en la hoja de borrador: la mayoría de los errores de AR viene de un dígito perdido, no de una idea equivocada. La página de ${h.a('test-length', 'duración del examen')} tiene una calculadora de ritmo para cada subprueba.</p>
<h2>Trampas que conviene conocer</h2>
<ul>
<li><strong>La base de una variación porcentual.</strong> Un precio que pasa de 40 a 50 sube 10, y 10 es el 25 % del precio inicial, no el 20 % del nuevo. Divida siempre entre el valor de partida.</li>
<li><strong>Promediar tasas.</strong> Una bomba llena una piscina en 6 horas y otra en 3. Juntas no tardan 4,5 horas ni 9: sume lo que hace cada una en una hora, 1/6 + 1/3 = 1/2, y la piscina se llena en 2 horas.</li>
<li><strong>El complemento.</strong> Si 3/8 de 48 reclutas no pasaron una carrera, la pregunta puede pedir cuántos pasaron. Calcule los 18 que no pasaron y responda 30.</li>
<li><strong>Tasas netas.</strong> Un tanque que se llena a 8 galones por minuto mientras pierde 3 gana 5 por minuto, no 8 ni 11.</li>
<li><strong>Unidades.</strong> Minutos y horas, centavos y dólares, pies y yardas: convierta antes de calcular, nunca después.</li>
</ul>
<p>Una comprobación rápida detecta casi todas: estime la respuesta antes de calcularla. Si el precio rebajado sale mayor que el normal, o dos bombas juntas tardan más que la más rápida sola, el planteamiento está mal.</p>
<h2>A dónde va el puntaje de AR</h2>
<p>AR entra una vez en el AFQT, en la suma AR + MK + 2 × VE que se lee en la ${h.src('segall', 'tabla de conversión de 1997')}. Tome a un aspirante con AR ${x0.AR}, MK ${x0.MK} y VE ${x0.VE}: su AFQT es ${a0}. Con AR en ${x1.AR} y lo demás igual, pasa a ${a1}. Esos mismos cinco puntos llevan el GT del Ejército, hecho solo con AR y VE, de ${g0} a ${g1}; la página del ${h.a('army-gt', 'GT del Ejército')} explica por qué ese puntaje importa para muchas especialidades. En la Fuerza Aérea, AR forma parte de ${mageUse.length} áreas (${mageList}), y en los Marines de ${marUse.length} line scores (${marList}). Ninguna otra subprueba aparece en tantos compuestos, por eso AR merece práctica incluso después de alcanzar el mínimo de AFQT.</p>
<h2>Un método de estudio que funciona</h2>
<p>Aprenda primero los pocos planteamientos básicos: velocidad × tiempo = distancia, parte = porcentaje × total, promedio × cantidad = suma total, y tasas de trabajo sumadas por hora. Después practíquelos en series mezcladas, para entrenar lo que de verdad se evalúa: reconocer qué planteamiento pide cada historia. Repase también el cálculo a mano: división larga, fracciones a decimales y porcentaje de un número. Conocimientos Matemáticos evalúa el álgebra que hay detrás de esos pasos, así que la página de ${h.a('math-knowledge', 'Conocimientos Matemáticos')} es la siguiente parada natural; la del ${h.a('study-plan', 'plan de estudio')} muestra cuántos puntos de AR lo llevarían a su objetivo de AFQT, y el ${h.a('practice-test', 'examen de práctica')} mezcla AR con las demás subpruebas.</p>`,
  },
});
