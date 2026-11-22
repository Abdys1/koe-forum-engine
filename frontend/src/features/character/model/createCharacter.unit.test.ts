import { describe, expect, it } from "vitest";

import {
    CharacterInputs,
    parseCreateCharacterFormData,
    toCreateCharacterErrorCodes,
    toCreateCharacterFormData
} from "@/features/character/model/createCharacter";
import { Sex } from "@/lib/api/character/types";

const image = new File(["portrait"], "portrait.png", { type: "image/png" });

const values = {
    raceId: "ork",
    raceTitle: "Ork",
    characterName: "Grumsh",
    characterSex: "no",
    equipmentIds: [100, 100, 103],
    characterImg: [image] as unknown as FileList
} satisfies CharacterInputs;

describe("toCreateCharacterFormData", () => {
    it("serializes the form values for the create character action", () => {
        const formData = toCreateCharacterFormData(values);

        expect(formData.get("name")).toBe("Grumsh");
        expect(formData.get("sex")).toBe(String(Sex.FEMALE));
        expect(formData.get("race")).toBe("ork");
        expect(formData.get("image")).toBeInstanceOf(File);
        expect(formData.getAll("equipmentIds")).toEqual(["100", "100", "103"]);
    });
});

describe("parseCreateCharacterFormData", () => {
    it("restores the create character request from the serialized form values", () => {
        const request = parseCreateCharacterFormData(toCreateCharacterFormData(values));

        expect(request).toMatchObject({ name: "Grumsh", sex: Sex.FEMALE, race: "ork", equipmentIds: [100, 100, 103] });
        expect(request?.image).toBeInstanceOf(File);
    });

    it("returns null without an image", () => {
        const formData = new FormData();
        formData.append("name", "Grumsh");

        expect(parseCreateCharacterFormData(formData)).toBeNull();
    });
});

describe("toCreateCharacterErrorCodes", () => {
    it.each([401, 403])("maps status %i to UNAUTHORIZED", status => {
        expect(toCreateCharacterErrorCodes(status, { errorCode: "IGNORED" })).toEqual(["UNAUTHORIZED"]);
    });

    it("returns the error code of the response body", () => {
        expect(toCreateCharacterErrorCodes(409, { errorCode: "CHARACTER_NAME_TAKEN" })).toEqual(["CHARACTER_NAME_TAKEN"]);
    });

    it("returns the messages of the validation errors", () => {
        const body = { errors: [{ msg: "NAME_REQUIRED" }, { msg: "RACE_INVALID" }] };

        expect(toCreateCharacterErrorCodes(400, body)).toEqual(["NAME_REQUIRED", "RACE_INVALID"]);
    });

    it("falls back to UNKNOWN_ERROR", () => {
        expect(toCreateCharacterErrorCodes(500, undefined)).toEqual(["UNKNOWN_ERROR"]);
    });
});
