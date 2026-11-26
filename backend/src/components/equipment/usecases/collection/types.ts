export interface EquipmentCollectionUseCase {
    execute: () => Promise<EquipmentCollectionOutput>;
}

export interface EquipmentCollectionDetails {
    id?: number;
    name: string;
    description: string;
    slotCost: number | null;
    typeId: number;
}

export type EquipmentCollectionOutput = EquipmentCollectionDetails[];
