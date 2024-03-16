import { Character, CharacterDetails, CreateCharacterDto } from "@src/components/character/types";

function fromCreateDto(dto: CreateCharacterDto): Character  {
    return {
        owner: dto.username,
        name: dto.charName,
        story: dto.story,
        appearance: dto.appearance,
        imageUrl: dto.imageUrl
    }
}

function toDetails(character: Character): CharacterDetails {
    return {
        name: character.name,
        appearance: character.appearance,
        story: character.story,
        imageUrl: character.imageUrl
    };
}

export {
    fromCreateDto,
    toDetails
};