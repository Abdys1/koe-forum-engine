import { CharacterRace } from "@src/components/character/models/character"
import { Sex } from "@src/components/character/types"
import { UploadedFile } from "@src/components/storage"

export interface CharacterRegistrationUseCase {
    execute: (newCharacterDto: CreateCharacterInput) => Promise<CreateCharacterOutput>
}

export interface CreateCharacterInput {
    owner: { id: number, username: string },
    name: string,
    sex: Sex,
    raceId: number,
    equipmentIds: number[],
    image: UploadedFile
};

export interface CreateCharacterOutput {
    id: number,
    name: string,
    sex: Sex,
    race: CharacterRace,
    imageUrl: string
}
