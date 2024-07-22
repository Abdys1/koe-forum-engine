import { Character, CharacterDetails, CharacterEntity, CreateCharacterDto } from "@src/components/character/types";

function fromCreateDto(dto: CreateCharacterDto): Character {
    return {
        owner: dto.owner,
        name: dto.name,
        race: dto.race,
        sex: dto.sex,
        imageUrl: dto.imageUrl
    }
}

function fromEntity(username: string, schema: CharacterEntity): Character {
    return {
        name: schema.name,
        owner: username,
        race: schema.race,
        sex: schema.sex,
        imageUrl: schema.imageUrl
    };
}

function toDetails(character: Character): CharacterDetails {
    return {
        name: character.name,
        sex: character.sex,
        race: character.race,
        imageUrl: character.imageUrl
    };
}

export {
    fromCreateDto,
    fromEntity as fromSchema,
    toDetails
};