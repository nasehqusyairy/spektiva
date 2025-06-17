import type { CriteriaItem, PairwiseInputItem } from "~/models/criteria";
import type { DecisionItem } from "~/models/decision";
import axios from "axios";

// Simulasikan pemanggilan data criteria
export async function fetchCriteria(): Promise<CriteriaItem[]> {
    // simulasi network delay
    const { data } = await axios.get("/api/criteria.json")
    return data as CriteriaItem[];
}

// Simulasikan pemanggilan data pairwise
export async function fetchPairwise(): Promise<PairwiseInputItem[]> {
    const { data } = await axios.get("/api/pairwise.json");
    return data as PairwiseInputItem[];
}

// Simulasikan pemanggilan data decisions
export async function fetchDecisions(): Promise<DecisionItem[]> {
    const { data } = await axios.get("/api/decisions.json");
    return data as DecisionItem[];
}

// Simulasikan pemanggilan data alternatives
export async function fetchAlternatives(): Promise<{ code: string, name: string }[]> {
    const { data } = await axios.get(`/api/alternatives.json`);
    return data;
}