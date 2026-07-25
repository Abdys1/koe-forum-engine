import { EquipmentTypeDetails } from "@src/components/equipment-type/usecases/collection/types";

export interface EquipmentTypeModification {
    execute: (input: ModifyEquipmentTypeInput) => Promise<ModifyEquipmentTypeOutput>
}

export interface ModifyEquipmentTypeInput {
    id: number,
    label: string
}

export interface ModifyEquipmentTypeOutput {
    status: EquipmentTypeModificationResult,
    equipmentType?: EquipmentTypeDetails
}

export enum EquipmentTypeModificationResult {
    UPDATED,
    ALREADY_EXISTS,
    NOT_FOUND
}
