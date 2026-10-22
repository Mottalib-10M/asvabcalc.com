import { describe, expect, it } from 'vitest';
import { afqt, afqtSum, lookup, category, veFromWkPc, mage, marines, armyGt, army, sumForPercentile, nextRetest, addMonths, minimumFor, shareAbove } from '../src/lib/engine/asvab';

describe('AFQT (table 2.5 de 1997)', () => {
  it('somme AR + MK + 2VE', () => { expect(afqtSum({ AR: 50, MK: 52, VE: 50 })).toBe(202); });
  it('lectures de la table', () => {
    expect(lookup('AFQT', 202)).toBe(50);
    expect(lookup('AFQT', 183)).toBe(31);
    expect(lookup('AFQT', 216)).toBe(66);
    expect(lookup('AFQT', 109)).toBe(1);
    expect(lookup('AFQT', 80)).toBe(1);
    expect(lookup('AFQT', 269)).toBe(99);
    expect(lookup('AFQT', 300)).toBe(99);
    expect(lookup('AFQT', 250)).toBe(93);
  });
  it('percentile à partir des scores', () => { expect(afqt({ AR: 50, MK: 50, VE: 50 })).toBe(48); });
  it('somme minimale pour un percentile', () => { expect(sumForPercentile(31)).toBe(183); expect(sumForPercentile(50)).toBe(202); expect(sumForPercentile(99)).toBe(269); });
  it('catégories', () => {
    expect(category(99)).toBe('I'); expect(category(93)).toBe('I'); expect(category(92)).toBe('II'); expect(category(50)).toBe('IIIA');
    expect(category(49)).toBe('IIIB'); expect(category(31)).toBe('IIIB'); expect(category(30)).toBe('IVA'); expect(category(10)).toBe('IVC'); expect(category(9)).toBe('V');
  });
});
describe('composites', () => {
  it('VE depuis WK et PC, autour de 50 pour des scores moyens', () => { const v = veFromWkPc(50, 50); expect(v).toBeGreaterThanOrEqual(49); expect(v).toBeLessThanOrEqual(51); expect(veFromWkPc(60, 60)).toBeGreaterThan(veFromWkPc(50, 50)); });
  it('MAGE : sommes et percentiles', () => {
    const m = mage({ AR: 50, MC: 50, AS: 50, VE: 50, MK: 50, GS: 50, EI: 50 });
    expect(m.M.sum).toBe(250); expect(m.A.sum).toBe(100); expect(m.G.sum).toBe(100); expect(m.E.sum).toBe(200);
    for (const k of ['M', 'A', 'G', 'E'] as const) { expect(m[k].pct).toBeGreaterThan(30); expect(m[k].pct).toBeLessThan(70); }
  });
  it('Marines : formules du rapport', () => {
    const r = marines({ AR: 50, MC: 50, EI: 50, AS: 50, VE: 50, GS: 50, MK: 50 });
    expect(r.MM).toBe(Math.floor(0.588215 * 200 - 17.645724 + 0.5));
    expect(r.GT).toBe(Math.floor(0.755294 * 150 - 13.289535 + 0.5));
    expect(r.CL).toBe(Math.floor(1.092264 * 100 - 9.232992 + 0.5));
  });
  it('Army GT : 1,074292 × (AR + VE) − 7,443781', () => {
    expect(armyGt({ AR: 50, VE: 50 })).toBe(100);
    expect(armyGt({ AR: 55, VE: 55 })).toBe(111);
    expect(army({}).GT).toBe(100);
  });
  it('autres composites de l’Army autour de 100 pour des scores moyens', () => { const a = army({ GS: 50, AR: 50, MK: 50, MC: 50, EI: 50, AS: 50, VE: 50 }); for (const v of Object.values(a)) { expect(v).toBeGreaterThan(90); expect(v).toBeLessThan(110); } });
});
describe('règles', () => {
  it('minimums lus sur les sites officiels', () => {
    expect(minimumFor('army', 'hs')).toBe(31); expect(minimumFor('airforce', 'ged')).toBe(50); expect(minimumFor('marines', 'ged')).toBe(50);
    expect(minimumFor('coastguard', 'hs')).toBe(32); expect(minimumFor('navy', 'hs')).toBeNull(); expect(minimumFor('spaceforce', 'hs')).toBeNull();
  });
  it('repasse : 1 mois, 1 mois, puis 6 mois', () => {
    expect(nextRetest('2026-03-20', 1)).toBe('2026-04-20');
    expect(nextRetest('2026-04-20', 2)).toBe('2026-05-20');
    expect(nextRetest('2026-05-20', 3)).toBe('2026-11-20');
    expect(addMonths('2026-01-31', 1)).toBe('2026-02-28');
  });
  it('part au-dessus de 60 : environ 16 %', () => { expect(shareAbove(60)).toBeCloseTo(0.1587, 3); expect(shareAbove(50)).toBeCloseTo(0.5, 5); });
});
