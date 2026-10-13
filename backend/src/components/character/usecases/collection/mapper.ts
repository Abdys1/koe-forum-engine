import Character from "@src/components/character/models/character";
import { CharacterCollectionDetails, CharacterCollectionOutput } from "@src/components/character/usecases/collection/types";

export function toOutput(characters: Character[]): CharacterCollectionOutput {
    return characters.map(toDetails);
}

function toDetails(character: Character): CharacterCollectionDetails {
    return {
        id: character.id,
        name: character.name,
        sex: character.sex,
        race: character.race,
        imageUrl: character.imageUrl
    }
}
