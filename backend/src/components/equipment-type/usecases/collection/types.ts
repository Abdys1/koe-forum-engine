import { SlotDetails } from "@src/components/slot/usecases/collection/types";

export interface EquipmentTypeCollection {
    execute: () => Promise<EquipmentTypeCollectionOutput>
}

export interface EquipmentTypeDetails {
    id?: number;
    label: string;
    slot: SlotDetails | null;
    parentId: number | null;
    icon: string | null;
    sortOrder: number;
}

export type EquipmentTypeCollectionOutput = EquipmentTypeDetails[];
