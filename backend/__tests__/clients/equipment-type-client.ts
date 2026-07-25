import BaseClient from "@test/clients/base-client";
import { Response } from "supertest";

export interface EquipmentTypeWriteRequestBody {
    label?: string | null;
}

export default class EquipmentTypeClient extends BaseClient {
    public static BASE_URL = '/api/equipment/type';

    public getAllEquipmentTypes = async (): Promise<Response> => {
        return this.request.get(EquipmentTypeClient.BASE_URL)
            .set(await this.getAuthorizationHeaderForRandomUser());
    }

    public createEquipmentType = async (body: EquipmentTypeWriteRequestBody): Promise<Response> => {
        return this.request.post(EquipmentTypeClient.BASE_URL)
            .set(await this.getAuthorizationHeaderForRandomUser())
            .send(body);
    }

    public updateEquipmentType = async (id: number, body: EquipmentTypeWriteRequestBody): Promise<Response> => {
        return this.request.put(`${EquipmentTypeClient.BASE_URL}/${id}`)
            .set(await this.getAuthorizationHeaderForRandomUser())
            .send(body);
    }

    public deleteEquipmentType = async (id: number): Promise<Response> => {
        return this.request.delete(`${EquipmentTypeClient.BASE_URL}/${id}`)
            .set(await this.getAuthorizationHeaderForRandomUser());
    }
}
