export interface EquipmentTypeCollection {
    execute: () => Promise<EquipmentTypeCollectionOutput>
}

export interface EquipmentTypeDetails {
    id?: number;
    label: string;
    slotId?: number | null;
}

export type EquipmentTypeCollectionOutput = EquipmentTypeDetails[];
