
import type { CriteriaItem, PairwiseInputItem, TFN } from "~/models/criteria";
import { TFN_SAATY } from "~/models/tfn-saaty";

export function inverseTFN(tfn: TFN): TFN {
    return [
        +(1 / tfn[2]).toFixed(4),
        +(1 / tfn[1]).toFixed(4),
        +(1 / tfn[0]).toFixed(4)
    ] as TFN;
}

export function buildFullTFNMatrix(criteria: CriteriaItem[], pairwiseInput: PairwiseInputItem[]): TFN[][] {
    const codeIndex: Record<string, number> = {};
    criteria.forEach((c, i) => codeIndex[c.code] = i);
    const size = criteria.length;
    const matrix: (TFN | null)[][] = Array.from({ length: size }, () => Array(size).fill(null));

    for (let i = 0; i < size; i++) {
        matrix[i][i] = TFN_SAATY[1];
    }

    pairwiseInput.forEach(({ from, to, value }) => {
        const i = codeIndex[from];
        const j = codeIndex[to];
        const tfn = TFN_SAATY[value];
        matrix[i][j] = tfn;
        matrix[j][i] = inverseTFN(tfn);
    });

    return matrix as TFN[][];
}
export function geometricMeanRow(matrix: TFN[][]): TFN[] {
    const n = matrix.length;
    return matrix.map(row => {
        const prod: TFN = row.reduce(
            (acc, [l, m, u]) => [acc[0] * l, acc[1] * m, acc[2] * u],
            [1, 1, 1] as TFN
        );
        const invN = 1 / n;
        return [prod[0] ** invN, prod[1] ** invN, prod[2] ** invN];
    });
}

export function normalizeBuckley(r: TFN[]): TFN[] {
    const sumU = r.reduce((s, v) => s + v[2], 0);
    const sumM = r.reduce((s, v) => s + v[1], 0);
    const sumL = r.reduce((s, v) => s + v[0], 0);
    return r.map(([l, m, u]) => [
        +(l / sumU).toFixed(4),
        +(m / sumM).toFixed(4),
        +(u / sumL).toFixed(4)
    ] as TFN);
}

export function defuzzifyNormalize(tfn: TFN[]): { defuzz: number; weight: number }[] {
    const def = tfn.map(([l, m, u]) => +((l + m + u) / 3).toFixed(4));
    const total = def.reduce((s, v) => s + v, 0);
    return def.map(d => ({ defuzz: d, weight: +(d / total).toFixed(4) }));
}

export function buckleyFuzzyAHP(matrix: TFN[][]) {
    const r = geometricMeanRow(matrix);     // 1. hitung geometric mean per baris
    const wFuzzy = normalizeBuckley(r);     // 2. normalisasi fuzzy
    const result = defuzzifyNormalize(wFuzzy); // 3. defuzzifikasi & normalisasi crisp
    return result;
}