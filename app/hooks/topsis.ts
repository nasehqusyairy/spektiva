import { useCriterions } from "~/components/providers/CriterionsProvider";
import { calculateIdealSolution, calculatePreference, flattenIdealSolution, flattenWeightedMatrix, mapDecisionInputToWeighted, normalizeDecisionMatrix, weightedNormalization } from "~/lib/tposis";
import type { DecisionItem } from "~/models/decision";

export function useTopsis(decisions: DecisionItem[]) {
    const { criteria, defuzzified } = useCriterions();

    const alternatives = mapDecisionInputToWeighted(decisions);
    const normalized = normalizeDecisionMatrix(criteria, decisions);
    const weighted = weightedNormalization(criteria, [...normalized], defuzzified);
    const flattenedWeighted = flattenWeightedMatrix(weighted); // disini

    const ideals = calculateIdealSolution(criteria, weighted);
    const flattened = flattenIdealSolution(ideals);
    const preferences = calculatePreference(flattenedWeighted, alternatives, flattened);
    return {
        criteria,
        normalized,
        weighted,
        ideals,
        preferences
    };
}