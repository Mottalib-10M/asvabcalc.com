import type { Locale } from './routes';
const en = {
  updatedOn: 'Data read on', editorialPolicy: 'Editorial policy', contactLabel: 'Contact', reviewedBy: 'Prepared by',
  skipToContent: 'Skip to content', mainNav: 'Main navigation', breadcrumbLabel: 'Breadcrumb', breadcrumbHome: 'Home', menuOpen: 'Open menu',
  faqTitle: 'Common questions', relatedCalculators: 'Keep going', sourcesTitle: 'Official sources for this page', writtenBy: 'Prepared by',
  asOf: 'Figures', lastUpdated: 'updated from official sources on', footerValidated: 'Sources: 1997 ASVAB score scale report (DMDC), officialasvab.com, recruiting sites of the Army, Air Force, Marine Corps, Coast Guard and Space Force, 10 U.S.C. § 520',
  footerBrowser: 'Every score is computed in your browser · no account, no email, no recruiter contact form',
  footerDisclaimer: 'Independent site published by Radif Partners. Not affiliated with the Department of Defense, any military service or any recruiter. Your official scores are the ones on your MEPS or school score report; service minimums can change, so confirm them with a recruiter. This site does not replace your score report or a recruiter.',
  footerPopular: 'Branches, practice and test day',
  notFound: 'Nothing lives at this address. The home page turns your ASVAB standard scores into your AFQT percentile, category and line scores.',
  readMore: 'Read the full answer',
  estimate: 'Exact conversions from the published 1997 tables; composites marked as estimates are labeled. Your official score report prevails.',
  moreOptions: 'More scores', copyLink: 'Copy share link', copied: 'Link copied', print: 'Print', howComputed: 'How this is computed', openFull: 'Open the full calculator',
};
const es: typeof en = {
  updatedOn: 'Datos leídos el', editorialPolicy: 'Política editorial', contactLabel: 'Contacto', reviewedBy: 'Preparado por',
  skipToContent: 'Ir al contenido', mainNav: 'Navegación principal', breadcrumbLabel: 'Ruta de navegación', breadcrumbHome: 'Inicio', menuOpen: 'Abrir el menú',
  faqTitle: 'Preguntas frecuentes', relatedCalculators: 'Para seguir', sourcesTitle: 'Fuentes oficiales de esta página', writtenBy: 'Preparado por',
  asOf: 'Cifras', lastUpdated: 'leídas en las fuentes oficiales, actualizado el', footerValidated: 'Fuentes: informe de la escala de puntajes del ASVAB de 1997 (DMDC), officialasvab.com, sitios de reclutamiento del Ejército, la Fuerza Aérea, los Marines, la Guardia Costera y la Fuerza Espacial, 10 U.S.C. § 520',
  footerBrowser: 'Cada puntaje se calcula en su navegador · sin cuenta, sin correo, sin formulario de contacto con reclutadores',
  footerDisclaimer: 'Sitio independiente publicado por Radif Partners. Sin vínculo con el Departamento de Defensa, ninguna rama militar ni ningún reclutador. Sus puntajes oficiales son los de su informe del MEPS o de la escuela; los mínimos de cada rama pueden cambiar, así que confírmelos con un reclutador. Este sitio no sustituye a su informe de puntajes ni a un reclutador.',
  footerPopular: 'Ramas, práctica y día del examen',
  notFound: 'No hay ninguna página en esta dirección. La página de inicio convierte sus puntajes estándar del ASVAB en su percentil AFQT, su categoría y sus line scores.',
  readMore: 'Leer la respuesta completa',
  estimate: 'Conversiones exactas a partir de las tablas publicadas de 1997; los compuestos estimados se indican como tales. Su informe oficial prevalece.',
  moreOptions: 'Más puntajes', copyLink: 'Copiar el enlace', copied: 'Enlace copiado', print: 'Imprimir', howComputed: 'Cómo se calcula', openFull: 'Abrir la calculadora completa',
};
export function t(lang: Locale) { return lang === 'es' ? es : en; }
