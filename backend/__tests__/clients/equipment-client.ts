import BaseClient from "@test/clients/base-client";
import { saveTestUserToDb } from "@test/utils/test-data-generator";

export default class EquipmentClient extends BaseClient {
    public static BASE_URL = '/api/equipment';

    public getAllEquipment = async () => {
        const { username } = await saveTestUserToDb();
        return this.request.get(EquipmentClient.BASE_URL)
            .set(await this.getAuthorizationHeader({ username }));
    }
}