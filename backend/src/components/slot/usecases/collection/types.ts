export interface SlotCollection {
    execute: () => Promise<SlotCollectionOutput>
}

export interface SlotDetails {
    id?: number;
    label: string;
    maxCapacity: number;
}

export type SlotCollectionOutput = SlotDetails[];
