/** Configuration centrale du site (générée par new-site.py). */
export const SITE_URL = "https://asvabcalc.com";
export const SITE_NAMES: Record<string, string> = {"en": "ASVAB Calc", "es": "ASVAB Calc"};
export const LANG_TAGS: Record<string, string> = {"en": "en-US", "es": "es-US"};
export const OG_LOCALES: Record<string, string> = {"en": "en_US", "es": "es_US"};
export const LOCALE_TAG = 'en-US';
export const CURRENCY = 'USD';
export const YEAR = 2026;
/** Année de création du site — signal d'ancienneté (RECETTE §8.0). */
export const SITE_FOUNDED = '2026';
export const LAST_UPDATED = '2026-10-22';
export const AUTHOR_NAME = 'Radif Partners';
export const AUTHOR_ROLE: Record<string, string> = {"en": "Independent publisher of ASVAB score tools built on the conversion tables of the 1997 score scale published by the Defense Manpower Data Center", "es": "Editor independiente de herramientas de puntaje del ASVAB construidas sobre las tablas de conversión de la escala de 1997 publicadas por el Defense Manpower Data Center"};
export const AUTHOR_DESC: Record<string, string> = {"en": "Radif Partners turns the standard scores printed on an ASVAB score report into the numbers recruiters look at: the AFQT percentile read from the 1997 conversion table, the AFQT category, the enlistment floor of each service as its own recruiting site states it, the Air Force MAGE percentiles, the Marine Corps and Army composites and the Navy sums. Every formula and every cut-off links to the page or report where it was read, with the date. Practice questions are written by us and say so. Nothing is sold and no contact details are asked for.", "es": "Radif Partners convierte los puntajes estándar de un informe del ASVAB en las cifras que mira un reclutador: el percentil AFQT leído en la tabla de conversión de 1997, la categoría AFQT, el mínimo de cada rama tal como lo publica su propio sitio de reclutamiento, los percentiles MAGE de la Fuerza Aérea, los compuestos de los Marines y del Ejército y las sumas de la Armada. Cada fórmula y cada mínimo enlaza con la página o el informe donde se leyó, con la fecha. Las preguntas de práctica las escribimos nosotros y lo decimos. No vendemos nada ni pedimos datos de contacto."};
/** Sujets sur lesquels l'editeur est competent (schema.org knowsAbout). Ce sont les
 *  themes reellement traites par le site, pas une liste de mots-cles : un sujet
 *  declare ici sans page qui le couvre est une declaration fausse. */
export const KNOWS_ABOUT: Record<string, string[]> = {"en": ["ASVAB standard scores and the 1997 score scale", "AFQT percentile scores and categories", "Air Force MAGE composite percentiles", "Army and Marine Corps line scores", "ASVAB retest policy and PiCAT", "ASVAB subtest content"], "es": ["Puntajes estándar del ASVAB y la escala de 1997", "Percentiles y categorías del AFQT", "Percentiles compuestos MAGE de la Fuerza Aérea", "Line scores del Ejército y de los Marines", "Política de repetición del ASVAB y PiCAT", "Contenido de las subpruebas del ASVAB"]};
export const CONTACT_EMAIL = "contact@asvabcalc.com";
export const THEME_COLOR = '#3F5A24';
export const LOGO_SYMBOL = 'QT';
export const BING_VERIFY_CODE = '';
export const GOOGLE_VERIFY_CODE = '';
/** Régime : 'none' pour tous les sites (RECETTE §15.6, décision de l'éditeur du 2026-10-06) :
 *  aucun bandeau ; Clarity chargé en mode sans cookie (consentv2 denied) ; GA4 avec cookies si GA4_ID.
 *  'opt-in' / 'notice' ne servent plus qu'aux sites anciens qui les portent encore. */
export const CONSENT_MODE: 'opt-in' | 'notice' | 'none' = 'none';
/** Propriété Google Analytics 4 (décision de l'éditeur du 2026-10-17, RECETTE §15.6) : GA4 normal,
 *  avec cookies _ga / _ga_<ID> (390 jours), sans bandeau, publicité refusée. Créée par
 *  `seo-platform/scripts/create-ga4.ts accounts/372759688` (RECETTE §15.3, étape 15), puis
 *  pages légales régénérées : `python3 scripts/gen-legal-pages.py .`. Vide = pas de GA4. */
export const GA4_ID = 'G-8WVHZK40PG';
/** Projet Microsoft Clarity (compte amradif), chargé sans cookie. Vide = aucune mesure. */
export const CLARITY_ID = 'z25yfuayfh';
export const INDEXNOW_KEY = 'f683aca3a0b7197d3f86153c8482bc2a';

/* ------------------------------------------------------------------------- *
 * IDENTITÉ LÉGALE — À COMPLÉTER AVANT LA MISE EN LIGNE
 * Ces champs alimentent la mention légale du pays, la politique de confidentialité,
 * la page contact et le schema Organization. Un champ vide s'affiche en jaune
 * sur le site. Contrôle : `npm run check:legal`.
 * ------------------------------------------------------------------------- */
export interface LegalHosting { name: string; address: string; phone: string; url: string }
export interface LegalIdentity {
  entityName: string; legalForm: string; street: string; postalCode: string; city: string;
  country: string; phone: string; registerLabel: string; registerNumber: string;
  vatLabel: string; vatNumber: string; jurisdiction: string;
  supervisoryAuthority: string; supervisoryAuthorityUrl: string; hosting: LegalHosting;
}
export const LEGAL: LegalIdentity = {
  entityName: 'Radif Partners',  // éditeur de tous les sites du portefeuille (RECETTE §8)
  legalForm: '',  // vide : comme sur les autres sites du portefeuille
  street: '49 rue du Ressort',
  postalCode: '63000',
  city: 'Clermont-Ferrand',
  country: "France",
  phone: '',                 // ligne de contact publiée
  registerLabel: "SIREN",
  registerNumber: '',
  vatLabel: "TVA",
  vatNumber: '',             // laisser vide si non assujetti
  jurisdiction: "France",
  supervisoryAuthority: "Commission nationale de l'informatique et des libertés (CNIL)",
  supervisoryAuthorityUrl: "https://www.cnil.fr",
  hosting: { name: 'GitHub, Inc. (GitHub Pages)', address: '88 Colin P Kelly Jr Street, San Francisco, CA 94107, United States', phone: '', url: 'https://pages.github.com' },
};

/** Champs sans lesquels le site ne doit pas être mis en ligne. */
export const LEGAL_REQUIRED: Array<keyof LegalIdentity> = ['entityName', 'street', 'postalCode', 'city'];

/** Profils publics de l'auteur (schema.org sameAs). Laisser vide si aucun. */
export const AUTHOR_SAME_AS: string[] = [];

/** Rythme de revue éditoriale annoncé sur le site, en mois. */
export const REVIEW_CYCLE_MONTHS = 12;
