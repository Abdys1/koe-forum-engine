import BaseClient from "@test/clients/base-client";
import { Response } from "supertest";

export interface EquipmentWriteRequestBody {
    name?: string;
    typeId?: number | string | null;
    description?: string;
}

export default class EquipmentClient extends BaseClient {
    public static BASE_URL = '/api/equipment';

    public getAllEquipment = async (): Promise<Response> => {
        return this.request.get(EquipmentClient.BASE_URL)
            .set(await this.getAuthorizationHeaderForRandomUser());
    }

    public createEquipment = async (body: EquipmentWriteRequestBody): Promise<Response> => {
        return this.request.post(EquipmentClient.BASE_URL)
            .set(await this.getAuthorizationHeaderForRandomUser())
            .send(body);
    }

    public updateEquipment = async (id: number, body: EquipmentWriteRequestBody): Promise<Response> => {
        return this.request.put(`${EquipmentClient.BASE_URL}/${id}`)
            .set(await this.getAuthorizationHeaderForRandomUser())
            .send(body);
    }

    public deleteEquipment = async (id: number): Promise<Response> => {
        return this.request.delete(`${EquipmentClient.BASE_URL}/${id}`)
            .set(await this.getAuthorizationHeaderForRandomUser());
    }
}
