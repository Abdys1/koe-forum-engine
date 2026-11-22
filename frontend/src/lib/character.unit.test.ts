import { describe, expect, it } from "vitest";

import { Sex } from "@/lib/api/character/types";
import { sexMapping, toCharacter } from "@/lib/character";

describe("toCharacter", () => {
    it("maps the API character details to the view model", () => {
        const details = { id: 7, name: "Arwen", sex: Sex.FEMALE, race: "elf", imageUrl: "/arwen.png" };

        expect(toCharacter(details, [100, 103])).toEqual({
            id: "7",
            name: "Arwen",
            imageUrl: "/arwen.png",
            raceId: "elf",
            sex: "no",
            equipmentIds: [100, 103]
        });
    });

    it("maps the selectable sexes back to the API values", () => {
        expect(sexMapping).toEqual({ ferfi: Sex.MALE, no: Sex.FEMALE });
    });
});
