import { describe, expect, it } from "vitest";

import {
    CHARACTER_ALREADY_EXISTS,
    CHARACTER_IMAGE_INVALID_TYPE,
    CHARACTER_IMAGE_MAX_SIZE,
    CHARACTER_IMAGE_TOO_LARGE,
    CHARACTER_NAME_INVALID_LENGTH,
    CHARACTER_NAME_INVALID_LETTERS,
    CHARACTER_NAME_REQUIRED,
    characterErrorMessage,
    characterImageRule,
    characterNameRule,
    EQUIPMENT_NOT_EXISTS,
    findCharacterNameError,
    isCharacterErrorCode,
    toCharacterFormErrors,
    validateCharacterImage,
    validateCharacterName
} from "@/features/character/model/characterValidation";
import { CHARACTER_IMAGE_REQUIRED, UNAUTHORIZED, UNKNOWN_ERROR } from "@/features/character/model/createCharacter";

function fileList(...files: File[]): FileList {
    return files as unknown as FileList;
}

function imageOf(type: string, size = 1024): File {
    const file = new File(["portrait"], "portrait", { type });
    Object.defineProperty(file, "size", { value: size });
    return file;
}

describe("validateCharacterName", () => {
    it("accepts a fantasy name with accented letters, spaces and apostrophes", () => {
        expect(validateCharacterName("Ölvő d'Árkád")).toBeNull();
    });

    it("requires a non-blank name", () => {
        expect(validateCharacterName(undefined)).toBe(CHARACTER_NAME_REQUIRED);
        expect(validateCharacterName("")).toBe(CHARACTER_NAME_REQUIRED);
        expect(validateCharacterName("   ")).toBe(CHARACTER_NAME_REQUIRED);
    });

    it("rejects names shorter than 3 or longer than 64 characters", () => {
        expect(validateCharacterName("Al")).toBe(CHARACTER_NAME_INVALID_LENGTH);
        expect(validateCharacterName("a".repeat(65))).toBe(CHARACTER_NAME_INVALID_LENGTH);
        expect(validateCharacterName("a".repeat(3))).toBeNull();
        expect(validateCharacterName("a".repeat(64))).toBeNull();
    });

    it("rejects names with digits or symbols", () => {
        expect(validateCharacterName("Aragorn2")).toBe(CHARACTER_NAME_INVALID_LETTERS);
        expect(validateCharacterName("$Aragorn%")).toBe(CHARACTER_NAME_INVALID_LETTERS);
    });
});

describe("validateCharacterImage", () => {
    it("accepts a png or jpeg image within the size limit", () => {
        expect(validateCharacterImage(fileList(imageOf("image/png")))).toBeNull();
        expect(validateCharacterImage(fileList(imageOf("image/jpeg", CHARACTER_IMAGE_MAX_SIZE)))).toBeNull();
    });

    it("requires an image", () => {
        expect(validateCharacterImage(undefined)).toBe(CHARACTER_IMAGE_REQUIRED);
        expect(validateCharacterImage(fileList())).toBe(CHARACTER_IMAGE_REQUIRED);
    });

    it("rejects other file types", () => {
        expect(validateCharacterImage(fileList(imageOf("application/pdf")))).toBe(CHARACTER_IMAGE_INVALID_TYPE);
    });

    it("rejects images larger than the size limit", () => {
        expect(validateCharacterImage(fileList(imageOf("image/png", CHARACTER_IMAGE_MAX_SIZE + 1)))).toBe(CHARACTER_IMAGE_TOO_LARGE);
    });
});

describe("form rules", () => {
    it("return true for valid values and the error message otherwise", () => {
        expect(characterNameRule("Aragorn")).toBe(true);
        expect(characterNameRule("Al")).toBe(characterErrorMessage(CHARACTER_NAME_INVALID_LENGTH));
        expect(characterImageRule(fileList(imageOf("image/png")))).toBe(true);
        expect(characterImageRule(undefined)).toBe(characterErrorMessage(CHARACTER_IMAGE_REQUIRED));
    });
});

describe("isCharacterErrorCode", () => {
    it("recognizes only the character validation error codes", () => {
        expect(isCharacterErrorCode(CHARACTER_ALREADY_EXISTS)).toBe(true);
        expect(isCharacterErrorCode(CHARACTER_IMAGE_REQUIRED)).toBe(true);
        expect(isCharacterErrorCode(UNAUTHORIZED)).toBe(false);
        expect(isCharacterErrorCode(UNKNOWN_ERROR)).toBe(false);
    });
});

describe("findCharacterNameError", () => {
    it("returns nothing for a successful check", () => {
        expect(findCharacterNameError({ success: true })).toBeNull();
    });

    it("returns the first name related error code", () => {
        expect(findCharacterNameError({ success: false, errorCodes: [CHARACTER_ALREADY_EXISTS] })).toBe(CHARACTER_ALREADY_EXISTS);
        expect(findCharacterNameError({ success: false, errorCodes: [CHARACTER_NAME_INVALID_LENGTH, CHARACTER_NAME_INVALID_LETTERS] }))
            .toBe(CHARACTER_NAME_INVALID_LENGTH);
    });

    it("ignores errors that are not about the name", () => {
        expect(findCharacterNameError({ success: false, errorCodes: [UNAUTHORIZED] })).toBeNull();
        expect(findCharacterNameError({ success: false, errorCodes: [UNKNOWN_ERROR] })).toBeNull();
    });
});

describe("toCharacterFormErrors", () => {
    it("assigns the errors to the fields they belong to", () => {
        expect(toCharacterFormErrors([CHARACTER_ALREADY_EXISTS, CHARACTER_IMAGE_TOO_LARGE, EQUIPMENT_NOT_EXISTS])).toEqual([
            { field: "characterName", message: characterErrorMessage(CHARACTER_ALREADY_EXISTS) },
            { field: "characterImg", message: characterErrorMessage(CHARACTER_IMAGE_TOO_LARGE) },
            { field: "equipmentIds", message: characterErrorMessage(EQUIPMENT_NOT_EXISTS) }
        ]);
    });

    it("keeps only the first error of each field", () => {
        expect(toCharacterFormErrors([CHARACTER_NAME_INVALID_LENGTH, CHARACTER_NAME_INVALID_LETTERS])).toEqual([
            { field: "characterName", message: characterErrorMessage(CHARACTER_NAME_INVALID_LENGTH) }
        ]);
    });

    it("leaves the general errors to be handled elsewhere", () => {
        expect(toCharacterFormErrors([UNAUTHORIZED, UNKNOWN_ERROR])).toEqual([]);
    });
});
