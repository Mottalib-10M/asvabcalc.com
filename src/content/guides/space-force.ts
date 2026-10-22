import { defineGuide } from '../../lib/page-types';
import type { Helpers } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const E = K.E, LAW = K.P.law520;
const NOTE = K.P.branches.spaceforce.note; // « qualifying ASVAB score, age 17 to 42 »
const AGE = (NOTE.match(/age (\d+) to (\d+)/) ?? ['', '17', '42']).slice(1, 3);
const catMin = (c: string) => Number(K.P.categories.find((x) => x[0] === c)![1]);
const C3A = catMin('IIIA'), C2 = catMin('II'), C1 = catMin('I');
/** Candidate d'exemple : AR 53, MK 52, VE 51. */
const sam = { AR: 53, MK: 52, VE: 51 }, samSum = E.afqtSum(sam), samP = E.afqt(sam);
const floorsHs = (['army', 'airforce', 'marines', 'coastguard'] as const).map((b) => E.minimumFor(b, 'hs')!);
const lo = Math.min(...floorsHs), hi = Math.max(...floorsHs);

function bands(h: Helpers) {
  const rows = (['I', 'II', 'IIIA', 'IIIB'] as const).map((c) => {
    const r = K.P.categories.find((x) => x[0] === c)!;
    return [c, `${r[1]} - ${r[2]}`, E.sumForPercentile(Number(r[1]))!];
  });
  return h.table([h.L('Category', 'Categoría'), h.L('AFQT percentiles', 'Percentiles AFQT'), h.L('Lowest sum AR + MK + 2VE', 'Suma AR + MK + 2VE más baja')], rows,
    h.L('Upper AFQT categories and the sum that opens each one, from the 1997 conversion table.', 'Categorías AFQT superiores y la suma que abre cada una, según la tabla de conversión de 1997.'), ['l', 'l', 'r']);
}

