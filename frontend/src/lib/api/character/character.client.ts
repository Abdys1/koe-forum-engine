import { CharacterClient, CharacterDetails, CreateCharacterRequest } from "@/lib/api/character/types";
import { ApiClient } from "@/lib/api/client/api-client";
import { ApiResponseError } from "@/lib/api/client/api-response.error";
import { toFormData } from "@/lib/api/client/form-data";
import { Equipment } from "@/lib/api/equipment/types";

export default class CharacterClientImpl implements CharacterClient {
    private api: ApiClient;

    constructor(api: ApiClient) {
        this.api = api;
    }

    public async create({ equipmentIds, ...reqData }: CreateCharacterRequest): Promise<CharacterDetails> {
        const { data, error, response } = await this.api.POST('/characters', {
            body: { ...reqData, 'equipmentIds[]': equipmentIds },
            bodySerializer: toFormData
        });
        if (!response.ok || !data) {
            throw new ApiResponseError(response, error);
        }
        return { ...data, imageUrl: new URL(data.imageUrl, response.url).href };
    }

    public async validateName(name: string): Promise<void> {
        const { error, response } = await this.api.POST('/characters/validate-name', {
            body: { name }
        });
        if (!response.ok) {
            throw new ApiResponseError(response, error);
        }
    }

    public async getById(id: number): Promise<CharacterDetails | null> {
        const { data, error, response } = await this.api.GET('/characters/{id}', {
            params: { path: { id } }
        });
        if (response.status === 404) {
            return null;
        }
        if (!response.ok || !data) {
            throw new ApiResponseError(response, error);
        }
        return { ...data, imageUrl: new URL(data.imageUrl, response.url).href };
    }

    public async getOwnCharacters(): Promise<CharacterDetails[]> {
        const { data, error, response } = await this.api.GET('/characters');
        if (!response.ok || !data) {
            throw new ApiResponseError(response, error);
        }
        return data.map(character => ({ ...character, imageUrl: new URL(character.imageUrl, response.url).href }));
    }

    public async getEquipment(id: number): Promise<Equipment[]> {
        const { data, error, response } = await this.api.GET('/characters/{id}/equipment', {
            params: { path: { id } }
        });
        if (!response.ok || !data) {
            throw new ApiResponseError(response, error);
        }
        return data;
    }
}
