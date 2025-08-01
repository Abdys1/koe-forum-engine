export interface EquipmentCollection {
    execute: () => Promise<EquipmentCollectionOutput>;
}

export interface EquipmentCollectionDetails {
    id?: number;
    name: string;
    type: string;
    description: string;
}

export type EquipmentCollectionOutput = EquipmentCollectionDetails[];
