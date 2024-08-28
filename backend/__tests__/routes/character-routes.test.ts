import supertest, { Response } from "supertest";
import { describe, it } from "vitest";
import app from '@src/app';
import { UserModel } from "@src/components/user/user.model";
import { saveTestUserToDb } from "@test/utils/test-data-generator";
import CharacterClient from "@test/routes/character-client";
import { CreateCharacterRequestDto, Sex } from "@src/components/character/types";
import { CharacterModel } from "@src/components/character/character.model";
import logger from "@src/components/logger/logger";

function createCharacterDto(): CreateCharacterRequestDto {
    return {
        name: 'Aragorn',
        sex: Sex.MALE,
        race: 'human',
        imageUrl: '/aragorn.jpg'
    };
}

function assertCharacterList(resp: Response, expectedCharacters: CreateCharacterRequestDto[]): void {
    expect(resp.status).toBe(200);
    expect(resp.body).toBeInstanceOf(Array);
    expect(resp.body).toStrictEqual(expectedCharacters);
}

describe('/api/characters', () => {
    let characterClient: CharacterClient;

    beforeAll(async () => {
        characterClient = new CharacterClient(supertest(app));
    });

    describe('POST /', () => {
        beforeEach(async () => {
            await UserModel.deleteMany({});
            await CharacterModel.deleteMany({});
        });

        it('when create a new character then should be in the user character list', async () => {
            const user = await saveTestUserToDb();
            const newCharacter = createCharacterDto();

            const createResp = await characterClient.createCharacter(user.username, newCharacter);

            expect(createResp.status).toBe(200);

            const charListResp = await characterClient.getCharacters(user.username);

            assertCharacterList(charListResp, [newCharacter]);
        });

        it('when create a new character then should be only in user own character list', async () => {
            const user1 = await saveTestUserToDb();
            const user2 = await saveTestUserToDb();
            const newCharacter = createCharacterDto();

            const createResp = await characterClient.createCharacter(user1.username, newCharacter);

            expect(createResp.status).toBe(200);

            const user1CharResp = await characterClient.getCharacters(user1.username);
            logger.error(user1CharResp);

            assertCharacterList(user1CharResp, [newCharacter]);

            const user2CharResp = await characterClient.getCharacters(user2.username);

            assertCharacterList(user2CharResp, []);
        });

        it('when character already exists then should not be added', async () => {
            const user = await saveTestUserToDb();
            const newCharacter = createCharacterDto();

            await characterClient.createCharacter(user.username, newCharacter);
            const createResp = await characterClient.createCharacter(user.username, newCharacter);

            expect(createResp.status).toBe(409);
            expect(createResp.body).toStrictEqual({ errorCode: 'CHARACTER_ALREADY_EXISTS' });
        });
    });
});