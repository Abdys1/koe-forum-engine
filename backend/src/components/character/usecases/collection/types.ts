import { CharacterEquipement, Sex } from "@src/components/character/types";

export interface CharacterCollection {
    execute: (userId: number) => Promise<CharacterCollectionOutput>
}

export interface CharacterCollectionDetails {
    id?: number,
    name: string,
    sex: Sex,
    race: string,
    equipement: CharacterEquipement,
    imageUrl: string
};

export type CharacterCollectionOutput = CharacterCollectionDetails[];