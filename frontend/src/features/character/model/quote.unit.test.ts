import { describe, expect, it } from "vitest";

import { MAX_QUOTE_LENGTH, toCharacterQuote } from "@/features/character/model/quote";

const draft = { text: "  Sosem hátrál meg.  ", locationId: "fogado", postNumber: "12" };

describe("toCharacterQuote", () => {
    it("trims the text and parses the post number", () => {
        expect(toCharacterQuote(draft)).toEqual({ text: "Sosem hátrál meg.", locationId: "fogado", postNumber: 12 });
    });

    it.each([
        ["empty text", { text: "   " }],
        ["too long text", { text: "a".repeat(MAX_QUOTE_LENGTH + 1) }],
        ["missing location", { locationId: "" }],
        ["missing post number", { postNumber: "" }],
        ["zero post number", { postNumber: "0" }],
        ["fractional post number", { postNumber: "1.5" }],
        ["non-numeric post number", { postNumber: "abc" }]
    ])("rejects a draft with %s", (_, override) => {
        expect(toCharacterQuote({ ...draft, ...override })).toBeNull();
    });
});
