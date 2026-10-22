import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const E = K.E, P = K.P;
const c = (P.testLength.cat as Record<string, [number, number]>).GS, p = (P.testLength.pp as Record<string, [number, number]>).GS;
const sec = (x: [number, number]) => Math.round((x[1] * 60) / x[0]);
const fmt = (w: Partial<Record<string, number>>) => Object.entries(w).map(([k, x]) => (x === 2 ? `2${k}` : k)).join(' + ');
const mageUse = (['M', 'A', 'G', 'E'] as const).filter((k) => E.MAGE_PARTS[k].GS);
const marUse = (['MM', 'GT', 'EL', 'CL'] as const).filter((k) => E.MARINE_PARTS[k].includes('GS'));
/** Exemple : un candidat qui vise l'électronique. */
const x0 = { GS: 44, AR: 54, MK: 52, EI: 50, VE: 51 }, x1 = { ...x0, GS: 52 };
const e0 = E.mage(x0).E.pct, e1 = E.mage(x1).E.pct, el0 = E.marines(x0).EL, el1 = E.marines(x1).EL, af = E.afqt(x0);
const share60 = Math.round(E.shareAbove(60) * 100);

export default defineGuide({
  id: 'general-science', group: 'practice', order: 25,
  tool: 'quiz', toolArg: { s: 'GS', k: 0 },
  related: ['electronics-information', 'air-force-jobs', 'line-scores', 'practice-test'],
  sources: ['oa-factsheet', 'oa-samples', 'segall', 'oa-scores'],
  en: {
    slug: 'general-science-practice', nav: 'General Science', card: 'Biology, chemistry, earth science and physics basics',
    title: 'General Science Practice 2026: ASVAB GS Questions Explained',
    description: 'ASVAB General Science practice for 2026: ten biology, chemistry, earth and physics questions with answers, the seconds per item and the line scores GS opens.',
    h1: 'General Science practice: ASVAB science questions',
    intro: 'Ten science questions in two sets of five: cells and blood, chemical symbols and pH, planets and the atmosphere, force and sound. Short items that reward recall more than reasoning.',
    resume: `General Science (GS) is the ASVAB subtest of school science facts: life science, chemistry, earth and space science, and basic physics. Questions are short and most can be answered in seconds if you know the fact. The computer version gives ${c[0]} questions in ${c[1]} minutes, about ${sec(c)} seconds each, and the paper version ${p[0]} questions in ${p[1]} minutes, about ${sec(p)} seconds each. GS is not part of the AFQT, so it does not decide whether you can enlist. It counts for jobs: it is part of the Air Force Electrical area (${fmt(E.MAGE_PARTS.E)}) and the Marine Corps EL line score (${E.MARINE_PARTS.EL.join(' + ')}). For a candidate with AR ${x0.AR}, MK ${x0.MK} and EI ${x0.EI}, raising GS from ${x0.GS} to ${x1.GS} lifts the Electrical percentile from ${e0} to ${e1} and the Marine EL from ${el0} to ${el1}, with no change to the AFQT. The ten questions are written by Radif Partners, not taken from the ASVAB, and a share of right answers is not a standard score.`,
    faqs: [
      { q: 'Does General Science affect my AFQT score?', a: 'No. The AFQT uses only Arithmetic Reasoning, Mathematics Knowledge, Word Knowledge and Paragraph Comprehension. General Science matters for job qualification: it is part of the Air Force Electrical area and the Marine Corps electronics line score, and the Army uses it in several of its composites. If your goal is only to meet a branch minimum, study the AFQT subtests first.' },
      { q: 'What science topics come up most on the ASVAB General Science subtest?', a: 'The subtest draws on the science taught in middle and high school: cells and organ systems, plants, the periodic table and simple chemistry such as pH, the solar system, weather and the layers of the atmosphere, and basic physics such as force, energy and sound. Questions ask for facts and simple relations, not lab methods or long calculations.' },
      { q: 'How fast do I need to answer General Science questions?', a: `On the computer version, about ${sec(c)} seconds per question; on paper, about ${sec(p)} seconds. Both are short, because a GS item is either known or not. Practice quick recall rather than long reasoning, and when a question is unknown, eliminate the choices that break a rule you do know, choose and move on.` },
    ],
    body: (h) => `<h2>What General Science covers</h2>
<p>The ten questions on this page sample the four areas of the subtest. Life science: the organelle that releases energy in cells, the vessels that carry blood away from the heart, photosynthesis. Chemistry: the symbol for sodium and the meaning of a pH of 3. Earth and space science: the planet nearest the Sun, the layer that holds most of the ozone, the gas that makes up most of the air. Physics: the force on an accelerating cart and the material in which sound travels fastest. The real subtest stays within school science, as the ${h.src('oa-samples', 'Official ASVAB sample questions')} show.</p>
${h.mini('quiz', { t: 'Five more science questions', p: ['q1', 'q2', 'q3', 'q4', 'q5'], d: { s: 'GS', k: 1 } })}
<h2>A fast subtest</h2>
<p>The ${h.src('oa-factsheet', 'Official ASVAB fact sheet')} gives ${h.n(c[0])} GS questions in ${h.n(c[1])} minutes on the computer test and ${h.n(p[0])} in ${h.n(p[1])} minutes on paper: about ${h.n(sec(c))} and ${h.n(sec(p))} seconds per item. That pace rules out working a problem from first principles. Even the one physics calculation on this page, force equals mass times acceleration, takes a single multiplication once you know the formula: a 10 kilogram cart at 3 meters per second squared feels 30 newtons. The time goes to recall, so short daily review beats long sessions.</p>
<h2>Traps and memory hooks</h2>
<ul>
<li><strong>Arteries and veins.</strong> Arteries carry blood Away from the heart; both words start with A. Veins bring it back. Capillaries join the two.</li>
<li><strong>Symbols from Latin.</strong> Sodium is Na (natrium), potassium K, iron Fe, gold Au, silver Ag, lead Pb. S is sulfur, not sodium. These are classic wrong choices.</li>
<li><strong>The pH direction.</strong> Below 7 is acidic, 7 neutral, above 7 basic. Lower means more acidic, which feels backwards to many readers.</li>
<li><strong>Atmosphere layers.</strong> Weather happens in the troposphere, the lowest layer; most ozone sits above it in the stratosphere.</li>
<li><strong>Sound and light.</strong> Sound needs a medium and travels faster in solids such as steel than in water or air; light travels fastest in a vacuum. Choices mix the two on purpose.</li>
<li><strong>Mass and weight.</strong> Mass is in kilograms and does not change on the Moon; weight is a force, in newtons, and does.</li>
</ul>
<h2>Which scores GS moves</h2>
<p>GS enters ${mageUse.length} of the four Air Force areas, Electrical, and ${marUse.length} Marine Corps line score, EL, both built from the formulas of the ${h.src('segall', '1997 score scale report')}. Take a candidate who wants an electronics job, with AR ${x0.AR}, MK ${x0.MK}, EI ${x0.EI} and VE ${x0.VE}: the AFQT is ${af}, comfortably above the floors. With GS ${x0.GS}, the Electrical percentile is ${e0} and the Marine EL ${el0}. With GS ${x1.GS}, they become ${e1} and ${el1}, while the AFQT stays at ${af}. A standard score of 60 places you in the top ${share60}% or so of the 1997 youth sample, and a few points of GS can be the difference for a technical specialty. The ${h.a('air-force-jobs', 'Air Force job finder')} shows which careers ask for an Electrical minimum, and the ${h.a('line-scores', 'line score calculator')} shows every composite at once.</p>
<h2>How to study General Science</h2>
<p>Use a high school science review book or free school materials and make one sheet per area: the organ systems and what each does, the first twenty elements with their symbols, the planets in order and the layers of the atmosphere, and the basic physics formulas for force, work, speed and density. Turn each sheet into questions and answer them aloud. If you studied science long ago, start with the area you remember least: a weak area costs more points than polishing a strong one. Ten minutes of flash cards a day is enough to keep the facts fresh in the weeks before the test. Since GS and Electronics Information share the Electrical area, continue with the ${h.a('electronics-information', 'Electronics Information page')}, and check the other subtests with the ${h.a('practice-test', 'practice test')}.</p>`,
  },
  es: {
    slug: 'ciencia-general', nav: 'Ciencia General', card: 'Biología, química, ciencias de la Tierra y física básica',
    title: 'Ciencia general ASVAB 2026: preguntas de práctica explicadas',
    description: 'Práctica de Ciencia General del ASVAB 2026: diez preguntas de biología, química, Tierra y física con respuestas, el tiempo por pregunta y los line scores de GS.',
    h1: 'Ciencia General: práctica de preguntas de ciencias del ASVAB',
    intro: 'Diez preguntas de ciencias en dos series de cinco: células y sangre, símbolos químicos y pH, planetas y atmósfera, fuerza y sonido. Preguntas breves que premian la memoria más que el razonamiento.',
    resume: `Ciencia General (GS, General Science) es la subprueba del ASVAB de conocimientos escolares de ciencias: ciencias de la vida, química, ciencias de la Tierra y del espacio, y física básica. Las preguntas son breves y la mayoría se responde en segundos si se conoce el dato. La versión por computadora da ${c[0]} preguntas en ${c[1]} minutos, unos ${sec(c)} segundos cada una, y la versión en papel ${p[0]} preguntas en ${p[1]} minutos, unos ${sec(p)} segundos cada una. GS no forma parte del AFQT, así que no decide si usted puede alistarse. Cuenta para los empleos: forma parte del área Eléctrica de la Fuerza Aérea (${fmt(E.MAGE_PARTS.E)}) y del line score EL de los Marines (${E.MARINE_PARTS.EL.join(' + ')}). Para un aspirante con AR ${x0.AR}, MK ${x0.MK} y EI ${x0.EI}, subir GS de ${x0.GS} a ${x1.GS} eleva el percentil Eléctrico de ${e0} a ${e1} y el EL de los Marines de ${el0} a ${el1}, sin cambiar el AFQT. Las diez preguntas las escribe Radif Partners, no vienen del ASVAB, y un porcentaje de aciertos no es un puntaje estándar.`,
    faqs: [
      { q: '¿Ciencia General afecta mi puntaje AFQT?', a: 'No. El AFQT usa solo Razonamiento Aritmético, Conocimientos Matemáticos, Conocimiento de Palabras y Comprensión de Lectura. Ciencia General importa para calificar en un empleo: forma parte del área Eléctrica de la Fuerza Aérea y del line score de electrónica de los Marines, y el Ejército la usa en varios de sus compuestos. Si solo busca el mínimo de una rama, estudie primero las subpruebas del AFQT.' },
      { q: '¿Qué temas de ciencias aparecen más en la subprueba de Ciencia General?', a: 'La subprueba se basa en las ciencias de la escuela media y secundaria: células y sistemas del cuerpo, plantas, la tabla periódica y química sencilla como el pH, el sistema solar, el clima y las capas de la atmósfera, y física básica como fuerza, energía y sonido. Las preguntas piden datos y relaciones simples, no métodos de laboratorio ni cálculos largos.' },
      { q: '¿Qué tan rápido hay que responder en Ciencia General?', a: `En la versión por computadora, unos ${sec(c)} segundos por pregunta; en papel, unos ${sec(p)} segundos. Los dos tiempos son cortos, porque una pregunta de GS se sabe o no se sabe. Practique el recuerdo rápido más que el razonamiento largo, y cuando no sepa una pregunta, descarte las opciones que rompen una regla que sí conoce, elija y siga.` },
    ],
    body: (h) => `<h2>Qué cubre Ciencia General</h2>
<p>Las diez preguntas de esta página recorren las cuatro áreas de la subprueba. Ciencias de la vida: el orgánulo que libera energía en la célula, los vasos que llevan la sangre desde el corazón, la fotosíntesis. Química: el símbolo del sodio y el significado de un pH de 3. Tierra y espacio: el planeta más cercano al Sol, la capa que contiene la mayor parte del ozono, el gas que forma la mayor parte del aire. Física: la fuerza sobre un carrito que acelera y el material en el que el sonido viaja más rápido. Los enunciados están en inglés, como en el examen real, con la traducción debajo; muchos términos científicos son cognados (photosynthesis, mitochondrion, stratosphere), lo que ayuda a quien estudió ciencias en español. El examen se queda en la ciencia escolar, como muestran las ${h.src('oa-samples', 'preguntas de ejemplo de Official ASVAB')}.</p>
${h.mini('quiz', { t: 'Cinco preguntas más de ciencias', p: ['q1', 'q2', 'q3', 'q4', 'q5'], d: { s: 'GS', k: 1 } })}
<h2>Una subprueba rápida</h2>
<p>La ${h.src('oa-factsheet', 'hoja informativa de Official ASVAB')} da ${h.n(c[0])} preguntas de GS en ${h.n(c[1])} minutos en el examen por computadora y ${h.n(p[0])} en ${h.n(p[1])} minutos en papel: unos ${h.n(sec(c))} y ${h.n(sec(p))} segundos por pregunta. Ese ritmo no deja razonar desde cero. Incluso el único cálculo de física de esta página, fuerza igual a masa por aceleración, es una sola multiplicación si conoce la fórmula: un carrito de 10 kilogramos a 3 metros por segundo al cuadrado recibe 30 newtons. El tiempo se va en recordar, así que un repaso corto y diario rinde más que sesiones largas.</p>
<h2>Trampas y trucos para recordar</h2>
<ul>
<li><strong>Arterias y venas.</strong> En inglés, arteries llevan la sangre Away, lejos del corazón: las dos palabras empiezan por A. Las venas la devuelven. Los capilares unen ambas.</li>
<li><strong>Símbolos que vienen del latín.</strong> El sodio es Na (natrium), el potasio K, el hierro Fe, el oro Au, la plata Ag, el plomo Pb. S es azufre, no sodio. Son opciones equivocadas clásicas.</li>
<li><strong>El sentido del pH.</strong> Por debajo de 7 es ácido, 7 es neutro y por encima de 7 es básico. Más bajo significa más ácido, lo que a muchos les parece al revés.</li>
<li><strong>Capas de la atmósfera.</strong> El clima ocurre en la troposfera, la capa más baja; la mayor parte del ozono está encima, en la estratosfera.</li>
<li><strong>Sonido y luz.</strong> El sonido necesita un medio y viaja más rápido en sólidos como el acero que en el agua o el aire; la luz viaja más rápido en el vacío. Las opciones mezclan las dos a propósito.</li>
<li><strong>Masa y peso.</strong> La masa se mide en kilogramos y no cambia en la Luna; el peso es una fuerza, en newtons, y sí cambia.</li>
</ul>
<h2>Qué puntajes mueve GS</h2>
<p>GS entra en ${mageUse.length} de las cuatro áreas de la Fuerza Aérea, la Eléctrica, y en ${marUse.length} line score de los Marines, el EL, ambos construidos con las fórmulas del ${h.src('segall', 'informe de la escala de 1997')}. Tome a un aspirante que quiere un empleo de electrónica, con AR ${x0.AR}, MK ${x0.MK}, EI ${x0.EI} y VE ${x0.VE}: su AFQT es ${af}, bien por encima de los pisos. Con GS ${x0.GS}, el percentil Eléctrico es ${e0} y el EL de los Marines ${el0}. Con GS ${x1.GS}, pasan a ${e1} y ${el1}, mientras el AFQT sigue en ${af}. Un puntaje estándar de 60 lo sitúa más o menos en el ${share60} % superior de la muestra juvenil de 1997, y unos pocos puntos de GS pueden decidir una especialidad técnica. El ${h.a('air-force-jobs', 'buscador de empleos de la Fuerza Aérea')} muestra qué carreras piden un mínimo Eléctrico y la ${h.a('line-scores', 'calculadora de line scores')} muestra todos los compuestos a la vez.</p>
<h2>Cómo estudiar Ciencia General</h2>
<p>Use un libro de repaso de ciencias de secundaria o materiales escolares gratuitos y haga una hoja por área: los sistemas del cuerpo y su función, los primeros veinte elementos con sus símbolos, los planetas en orden y las capas de la atmósfera, y las fórmulas básicas de física para fuerza, trabajo, velocidad y densidad. Escriba cada término en inglés junto a su equivalente en español. Convierta cada hoja en preguntas y respóndalas en voz alta. Como GS e Información Electrónica comparten el área Eléctrica, siga con la página de ${h.a('electronics-information', 'Información Electrónica')} y revise las demás subpruebas con el ${h.a('practice-test', 'examen de práctica')}.</p>`,
  },
});
