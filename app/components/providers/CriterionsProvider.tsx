import React, { createContext, useContext, useState, useMemo, useEffect } from "react";
import type { CriteriaItem, PairwiseInputItem, TFN } from "~/models/criteria";
import {
    buildFullTFNMatrix,
    calculateColumnSum,
    calculateSyntheticExtent,
    defuzzify
} from "~/lib/tfn-matrix";

interface FuzzyContextValue {
    criteria: CriteriaItem[];
    pairwise: PairwiseInputItem[];
    setCriteria: (data: CriteriaItem[]) => void;
    setPairwise: (data: PairwiseInputItem[]) => void;
    matrix?: TFN[][];
    columnSum?: TFN[];
    syntheticExtent?: TFN[];
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
                columnSum: undefined,
                syntheticExtent: undefined,
                defuzzified: [],
            };
        }

        const matrix = buildFullTFNMatrix(criteria, pairwise);
        const columnSum = calculateColumnSum(matrix);
        const syntheticExtent = calculateSyntheticExtent(matrix, columnSum);
        const defuzzified = defuzzify(syntheticExtent);

        return { matrix, columnSum, syntheticExtent, defuzzified };
    }, [criteria, pairwise]);

    return (
        <FuzzyContext.Provider value={{ criteria, pairwise, setCriteria, setPairwise, ...computed }}>
            {children}
        </FuzzyContext.Provider>
    );
};
