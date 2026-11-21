import { ApiClient } from "@/lib/api/client/api-client";
import { ApiResponseError } from "@/lib/api/client/api-response.error";
import { UserClient } from "@/lib/api/user/types";

export default class UserClientImpl implements UserClient {
    private api: ApiClient;

    constructor(api: ApiClient) {
        this.api = api;
    }

    public async setActiveCharacter(characterId: number): Promise<void> {
        const { error, response } = await this.api.PUT('/users/me/active-character', {
            body: { characterId }
        });
        if (!response.ok) {
            throw new ApiResponseError(response, error);
        }
    }
}
