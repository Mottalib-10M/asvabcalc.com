#!/usr/bin/env python3
"""Relecture des sources officielles du site ASVAB (lancé par .github/workflows/update-data.yml).

1. Métiers de l'Air Force : relit l'API publique https://www.airforce.com/bin/api/careers (JSON, pagination
   offset/limit) et régénère src/data/af-jobs.json (métiers enrôlés, exigences MAGE). Si l'API rend moins de
   80 % des métiers déjà connus, le fichier n'est pas touché et le job échoue.
2. Faits de params-2026.json : relit chaque page officielle (officialasvab.com, sites de recrutement, 10 U.S.C. § 520)
   et vérifie que le fait publié y figure encore (motif ci-dessous). Le script ne réécrit jamais un chiffre seul :
   un motif introuvable fait échouer le job, une personne relit la page et corrige params-2026.json.
   Une page qui refuse la lecture automatique (403, 5xx) est notée « injoignable » sans faire échouer le job.
3. data/verification.json garde la date et le résultat de chaque relecture ; retrieved_at de params-2026.json
   passe à la date du jour seulement si aucun fait n'a disparu.

Pas de dépendance hors bibliothèque standard. Usage : python3 scripts/update-data.py [--dry-run]
"""
import datetime as dt
import json
import os
import re
import sys
import time
import urllib.error
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PARAMS = os.path.join(ROOT, 'src/data/params-2026.json')
JOBS = os.path.join(ROOT, 'src/data/af-jobs.json')
VERIF = os.path.join(ROOT, 'data/verification.json')
UA = 'Mozilla/5.0 (compatible; RadifPartnersDataCheck/1.0; +https://github.com/Mottalib-10M)'
TODAY = dt.date.today().isoformat()
DRY = '--dry-run' in sys.argv

# Fait publié -> motif qui doit rester sur la page source (texte sans balises, espaces normalisés).
SENTINELS = {
    'oa-eligibility': [r'93\s*[-–]\s*99', r'31\s*[-–]\s*49', r'\b65\s*[-–]\s*92'],
    'oa-retest': [r'(?i)six months|6 months', r'(?i)one (?:calendar )?month|1 (?:calendar )?month'],
    'oa-picat': [r'(?i)30 days', r'(?i)48 hours'],
    'oa-apt': [r'(?i)20 (?:items|questions)'],
    'army': [r'\b31\b'],
    'airforce': [r'\b31\b'],
    'marines': [r'\b31\b'],
    'coastguard': [r'\b32\b'],
    'usc520': [r'(?i)4 percent', r'(?i)thirty-first percentile|31st percentile'],
}


def fetch(url, timeout=40):
    req = urllib.request.Request(url, headers={'User-Agent': UA, 'Accept': '*/*'})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.status, r.read()


def texte(raw):
    s = raw.decode('utf-8', 'replace')
    s = re.sub(r'(?is)<(script|style|noscript)\b.*?</\1>', ' ', s)
    s = re.sub(r'<[^>]+>', ' ', s)
    s = s.replace('&nbsp;', ' ').replace('&#8211;', '–').replace('&ndash;', '–')
    return re.sub(r'\s+', ' ', s)


def maj_metiers(rapport):
    old = json.load(open(JOBS, encoding='utf-8'))
    out, off = [], 0
    while off < 1000:
        _, raw = fetch(f'https://www.airforce.com/bin/api/careers?offset={off}&limit=10')
        data = json.loads(raw).get('data') or []
        if not data:
            break
        out += data
        off += 10
        time.sleep(0.5)
    jobs = []
    for x in out:
        if x.get('mustache') != 'ENLISTED' or not x.get('link', {}).get('url'):
            continue
        score = x.get('score') or ''
        req = [[m[0], int(m[1])] for m in re.findall(r'([MAGE])(\d+)', score) if int(m[1]) > 0]
        jobs.append({'t': x['title'].strip(), 'afsc': x.get('afscCode'), 'req': req, 'raw': score,
                     'tag': x.get('tag'), 'url': 'https://www.airforce.com' + x['link']['url']})
    uniq = {j['url']: j for j in jobs}
    jobs = sorted(uniq.values(), key=lambda j: j['t'])
    n_old = len(old['jobs'])
    rapport['af-jobs'] = {'avant': n_old, 'apres': len(jobs)}
    if len(jobs) < 0.8 * n_old:
        rapport['af-jobs']['etat'] = 'refusé : moins de 80 % des métiers connus'
        return False
    rapport['af-jobs']['etat'] = 'ok'
    if not DRY:
        old['jobs'] = jobs
        old['retrieved_at'] = TODAY
        with open(JOBS, 'w', encoding='utf-8') as f:
            json.dump(old, f, ensure_ascii=False, indent=0)
            f.write('\n')
    return True


def relire_faits(params, rapport):
    ok = True
    for key, src in params['sources'].items():
        url = src['url']
        r = {'url': url}
        try:
            status, raw = fetch(url)
            r['http'] = status
            if url.lower().endswith('.pdf'):
                r['etat'] = 'ok (PDF joignable)'
            else:
                t = texte(raw)
                manquants = [p for p in SENTINELS.get(key, []) if not re.search(p, t)]
                if manquants:
                    r['etat'] = 'FAIT INTROUVABLE'
                    r['motifs_manquants'] = manquants
                    ok = False
                else:
                    r['etat'] = 'ok'
        except urllib.error.HTTPError as e:
            r['http'] = e.code
            r['etat'] = 'injoignable (lecture automatique refusée)' if e.code in (401, 403, 429) or e.code >= 500 \
                else 'PAGE DISPARUE'
            if r['etat'] == 'PAGE DISPARUE':
                ok = False
        except Exception as e:  # réseau, délai
            r['etat'] = f'injoignable ({type(e).__name__})'
        rapport['sources'][key] = r
    return ok


def main():
    params = json.load(open(PARAMS, encoding='utf-8'))
    rapport = {'date': TODAY, 'sources': {}}
    ok_jobs = maj_metiers(rapport)
    ok_faits = relire_faits(params, rapport)
    if ok_faits and not DRY:
        params['retrieved_at'] = TODAY
        with open(PARAMS, 'w', encoding='utf-8') as f:
            json.dump(params, f, ensure_ascii=False, indent=1)
            f.write('\n')
    if not DRY:
        os.makedirs(os.path.dirname(VERIF), exist_ok=True)
        with open(VERIF, 'w', encoding='utf-8') as f:
            json.dump(rapport, f, ensure_ascii=False, indent=1)
            f.write('\n')
    for k, v in rapport['sources'].items():
        print(f"{v['etat']:<45} {k:<15} {v['url']}" + (f"  manque {v['motifs_manquants']}" if 'motifs_manquants' in v else ''))
    print(f"af-jobs : {rapport['af-jobs']}")
    if not (ok_jobs and ok_faits):
        print('ÉCHEC : relire les pages signalées et corriger src/data/ à la main.', file=sys.stderr)
        sys.exit(1)


if __name__ == '__main__':
    main()
