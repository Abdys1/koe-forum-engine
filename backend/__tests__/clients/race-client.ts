import BaseClient from "@test/clients/base-client";
import { Response } from "supertest";

export default class RaceClient extends BaseClient {
    public static BASE_URL = '/api/races';

    public getAllRaces = async (): Promise<Response> => {
        return this.request.get(RaceClient.BASE_URL)
            .set(await this.getAuthorizationHeaderForRandomUser());
    }
}
