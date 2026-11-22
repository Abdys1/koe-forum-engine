import { describe, expect, it } from "vitest";

import { canReturnToSummary, getProgressPercent, getStepStatus } from "./stepNavigation";

describe("getStepStatus", () => {
    it("marks the steps before, at and after the actual step", () => {
        expect([0, 1, 2].map(step => getStepStatus(step, 1))).toEqual(["done", "active", "unfinished"]);
    });
});

describe("getProgressPercent", () => {
    it("spreads the progress evenly between the first and the last step", () => {
        expect(getProgressPercent(0, 5)).toBe(0);
        expect(getProgressPercent(2, 5)).toBe(50);
        expect(getProgressPercent(4, 5)).toBe(100);
    });

    it("returns zero for a single step", () => {
        expect(getProgressPercent(0, 1)).toBe(0);
    });
});

describe("canReturnToSummary", () => {
    const allComplete = [true, true, true, true, true];

    it("allows returning once the summary was reached and the remaining steps are complete", () => {
        expect(canReturnToSummary(true, 1, allComplete)).toBe(true);
    });

    it("disallows returning before the summary was reached", () => {
        expect(canReturnToSummary(false, 1, allComplete)).toBe(false);
    });

    it("disallows returning from the summary itself", () => {
        expect(canReturnToSummary(true, 4, allComplete)).toBe(false);
    });

    it("disallows returning while a step between the actual one and the summary is incomplete", () => {
        expect(canReturnToSummary(true, 1, [true, true, false, true, true])).toBe(false);
    });

    it("ignores incomplete steps before the actual one", () => {
        expect(canReturnToSummary(true, 2, [false, false, true, true, true])).toBe(true);
    });
});
