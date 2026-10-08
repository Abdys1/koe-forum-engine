import BaseClient from "@test/clients/base-client";
import { Response } from "supertest";

export interface SlotCreateRequestBody {
    label?: string | null;
    maxCapacity?: number | string | null;
}

export default class SlotClient extends BaseClient {
    public static BASE_URL = '/api/equipment/slot';

    public getAllSlots = async (): Promise<Response> => {
        return this.request.get(SlotClient.BASE_URL)
            .set(await this.getAuthorizationHeaderForRandomUser());
    }

    public createSlot = async (body: SlotCreateRequestBody): Promise<Response> => {
        return this.request.post(SlotClient.BASE_URL)
            .set(await this.getAuthorizationHeaderForRandomUser())
            .send(body);
    }

    public deleteSlot = async (id: number): Promise<Response> => {
        return this.request.delete(`${SlotClient.BASE_URL}/${id}`)
            .set(await this.getAuthorizationHeaderForRandomUser());
    }
}
