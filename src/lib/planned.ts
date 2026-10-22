/** Toutes les pages prévues (id = nom du fichier de src/content/guides). Les tests de contenu acceptent un lien
 *  vers ces ids pendant la rédaction ; le test « toutes les pages existent » échoue tant qu'il manque un fichier. */
export const PLANNED_GUIDES = [
  // Scores et AFQT
  'afqt-calculator', 'asvab-scores', 'good-asvab-score', 'afqt-categories', 've-score', 'line-scores',
  // Par branche
  'minimum-score', 'army', 'army-gt', 'air-force', 'air-force-jobs', 'marines', 'navy', 'coast-guard', 'space-force', 'ged',
  // Pratique
  'practice-test', 'arithmetic-reasoning', 'word-knowledge', 'paragraph-comprehension', 'math-knowledge', 'general-science', 'electronics-information', 'auto-shop', 'mechanical-comprehension',
  // Jour du test
  'test-length', 'cat-vs-paper', 'retest', 'picat', 'school-asvab', 'study-plan',
];
export const PLANNED_IDS = new Set<string>([...PLANNED_GUIDES, 'home', 'method', 'about', 'widget', 'contact', 'editorial', 'privacy', 'terms', 'cookies']);
