import { describe, expect, it } from "vitest";

import { applySelection, compactSelection } from "@/lib/equipment";

describe("applySelection", () => {
    it("appends the item when it can be added", () => {
        expect(applySelection(5, [1, 2], { kind: "add" })).toEqual([1, 2, 5]);
    });

    it("removes the replaced indices and appends the item", () => {
        expect(applySelection(5, [1, 2, 3], { kind: "replace", indices: [0, 2] })).toEqual([2, 5]);
    });

    it("keeps the selection when the item is blocked", () => {
        const selectedIds = [1, 2];
        expect(applySelection(5, selectedIds, { kind: "blocked", free: 0 })).toBe(selectedIds);
    });
});

describe("compactSelection", () => {
    it("drops empty entries", () => {
        expect(compactSelection([1, null, undefined, 2])).toEqual([1, 2]);
    });

    it("returns an empty selection for undefined", () => {
        expect(compactSelection(undefined)).toEqual([]);
    });
});
