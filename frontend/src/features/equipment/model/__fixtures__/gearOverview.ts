import { equipment, equipmentTypes } from "@/features/equipment/model/__fixtures__/equipment";
import { buildEquipmentCatalog } from "@/features/equipment/model/equipmentCatalog";
import { buildGearOverview,GearOverviewRoot } from "@/features/equipment/model/gearOverview";

const catalog = buildEquipmentCatalog(equipmentTypes, equipment);

export function gearOverviewFor(selectedIds: number[]): GearOverviewRoot[] {
    return buildGearOverview(catalog.getEquipmentTypeRoots(), catalog.getSlotPoolUsages(selectedIds));
}
