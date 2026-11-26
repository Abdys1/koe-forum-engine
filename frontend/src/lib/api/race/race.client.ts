import { ApiClient } from "@/lib/api/client/api-client";
import { ApiResponseError } from "@/lib/api/client/api-response.error";
import { Race, RaceClient } from "@/lib/api/race/types";

export default class RaceClientImpl implements RaceClient {
    private api: ApiClient;

    constructor(api: ApiClient) {
        this.api = api;
    }

    public async getRaces(): Promise<Race[]> {
        const { data, error, response } = await this.api.GET('/races');
        if (!response.ok || !data) {
            throw new ApiResponseError(response, error);
        }
        return data.races;
    }
}
