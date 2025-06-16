import type { CriteriaItem, PairwiseInputItem } from "~/models/criteria";
import criteriaData from "~/data/criteria.json";
import pairwiseData from "~/data/pairwise.json";
import decisionsData from "~/data/decisions.json";
import type { DecisionItem } from "~/models/decision";

// Simulasikan pemanggilan data criteria
export async function fetchCriteria(): Promise<CriteriaItem[]> {
    // simulasi network delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return criteriaData as CriteriaItem[];
}

// Simulasikan pemanggilan data pairwise
export async function fetchPairwise(): Promise<PairwiseInputItem[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return pairwiseData as PairwiseInputItem[];
}

// Simulasikan pemanggilan data decisions
export async function fetchDecisions(): Promise<DecisionItem[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    // Ganti dengan data keputusan yang sesuai
    return decisionsData as DecisionItem[];
}