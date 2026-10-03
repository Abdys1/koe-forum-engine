export interface SlotRemoval {
    execute: (input: RemoveSlotInput) => Promise<RemoveSlotOutput>
}

export interface RemoveSlotInput {
    id: number
}

export interface RemoveSlotOutput {
    status: SlotRemovalResult
}

export enum SlotRemovalResult {
    DELETED,
    NOT_FOUND
}
