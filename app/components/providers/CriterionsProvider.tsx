import React, { createContext, useContext, useState, useMemo, useEffect } from "react";
import type { CriteriaItem, PairwiseInputItem, TFN } from "~/models/criteria";
import {
    buildFullTFNMatrix,
    geometricMeanRow,
    normalizeBuckley,
    defuzzifyNormalize
} from "~/lib/tfn-matrix";

interface FuzzyContextValue {
    criteria: CriteriaItem[];
    pairwise: PairwiseInputItem[];
    setCriteria: (data: CriteriaItem[]) => void;
    setPairwise: (data: PairwiseInputItem[]) => void;
    matrix?: TFN[][];
    geometricMean?: TFN[];
    normalized?: TFN[];
    defuzzified: { defuzz: number; weight: number }[];
}

const FuzzyContext = createContext<FuzzyContextValue | undefined>(undefined);

export const useCriterions = () => {
    const ctx = useContext(FuzzyContext);
    if (!ctx) throw new Error("useCriterions must be used within CriterionsProvider");
    return ctx;
};

export const CriterionsProvider = ({ children, loaderData }: { children: React.ReactNode, loaderData: { criteria: CriteriaItem[], pairwise: PairwiseInputItem[] } }) => {
    const [criteria, setCriteria] = useState<CriteriaItem[]>(loaderData.criteria || []);
    const [pairwise, setPairwise] = useState<PairwiseInputItem[]>(loaderData.pairwise || []);

    // Perhitungan otomatis ketika data sudah lengkap
    const computed = useMemo(() => {
        if (!criteria || !pairwise) {
            return {
                matrix: undefined,
                geometricMean: undefined,
                normalized: undefined,
                defuzzified: [],
            };
        }

        const matrix = buildFullTFNMatrix(criteria, pairwise);
        const geometricMean = geometricMeanRow(matrix);
        const normalized = normalizeBuckley(geometricMean);
        const defuzzified = defuzzifyNormalize(normalized);

        return { matrix, geometricMean, normalized, defuzzified };
    }, [criteria, pairwise]);

    return (
        <FuzzyContext.Provider value={{ criteria, pairwise, setCriteria, setPairwise, ...computed }}>
            {children}
        </FuzzyContext.Provider>
    );
};
