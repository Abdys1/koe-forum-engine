import { EquipmentItem, EquipmentType, equipmentTypes } from "@/dummydata/equipment";

export interface SlotPool {
    type: EquipmentType,
    rootId: string,
    capacity: number
}

export interface EquipmentEntry {
    item: EquipmentItem,
    type: EquipmentType,
    rootId: string,
    pool: SlotPool,
    cost: number
}

export interface CatalogSection {
    type: EquipmentType,
    label: string,
    pool: SlotPool,
    cost: number,
    items: EquipmentItem[]
}

export interface Occupant {
    entry: EquipmentEntry,
    index: number
}

export interface PoolUsage {
    pool: SlotPool,
    used: number,
    occupants: Occupant[]
}

export interface RootUsage {
    used: number,
    capacity: number
}

export interface SelectedGroup {
    entry: EquipmentEntry,
    count: number
}

export interface SelectedTypeGroup {
    type: EquipmentType,
    groups: SelectedGroup[]
}

export type SelectionResult =
    | { kind: "add" }
    | { kind: "replace", indices: number[] }
    | { kind: "blocked", free: number };

const pools: SlotPool[] = [];
const sections: CatalogSection[] = [];
const entries = new Map<string, EquipmentEntry>();

function indexType(type: EquipmentType, rootId: string, path: string[], inheritedPool?: SlotPool, inheritedCost?: number) {
    const pool = type.slots ? { type, rootId, capacity: type.slots } : inheritedPool;
    if (type.slots && pool) pools.push(pool);
    const cost = type.slotCost ?? inheritedCost;

    if (type.items?.length && pool && cost) {
        sections.push({ type, label: path.join(" › "), pool, cost, items: type.items });
        type.items.forEach(item => entries.set(item.id, { item, type, rootId, pool, cost }));
    }

    type.children?.forEach(child => indexType(child, rootId, [...path, child.label], pool, cost));
}

equipmentTypes.forEach(root => indexType(root, root.id, []));

export const equipmentRoots = equipmentTypes;

export function findEquipment(itemId: string): EquipmentEntry | undefined {
    return entries.get(itemId);
}

export function getRootPools(rootId: string): SlotPool[] {
    return pools.filter(pool => pool.rootId === rootId);
}

export function getRootSections(rootId: string): CatalogSection[] {
    return sections.filter(section => section.pool.rootId === rootId);
}

export function getPoolUsages(selectedIds: string[]): Map<string, PoolUsage> {
    const usages = new Map<string, PoolUsage>(
        pools.map(pool => [pool.type.id, { pool, used: 0, occupants: [] }])
    );
    selectedIds.forEach((itemId, index) => {
        const entry = entries.get(itemId);
        const usage = entry && usages.get(entry.pool.type.id);
        if (!entry || !usage) return;
        usage.used += entry.cost;
        usage.occupants.push({ entry, index });
    });
    return usages;
}

export function getRootUsage(rootId: string, usages: Map<string, PoolUsage>): RootUsage {
    return getRootPools(rootId).reduce((total, pool) => ({
        used: total.used + (usages.get(pool.type.id)?.used ?? 0),
        capacity: total.capacity + pool.capacity
    }), { used: 0, capacity: 0 });
}

export function resolveSelection(itemId: string, usages: Map<string, PoolUsage>): SelectionResult {
    const entry = entries.get(itemId);
    const usage = entry && usages.get(entry.pool.type.id);
    if (!entry || !usage) return { kind: "blocked", free: 0 };

    const free = usage.pool.capacity - usage.used;
    if (entry.cost <= free) return { kind: "add" };
    if (entry.cost === usage.pool.capacity) {
        return { kind: "replace", indices: usage.occupants.map(occupant => occupant.index) };
    }
    return { kind: "blocked", free };
}

export function applySelection(itemId: string, selectedIds: string[], result: SelectionResult): string[] {
    if (result.kind === "add") return [...selectedIds, itemId];
    if (result.kind === "replace") {
        return [...selectedIds.filter((_, index) => !result.indices.includes(index)), itemId];
    }
    return selectedIds;
}

function groupSelection(selectedIds: string[], rootId: string): SelectedGroup[] {
    const groups = new Map<string, SelectedGroup>();
    selectedIds.forEach(itemId => {
        const entry = entries.get(itemId);
        if (!entry || entry.rootId !== rootId) return;
        const group = groups.get(itemId);
        if (group) group.count++;
        else groups.set(itemId, { entry, count: 1 });
    });
    return Array.from(groups.values());
}

function groupByType(groups: SelectedGroup[]): SelectedTypeGroup[] {
    const typeGroups = new Map<string, SelectedTypeGroup>();
    groups.forEach(group => {
        const typeGroup = typeGroups.get(group.entry.type.id);
        if (typeGroup) typeGroup.groups.push(group);
        else typeGroups.set(group.entry.type.id, { type: group.entry.type, groups: [group] });
    });
    return Array.from(typeGroups.values());
}

export function groupSelectionByType(selectedIds: string[], rootId: string): SelectedTypeGroup[] {
    return groupByType(groupSelection(selectedIds, rootId));
}

export function groupSelectionBySlot(selectedIds: string[], rootId: string): SelectedTypeGroup[] {
    const selected = groupSelection(selectedIds, rootId);
    return getRootPools(rootId).flatMap(pool => {
        const poolGroups = selected.filter(group => group.entry.pool === pool);
        return pool.type.id === rootId ? groupByType(poolGroups) : [{ type: pool.type, groups: poolGroups }];
    });
}

export function compactSelection(ids: readonly (string | null | undefined)[] | undefined): string[] {
    return (ids ?? []).filter((id): id is string => !!id);
}
