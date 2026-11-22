import { describe, expect, it } from "vitest";

import { resolveActiveCharacter } from "@/features/character/model/activeCharacter";
import { Sex } from "@/lib/api/character/types";

const character = (id: number) => ({ id, name: `Karakter ${id}`, sex: Sex.MALE, race: "ember", imageUrl: `/${id}.png` });
const characters = [character(1), character(2), character(3)];

describe("resolveActiveCharacter", () => {
    it("returns the selected character", () => {
        expect(resolveActiveCharacter(characters, 2)?.id).toBe(2);
    });

    it("falls back to the first character without a selection", () => {
        expect(resolveActiveCharacter(characters, null)?.id).toBe(1);
    });

    it("falls back to the first character when the selected one is not owned", () => {
        expect(resolveActiveCharacter(characters, 99)?.id).toBe(1);
    });

    it("returns undefined without characters", () => {
        expect(resolveActiveCharacter([], 1)).toBeUndefined();
    });
});
