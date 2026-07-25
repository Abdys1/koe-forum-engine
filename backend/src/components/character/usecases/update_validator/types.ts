import { Sex } from "../../types"

export interface CharacterUpdateValidator {
    execute: (input: ValidateCharacterUpdateInput) => Promise<ValidateCharacterUpdateOutput>
}

export interface ValidateCharacterUpdateInput {
    owner: { id: number, username: string },
    name: string,
    sex: Sex,
    race: string,
    equipmentIds: number[],
    imageUrl: string
};

export interface ValidateCharacterUpdateOutput {
    status: ValidateCharacterUpdateResult
}

export enum ValidateCharacterUpdateResult {
    VALID,
    ALREADY_EXISTS,
    EQUIPMENT_NOT_EXISTS
}
