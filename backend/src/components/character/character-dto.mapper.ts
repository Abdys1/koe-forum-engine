import { CharacterRegistrationRequestDto } from "@src/components/character/types";
import { CreateCharacterInput } from "@src/components/character/usecases/registration/types";

export function fromRequestDto(user: { id: number, username: string }, dto: CharacterRegistrationRequestDto): CreateCharacterInput {
    return {
        name: dto.name,
        owner: user,
        sex: dto.sex,
        race: dto.race,
        imageUrl: dto.imageUrl
    };
}