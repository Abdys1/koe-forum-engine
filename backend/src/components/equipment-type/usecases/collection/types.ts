export interface EquipmentTypeCollection {
    execute: () => Promise<EquipmentTypeCollectionOutput>
}

export interface EquipmentTypeDetails {
    id?: number;
    label: string;
    slotId?: number | null;
    parentId: number | null;
    icon: string | null;
    sortOrder: number;
}

export type EquipmentTypeCollectionOutput = EquipmentTypeDetails[];
