export interface SlotCollection {
    execute: () => Promise<SlotCollectionOutput>
}

export interface SlotDetails {
    id?: number;
    equipmentTypeId: number;
    maxCapacity: number;
}

export type SlotCollectionOutput = SlotDetails[];