export default defineGuide({
  id: 'space-force', group: 'branches', order: 18,
  tool: 'eligibility', toolArg: { b: 'spaceforce', p: 55 },
  related: ['minimum-score', 'afqt-categories', 'good-asvab-score', 'air-force', 'study-plan'],
  sources: ['spaceforce', 'usc520', 'oa-eligibility', 'segall'],
  en: {
    slug: 'space-force-asvab-score', nav: 'Space Force', card: 'A “qualifying ASVAB score” with no number published',
    title: 'Space Force ASVAB Score 2026: What a Qualifying Score Means',
    description: 'Space Force ASVAB score in 2026: enlisted Guardians need a qualifying ASVAB score, with no number published. What is known, what is not and how to prepare.',
    h1: 'Space Force ASVAB score: what “qualifying” means',
    intro: 'The Space Force is the newest branch, and its recruiting site is brief on the ASVAB. This page sets out what it states, what it leaves open and how to aim in the meantime.',
    resume: `The Space Force recruiting page for enlisted Guardians asks for a “qualifying ASVAB score” and an age of ${AGE[0]} to ${AGE[1]}, but prints no AFQT figure. This site therefore publishes no Space Force minimum, and it does not borrow one from another branch or from the composite system of another service. Three things are still certain. The AFQT is computed the same way for every branch, from AR + MK + 2VE read in the 1997 table. Federal law, 10 U.S.C. § 520, requires an AFQT of ${LAW.nonGradMin} or more for anyone without a high school diploma and caps the share of Category IV recruits. And the branches that do publish a floor ask for ${lo} to ${hi} with a diploma. A candidate with AR ${sam.AR}, MK ${sam.MK} and VE ${sam.VE} has a sum of ${samSum} and an AFQT of ${samP}, in Category IIIA. Ask a Space Force recruiter for the current requirement, and read “qualifying” as a reason to aim well above the legal floor.`,
    faqs: [
      { q: 'What ASVAB score do I need for the Space Force?', a: `The Space Force site asks for a “qualifying ASVAB score” and does not print a number, so this site does not publish one. What is certain is the legal floor: under 10 U.S.C. § 520, a recruit without a high school diploma needs an AFQT of at least ${LAW.nonGradMin}. For the actual requirement, including any job-specific scores, ask a Space Force recruiter.` },
      { q: 'Does the Space Force use the same ASVAB as the other branches?', a: 'Yes. There is one ASVAB for all services, with the same subtests, the same standard scores and the same AFQT table. Your scores are not tied to a branch: a test taken while talking to another recruiter produces scores the Space Force recruiter can read too, as long as they are within their two years of validity.' },
      { q: 'Does the Space Force use Air Force job composites?', a: 'This site has not found an official Space Force source that says so, and it does not assume it. The Air Force publishes its own composites for Air Force jobs, but the Space Force recruiting page read for this site mentions only a qualifying ASVAB score. Ask the recruiter which scores the jobs you are interested in require.' },
      { q: 'How old can I be to enlist in the Space Force?', a: `The Space Force page for enlisted Guardians gives an age range of ${AGE[0]} to ${AGE[1]}, alongside the qualifying ASVAB score. Age is checked separately from the test, so a strong ASVAB result does not change the age range. Applicants near either end of the range should confirm their dates with a recruiter early.` },
    ],
    body: (h) => `<h2>What the Space Force states</h2>
<p>The ${h.src('spaceforce', 'Space Force page on enlisted Guardians')} lists among its requirements a “qualifying ASVAB score” and an age of ${AGE[0]} to ${AGE[1]}. It does not give the AFQT that qualifies. This site prints only figures read at an official source, so the calculator above shows “not published” for the Space Force and compares your AFQT with the branches that do publish a number. This is not a gap in the calculation; it is the honest state of the public information on the day of the check.</p>
<p>It would be easy to fill the gap with a guess, for example by assuming the Space Force reuses the composites of another service. This page does not do that. The Space Force is its own branch, and nothing in the source read for this site describes how it reads the subtests beyond the AFQT.</p>
<h2>What applies anyway</h2>
<p>Some rules do not depend on the branch. The ASVAB is one test for all services, and the AFQT is the same percentile everywhere: AR + MK + 2VE, converted with table 2.5 of the ${h.src('segall', '1997 score scale report')}. The ${h.src('usc520', 'text of 10 U.S.C. § 520')} requires an AFQT of ${LAW.nonGradMin} or more for a person without a high school diploma and caps the share of recruits in Category IV, the band from 10 to 30. For context only, the branches that print a minimum ask for ${lo} to ${hi} with a diploma; the ${h.a('minimum-score', 'minimum score page')} lists them.</p>
<h2>Reading the calculator above</h2>
<p>The calculator opens on an AFQT of 55. With that score it shows the Space Force line as “not published” and lists the four branches with a printed floor, all of which the score meets. Type your own percentile to update the table; switch the education field to GED to see the branches that print a separate figure for GED holders. The result is a comparison with public figures, not a decision. The Space Force recruiter may also look at scores other than the AFQT for specific jobs, which no calculator on this site can reproduce for this branch.</p>
<h2>Aiming above the floor</h2>
<p>When a branch asks for a “qualifying” score without a number, the safest plan is to aim for the upper categories. The ${h.src('oa-eligibility', 'Official ASVAB eligibility page')} notes that applicants in Category IIIA or higher may qualify for enlistment incentives, which shows what the services value. The table gives the sum that opens each upper category.</p>
${bands(h)}
<p>The candidate in the example, with AR ${sam.AR}, MK ${sam.MK} and VE ${sam.VE}, reaches a sum of ${samSum} and an AFQT of ${samP}, inside Category IIIA, which starts at ${C3A}. Category II starts at ${C2} and Category I at ${C1}. The tool below gives the category and the range of any percentile you type.</p>
${h.mini('category', { t: 'Category of an AFQT percentile', p: ['p'], d: { p: samP } })}
<h2>How to prepare without a published number</h2>
<p>Start with the parts you control. Measure your level with the ${h.a('practice-test', 'practice test')}, then work on the subtests that weigh most: Verbal Expression counts twice in the AFQT, and the ${h.a('study-plan', 'study plan page')} shows what three more points on each subtest are worth. Bring your score sheet to the recruiter and ask two direct questions: which AFQT qualifies today, and which other scores the jobs you want require. Write the answers down with the date, since requirements can change from one year to the next. If you are also talking to the Air Force, its own published requirements are on the ${h.a('air-force', 'Air Force page')}, but treat them as Air Force rules, not as Space Force rules. For a general sense of where your score stands, the ${h.a('good-asvab-score', 'good ASVAB score page')} places any AFQT against the categories and the published floors.</p>`,
  },
  es: {
    slug: 'asvab-fuerza-espacial', nav: 'Fuerza Espacial', card: 'Un “puntaje que califique” sin número publicado',
    title: 'ASVAB para la Fuerza Espacial 2026: el puntaje que califica',
    description: 'ASVAB para la Fuerza Espacial en 2026: los Guardians alistados necesitan un puntaje que califique, sin número publicado. Lo que se sabe y cómo prepararse.',
    h1: 'ASVAB para la Fuerza Espacial: qué significa “que califique”',
    intro: 'La Fuerza Espacial es la rama más nueva, y su sitio de reclutamiento dice poco del ASVAB. Esta página expone lo que afirma, lo que deja abierto y cómo apuntar mientras tanto.',
    resume: `La página de reclutamiento de la Fuerza Espacial para Guardians alistados pide un “puntaje del ASVAB que califique” y una edad de ${AGE[0]} a ${AGE[1]} años, pero no da ninguna cifra de AFQT. Por eso este sitio no publica un mínimo para la Fuerza Espacial, ni toma prestado el de otra rama o el sistema de compuestos de otro servicio. Tres cosas sí son seguras. El AFQT se calcula igual para todas las ramas, con AR + MK + 2VE leído en la tabla de 1997. La ley federal, 10 U.S.C. § 520, exige un AFQT de ${LAW.nonGradMin} o más a quien no tiene diploma de secundaria y limita la parte de reclutas en la categoría IV. Y las ramas que sí publican un piso piden de ${lo} a ${hi} con diploma. Un aspirante con AR ${sam.AR}, MK ${sam.MK} y VE ${sam.VE} tiene una suma de ${samSum} y un AFQT de ${samP}, en la categoría IIIA. Pregunte el requisito vigente a un reclutador de la Fuerza Espacial, y lea “que califique” como una razón para apuntar bien por encima del piso legal.`,
    faqs: [
      { q: '¿Qué puntaje del ASVAB necesito para la Fuerza Espacial?', a: `El sitio de la Fuerza Espacial pide un “puntaje del ASVAB que califique” y no da un número, así que este sitio no publica uno. Lo seguro es el piso legal: según 10 U.S.C. § 520, un recluta sin diploma de secundaria necesita un AFQT de al menos ${LAW.nonGradMin}. Para el requisito real, incluidos los puntajes que pida cada empleo, pregunte a un reclutador de la Fuerza Espacial.` },
      { q: '¿La Fuerza Espacial usa el mismo ASVAB que las demás ramas?', a: 'Sí. Hay un solo ASVAB para todos los servicios, con las mismas subpruebas, los mismos puntajes estándar y la misma tabla AFQT. Sus puntajes no pertenecen a una rama: un examen hecho mientras hablaba con otro reclutador da puntajes que el reclutador de la Fuerza Espacial también puede leer, siempre que estén dentro de sus dos años de validez.' },
      { q: '¿La Fuerza Espacial usa los compuestos de empleo de la Fuerza Aérea?', a: 'Este sitio no ha encontrado una fuente oficial de la Fuerza Espacial que lo diga, y no lo da por hecho. La Fuerza Aérea publica sus propios compuestos para sus empleos, pero la página de reclutamiento de la Fuerza Espacial leída para este sitio solo menciona un puntaje del ASVAB que califique. Pregunte al reclutador qué puntajes exigen los empleos que le interesan.' },
      { q: '¿Hasta qué edad se puede entrar en la Fuerza Espacial?', a: `La página de la Fuerza Espacial para Guardians alistados da un rango de edad de ${AGE[0]} a ${AGE[1]} años, junto al puntaje del ASVAB que califique. La edad se comprueba aparte del examen, así que un buen resultado en el ASVAB no cambia ese rango. Quien está cerca de uno de los extremos debe confirmar sus fechas pronto con un reclutador.` },
    ],
    body: (h) => `<h2>Lo que dice la Fuerza Espacial</h2>
<p>La ${h.src('spaceforce', 'página de la Fuerza Espacial sobre los Guardians alistados')} incluye entre sus requisitos un “puntaje del ASVAB que califique” y una edad de ${AGE[0]} a ${AGE[1]} años. No dice qué AFQT califica. Este sitio solo imprime cifras leídas en una fuente oficial, así que la calculadora de arriba muestra “no publicado” para la Fuerza Espacial y compara su AFQT con las ramas que sí publican un número. No es un hueco del cálculo; es el estado honesto de la información pública el día de la verificación.</p>
<p>Sería fácil llenar ese hueco con una suposición, por ejemplo suponiendo que la Fuerza Espacial reutiliza los compuestos de otro servicio. Esta página no lo hace. La Fuerza Espacial es una rama propia, y nada en la fuente leída para este sitio describe cómo lee las subpruebas más allá del AFQT.</p>
<h2>Lo que se aplica de todos modos</h2>
<p>Algunas reglas no dependen de la rama. El ASVAB es un solo examen para todos los servicios, y el AFQT es el mismo percentil en todas partes: AR + MK + 2VE, convertido con la tabla 2.5 del ${h.src('segall', 'informe de la escala de 1997')}. El ${h.src('usc520', 'texto de 10 U.S.C. § 520')} exige un AFQT de ${LAW.nonGradMin} o más a quien no tiene diploma de secundaria y limita la parte de reclutas en la categoría IV, la franja de 10 a 30. Solo como referencia, las ramas que publican un mínimo piden de ${lo} a ${hi} con diploma; la página del ${h.a('minimum-score', 'puntaje mínimo')} las enumera.</p>
<h2>Cómo leer la calculadora de arriba</h2>
<p>La calculadora se abre con un AFQT de 55. Con ese puntaje muestra la línea de la Fuerza Espacial como “no publicado” y enumera las cuatro ramas con un piso impreso, que ese puntaje cumple en todos los casos. Escriba su propio percentil para actualizar la tabla; cambie el campo de estudios a GED para ver las ramas que publican una cifra aparte para quien tiene un GED. El resultado es una comparación con cifras públicas, no una decisión. El reclutador de la Fuerza Espacial puede mirar también otros puntajes además del AFQT para ciertos empleos, algo que ninguna calculadora de este sitio puede reproducir para esta rama.</p>
<h2>Apuntar por encima del piso</h2>
<p>Cuando una rama pide un puntaje “que califique” sin número, el plan más seguro es apuntar a las categorías altas. La ${h.src('oa-eligibility', 'página de elegibilidad de Official ASVAB')} indica que los aspirantes en la categoría IIIA o superior pueden recibir incentivos de alistamiento, lo que muestra lo que valoran los servicios. La tabla da la suma que abre cada categoría alta.</p>
${bands(h)}
<p>El aspirante del ejemplo, con AR ${sam.AR}, MK ${sam.MK} y VE ${sam.VE}, llega a una suma de ${samSum} y un AFQT de ${samP}, dentro de la categoría IIIA, que empieza en ${C3A}. La categoría II empieza en ${C2} y la I en ${C1}. La herramienta de abajo da la categoría y el rango de cualquier percentil que escriba.</p>
${h.mini('category', { t: 'Categoría de un percentil AFQT', p: ['p'], d: { p: samP } })}
<h2>Cómo prepararse sin un número publicado</h2>
<p>Empiece por lo que controla. Mida su nivel con el ${h.a('practice-test', 'examen de práctica')} y trabaje las subpruebas que más pesan: Expresión Verbal cuenta doble en el AFQT, y la página del ${h.a('study-plan', 'plan de estudio')} muestra cuánto valen tres puntos más en cada subprueba. Lleve su hoja de puntajes al reclutador y hágale dos preguntas directas: qué AFQT califica hoy y qué otros puntajes exigen los empleos que le interesan. Si también habla con la Fuerza Aérea, sus requisitos publicados están en la página de la ${h.a('air-force', 'Fuerza Aérea')}, pero tómelos como reglas de la Fuerza Aérea, no de la Fuerza Espacial. Para una idea general de dónde queda su puntaje, la página de ${h.a('good-asvab-score', 'buen puntaje del ASVAB')} sitúa cualquier AFQT frente a las categorías y los pisos publicados.</p>`,
  },
});
