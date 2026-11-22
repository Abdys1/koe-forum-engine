import { describe, expect, it } from "vitest";

import { isCurrentPage } from "./menuItems";

describe("isCurrentPage", () => {
    it("matches the item's page and its subpages", () => {
        const item = { label: "Játéktér", icon: "map", href: "/roleplay-area" };

        expect(isCurrentPage(item, "/roleplay-area")).toBe(true);
        expect(isCurrentPage(item, "/roleplay-area/locations/fogado")).toBe(true);
        expect(isCurrentPage(item, "/character/1")).toBe(false);
    });

    it("never matches a placeholder item", () => {
        expect(isCurrentPage({ label: "Chat", icon: "chat", href: "#" }, "/")).toBe(false);
    });
});
