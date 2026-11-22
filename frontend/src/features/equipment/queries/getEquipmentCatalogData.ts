import { equipmentClient } from "@/lib/api/equipment";
import { EquipmentCatalogData } from "@/lib/api/equipment/types";

export function getEquipmentCatalogData(): Promise<EquipmentCatalogData> {
    return equipmentClient.getCatalogData();
}
