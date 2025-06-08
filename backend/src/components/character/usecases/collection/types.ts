import { Sex } from "@src/components/character/types";

export interface CharacterCollection {
    execute: (username: string) => Promise<CharacterCollectionOutput>
}

export interface CharacterCollectionDetails {
    id?: number,
    name: string,
    sex: Sex,
    race: string,
    imageUrl: string
};

export type CharacterCollectionOutput = CharacterCollectionDetails[];