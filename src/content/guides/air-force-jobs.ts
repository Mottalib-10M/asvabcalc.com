import { defineGuide } from '../../lib/page-types';
import type { Helpers } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const J = K.JOBS;
const byArea = (a: string) => J.filter((j) => j.req.some(([k]) => k === a)).length;
const two = J.filter((j) => j.req.length === 2).length;
const none = J.filter((j) => !j.req.length).length;
const maxOf = (a: string) => Math.max(...J.flatMap((j) => j.req.filter(([k]) => k === a).map(([, v]) => v as number)));
const minOf = (a: string) => Math.min(...J.flatMap((j) => j.req.filter(([k]) => k === a).map(([, v]) => v as number)));

function fields(h: Helpers) {
  const tags = [...new Set(J.map((j) => j.tag))].map((t) => ({ t, n: J.filter((j) => j.tag === t).length })).sort((a, b) => b.n - a.n).slice(0, 10);
  return h.table([h.L('Career field (as listed on airforce.com)', 'Área profesional (tal como figura en airforce.com)'), h.L('Enlisted careers', 'Carreras enlisted'), h.L('Lowest single minimum', 'Mínimo más bajo')], tags.map(({ t, n }) => {
    const mins = J.filter((j) => j.tag === t && j.req.length).map((j) => j.raw);
    return [t, n, mins.length ? mins.sort((a, b) => Number(a.slice(1, 3)) - Number(b.slice(1, 3)))[0] : h.L('none listed', 'ninguno')];
  }), h.L('The ten largest career fields of the enlisted listing.', 'Las diez áreas con más carreras enlisted.'), ['l', 'r', 'l']);
}

