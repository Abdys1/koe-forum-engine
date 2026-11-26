import { CharacterRace } from "@src/components/character/models/character";
import { Sex } from "@src/components/character/types";

export interface CharacterDetailsUseCase {
    execute: (input: CharacterDetailsInput) => Promise<CharacterDetailsOutput>
}

export interface CharacterDetailsInput {
    characterId: number
}

export interface CharacterDetails {
    id: number,
    name: string,
    sex: Sex,
    race: CharacterRace,
    imageUrl: string
}

export interface CharacterDetailsOutput {
    status: CharacterDetailsResult,
    character?: CharacterDetails
}

export enum CharacterDetailsResult {
    FOUND,
    NOT_FOUND
}
