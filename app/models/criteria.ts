export type TFN = [number, number, number];

export interface CriteriaItem {
    code: string;
    name: string;
    type: 'benefit' | 'cost';
}

export interface PairwiseInputItem {
    from: string;
    to: string;
    value: number;
}
