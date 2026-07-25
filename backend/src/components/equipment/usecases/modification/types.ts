import { EquipmentCollectionDetails } from "@src/components/equipment/usecases/collection/types";

export interface EquipmentModification {
    execute: (input: ModifyEquipmentInput) => Promise<ModifyEquipmentOutput>
}

export interface ModifyEquipmentInput {
    id: number,
    name: string,
    typeId: number,
    description: string
}

export interface ModifyEquipmentOutput {
    status: EquipmentModificationResult,
    equipment?: EquipmentCollectionDetails
}

export enum EquipmentModificationResult {
    UPDATED,
    NOT_FOUND,
    ALREADY_EXISTS,
    TYPE_NOT_EXISTS
}
