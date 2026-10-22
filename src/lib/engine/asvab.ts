/**
 * Moteur du site : scores standard de l'ASVAB → percentile AFQT, catégorie, composites des services.
 * Toutes les constantes viennent de src/data (table de conversion de 1997 et formules publiées par
 * Segall 2004, DMDC TR 2004-002 ; minimums lus sur les sites de recrutement le 2026-10-22).
 */
import CONV from '../../data/conversion-1997.json';
import P from '../../data/params-2026.json';

export type Sub = 'GS' | 'AR' | 'WK' | 'PC' | 'MK' | 'EI' | 'AS' | 'MC' | 'AO' | 'VE';
export type Scores = Partial<Record<Sub, number>>;
export type Table = 'AFQT' | 'M' | 'A' | 'G' | 'E';
const T = CONV as unknown as Record<Table, { min: number; max: number; pct: number[] }>;

/** Arrondi au plus proche, demi vers le haut (Rnd du rapport). */
export const rnd = (x: number) => Math.floor(x + 0.5);
const g = (s: Scores, k: Sub) => s[k] ?? 50;

/** Percentile lu dans une table de conversion de 1997 (somme hors table : 1 ou 99). */
export function lookup(table: Table, sum: number): number {
  const t = T[table];
  const i = Math.min(t.max, Math.max(t.min, Math.round(sum))) - t.min;
  return t.pct[i];
}
export const tableRange = (table: Table) => ({ min: T[table].min, max: T[table].max });

/** AFQT_S = AR + MK + 2 × VE (scores standard arrondis). */
export const afqtSum = (s: Scores) => g(s, 'AR') + g(s, 'MK') + 2 * g(s, 'VE');
export const afqt = (s: Scores) => lookup('AFQT', afqtSum(s));

/** Plus petite somme AR + MK + 2VE qui donne au moins ce percentile (null si impossible). */
export function sumForPercentile(target: number): number | null {
  const t = T.AFQT;
  for (let i = 0; i < t.pct.length; i++) if (t.pct[i] >= target) return t.min + i;
  return null;
}

export const CATEGORIES = P.categories as Array<[string, number, number]>;
export function category(pct: number): string {
  const c = CATEGORIES.find(([, lo, hi]) => pct >= lo && pct <= hi);
  return c ? c[0] : 'V';
}

/** VE estimé à partir des scores standard WK et PC (forme de référence 04D, ± 1 point). */
export function veFromWkPc(wk: number, pc: number): number {
  const f = P.veForm04D;
  const tWk = (wk - f.wk[1]) / f.wk[0], tPc = (pc - f.pc[1]) / f.pc[0];
  return rnd(f.w[0] * tWk + f.w[1] * tPc + f.w[2]);
}

/** Air Force : sommes M, A, G, E puis percentiles des tables C.1 à C.4. */
export function mage(s: Scores) {
  const W = P.mage as Record<'M' | 'A' | 'G' | 'E', Partial<Record<Sub, number>>>;
  const out = {} as Record<'M' | 'A' | 'G' | 'E', { sum: number; pct: number }>;
  for (const k of ['M', 'A', 'G', 'E'] as const) {
    const sum = Object.entries(W[k]).reduce((a, [sub, w]) => a + (w as number) * g(s, sub as Sub), 0);
    out[k] = { sum, pct: lookup(k, sum) };
  }
  return out;
}
export const MAGE_PARTS = P.mage as Record<'M' | 'A' | 'G' | 'E', Partial<Record<Sub, number>>>;

/** Marine Corps : MM, GT, EL, CL (moyenne 100, écart type 20). */
export function marines(s: Scores) {
  const M = P.marines as unknown as Record<'MM' | 'GT' | 'EL' | 'CL', [Sub[], number, number]>;
  return Object.fromEntries(Object.entries(M).map(([k, [subs, a, b]]) => [k, rnd(a * subs.reduce((x, y) => x + g(s, y), 0) + b)])) as Record<'MM' | 'GT' | 'EL' | 'CL', number>;
}
export const MARINE_PARTS = Object.fromEntries(Object.entries(P.marines).map(([k, v]) => [k, (v as [Sub[]])[0]])) as Record<'MM' | 'GT' | 'EL' | 'CL', Sub[]>;

