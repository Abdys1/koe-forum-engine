import { SlotDetails } from "@src/components/slot/usecases/collection/types";

export interface SlotCreation {
    execute: (input: CreateSlotInput) => Promise<CreateSlotOutput>
}

export interface CreateSlotInput {
    label: string,
    maxCapacity: number
}

export interface CreateSlotOutput {
    status: SlotCreationResult,
    slot?: SlotDetails
}

export enum SlotCreationResult {
    CREATED,
    ALREADY_EXISTS
}
