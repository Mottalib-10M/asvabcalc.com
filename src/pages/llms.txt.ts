/** llms.txt (RECETTE §21), généré à partir du registre des pages. */
import { GUIDES } from '../lib/pages';
import { SITE_URL, LAST_UPDATED, SITE_NAMES } from '../data/site-config';
import { route, hasRoute } from '../i18n/routes';
import { GROUPS } from '../i18n/nav';
import { KIT as K } from '../lib/kit';
export function GET() {
  const E = K.E;
  const lines = [
    `# ${SITE_NAMES.en} / ${SITE_NAMES.es}`, '',
    `> ASVAB score tools in English and Spanish. AFQT percentile = AR + MK + 2 × VE read in table 2.5 of the 1997 ASVAB score scale report (Segall 2004, DMDC TR 2004-002): sum ${E.sumForPercentile(31)} gives 31, ${E.sumForPercentile(50)} gives 50, ${E.sumForPercentile(93)} gives 93. Air Force MAGE percentiles (tables C.1 to C.4), Marine Corps and Army GT line scores (exact formulas), nine other Army composites (2004 weights, estimates). Minimum AFQT read on each recruiting site on ${LAST_UPDATED}: Army ${K.P.branches.army.min}, Air Force ${K.P.branches.airforce.min} (${K.P.branches.airforce.ged} with a GED), Marine Corps ${K.P.branches.marines.min} (${K.P.branches.marines.ged} with a GED), Coast Guard ${K.P.branches.coastguard.min}; Navy and Space Force: no figure published here. Practice questions are written by the publisher, not real ASVAB items. Independent site published by Radif Partners, not affiliated with the Department of Defense or any branch. Last updated ${LAST_UPDATED}.`, '',
    ...GROUPS.flatMap((g) => [`## ${g.label.en} / ${g.label.es}`, ...GUIDES.filter((p) => p.group === g.id).flatMap((p) => [`- [${p.en.nav}](${SITE_URL}${route(p.id, 'en')}): ${p.en.card}`, ...(p.es && hasRoute(p.id, 'es') ? [`- [${p.es.nav}](${SITE_URL}${route(p.id, 'es')}): ${p.es.card}`] : [])]), '']),
    '## About', `- [Method](${SITE_URL}${route('method', 'en')})`, `- [Método](${SITE_URL}${route('method', 'es')})`, `- [About](${SITE_URL}${route('about', 'en')})`, `- [Quiénes somos](${SITE_URL}${route('about', 'es')})`,
  ];
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
