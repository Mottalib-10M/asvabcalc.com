/**
 * Les simulateurs du site, en anglais et en espagnol. Chaque chiffre vient du moteur src/lib/engine/asvab.ts
 * (tables de conversion de 1997, formules publiées) et de params-2026.json. Une spec liste ses champs
 * (visibles d'abord, `adv` repliés) et une fonction pure `run` qui rend la carte de résultat.
 */
import type { ToolSpec, V, Input, Opt } from './tool-types';
import { resolve } from './tool-types';
import { formatNumber, formatPercent, displayDate, type Lang } from './format';
import P from '../data/params-2026.json';
import JOBS from '../data/af-jobs.json';
import { QUESTIONS, type QSub } from '../data/questions';
import {
  afqt, afqtSum, category, veFromWkPc, mage, marines, army, armyGt, sumForPercentile, minimumFor, shareAbove,
  rawSum, nextRetest, addDays, addMonths, addYears, daysBetween, BRANCHES, RULES, ARMY_KEYS, MAGE_PARTS, MARINE_PARTS,
  type Scores, type Sub, type Branch,
} from './engine/asvab';
import { LAST_UPDATED } from '../data/site-config';

export type Args = Record<string, number | string>;
const T = (l: Lang, en: string, es: string) => (l === 'es' ? es : en);
const n = (v: V, k: string) => Number(v[k]) || 0;
const s = (v: V, k: string) => String(v[k]);
const num = (x: number, l: Lang, d = 0) => formatNumber(x, d, l);
const pc = (x: number, l: Lang, d = 0) => formatPercent(x, d, l);
const day = (iso: string, l: Lang) => displayDate(iso, l === 'es' ? 'es-US' : 'en-US');
const ord = (x: number, l: Lang) => (l === 'es' ? `percentil ${x}` : `${x}th percentile`.replace(/^(\d*1)th/, (m, a) => (a.endsWith('11') ? m : `${a}st`)).replace(/^(\d*2)th/, (m, a) => (a.endsWith('12') ? m : `${a}nd`)).replace(/^(\d*3)th/, (m, a) => (a.endsWith('13') ? m : `${a}rd`)));

/* ---------- noms ---------- */
export const SUB_NAMES: Record<Sub, { en: string; es: string }> = {
  GS: { en: 'General Science', es: 'Ciencia General' }, AR: { en: 'Arithmetic Reasoning', es: 'Razonamiento Aritmético' },
  WK: { en: 'Word Knowledge', es: 'Conocimiento de Palabras' }, PC: { en: 'Paragraph Comprehension', es: 'Comprensión de Lectura' },
  MK: { en: 'Mathematics Knowledge', es: 'Conocimientos Matemáticos' }, EI: { en: 'Electronics Information', es: 'Información Electrónica' },
  AS: { en: 'Auto and Shop Information', es: 'Autos y Taller' }, MC: { en: 'Mechanical Comprehension', es: 'Comprensión Mecánica' },
  AO: { en: 'Assembling Objects', es: 'Ensamblaje de Objetos' }, VE: { en: 'Verbal Expression', es: 'Expresión Verbal' },
};
export const BRANCH_NAMES: Record<Branch, { en: string; es: string }> = {
  army: { en: 'Army', es: 'Ejército' }, airforce: { en: 'Air Force', es: 'Fuerza Aérea' }, navy: { en: 'Navy', es: 'Armada' },
  marines: { en: 'Marine Corps', es: 'Cuerpo de Marines' }, coastguard: { en: 'Coast Guard', es: 'Guardia Costera' }, spaceforce: { en: 'Space Force', es: 'Fuerza Espacial' },
};
const ARMY_NAMES: Record<string, { en: string; es: string }> = {
  GT: { en: 'GT, General Technical', es: 'GT, General Técnico' }, CL: { en: 'CL, Clerical', es: 'CL, Administrativo' }, CO: { en: 'CO, Combat', es: 'CO, Combate' },
  EL: { en: 'EL, Electronics', es: 'EL, Electrónica' }, FA: { en: 'FA, Field Artillery', es: 'FA, Artillería de campaña' }, GM: { en: 'GM, General Maintenance', es: 'GM, Mantenimiento general' },
  MM: { en: 'MM, Mechanical Maintenance', es: 'MM, Mantenimiento mecánico' }, OF: { en: 'OF, Operators and Food', es: 'OF, Operadores y alimentación' },
  SC: { en: 'SC, Surveillance and Communications', es: 'SC, Vigilancia y comunicaciones' }, ST: { en: 'ST, Skilled Technical', es: 'ST, Técnico especializado' },
};
const MAGE_NAMES = { M: { en: 'Mechanical (M)', es: 'Mecánico (M)' }, A: { en: 'Administrative (A)', es: 'Administrativo (A)' }, G: { en: 'General (G)', es: 'General (G)' }, E: { en: 'Electrical (E)', es: 'Eléctrico (E)' } } as const;
const MAR_NAMES = { MM: { en: 'MM, Mechanical Maintenance', es: 'MM, Mantenimiento mecánico' }, GT: { en: 'GT, General Technical', es: 'GT, General Técnico' }, EL: { en: 'EL, Electronics Repair', es: 'EL, Reparación electrónica' }, CL: { en: 'CL, Clerical', es: 'CL, Administrativo' } } as const;
const subName = (k: Sub, l: Lang) => `${SUB_NAMES[k][l]} (${k})`;
const parts = (w: Partial<Record<Sub, number>>) => Object.entries(w).map(([k, x]) => (x === 2 ? `2${k}` : k)).join(' + ');

/* ---------- champs communs ---------- */
const std = (l: Lang, k: Sub, def = 50, adv = false): Input => ({ id: k.toLowerCase(), label: subName(k, l), def, max: 90, adv, help: k === 'VE' ? T(l, 'Printed on your score sheet; or estimate it from WK and PC', 'Viene en su hoja de puntajes; o estímelo con WK y PC') : undefined });
const sc = (v: V): Scores => {
  const o: Scores = {};
  for (const k of ['GS', 'AR', 'WK', 'PC', 'MK', 'EI', 'AS', 'MC', 'AO', 'VE'] as Sub[]) if (v[k.toLowerCase()] !== undefined) o[k] = n(v, k.toLowerCase()) || 0;
  return o;
};
const eduField = (l: Lang, def = 'hs'): Input => ({ kind: 'choice', id: 'ed', label: T(l, 'Education', 'Estudios'), def, options: [{ value: 'hs', label: T(l, 'Diploma', 'Diploma') }, { value: 'ged', label: 'GED' }] });
const catText = (c: string, l: Lang) => T(l, `Category ${c}`, `Categoría ${c}`);
const STD_NOTE = (l: Lang) => T(l, 'Standard scores: mean 50, standard deviation 10 in the 1997 sample of youths aged 18 to 23. AFQT percentile read in the official 1997 conversion table (Segall 2004, table 2.5).', 'Puntajes estándar: media 50 y desviación típica 10 en la muestra de 1997 de jóvenes de 18 a 23 años. Percentil AFQT leído en la tabla oficial de conversión de 1997 (Segall 2004, tabla 2.5).');

