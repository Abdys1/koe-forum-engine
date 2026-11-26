import { describe, expect, it } from "vitest";

import { equipment, equipmentTypes } from "@/features/equipment/model/__fixtures__/equipment";
import { buildEquipmentCatalog } from "@/features/equipment/model/equipmentCatalog";
import { buildCharacterGearOverview, buildGearOverview } from "@/features/equipment/model/gearOverview";

const catalog = buildEquipmentCatalog(equipmentTypes, equipment);

describe("buildGearOverview", () => {
    it("groups the root slot pool by type and lists other slot pools as their own rows", () => {
        const overview = buildGearOverview(catalog.getEquipmentTypeRoots(), catalog.getSlotPoolUsages([100, 102, 103, 100]));

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
        const [weapons] = buildGearOverview(catalog.getEquipmentTypeRoots(), catalog.getSlotPoolUsages([]));

        expect(weapons.rows).toEqual([{ id: "slot-2", label: "Pajzs", items: [] }]);
    });
});

describe("buildCharacterGearOverview", () => {
    it("builds the same overview from the character's own equipment as from the full catalog", () => {
        const selectedIds = [100, 102, 103, 100];
        const characterEquipment = selectedIds.map(id => equipment.find(item => item.id === id)!);

        expect(buildCharacterGearOverview(equipmentTypes, characterEquipment))
            .toEqual(buildGearOverview(catalog.getEquipmentTypeRoots(), catalog.getSlotPoolUsages(selectedIds)));
    });

    it("keeps every root and slot pool when the character has no equipment", () => {
        expect(buildCharacterGearOverview(equipmentTypes, []))
            .toEqual(buildGearOverview(catalog.getEquipmentTypeRoots(), catalog.getSlotPoolUsages([])));
    });
});
