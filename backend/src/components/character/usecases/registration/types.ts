import { Sex } from "@src/components/character/types"
import { UploadedFile } from "@src/components/storage"

export interface CharacterRegistrationUseCase {
    execute: (newCharacterDto: CreateCharacterInput) => Promise<void>
}

export interface CreateCharacterInput {
    owner: { id: number, username: string },
    name: string,
    sex: Sex,
    race: string,
    equipmentIds: number[],
    image: UploadedFile
};
