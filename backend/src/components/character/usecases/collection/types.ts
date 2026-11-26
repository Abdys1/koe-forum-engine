import { CharacterRace } from "@src/components/character/models/character";
import { Sex } from "@src/components/character/types";

export interface CharacterCollectionUseCase {
    execute: (userId: number) => Promise<CharacterCollectionOutput>
}

export interface CharacterCollectionDetails {
    id?: number,
    name: string,
    sex: Sex,
    race: CharacterRace,
    imageUrl: string
};

export type CharacterCollectionOutput = CharacterCollectionDetails[];
