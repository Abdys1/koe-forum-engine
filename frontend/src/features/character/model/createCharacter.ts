import { races } from "@/features/character/model/race";
import { SelectableSex, sexMapping } from "@/features/character/model/sex";
import { CreateCharacterRequest, ErrorCode, Sex, ValidationErrors } from "@/lib/api/character/types";

export interface CharacterInputs {
    raceId: string,
    raceTitle: string,
    characterName: string,
    characterSex: SelectableSex,
    equipmentIds: number[],
    characterImg: FileList
}

export type CreateCharacterResult =
    | { success: true, characterId: number }
    | { success: false, errorCodes: string[] };

export const UNAUTHORIZED = "UNAUTHORIZED";
export const CHARACTER_IMAGE_REQUIRED = "CHARACTER_IMAGE_REQUIRED";
export const UNKNOWN_ERROR = "UNKNOWN_ERROR";

export const createCharacterDefaults: Partial<CharacterInputs> = {
    raceId: races[0].id,
    raceTitle: races[0].title,
    characterSex: "ferfi",
    equipmentIds: []
};

export function toCreateCharacterFormData(values: CharacterInputs): FormData {
    const formData = new FormData();
    formData.append("name", values.characterName);
    formData.append("sex", String(sexMapping[values.characterSex]));
    formData.append("race", values.raceId);
    formData.append("image", values.characterImg[0]);
    values.equipmentIds.forEach(equipmentId => formData.append("equipmentIds", String(equipmentId)));
    return formData;
}

export function parseCreateCharacterFormData(formData: FormData): CreateCharacterRequest | null {
    const image = formData.get("image");
    if (!(image instanceof File)) {
        return null;
    }
    return {
        name: String(formData.get("name") ?? ""),
        sex: Number(formData.get("sex")) as Sex,
        race: String(formData.get("race") ?? ""),
        image,
        equipmentIds: formData.getAll("equipmentIds").map(Number)
    };
}

export function toCreateCharacterErrorCodes(status: number, body: unknown): string[] {
    if (status === 401 || status === 403) {
        return [UNAUTHORIZED];
    }
    const errorBody = body as Partial<ErrorCode & ValidationErrors> | undefined;
    if (errorBody?.errorCode) {
        return [errorBody.errorCode];
    }
    if (errorBody?.errors) {
        return errorBody.errors.map(validationError => validationError.msg);
    }
    return [UNKNOWN_ERROR];
}
