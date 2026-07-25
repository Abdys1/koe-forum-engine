import { EquipmentCollectionDetails } from "@src/components/equipment/usecases/collection/types";

export interface EquipmentCreation {
    execute: (input: CreateEquipmentInput) => Promise<CreateEquipmentOutput>
}

export interface CreateEquipmentInput {
    name: string,
    typeId: number,
    description: string
}

export interface CreateEquipmentOutput {
    status: EquipmentCreationResult,
    equipment?: EquipmentCollectionDetails
}

export enum EquipmentCreationResult {
    CREATED,
    ALREADY_EXISTS,
    TYPE_NOT_EXISTS
}
