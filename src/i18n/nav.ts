import { route, hasRoute, type Locale } from './routes';
import { GUIDES, guideById } from '../lib/pages';
import type { Group } from '../lib/page-types';
export interface NavLink { href: string; label: string } export interface NavCategory { label: string; links: NavLink[] }
const CORE: Record<Locale, Record<string, string>> = {
  en: { home: 'ASVAB score calculator', method: 'Method', about: 'About', widget: 'Embed the calculator', contact: 'Contact', editorial: 'Editorial policy', privacy: 'Privacy', terms: 'Legal notice', cookies: 'Cookies' },
  es: { home: 'Calculadora de puntaje del ASVAB', method: 'Método', about: 'Quiénes somos', widget: 'Insertar la calculadora', contact: 'Contacto', editorial: 'Política editorial', privacy: 'Privacidad', terms: 'Aviso legal', cookies: 'Cookies' },
};
export const GROUPS: Array<{ id: Group; label: Record<Locale, string> }> = [
  { id: 'scores', label: { en: 'Scores and AFQT', es: 'Puntajes y AFQT' } },
  { id: 'branches', label: { en: 'By branch', es: 'Por rama' } },
  { id: 'practice', label: { en: 'Practice by subtest', es: 'Práctica por subprueba' } },
  { id: 'test', label: { en: 'Test day and retests', es: 'Día del examen y repeticiones' } },
];
export const label = (id: string, lang: Locale) => CORE[lang][id] ?? guideById(id)?.[lang]?.nav ?? guideById(id)?.en.nav ?? id;
const link = (id: string, lang: Locale): NavLink => ({ href: route(id, lang), label: label(id, lang) });
export const inGroup = (g: Group, lang: Locale): NavLink[] => GUIDES.filter((p) => p.group === g && hasRoute(p.id, lang)).map((p) => link(p.id, lang));
export function navCategories(lang: Locale): NavCategory[] {
  return GROUPS.map((g) => ({ label: g.label[lang], links: inGroup(g.id, lang) })).filter((c) => c.links.length);
}
export const navDirect = (lang: Locale): NavLink[] => [link('method', lang)];
export const footerColumns = (lang: Locale): NavCategory[] => [
  { label: GROUPS[0].label[lang], links: inGroup('scores', lang) },
  { label: lang === 'es' ? 'Este sitio' : 'This site', links: ['home', 'method', 'about', 'contact', 'editorial', 'widget', 'terms', 'privacy', 'cookies'].map((i) => link(i, lang)) },
];
/** Ramas y práctica, à un clic de toute page (RECETTE §18.2). */
export const popularLinks = (lang: Locale): NavLink[] => (['branches', 'practice', 'test'] as Group[]).flatMap((g) => inGroup(g, lang));
