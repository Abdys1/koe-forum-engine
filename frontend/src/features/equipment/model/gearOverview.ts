import { buildEquipmentCatalog, filterRootSlotPoolUsages, Occupant, SlotPoolUsage, sumSlotPoolUsages } from "@/features/equipment/model/equipmentCatalog";
import type { Equipment, EquipmentType } from "@/lib/api/equipment/types";

export interface GearOverviewItem {
    id: number,
    name: string,
    count: number
}

export interface GearOverviewRow {
    id: string,
    label: string,
    items: GearOverviewItem[]
}

export interface GearOverviewRoot {
    id: number,
    label: string,
    icon: string | null,
    used: number,
    capacity: number,
    rows: GearOverviewRow[]
}

export function buildGearOverview(equipmentTypeRoots: EquipmentType[], slotPoolUsages: Map<number, SlotPoolUsage>): GearOverviewRoot[] {
    return equipmentTypeRoots.map(root => {
        const rootSlotPoolUsages = filterRootSlotPoolUsages(slotPoolUsages, root.id);
        return {
            id: root.id,
            label: root.label,
            icon: root.icon,
            ...sumSlotPoolUsages(rootSlotPoolUsages),
            rows: rootSlotPoolUsages.flatMap(toRows)
        };
    });
}

export function buildCharacterGearOverview(equipmentTypes: EquipmentType[], characterEquipment: Equipment[]): GearOverviewRoot[] {
    const uniqueEquipment = Array.from(new Map(characterEquipment.map(equipment => [equipment.id, equipment])).values());
    const catalog = buildEquipmentCatalog(equipmentTypes, uniqueEquipment);
    return buildGearOverview(
        catalog.getEquipmentTypeRoots(),
        catalog.getSlotPoolUsages(characterEquipment.map(equipment => equipment.id))
    );
}

function toRows({ slotPool, occupants }: SlotPoolUsage): GearOverviewRow[] {
    return slotPool.isRootSlotPool
        ? groupByType(occupants)
        : [{ id: `slot-${slotPool.id}`, label: slotPool.label, items: countItems(occupants) }];
}

function groupByType(occupants: Occupant[]): GearOverviewRow[] {
    const groups = new Map<number, { type: EquipmentType, occupants: Occupant[] }>();
    occupants.forEach(occupant => {
        const group = groups.get(occupant.entry.type.id);
        if (group) group.occupants.push(occupant);
        else groups.set(occupant.entry.type.id, { type: occupant.entry.type, occupants: [occupant] });
    });
    return Array.from(groups.values(), ({ type, occupants }) => ({
        id: `type-${type.id}`,
        label: type.label,
        items: countItems(occupants)
    }));
}

function countItems(occupants: Occupant[]): GearOverviewItem[] {
    const items = new Map<number, GearOverviewItem>();
    occupants.forEach(({ entry }) => {
        const item = items.get(entry.item.id);
        if (item) item.count++;
        else items.set(entry.item.id, { id: entry.item.id, name: entry.item.name, count: 1 });
    });
    return Array.from(items.values());
}
