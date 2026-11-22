import { describe, expect, it } from "vitest";

import { buildPageHref, getPageItems } from "./pageLinks";

describe("getPageItems", () => {
    it("lists every page when there are only a few", () => {
        expect(getPageItems(2, 3)).toEqual([1, 2, 3]);
    });

    it("shows the first, the last and the neighbours of the current page with ellipses between", () => {
        expect(getPageItems(5, 10)).toEqual([1, "ellipsis", 4, 5, 6, "ellipsis", 10]);
    });

    it("leaves out the ellipsis next to the first page", () => {
        expect(getPageItems(2, 10)).toEqual([1, 2, 3, "ellipsis", 10]);
    });

    it("returns a single page", () => {
        expect(getPageItems(1, 1)).toEqual([1]);
    });

    it("returns no page when there are no pages", () => {
        expect(getPageItems(1, 0)).toEqual([]);
    });
});

describe("buildPageHref", () => {
    const base = { pathname: "/locations/fogado", searchParams: "", defaultPageSize: 20 };

    it("omits the default page and page size", () => {
        expect(buildPageHref({ ...base, page: 1, pageSize: 20 })).toBe("/locations/fogado");
    });

    it("sets the page and the page size", () => {
        expect(buildPageHref({ ...base, page: 3, pageSize: 50 })).toBe("/locations/fogado?page=3&pageSize=50");
    });

    it("keeps unrelated query parameters and replaces the existing paging ones", () => {
        expect(buildPageHref({ ...base, searchParams: "filter=open&page=7&pageSize=100", page: 2, pageSize: 20 }))
            .toBe("/locations/fogado?filter=open&page=2");
    });

    it("appends the anchor", () => {
        expect(buildPageHref({ ...base, page: 2, pageSize: 20, anchorId: "posts" })).toBe("/locations/fogado?page=2#posts");
    });
});
