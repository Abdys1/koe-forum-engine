import { CharacterClient, CreateCharacterRequest } from "@/lib/api/character/types";
import { ApiClient } from "@/lib/api/client/api-client";
import { ApiResponseError } from "@/lib/api/client/api-response.error";
import { toFormData } from "@/lib/api/client/form-data";

export default class CharacterClientImpl implements CharacterClient {
    private api: ApiClient;

    constructor(api: ApiClient) {
        this.api = api;
    }

    public async create({ equipmentIds, ...reqData }: CreateCharacterRequest): Promise<void> {
        const { error, response } = await this.api.POST('/characters', {
            body: { ...reqData, 'equipmentIds[]': equipmentIds },
            bodySerializer: toFormData
        });
        if (!response.ok) {
            throw new ApiResponseError(response, error);
        }
    }
}