export default defineGuide({
  id: 'air-force-jobs', group: 'branches', order: 14,
  tool: 'afjobs',
  related: ['air-force', 'line-scores', 'electronics-information', 'mechanical-comprehension'],
  sources: ['af-careers', 'airforce', 'segall'],
  en: {
    slug: 'air-force-jobs-asvab', nav: 'Air Force jobs by ASVAB score', card: 'The enlisted careers your MAGE percentiles meet',
    title: 'Air Force Jobs by ASVAB Score 2026: MAGE Minimums Listed',
    description: `Air Force jobs by ASVAB score in 2026: type your MAGE percentiles and see which of the ${J.length} enlisted careers listed on airforce.com you meet, field by field.`,
    h1: 'Air Force jobs by ASVAB score: what your MAGE percentiles open',
    intro: `Type your four MAGE percentiles from your score sheet, or compute them on the Air Force page, and pick a career field: the list shows the enlisted careers whose published minimums you meet.`,
    resume: `The Air Force publishes an ASVAB minimum for its enlisted careers on airforce.com, expressed in its four aptitude areas: Mechanical (M), Administrative (A), General (G) and Electrical (E). On the date of this page, the listing had ${J.length} enlisted careers: ${byArea('G')} with a General requirement, ${byArea('M')} Mechanical, ${byArea('A')} Administrative and ${byArea('E')} Electrical, counting careers that list two areas in both; ${two} list two areas and ${none} list no minimum. Requirements range from ${minOf('M')} to ${maxOf('M')} in Mechanical, ${minOf('G')} to ${maxOf('G')} in General, ${minOf('A')} to ${maxOf('A')} in Administrative and ${minOf('E')} to ${maxOf('E')} in Electrical. Each is a percentile from the 1997 tables, so you compare it directly with the percentile on your sheet. Meeting a minimum makes you eligible to be considered for a career; availability, medical standards and security clearances decide the rest.`,
    faqs: [
      { q: 'What Air Force job needs the highest ASVAB score?', a: `In the airforce.com listing read for this page, the highest single requirement in the Electrical area is E${maxOf('E')}, shared by several electronics, cyber and avionics careers, and the highest General requirement is G${maxOf('G')}. A high minimum does not mean a better job, only a job whose training draws on those subtests. Check the listing for the career you want, since requirements change.` },
      { q: 'Are Air Force jobs with no ASVAB minimum open to everyone?', a: `A few careers in the listing show no minimum, shown as A0 on the site. Applicants still need the Air Force AFQT floor, 31 with a diploma or 50 with a GED, and must meet the career's other standards, such as physical, medical or security requirements. The absence of a MAGE minimum only means the listing names no aptitude area.` },
      { q: 'What does M47 & A28 mean on an Air Force job?', a: 'It lists a Mechanical percentile of 47 and an Administrative percentile of 28. This site reads the ampersand as both being required and filters careers that way. If a recruiter tells you one of the two is enough for a given career, the job finder is stricter than needed, never looser, so you will not miss a career you qualify for by this reading.' },
    ],
    body: (h) => `<h2>Where the minimums come from</h2>
<p>Every enlisted career page on ${h.src('af-careers', 'airforce.com')} shows its ASVAB requirement. The site serves the same data through a public careers listing, which this site reads with a script and keeps with the date of the reading. Each requirement names one or two areas and a percentile, such as G55 or M47 &amp; A28. The percentiles are the ones your score sheet prints for the four areas, built from the composites of the ${h.src('segall', '1997 score scale report')}; the ${h.a('air-force', 'Air Force page')} computes them from your standard scores.</p>
${fields(h)}
<h2>How to use the finder</h2>
<p>Enter your four percentiles exactly as printed. If you only have standard scores, compute the percentiles first, then come back. Pick a career field to narrow the list or keep all fields. The result counts the careers whose minimums you meet, names the closest one you miss and how many points you lack, and lists the careers within reach with their AFSC code, the Air Force Specialty Code that identifies each career. The titles stay in English, as the Air Force publishes them.</p>
${h.mini('mage', { t: 'First, your four percentiles', p: ['ar', 've', 'mk', 'gs'] })}
<h2>Reading two-area requirements</h2>
<p>When a career lists two areas, this site requires both. That is the cautious reading: a career shown as within reach meets both listed numbers. If the Air Force accepts either area for a given career, the finder may hide a career you could get, but it will never show one you cannot. Ask a recruiter when a career you want is shown just out of reach on one of its two areas.</p>
<h2>What a minimum does not tell you</h2>
<p>A minimum percentile is a gate, not a ranking. Careers also depend on openings at the time you enlist, on medical and physical standards, on color vision for some electrical work, and on security clearances for intelligence and cyber careers. Those criteria are outside the ASVAB and outside this site. The listing also changes: careers are added, merged or renamed, and requirements move, so the date at the bottom of this page tells you how fresh the list is. The ${h.a('line-scores', 'line score page')} compares the Air Force system with the Army and Marine Corps ones.</p>
<h2>Moving up an area</h2>
<p>Each area depends on specific subtests. General uses AR and VE, Administrative uses MK and VE, Electrical uses GS, AR, MK and EI, and Mechanical uses AR, MC, AS and twice VE. To reach a career that is a few points away, work on the subtests of its area where you are weakest: the ${h.a('electronics-information', 'Electronics Information')} and ${h.a('mechanical-comprehension', 'Mechanical Comprehension')} practice pages target the two technical areas, while VE lifts three of the four at once.</p>
<h2>A worked example</h2>
<p>An applicant has M 52, A 61, G 58 and E 44 on his sheet. With all fields selected, the finder counts the careers whose every listed minimum sits at or below those four numbers. Electronics careers listed at E70 are out of reach, 26 points away on the Electrical area, which is a large gap. Administrative and General careers in the 50s are open. If he wants an avionics career, the honest answer is a retest after serious work on Electronics Information and General Science; if he wants a support or intelligence career, his current General and Administrative percentiles may already be enough. Run the finder with your own numbers before you talk to a recruiter, so that the conversation starts from the careers that are really open to you.</p>`,
  },
  es: {
    slug: 'empleos-fuerza-aerea-asvab', nav: 'Empleos de la Fuerza Aérea por puntaje', card: 'Las carreras enlisted que abren sus percentiles MAGE',
    title: 'Empleos de la Fuerza Aérea por ASVAB 2026: mínimos MAGE',
    description: `Empleos de la Fuerza Aérea según el ASVAB en 2026: escriba sus percentiles MAGE y vea cuáles de las ${J.length} carreras enlisted de airforce.com cumple, área por área.`,
    h1: 'Empleos de la Fuerza Aérea según el ASVAB: lo que abren sus percentiles MAGE',
    intro: 'Escriba sus cuatro percentiles MAGE de la hoja de resultados, o calcúlelos en la página de la Fuerza Aérea, y elija un área: la lista muestra las carreras enlisted cuyos mínimos publicados cumple.',
    resume: `La Fuerza Aérea publica en airforce.com un mínimo del ASVAB para sus carreras enlisted, expresado en sus cuatro áreas de aptitud: Mecánica (M), Administrativa (A), General (G) y Eléctrica (E). En la fecha de esta página, la lista tenía ${J.length} carreras enlisted: ${byArea('G')} con requisito General, ${byArea('M')} Mecánico, ${byArea('A')} Administrativo y ${byArea('E')} Eléctrico, contando en ambas las carreras que indican dos áreas; ${two} indican dos áreas y ${none} no indican mínimo. Los requisitos van de ${minOf('M')} a ${maxOf('M')} en Mecánica, de ${minOf('G')} a ${maxOf('G')} en General, de ${minOf('A')} a ${maxOf('A')} en Administrativa y de ${minOf('E')} a ${maxOf('E')} en Eléctrica. Cada uno es un percentil de las tablas de 1997, así que se compara directamente con el percentil de su hoja. Cumplir un mínimo lo habilita para ser considerado en una carrera; la disponibilidad, las normas médicas y las autorizaciones de seguridad deciden el resto.`,
    faqs: [
      { q: '¿Qué empleo de la Fuerza Aérea pide el puntaje más alto del ASVAB?', a: `En la lista de airforce.com leída para esta página, el requisito individual más alto en el área Eléctrica es E${maxOf('E')}, compartido por varias carreras de electrónica, ciberseguridad y aviónica, y el requisito General más alto es G${maxOf('G')}. Un mínimo alto no significa un empleo mejor, solo un empleo cuya formación se apoya en esas subpruebas. Revise la lista para la carrera que le interesa, porque los requisitos cambian.` },
      { q: '¿Los empleos sin mínimo del ASVAB están abiertos a todos?', a: 'Algunas carreras de la lista no muestran mínimo, indicado como A0 en el sitio. Los aspirantes siguen necesitando el piso AFQT de la Fuerza Aérea, 31 con diploma o 50 con GED, y cumplir las demás normas de la carrera, como requisitos físicos, médicos o de seguridad. La ausencia de un mínimo MAGE solo significa que la lista no nombra un área de aptitud.' },
      { q: '¿Qué significa M47 & A28 en un empleo de la Fuerza Aérea?', a: 'Indica un percentil Mecánico de 47 y un percentil Administrativo de 28. Este sitio interpreta el signo & como que se exigen los dos y filtra las carreras así. Si un reclutador le dice que basta uno de los dos para cierta carrera, el buscador es más estricto de lo necesario, nunca más flexible, así que no le hará creer que califica cuando no es así.' },
    ],
    body: (h) => `<h2>De dónde vienen los mínimos</h2>
<p>Cada página de carrera enlisted de ${h.src('af-careers', 'airforce.com')} muestra su requisito del ASVAB. El sitio sirve los mismos datos en una lista pública de carreras, que este sitio lee con un script y guarda con la fecha de la lectura. Cada requisito nombra una o dos áreas y un percentil, como G55 o M47 &amp; A28. Los percentiles son los que su hoja imprime para las cuatro áreas, construidos con los compuestos del ${h.src('segall', 'informe de la escala de 1997')}; la página de la ${h.a('air-force', 'Fuerza Aérea')} los calcula con sus puntajes estándar.</p>
${fields(h)}
<h2>Cómo usar el buscador</h2>
<p>Escriba sus cuatro percentiles tal como están impresos. Si solo tiene puntajes estándar, calcule primero los percentiles y luego vuelva. Elija un área para acotar la lista o deje todas. El resultado cuenta las carreras cuyos mínimos cumple, nombra la más cercana que no alcanza y cuántos puntos le faltan, y lista las carreras a su alcance con su código AFSC, el Air Force Specialty Code que identifica cada carrera. Los títulos se quedan en inglés, como los publica la Fuerza Aérea.</p>
${h.mini('mage', { t: 'Primero, sus cuatro percentiles', p: ['ar', 've', 'mk', 'gs'] })}
<h2>Cómo leer los requisitos de dos áreas</h2>
<p>Cuando una carrera indica dos áreas, este sitio exige las dos. Es la lectura prudente: una carrera que aparece a su alcance cumple los dos números indicados. Si la Fuerza Aérea acepta cualquiera de las dos áreas para una carrera, el buscador puede ocultarle una carrera que podría obtener, pero nunca le mostrará una que no puede. Consulte a un reclutador cuando una carrera que quiere aparezca justo fuera de alcance en una de sus dos áreas.</p>
<h2>Lo que un mínimo no dice</h2>
<p>Un percentil mínimo es una puerta, no una clasificación. Las carreras dependen también de las vacantes en el momento del alistamiento, de normas médicas y físicas, de la visión de colores en algunos trabajos eléctricos y de autorizaciones de seguridad en inteligencia y ciberseguridad. Esos criterios están fuera del ASVAB y fuera de este sitio. La lista también cambia: se añaden, fusionan o renombran carreras y se mueven los requisitos, así que la fecha al pie de esta página le dice qué tan reciente es. La página de ${h.a('line-scores', 'line scores')} compara el sistema de la Fuerza Aérea con los del Ejército y los Marines.</p>
<h2>Subir en un área</h2>
<p>Cada área depende de subpruebas concretas. General usa AR y VE, Administrativa usa MK y VE, Eléctrica usa GS, AR, MK y EI, y Mecánica usa AR, MC, AS y dos veces VE. Para alcanzar una carrera que está a pocos puntos, trabaje las subpruebas de su área donde sea más débil: las páginas de práctica de ${h.a('electronics-information', 'Información Electrónica')} y de ${h.a('mechanical-comprehension', 'Comprensión Mecánica')} apuntan a las dos áreas técnicas, mientras que VE sube tres de las cuatro a la vez.</p>
<h2>Un ejemplo resuelto</h2>
<p>Un aspirante tiene M 52, A 61, G 58 y E 44 en su hoja. Con todas las áreas seleccionadas, el buscador cuenta las carreras cuyos mínimos indicados están todos en esos cuatro números o por debajo. Las carreras de electrónica con mínimo E70 quedan fuera de alcance, a 26 puntos en el área Eléctrica, una brecha grande. Las carreras administrativas y generales con mínimos de 50 y algo están abiertas. Si quiere una carrera de aviónica, la respuesta honesta es repetir el examen después de trabajar en serio Información Electrónica y Ciencia General; si quiere una carrera de apoyo o de inteligencia, sus percentiles General y Administrativo pueden bastar ya. Use el buscador con sus propios números antes de hablar con un reclutador, para que la conversación empiece por las carreras que de verdad tiene abiertas.</p>`,
  },
});
