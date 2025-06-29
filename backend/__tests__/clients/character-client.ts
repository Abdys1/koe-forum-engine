import { CharacterRegistrationRequestDto } from '@src/components/character/types';
import BaseClient from '@test/clients/base-client';
import { Response } from "supertest"

class CharacterClient extends BaseClient {
    private static BASE_URL = '/api/characters';

    public async createCharacter(username: string, createCharReqDto: CharacterRegistrationRequestDto): Promise<Response> {
        return this.request.post(`${CharacterClient.BASE_URL}`)
            .set(await this.getAuthorizationHeader({ username }))
            .send(createCharReqDto);
    }

    public async getCharacters(username: string): Promise<Response> {
        return this.request.get(`${CharacterClient.BASE_URL}`).set(await this.getAuthorizationHeader({ username }));
    }
}

export default CharacterClient;