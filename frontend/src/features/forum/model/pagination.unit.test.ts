import { describe, expect, it } from "vitest";

import { getFirstPostNumber, parsePageRequest } from "@/features/forum/model/pagination";
import { DEFAULT_POST_PAGE_SIZE } from "@/lib/api/posts/types";

describe("parsePageRequest", () => {
    it("parses the page and the page size", () => {
        expect(parsePageRequest({ page: "3", pageSize: "50" })).toEqual({ page: 3, pageSize: 50 });
    });

    it("uses the first value of repeated parameters", () => {
        expect(parsePageRequest({ page: ["2", "5"], pageSize: ["100", "20"] })).toEqual({ page: 2, pageSize: 100 });
    });

    it.each([
        ["missing", {}],
        ["zero", { page: "0", pageSize: "0" }],
        ["fractional", { page: "1.5", pageSize: "25" }],
        ["non-numeric", { page: "abc", pageSize: "abc" }]
    ])("falls back to the defaults for %s values", (_, searchParams) => {
        expect(parsePageRequest(searchParams)).toEqual({ page: 1, pageSize: DEFAULT_POST_PAGE_SIZE });
    });
});

describe("getFirstPostNumber", () => {
    it("numbers the posts of the first page from the total count downwards", () => {
        expect(getFirstPostNumber(45, 1, 20)).toBe(45);
    });

    it("continues the numbering on the later pages", () => {
        expect(getFirstPostNumber(45, 3, 20)).toBe(5);
    });
});
