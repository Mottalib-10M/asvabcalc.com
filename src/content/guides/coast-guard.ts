import { defineGuide } from '../../lib/page-types';
import type { Helpers } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const E = K.E;
const CG = E.minimumFor('coastguard', 'hs')!, sCG = E.sumForPercentile(CG)!;
const ARMY = E.minimumFor('army', 'hs')!, sArmy = E.sumForPercentile(ARMY)!;
/** Candidat juste sous le seuil : AR 45, MK 46, VE 46. */
const ana = { AR: 45, MK: 46, VE: 46 }, anaSum = E.afqtSum(ana), anaP = E.afqt(ana);
const anaUp = E.afqt({ ...ana, VE: ana.VE + 1 });
const GED = E.minimumFor('airforce', 'ged')!, C3A = Number(K.P.categories.find((c) => c[0] === 'IIIA')![1]);
/** Candidat plus loin : AR 41, MK 43, VE 45. */
const ben = { AR: 41, MK: 43, VE: 45 }, benSum = E.afqtSum(ben), benP = E.afqt(ben), benGap = sCG - benSum;
const NAMES: Record<string, [string, string]> = { army: ['Army', 'Ejército'], airforce: ['Air Force', 'Fuerza Aérea'], marines: ['Marine Corps', 'Marines'], coastguard: ['Coast Guard', 'Guardia Costera'] };

function floors(h: Helpers) {
  const rows = (['coastguard', 'army', 'airforce', 'marines'] as const).map((b) => {
    const m = E.minimumFor(b, 'hs')!;
    return [h.L(NAMES[b][0], NAMES[b][1]), m, E.sumForPercentile(m)!, anaP >= m ? h.L('meets it', 'lo cumple') : h.L(`${E.sumForPercentile(m)! - anaSum} point of sum short`, `le falta ${E.sumForPercentile(m)! - anaSum} punto de suma`)];
  });
  return h.table([h.L('Branch', 'Rama'), h.L('Minimum AFQT (diploma)', 'AFQT mínimo (diploma)'), h.L('Sum AR + MK + 2VE needed', 'Suma AR + MK + 2VE necesaria'), h.L(`Candidate with a sum of ${anaSum}`, `Aspirante con suma ${anaSum}`)], rows,
    h.L('Minimums read on each recruiting site; sums from table 2.5 of the 1997 score scale report.', 'Mínimos leídos en cada sitio de reclutamiento; sumas según la tabla 2.5 del informe de la escala de 1997.'), ['l', 'r', 'r', 'l']);
}

