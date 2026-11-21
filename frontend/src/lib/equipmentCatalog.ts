import type { EquipmentCatalogData, EquipmentType } from "@/lib/api/equipment/types";

export interface EquipmentItem {
    id: number,
    name: string,
    description: string
}

export interface SlotPool {
    id: number,
    label: string,
    rootId: number,
    capacity: number,
    isRootSlotPool: boolean
}

export interface EquipmentEntry {
    item: EquipmentItem,
    type: EquipmentType,
    rootId: number,
    slotPool: SlotPool,
    cost: number
}

export interface CatalogSection {
    type: EquipmentType,
    rootId: number,
    label: string,
    slotPool: SlotPool,
    entries: EquipmentEntry[]
}

export interface Occupant {
    entry: EquipmentEntry,
    index: number
}

export interface SlotPoolUsage {
    slotPool: SlotPool,
    used: number,
    occupants: Occupant[]
}

export interface RootUsage {
    used: number,
    capacity: number
}

export type SelectionResult =
    | { kind: "add" }
    | { kind: "replace", indices: number[] }
    | { kind: "blocked", free: number };

export function filterRootSlotPoolUsages(usages: Map<number, SlotPoolUsage>, rootId: number): SlotPoolUsage[] {
    return Array.from(usages.values()).filter(usage => usage.slotPool.rootId === rootId);
}

export function sumSlotPoolUsages(usages: SlotPoolUsage[]): RootUsage {
    return usages.reduce((total, usage) => ({
        used: total.used + usage.used,
        capacity: total.capacity + usage.slotPool.capacity
    }), { used: 0, capacity: 0 });
}

export class EquipmentCatalog {
    constructor(
        private readonly equipmentTypeRoots: EquipmentType[],
        private readonly slotPools: SlotPool[],
        private readonly sections: CatalogSection[],
        private readonly entries: Map<number, EquipmentEntry>
    ) {}

    public getEquipmentTypeRoots(): EquipmentType[] {
        return this.equipmentTypeRoots;
    }

    public findEquipment(itemId: number): EquipmentEntry | undefined {
        return this.entries.get(itemId);
    }

    public getRootSlotPools(rootId: number): SlotPool[] {
        return this.slotPools.filter(slotPool => slotPool.rootId === rootId);
    }

    public getRootSections(rootId: number): CatalogSection[] {
        return this.sections.filter(section => section.rootId === rootId);
    }

    public getSlotPoolUsages(selectedIds: number[]): Map<number, SlotPoolUsage> {
        const usages = new Map<number, SlotPoolUsage>(
            this.slotPools.map(slotPool => [slotPool.id, { slotPool, used: 0, occupants: [] }])
        );
        selectedIds.forEach((itemId, index) => {
            const entry = this.entries.get(itemId);
            const usage = entry && usages.get(entry.slotPool.id);
            if (!entry || !usage) return;
            usage.used += entry.cost;
            usage.occupants.push({ entry, index });
        });
        return usages;
    }

    public getRootUsage(rootId: number, usages: Map<number, SlotPoolUsage>): RootUsage {
        return sumSlotPoolUsages(filterRootSlotPoolUsages(usages, rootId));
    }

    public resolveSelection(itemId: number, usages: Map<number, SlotPoolUsage>): SelectionResult {
        const entry = this.entries.get(itemId);
        const usage = entry && usages.get(entry.slotPool.id);
        if (!entry || !usage) return { kind: "blocked", free: 0 };

        const free = entry.slotPool.capacity - usage.used;
        if (entry.cost <= free) return { kind: "add" };
        if (entry.cost === entry.slotPool.capacity) {
            return { kind: "replace", indices: usage.occupants.map(occupant => occupant.index) };
        }
        return { kind: "blocked", free };
    }
}

export function buildEquipmentCatalog({ equipmentTypes, slots, equipments }: EquipmentCatalogData): EquipmentCatalog {
    const slotsById = new Map(slots.map(slot => [slot.id, slot]));
    const childrenByParentId = new Map<number | null, EquipmentType[]>();
    equipmentTypes.forEach(type => {
        const siblings = childrenByParentId.get(type.parentId) ?? [];
        siblings.push(type);
        childrenByParentId.set(type.parentId, siblings);
    });
    const equipmentsByTypeId = new Map<number, EquipmentItem[]>();
    const costsByItemId = new Map<number, number | null>();
    equipments.forEach(equipment => {
        const items = equipmentsByTypeId.get(equipment.type.id) ?? [];
        items.push({ id: equipment.id, name: equipment.name, description: equipment.description });
        equipmentsByTypeId.set(equipment.type.id, items);
        costsByItemId.set(equipment.id, equipment.slotCost);
    });

    const equipmentTypeRoots = childrenByParentId.get(null) ?? [];
    const slotPools: SlotPool[] = [];
    const sections: CatalogSection[] = [];
    const entries = new Map<number, EquipmentEntry>();

    function getOrCreateSlotPool(slotId: number | null, root: EquipmentType): SlotPool | undefined {
        const slot = slotId === null ? undefined : slotsById.get(slotId);
        if (!slot) return undefined;
        const existing = slotPools.find(slotPool => slotPool.id === slot.id);
        if (existing) return existing;
        const slotPool = { id: slot.id, label: slot.label, rootId: root.id, capacity: slot.maxCapacity, isRootSlotPool: root.slotId === slot.id };
        slotPools.push(slotPool);
        return slotPool;
    }

    function indexType(type: EquipmentType, root: EquipmentType, path: string[], visited: Set<number>) {
        if (visited.has(type.id)) return;
        visited.add(type.id);

        const slotPool = getOrCreateSlotPool(type.slotId, root);
        const items = equipmentsByTypeId.get(type.id) ?? [];
        const sectionEntries = slotPool
            ? items.flatMap(item => {
                const cost = costsByItemId.get(item.id);
                return cost ? [{ item, type, rootId: root.id, slotPool, cost }] : [];
            })
            : [];
        if (slotPool && sectionEntries.length) {
            sections.push({ type, rootId: root.id, label: path.length ? path.join(" › ") : type.label, slotPool, entries: sectionEntries });
            sectionEntries.forEach(entry => entries.set(entry.item.id, entry));
        }

        childrenByParentId.get(type.id)?.forEach(child => indexType(child, root, [...path, child.label], visited));
    }

    equipmentTypeRoots.forEach(root => indexType(root, root, [], new Set()));

    return new EquipmentCatalog(equipmentTypeRoots, slotPools, sections, entries);
}
