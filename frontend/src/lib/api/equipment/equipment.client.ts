import { ApiClient } from "@/lib/api/client/api-client";
import { ApiResponseError } from "@/lib/api/client/api-response.error";
import { Equipment, EquipmentCatalogData, EquipmentClient, EquipmentType, Slot } from "@/lib/api/equipment/types";

export default class EquipmentClientImpl implements EquipmentClient {
    private api: ApiClient;

    constructor(api: ApiClient) {
        this.api = api;
    }

    public async getCatalogData(): Promise<EquipmentCatalogData> {
        const [equipmentTypes, slots, equipments] = await Promise.all([
            this.getEquipmentTypes(),
            this.getSlots(),
            this.getEquipments()
        ]);
        return { equipmentTypes, slots, equipments };
    }

    private async getEquipmentTypes(): Promise<EquipmentType[]> {
        const { data, error, response } = await this.api.GET('/equipment/type');
        if (!response.ok || !data) {
            throw new ApiResponseError(response, error);
        }
        return data.equipmentTypes ?? [];
    }

    private async getSlots(): Promise<Slot[]> {
        const { data, error, response } = await this.api.GET('/equipment/slot');
        if (!response.ok || !data) {
            throw new ApiResponseError(response, error);
        }
        return data.slots ?? [];
    }

    private async getEquipments(): Promise<Equipment[]> {
        const { data, error, response } = await this.api.GET('/equipment');
        if (!response.ok || !data) {
            throw new ApiResponseError(response, error);
        }
        return data.equipments ?? [];
    }
}
