import { describe, expect, it } from "vitest";

import { toCharacter } from "@/features/character/model/character";
import { Sex } from "@/lib/api/character/types";

describe("toCharacter", () => {
    it("maps the API character details to the view model", () => {
        const details = { id: 7, name: "Arwen", sex: Sex.FEMALE, race: "elf", imageUrl: "/arwen.png" };

        expect(toCharacter(details)).toEqual({
            id: "7",
            name: "Arwen",
            imageUrl: "/arwen.png",
            raceId: "elf",
            sex: "no"
        });
    });
});
