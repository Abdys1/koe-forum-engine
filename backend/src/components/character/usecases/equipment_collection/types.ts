import { EquipmentCollectionDetails } from "@src/components/equipment/usecases/collection/types";

export interface CharacterEquipmentCollectionUseCase {
    execute: (input: CharacterEquipmentCollectionInput) => Promise<CharacterEquipmentCollectionOutput>
}

export interface CharacterEquipmentCollectionInput {
    characterId: number
}

export interface CharacterEquipmentCollectionOutput {
    status: CharacterEquipmentCollectionResult,
    equipment?: EquipmentCollectionDetails[]
}

export enum CharacterEquipmentCollectionResult {
    FOUND,
    NOT_FOUND
}
