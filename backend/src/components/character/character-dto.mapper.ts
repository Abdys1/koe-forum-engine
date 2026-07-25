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
            equipmentIds: CharacterRegistrationRequestMapper.toEquipmentIds(dto),
            imageUrl: dto.imageUrl
        };
    }

    static toValidateCharacterUpdateInput(user: { id: number, username: string }, dto: CharacterRegistrationRequestDto): ValidateCharacterUpdateInput {
        return {
            name: dto.name,
            owner: user,
            sex: dto.sex,
            race: dto.race,
            equipmentIds: CharacterRegistrationRequestMapper.toEquipmentIds(dto),
            imageUrl: dto.imageUrl
        };
    }

    /**
     * Az `equipmentIds` a bodyból kimaradhat, ezért itt, a HTTP-határon
     * normalizáljuk üres listára — a use case-ek már mindig tömböt kapnak.
     */
    private static toEquipmentIds(dto: CharacterRegistrationRequestDto): number[] {
        return dto.equipmentIds ?? [];
    }
}
