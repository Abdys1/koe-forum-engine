import { CharacterRegistrationRequestDto } from '@src/components/character/types';
import BaseClient from '@test/clients/base-client';
import { Response } from "supertest"

export interface TestImage {
    buffer: Buffer,
    filename: string,
    contentType: string
}

export const testImage = (overrides: Partial<TestImage> = {}): TestImage => ({
    buffer: Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    filename: 'aragorn.png',
    contentType: 'image/png',
    ...overrides
});

class CharacterClient extends BaseClient {
    private static BASE_URL = '/api/characters';

    public async createCharacter(username: string, createCharReqDto: CharacterRegistrationRequestDto, image: TestImage | null = testImage()): Promise<Response> {
        const req = this.request.post(CharacterClient.BASE_URL)
            .set(await this.getAuthorizationHeader({ username }));
        Object.entries(createCharReqDto).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach(item => req.field(`${key}[]`, String(item)));
            } else if (value !== undefined) {
                req.field(key, String(value));
            }
        });
        if (image) {
            req.attach('image', image.buffer, { filename: image.filename, contentType: image.contentType });
        }
        return req;
    }

    public async getCharacters(username: string): Promise<Response> {
        return this.request.get(CharacterClient.BASE_URL).set(await this.getAuthorizationHeader({ username }));
    }

    public async getCharacterEquipment(username: string, characterId: number | string): Promise<Response> {
        return this.request.get(`${CharacterClient.BASE_URL}/${characterId}/equipment`).set(await this.getAuthorizationHeader({ username }));
    }

    public async setCharacterEquipment(username: string, characterId: number | string, equipmentIds: unknown): Promise<Response> {
        return this.request.put(`${CharacterClient.BASE_URL}/${characterId}/equipment`)
            .set(await this.getAuthorizationHeader({ username }))
            .send({ equipmentIds });
    }
}

export default CharacterClient;
