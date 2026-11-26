import { describe, expect, it } from "vitest";

import { equipment, equipmentTypes } from "@/features/equipment/model/__fixtures__/equipment";
import { buildEquipmentCatalog } from "@/features/equipment/model/equipmentCatalog";

const catalog = buildEquipmentCatalog(equipmentTypes, equipment);

describe("buildEquipmentCatalog", () => {
    it("returns the root equipment types", () => {
        expect(catalog.getEquipmentTypeRoots().map(root => root.id)).toEqual([10, 20]);
    });

    it("creates one slot pool per slot under its root and marks the root's own slot", () => {
        expect(catalog.getRootSlotPools(10)).toEqual([
            { id: 1, label: "Fegyverek", rootId: 10, capacity: 4, isRootSlotPool: true },
            { id: 2, label: "Pajzs", rootId: 10, capacity: 1, isRootSlotPool: false }
        ]);
        expect(catalog.getRootSlotPools(20)).toEqual([]);
    });

    it("creates a section for every slotted type with costed equipment", () => {
        const sections = catalog.getRootSections(10).map(section => ({
            typeId: section.type.id,
            label: section.label,
            itemIds: section.entries.map(entry => entry.item.id)
        }));
        expect(sections).toEqual([
            { typeId: 10, label: "Fegyver", itemIds: [102] },
            { typeId: 11, label: "Kard", itemIds: [100, 101] },
            { typeId: 12, label: "Pajzs", itemIds: [103] }
        ]);
        expect(catalog.getRootSections(20)).toEqual([]);
    });

    it("does not index equipment without a slot", () => {
        expect(catalog.findEquipment(100)?.cost).toBe(1);
        expect(catalog.findEquipment(104)).toBeUndefined();
    });
});

describe("EquipmentCatalog.getSlotPoolUsages", () => {
    it("sums the costs and records the selection index of each occupant", () => {
        const usages = catalog.getSlotPoolUsages([100, 103, 100, 999]);

        expect(usages.get(1)?.used).toBe(2);
        expect(usages.get(1)?.occupants.map(occupant => occupant.index)).toEqual([0, 2]);
        expect(usages.get(2)?.used).toBe(1);
        expect(usages.get(2)?.occupants.map(occupant => occupant.index)).toEqual([1]);
    });

    it("sums usage and capacity per root", () => {
        const usages = catalog.getSlotPoolUsages([100, 103]);

        expect(catalog.getRootUsage(10, usages)).toEqual({ used: 2, capacity: 5 });
        expect(catalog.getRootUsage(20, usages)).toEqual({ used: 0, capacity: 0 });
    });
});

describe("EquipmentCatalog.resolveSelection", () => {
    it("adds an item that fits into the free capacity", () => {
        expect(catalog.resolveSelection(100, catalog.getSlotPoolUsages([102]))).toEqual({ kind: "add" });
    });

    it("blocks an item that does not fit and reports the free capacity", () => {
        expect(catalog.resolveSelection(102, catalog.getSlotPoolUsages([100, 100, 100])))
            .toEqual({ kind: "blocked", free: 1 });
    });

    it("replaces every occupant when the item fills the whole slot pool", () => {
        expect(catalog.resolveSelection(101, catalog.getSlotPoolUsages([100, 103, 102])))
            .toEqual({ kind: "replace", indices: [0, 2] });
    });

    it("blocks an unknown item", () => {
        expect(catalog.resolveSelection(999, catalog.getSlotPoolUsages([]))).toEqual({ kind: "blocked", free: 0 });
    });
});
