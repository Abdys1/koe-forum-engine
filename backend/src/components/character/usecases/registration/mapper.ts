import Character from "@src/components/character/models/character";
import { CreateCharacterInput, CreateCharacterOutput } from "@src/components/character/usecases/registration/types";

export function fromInput(dto: CreateCharacterInput, imageUrl: string): Character {
    return {
        userId: dto.owner.id,
        name: dto.name,
        race: dto.race,
        sex: dto.sex,
        imageUrl
    };
}

export function toOutput(character: Character): CreateCharacterOutput {
    return {
        id: character.id!,
        name: character.name,
        sex: character.sex,
        race: character.race,
        imageUrl: character.imageUrl
    };
}