function branchRows(pct: number, edu: 'hs' | 'ged', l: Lang): string[][] {
  return BRANCHES.map((b) => {
    const m = minimumFor(b, edu);
    const st = m === null ? T(l, 'No figure published', 'Sin cifra publicada') : pct >= m ? T(l, 'Meets the minimum', 'Cumple el mínimo') : T(l, `${m - pct} points short`, `Faltan ${m - pct} puntos`);
    return [BRANCH_NAMES[b][l], m === null ? T(l, 'not published', 'no publicado') : num(m, l), st];
  });
}
const branchTable = (pct: number, edu: 'hs' | 'ged', l: Lang) => ({
  caption: T(l, `Minimum AFQT for ${edu === 'ged' ? 'a GED holder' : 'a high school diploma'}, read on each recruiting site on ${day(LAST_UPDATED, l)}`, `AFQT mínimo con ${edu === 'ged' ? 'un GED' : 'diploma de secundaria'}, leído en cada sitio de reclutamiento el ${day(LAST_UPDATED, l)}`),
  headers: [T(l, 'Branch', 'Rama'), T(l, 'Minimum', 'Mínimo'), T(l, 'Your AFQT', 'Su AFQT')], align: ['l', 'r', 'l'] as Array<'l' | 'r'>, rows: branchRows(pct, edu, l),
});
const eligibleCount = (pct: number, edu: 'hs' | 'ged') => BRANCHES.filter((b) => { const m = minimumFor(b, edu); return m !== null && pct >= m; }).length;
const publishedCount = BRANCHES.filter((b) => minimumFor(b, 'hs') !== null).length;

/* ---------- quiz ---------- */
const QUIZ_SUBS: QSub[] = ['AR', 'WK', 'PC', 'MK', 'GS', 'EI', 'AS', 'MC'];
function quizItems(sub: string, k: number) {
  if (sub === 'MIX') return QUIZ_SUBS.map((x) => QUESTIONS.filter((q) => q.s === x)[k % 10]).filter(Boolean);
  const list = QUESTIONS.filter((q) => q.s === sub);
  return list.slice(k * 5, k * 5 + 5);
}

