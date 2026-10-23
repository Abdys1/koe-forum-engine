import { EquipmentCollectionDetails } from "@src/components/equipment/usecases/collection/types";

export interface CharacterEquipmentModificationUseCase {
    execute: (input: ModifyCharacterEquipmentInput) => Promise<ModifyCharacterEquipmentOutput>
}

export interface ModifyCharacterEquipmentInput {
    characterId: number,
    userId: number,
    equipmentIds: number[]
}

export interface ModifyCharacterEquipmentOutput {
    status: CharacterEquipmentModificationResult,
    equipment?: EquipmentCollectionDetails[]
}

export enum CharacterEquipmentModificationResult {
    UPDATED,
    NOT_FOUND,
    NOT_OWNED,
    EQUIPMENT_NOT_EXISTS,
    SLOT_CAPACITY_EXCEEDED
}
