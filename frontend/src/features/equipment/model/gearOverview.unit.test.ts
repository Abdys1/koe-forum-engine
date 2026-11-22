import { describe, expect, it } from "vitest";

import { equipmentCatalogData } from "@/features/equipment/model/__fixtures__/equipmentCatalogData";
import { buildEquipmentCatalog } from "@/features/equipment/model/equipmentCatalog";
import { toGearOverview } from "@/features/equipment/model/gearOverview";

const catalog = buildEquipmentCatalog(equipmentCatalogData);

describe("toGearOverview", () => {
    it("groups the root slot pool by type and lists other slot pools as their own rows", () => {
        const overview = toGearOverview(catalog.getEquipmentTypeRoots(), catalog.getSlotPoolUsages([100, 102, 103, 100]));

        expect(overview).toEqual([
            {
                id: 10,
                label: "Fegyver",
                icon: "swords",
                used: 5,
                capacity: 5,
                rows: [
                    { id: "type-11", label: "Kard", items: [{ id: 100, name: "Rövidkard", count: 2 }] },
                    { id: "type-10", label: "Fegyver", items: [{ id: 102, name: "Tőr", count: 1 }] },
                    { id: "slot-2", label: "Pajzs", items: [{ id: 103, name: "Kerek pajzs", count: 1 }] }
                ]
            },
            { id: 20, label: "Ruházat", icon: "checkroom", used: 0, capacity: 0, rows: [] }
        ]);
    });

    it("keeps an empty row for an unused non-root slot pool", () => {
        const [weapons] = toGearOverview(catalog.getEquipmentTypeRoots(), catalog.getSlotPoolUsages([]));

        expect(weapons.rows).toEqual([{ id: "slot-2", label: "Pajzs", items: [] }]);
    });
});
