import CharacterEntity from "@src/components/character/models/character";
import { CharacterCollectionDetails, CharacterCollectionOutput } from "@src/components/character/usecases/collection/types";

export function toOutput(characters: CharacterEntity[]): CharacterCollectionOutput {
    return characters.map(toDetails);
}

function toDetails(character: CharacterEntity): CharacterCollectionDetails {
    return {
        id: character.id,
        name: character.name,
        sex: character.sex,
        race: character.race,
        imageUrl: character.imageUrl
    }
}