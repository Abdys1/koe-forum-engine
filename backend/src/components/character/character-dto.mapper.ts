import { CharacterDetails, CharacterDetailsResponseDto, CreateCharacterDto, CreateCharacterRequestDto } from "@src/components/character/types";

export function fromRequestDto(username: string, dto: CreateCharacterRequestDto): CreateCharacterDto {
    return {
        name: dto.name,
        owner: username,
        sex: dto.sex,
        race: dto.race,
        imageUrl: dto.imageUrl
    };
}

export function toDetails(dto: CharacterDetails): CharacterDetailsResponseDto {
    return {
        name: dto.name,
        sex: dto.sex,
        race: dto.race,
        imageUrl: dto.imageUrl
    };
}