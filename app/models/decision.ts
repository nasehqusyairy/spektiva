export type DecisionItem = {
    alternative: string;
    [code: string]: string | number;
};

export type NormalizedItem = {
    alternative: string;
    scores: { code: string; value: number }[];
};

export type WeightedItem = {
    alternative: string;
    scores: { code: string; value: number }[];
};

export type IdealSolution = {
    code: string;
    positive: number;
    negative: number;
};


export type Alternative = {
    alternative: string;
    scores: number[];
};

export type PreferenceResult = {
    alternative: string;
    dPositive: number;
    dNegative: number;
    preference: number;
    percentage: number;
};