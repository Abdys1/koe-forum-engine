import { describe, expect, it } from "vitest";

import { findLocation, locationHref } from "@/features/forum/model/location";

describe("location", () => {
    it("finds a location by id", () => {
        expect(findLocation("fogado-a-feher-siralyhoz")?.name).toBe("Fogadó a Fehér Sirályhoz");
        expect(findLocation("ismeretlen")).toBeUndefined();
    });

    it("builds the href of a location", () => {
        expect(locationHref("fogado")).toBe("/roleplay-area/locations/fogado");
    });
});
