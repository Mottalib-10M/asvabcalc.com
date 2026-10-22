/**
 * Trousse de rédaction (CONTRIBUTING-PAGES.md) : tout chiffre écrit dans une page vient d'ici, jamais tapé à la main.
 *   K.P            params-2026.json (minimums, longueurs du test, règles de repasse, sources)
 *   K.E            moteur (afqt, lookup, category, mage, marines, army, veFromWkPc, nextRetest…)
 *   K.JOBS         métiers enlisted de l'Air Force avec leurs minimums MAGE (af-jobs.json)
 *   K.tool(kind, lang, args)  lance un simulateur de tool-specs.ts et rend sa carte de résultat
 *   K.en / K.es    formats de la langue : n (nombre), p (pourcentage), day (date)
 */
import P from '../data/params-2026.json';
import JOBS from '../data/af-jobs.json';
import * as E from './engine/asvab';
import { runTool } from './tool-specs';
import { formatNumber, formatPercent, displayDate, type Lang } from './format';
import { LAST_UPDATED } from '../data/site-config';

const fmt = (l: Lang) => ({
  n: (x: number, d = 0) => formatNumber(x, d, l),
  p: (x: number, d = 0) => formatPercent(x, d, l),
  day: (iso: string) => displayDate(iso, l === 'es' ? 'es-US' : 'en-US'),
});
export const KIT = {
  P, E, JOBS: JOBS.jobs as Array<{ t: string; afsc: string; req: Array<[string, number]>; raw: string; tag: string; url: string }>,
  TODAY: LAST_UPDATED,
  tool: runTool,
  en: fmt('en'), es: fmt('es'), fmt,
};
export type Kit = typeof KIT;
