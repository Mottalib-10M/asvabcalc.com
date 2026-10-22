import { defineGuide } from '../../lib/page-types';
import type { Helpers } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const E = K.E;
const ve = (wk: number, pc: number) => E.veFromWkPc(wk, pc);

function grid(h: Helpers) {
  const pcs = [40, 45, 50, 55, 60];
  const rows = [40, 45, 50, 55, 60].map((wk) => [`WK ${wk}`, ...pcs.map((pc) => ve(wk, pc))]);
  return h.table(['', ...pcs.map((p) => `PC ${p}`)], rows,
    h.L('Estimated VE for a few pairs of WK and PC standard scores (reference form 04D).', 'VE estimado para algunos pares de puntajes estándar WK y PC (forma de referencia 04D).'), ['l', 'r', 'r', 'r', 'r', 'r']);
}

export default defineGuide({
  id: 've-score', group: 'scores', order: 5,
  tool: 've',
  related: ['afqt-calculator', 'word-knowledge', 'paragraph-comprehension', 'asvab-scores'],
  sources: ['segall', 'oa-scores'],
  en: {
    slug: 've-score', nav: 'VE score from WK and PC', card: 'Rebuild Verbal Expression when only WK and PC are known',
    title: 'VE Score 2026: Verbal Expression From WK and PC Scores',
    description: 'VE score calculator for 2026: estimate Verbal Expression from your Word Knowledge and Paragraph Comprehension standard scores, then see its effect on the AFQT.',
    h1: 'VE score: Verbal Expression from Word Knowledge and Paragraph Comprehension',
    intro: 'Type your WK and PC standard scores. The calculator rebuilds VE with the published formula of the reference form, within about one point, and shows the AFQT it gives.',
    resume: `Verbal Expression, printed as VE, is not the average of Word Knowledge and Paragraph Comprehension. The 1997 score scale report defines it as an optimally weighted combination of the unrounded WK and PC standard scores, in which PC carries 0.619 times the weight of WK, then places it on the same scale as the subtests, mean 50 and standard deviation 10. With the constants published for the reference form 04D, WK 50 and PC 50 give a VE of ${ve(50, 50)}, WK 60 and PC 50 give ${ve(60, 50)}, and WK 50 and PC 60 give ${ve(50, 60)}: a point of WK moves VE more than a point of PC. Since VE counts twice in the AFQT sum, each point of VE is worth two points of sum. Other test forms use slightly different constants, so treat the result as an estimate within about one point of the VE on your sheet.`,
    faqs: [
      { q: 'Why does WK count more than PC in VE?', a: 'The weights were chosen to make VE predict as well as possible, and Word Knowledge is the more precise of the two measures: it has more questions and spreads candidates more finely. In the formula of the 1997 scale, PC carries about 0.62 of the weight of WK. A point gained in Word Knowledge therefore raises VE, and the AFQT, more than a point gained in Paragraph Comprehension.' },
      { q: 'Is VE printed on every ASVAB score sheet?', a: 'Enlistment score sheets from the MEPS print VE next to the subtests because the AFQT and several composites use it. Some summaries, screenshots or recruiter notes only list WK and PC. If you only have those two, this calculator gives an estimate; for an official decision, ask the recruiter for the printed VE.' },
      { q: 'Can I raise VE faster through Word Knowledge or reading?', a: 'Both help, but in different ways. Word Knowledge weighs more in VE and rewards vocabulary you can build steadily, a few dozen words a week. Paragraph Comprehension rewards careful reading under time pressure and has fewer questions, so each one matters. Practice both, and spend more of your time on the one where your standard score is lower.' },
    ],
    body: (h) => `<h2>The formula</h2>
<p>The ${h.src('segall', '1997 score scale report')} describes VE in section 2.3. On the older scale, VE was the sum of number-right scores on WK and PC. On the 1997 scale it is built from the two ability estimates of the item response model, weighted to predict best, and then rescaled. For the reference form 04D, the report gives the standard score of WK as 11.03 times its ability estimate plus 47.81, the standard score of PC as 12.35 times its estimate plus 45.89, and VE as 7.23 times the WK estimate plus 5.01 times the PC estimate plus 46.90. The calculator inverts the first two lines to recover each ability estimate from your standard scores, then applies the third and rounds.</p>
${grid(h)}
<h2>Why it is an estimate</h2>
<p>Each form of the test has its own transformation constants, equated to the reference form, and VE uses the unrounded ability estimates, while your sheet only shows rounded standard scores. These two effects can move VE by about one point. That is enough to change the AFQT by one or two percentiles near a threshold, so if your goal sits within a point or two of a branch floor, use the VE printed on your sheet rather than the estimate.</p>
${h.mini('afqt', { t: 'Now put that VE in the AFQT', p: ['ar', 'mk', 've'], d: { ve: ve(52, 49) } })}
<h2>How much VE weighs</h2>
<p>The AFQT sum is AR + MK + 2 × VE, so VE is half of it. The Army GT is built from AR and VE, the Air Force General composite also uses AR and VE, its Administrative composite uses MK and VE, and its Mechanical composite counts VE twice. The Marine Corps uses VE in its GT and Clerical composites. A weak VE therefore drags down more numbers than any other score on the sheet, and a strong one lifts most of them. The ${h.a('line-scores', 'line score calculator')} shows the effect on every composite at once.</p>
<h2>Working on the two parts</h2>
<p>Word Knowledge asks for the closest meaning of a word, alone or in a sentence. It rewards a wide vocabulary and the habit of using roots, prefixes and context; the ${h.a('word-knowledge', 'Word Knowledge practice page')} has questions written for this site. Paragraph Comprehension gives a short passage and asks for its main idea, a detail or an inference; the ${h.a('paragraph-comprehension', 'Paragraph Comprehension practice page')} trains that skill. Both are timed: on the computer version, Word Knowledge allows about ${h.n((K.P.testLength.cat.WK[1] * 60) / K.P.testLength.cat.WK[0])} seconds per question and Paragraph Comprehension about ${h.n((K.P.testLength.cat.PC[1] * 60) / K.P.testLength.cat.PC[0])}.</p>
<h2>A worked example</h2>
<p>A candidate has WK 47 and PC 55 and wonders which to work on. The estimate gives VE ${ve(47, 55)}. Raising WK by four points, to 51, gives ${ve(51, 55)}; raising PC by four points, to 59, gives ${ve(47, 59)}. With AR 50 and MK 50, the AFQT moves from ${E.afqt({ AR: 50, MK: 50, VE: ve(47, 55) })} to ${E.afqt({ AR: 50, MK: 50, VE: ve(51, 55) })} in the first case and to ${E.afqt({ AR: 50, MK: 50, VE: ve(47, 59) })} in the second. The weaker subtest often has more room to grow, and Word Knowledge pays more per point, so here it is the better bet.</p>
<h2>VE and the Auto and Shop composite</h2>
<p>VE is not the only composite built this way. On the computer test, Auto Information and Shop Information are separate subtests, and the report combines them into AS with equal weights before rescaling to mean 50 and standard deviation 10. The paper version gives a single Auto and Shop subtest. Either way, the AS on your sheet is the number to use in the Air Force Mechanical composite and in the Marine Corps Mechanical Maintenance composite. Like VE, it is a rounded composite: two people with the same AI and SI can see AS differ by a point when their unrounded scores fall on either side of a half.</p>`,
  },
  es: {
    slug: 'puntaje-ve', nav: 'Puntaje VE con WK y PC', card: 'Reconstruir Expresión Verbal cuando solo se conocen WK y PC',
    title: 'Puntaje VE 2026: Expresión Verbal a partir de WK y PC',
    description: 'Calculadora de VE 2026: estime Expresión Verbal con sus puntajes estándar de Conocimiento de Palabras y Comprensión de Lectura y vea su efecto en el AFQT.',
    h1: 'Puntaje VE: Expresión Verbal a partir de Conocimiento de Palabras y Comprensión de Lectura',
    intro: 'Escriba sus puntajes estándar WK y PC. La calculadora reconstruye VE con la fórmula publicada de la forma de referencia, con un margen de un punto, y muestra el AFQT que resulta.',
    resume: `Expresión Verbal, impresa como VE, no es el promedio de Conocimiento de Palabras y Comprensión de Lectura. El informe de la escala de 1997 la define como una combinación ponderada de manera óptima de los puntajes estándar de WK y PC sin redondear, en la que PC pesa 0,619 veces lo que pesa WK, y luego la sitúa en la misma escala que las subpruebas, media 50 y desviación típica 10. Con las constantes publicadas para la forma de referencia 04D, WK 50 y PC 50 dan un VE de ${ve(50, 50)}, WK 60 y PC 50 dan ${ve(60, 50)}, y WK 50 y PC 60 dan ${ve(50, 60)}: un punto de WK mueve VE más que un punto de PC. Como VE cuenta doble en la suma del AFQT, cada punto de VE vale dos puntos de suma. Otras formas del examen usan constantes algo distintas, así que tome el resultado como una estimación con un margen de un punto respecto del VE de su hoja.`,
    faqs: [
      { q: '¿Por qué WK pesa más que PC en VE?', a: 'Los pesos se eligieron para que VE prediga lo mejor posible, y Conocimiento de Palabras es la más precisa de las dos medidas: tiene más preguntas y distingue mejor entre aspirantes. En la fórmula de la escala de 1997, PC pesa alrededor de 0,62 veces lo que pesa WK. Un punto ganado en Conocimiento de Palabras sube VE, y el AFQT, más que un punto ganado en Comprensión de Lectura.' },
      { q: '¿Todas las hojas de resultados del ASVAB muestran VE?', a: 'Las hojas de alistamiento del MEPS imprimen VE junto a las subpruebas porque el AFQT y varios compuestos lo usan. Algunos resúmenes, capturas de pantalla o notas de reclutadores solo dan WK y PC. Si solo tiene esos dos, esta calculadora da una estimación; para una decisión oficial, pida al reclutador el VE impreso.' },
      { q: '¿Se sube VE más rápido con vocabulario o con lectura?', a: 'Las dos cosas ayudan, pero de forma distinta. Conocimiento de Palabras pesa más en VE y premia un vocabulario que se construye con constancia, unas decenas de palabras por semana. Comprensión de Lectura premia la lectura atenta con tiempo limitado y tiene menos preguntas, así que cada una cuenta. Practique las dos y dedique más tiempo a la que tenga el puntaje estándar más bajo.' },
    ],
    body: (h) => `<h2>La fórmula</h2>
<p>El ${h.src('segall', 'informe de la escala de 1997')} describe VE en la sección 2.3. En la escala antigua, VE era la suma de aciertos de WK y PC. En la escala de 1997 se construye con las dos estimaciones de habilidad del modelo de respuesta al ítem, ponderadas para predecir mejor, y luego se reescala. Para la forma de referencia 04D, el informe da el puntaje estándar de WK como 11,03 veces su estimación de habilidad más 47,81, el de PC como 12,35 veces su estimación más 45,89, y VE como 7,23 veces la estimación de WK más 5,01 veces la de PC más 46,90. La calculadora invierte las dos primeras líneas para recuperar cada estimación a partir de sus puntajes estándar, aplica la tercera y redondea.</p>
${grid(h)}
<h2>Por qué es una estimación</h2>
<p>Cada forma del examen tiene sus propias constantes de transformación, equiparadas a la forma de referencia, y VE usa las estimaciones de habilidad sin redondear, mientras que su hoja solo muestra puntajes estándar redondeados. Esos dos efectos pueden mover VE alrededor de un punto. Eso basta para cambiar el AFQT en uno o dos percentiles cerca de un umbral, así que si su meta está a uno o dos puntos del piso de una rama, use el VE impreso en su hoja y no la estimación.</p>
${h.mini('afqt', { t: 'Ahora ponga ese VE en el AFQT', p: ['ar', 'mk', 've'], d: { ve: ve(52, 49) } })}
<h2>Cuánto pesa VE</h2>
<p>La suma del AFQT es AR + MK + 2 × VE, así que VE es la mitad. El GT del Ejército se arma con AR y VE, el compuesto General de la Fuerza Aérea también usa AR y VE, su compuesto Administrativo usa MK y VE, y su compuesto Mecánico cuenta VE dos veces. Los Marines usan VE en sus compuestos GT y Administrativo. Un VE débil arrastra más números que cualquier otro puntaje de la hoja, y uno fuerte levanta la mayoría. La ${h.a('line-scores', 'calculadora de line scores')} muestra el efecto en todos los compuestos a la vez.</p>
<h2>Cómo trabajar las dos partes</h2>
<p>Conocimiento de Palabras pide el significado más cercano de una palabra, sola o dentro de una oración. Premia un vocabulario amplio y la costumbre de usar raíces, prefijos y contexto; la ${h.a('word-knowledge', 'página de práctica de Conocimiento de Palabras')} tiene preguntas escritas para este sitio. Comprensión de Lectura da un texto corto y pregunta por la idea principal, un detalle o una deducción; la ${h.a('paragraph-comprehension', 'página de práctica de Comprensión de Lectura')} entrena esa habilidad. Las dos tienen tiempo límite: en la versión por computadora, Conocimiento de Palabras da unos ${h.n((K.P.testLength.cat.WK[1] * 60) / K.P.testLength.cat.WK[0])} segundos por pregunta y Comprensión de Lectura unos ${h.n((K.P.testLength.cat.PC[1] * 60) / K.P.testLength.cat.PC[0])}.</p>
<h2>Un ejemplo resuelto</h2>
<p>Una aspirante tiene WK 47 y PC 55 y se pregunta cuál trabajar. La estimación da VE ${ve(47, 55)}. Subir WK cuatro puntos, a 51, da ${ve(51, 55)}; subir PC cuatro puntos, a 59, da ${ve(47, 59)}. Con AR 50 y MK 50, el AFQT pasa de ${E.afqt({ AR: 50, MK: 50, VE: ve(47, 55) })} a ${E.afqt({ AR: 50, MK: 50, VE: ve(51, 55) })} en el primer caso y a ${E.afqt({ AR: 50, MK: 50, VE: ve(47, 59) })} en el segundo. La subprueba más débil suele tener más margen para crecer, y Conocimiento de Palabras paga más por punto, así que aquí es la mejor apuesta.</p>
<h2>VE y el compuesto de Autos y Taller</h2>
<p>VE no es el único compuesto construido así. En el examen por computadora, Información de Autos e Información de Taller son subpruebas separadas, y el informe las combina en AS con pesos iguales antes de reescalar a media 50 y desviación típica 10. La versión en papel tiene una sola subprueba de Autos y Taller. En los dos casos, el AS de su hoja es el número que se usa en el compuesto Mecánico de la Fuerza Aérea y en el compuesto de Mantenimiento Mecánico de los Marines. Como VE, es un compuesto redondeado: dos personas con los mismos AI y SI pueden ver un AS distinto en un punto cuando sus puntajes sin redondear caen a cada lado de un medio.</p>`,
  },
});
