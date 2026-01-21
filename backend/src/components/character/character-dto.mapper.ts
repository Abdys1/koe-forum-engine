import { CharacterRegistrationRequestDto } from "@src/components/character/types";
import { CreateCharacterInput } from "@src/components/character/usecases/registration/types";
import { ValidateCharacterUpdateInput } from "./usecases/update_validator/types";

export default class CharacterRegistrationRequestMapper {
    static toCreateCharacterInput(user: { id: number, username: string }, dto: CharacterRegistrationRequestDto): CreateCharacterInput {
        return {
            name: dto.name,
            owner: user,
            sex: dto.sex,
            race: dto.race,
            equipment: dto.equipment,
            imageUrl: dto.imageUrl
        };
    }

    static toValidateCharacterUpdateInput(user: { id: number, username: string }, dto: CharacterRegistrationRequestDto): ValidateCharacterUpdateInput {
        return {
            name: dto.name,
            owner: user,
            sex: dto.sex,
            race: dto.race,
            equipment: dto.equipment,
            imageUrl: dto.imageUrl
        };
    }
}

