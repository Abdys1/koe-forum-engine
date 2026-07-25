export interface EquipmentTypeCollection {
    execute: () => Promise<EquipmentTypeCollectionOutput>
}

export interface EquipmentTypeDetails {
    id?: number;
    label: string;
}

export type EquipmentTypeCollectionOutput = EquipmentTypeDetails[];
