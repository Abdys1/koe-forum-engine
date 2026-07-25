export interface EquipmentRemoval {
    execute: (input: RemoveEquipmentInput) => Promise<RemoveEquipmentOutput>
}

export interface RemoveEquipmentInput {
    id: number
}

export interface RemoveEquipmentOutput {
    status: EquipmentRemovalResult
}

export enum EquipmentRemovalResult {
    DELETED,
    NOT_FOUND,
    IN_USE
}
