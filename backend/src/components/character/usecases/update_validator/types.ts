import { Sex } from "../../types"

export interface CharacterUpdateValidatorUseCase {
    execute: (input: ValidateCharacterUpdateInput) => Promise<ValidateCharacterUpdateOutput>
}

export interface ValidateCharacterUpdateInput {
    owner: { id: number, username: string },
    name: string,
    sex: Sex,
    raceId: number,
    equipmentIds: number[]
};

export interface ValidateCharacterUpdateOutput {
    status: ValidateCharacterUpdateResult
}

export enum ValidateCharacterUpdateResult {
    VALID,
    ALREADY_EXISTS,
    RACE_NOT_EXISTS,
    EQUIPMENT_NOT_EXISTS,
    SLOT_CAPACITY_EXCEEDED
}
