export interface EquipmentTypeRemoval {
    execute: (input: RemoveEquipmentTypeInput) => Promise<RemoveEquipmentTypeOutput>
}

export interface RemoveEquipmentTypeInput {
    id: number
}

export interface RemoveEquipmentTypeOutput {
    status: EquipmentTypeRemovalResult
}

export enum EquipmentTypeRemovalResult {
    DELETED,
    NOT_FOUND,
    IN_USE
}
