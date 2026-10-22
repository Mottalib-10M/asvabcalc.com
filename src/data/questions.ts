/** Questions de pratique écrites par Radif Partners pour ce site : ce ne sont PAS des questions réelles de l'ASVAB. */
export type QSub = 'GS' | 'AR' | 'WK' | 'PC' | 'MK' | 'EI' | 'AS' | 'MC';
export interface Q { id: string; s: QSub; q: string; qes: string; o: [string, string, string, string]; a: 0 | 1 | 2 | 3; why: { en: string; es: string } }

export const QUESTIONS: Q[] = [
  // ---------- GS : General Science ----------
  {
    id: 'gs1', s: 'GS',
    q: "Which organelle is the main site of cellular respiration in animal cells?",
    qes: "¿Qué orgánulo es el sitio principal de la respiración celular en las células animales?",
    o: ["Nucleus", "Ribosome", "Mitochondrion", "Golgi apparatus"], a: 2,
    why: {
      en: "Mitochondria break down glucose with oxygen to release energy stored as ATP, which is why they are often called the powerhouse of the cell.",
      es: "Las mitocondrias descomponen la glucosa con oxígeno para liberar energía almacenada como ATP; por eso se les llama la central energética de la célula.",
    },
  },
  {
    id: 'gs2', s: 'GS',
    q: "What is the chemical symbol for sodium?",
    qes: "¿Cuál es el símbolo químico del sodio?",
    o: ["Na", "So", "Sd", "S"], a: 0,
    why: {
      en: "Sodium's symbol Na comes from its Latin name, natrium. The symbol S belongs to sulfur, and So and Sd are not element symbols.",
      es: "El símbolo Na del sodio viene de su nombre en latín, natrium. El símbolo S corresponde al azufre, y So y Sd no son símbolos de elementos.",
    },
  },
  {
    id: 'gs3', s: 'GS',
    q: "A solution has a pH of 3. How is it best described?",
    qes: "Una solución tiene un pH de 3. ¿Cómo se describe mejor?",
    o: ["Strongly basic", "Neutral", "Weakly basic", "Acidic"], a: 3,
    why: {
      en: "On the pH scale, 7 is neutral, values below 7 are acidic and values above 7 are basic. A pH of 3 is clearly acidic, like vinegar or soda.",
      es: "En la escala de pH, 7 es neutro, los valores menores de 7 son ácidos y los mayores de 7 son básicos. Un pH de 3 es claramente ácido, como el vinagre.",
    },
  },
  {
    id: 'gs4', s: 'GS',
    q: "Which planet is closest to the Sun?",
    qes: "¿Qué planeta está más cerca del Sol?",
    o: ["Venus", "Mercury", "Mars", "Earth"], a: 1,
    why: {
      en: "The order of planets from the Sun starts with Mercury, then Venus, Earth and Mars. Mercury is the smallest planet and has the shortest orbit.",
      es: "El orden de los planetas desde el Sol empieza con Mercurio, luego Venus, la Tierra y Marte. Mercurio es el planeta más pequeño y tiene la órbita más corta.",
    },
  },
  {
    id: 'gs5', s: 'GS',
    q: "Which type of blood vessel carries blood away from the heart?",
    qes: "¿Qué tipo de vaso sanguíneo lleva la sangre desde el corazón hacia el resto del cuerpo?",
    o: ["Veins", "Capillaries", "Arteries", "Lymph ducts"], a: 2,
    why: {
      en: "Arteries carry blood away from the heart under high pressure. Veins return blood to the heart, and capillaries connect the two where gases are exchanged.",
      es: "Las arterias llevan la sangre desde el corazón a alta presión. Las venas la devuelven al corazón y los capilares unen ambas, donde se intercambian los gases.",
    },
  },
  {
    id: 'gs6', s: 'GS',
    q: "The process by which green plants convert light energy into chemical energy stored in sugar is called:",
    qes: "El proceso por el cual las plantas verdes convierten la energía de la luz en energía química almacenada en azúcar se llama:",
    o: ["Photosynthesis", "Transpiration", "Respiration", "Fermentation"], a: 0,
    why: {
      en: "In photosynthesis, chlorophyll captures light to turn carbon dioxide and water into glucose and oxygen. Transpiration is water loss through the leaves.",
      es: "En la fotosíntesis, la clorofila capta la luz para convertir el dióxido de carbono y el agua en glucosa y oxígeno. La transpiración es la pérdida de agua por las hojas.",
    },
  },
  {
    id: 'gs7', s: 'GS',
    q: "A 10-kilogram cart accelerates at 3 meters per second squared. What net force is acting on it?",
    qes: "Un carrito de 10 kilogramos acelera a 3 metros por segundo al cuadrado. ¿Qué fuerza neta actúa sobre él?",
    o: ["13 newtons", "30 newtons", "3.3 newtons", "0.3 newtons"], a: 1,
    why: {
      en: "Newton's second law says force equals mass times acceleration: F = 10 kg x 3 m/s^2 = 30 newtons.",
      es: "La segunda ley de Newton dice que la fuerza es igual a la masa por la aceleración: F = 10 kg x 3 m/s^2 = 30 newtons.",
    },
  },
  {
    id: 'gs8', s: 'GS',
    q: "In which layer of the atmosphere is most of the ozone layer found?",
    qes: "¿En qué capa de la atmósfera se encuentra la mayor parte de la capa de ozono?",
    o: ["Troposphere", "Mesosphere", "Thermosphere", "Stratosphere"], a: 3,
    why: {
      en: "Most ozone sits in the stratosphere, roughly 10 to 30 miles up, where it absorbs much of the Sun's ultraviolet radiation. Weather happens below, in the troposphere.",
      es: "La mayor parte del ozono está en la estratosfera, a unos 15 a 50 kilómetros de altura, donde absorbe gran parte de la radiación ultravioleta. El clima ocurre más abajo, en la troposfera.",
    },
  },
  {
    id: 'gs9', s: 'GS',
    q: "Through which of these does sound travel fastest?",
    qes: "¿A través de cuál de estos medios viaja más rápido el sonido?",
    o: ["Air", "A vacuum", "Steel", "Water"], a: 2,
    why: {
      en: "Sound moves fastest through stiff solids such as steel, about 5,900 meters per second, slower in water and slowest in air. It cannot travel through a vacuum at all.",
      es: "El sonido viaja más rápido en sólidos rígidos como el acero, unos 5,900 metros por segundo, más lento en el agua y aún más en el aire. En el vacío no se propaga.",
    },
  },
  {
    id: 'gs10', s: 'GS',
    q: "Which gas makes up about 78 percent of Earth's atmosphere?",
    qes: "¿Qué gas forma alrededor del 78 por ciento de la atmósfera de la Tierra?",
    o: ["Oxygen", "Nitrogen", "Argon", "Carbon dioxide"], a: 1,
    why: {
      en: "Dry air is about 78 percent nitrogen and 21 percent oxygen. Argon is close to 1 percent, and carbon dioxide is only a small fraction of a percent.",
      es: "El aire seco es aproximadamente 78 por ciento nitrógeno y 21 por ciento oxígeno. El argón es cerca del 1 por ciento y el dióxido de carbono es una fracción mínima.",
    },
  },

  // ---------- AR : Arithmetic Reasoning ----------
  {
    id: 'ar1', s: 'AR',
    q: "A mechanic earns $18 per hour and works 37 hours in one week. How much does she earn that week before taxes?",
    qes: "Una mecánica gana $18 por hora y trabaja 37 horas en una semana. ¿Cuánto gana esa semana antes de impuestos?",
    o: ["$646", "$666", "$676", "$656"], a: 1,
    why: {
      en: "Multiply the hourly rate by the hours worked: $18 x 37 = $666. A quick check: $18 x 40 = $720, minus $18 x 3 = $54, gives $666.",
      es: "Multiplique la tarifa por hora por las horas trabajadas: $18 x 37 = $666. Comprobación rápida: $18 x 40 = $720, menos $18 x 3 = $54, da $666.",
    },
  },
  {
    id: 'ar2', s: 'AR',
    q: "A convoy travels 210 miles in 3.5 hours. What is its average speed?",
    qes: "Un convoy recorre 210 millas en 3.5 horas. ¿Cuál es su velocidad promedio?",
    o: ["60 mph", "65 mph", "55 mph", "70 mph"], a: 0,
    why: {
      en: "Average speed equals distance divided by time: 210 miles / 3.5 hours = 60 miles per hour.",
      es: "La velocidad promedio es igual a la distancia dividida entre el tiempo: 210 millas / 3.5 horas = 60 millas por hora.",
    },
  },
  {
    id: 'ar3', s: 'AR',
    q: "A jacket regularly priced at $80 is on sale for 25% off. What is the sale price?",
    qes: "Una chaqueta con precio normal de $80 está en oferta con 25% de descuento. ¿Cuál es el precio de oferta?",
    o: ["$55", "$65", "$70", "$60"], a: 3,
    why: {
      en: "The discount is 25% of $80 = 0.25 x 80 = $20. Subtract it from the regular price: $80 - $20 = $60.",
      es: "El descuento es el 25% de $80 = 0.25 x 80 = $20. Réstelo del precio normal: $80 - $20 = $60.",
    },
  },
  {
    id: 'ar4', s: 'AR',
    q: "A recipe uses 3 cups of flour to make 24 cookies. How many cups of flour are needed to make 40 cookies?",
    qes: "Una receta usa 3 tazas de harina para hacer 24 galletas. ¿Cuántas tazas de harina se necesitan para hacer 40 galletas?",
    o: ["4", "4.5", "5", "6"], a: 2,
    why: {
      en: "Set up a proportion: 3/24 = x/40. Each cookie needs 3 / 24 = 0.125 cup, so 40 x 0.125 = 5 cups.",
      es: "Plantee una proporción: 3/24 = x/40. Cada galleta necesita 3 / 24 = 0.125 taza, así que 40 x 0.125 = 5 tazas.",
    },
  },
  {
    id: 'ar5', s: 'AR',
    q: "Of 48 recruits, 3/8 did not pass their first timed run. How many recruits passed?",
    qes: "De 48 reclutas, 3/8 no aprobaron su primera carrera cronometrada. ¿Cuántos reclutas aprobaron?",
    o: ["18", "30", "32", "28"], a: 1,
    why: {
      en: "If 3/8 failed, then 5/8 passed. 48 / 8 = 6, and 6 x 5 = 30 recruits passed. The 18 recruits who failed is the trap answer.",
      es: "Si 3/8 no aprobaron, entonces 5/8 aprobaron. 48 / 8 = 6, y 6 x 5 = 30 reclutas aprobaron. La respuesta 18 corresponde a los que no aprobaron.",
    },
  },
  {
    id: 'ar6', s: 'AR',
    q: "Luis deposits $2,000 in an account that pays 4% simple interest per year. How much interest does he earn in 3 years?",
    qes: "Luis deposita $2,000 en una cuenta que paga 4% de interés simple al año. ¿Cuánto interés gana en 3 años?",
    o: ["$240", "$80", "$2,240", "$120"], a: 0,
    why: {
      en: "Simple interest = principal x rate x time: $2,000 x 0.04 x 3 = $240. The answer $2,240 is the total balance, not the interest.",
      es: "Interés simple = capital x tasa x tiempo: $2,000 x 0.04 x 3 = $240. La opción $2,240 es el saldo total, no el interés.",
    },
  },
  {
    id: 'ar7', s: 'AR',
    q: "Dana scored 82, 90, 75 and 88 on four tests. What must she score on the fifth test to have an average of 85?",
    qes: "Dana obtuvo 82, 90, 75 y 88 en cuatro exámenes. ¿Qué puntuación necesita en el quinto examen para tener un promedio de 85?",
    o: ["85", "88", "92", "90"], a: 3,
    why: {
      en: "An average of 85 over 5 tests needs a total of 85 x 5 = 425. Her current total is 82 + 90 + 75 + 88 = 335, so she needs 425 - 335 = 90.",
      es: "Un promedio de 85 en 5 exámenes exige un total de 85 x 5 = 425. Su total actual es 82 + 90 + 75 + 88 = 335, así que necesita 425 - 335 = 90.",
    },
  },
  {
    id: 'ar8', s: 'AR',
    q: "A 120-gallon tank is being filled at 8 gallons per minute while a leak drains 3 gallons per minute. Starting empty, how many minutes until it is full?",
    qes: "Un tanque de 120 galones se llena a 8 galones por minuto mientras una fuga pierde 3 galones por minuto. Si empieza vacío, ¿en cuántos minutos se llena?",
    o: ["15", "24", "40", "20"], a: 1,
    why: {
      en: "The net fill rate is 8 - 3 = 5 gallons per minute. Time to fill = 120 / 5 = 24 minutes.",
      es: "La tasa neta de llenado es 8 - 3 = 5 galones por minuto. Tiempo para llenarlo = 120 / 5 = 24 minutos.",
    },
  },
  {
    id: 'ar9', s: 'AR',
    q: "The price of a tool kit rose from $40 to $50. By what percent did the price increase?",
    qes: "El precio de un juego de herramientas subió de $40 a $50. ¿En qué porcentaje aumentó el precio?",
    o: ["20%", "10%", "25%", "50%"], a: 2,
    why: {
      en: "Percent increase = change / original price: ($50 - $40) / $40 = 10 / 40 = 0.25, which is 25%. Dividing by the new price would wrongly give 20%.",
      es: "Aumento porcentual = cambio / precio original: ($50 - $40) / $40 = 10 / 40 = 0.25, es decir 25%. Dividir entre el precio nuevo daría 20%, que es incorrecto.",
    },
  },
  {
    id: 'ar10', s: 'AR',
    q: "Pump A can fill a pool in 6 hours. Pump B can fill the same pool in 3 hours. Working together, how long do they take to fill the pool?",
    qes: "La bomba A puede llenar una piscina en 6 horas. La bomba B puede llenar la misma piscina en 3 horas. Trabajando juntas, ¿cuánto tardan en llenarla?",
    o: ["4.5 hours", "3 hours", "1.5 hours", "2 hours"], a: 3,
    why: {
      en: "Add the hourly rates: 1/6 + 1/3 = 1/6 + 2/6 = 3/6 = 1/2 pool per hour. At half a pool per hour, filling one pool takes 2 hours.",
      es: "Sume las tasas por hora: 1/6 + 1/3 = 1/6 + 2/6 = 3/6 = 1/2 piscina por hora. A media piscina por hora, llenar una piscina toma 2 horas.",
    },
  },

  // ---------- WK : Word Knowledge ----------
  {
    id: 'wk1', s: 'WK',
    q: "Diligent most nearly means:",
    qes: "Elija el sinónimo más cercano de la palabra en inglés «diligent».",
    o: ["Careless", "Hardworking", "Wealthy", "Nervous"], a: 1,
    why: {
      en: "A diligent person works with steady care and effort. Hardworking is the closest match, and careless is close to its opposite.",
      es: "Una persona diligent trabaja con esfuerzo y cuidado constantes. Hardworking es el sinónimo más cercano, y careless es casi lo contrario.",
    },
  },
  {
    id: 'wk2', s: 'WK',
    q: "Candid most nearly means:",
    qes: "Elija el sinónimo más cercano de la palabra en inglés «candid».",
    o: ["Honest", "Sweet", "Hidden", "Angry"], a: 0,
    why: {
      en: "Candid means open and frank, saying what you really think. Honest is the closest meaning. Do not confuse it with candy, which suggests sweet.",
      es: "Candid significa franco y directo, que dice lo que realmente piensa. Honest es el significado más cercano. No lo confunda con candy, que sugiere sweet.",
    },
  },
  {
    id: 'wk3', s: 'WK',
    q: "The general's terse reply ended the meeting quickly. Terse most nearly means:",
    qes: "En la oración en inglés «The general's terse reply ended the meeting quickly.», elija la palabra más cercana en significado a «terse».",
    o: ["Brief", "Polite", "Confused", "Loud"], a: 0,
    why: {
      en: "Terse describes speech that uses very few words, often to the point of seeming curt. A brief reply fits the idea of ending a meeting quickly.",
      es: "Terse describe un modo de hablar con muy pocas palabras, a veces casi cortante. Una respuesta brief encaja con la idea de terminar la reunión rápido.",
    },
  },
  {
    id: 'wk4', s: 'WK',
    q: "Mitigate most nearly means:",
    qes: "Elija el sinónimo más cercano de la palabra en inglés «mitigate».",
    o: ["Worsen", "Delay", "Lessen", "Measure"], a: 2,
    why: {
      en: "To mitigate is to make something less severe, such as mitigating flood damage with sandbags. Lessen is the closest meaning, and worsen is its opposite.",
      es: "Mitigate significa hacer algo menos grave, como reducir los daños de una inundación con sacos de arena. Lessen es el más cercano y worsen es lo contrario.",
    },
  },
  {
    id: 'wk5', s: 'WK',
    q: "Abundant most nearly means:",
    qes: "Elija el sinónimo más cercano de la palabra en inglés «abundant».",
    o: ["Scarce", "Plentiful", "Expensive", "Distant"], a: 1,
    why: {
      en: "Abundant means existing in large amounts, more than enough. Plentiful has the same meaning, while scarce means the opposite, in short supply.",
      es: "Abundant significa que existe en gran cantidad, más que suficiente. Plentiful tiene el mismo sentido, mientras que scarce significa lo contrario, escaso.",
    },
  },
  {
    id: 'wk6', s: 'WK',
    q: "The recruit's tenacity impressed the drill instructor. Tenacity most nearly means:",
    qes: "En la oración en inglés «The recruit's tenacity impressed the drill instructor.», elija la palabra más cercana en significado a «tenacity».",
    o: ["Rudeness", "Speed", "Humor", "Persistence"], a: 3,
    why: {
      en: "Tenacity is the quality of holding on firmly and refusing to give up. Persistence is the best match and explains why an instructor would be impressed.",
      es: "Tenacity es la cualidad de mantenerse firme y no rendirse. Persistence es la mejor opción y explica por qué el instructor quedó impresionado.",
    },
  },
  {
    id: 'wk7', s: 'WK',
    q: "Obsolete most nearly means:",
    qes: "Elija el sinónimo más cercano de la palabra en inglés «obsolete».",
    o: ["Necessary", "Fragile", "Outdated", "Hidden"], a: 2,
    why: {
      en: "Something obsolete is no longer used because something newer has replaced it, like a pager after cell phones. Outdated is the closest meaning.",
      es: "Algo obsolete ya no se usa porque algo más nuevo lo reemplazó, como el localizador después del celular. Outdated es el significado más cercano.",
    },
  },
  {
    id: 'wk8', s: 'WK',
    q: "Feasible most nearly means:",
    qes: "Elija el sinónimo más cercano de la palabra en inglés «feasible».",
    o: ["Doubtful", "Costly", "Possible", "Visible"], a: 2,
    why: {
      en: "A feasible plan is one that can actually be carried out. Possible is the closest meaning, and doubtful points the other way.",
      es: "Un plan feasible es uno que realmente se puede llevar a cabo. Possible es el significado más cercano, y doubtful apunta en sentido contrario.",
    },
  },
  {
    id: 'wk9', s: 'WK',
    q: "Her meticulous notes made the inspection easy. Meticulous most nearly means:",
    qes: "En la oración en inglés «Her meticulous notes made the inspection easy.», elija la palabra más cercana en significado a «meticulous».",
    o: ["Hasty", "Messy", "Brief", "Careful"], a: 3,
    why: {
      en: "Meticulous means paying close attention to every detail. Careful notes would make an inspection easy, while hasty or messy notes would not.",
      es: "Meticulous significa prestar mucha atención a cada detalle. Unas notas careful facilitarían la inspección, mientras que unas hasty o messy no.",
    },
  },
  {
    id: 'wk10', s: 'WK',
    q: "Ambiguous most nearly means:",
    qes: "Elija el sinónimo más cercano de la palabra en inglés «ambiguous».",
    o: ["Certain", "Unclear", "Ambitious", "Hostile"], a: 1,
    why: {
      en: "Ambiguous describes something that can be understood in more than one way. Unclear is the closest meaning. Ambitious only looks similar.",
      es: "Ambiguous describe algo que puede entenderse de más de una manera. Unclear es el significado más cercano. Ambitious solo se parece en la forma.",
    },
  },

  // ---------- PC : Paragraph Comprehension ----------
  {
    id: 'pc1', s: 'PC',
    q: "Before a long road march, soldiers are told to break in new boots for at least two weeks. Stiff leather rubs against the heel and causes blisters, which can become infected. Wearing two pairs of thin socks also reduces friction. The main purpose of this passage is to:",
    qes: "¿Cuál es el propósito principal del texto? (el texto está en inglés, como en el examen)",
    o: ["Explain how to prevent blisters", "Compare types of leather", "Describe a road march route", "Warn against wearing socks"], a: 0,
    why: {
      en: "Both pieces of advice, breaking in boots and wearing two thin pairs of socks, aim to stop blisters. The passage never compares leathers or describes a route.",
      es: "Los dos consejos, ablandar las botas y usar dos pares de calcetines finos, buscan evitar ampollas. El texto no compara cueros ni describe una ruta.",
    },
  },
  {
    id: 'pc2', s: 'PC',
    q: "The town council voted to close Main Street to cars every Saturday from May through September. Local shop owners had asked for the change after a trial run last summer increased foot traffic and sales. Delivery trucks may still use the street before 9 a.m. According to the passage, why did shop owners support the closure?",
    qes: "Según el texto, ¿por qué los dueños de tiendas apoyaron el cierre de la calle? (el texto está en inglés, como en el examen)",
    o: ["Trucks blocked their entrances", "A trial run raised their sales", "The council offered tax cuts", "Parking had become too costly"], a: 1,
    why: {
      en: "The passage states that owners asked for the change after a trial run last summer increased foot traffic and sales. The other choices are never mentioned.",
      es: "El texto dice que los dueños pidieron el cambio después de que una prueba el verano pasado aumentara el paso de peatones y las ventas. Lo demás no se menciona.",
    },
  },
  {
    id: 'pc3', s: 'PC',
    q: "Maria checked the weather report twice, packed an extra layer, and left an hour earlier than usual. Even so, she arrived at the trailhead to find the gate closed and a ranger turning hikers away because of ice on the upper trail. It can be inferred that Maria:",
    qes: "¿Qué se puede deducir sobre Maria? (el texto está en inglés, como en el examen)",
    o: ["Forgot to check the weather", "Worked as a park ranger", "Could not hike the trail that day", "Preferred to hike alone"], a: 2,
    why: {
      en: "The gate was closed and the ranger was turning hikers away, so Maria could not hike that trail. She checked the weather twice, so the first choice is wrong.",
      es: "La entrada estaba cerrada y el guardabosques no dejaba pasar a nadie, así que Maria no pudo hacer la caminata. Revisó el clima dos veces, así que la primera opción es falsa.",
    },
  },
  {
    id: 'pc4', s: 'PC',
    q: "Early radio sets were bulky and costly, so a family often owned only one. In the evening, relatives gathered around it to hear news and comedy shows. The radio became the focal point of the living room, much as the television would later. As used in the passage, 'focal point' most nearly means:",
    qes: "En el texto, ¿qué significa más o menos la expresión 'focal point'? (el texto está en inglés, como en el examen)",
    o: ["Weakest part", "Loudest object", "Center of attention", "Oldest furniture"], a: 2,
    why: {
      en: "Relatives gathered around the radio every evening, so it was the center of attention in the room. The comparison with television supports this meaning.",
      es: "Los familiares se reunían cada noche alrededor de la radio, así que era el centro de atención de la sala. La comparación con la televisión confirma este sentido.",
    },
  },
  {
    id: 'pc5', s: 'PC',
    q: "Many people believe that cracking knuckles causes arthritis. Researchers who compared lifelong knuckle crackers with people who never cracked their knuckles found no difference in arthritis rates between the two groups. The popping sound comes from gas bubbles in the fluid that surrounds the joints. The passage suggests that:",
    qes: "¿Qué sugiere el texto? (el texto está en inglés, como en el examen)",
    o: ["Knuckle cracking damages joints", "Gas bubbles cause arthritis", "Doctors advise against cracking", "A common belief lacks support"], a: 3,
    why: {
      en: "The passage opens with a popular belief and then reports research finding no difference in arthritis rates. That means the belief is not supported by evidence.",
      es: "El texto empieza con una creencia popular y luego cita una investigación que no encontró diferencias en la artritis. Por lo tanto, la creencia no tiene respaldo.",
    },
  },
  {
    id: 'pc6', s: 'PC',
    q: "To change a flat tire, first set the parking brake and loosen the lug nuts slightly while the wheel is still on the ground. Next, raise the vehicle with the jack. Then remove the nuts, swap the wheel, and tighten the nuts in a star pattern. According to the passage, what should be done before raising the vehicle?",
    qes: "Según el texto, ¿qué se debe hacer antes de levantar el vehículo? (el texto está en inglés, como en el examen)",
    o: ["Remove the lug nuts", "Tighten the nuts in a star pattern", "Swap the wheel", "Loosen the lug nuts slightly"], a: 3,
    why: {
      en: "The first step, done while the wheel is still on the ground, is to set the brake and loosen the lug nuts slightly. Removing and tightening come after the jack.",
      es: "El primer paso, con la rueda todavía en el suelo, es poner el freno y aflojar un poco las tuercas. Quitarlas y apretarlas viene después de usar el gato.",
    },
  },
  {
    id: 'pc7', s: 'PC',
    q: "Honeybees communicate the location of food through a movement called the waggle dance. The angle of the dance shows the direction of the flowers relative to the sun, and the length of the waggle run tells other bees how far away the food is. According to the passage, the length of the waggle run indicates:",
    qes: "Según el texto, ¿qué indica la duración del recorrido de la danza? (el texto está en inglés, como en el examen)",
    o: ["The distance to the food", "The type of flower", "The time of day", "The number of flowers"], a: 0,
    why: {
      en: "The passage says the length of the waggle run tells other bees how far away the food is, which is the distance. The angle gives the direction.",
      es: "El texto dice que la duración del recorrido indica a las otras abejas a qué distancia está el alimento. El ángulo indica la dirección.",
    },
  },
  {
    id: 'pc8', s: 'PC',
    q: "The library will extend its hours during final exam week. From Monday to Thursday it will stay open until midnight instead of 9 p.m. Weekend hours will not change. Students must show a valid ID to enter after 9 p.m. A student who arrives at 10 p.m. on Wednesday of exam week must:",
    qes: "Un estudiante que llega a las 10 p.m. el miércoles de la semana de exámenes debe: (el texto está en inglés, como en el examen)",
    o: ["Wait until the next morning", "Show a valid ID", "Pay a late fee", "Enter with a librarian"], a: 1,
    why: {
      en: "On Wednesday the library is open until midnight, so the student can enter, but anyone entering after 9 p.m. must show a valid ID.",
      es: "El miércoles la biblioteca abre hasta la medianoche, así que el estudiante puede entrar, pero quien entra después de las 9 p.m. debe mostrar una identificación válida.",
    },
  },
  {
    id: 'pc9', s: 'PC',
    q: "Volunteers spent three weekends clearing trash from the riverbank. They filled more than 200 bags and removed four old tires. Thanks to their effort, the city has agreed to install new trash bins along the trail and to schedule monthly cleanups. What was one result of the volunteers' work?",
    qes: "¿Cuál fue un resultado del trabajo de los voluntarios? (el texto está en inglés, como en el examen)",
    o: ["The city agreed to add trash bins", "The trail was closed", "The volunteers were paid", "Four new tires were bought"], a: 0,
    why: {
      en: "The last sentence says that, thanks to the volunteers, the city agreed to install new trash bins and schedule monthly cleanups. The tires were removed, not bought.",
      es: "La última oración dice que, gracias a los voluntarios, la ciudad aceptó instalar botes de basura y programar limpiezas mensuales. Las llantas se retiraron, no se compraron.",
    },
  },
  {
    id: 'pc10', s: 'PC',
    q: "Some employers now offer a four-day workweek with ten-hour days. Supporters say a three-day weekend improves morale and cuts commuting costs. Critics point out that long shifts can cause fatigue, especially in jobs that require constant attention, such as operating heavy equipment. Which statement best describes the passage?",
    qes: "¿Qué afirmación describe mejor el texto? (el texto está en inglés, como en el examen)",
    o: ["It urges all jobs to adopt it", "It explains how to run heavy machines", "It shows commuting costs are rising", "It gives views for and against a schedule"], a: 3,
    why: {
      en: "The passage gives the supporters' arguments, morale and commuting costs, then the critics' concern about fatigue. It presents both sides without taking a position.",
      es: "El texto presenta los argumentos a favor, la moral y el costo de transporte, y luego la preocupación de los críticos por el cansancio. Muestra ambos lados sin opinar.",
    },
  },

  // ---------- MK : Mathematics Knowledge ----------
  {
    id: 'mk1', s: 'MK',
    q: "If 3x + 7 = 25, what is the value of x?",
    qes: "Si 3x + 7 = 25, ¿cuál es el valor de x?",
    o: ["6", "4", "8", "5"], a: 0,
    why: {
      en: "Subtract 7 from both sides: 3x = 25 - 7 = 18. Then divide by 3: x = 18 / 3 = 6. Check: 3 x 6 + 7 = 25.",
      es: "Reste 7 de ambos lados: 3x = 25 - 7 = 18. Luego divida entre 3: x = 18 / 3 = 6. Comprobación: 3 x 6 + 7 = 25.",
    },
  },
  {
    id: 'mk2', s: 'MK',
    q: "What is the value of 2 raised to the fifth power (2^5)?",
    qes: "¿Cuál es el valor de 2 elevado a la quinta potencia (2^5)?",
    o: ["10", "25", "32", "64"], a: 2,
    why: {
      en: "An exponent means repeated multiplication: 2 x 2 x 2 x 2 x 2 = 32. The answer 10 comes from wrongly multiplying 2 by 5.",
      es: "Un exponente indica multiplicación repetida: 2 x 2 x 2 x 2 x 2 = 32. La opción 10 viene de multiplicar 2 por 5, lo cual es un error.",
    },
  },
  {
    id: 'mk3', s: 'MK',
    q: "What is the area of a circle with a radius of 4 inches? (Answer in terms of pi.)",
    qes: "¿Cuál es el área de un círculo con un radio de 4 pulgadas? (Responda en términos de pi.)",
    o: ["8π sq in", "16π sq in", "4π sq in", "64π sq in"], a: 1,
    why: {
      en: "The area of a circle is A = π r^2. With r = 4, A = π x 4^2 = 16π square inches. 8π is the circumference, not the area.",
      es: "El área de un círculo es A = π r^2. Con r = 4, A = π x 4^2 = 16π pulgadas cuadradas. 8π es la circunferencia, no el área.",
    },
  },
  {
    id: 'mk4', s: 'MK',
    q: "What is 3/4 + 2/3?",
    qes: "¿Cuánto es 3/4 + 2/3?",
    o: ["5/7", "5/12", "1 1/2", "17/12"], a: 3,
    why: {
      en: "Use the common denominator 12: 3/4 = 9/12 and 2/3 = 8/12. Then 9/12 + 8/12 = 17/12, which equals 1 5/12.",
      es: "Use el denominador común 12: 3/4 = 9/12 y 2/3 = 8/12. Entonces 9/12 + 8/12 = 17/12, que equivale a 1 5/12.",
    },
  },
  {
    id: 'mk5', s: 'MK',
    q: "A right triangle has legs of 6 feet and 8 feet. What is the length of the hypotenuse?",
    qes: "Un triángulo rectángulo tiene catetos de 6 pies y 8 pies. ¿Cuánto mide la hipotenusa?",
    o: ["14 feet", "12 feet", "10 feet", "9 feet"], a: 2,
    why: {
      en: "By the Pythagorean theorem, c^2 = 6^2 + 8^2 = 36 + 64 = 100, so c = 10 feet. This is a 3-4-5 triangle doubled.",
      es: "Por el teorema de Pitágoras, c^2 = 6^2 + 8^2 = 36 + 64 = 100, así que c = 10 pies. Es un triángulo 3-4-5 multiplicado por dos.",
    },
  },
  {
    id: 'mk6', s: 'MK',
    q: "Simplify (x^3)(x^4).",
    qes: "Simplifique (x^3)(x^4).",
    o: ["x^12", "x^7", "2x^7", "x^1"], a: 1,
    why: {
      en: "When multiplying powers with the same base, add the exponents: x^3 x x^4 = x^(3 + 4) = x^7. Multiplying exponents, x^12, applies to a power raised to a power.",
      es: "Al multiplicar potencias de la misma base se suman los exponentes: x^3 por x^4 = x^(3 + 4) = x^7. Multiplicar exponentes, x^12, aplica a una potencia elevada a otra.",
    },
  },
  {
    id: 'mk7', s: 'MK',
    q: "Solve for x: x^2 - 5x + 6 = 0.",
    qes: "Resuelva para x: x^2 - 5x + 6 = 0.",
    o: ["x = 2 or x = 3", "x = -2 or x = -3", "x = 1 or x = 6", "x = -1 or x = 6"], a: 0,
    why: {
      en: "Factor the equation: x^2 - 5x + 6 = (x - 2)(x - 3) = 0, so x = 2 or x = 3. Check: 4 - 10 + 6 = 0 and 9 - 15 + 6 = 0.",
      es: "Factorice la ecuación: x^2 - 5x + 6 = (x - 2)(x - 3) = 0, luego x = 2 o x = 3. Prueba: 4 - 10 + 6 = 0 y 9 - 15 + 6 = 0.",
    },
  },
  {
    id: 'mk8', s: 'MK',
    q: "What is the sum of the interior angles of a hexagon (a six-sided polygon)?",
    qes: "¿Cuál es la suma de los ángulos interiores de un hexágono (un polígono de seis lados)?",
    o: ["540°", "360°", "1,080°", "720°"], a: 3,
    why: {
      en: "The sum of interior angles of an n-sided polygon is (n - 2) x 180°. For a hexagon, (6 - 2) x 180° = 4 x 180° = 720°.",
      es: "La suma de los ángulos interiores de un polígono de n lados es (n - 2) x 180°. Para un hexágono, (6 - 2) x 180° = 4 x 180° = 720°.",
    },
  },
  {
    id: 'mk9', s: 'MK',
    q: "Which describes all values of x that satisfy 2(x - 3) > 4x + 2?",
    qes: "¿Qué describe todos los valores de x que cumplen 2(x - 3) > 4x + 2?",
    o: ["x > -4", "x < -4", "x < 4", "x > 4"], a: 1,
    why: {
      en: "Expand: 2x - 6 > 4x + 2. Subtract 2x and 2: -8 > 2x. Divide by 2: -4 > x, so x < -4. Check x = -5: -16 > -18 is true.",
      es: "Desarrolle: 2x - 6 > 4x + 2. Reste 2x y 2: -8 > 2x. Divida entre 2: -4 > x, es decir x < -4. Con x = -5: -16 > -18 es verdadero.",
    },
  },
  {
    id: 'mk10', s: 'MK',
    q: "A rectangular box measures 5 inches by 4 inches by 3 inches. What is its volume?",
    qes: "Una caja rectangular mide 5 pulgadas por 4 pulgadas por 3 pulgadas. ¿Cuál es su volumen?",
    o: ["12 cu in", "47 cu in", "60 cu in", "94 cu in"], a: 2,
    why: {
      en: "Volume = length x width x height = 5 x 4 x 3 = 60 cubic inches. The choice 94 is the surface area, 2 x (20 + 15 + 12).",
      es: "Volumen = largo x ancho x alto = 5 x 4 x 3 = 60 pulgadas cúbicas. La opción 94 es el área de la superficie, 2 x (20 + 15 + 12).",
    },
  },

  // ---------- EI : Electronics Information ----------
  {
    id: 'ei1', s: 'EI',
    q: "A 12-volt battery is connected across a 4-ohm resistor. How much current flows?",
    qes: "Una batería de 12 voltios se conecta a una resistencia de 4 ohmios. ¿Cuánta corriente circula?",
    o: ["48 amps", "3 amps", "0.33 amps", "16 amps"], a: 1,
    why: {
      en: "Ohm's law gives current as voltage divided by resistance: I = V / R = 12 V / 4 ohms = 3 amps. 48 comes from wrongly multiplying.",
      es: "La ley de Ohm da la corriente como voltaje dividido entre resistencia: I = V / R = 12 V / 4 ohmios = 3 amperios. 48 sale de multiplicar por error.",
    },
  },
  {
    id: 'ei2', s: 'EI',
    q: "A 6-ohm resistor and a 3-ohm resistor are connected in parallel. What is the total resistance?",
    qes: "Una resistencia de 6 ohmios y otra de 3 ohmios se conectan en paralelo. ¿Cuál es la resistencia total?",
    o: ["9 ohms", "4.5 ohms", "2 ohms", "18 ohms"], a: 2,
    why: {
      en: "For two resistors in parallel, R = (R1 x R2) / (R1 + R2) = (6 x 3) / (6 + 3) = 18 / 9 = 2 ohms, less than the smallest resistor.",
      es: "Para dos resistencias en paralelo, R = (R1 x R2) / (R1 + R2) = (6 x 3) / (6 + 3) = 18 / 9 = 2 ohmios, menos que la resistencia más pequeña.",
    },
  },
  {
    id: 'ei3', s: 'EI',
    q: "Which unit is used to measure electrical power?",
    qes: "¿Qué unidad se usa para medir la potencia eléctrica?",
    o: ["Watt", "Ohm", "Farad", "Henry"], a: 0,
    why: {
      en: "Power is measured in watts, equal to volts times amps. The ohm measures resistance, the farad measures capacitance and the henry measures inductance.",
      es: "La potencia se mide en vatios, que equivalen a voltios por amperios. El ohmio mide resistencia, el faradio capacitancia y el henrio inductancia.",
    },
  },
  {
    id: 'ei4', s: 'EI',
    q: "Which of these materials is the best conductor of electricity?",
    qes: "¿Cuál de estos materiales es el mejor conductor de la electricidad?",
    o: ["Rubber", "Glass", "Dry wood", "Silver"], a: 3,
    why: {
      en: "Silver has the highest electrical conductivity of any metal, slightly above copper. Rubber, glass and dry wood are insulators that block current.",
      es: "La plata tiene la mayor conductividad eléctrica de todos los metales, un poco más que el cobre. El caucho, el vidrio y la madera seca son aislantes.",
    },
  },
  {
    id: 'ei5', s: 'EI',
    q: "Which component allows current to flow in only one direction?",
    qes: "¿Qué componente permite que la corriente circule en un solo sentido?",
    o: ["Capacitor", "Diode", "Resistor", "Inductor"], a: 1,
    why: {
      en: "A diode conducts when forward biased and blocks current when reverse biased. That one-way behavior is used to turn AC into DC in rectifiers.",
      es: "Un diodo conduce cuando está polarizado en directa y bloquea la corriente en inversa. Ese comportamiento en un solo sentido sirve para convertir CA en CC en los rectificadores.",
    },
  },
  {
    id: 'ei6', s: 'EI',
    q: "A space heater draws 5 amps from a 120-volt outlet. How much power does it use?",
    qes: "Un calentador eléctrico consume 5 amperios de un tomacorriente de 120 voltios. ¿Cuánta potencia usa?",
    o: ["24 watts", "125 watts", "600 watts", "115 watts"], a: 2,
    why: {
      en: "Power equals voltage times current: P = V x I = 120 V x 5 A = 600 watts. 24 comes from dividing 120 by 5 instead.",
      es: "La potencia es igual al voltaje por la corriente: P = V x I = 120 V x 5 A = 600 vatios. La opción 24 resulta de dividir 120 entre 5.",
    },
  },
  {
    id: 'ei7', s: 'EI',
    q: "Three 10-ohm resistors are connected in series. What is the total resistance?",
    qes: "Tres resistencias de 10 ohmios se conectan en serie. ¿Cuál es la resistencia total?",
    o: ["30 ohms", "3.3 ohms", "10 ohms", "13 ohms"], a: 0,
    why: {
      en: "Resistances in series simply add: 10 + 10 + 10 = 30 ohms. About 3.3 ohms would be the total if the three were in parallel.",
      es: "Las resistencias en serie simplemente se suman: 10 + 10 + 10 = 30 ohmios. Unos 3.3 ohmios sería el total si las tres estuvieran en paralelo.",
    },
  },
  {
    id: 'ei8', s: 'EI',
    q: "A standard household wall outlet in the United States supplies about:",
    qes: "Un tomacorriente doméstico estándar en Estados Unidos suministra aproximadamente:",
    o: ["12 volts DC", "240 volts DC", "120 volts AC", "50 volts AC"], a: 2,
    why: {
      en: "U.S. homes receive alternating current at about 120 volts and 60 hertz for ordinary outlets. Larger appliances such as dryers use 240 volts AC, not DC.",
      es: "Los hogares de Estados Unidos reciben corriente alterna de unos 120 voltios y 60 hercios en los tomacorrientes comunes. Aparatos grandes como secadoras usan 240 voltios de CA.",
    },
  },
  {
    id: 'ei9', s: 'EI',
    q: "Which component stores energy in an electric field between two plates?",
    qes: "¿Qué componente almacena energía en un campo eléctrico entre dos placas?",
    o: ["Fuse", "Transformer", "Switch", "Capacitor"], a: 3,
    why: {
      en: "A capacitor has two conductive plates separated by an insulator, and it stores charge in the electric field between them. An inductor stores energy in a magnetic field.",
      es: "Un capacitor tiene dos placas conductoras separadas por un aislante y almacena carga en el campo eléctrico entre ellas. Un inductor almacena energía en un campo magnético.",
    },
  },
  {
    id: 'ei10', s: 'EI',
    q: "An ideal transformer has 100 turns on its primary coil and 500 turns on its secondary coil. If 24 volts AC is applied to the primary, what is the secondary voltage?",
    qes: "Un transformador ideal tiene 100 vueltas en la bobina primaria y 500 vueltas en la secundaria. Si se aplican 24 voltios de CA al primario, ¿cuál es el voltaje del secundario?",
    o: ["4.8 volts", "120 volts", "24 volts", "600 volts"], a: 1,
    why: {
      en: "Voltage scales with the turns ratio: Vs = Vp x (Ns / Np) = 24 x (500 / 100) = 24 x 5 = 120 volts. This is a step-up transformer.",
      es: "El voltaje cambia según la relación de vueltas: Vs = Vp x (Ns / Np) = 24 x (500 / 100) = 24 x 5 = 120 voltios. Es un transformador elevador.",
    },
  },

  // ---------- AS : Auto and Shop Information ----------
  {
    id: 'as1', s: 'AS',
    q: "What is the correct order of the strokes in a four-stroke gasoline engine?",
    qes: "¿Cuál es el orden correcto de los tiempos en un motor de gasolina de cuatro tiempos?",
    o: ["Compression, intake, exhaust, power", "Intake, power, compression, exhaust", "Intake, compression, power, exhaust", "Power, intake, exhaust, compression"], a: 2,
    why: {
      en: "The piston first draws in the air-fuel mixture (intake), squeezes it (compression), is pushed down after the spark ignites it (power), then pushes out burned gases (exhaust).",
      es: "El pistón primero aspira la mezcla de aire y combustible (admisión), la comprime (compresión), baja empujado tras la chispa (potencia) y luego expulsa los gases (escape).",
    },
  },
  {
    id: 'as2', s: 'AS',
    q: "Which tool is used to check the gap of a spark plug or a valve clearance?",
    qes: "¿Qué herramienta se usa para revisar la separación de una bujía o el juego de las válvulas?",
    o: ["Feeler gauge", "Torque wrench", "Pipe wrench", "Hacksaw"], a: 0,
    why: {
      en: "A feeler gauge is a set of thin steel blades of known thickness. Sliding the right blade into the gap shows whether the clearance meets specification.",
      es: "Una galga de espesores es un juego de láminas de acero de grosor conocido. Al deslizar la lámina correcta en la separación, se ve si cumple la especificación.",
    },
  },
  {
    id: 'as3', s: 'AS',
    q: "What is the main job of a catalytic converter?",
    qes: "¿Cuál es la función principal de un convertidor catalítico?",
    o: ["Reduce harmful exhaust emissions", "Cool the engine coolant", "Raise fuel pressure", "Charge the battery"], a: 0,
    why: {
      en: "The catalytic converter uses metals such as platinum to turn carbon monoxide, unburned hydrocarbons and nitrogen oxides into less harmful gases before they leave the tailpipe.",
      es: "El convertidor catalítico usa metales como el platino para transformar monóxido de carbono, hidrocarburos sin quemar y óxidos de nitrógeno en gases menos dañinos.",
    },
  },
  {
    id: 'as4', s: 'AS',
    q: "A coping saw is mainly used for:",
    qes: "Una sierra de calar manual (coping saw) se usa principalmente para:",
    o: ["Cutting thick metal pipe", "Cutting curves in thin wood", "Ripping long boards", "Trimming concrete"], a: 1,
    why: {
      en: "A coping saw has a very thin blade held in a C-shaped frame, which lets it follow tight curves and intricate shapes in thin wood or molding.",
      es: "Una coping saw tiene una hoja muy delgada sujeta en un marco en forma de C, que le permite seguir curvas cerradas y formas detalladas en madera delgada.",
    },
  },
  {
    id: 'as5', s: 'AS',
    q: "What is the main function of the alternator in a car?",
    qes: "¿Cuál es la función principal del alternador en un automóvil?",
    o: ["Starts the engine", "Mixes fuel and air", "Controls the steering", "Charges the battery while running"], a: 3,
    why: {
      en: "Driven by a belt from the engine, the alternator produces electricity that recharges the battery and powers the lights and electronics. The starter motor cranks the engine.",
      es: "Movido por una correa del motor, el alternador produce electricidad que recarga la batería y alimenta las luces y la electrónica. El motor de arranque es el que pone en marcha el motor.",
    },
  },
  {
    id: 'as6', s: 'AS',
    q: "Which tool is used to tighten a bolt to a specific, measured amount of twisting force?",
    qes: "¿Qué herramienta se usa para apretar un perno con una fuerza de giro específica y medida?",
    o: ["Torque wrench", "Locking pliers", "Ball-peen hammer", "Hex key"], a: 0,
    why: {
      en: "A torque wrench measures twisting force, usually in foot-pounds or newton-meters, so bolts such as lug nuts or cylinder head bolts are tightened to specification.",
      es: "Una llave dinamométrica mide la fuerza de giro, normalmente en libras-pie o newton-metro, para apretar pernos como las tuercas de rueda según la especificación.",
    },
  },
  {
    id: 'as7', s: 'AS',
    q: "In a diesel engine, what ignites the fuel in the cylinder?",
    qes: "En un motor diésel, ¿qué enciende el combustible dentro del cilindro?",
    o: ["Spark plugs", "Hot exhaust gases", "Heat of compressed air", "A magneto"], a: 2,
    why: {
      en: "Diesel engines compress air so tightly that it becomes hot enough to ignite fuel as soon as it is injected. Gasoline engines use spark plugs instead.",
      es: "Los motores diésel comprimen tanto el aire que se calienta lo suficiente para encender el combustible en cuanto se inyecta. Los motores de gasolina usan bujías.",
    },
  },
  {
    id: 'as8', s: 'AS',
    q: "Blue-gray smoke coming from a car's exhaust most likely means the engine is:",
    qes: "Un humo gris azulado que sale del escape de un auto probablemente indica que el motor está:",
    o: ["Running a rich fuel mixture", "Burning oil", "Leaking coolant into cylinders", "Low on transmission fluid"], a: 1,
    why: {
      en: "Blue-gray smoke usually means oil is burning, often from worn piston rings or valve seals. Black smoke points to a rich mixture, and thick white smoke to coolant.",
      es: "El humo gris azulado suele indicar que se quema aceite, a menudo por anillos o sellos de válvula gastados. El humo negro indica mezcla rica y el blanco espeso, refrigerante.",
    },
  },
  {
    id: 'as9', s: 'AS',
    q: "A Phillips screwdriver is designed to fit screws with:",
    qes: "Un destornillador Phillips está diseñado para tornillos con:",
    o: ["A single straight slot", "A hexagonal socket", "A six-point star recess", "A cross-shaped recess"], a: 3,
    why: {
      en: "Phillips screws have a cross-shaped recess. A single slot takes a flat-blade screwdriver, a hexagonal socket takes a hex key, and a star recess takes a Torx driver.",
      es: "Los tornillos Phillips tienen una ranura en cruz. Una ranura recta usa destornillador plano, un hueco hexagonal usa llave Allen y una estrella usa punta Torx.",
    },
  },
  {
    id: 'as10', s: 'AS',
    q: "Which sandpaper grit gives the smoothest, finest finish?",
    qes: "¿Qué grano de papel de lija da el acabado más liso y fino?",
    o: ["60 grit", "80 grit", "120 grit", "220 grit"], a: 3,
    why: {
      en: "Higher grit numbers mean smaller abrasive particles. 220 grit is used for final smoothing, while 60 grit is coarse and removes material quickly.",
      es: "Un número de grano más alto significa partículas abrasivas más pequeñas. El grano 220 se usa para el acabado final, mientras que el 60 es grueso y quita material rápido.",
    },
  },

  // ---------- MC : Mechanical Comprehension ----------
  {
    id: 'mc1', s: 'MC',
    q: "A 150-pound load sits on a lever 2 feet from the fulcrum. How much force must be applied on the other side, 6 feet from the fulcrum, to balance it?",
    qes: "Una carga de 150 libras está sobre una palanca a 2 pies del punto de apoyo. ¿Qué fuerza hay que aplicar del otro lado, a 6 pies del punto de apoyo, para equilibrarla?",
    o: ["75 lb", "50 lb", "300 lb", "25 lb"], a: 1,
    why: {
      en: "Balance the moments: load x load distance = effort x effort distance. 150 x 2 = effort x 6, so effort = 300 / 6 = 50 pounds.",
      es: "Iguale los momentos: carga x distancia de la carga = esfuerzo x distancia del esfuerzo. 150 x 2 = esfuerzo x 6, así que el esfuerzo = 300 / 6 = 50 libras.",
    },
  },
  {
    id: 'mc2', s: 'MC',
    q: "Gear A has 20 teeth and drives gear B, which has 40 teeth. If gear A turns at 120 rpm, how fast does gear B turn?",
    qes: "El engranaje A tiene 20 dientes y mueve al engranaje B, que tiene 40 dientes. Si A gira a 120 rpm, ¿a qué velocidad gira B?",
    o: ["60 rpm", "240 rpm", "120 rpm", "30 rpm"], a: 0,
    why: {
      en: "Speed is inversely proportional to the number of teeth: rpm B = 120 x (20 / 40) = 60 rpm. The larger driven gear turns slower but with more torque.",
      es: "La velocidad es inversamente proporcional al número de dientes: rpm de B = 120 x (20 / 40) = 60 rpm. El engranaje mayor gira más lento pero con más par.",
    },
  },
  {
    id: 'mc3', s: 'MC',
    q: "Gear A turns clockwise and meshes with gear B. Gear B meshes with gear C. All three are in a single row. In which direction does gear C turn?",
    qes: "El engranaje A gira en el sentido de las agujas del reloj y engrana con B. B engrana con C. Los tres están en una sola fila. ¿En qué sentido gira C?",
    o: ["Counterclockwise", "It does not turn", "Clockwise", "Back and forth"], a: 2,
    why: {
      en: "Each pair of meshing gears turns in opposite directions. A is clockwise, so B is counterclockwise, and C is clockwise again, the same as A.",
      es: "Cada par de engranajes acoplados gira en sentidos opuestos. A gira en sentido horario, B en sentido antihorario y C de nuevo en sentido horario, igual que A.",
    },
  },
  {
    id: 'mc4', s: 'MC',
    q: "A block and tackle has 4 rope segments supporting a 400-pound load. Ignoring friction, how much pull is needed to lift the load?",
    qes: "Un aparejo de poleas tiene 4 tramos de cuerda que sostienen una carga de 400 libras. Sin contar la fricción, ¿cuánta fuerza se necesita para levantarla?",
    o: ["400 lb", "200 lb", "50 lb", "100 lb"], a: 3,
    why: {
      en: "The ideal mechanical advantage equals the number of supporting rope segments, here 4. Effort = 400 / 4 = 100 pounds, but the rope must be pulled 4 times as far.",
      es: "La ventaja mecánica ideal es igual al número de tramos de cuerda que sostienen la carga, aquí 4. Esfuerzo = 400 / 4 = 100 libras, pero hay que jalar 4 veces más cuerda.",
    },
  },
  {
    id: 'mc5', s: 'MC',
    q: "A force of 300 pounds is spread evenly over an area of 15 square inches. What is the pressure?",
    qes: "Una fuerza de 300 libras se reparte de manera uniforme sobre un área de 15 pulgadas cuadradas. ¿Cuál es la presión?",
    o: ["20 psi", "45 psi", "4,500 psi", "285 psi"], a: 0,
    why: {
      en: "Pressure equals force divided by area: P = 300 lb / 15 sq in = 20 pounds per square inch. Multiplying instead would give the wrong answer 4,500.",
      es: "La presión es igual a la fuerza dividida entre el área: P = 300 lb / 15 pulg² = 20 libras por pulgada cuadrada. Multiplicar daría la opción errónea 4,500.",
    },
  },
  {
    id: 'mc6', s: 'MC',
    q: "In a hydraulic jack, the small piston has an area of 2 square inches and the large piston 20 square inches. If 50 pounds pushes on the small piston, what force does the large piston exert?",
    qes: "En un gato hidráulico, el pistón pequeño tiene 2 pulgadas cuadradas y el grande 20 pulgadas cuadradas. Si se empuja el pequeño con 50 libras, ¿qué fuerza ejerce el grande?",
    o: ["5 lb", "100 lb", "500 lb", "1,000 lb"], a: 2,
    why: {
      en: "Pressure is the same throughout the fluid: 50 / 2 = 25 psi. The large piston exerts 25 psi x 20 sq in = 500 pounds, a tenfold gain in force.",
      es: "La presión es la misma en todo el fluido: 50 / 2 = 25 psi. El pistón grande ejerce 25 psi x 20 pulg² = 500 libras, diez veces más fuerza.",
    },
  },
  {
    id: 'mc7', s: 'MC',
    q: "A ramp is 12 feet long and rises 3 feet. Ignoring friction, how much force is needed to push a 240-pound crate up the ramp?",
    qes: "Una rampa mide 12 pies de largo y sube 3 pies. Sin contar la fricción, ¿cuánta fuerza se necesita para empujar una caja de 240 libras por la rampa?",
    o: ["80 lb", "60 lb", "20 lb", "960 lb"], a: 1,
    why: {
      en: "Work in equals work out: effort x ramp length = weight x height. Effort x 12 = 240 x 3 = 720, so effort = 720 / 12 = 60 pounds.",
      es: "El trabajo aplicado es igual al trabajo obtenido: esfuerzo x largo de la rampa = peso x altura. Esfuerzo x 12 = 240 x 3 = 720, así que esfuerzo = 720 / 12 = 60 libras.",
    },
  },
  {
    id: 'mc8', s: 'MC',
    q: "How much work is done in lifting a 50-pound box straight up a distance of 8 feet?",
    qes: "¿Cuánto trabajo se realiza al levantar una caja de 50 libras en línea recta a una altura de 8 pies?",
    o: ["58 ft-lb", "6.25 ft-lb", "42 ft-lb", "400 ft-lb"], a: 3,
    why: {
      en: "Work equals force times distance moved in the direction of the force: W = 50 lb x 8 ft = 400 foot-pounds.",
      es: "El trabajo es igual a la fuerza por la distancia recorrida en la dirección de la fuerza: W = 50 lb x 8 pies = 400 libras-pie.",
    },
  },
  {
    id: 'mc9', s: 'MC',
    q: "A wheel and axle has a wheel radius of 15 inches and an axle radius of 3 inches. What is its ideal mechanical advantage when force is applied to the wheel?",
    qes: "Una rueda y eje tiene una rueda de 15 pulgadas de radio y un eje de 3 pulgadas de radio. ¿Cuál es su ventaja mecánica ideal si la fuerza se aplica en la rueda?",
    o: ["5", "12", "18", "45"], a: 0,
    why: {
      en: "The ideal mechanical advantage of a wheel and axle is the wheel radius divided by the axle radius: 15 / 3 = 5. A small force on the rim moves five times the load.",
      es: "La ventaja mecánica ideal de una rueda y eje es el radio de la rueda dividido entre el radio del eje: 15 / 3 = 5. Una fuerza pequeña en el borde mueve cinco veces la carga.",
    },
  },
  {
    id: 'mc10', s: 'MC',
    q: "In a wheelbarrow, the wheel is the fulcrum, the load sits in the middle and you lift the handles. What class of lever is it?",
    qes: "En una carretilla, la rueda es el punto de apoyo, la carga va en el medio y usted levanta las manijas. ¿Qué clase de palanca es?",
    o: ["First-class", "Third-class", "Second-class", "Fourth-class"], a: 2,
    why: {
      en: "A second-class lever has the load between the fulcrum and the effort, as in a wheelbarrow or nutcracker. A first-class lever puts the fulcrum in the middle.",
      es: "Una palanca de segunda clase tiene la carga entre el punto de apoyo y el esfuerzo, como una carretilla o un cascanueces. En la de primera clase el apoyo está en el medio.",
    },
  },
];
