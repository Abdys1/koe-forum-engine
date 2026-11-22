import { describe, expect, it } from "vitest";

import { toSameOriginPath } from "@/features/auth/model/redirect";

const origin = "https://gloamfall.example";

describe("toSameOriginPath", () => {
    it("keeps the path, query and hash of a same-origin url", () => {
        expect(toSameOriginPath(`${origin}/character/1?tab=gear#top`, origin)).toBe("/character/1?tab=gear#top");
    });

    it("resolves a relative path against the origin", () => {
        expect(toSameOriginPath("/roleplay-area", origin)).toBe("/roleplay-area");
    });

    it.each([
        ["another origin", "https://evil.example/steal"],
        ["a protocol-relative url", "//evil.example/steal"],
        ["another port", "https://gloamfall.example:8443/"]
    ])("falls back to the home page for %s", (_, url) => {
        expect(toSameOriginPath(url, origin)).toBe("/");
    });

    it("falls back to the home page without a url", () => {
        expect(toSameOriginPath(undefined, origin)).toBe("/");
        expect(toSameOriginPath("", origin)).toBe("/");
    });

    it("falls back to the home page for an unparsable url", () => {
        expect(toSameOriginPath("http://[invalid", origin)).toBe("/");
    });
});
