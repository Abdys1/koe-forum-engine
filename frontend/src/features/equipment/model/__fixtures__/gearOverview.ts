import { equipmentCatalogData } from "@/features/equipment/model/__fixtures__/equipmentCatalogData";
import { buildEquipmentCatalog } from "@/features/equipment/model/equipmentCatalog";
import { GearOverviewRoot, toGearOverview } from "@/features/equipment/model/gearOverview";

const catalog = buildEquipmentCatalog(equipmentCatalogData);

export function gearOverviewFor(selectedIds: number[]): GearOverviewRoot[] {
    return toGearOverview(catalog.getEquipmentTypeRoots(), catalog.getSlotPoolUsages(selectedIds));
}