/** Army GT = Rnd(1,074292 × (AR + VE) − 7,443781) : formule exacte du rapport. */
export const armyGt = (s: Scores) => rnd(P.armyGt[0] * (g(s, 'AR') + g(s, 'VE')) + P.armyGt[1]);
export const ARMY_KEYS = ['CL', 'CO', 'EL', 'FA', 'GM', 'MM', 'OF', 'SC', 'ST'] as const;
export type ArmyKey = (typeof ARMY_KEYS)[number];
/** Neuf autres composites de l'Army : poids du tableau 2.7 (2004), estimation si l'Army les a revus depuis. */
export function army(s: Scores): Record<ArmyKey | 'GT', number> {
  const W = P.armyComposites as unknown as Record<ArmyKey, number[]>;
  const cols: Sub[] = ['GS', 'AR', 'MK', 'MC', 'EI', 'AS', 'VE'];
  const out = { GT: armyGt(s) } as Record<ArmyKey | 'GT', number>;
  for (const k of ARMY_KEYS) out[k] = rnd(cols.reduce((a, c, i) => a + W[k][i] * g(s, c), 0) + W[k][7]);
  return out;
}

/** Somme brute de scores standard, comme la Navy les rapporte. */
export const rawSum = (s: Scores, subs: Sub[]) => subs.reduce((a, k) => a + g(s, k), 0);

export type Branch = 'army' | 'airforce' | 'marines' | 'coastguard' | 'spaceforce' | 'navy';
export const BRANCHES: Branch[] = ['army', 'airforce', 'navy', 'marines', 'coastguard', 'spaceforce'];
type BranchRule = { min: number | null; ged: number | null; src: string | null; note?: string };
export const RULES = P.branches as unknown as Record<Branch, BranchRule>;
/** Minimum publié pour un diplôme ('hs') ou un GED ('ged') ; null = aucun chiffre publié. */
export function minimumFor(b: Branch, edu: 'hs' | 'ged'): number | null {
  const r = RULES[b];
  if (r.min === null) return null;
  return edu === 'ged' && r.ged !== null ? r.ged : r.min;
}

/** Part de la population de référence au-dessus d'un score standard (loi normale, moyenne 50, écart type 10). */
export function shareAbove(std: number): number {
  const z = (std - 50) / 10;
  return 1 - normalCdf(z);
}
export function normalCdf(z: number): number {
  // Abramowitz et Stegun 7.1.26
  const t = 1 / (1 + 0.3275911 * Math.abs(z) / Math.SQRT2);
  const y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-(z * z) / 2);
  return z >= 0 ? (1 + y) / 2 : (1 - y) / 2;
}

/* ---------- dates ---------- */
const D = (iso: string) => new Date(`${iso}T00:00:00Z`);
const iso = (d: Date) => d.toISOString().slice(0, 10);
/** Ajoute n mois civils (31 mars + 1 mois = 30 avril : dernier jour du mois quand le jour n'existe pas). */
export function addMonths(d: string, n: number): string {
  const x = D(d), day = x.getUTCDate();
  const y = new Date(Date.UTC(x.getUTCFullYear(), x.getUTCMonth() + n, 1));
  const last = new Date(Date.UTC(y.getUTCFullYear(), y.getUTCMonth() + 1, 0)).getUTCDate();
  y.setUTCDate(Math.min(day, last));
  return iso(y);
}
export const addDays = (d: string, n: number) => { const x = D(d); x.setUTCDate(x.getUTCDate() + n); return iso(x); };
export const addYears = (d: string, n: number) => addMonths(d, 12 * n);
export const daysBetween = (a: string, b: string) => Math.round((D(b).getTime() - D(a).getTime()) / 86400000);

/** Prochaine date de repasse : 1 mois après le test initial, 1 mois après la 1re repasse, puis 6 mois. */
export function nextRetest(lastTest: string, testsTaken: number): string {
  const R = P.retest;
  const months = testsTaken <= 1 ? R.firstMonths : testsTaken === 2 ? R.secondMonths : R.laterMonths;
  return addMonths(lastTest, months);
}
