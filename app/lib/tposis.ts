import type { CriteriaItem } from "~/models/criteria";
import type { Alternative, DecisionItem, IdealSolution, NormalizedItem, PreferenceResult, WeightedItem } from "~/models/decision";

/**
 * Fungsi untuk melakukan normalisasi pada matriks keputusan.
 */
export function normalizeDecisionMatrix(criteria: CriteriaItem[], decisions: DecisionItem[]): NormalizedItem[] {
    const divisor: Record<string, number> = {};

    // Hitung penyebut (akar jumlah kuadrat) untuk setiap kriteria
    criteria.forEach(criterion => {
        const sumSquares = decisions.reduce((acc, d) => {
            const value = Number(d[criterion.code]) ?? 0;
            return acc + value * value;
        }, 0);
        divisor[criterion.code] = Math.sqrt(sumSquares);
    });

    // Normalisasi
    return decisions.map(decision => {
        const scores = criteria.map(criterion => {
            const rawValue = Number(decision[criterion.code]) ?? 0;
            const normalized = rawValue / divisor[criterion.code];
            return { code: criterion.code, value: +normalized.toFixed(4) };
        });

        return {
            alternative: decision.alternative,
            scores
        };
    });
}

export function weightedNormalization(
    criteria: CriteriaItem[],
    normalized: NormalizedItem[],
    weights: { defuzz: number; weight: number }[]
): WeightedItem[] {
    // console.log(normalized);

    // pastikan urutan criteria dan weights sudah sinkron
    const weightMap = criteria.reduce<Record<string, number>>((acc, c, idx) => {
        acc[c.code] = weights[idx].weight;
        return acc;
    }, {});

    return normalized.map(item => {
        const scores = item.scores.map(score => {
            const weight = weightMap[score.code] ?? 1;
            const weightedValue = score.value * weight;
            return { code: score.code, value: +weightedValue.toFixed(4) };
        });

        return {
            alternative: item.alternative,
            scores
        };
    });
}

export function calculateIdealSolution(
    criteria: CriteriaItem[],
    weighted: WeightedItem[]
): IdealSolution[] {
    return criteria.map(criterion => {
        const code = criterion.code;

        // Ambil semua nilai weighted pada kriteria ini
        const values = weighted.map(item => {
            const score = item.scores.find(s => s.code === code);
            return score?.value ?? 0;
        });

        let positive = 0;
        let negative = 0;

        if (criterion.type === "benefit") {
            positive = Math.max(...values);
            negative = Math.min(...values);
        } else {
            // type === cost
            positive = Math.min(...values);
            negative = Math.max(...values);
        }

        return {
            code,
            positive: +positive.toFixed(4),
            negative: +negative.toFixed(4)
        };
    });
}

export function flattenIdealSolution(ideal: IdealSolution[]) {
    const positive = ideal.map(i => i.positive);
    const negative = ideal.map(i => i.negative);
    return { positive, negative };
}

export function calculatePreference(
    weightedMatrix: number[][],
    alternatives: Alternative[],
    ideal: { positive: number[]; negative: number[] }
): PreferenceResult[] {

    return weightedMatrix.map((values, index) => {
        const dPositive = Math.sqrt(values.reduce((sum, value, i) => sum + Math.pow(value - ideal.positive[i], 2), 0));
        const dNegative = Math.sqrt(values.reduce((sum, value, i) => sum + Math.pow(value - ideal.negative[i], 2), 0));

        const preference = dNegative / (dPositive + dNegative);
        const percentage = +(preference * 100).toFixed(2);

        return {
            alternative: alternatives[index].alternative,
            dPositive: +dPositive.toFixed(4),
            dNegative: +dNegative.toFixed(4),
            preference: +preference.toFixed(4),
            percentage
        };
    });
}

export function mapDecisionInputToWeighted(decisions: DecisionItem[]) {
    return decisions.map(item => {
        const { alternative, ...scoresObj } = item;

        const scores = Object.entries(scoresObj).map(([code, value]) => (Number(value)));

        return {
            alternative,
            scores,
        };
    });
}

export function flattenWeightedMatrix(weighted: WeightedItem[]): number[][] {
    return weighted.map(item => item.scores.map(score => score.value));
}