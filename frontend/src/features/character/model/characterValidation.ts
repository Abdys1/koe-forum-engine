import { CHARACTER_IMAGE_REQUIRED, CharacterInputs } from "@/features/character/model/createCharacter";

export const CHARACTER_NAME_REQUIRED = "CHARACTER_NAME_REQUIRED";
export const CHARACTER_NAME_INVALID_LENGTH = "CHARACTER_NAME_INVALID_LENGTH";
export const CHARACTER_NAME_INVALID_LETTERS = "CHARACTER_NAME_INVALID_LETTERS";
export const CHARACTER_ALREADY_EXISTS = "CHARACTER_ALREADY_EXISTS";
export const CHARACTER_IMAGE_INVALID_TYPE = "CHARACTER_IMAGE_INVALID_TYPE";
export const CHARACTER_IMAGE_TOO_LARGE = "CHARACTER_IMAGE_TOO_LARGE";
export const CHARACTER_RACE_NOT_EXISTS = "CHARACTER_RACE_NOT_EXISTS";
export const EQUIPMENT_NOT_EXISTS = "EQUIPMENT_NOT_EXISTS";
export const CHARACTER_SLOT_CAPACITY_EXCEEDED = "CHARACTER_SLOT_CAPACITY_EXCEEDED";

export const CHARACTER_NAME_MIN_LENGTH = 3;
export const CHARACTER_NAME_MAX_LENGTH = 64;
export const CHARACTER_IMAGE_MAX_SIZE = 5 * 1024 * 1024;
export const CHARACTER_IMAGE_TYPES = ["image/png", "image/jpeg"];

const CHARACTER_NAME_PATTERN = /^[a-zA-ZaäáeëéiíoóöőuúüűAÄÁEÉËIÍOÓÖŐUÚÜŰ\s']*$/;

export type CharacterNameCheckResult =
    | { success: true }
    | { success: false, errorCodes: string[] };

export type CharacterErrorField = keyof Pick<CharacterInputs, "raceId" | "characterName" | "characterImg" | "equipmentIds">;

export interface CharacterFormError {
    field: CharacterErrorField,
    message: string
}

const errorMessages = {
    [CHARACTER_NAME_REQUIRED]: "A mező kitöltése kötelező!",
    [CHARACTER_NAME_INVALID_LENGTH]: `A név ${CHARACTER_NAME_MIN_LENGTH} és ${CHARACTER_NAME_MAX_LENGTH} karakter közötti hosszúságú lehet.`,
    [CHARACTER_NAME_INVALID_LETTERS]: "A név csak betűket, szóközt és aposztrófot tartalmazhat.",
    [CHARACTER_ALREADY_EXISTS]: "Ez a név már foglalt, válassz másikat!",
    [CHARACTER_IMAGE_REQUIRED]: "Tölts fel egy képet a karakteredről!",
    [CHARACTER_IMAGE_INVALID_TYPE]: "A kép formátuma png, jpg vagy jpeg lehet.",
    [CHARACTER_IMAGE_TOO_LARGE]: "A kép mérete legfeljebb 5 MB lehet.",
    [CHARACTER_RACE_NOT_EXISTS]: "A kiválasztott faj már nem elérhető, válassz másikat!",
    [EQUIPMENT_NOT_EXISTS]: "A kiválasztott felszerelések egyike már nem elérhető, módosítsd a felszerelésed!",
    [CHARACTER_SLOT_CAPACITY_EXCEEDED]: "A kiválasztott felszerelés nem fér el a rendelkezésre álló slotokban."
} satisfies Record<string, string>;

export type CharacterErrorCode = keyof typeof errorMessages;

const errorFields: Record<CharacterErrorCode, CharacterErrorField> = {
    [CHARACTER_NAME_REQUIRED]: "characterName",
    [CHARACTER_NAME_INVALID_LENGTH]: "characterName",
    [CHARACTER_NAME_INVALID_LETTERS]: "characterName",
    [CHARACTER_ALREADY_EXISTS]: "characterName",
    [CHARACTER_IMAGE_REQUIRED]: "characterImg",
    [CHARACTER_IMAGE_INVALID_TYPE]: "characterImg",
    [CHARACTER_IMAGE_TOO_LARGE]: "characterImg",
    [CHARACTER_RACE_NOT_EXISTS]: "raceId",
    [EQUIPMENT_NOT_EXISTS]: "equipmentIds",
    [CHARACTER_SLOT_CAPACITY_EXCEEDED]: "equipmentIds"
};

export function isCharacterErrorCode(errorCode: string): errorCode is CharacterErrorCode {
    return Object.hasOwn(errorMessages, errorCode);
}

export function characterErrorMessage(errorCode: CharacterErrorCode): string {
    return errorMessages[errorCode];
}

export function validateCharacterName(name: string | undefined): CharacterErrorCode | null {
    if (!name?.trim()) {
        return CHARACTER_NAME_REQUIRED;
    }
    if (name.length < CHARACTER_NAME_MIN_LENGTH || name.length > CHARACTER_NAME_MAX_LENGTH) {
        return CHARACTER_NAME_INVALID_LENGTH;
    }
    if (!CHARACTER_NAME_PATTERN.test(name)) {
        return CHARACTER_NAME_INVALID_LETTERS;
    }
    return null;
}

export function validateCharacterImage(files: FileList | undefined): CharacterErrorCode | null {
    const image = files?.[0];
    if (!image) {
        return CHARACTER_IMAGE_REQUIRED;
    }
    if (!CHARACTER_IMAGE_TYPES.includes(image.type)) {
        return CHARACTER_IMAGE_INVALID_TYPE;
    }
    if (image.size > CHARACTER_IMAGE_MAX_SIZE) {
        return CHARACTER_IMAGE_TOO_LARGE;
    }
    return null;
}

export function characterNameRule(name: string | undefined): true | string {
    return toRuleResult(validateCharacterName(name));
}

export function characterImageRule(files: FileList | undefined): true | string {
    return toRuleResult(validateCharacterImage(files));
}

export function findCharacterNameError(result: CharacterNameCheckResult): CharacterErrorCode | null {
    if (result.success) {
        return null;
    }
    return result.errorCodes.filter(isCharacterErrorCode).find(errorCode => errorFields[errorCode] === "characterName") ?? null;
}

export function toCharacterFormErrors(errorCodes: string[]): CharacterFormError[] {
    const fieldErrors = new Map<CharacterErrorField, string>();
    errorCodes.filter(isCharacterErrorCode).forEach(errorCode => {
        const field = errorFields[errorCode];
        if (!fieldErrors.has(field)) {
            fieldErrors.set(field, characterErrorMessage(errorCode));
        }
    });
    return Array.from(fieldErrors, ([field, message]) => ({ field, message }));
}

function toRuleResult(errorCode: CharacterErrorCode | null): true | string {
    return errorCode ? characterErrorMessage(errorCode) : true;
}
