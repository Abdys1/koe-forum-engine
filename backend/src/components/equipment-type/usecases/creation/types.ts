import { EquipmentTypeDetails } from "@src/components/equipment-type/usecases/collection/types";

export interface EquipmentTypeCreation {
    execute: (input: CreateEquipmentTypeInput) => Promise<CreateEquipmentTypeOutput>
}

export interface CreateEquipmentTypeInput {
    label: string
}

export interface CreateEquipmentTypeOutput {
    status: EquipmentTypeCreationResult,
    equipmentType?: EquipmentTypeDetails
}

export enum EquipmentTypeCreationResult {
    CREATED,
    ALREADY_EXISTS
}
