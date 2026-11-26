import { ApiClient } from "@/lib/api/client/api-client";
import { ApiResponseError } from "@/lib/api/client/api-response.error";
import { Equipment, EquipmentClient, EquipmentType } from "@/lib/api/equipment/types";

export default class EquipmentClientImpl implements EquipmentClient {
    private api: ApiClient;

    constructor(api: ApiClient) {
        this.api = api;
    }

    public async getEquipmentTypes(): Promise<EquipmentType[]> {
        const { data, error, response } = await this.api.GET('/equipment/type');
        if (!response.ok || !data) {
            throw new ApiResponseError(response, error);
        }
        return data.equipmentTypes ?? [];
    }

    public async getEquipment(): Promise<Equipment[]> {
        const { data, error, response } = await this.api.GET('/equipment');
        if (!response.ok || !data) {
            throw new ApiResponseError(response, error);
        }
        return data.equipments ?? [];
    }
}
