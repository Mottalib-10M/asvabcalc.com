import { defineGuide } from '../../lib/page-types';
import type { Helpers } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const E = K.E, CATS = K.P.categories as Array<[string, number, number]>;

function bands(h: Helpers) {
  const rows = CATS.map(([c, lo, hi]) => [c, `${lo} - ${hi}`, `${E.sumForPercentile(lo)}${hi < 99 ? ` - ${E.sumForPercentile(hi + 1)! - 1}` : h.L(' or more', ' o más')}`]);
  return h.table([h.L('Category', 'Categoría'), h.L('AFQT percentiles', 'Percentiles AFQT'), h.L('Sum AR + MK + 2VE', 'Suma AR + MK + 2VE')], rows,
    h.L('Categories from Official ASVAB; sums read in the 1997 conversion table.', 'Categorías de Official ASVAB; sumas leídas en la tabla de conversión de 1997.'), ['l', 'r', 'r']);
}

export default defineGuide({
  id: 'afqt-categories', group: 'scores', order: 4,
  tool: 'category',
  related: ['afqt-calculator', 'good-asvab-score', 'minimum-score', 'ged'],
  sources: ['oa-eligibility', 'oa-scores', 'usc520', 'segall'],
  en: {
    slug: 'afqt-categories', nav: 'AFQT categories', card: 'Bands I to V and what each one allows',
    title: 'AFQT Categories 2026: Bands I to V and What They Allow',
    description: 'AFQT categories in 2026: percentile ranges of bands I to V, the sums of standard scores behind them, incentives from IIIA and the legal cap on Category IV.',
    h1: 'AFQT categories: from Category I to Category V',
    intro: 'Type an AFQT percentile to see its category, whether it reaches the incentive bands and whether it falls in Category IV, which the law caps.',
    resume: `The services group AFQT percentiles into eight bands. Category I covers 93 to 99, Category II 65 to 92, Category IIIA 50 to 64, Category IIIB 31 to 49, Category IVA 21 to 30, Category IVB 16 to 20, Category IVC 10 to 15 and Category V 1 to 9. Official ASVAB states that applicants in Category IIIA or higher may qualify for enlistment incentives. At the other end, 10 U.S.C. § 520 caps active duty recruits from Category IV, the band from 10 to 30, at 4 percent a year, unless the Secretary of Defense raises the limit. The same law requires a score of at least 31, the bottom of Category IIIB, from anyone without a high school diploma. In sums of standard scores, IIIB starts at ${E.sumForPercentile(31)}, IIIA at ${E.sumForPercentile(50)}, II at ${E.sumForPercentile(65)} and I at ${E.sumForPercentile(93)}.`,
    faqs: [
      { q: 'What does Category IIIA mean for an enlistee?', a: 'Category IIIA covers AFQT percentiles from 50 to 64. It is the lowest band that Official ASVAB names as possibly qualifying for enlistment incentives, which is why recruiters often mention 50 as a target. It also clears the GED floor of the Air Force and the Marine Corps. It says nothing about which jobs are open: line scores decide that.' },
      { q: 'Can you enlist in Category IV?', a: 'It is possible but limited. Federal law caps the share of recruits in Category IV, the AFQT range from 10 to 30, and requires 31 or more from anyone without a high school diploma. Most branches publish a floor of 31 or 32, which excludes Category IV for their regular applicants. The Army mentions a preparatory course for applicants from 21.' },
      { q: 'Why are there two Category III bands?', a: 'Category III is wide, from 31 to 64, and the services treat its two halves differently. The upper half, IIIA from 50, can bring incentives; the lower half, IIIB from 31 to 49, meets most minimums but with fewer options. Splitting the band at the median makes that difference visible.' },
    ],
    body: (h) => `<h2>The eight bands</h2>
<p>The table gives each category with its AFQT range, as published by Official ASVAB on its ${h.src('oa-eligibility', 'enlistment eligibility page')}, and the range of sums of standard scores that produces it in the ${h.src('segall', '1997 conversion table')}. A category is only a label on the percentile: two applicants with the same AFQT always fall in the same band, whatever their subtests.</p>
${bands(h)}
<h2>What the law says about the low bands</h2>
<p>Section 520 of title 10 of the United States Code, read on ${h.src('usc520', 'the Cornell Legal Information Institute site')}, sets two rules. The first limits the persons whose AFQT falls between the 10th and 30th percentiles, Category IV, to 4 percent of the active duty enlistees of each service in a fiscal year; the Secretary of Defense may raise that limit up to 20 percent at a service's request. The second requires that a person who is not a high school graduate score at or above the 31st percentile. The law also says a lack of diploma alone may not block an enlistment needed to meet strength targets. The services then set their own floors, above the legal ones for most applicants: the ${h.a('minimum-score', 'minimum score page')} lists them.</p>
${h.mini('category', { t: 'Which band is this AFQT?', p: ['p'], d: { p: 31 } })}
<h2>What the upper bands bring</h2>
<p>Official ASVAB writes only that Category IIIA or higher may qualify for incentives. The services decide which incentives, for which jobs and for how long, and they change them often, so this site does not list amounts. What is stable is the logic: recruits in Categories I to IIIA are the ones every service needs most, which gives them more room to choose a job, a station or a contract length. If you are a few points below 50, the ${h.a('good-asvab-score', 'good score page')} shows how many points of sum separate you from it.</p>
<h2>Bands and job choice</h2>
<p>A category does not open or close a job by itself. A Category II applicant with a low Mechanical percentile may still miss a mechanical job, while a Category IIIB applicant with strong technical subtests may qualify for it. Jobs read line scores. Use the category to know where you stand for enlistment, then the ${h.a('afqt-calculator', 'AFQT calculator')} and the line score tools to see what is open.</p>
<h2>Moving up a band</h2>
<p>The band edges are fixed sums, so the effort to change band is measurable. From the top of IIIB, a percentile of 49, one or two points of sum can be enough to reach IIIA; from the middle of IIIB, ten points or more may be needed. Remember that VE counts twice: a VE gain of three points adds six to the sum. Retests follow fixed waiting periods, a month for the first two and then six months, and a jump of 20 AFQT points or more within six months leads to a confirmation test, so plan the retest once the practice scores are stable.</p>
<h2>Where the categories come from</h2>
<p>The bands have kept the same percentile limits through changes of scale, which lets the services compare the quality of recruits over decades. Because the percentiles refer to the 1997 youth sample, a category describes where an applicant would have stood in the general population of young adults, not among other recruits. That is why the services can report, year after year, the share of their recruits in Categories I to IIIA and in Category IV: the yardstick does not move. For you, the practical reading is short: below 31 most doors are closed, from 31 they open, from 50 you are in the group the services court.</p>`,
  },
  es: {
    slug: 'categorias-afqt', nav: 'Categorías AFQT', card: 'Franjas I a V y lo que permite cada una',
    title: 'Categorías AFQT 2026: franjas I a V y lo que permiten',
    description: 'Categorías AFQT en 2026: rangos de las franjas I a V, las sumas de puntajes estándar detrás, los incentivos desde IIIA y el límite legal de la categoría IV.',
    h1: 'Categorías AFQT: de la categoría I a la categoría V',
    intro: 'Escriba un percentil AFQT para ver su categoría, si llega a las franjas con incentivos y si cae en la categoría IV, que la ley limita.',
    resume: `Las ramas agrupan los percentiles AFQT en ocho franjas. La categoría I va de 93 a 99, la II de 65 a 92, la IIIA de 50 a 64, la IIIB de 31 a 49, la IVA de 21 a 30, la IVB de 16 a 20, la IVC de 10 a 15 y la V de 1 a 9. Official ASVAB indica que los aspirantes de la categoría IIIA o superior pueden calificar para incentivos de alistamiento. En el otro extremo, el 10 U.S.C. § 520 limita los reclutas en servicio activo de la categoría IV, la franja de 10 a 30, al 4 por ciento al año, salvo que el Secretario de Defensa eleve el límite. La misma ley exige al menos 31, el inicio de la categoría IIIB, a quien no tiene diploma de secundaria. En sumas de puntajes estándar, la IIIB empieza en ${E.sumForPercentile(31)}, la IIIA en ${E.sumForPercentile(50)}, la II en ${E.sumForPercentile(65)} y la I en ${E.sumForPercentile(93)}.`,
    faqs: [
      { q: '¿Qué significa la categoría IIIA para un aspirante?', a: 'La categoría IIIA cubre los percentiles AFQT de 50 a 64. Es la franja más baja que Official ASVAB menciona como posible acceso a incentivos de alistamiento, y por eso los reclutadores suelen hablar de 50 como meta. También supera el piso con GED de la Fuerza Aérea y de los Marines. No dice nada sobre qué empleos se abren: eso lo deciden los line scores.' },
      { q: '¿Se puede alistar uno en la categoría IV?', a: 'Es posible pero limitado. La ley federal limita la parte de reclutas de la categoría IV, el rango AFQT de 10 a 30, y exige 31 o más a quien no tiene diploma de secundaria. La mayoría de las ramas publica un piso de 31 o 32, que deja fuera la categoría IV para sus aspirantes regulares. El Ejército menciona un curso preparatorio para aspirantes desde 21.' },
      { q: '¿Por qué hay dos franjas en la categoría III?', a: 'La categoría III es amplia, de 31 a 64, y las ramas tratan sus dos mitades de forma distinta. La mitad superior, IIIA desde 50, puede traer incentivos; la mitad inferior, IIIB de 31 a 49, cumple casi todos los mínimos pero con menos opciones. Partir la franja en la mediana hace visible esa diferencia.' },
    ],
    body: (h) => `<h2>Las ocho franjas</h2>
<p>La tabla da cada categoría con su rango AFQT, tal como lo publica Official ASVAB en su ${h.src('oa-eligibility', 'página de elegibilidad')}, y el rango de sumas de puntajes estándar que la produce en la ${h.src('segall', 'tabla de conversión de 1997')}. Una categoría es solo una etiqueta sobre el percentil: dos aspirantes con el mismo AFQT caen siempre en la misma franja, sean cuales sean sus subpruebas.</p>
${bands(h)}
<h2>Lo que dice la ley sobre las franjas bajas</h2>
<p>La sección 520 del título 10 del Código de los Estados Unidos, leída en ${h.src('usc520', 'el sitio del Legal Information Institute de Cornell')}, fija dos reglas. La primera limita a las personas con un AFQT entre los percentiles 10 y 30, la categoría IV, al 4 por ciento de los alistados en servicio activo de cada rama en un año fiscal; el Secretario de Defensa puede elevar ese límite hasta el 20 por ciento si una rama lo pide. La segunda exige que una persona sin diploma de secundaria saque el percentil 31 o más. La ley dice también que no tener diploma no puede, por sí solo, impedir un alistamiento necesario para cubrir los efectivos. Luego cada rama fija sus propios pisos, por encima de los legales para la mayoría de los aspirantes: la página del ${h.a('minimum-score', 'puntaje mínimo')} los reúne.</p>
${h.mini('category', { t: '¿En qué franja cae este AFQT?', p: ['p'], d: { p: 31 } })}
<h2>Lo que traen las franjas altas</h2>
<p>Official ASVAB solo escribe que la categoría IIIA o superior puede calificar para incentivos. Cada rama decide qué incentivos, para qué empleos y por cuánto tiempo, y los cambia con frecuencia, así que este sitio no publica montos. Lo estable es la lógica: los reclutas de las categorías I a IIIA son los que todas las ramas más necesitan, lo que les da más margen para elegir empleo, destino o duración del contrato. Si está a pocos puntos de 50, la página del ${h.a('good-asvab-score', 'buen puntaje')} muestra cuántos puntos de suma lo separan.</p>
<h2>Franjas y elección de empleo</h2>
<p>Una categoría no abre ni cierra un empleo por sí misma. Un aspirante de categoría II con un percentil Mecánico bajo puede quedarse sin un puesto mecánico, mientras que uno de categoría IIIB con subpruebas técnicas fuertes puede calificar. Los empleos leen line scores. Use la categoría para saber dónde está para alistarse, y luego la ${h.a('afqt-calculator', 'calculadora AFQT')} y las herramientas de line scores para ver qué se abre.</p>
<h2>Subir de franja</h2>
<p>Los bordes de las franjas son sumas fijas, así que el esfuerzo para cambiar de franja se puede medir. Desde lo alto de la IIIB, un percentil de 49, uno o dos puntos de suma pueden bastar para llegar a la IIIA; desde la mitad de la IIIB pueden hacer falta diez puntos o más. Recuerde que VE cuenta doble: subir tres puntos de VE añade seis a la suma. Las repeticiones siguen plazos fijos, un mes para las dos primeras y luego seis meses, y una subida de 20 puntos AFQT o más en seis meses lleva a una prueba de confirmación, así que planee la repetición cuando sus resultados de práctica sean estables.</p>
<h2>De dónde vienen las categorías</h2>
<p>Las franjas han mantenido los mismos límites de percentil a través de los cambios de escala, lo que permite a las ramas comparar la calidad de los reclutas a lo largo de décadas. Como los percentiles se refieren a la muestra juvenil de 1997, una categoría describe dónde habría quedado un aspirante en la población general de jóvenes adultos, no entre otros reclutas. Por eso las ramas pueden informar, año tras año, la parte de sus reclutas en las categorías I a IIIA y en la categoría IV: la vara de medir no se mueve. Para usted, la lectura práctica es corta: por debajo de 31 casi todas las puertas están cerradas, desde 31 se abren y desde 50 usted está en el grupo que las ramas buscan.</p>`,
  },
});
