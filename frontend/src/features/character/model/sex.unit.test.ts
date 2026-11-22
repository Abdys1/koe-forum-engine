import { describe, expect, it } from "vitest";

import { sexLabels, sexMapping, toSelectableSex } from "@/features/character/model/sex";
import { Sex } from "@/lib/api/character/types";

describe("sex mapping", () => {
    it("maps the selectable sexes to the API values", () => {
        expect(sexMapping).toEqual({ ferfi: Sex.MALE, no: Sex.FEMALE });
    });

    it("maps the API values back to the selectable sexes", () => {
        expect(toSelectableSex(Sex.MALE)).toBe("ferfi");
        expect(toSelectableSex(Sex.FEMALE)).toBe("no");
    });

    it("labels every selectable sex", () => {
        expect(sexLabels).toEqual({ ferfi: "Férfi", no: "Nő" });
    });
});
