
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

export function calculateColumnSum(matrix: TFN[][]): TFN[] {
    const size = matrix.length;
    const columnSum: TFN[] = Array.from({ length: size }, () => [0, 0, 0]);

    for (let j = 0; j < size; j++) {
        for (let i = 0; i < size; i++) {
            columnSum[j][0] += matrix[i][j][0];
            columnSum[j][1] += matrix[i][j][1];
            columnSum[j][2] += matrix[i][j][2];
        }

        columnSum[j][0] = +columnSum[j][0].toFixed(4);
        columnSum[j][1] = +columnSum[j][1].toFixed(4);
        columnSum[j][2] = +columnSum[j][2].toFixed(4);
    }

    return columnSum;
}

export function calculateSyntheticExtent(matrix: TFN[][], columnSum: TFN[]): TFN[] {
    const size = matrix.length;

    const rowSum: TFN[] = matrix.map(row => row.reduce(
        (acc, curr) => [
            acc[0] + curr[0],
            acc[1] + curr[1],
            acc[2] + curr[2]
        ], [0, 0, 0] as TFN
    ));

    const syntheticExtent: TFN[] = rowSum.map(sum => {
        return [
            +(sum[0] / columnSum.reduce((acc, val) => acc + val[2], 0)).toFixed(4),
            +(sum[1] / columnSum.reduce((acc, val) => acc + val[1], 0)).toFixed(4),
            +(sum[2] / columnSum.reduce((acc, val) => acc + val[0], 0)).toFixed(4)
        ];
    });

    return syntheticExtent;
}

export function defuzzify(syntheticExtent: TFN[]): { defuzz: number, weight: number }[] {
    const defuzzified = syntheticExtent.map(tfn => {
        const d = (tfn[0] + tfn[1] + tfn[2]) / 3;
        return +d.toFixed(4);
    });

    const total = defuzzified.reduce((acc, val) => acc + val, 0);

    return defuzzified.map(val => ({
        defuzz: val,
        weight: +(val / total).toFixed(4)
    }));
}

