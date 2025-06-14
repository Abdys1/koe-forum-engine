import { signToken } from '@src/components/auth/jwt-token-generator';
import { CharacterRegistrationRequestDto } from '@src/components/character/types';
import config from '@src/config';
import { Response } from "supertest"
import TestAgent from "supertest/lib/agent";

class CharacterClient {
    private static BASE_URL = '/api/characters';

    private request: TestAgent;

    constructor(request: TestAgent) {
        this.request = request;
    }

    public async createCharacter(username: string, createCharReqDto: CharacterRegistrationRequestDto): Promise<Response> {
        const token = await signToken({ username }, config.auth.secrets.accessToken, '10m');
        return this.request.post(`${CharacterClient.BASE_URL}`)
            .set({ 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' })
            .send(createCharReqDto);
    }

    public async getCharacters(username: string): Promise<Response> {
        const token = await signToken({ username }, config.auth.secrets.accessToken, '10m');
        return this.request.get(`${CharacterClient.BASE_URL}`)
            .set({ 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' })
            .send();
    }
}

export default CharacterClient;