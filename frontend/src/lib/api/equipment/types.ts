import type { components } from "@/lib/api/schema";

export type Equipment = components["schemas"]["Equipment"];

export type EquipmentType = components["schemas"]["EquipmentType"];

export type Slot = components["schemas"]["Slot"];

export interface EquipmentCatalogData {
    equipmentTypes: EquipmentType[],
    slots: Slot[],
    equipments: Equipment[]
}

export interface EquipmentClient {
    getCatalogData: () => Promise<EquipmentCatalogData>
}