export default defineGuide({
  id: 'coast-guard', group: 'branches', order: 17,
  tool: 'eligibility', toolArg: { b: 'coastguard', p: 35 },
  related: ['minimum-score', 'afqt-calculator', 'army', 'retest', 'afqt-categories'],
  sources: ['coastguard', 'segall', 'oa-eligibility'],
  en: {
    slug: 'coast-guard-asvab-score', nav: 'Coast Guard', card: `The AFQT of ${CG} the Coast Guard asks for, and what it means`,
    title: `Coast Guard ASVAB Score 2026: Minimum ${CG} and a Good Score`,
    description: `Coast Guard ASVAB score in 2026: an AFQT of ${CG} to enlist, one point above the Army, Air Force and Marines, the sum it takes and the rule for officer programs.`,
    h1: `Coast Guard ASVAB score: the minimum AFQT of ${CG} and a good score`,
    intro: `The Coast Guard asks for an AFQT of ${CG} to enlist. That single point above the floor of most branches is small on paper, but it can decide a file.`,
    resume: `The Coast Guard requires an AFQT of ${CG} or higher to enlist, according to its recruiting site, gocoastguard.com. That is one point above the ${ARMY} asked by the Army, the Air Force and the Marine Corps for applicants with a diploma. On the 1997 conversion table, an AFQT of ${CG} needs a sum AR + MK + 2VE of ${sCG}, against ${sArmy} for an AFQT of ${ARMY}: one point of sum separates the two. A candidate with AR ${ana.AR}, MK ${ana.MK} and VE ${ana.VE} has a sum of ${anaSum} and an AFQT of ${anaP}: enough for the Army, not for the Coast Guard. One more point of VE would bring the AFQT to ${anaUp}. The Coast Guard site gives no separate figure for GED holders, so this page does not invent one. Officer programs follow other test requirements, which are not the ASVAB minimum. Above the floor, a higher AFQT brings you into Category IIIA from ${C3A}, the level where branches may offer incentives.`,
    faqs: [
      { q: 'What ASVAB score does the Coast Guard require?', a: `An AFQT of ${CG} or more, as stated on gocoastguard.com when this site checked it. The AFQT is the percentile computed from Arithmetic Reasoning, Mathematics Knowledge and twice Verbal Expression. Meeting it makes you eligible on the test side; which job, called a rating, you can train for is a separate question the recruiter answers from your full score sheet.` },
      { q: 'Why is the Coast Guard minimum one point higher than the Army?', a: `The Coast Guard sets its own standard, and the recruiting site gives ${CG} without explaining the choice. In practice the gap is tiny: on the 1997 table, ${ARMY} needs a sum of ${sArmy} and ${CG} needs ${sCG}. A candidate who sits exactly on the Army floor needs one more point of sum, which one more point of AR or MK provides, while one more point of VE adds two.` },
      { q: 'Is the Coast Guard ASVAB minimum different with a GED?', a: `The Coast Guard page read for this site states ${CG} without a separate GED figure, so none is printed here. Other branches do publish one: the Air Force and the Marine Corps ask for ${GED} with a GED. If you hold a GED, ask the Coast Guard recruiter whether another requirement applies to your file before you plan around the figure of ${CG}.` },
      { q: 'Do Coast Guard officers need an ASVAB score?', a: 'Officer programs follow other test requirements, as the Coast Guard recruiting site notes, and the enlisted minimum does not describe them. A candidate aiming at an officer program should read the requirements of that program directly. The AFQT figure on this page concerns enlisted applicants only.' },
      { q: 'What is a good ASVAB score for the Coast Guard?', a: `Any AFQT of ${CG} or more clears the floor, and that is the first test of a good score. The next level that changes something is ${C3A}, the start of Category IIIA, which Official ASVAB links to possible enlistment incentives; it takes a sum AR + MK + 2VE of ${E.sumForPercentile(C3A)}. Beyond that, a good score is the one the rating you want requires, which your recruiter reads from the full score sheet.` },
    ],
    body: (h) => `<h2>The figure and where it comes from</h2>
<p>The ${h.src('coastguard', 'Coast Guard recruiting site')} gives an AFQT of ${CG} as the minimum to enlist. It is the highest published floor among the branches that print one, by a single point. The AFQT is the same percentile in every branch: it comes from AR + MK + 2VE, read in table 2.5 of the ${h.src('segall', '1997 score scale report')}, so a score of ${CG} earned for one branch is a score of ${CG} for all of them. The ${h.a('minimum-score', 'minimum score page')} compares every branch.</p>
${floors(h)}
<h2>One point of sum, in practice</h2>
<p>The candidate in the table, with AR ${ana.AR}, MK ${ana.MK} and VE ${ana.VE}, sits exactly on the line of most branches and just under the Coast Guard. One point of sum is the smallest possible gap, and it can come from any of the three subtests. Because VE counts twice, one more point of VE adds two to the sum and lifts the AFQT to ${anaUp}. One more point of AR or MK would do the job too, adding one point of sum. The tool below shows the gap for your own scores.</p>
${h.mini('target', { t: `Points missing to reach ${CG}`, p: ['t', 'ar', 'mk', 've'], d: { t: String(CG), ar: ana.AR, mk: ana.MK, ve: ana.VE } })}
<p>A small gap is not a reason to rush. A retest can only be taken after one calendar month, and the ${h.a('retest', 'retest page')} explains the full sequence. A candidate near the line gains from a few weeks of vocabulary and reading work, since that is where one point of study weighs double.</p>
<h2>When the gap is larger</h2>
<p>Not every candidate is one point away. Take a second applicant with AR ${ben.AR}, MK ${ben.MK} and VE ${ben.VE}: the sum is ${benSum} and the AFQT ${benP}, in Category IV. Reaching ${CG} takes ${benGap} more points of sum. Spread over the three subtests, that could be ${Math.ceil(benGap / 2)} points of VE alone, or ${benGap} points of AR alone, or a mix such as two points of AR and ${Math.ceil((benGap - 2) / 2)} of VE. Each standard score point is a tenth of a standard deviation of the 1997 youth sample, so a gain of that size is a real study project, not a matter of luck on test day.</p>
<p>The calculator at the top of the page starts from an AFQT of 35 and shows the branches whose published minimum that score meets. Type your own percentile to see the same comparison, and switch the education field to GED to see which branches publish a separate figure. The Navy and the Space Force appear without a number, for the reasons explained on their pages: the Navy figure could not be read at the source, and the Space Force asks for a qualifying score without printing one.</p>
<h2>Above the minimum</h2>
<p>Meeting ${CG} opens the door; it does not choose the job. Job placement depends on rules beyond the AFQT, which the recruiter checks against your full sheet. A higher AFQT also moves you up the categories described on the ${h.a('afqt-categories', 'categories page')}: Category IIIA starts at ${C3A}, and the ${h.src('oa-eligibility', 'Official ASVAB eligibility page')} notes that applicants in Category IIIA or higher may qualify for enlistment incentives. For the AFQT itself, the ${h.a('afqt-calculator', 'AFQT calculator')} reads any sum.</p>
<h2>What this page does not cover</h2>
<p>Officer programs follow other test requirements, so the enlisted minimum does not apply to them. The Coast Guard site gives no separate GED figure, and this page does not fill the gap with a guess. Age, health, citizenship and background rules are part of every application but are outside the ASVAB and outside this site. For a comparison with a branch that publishes a whole system of line scores, the ${h.a('army', 'Army page')} explains how the Army reads the same subtests.</p>`,
  },
  es: {
    slug: 'asvab-guardia-costera', nav: 'Guardia Costera', card: `El AFQT de ${CG} que pide la Guardia Costera y lo que significa`,
    title: `ASVAB para la Guardia Costera 2026: mínimo ${CG} y buen puntaje`,
    description: `ASVAB de la Guardia Costera en 2026: un AFQT de ${CG} para alistarse, un punto más que el Ejército, la Fuerza Aérea y los Marines, y la suma que hace falta.`,
    h1: `ASVAB para la Guardia Costera: el AFQT mínimo de ${CG} y un buen puntaje`,
    intro: `La Guardia Costera pide un AFQT de ${CG} para alistarse. Ese único punto por encima del piso de casi todas las ramas parece poco, pero puede decidir un expediente.`,
    resume: `La Guardia Costera exige un AFQT de ${CG} o más para alistarse, según su sitio de reclutamiento, gocoastguard.com. Es un punto más que los ${ARMY} que piden el Ejército, la Fuerza Aérea y los Marines a quien tiene diploma. En la tabla de conversión de 1997, un AFQT de ${CG} necesita una suma AR + MK + 2VE de ${sCG}, frente a ${sArmy} para un AFQT de ${ARMY}: un punto de suma separa a los dos. Un aspirante con AR ${ana.AR}, MK ${ana.MK} y VE ${ana.VE} tiene una suma de ${anaSum} y un AFQT de ${anaP}: suficiente para el Ejército, no para la Guardia Costera. Un punto más de VE llevaría el AFQT a ${anaUp}. El sitio de la Guardia Costera no da una cifra aparte para quien tiene un GED, así que esta página no inventa ninguna. Los programas de oficiales siguen otros requisitos de examen, distintos del mínimo del ASVAB. Por encima del piso, un AFQT más alto lo lleva a la categoría IIIA desde ${C3A}, el nivel en que las ramas pueden ofrecer incentivos.`,
    faqs: [
      { q: '¿Qué puntaje del ASVAB exige la Guardia Costera?', a: `Un AFQT de ${CG} o más, según gocoastguard.com en la fecha en que este sitio lo comprobó. El AFQT es el percentil que se calcula con Razonamiento Aritmético, Conocimientos Matemáticos y dos veces Expresión Verbal. Cumplirlo lo hace elegible en cuanto al examen; a qué empleo, llamado rating, puede optar es otra pregunta que el reclutador responde con su hoja completa.` },
      { q: '¿Por qué el mínimo de la Guardia Costera es un punto más alto que el del Ejército?', a: `La Guardia Costera fija su propia norma, y su sitio de reclutamiento da ${CG} sin explicar la elección. En la práctica la diferencia es mínima: en la tabla de 1997, ${ARMY} necesita una suma de ${sArmy} y ${CG} necesita ${sCG}. Quien está justo en el piso del Ejército necesita un punto más de suma, que da un punto más de AR o de MK, mientras que un punto más de VE suma dos.` },
      { q: '¿Cambia el mínimo de la Guardia Costera con un GED?', a: `La página de la Guardia Costera leída para este sitio da ${CG} sin una cifra aparte para el GED, así que aquí no se imprime ninguna. Otras ramas sí la publican: la Fuerza Aérea y los Marines piden ${GED} con GED. Si tiene un GED, pregunte al reclutador de la Guardia Costera si se aplica otro requisito a su expediente antes de planear con la cifra de ${CG}.` },
      { q: '¿Los oficiales de la Guardia Costera necesitan un puntaje del ASVAB?', a: 'Los programas de oficiales siguen otros requisitos de examen, como indica el sitio de reclutamiento de la Guardia Costera, y el mínimo para alistados no los describe. Quien apunta a un programa de oficiales debe leer directamente los requisitos de ese programa. La cifra de AFQT de esta página se refiere solo a los aspirantes alistados.' },
      { q: '¿Qué es un buen puntaje del ASVAB para la Guardia Costera?', a: `Cualquier AFQT de ${CG} o más supera el piso, y esa es la primera condición de un buen puntaje. El siguiente nivel que cambia algo es ${C3A}, el inicio de la categoría IIIA, que Official ASVAB asocia con posibles incentivos de alistamiento; exige una suma AR + MK + 2VE de ${E.sumForPercentile(C3A)}. Más allá, un buen puntaje es el que pide el rating que usted quiere, y su reclutador lo lee en la hoja completa.` },
    ],
    body: (h) => `<h2>La cifra y su origen</h2>
<p>El ${h.src('coastguard', 'sitio de reclutamiento de la Guardia Costera')} da un AFQT de ${CG} como mínimo para alistarse. Es el piso publicado más alto entre las ramas que publican uno, por un solo punto. El AFQT es el mismo percentil en todas las ramas: sale de AR + MK + 2VE, leído en la tabla 2.5 del ${h.src('segall', 'informe de la escala de 1997')}, así que un ${CG} obtenido para una rama vale ${CG} para todas. La página del ${h.a('minimum-score', 'puntaje mínimo')} compara todas las ramas.</p>
${floors(h)}
<h2>Un punto de suma, en la práctica</h2>
<p>El aspirante de la tabla, con AR ${ana.AR}, MK ${ana.MK} y VE ${ana.VE}, está justo en la línea de la mayoría de las ramas y justo por debajo de la Guardia Costera. Un punto de suma es la menor distancia posible, y puede venir de cualquiera de las tres subpruebas. Como VE cuenta doble, un punto más de VE suma dos y sube el AFQT a ${anaUp}. Un punto más de AR o de MK también bastaría, sumando un punto. La herramienta de abajo muestra la distancia con sus propios puntajes.</p>
${h.mini('target', { t: `Puntos que faltan para llegar a ${CG}`, p: ['t', 'ar', 'mk', 've'], d: { t: String(CG), ar: ana.AR, mk: ana.MK, ve: ana.VE } })}
<p>Una distancia pequeña no es razón para apresurarse. Solo se puede repetir el examen después de un mes calendario, y la página de ${h.a('retest', 'repetir el ASVAB')} explica toda la secuencia. Quien está cerca de la línea gana con unas semanas de vocabulario y lectura, porque ahí un punto de estudio pesa doble.</p>
<h2>Cuando la distancia es mayor</h2>
<p>No todos los aspirantes están a un punto. Tome a un segundo aspirante con AR ${ben.AR}, MK ${ben.MK} y VE ${ben.VE}: la suma es ${benSum} y el AFQT ${benP}, en la categoría IV. Llegar a ${CG} exige ${benGap} puntos más de suma. Repartidos entre las tres subpruebas, pueden ser ${Math.ceil(benGap / 2)} puntos de VE solo, o ${benGap} puntos de AR solo, o una mezcla como dos puntos de AR y ${Math.ceil((benGap - 2) / 2)} de VE. Cada punto estándar es una décima de desviación típica de la muestra juvenil de 1997, así que una subida de ese tamaño es un verdadero proyecto de estudio, no una cuestión de suerte el día del examen.</p>
<p>La calculadora de arriba parte de un AFQT de 35 y muestra las ramas cuyo mínimo publicado cumple ese puntaje. Escriba su propio percentil para ver la misma comparación, y cambie el campo de estudios a GED para ver qué ramas publican una cifra aparte. La Armada y la Fuerza Espacial aparecen sin número, por las razones que explican sus páginas: la cifra de la Armada no pudo leerse en la fuente, y la Fuerza Espacial pide un puntaje que califique sin publicar uno.</p>
<h2>Por encima del mínimo</h2>
<p>Cumplir ${CG} abre la puerta, pero no elige el empleo. La asignación del empleo depende de reglas que van más allá del AFQT, y el reclutador las revisa con su hoja completa. Un AFQT más alto también lo hace subir en las categorías que describe la página de ${h.a('afqt-categories', 'categorías')}: la categoría IIIA empieza en ${C3A}, y la ${h.src('oa-eligibility', 'página de elegibilidad de Official ASVAB')} indica que los aspirantes en la categoría IIIA o superior pueden recibir incentivos de alistamiento. Para el AFQT en sí, la ${h.a('afqt-calculator', 'calculadora AFQT')} lee cualquier suma.</p>
<h2>Lo que esta página no cubre</h2>
<p>Los programas de oficiales siguen otros requisitos de examen, así que el mínimo para alistados no se les aplica. El sitio de la Guardia Costera no da una cifra aparte para el GED, y esta página no llena ese hueco con una suposición. La edad, la salud, la ciudadanía y los antecedentes forman parte de toda solicitud, pero quedan fuera del ASVAB y de este sitio. Para comparar con una rama que publica todo un sistema de line scores, la página del ${h.a('army', 'Ejército')} explica cómo lee el Ejército las mismas subpruebas.</p>`,
  },
});
