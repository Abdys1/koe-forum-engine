import { describe, expect, it } from "vitest";

import { splitParagraphs } from "@/utils/text";

describe("splitParagraphs", () => {
    it("splits the text at blank lines", () => {
        expect(splitParagraphs("Első bekezdés.\n\nMásodik bekezdés.\n  \nHarmadik.")).toEqual(["Első bekezdés.", "Második bekezdés.", "Harmadik."]);
    });

    it("keeps single line breaks inside a paragraph", () => {
        expect(splitParagraphs("Első sor\nmásodik sor")).toEqual(["Első sor\nmásodik sor"]);
    });

    it("returns no paragraph for empty or missing text", () => {
        expect(splitParagraphs("   ")).toEqual([]);
        expect(splitParagraphs(undefined)).toEqual([]);
    });
});
