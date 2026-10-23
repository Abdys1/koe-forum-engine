export interface CharacterEquipmentValidationUseCase {
    execute: (equipmentIds: number[]) => Promise<CharacterEquipmentValidationResult>
}

export enum CharacterEquipmentValidationResult {
    VALID,
    EQUIPMENT_NOT_EXISTS,
    SLOT_CAPACITY_EXCEEDED
}
