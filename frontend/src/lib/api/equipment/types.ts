import type { components } from "@/lib/api/schema";

export type Equipment = components["schemas"]["Equipment"];

export type EquipmentType = components["schemas"]["EquipmentType"];

export interface EquipmentClient {
    getEquipment: () => Promise<Equipment[]>,
    getEquipmentTypes: () => Promise<EquipmentType[]>
}
