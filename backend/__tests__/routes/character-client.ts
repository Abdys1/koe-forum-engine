import { signToken } from '@src/components/auth/jwt-token-generator';
import TestAgent from "supertest/lib/agent";
import { Response } from "supertest"
import { CreateCharacterRequestDto } from '@src/components/character/types';
import config from '@src/config';

class CharacterClient {
    private static BASE_URL = '/api/characters';

    private request: TestAgent;

    constructor(request: TestAgent) {
        this.request = request;
    }

    public async createCharacter(username: string, createCharReqDto: CreateCharacterRequestDto): Promise<Response> {
        const token = await signToken({ username }, config.auth.secrets.accessToken, '10m');
        return this.request.post(`${CharacterClient.BASE_URL}`)
            .set({ 'Authorization': `Bearer ${token}`, 'Accept': 'application/json'})
            .send(createCharReqDto);
    }

    public async getCharacters(username: string): Promise<Response> {
        const token = await signToken({ username }, config.auth.secrets.accessToken, '10m');
        return this.request.get(`${CharacterClient.BASE_URL}`)
            .set({ 'Authorization': `Bearer ${token}`, 'Accept': 'application/json'})
            .send();
    }
}

export default CharacterClient;