export const SPECS: Record<string, (l: Lang, arg?: Args) => ToolSpec> = {
  /* Accueil, calculateur AFQT : percentile, catégorie, branches, line scores */
  score: (l) => ({
    inputs: [std(l, 'AR', 52), std(l, 'MK', 51), std(l, 'VE', 53), eduField(l), std(l, 'GS', 50, true), std(l, 'EI', 50, true), std(l, 'AS', 50, true), std(l, 'MC', 50, true)],
    run: (v) => {
      const x = sc(v), sum = afqtSum(x), p = afqt(x), c = category(p), edu = s(v, 'ed') as 'hs' | 'ged';
      const m = mage(x), mar = marines(x);
      return {
        label: T(l, 'Your AFQT percentile', 'Su percentil AFQT'), value: num(p, l),
        sub: T(l, `${catText(c, l)} · ${eligibleCount(p, edu)} of the ${publishedCount} branches that publish a minimum`, `${catText(c, l)} · ${eligibleCount(p, edu)} de las ${publishedCount} ramas que publican un mínimo`),
        rows: [
          [T(l, 'AR + MK + 2 × VE', 'AR + MK + 2 × VE'), num(sum, l)],
          [T(l, 'Army GT', 'GT del Ejército'), num(armyGt(x), l)],
          [T(l, 'Air Force M / A / G / E', 'Fuerza Aérea M / A / G / E'), `${m.M.pct} / ${m.A.pct} / ${m.G.pct} / ${m.E.pct}`],
          [T(l, 'Marine Corps GT', 'GT de los Marines'), num(mar.GT, l)],
        ],
        table: branchTable(p, edu, l), note: STD_NOTE(l),
      };
    },
  }),

  /* Calculateur AFQT seul, avec la marge jusqu'au palier suivant */
  afqt: (l) => ({
    inputs: [std(l, 'AR', 50), std(l, 'MK', 50), std(l, 'VE', 50), eduField(l)],
    run: (v) => {
      const x = sc(v), sum = afqtSum(x), p = afqt(x), c = category(p);
      const nextCat = ([31, 50, 65, 93] as number[]).find((t) => t > p);
      const need = nextCat ? (sumForPercentile(nextCat) ?? sum) - sum : 0;
      return {
        label: T(l, 'AFQT percentile', 'Percentil AFQT'), value: num(p, l), sub: `${catText(c, l)} · ${ord(p, l)}`,
        rows: [
          [T(l, 'Composite AR + MK + 2VE', 'Compuesto AR + MK + 2VE'), num(sum, l)],
          [T(l, 'VE counts twice', 'VE cuenta doble'), `2 × ${num(n(v, 've'), l)} = ${num(2 * n(v, 've'), l)}`],
          nextCat ? [T(l, `Points to reach ${nextCat}`, `Puntos para llegar a ${nextCat}`), T(l, `${need} on the sum (${Math.ceil(need / 2)} on VE alone)`, `${need} en la suma (${Math.ceil(need / 2)} solo en VE)`)] : [T(l, 'Highest category', 'Categoría más alta'), 'I'],
        ],
        table: branchTable(p, s(v, 'ed') as 'hs' | 'ged', l), note: STD_NOTE(l),
      };
    },
  }),

  /* Un score standard : part de la population au-dessus */
  std: (l) => ({
    inputs: [{ id: 'x', label: T(l, 'Standard score of one subtest', 'Puntaje estándar de una subprueba'), def: 58, max: 90 },
      { kind: 'select', id: 'k', label: T(l, 'Subtest', 'Subprueba'), def: 'AR', options: (['GS', 'AR', 'WK', 'PC', 'MK', 'EI', 'AS', 'MC', 'AO', 'VE'] as Sub[]).map((k) => ({ value: k, label: subName(k, l) })) }],
    run: (v) => {
      const x = n(v, 'x'), z = (x - 50) / 10, above = shareAbove(x);
      return {
        label: T(l, `Share of the 1997 youth sample at or above ${num(x, l)} in ${s(v, 'k')}`, `Parte de la muestra juvenil de 1997 con ${num(x, l)} o más en ${s(v, 'k')}`), value: pc(above, l, 0),
        sub: T(l, `${num(Math.abs(z), l, 1)} standard deviations ${z >= 0 ? 'above' : 'below'} the mean of 50`, `${num(Math.abs(z), l, 1)} desviaciones típicas ${z >= 0 ? 'por encima' : 'por debajo'} de la media de 50`),
        rows: [[T(l, 'Below this score', 'Por debajo de este puntaje'), pc(1 - above, l, 0)], [T(l, 'Standard score of 60', 'Puntaje estándar de 60'), T(l, `${pc(shareAbove(60), l, 0)} at or above`, `${pc(shareAbove(60), l, 0)} igual o por encima`)], [T(l, 'Standard score of 40', 'Puntaje estándar de 40'), T(l, `${pc(shareAbove(40), l, 0)} at or above`, `${pc(shareAbove(40), l, 0)} igual o por encima`)]],
        note: T(l, 'Estimate: normal curve with mean 50 and standard deviation 10, the definition of the scale. Official ASVAB states that about 16% of the population scores 60 or more, which the curve reproduces.', 'Estimación: curva normal de media 50 y desviación típica 10, la definición de la escala. Official ASVAB indica que alrededor del 16 % obtiene 60 o más, lo que la curva reproduce.'),
      };
    },
  }),

  /* Objectif : somme à atteindre pour un percentile visé */
  target: (l, arg) => ({
    inputs: [{ kind: 'select', id: 't', label: T(l, 'Target AFQT', 'AFQT objetivo'), def: String(arg?.t ?? '50'), options: ['21', '31', '32', '50', '65', '93'].map((x) => ({ value: x, label: x })) }, std(l, 'AR', 47), std(l, 'MK', 47), std(l, 'VE', 46)],
    run: (v) => {
      const x = sc(v), t = n(v, 't'), sum = afqtSum(x), need = sumForPercentile(t) ?? 269, gap = Math.max(0, need - sum), p = afqt(x);
      return {
        label: T(l, `Points missing to reach AFQT ${t}`, `Puntos que faltan para AFQT ${t}`), value: num(gap, l),
        sub: gap === 0 ? T(l, `Reached: your AFQT is ${p}.`, `Alcanzado: su AFQT es ${p}.`) : T(l, `Your AFQT today: ${p}. Sum needed: ${need}; yours: ${sum}.`, `Su AFQT hoy: ${p}. Suma necesaria: ${need}; la suya: ${sum}.`),
        rows: [
          [T(l, 'With VE alone (counts twice)', 'Solo con VE (cuenta doble)'), T(l, `+${Math.ceil(gap / 2)} on VE`, `+${Math.ceil(gap / 2)} en VE`)],
          [T(l, 'With AR alone', 'Solo con AR'), T(l, `+${gap} on AR`, `+${gap} en AR`)],
          [T(l, 'With MK alone', 'Solo con MK'), T(l, `+${gap} on MK`, `+${gap} en MK`)],
          [T(l, 'Category of the target', 'Categoría del objetivo'), category(t)],
        ],
        note: STD_NOTE(l),
      };
    },
  }),

  /* Catégorie d'un percentile */
  category: (l) => ({
    inputs: [{ id: 'p', label: T(l, 'AFQT percentile', 'Percentil AFQT'), def: 45, max: 99 }],
    run: (v) => {
      const p = Math.max(1, Math.min(99, Math.round(n(v, 'p')))), c = category(p), row = (P.categories as Array<[string, number, number]>).find((x) => x[0] === c)!;
      return {
        label: T(l, `AFQT ${p} falls in`, `Un AFQT de ${p} cae en`), value: catText(c, l), sub: T(l, `Range ${row[1]} to ${row[2]}`, `Rango de ${row[1]} a ${row[2]}`),
        rows: [
          [T(l, 'Incentive categories (IIIA or higher)', 'Categorías con incentivos (IIIA o más)'), p >= 50 ? T(l, 'Yes', 'Sí') : T(l, `No, ${50 - p} points short`, `No, faltan ${50 - p} puntos`)],
          [T(l, 'Category IV (10 to 30), capped by law', 'Categoría IV (10 a 30), limitada por ley'), p >= 10 && p <= 30 ? T(l, 'Yes', 'Sí') : T(l, 'No', 'No')],
          [T(l, 'Branches whose minimum you meet', 'Ramas cuyo mínimo cumple'), `${eligibleCount(p, 'hs')} / ${publishedCount}`],
        ],
        table: { headers: [T(l, 'Category', 'Categoría'), T(l, 'Percentiles', 'Percentiles')], align: ['l', 'r'], rows: (P.categories as Array<[string, number, number]>).map(([k, a, b]) => [k === c ? `<strong>${k}</strong>` : k, `${a} - ${b}`]) },
        note: T(l, 'Categories from Official ASVAB; Category IV cap and the 31 floor for non-graduates from 10 U.S.C. § 520.', 'Categorías de Official ASVAB; límite de la categoría IV y piso de 31 sin diploma según 10 U.S.C. § 520.'),
      };
    },
  }),

  /* VE à partir de WK et PC */
  ve: (l) => ({
    inputs: [std(l, 'WK', 52), std(l, 'PC', 49), std(l, 'AR', 50, true), std(l, 'MK', 50, true)],
    run: (v) => {
      const ve = veFromWkPc(n(v, 'wk'), n(v, 'pc')), x = { ...sc(v), VE: ve };
      return {
        label: T(l, 'Estimated VE standard score', 'Puntaje estándar VE estimado'), value: num(ve, l), sub: T(l, 'Within about one point of the VE on your sheet', 'Con un margen de alrededor de un punto respecto del VE de su hoja'),
        rows: [[T(l, 'Weight of PC versus WK', 'Peso de PC frente a WK'), num(0.61934, l, 2)], [T(l, 'AFQT with this VE', 'AFQT con este VE'), num(afqt(x), l)], [T(l, 'AR + MK + 2VE', 'AR + MK + 2VE'), num(afqtSum(x), l)]],
        note: T(l, 'Estimate: formula of the reference form 04D (Segall 2004, section 2.3). Other forms use slightly different constants, so the printed VE can differ by a point.', 'Estimación: fórmula de la forma de referencia 04D (Segall 2004, sección 2.3). Otras formas usan constantes algo distintas, así que el VE impreso puede variar en un punto.'),
      };
    },
  }),

  /* Tous les composites */
  lines: (l) => ({
    inputs: (['GS', 'AR', 'VE', 'MK', 'EI', 'AS', 'MC'] as Sub[]).map((k) => std(l, k, 50)),
    run: (v) => {
      const x = sc(v), m = mage(x), mar = marines(x), a = army(x);
      const rows: string[][] = [
        ...(['M', 'A', 'G', 'E'] as const).map((k) => [T(l, 'Air Force', 'Fuerza Aérea'), MAGE_NAMES[k][l], parts(MAGE_PARTS[k]), T(l, `${m[k].pct} (percentile)`, `${m[k].pct} (percentil)`)]),
        ...(['GT', 'MM', 'EL', 'CL'] as const).map((k) => [T(l, 'Marine Corps', 'Marines'), MAR_NAMES[k][l], MARINE_PARTS[k].join(' + '), num(mar[k], l)]),
        ['Army', ARMY_NAMES.GT[l], 'AR + VE', num(a.GT, l)],
        ...ARMY_KEYS.map((k) => [T(l, 'Army (estimate)', 'Ejército (estimación)'), ARMY_NAMES[k][l], T(l, 'weighted', 'ponderado'), num(a[k], l)]),
      ];
      return {
        label: T(l, 'Army GT line score', 'Line score GT del Ejército'), value: num(a.GT, l), sub: T(l, `AFQT ${afqt(x)} · Air Force G ${m.G.pct} · Marine GT ${mar.GT}`, `AFQT ${afqt(x)} · G de la Fuerza Aérea ${m.G.pct} · GT de los Marines ${mar.GT}`),
        rows: [[T(l, 'Air Force M / A / G / E', 'Fuerza Aérea M / A / G / E'), `${m.M.pct} / ${m.A.pct} / ${m.G.pct} / ${m.E.pct}`], [T(l, 'Marine MM / GT / EL / CL', 'Marines MM / GT / EL / CL'), `${mar.MM} / ${mar.GT} / ${mar.EL} / ${mar.CL}`]],
        table: { caption: T(l, 'Every composite from the same scores', 'Todos los compuestos con los mismos puntajes'), headers: [T(l, 'Service', 'Rama'), T(l, 'Composite', 'Compuesto'), T(l, 'Subtests', 'Subpruebas'), T(l, 'Score', 'Puntaje')], align: ['l', 'l', 'l', 'r'], rows },
        note: T(l, 'Air Force percentiles from tables C.1 to C.4, Marine and Army GT formulas from Segall (2004). The nine other Army composites use the 2004 weights of table 2.7 and are estimates: the Army may have revised them.', 'Percentiles de la Fuerza Aérea según las tablas C.1 a C.4; fórmulas de los Marines y del GT del Ejército según Segall (2004). Los otros nueve compuestos del Ejército usan los pesos de 2004 de la tabla 2.7 y son estimaciones: el Ejército puede haberlos revisado.'),
      };
    },
  }),

  /* Éligibilité par branche à partir du percentile */
  eligibility: (l, arg) => ({
    inputs: [{ id: 'p', label: T(l, 'AFQT percentile', 'Percentil AFQT'), def: Number(arg?.p ?? 40), max: 99 }, eduField(l, String(arg?.ed ?? 'hs'))],
    run: (v) => {
      const p = Math.round(n(v, 'p')), edu = s(v, 'ed') as 'hs' | 'ged', focus = (arg?.b as Branch | undefined) ?? 'army', m = minimumFor(focus, edu);
      return {
        label: T(l, `${BRANCH_NAMES[focus].en} minimum`, `Mínimo de ${BRANCH_NAMES[focus].es === 'Ejército' ? 'el Ejército' : `la ${BRANCH_NAMES[focus].es}`}`).replace('la Cuerpo de Marines', 'los Marines'),
        value: m === null ? T(l, 'Not published', 'No publicado') : num(m, l),
        sub: m === null ? T(l, `Your AFQT ${p}: no figure to compare on the official site.`, `Su AFQT ${p}: el sitio oficial no da una cifra para comparar.`) : p >= m ? T(l, `Your AFQT ${p} meets it.`, `Su AFQT ${p} lo cumple.`) : T(l, `Your AFQT ${p} is ${m - p} points short.`, `A su AFQT ${p} le faltan ${m - p} puntos.`),
        rows: [[T(l, 'Branches whose published minimum you meet', 'Ramas cuyo mínimo publicado cumple'), `${eligibleCount(p, edu)} / ${publishedCount}`], [catText(category(Math.max(1, Math.min(99, p))), l), `${P.categories.find((c) => c[0] === category(Math.max(1, Math.min(99, p))))![1]} - ${P.categories.find((c) => c[0] === category(Math.max(1, Math.min(99, p))))![2]}`]],
        table: branchTable(p, edu, l),
        note: T(l, 'Navy: navy.com refused automated reading on the day of the check, so no figure is shown. Space Force: its site asks for a “qualifying ASVAB score” without a number.', 'Armada: navy.com rechazó la lectura automática el día de la verificación, así que no se muestra cifra. Fuerza Espacial: su sitio pide un “puntaje del ASVAB que califique” sin número.'),
      };
    },
  }),

  /* Army */
  army: (l) => ({
    inputs: [std(l, 'AR', 52), std(l, 'VE', 54), std(l, 'GS', 50, true), std(l, 'MK', 50, true), std(l, 'MC', 50, true), std(l, 'EI', 50, true), std(l, 'AS', 50, true)],
    run: (v) => {
      const x = sc(v), a = army(x);
      return {
        label: T(l, 'Army GT line score', 'Line score GT del Ejército'), value: num(a.GT, l), sub: T(l, `Exact formula: 1.074292 × (AR + VE) - 7.443781, rounded. AFQT ${afqt(x)}.`, `Fórmula exacta: 1,074292 × (AR + VE) - 7,443781, redondeado. AFQT ${afqt(x)}.`),
        rows: [[T(l, 'AR + VE', 'AR + VE'), num(n(v, 'ar') + n(v, 've'), l)], [T(l, 'Officer Candidate School floor (GT)', 'Piso de Officer Candidate School (GT)'), num(P.armyOcsGt, l)], [T(l, 'Army AFQT minimum', 'AFQT mínimo del Ejército'), num(RULES.army.min!, l)]],
        table: { caption: T(l, 'Army line scores (mean 100, standard deviation 20)', 'Line scores del Ejército (media 100, desviación típica 20)'), headers: [T(l, 'Line score', 'Line score'), T(l, 'Score', 'Puntaje'), T(l, 'Status', 'Estado')], align: ['l', 'r', 'l'], rows: [[ARMY_NAMES.GT[l], num(a.GT, l), T(l, 'exact', 'exacto')], ...ARMY_KEYS.map((k) => [ARMY_NAMES[k][l], num(a[k], l), T(l, 'estimate, 2004 weights', 'estimación, pesos de 2004')])] },
        note: T(l, 'Weights from Segall (2004), table 2.7. The score on your MEPS printout prevails.', 'Pesos de Segall (2004), tabla 2.7. El puntaje de su hoja del MEPS prevalece.'),
      };
    },
  }),

  /* Army GT seul */
  gt: (l) => ({
    inputs: [std(l, 'AR', 53), std(l, 'VE', 55), { kind: 'select', id: 'g', label: T(l, 'GT you need', 'GT que necesita'), def: '110', options: ['90', '95', '100', '105', '107', '110', '115'].map((x) => ({ value: x, label: x })) }],
    run: (v) => {
      const x = sc(v), gt = armyGt(x), goal = n(v, 'g');
      let need = 0; while (armyGt({ AR: n(v, 'ar') + need, VE: n(v, 've') }) < goal && need < 80) need++;
      return {
        label: T(l, 'Army GT score', 'Puntaje GT del Ejército'), value: num(gt, l),
        sub: gt >= goal ? T(l, `At or above ${goal}.`, `Igual o por encima de ${goal}.`) : T(l, `${goal - gt} GT points short of ${goal}.`, `Faltan ${goal - gt} puntos GT para ${goal}.`),
        rows: [[T(l, 'AR + VE', 'AR + VE'), num(n(v, 'ar') + n(v, 've'), l)], [T(l, 'Points of AR + VE still needed', 'Puntos de AR + VE que faltan'), num(need, l)], [T(l, 'One point of AR or VE', 'Un punto de AR o VE'), T(l, `about ${num(1.074292, l, 2)} GT`, `alrededor de ${num(1.074292, l, 2)} GT`)], [T(l, 'AFQT with the same AR and VE (MK 50)', 'AFQT con los mismos AR y VE (MK 50)'), num(afqt({ ...x, MK: 50 }), l)]],
        note: T(l, 'Formula from Segall (2004), section 2.5.3: mean 100 and standard deviation 20 in the 1997 youth sample.', 'Fórmula de Segall (2004), sección 2.5.3: media 100 y desviación típica 20 en la muestra juvenil de 1997.'),
      };
    },
  }),

  /* Air Force MAGE */
  mage: (l) => ({
    inputs: [std(l, 'AR', 50), std(l, 'VE', 52), std(l, 'MK', 50), std(l, 'GS', 50), std(l, 'EI', 48, true), std(l, 'AS', 47, true), std(l, 'MC', 49, true)],
    run: (v) => {
      const x = sc(v), m = mage(x), best = (['M', 'A', 'G', 'E'] as const).reduce((a, b) => (m[b].pct > m[a].pct ? b : a), 'M' as 'M' | 'A' | 'G' | 'E');
      const jobs = JOBS.jobs.filter((j) => j.req.every(([k, min]) => m[k as 'M'].pct >= (min as number)));
      return {
        label: T(l, 'Air Force General (G) percentile', 'Percentil General (G) de la Fuerza Aérea'), value: num(m.G.pct, l),
        sub: T(l, `Strongest area: ${MAGE_NAMES[best].en}, ${m[best].pct}. AFQT ${afqt(x)}.`, `Área más fuerte: ${MAGE_NAMES[best].es}, ${m[best].pct}. AFQT ${afqt(x)}.`),
        rows: (['M', 'A', 'G', 'E'] as const).map((k) => [`${MAGE_NAMES[k][l]} = ${parts(MAGE_PARTS[k])}`, T(l, `sum ${m[k].sum} → ${m[k].pct}`, `suma ${m[k].sum} → ${m[k].pct}`), m[k].pct] as [string, string, number]).concat([[T(l, 'Enlisted jobs whose listed minimums you meet', 'Empleos enlisted cuyos mínimos cumple'), `${jobs.length} / ${JOBS.jobs.length}`]] as Array<[string, string, number]>),
        note: T(l, 'Percentiles from the official 1997 tables C.1 to C.4 (Segall 2004). Job minimums from airforce.com, read on the date shown on this page.', 'Percentiles de las tablas oficiales de 1997 C.1 a C.4 (Segall 2004). Mínimos de empleos de airforce.com, leídos en la fecha indicada en esta página.'),
      };
    },
  }),

  /* Métiers de l'Air Force accessibles avec des percentiles MAGE */
  afjobs: (l) => {
    const tags = [...new Set(JOBS.jobs.map((j) => j.tag))].sort();
    return {
      inputs: [{ id: 'm', label: T(l, 'Mechanical (M) percentile', 'Percentil Mecánico (M)'), def: 50, max: 99 }, { id: 'a', label: T(l, 'Administrative (A) percentile', 'Percentil Administrativo (A)'), def: 50, max: 99 },
        { id: 'g', label: T(l, 'General (G) percentile', 'Percentil General (G)'), def: 55, max: 99 }, { id: 'e', label: T(l, 'Electrical (E) percentile', 'Percentil Eléctrico (E)'), def: 50, max: 99 },
        { kind: 'select', id: 'f', label: T(l, 'Career field', 'Área'), def: 'all', options: [{ value: 'all', label: T(l, 'All fields', 'Todas las áreas') }, ...tags.map((t) => ({ value: t, label: t }))], wide: true }],
      run: (v) => {
        const pct: Record<string, number> = { M: n(v, 'm'), A: n(v, 'a'), G: n(v, 'g'), E: n(v, 'e') };
        const f = s(v, 'f'), list = JOBS.jobs.filter((j) => f === 'all' || j.tag === f);
        const ok = list.filter((j) => j.req.every(([k, min]) => pct[k as string] >= (min as number)));
        const close = list.filter((j) => !ok.includes(j)).map((j) => ({ j, gap: Math.max(...j.req.map(([k, min]) => (min as number) - pct[k as string])) })).sort((a, b) => a.gap - b.gap).slice(0, 3);
        return {
          label: T(l, 'Enlisted Air Force jobs you meet the listed minimums for', 'Empleos enlisted de la Fuerza Aérea cuyos mínimos cumple'), value: `${ok.length} / ${list.length}`,
          sub: close.length ? T(l, `Closest one out of reach: ${close[0].j.t} (${close[0].j.raw}), ${close[0].gap} points short.`, `El más cercano fuera de alcance: ${close[0].j.t} (${close[0].j.raw}), faltan ${close[0].gap} puntos.`) : T(l, 'Every job in this field is within reach.', 'Todos los empleos de esta área están a su alcance.'),
          rows: close.slice(1).map((c) => [`${c.j.t} (${c.j.raw})`, T(l, `${c.gap} short`, `faltan ${c.gap}`)] as [string, string]),
          table: { caption: T(l, 'Jobs within reach (title and AFSC code as published on airforce.com, in English)', 'Empleos a su alcance (título y código AFSC tal como los publica airforce.com, en inglés)'), headers: ['AFSC', T(l, 'Job', 'Empleo'), T(l, 'Minimum', 'Mínimo')], align: ['l', 'l', 'l'], rows: ok.map((j) => [j.afsc, j.t, j.req.length ? j.raw : T(l, 'none listed', 'sin mínimo publicado')]) },
          note: T(l, 'Minimums as listed by the airforce.com careers API; when two areas are joined by “&”, both are required here. Jobs listed with “A0” show no minimum. Recruiters confirm the current minimums.', 'Mínimos tal como los publica la API de carreras de airforce.com; cuando dos áreas van unidas por “&”, aquí se exigen ambas. Los empleos con “A0” no muestran mínimo. Los reclutadores confirman los mínimos vigentes.'),
        };
      },
    };
  },

  /* Marine Corps */
  marines: (l) => ({
    inputs: [std(l, 'AR', 51), std(l, 'VE', 52), std(l, 'MC', 50), std(l, 'MK', 50, true), std(l, 'GS', 50, true), std(l, 'EI', 50, true), std(l, 'AS', 50, true)],
    run: (v) => {
      const x = sc(v), m = marines(x);
      return {
        label: T(l, 'Marine Corps GT score', 'Puntaje GT de los Marines'), value: num(m.GT, l), sub: T(l, `AFQT ${afqt(x)}; Marine minimum ${RULES.marines.min} (${RULES.marines.ged} with a GED).`, `AFQT ${afqt(x)}; mínimo de los Marines ${RULES.marines.min} (${RULES.marines.ged} con GED).`),
        rows: (['GT', 'MM', 'EL', 'CL'] as const).map((k) => [`${MAR_NAMES[k][l]} = ${MARINE_PARTS[k].join(' + ')}`, num(m[k], l), m[k]] as [string, string, number]),
        note: T(l, 'Exact formulas of Segall (2004), section 2.5.2: rounded linear transformation of the sum of standard scores, mean 100 and standard deviation 20.', 'Fórmulas exactas de Segall (2004), sección 2.5.2: transformación lineal redondeada de la suma de puntajes estándar, media 100 y desviación típica 20.'),
      };
    },
  }),

  /* Navy : somme brute choisie */
  navy: (l) => {
    const combos: Array<[string, Sub[]]> = [['VE+AR', ['VE', 'AR']], ['VE+MK+GS', ['VE', 'MK', 'GS']], ['AR+MK+EI+GS', ['AR', 'MK', 'EI', 'GS']], ['AR+MC+AS', ['AR', 'MC', 'AS']], ['VE+AR+MK+MC', ['VE', 'AR', 'MK', 'MC']], ['VE+AR+MK+AS', ['VE', 'AR', 'MK', 'AS']]];
    return {
      inputs: [{ kind: 'select', id: 'c', label: T(l, 'Subtests to add (as on your recruiter’s sheet)', 'Subpruebas que se suman (según la hoja del reclutador)'), def: 'VE+AR', options: combos.map(([k]) => ({ value: k, label: k.replace(/\+/g, ' + ') })), wide: true },
        { id: 'goal', label: T(l, 'Sum required by the rating', 'Suma que exige el rating'), def: 0, max: 400, help: T(l, 'Leave empty if you do not know it', 'Déjelo vacío si no lo sabe') },
        std(l, 'VE', 52), std(l, 'AR', 51), std(l, 'MK', 50, true), std(l, 'GS', 50, true), std(l, 'EI', 50, true), std(l, 'MC', 50, true), std(l, 'AS', 50, true)],
      run: (v) => {
        const x = sc(v), c = combos.find(([k]) => k === s(v, 'c'))![1], sum = rawSum(x, c), goal = n(v, 'goal');
        return {
          label: T(l, `Navy-style sum ${c.join(' + ')}`, `Suma al estilo de la Armada ${c.join(' + ')}`), value: num(sum, l),
          sub: goal ? (sum >= goal ? T(l, `At or above the ${goal} you entered.`, `Igual o por encima de los ${goal} indicados.`) : T(l, `${goal - sum} points short of ${goal}.`, `Faltan ${goal - sum} puntos para ${goal}.`)) : T(l, `Average sum for these subtests: ${50 * c.length}.`, `Suma media para estas subpruebas: ${50 * c.length}.`),
          rows: [[T(l, 'Your AFQT', 'Su AFQT'), num(afqt(x), l)], [T(l, 'Average for this sum (each subtest at 50)', 'Media de esta suma (cada subprueba en 50)'), num(50 * c.length, l)], [T(l, 'Points above the average', 'Puntos por encima de la media'), num(sum - 50 * c.length, l)]],
          note: T(l, 'The Navy reports composites as plain sums of standard scores (Segall 2004, section 2.5.4). The sums each rating requires are not published here: navy.com could not be read on the day of the check.', 'La Armada informa sus compuestos como simples sumas de puntajes estándar (Segall 2004, sección 2.5.4). Las sumas que exige cada rating no se publican aquí: navy.com no pudo leerse el día de la verificación.'),
        };
      },
    };
  },

  /* Quiz : 5 questions (ou 8, une par sous-test) */
  quiz: (l, arg) => {
    const sub = String(arg?.s ?? 'AR'), k = Number(arg?.k ?? 0), items = quizItems(sub, k);
    const L4 = ['A', 'B', 'C', 'D'];
    return {
      inputs: items.map((q, i) => ({ kind: 'select', id: `q${i + 1}`, label: `${i + 1}. ${q.q}`, def: '', help: l === 'es' ? q.qes : undefined, wide: true,
        options: [{ value: '', label: T(l, 'Choose an answer', 'Elija una respuesta') }, ...q.o.map((o, j) => ({ value: L4[j], label: `${L4[j]}. ${o}` }))] }) as Input),
      run: (v) => {
        const res = items.map((q, i) => ({ q, got: s(v, `q${i + 1}`), ok: s(v, `q${i + 1}`) === L4[q.a] }));
        const answered = res.filter((r) => r.got && r.got !== 'undefined').length, right = res.filter((r) => r.ok).length;
        return {
          label: T(l, 'Correct answers', 'Respuestas correctas'), value: `${right} / ${items.length}`,
          sub: answered < items.length ? T(l, `${answered} of ${items.length} answered: the explanations appear below as you go.`, `${answered} de ${items.length} respondidas: las explicaciones aparecen abajo a medida que responde.`) : T(l, `All answered: ${pc(right / items.length, l, 0)} correct.`, `Todas respondidas: ${pc(right / items.length, l, 0)} correctas.`),
          rows: [[T(l, 'Subtests covered', 'Subpruebas'), [...new Set(items.map((q) => q.s))].join(', ')]],
          table: answered ? { headers: ['#', T(l, 'Yours', 'Suya'), T(l, 'Answer', 'Respuesta'), T(l, 'Why', 'Por qué')], align: ['l', 'l', 'l', 'l'], rows: res.map((r, i) => (r.got && r.got !== 'undefined' ? [String(i + 1), `${r.got}${r.ok ? ' ✓' : ' ✗'}`, L4[r.q.a], r.q.why[l]] : [String(i + 1), '', '', ''])).filter((r) => r[1]) } : undefined,
          note: T(l, 'Practice items written by Radif Partners for this site, not real ASVAB questions. A share of correct answers does not convert into a standard score or an AFQT percentile.', 'Preguntas de práctica escritas por Radif Partners para este sitio, no son preguntas reales del ASVAB. Un porcentaje de aciertos no se convierte en puntaje estándar ni en percentil AFQT.'),
        };
      },
    };
  },

  /* Longueur du test */
  length: (l, arg) => ({
    inputs: [{ kind: 'choice', id: 'f', label: T(l, 'Version', 'Versión'), def: String(arg?.f ?? 'cat'), options: [{ value: 'cat', label: 'CAT-ASVAB' }, { value: 'pp', label: T(l, 'Paper', 'Papel') }] }],
    run: (v) => {
      const f = s(v, 'f') as 'cat' | 'pp', L = P.testLength[f] as Record<string, [number, number]>;
      const q = Object.values(L).reduce((a, x) => a + x[0], 0), m = Object.values(L).reduce((a, x) => a + x[1], 0);
      const name = (k: string) => (k === 'AI' ? T(l, 'Auto Information (AI)', 'Información de autos (AI)') : k === 'SI' ? T(l, 'Shop Information (SI)', 'Información de taller (SI)') : subName(k as Sub, l));
      return {
        label: T(l, `Scored questions, ${f === 'cat' ? 'CAT-ASVAB' : 'paper ASVAB'}`, `Preguntas puntuadas, ${f === 'cat' ? 'CAT-ASVAB' : 'ASVAB en papel'}`), value: num(q, l),
        sub: T(l, `${num(m, l)} minutes of subtest time limits in total.`, `${num(m, l)} minutos de tiempo límite sumando las subpruebas.`),
        rows: [[T(l, 'Average time per question', 'Tiempo medio por pregunta'), T(l, `${num((m * 60) / q, l)} seconds`, `${num((m * 60) / q, l)} segundos`)], [T(l, 'Subtests', 'Subpruebas'), num(Object.keys(L).length, l)]],
        table: { headers: [T(l, 'Subtest', 'Subprueba'), T(l, 'Questions', 'Preguntas'), T(l, 'Minutes', 'Minutos'), T(l, 'Seconds per question', 'Segundos por pregunta')], align: ['l', 'r', 'r', 'r'], rows: Object.entries(L).map(([k, [a, b]]) => [name(k), num(a, l), num(b, l), num((b * 60) / a, l)]) },
        note: T(l, `Official ASVAB fact sheet, read on ${day(LAST_UPDATED, l)}. The CAT-ASVAB can add unscored try-out questions.`, `Hoja informativa de Official ASVAB, leída el ${day(LAST_UPDATED, l)}. El CAT-ASVAB puede añadir preguntas de prueba que no puntúan.`),
      };
    },
  }),

  /* Rythme par sous-test */
  pace: (l) => ({
    inputs: [{ kind: 'select', id: 'k', label: T(l, 'Subtest', 'Subprueba'), def: 'AR', options: ['GS', 'AR', 'WK', 'PC', 'MK', 'EI', 'MC', 'AO'].map((k) => ({ value: k, label: subName(k as Sub, l) })) },
      { id: 'sec', label: T(l, 'Your seconds per question in practice', 'Sus segundos por pregunta al practicar'), def: 150, max: 900, unit: 's' }],
    run: (v) => {
      const k = s(v, 'k'), c = (P.testLength.cat as Record<string, [number, number]>)[k], p = (P.testLength.pp as Record<string, [number, number]>)[k];
      const cs = (c[1] * 60) / c[0], ps = (p[1] * 60) / p[0], mine = n(v, 'sec');
      return {
        label: T(l, `CAT-ASVAB time per question, ${k}`, `Tiempo por pregunta en el CAT-ASVAB, ${k}`), value: T(l, `${num(cs, l)} s`, `${num(cs, l)} s`),
        sub: mine <= cs ? T(l, `Your pace (${mine} s) fits the CAT limit.`, `Su ritmo (${mine} s) entra en el límite del CAT.`) : T(l, `Your pace is ${num(mine - cs, l)} s too slow for the CAT limit.`, `Su ritmo es ${num(mine - cs, l)} s más lento que el límite del CAT.`),
        rows: [[T(l, 'Paper version, per question', 'Versión en papel, por pregunta'), `${num(ps, l)} s`], [T(l, 'CAT questions and minutes', 'Preguntas y minutos del CAT'), `${c[0]} / ${c[1]}`], [T(l, 'Paper questions and minutes', 'Preguntas y minutos en papel'), `${p[0]} / ${p[1]}`], [T(l, 'Questions you would finish on the CAT', 'Preguntas que terminaría en el CAT'), `${Math.min(c[0], Math.floor((c[1] * 60) / Math.max(1, mine)))} / ${c[0]}`]],
        note: T(l, 'Times from the Official ASVAB fact sheet. On the CAT, unfinished questions bring a penalty equal to guessing at random.', 'Tiempos de la hoja informativa de Official ASVAB. En el CAT, las preguntas sin terminar reciben una penalización equivalente a responder al azar.'),
      };
    },
  }),

  /* Dates de repasse */
  retest: (l) => ({
    inputs: [{ kind: 'date', id: 'd', label: T(l, 'Date of your last ASVAB', 'Fecha de su último ASVAB'), def: '2026-10-01' },
      { kind: 'choice', id: 'n', label: T(l, 'Tests taken so far', 'Exámenes hechos hasta ahora'), def: '1', options: [{ value: '1', label: '1' }, { value: '2', label: '2' }, { value: '3', label: T(l, '3 or more', '3 o más') }] }],
    run: (v) => {
      const d = s(v, 'd'), k = n(v, 'n'), next = nextRetest(d, k), after = nextRetest(next, k + 1);
      return {
        label: T(l, 'Earliest retest date', 'Primera fecha posible para repetir'), value: day(next, l),
        sub: T(l, `${k <= 2 ? 'One calendar month' : 'Six calendar months'} after ${day(d, l)}.`, `${k <= 2 ? 'Un mes calendario' : 'Seis meses calendario'} después del ${day(d, l)}.`),
        rows: [[T(l, 'The following retest, at the earliest', 'La repetición siguiente, como pronto'), day(after, l)], [T(l, 'Scores of this test usable until', 'Puntajes de este examen válidos hasta'), day(addYears(d, P.retest.validYears), l)], [T(l, 'Gain of 20 AFQT points or more within 6 months', 'Subida de 20 puntos AFQT o más en 6 meses'), T(l, 'confirmation test (C-Test)', 'prueba de confirmación (C-Test)')]],
        note: T(l, 'Official ASVAB retest policy: one month, one month, then six months between tests; six months after a test invalidated for cheating.', 'Política oficial de repetición: un mes, un mes y luego seis meses entre exámenes; seis meses después de un examen anulado por trampa.'),
      };
    },
  }),

  /* PiCAT */
  picat: (l) => ({
    inputs: [{ kind: 'date', id: 'c', label: T(l, 'Date the recruiter gave you the access code', 'Fecha en que el reclutador le dio el código'), def: '2026-10-22' },
      { kind: 'date', id: 's', label: T(l, 'Date you start the PiCAT', 'Fecha en que empieza el PiCAT'), def: '2026-10-25' }],
    run: (v) => {
      const c = s(v, 'c'), st = s(v, 's'), exp = addDays(c, P.picat.codeDays), late = daysBetween(exp, st) > 0;
      const finish = addDays(st, 2), vtest = addDays(st, P.picat.vtestDays);
      return {
        label: T(l, 'Verification test (Vtest) at MEPS no later than', 'Prueba de verificación (Vtest) en el MEPS a más tardar el'), value: day(vtest, l),
        sub: late ? T(l, `Warning: the code expires on ${day(exp, l)}, before that start date.`, `Atención: el código vence el ${day(exp, l)}, antes de esa fecha de inicio.`) : T(l, `Code valid until ${day(exp, l)}.`, `Código válido hasta el ${day(exp, l)}.`),
        rows: [[T(l, 'Finish the PiCAT within 48 hours: by', 'Termine el PiCAT en 48 horas: antes del'), day(finish, l)], [T(l, 'Time to plan for the PiCAT', 'Tiempo que prever para el PiCAT'), T(l, '2 to 3 hours', '2 a 3 horas')], [T(l, 'Length of the Vtest', 'Duración del Vtest'), T(l, '25 to 30 minutes', '25 a 30 minutos')], [T(l, 'Scores usable until (if verified)', 'Puntajes válidos hasta (si se verifican)'), day(addYears(st, 2), l)]],
        note: T(l, 'Official ASVAB PiCAT page: code valid 30 days, 48 hours to finish once started, one attempt, only for people who never took the ASVAB, Vtest within 45 days.', 'Página PiCAT de Official ASVAB: código válido 30 días, 48 horas para terminar una vez empezado, un solo intento, solo para quien nunca hizo el ASVAB, Vtest en 45 días.'),
      };
    },
  }),

  /* Où passer l'ASVAB : MEPS, site MET, PiCAT, école ou base (Official ASVAB, Where to Take the ASVAB) */
  where: (l) => ({
    inputs: [
      { kind: 'select', id: 'w', label: T(l, 'Your situation', 'Su situación'), def: 'new', wide: true, options: [
        { value: 'new', label: T(l, 'Never took the ASVAB, want to enlist', 'Nunca hizo el ASVAB y quiere alistarse') },
        { value: 'prior', label: T(l, 'Took it before at a MEPS or MET site', 'Ya lo hizo en un MEPS o un sitio MET') },
        { value: 'sst', label: T(l, 'Took it at school, given by school staff', 'Lo hizo en la escuela, con el personal escolar') },
        { value: 'cep', label: T(l, 'Student exploring careers', 'Estudiante que explora carreras') },
        { value: 'service', label: T(l, 'Already serving, want to retest', 'Ya en servicio y quiere repetirlo') },
      ] },
      { kind: 'choice', id: 'm', label: T(l, 'Distance to a MEPS', 'Distancia a un MEPS'), def: 'near', options: [{ value: 'near', label: T(l, 'Close enough', 'Cerca') }, { value: 'far', label: T(l, 'Far away', 'Lejos') }] },
      { kind: 'date', id: 'd', label: T(l, 'Date of your earlier ASVAB, if any', 'Fecha de su ASVAB anterior, si lo hizo'), def: '2026-03-12', adv: true },
    ],
    run: (v) => {
      const w = s(v, 'w'), far = s(v, 'm') === 'far', d = s(v, 'd'), until = addYears(d, P.retest.validYears), left = daysBetween(LAST_UPDATED, until);
      const site = far ? T(l, 'a MET site near you', 'un sitio MET cercano') : T(l, 'a MEPS', 'un MEPS');
      const mode: [string, string] = [T(l, 'Format', 'Formato'), far ? T(l, 'computer at most MET sites, paper and pencil at a few', 'computadora en la mayoría de los sitios MET, papel y lápiz en unos pocos') : T(l, 'computer (CAT-ASVAB)', 'computadora (CAT-ASVAB)')];
      const idRow: [string, string] = [T(l, 'Bring', 'Lleve'), T(l, 'a valid ID; arrive on time or you are sent back to reschedule', 'una identificación válida; llegue a tiempo o tendrá que volver otro día')];
      const valid: [string, string] = [T(l, 'Earlier scores usable until', 'Puntajes anteriores utilizables hasta'), left >= 0 ? day(until, l) : T(l, `expired on ${day(until, l)}`, `vencidos el ${day(until, l)}`)];
      if (w === 'new') return {
        label: T(l, 'Where you take the ASVAB', 'Dónde hace el ASVAB'), value: far ? T(l, 'MET site, set up by a recruiter', 'Sitio MET, por medio de un reclutador') : T(l, 'MEPS, set up by a recruiter', 'MEPS, por medio de un reclutador'),
        sub: T(l, `Or at home with the PiCAT, then a short Vtest at ${site}.`, `O en casa con el PiCAT y luego un Vtest breve en ${site}.`),
        rows: [[T(l, 'First step', 'Primer paso'), T(l, 'contact a recruiter, who checks the rest of your file first', 'contactar a un reclutador, que revisa antes el resto de su expediente')], mode, idRow, [T(l, 'PiCAT at home', 'PiCAT en casa'), T(l, `code valid ${P.picat.codeDays} days, Vtest within ${P.picat.vtestDays} days`, `código válido ${P.picat.codeDays} días, Vtest en ${P.picat.vtestDays} días`)], [T(l, 'Scores usable for', 'Puntajes utilizables durante'), T(l, `${P.retest.validYears} years from the test date`, `${P.retest.validYears} años desde la fecha del examen`)]],
        note: T(l, `Official ASVAB: applicants test at one of the ${P.testing.meps} MEPS in the U.S. and Puerto Rico, or at a MET site for those who live far from one.`, `Official ASVAB: los aspirantes se examinan en uno de los ${P.testing.meps} MEPS de Estados Unidos y Puerto Rico, o en un sitio MET si viven lejos de uno.`),
      };
      if (w === 'prior') return {
        label: T(l, 'Where you retest', 'Dónde repite el examen'), value: far ? T(l, 'MET site, set up by a recruiter', 'Sitio MET, por medio de un reclutador') : T(l, 'MEPS, set up by a recruiter', 'MEPS, por medio de un reclutador'),
        sub: T(l, 'The PiCAT is closed to you: it is only for people who never took the ASVAB.', 'El PiCAT no está a su alcance: es solo para quien nunca hizo el ASVAB.'),
        rows: [valid, [T(l, 'Earliest retest', 'Primera repetición posible'), day(nextRetest(d, 1), l)], mode, idRow],
        note: T(l, 'Official ASVAB: scores usable two years from the test date; one calendar month between the first tests, then six months.', 'Official ASVAB: puntajes utilizables dos años desde la fecha del examen; un mes calendario entre los primeros exámenes y luego seis meses.'),
      };
      if (w === 'sst') return {
        label: T(l, 'What you need before enlisting', 'Lo que necesita antes de alistarse'), value: T(l, `A Vtest at ${site}`, `Un Vtest en ${site}`),
        sub: left >= 0 ? T(l, 'School staff scores count only after a verification test, set up by a recruiter.', 'Los puntajes del personal escolar solo cuentan después de una prueba de verificación, por medio de un reclutador.') : T(l, 'Your school scores have expired: a full test at a MEPS or MET site is needed.', 'Sus puntajes escolares vencieron: hace falta un examen completo en un MEPS o un sitio MET.'),
        rows: [valid, [T(l, 'Who schedules it', 'Quién lo programa'), T(l, 'a recruiter', 'un reclutador')], idRow],
        note: T(l, 'Official ASVAB, Where to Take the ASVAB: scores from School Staff Testing (SST) need a Verification Test (Vtest) before they are used to enlist.', 'Official ASVAB, Where to Take the ASVAB: los puntajes de School Staff Testing (SST) necesitan una prueba de verificación (Vtest) antes de usarse para alistarse.'),
      };
      if (w === 'cep') return {
        label: T(l, 'Where you take the ASVAB', 'Dónde hace el ASVAB'), value: T(l, 'At your school', 'En su escuela'),
        sub: T(l, 'Through the ASVAB Career Exploration Program: ask a teacher or counselor.', 'Con el ASVAB Career Exploration Program: pregunte a un maestro o consejero.'),
        rows: [[T(l, 'Open to', 'Abierto a'), T(l, 'high school and post-secondary students', 'estudiantes de secundaria y posteriores')], [T(l, 'Usable to enlist later', 'Utilizable luego para alistarse'), T(l, `within ${P.retest.validYears} years, after a Vtest if school staff gave it`, `en ${P.retest.validYears} años, tras un Vtest si lo aplicó el personal escolar`)], [T(l, 'Same content as the enlistment test', 'Mismo contenido que el examen de alistamiento'), T(l, 'yes', 'sí')]],
        note: T(l, 'Official ASVAB: the school test is part of the Career Exploration Program; the MEPS and MET test is part of the Enlistment Testing Program.', 'Official ASVAB: el examen escolar forma parte del Career Exploration Program; el de MEPS y sitios MET, del Enlistment Testing Program.'),
      };
      return {
        label: T(l, 'Where you retest', 'Dónde repite el examen'), value: T(l, 'Your base education office', 'La oficina de educación de su base'),
        sub: T(l, 'In-service testing is run by the services, for reclassification or job training.', 'El examen en servicio lo organizan las ramas, para reclasificación o formación.'),
        rows: [[T(l, 'Ask', 'Pregunte en'), T(l, 'the base educational office', 'la oficina educativa de la base')], [T(l, 'Recruiter needed', 'Hace falta reclutador'), T(l, 'no', 'no')]],
        note: T(l, 'Official ASVAB, Where to Take the ASVAB: in-service testing, contact your base educational office.', 'Official ASVAB, Where to Take the ASVAB: examen en servicio, contacte la oficina educativa de su base.'),
      };
    },
  }),

  /* Validité des scores (école ou MEPS) */
  validity: (l) => ({
    inputs: [{ kind: 'date', id: 'd', label: T(l, 'Date you took the ASVAB', 'Fecha en que hizo el ASVAB'), def: '2025-03-12' }, { kind: 'choice', id: 'w', label: T(l, 'Where', 'Dónde'), def: 'school', options: [{ value: 'school', label: T(l, 'School', 'Escuela') }, { value: 'meps', label: 'MEPS / MET' }] }],
    run: (v) => {
      const d = s(v, 'd'), until = addYears(d, P.retest.validYears), left = daysBetween(LAST_UPDATED, until);
      return {
        label: T(l, 'Usable for enlistment until', 'Utilizable para alistarse hasta el'), value: day(until, l),
        sub: left >= 0 ? T(l, `${num(left, l)} days left on ${day(LAST_UPDATED, l)}.`, `Quedan ${num(left, l)} días al ${day(LAST_UPDATED, l)}.`) : T(l, `Expired ${num(-left, l)} days before ${day(LAST_UPDATED, l)}: a new test is needed.`, `Vencido ${num(-left, l)} días antes del ${day(LAST_UPDATED, l)}: hace falta un examen nuevo.`),
        rows: [[T(l, 'Earliest retest if you test again', 'Primera repetición posible'), day(addMonths(d, 1), l)], [T(l, 'School test given by school staff (SST)', 'Examen escolar administrado por el personal (SST)'), s(v, 'w') === 'school' ? T(l, 'needs a Vtest first', 'necesita antes un Vtest') : T(l, 'not concerned', 'no aplica')], [T(l, 'Assembling Objects in a school test', 'Ensamblaje de Objetos en el examen escolar'), s(v, 'w') === 'school' ? T(l, 'not given', 'no se aplica') : T(l, 'given', 'se aplica')]],
        note: T(l, 'Official ASVAB FAQ: scores usable for two years from the test date, if they can be verified as yours.', 'Preguntas frecuentes de Official ASVAB: puntajes utilizables dos años desde la fecha del examen, si se puede verificar que son suyos.'),
      };
    },
  }),

  /* Ce que rapporte un point de plus */
  gain: (l) => ({
    inputs: [std(l, 'AR', 46), std(l, 'MK', 48), std(l, 'VE', 45)],
    run: (v) => {
      const x = sc(v), p = afqt(x), up = (k: Sub, d: number) => afqt({ ...x, [k]: (x[k] ?? 50) + d });
      return {
        label: T(l, 'AFQT if VE rises by 3 points', 'AFQT si VE sube 3 puntos'), value: num(up('VE', 3), l), sub: T(l, `Today: ${p}. VE counts twice in the sum.`, `Hoy: ${p}. VE cuenta doble en la suma.`),
        rows: [[T(l, 'AR + 3', 'AR + 3'), num(up('AR', 3), l), up('AR', 3) - p], [T(l, 'MK + 3', 'MK + 3'), num(up('MK', 3), l), up('MK', 3) - p], [T(l, 'VE + 3', 'VE + 3'), num(up('VE', 3), l), up('VE', 3) - p], [T(l, 'AR + 2, MK + 2, VE + 2', 'AR + 2, MK + 2, VE + 2'), num(afqt({ AR: (x.AR ?? 50) + 2, MK: (x.MK ?? 50) + 2, VE: (x.VE ?? 50) + 2 }), l)]],
        note: STD_NOTE(l),
      };
    },
  }),
};

export function getTool(kind: string, lang: Lang, arg?: Args): ToolSpec {
  const f = SPECS[kind];
  if (!f) throw new Error(`Unknown tool ${kind}`);
  const spec = f(lang, arg);
  if (arg) for (const i of spec.inputs) if (arg[i.id] !== undefined) (i as { def: number | string }).def = i.kind === 'choice' || i.kind === 'select' || i.kind === 'date' ? String(arg[i.id]) : Number(arg[i.id]);
  return spec;
}
export function runTool(kind: string, lang: Lang, args: V = {}) {
  const spec = getTool(kind, lang);
  const v: V = resolve(spec.inputs, { ...Object.fromEntries(spec.inputs.map((i) => [i.id, i.def])), ...args });
  return spec.run(v);
}
export const TOOL_KINDS = Object.keys(SPECS);
