import { CharacterRegistrationRequestDto } from "@src/components/character/types";
import { CreateCharacterInput } from "@src/components/character/usecases/registration/types";
import { UploadedFile } from "@src/components/storage";

import { ValidateCharacterUpdateInput } from "./usecases/update_validator/types";

export default class CharacterRegistrationRequestMapper {
    static toCreateCharacterInput(user: { id: number, username: string }, dto: CharacterRegistrationRequestDto, image: Express.Multer.File): CreateCharacterInput {
        return {
            name: dto.name,
            owner: user,
            sex: dto.sex,
            race: dto.race,
            equipmentIds: CharacterRegistrationRequestMapper.toEquipmentIds(dto),
            image: CharacterRegistrationRequestMapper.toUploadedFile(image)
        };
    }

    static toValidateCharacterUpdateInput(user: { id: number, username: string }, dto: CharacterRegistrationRequestDto): ValidateCharacterUpdateInput {
        return {
            name: dto.name,
            owner: user,
            sex: dto.sex,
            race: dto.race,
            equipmentIds: CharacterRegistrationRequestMapper.toEquipmentIds(dto)
        };
    }

    private static toEquipmentIds(dto: CharacterRegistrationRequestDto): number[] {
        return dto.equipmentIds ?? [];
    }

    private static toUploadedFile(file: Express.Multer.File): UploadedFile {
        return {
            originalname: file.originalname,
            mimetype: file.mimetype,
            size: file.size,
            buffer: file.buffer
        };
    }
}
