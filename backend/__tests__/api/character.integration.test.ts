import supertest from "supertest";
import { describe, it } from "vitest";
import app from '@src/app';
import { saveTestUserToDb } from "@test/utils/test-data-generator";
import CharacterClient from "@test/api/utils/character-client";
import { CharacterRegistrationRequestDto, Sex } from "@src/components/character/types";
import { db } from "@src/prisma-client";

function createCharacterDto(): CharacterRegistrationRequestDto {
    return {
        name: 'Aragorn',
        sex: Sex.MALE,
        race: 'human',
        imageUrl: '/aragorn.jpg'
    };
}

describe('/api/characters', () => {
    let characterClient: CharacterClient;

    async function assertUserCharacterList(username: string, expectedCharacters: CharacterRegistrationRequestDto[]): Promise<void> {
        const resp = await characterClient.getCharacters(username);
        expect(resp.status).toBe(200);
        expect(resp.body).toBeInstanceOf(Array);
        expect(resp.body.length).toBe(expectedCharacters.length);
        for (let i = 0; i < expectedCharacters.length; i++) {
            const character = resp.body[i];
            const expectedCharacter = expectedCharacters[i];
            expect(character.id).toBeDefined();
            expect(character.name).toBe(expectedCharacter.name);
            expect(character.sex).toBe(expectedCharacter.sex);
            expect(character.race).toBe(expectedCharacter.race);
            expect(character.imageUrl).toBe(expectedCharacter.imageUrl);
        }
    }

    beforeAll(async () => {
        characterClient = new CharacterClient(supertest(app));
    });

    describe('POST /', () => {
        beforeEach(async () => {
            const deleteCharacters = db.character.deleteMany();
            const deleteUsers = db.forumUser.deleteMany();

            await db.$transaction([deleteCharacters, deleteUsers]);
        });

        it('when create a new character then should be in the user character list', async () => {
            const user = await saveTestUserToDb();
            const newCharacter = createCharacterDto();

            const createResp = await characterClient.createCharacter(user.username, newCharacter);

            expect(createResp.status).toBe(200);
            await assertUserCharacterList(user.username, [newCharacter]);
        });

        it('when create a new character then should be only in user own character list', async () => {
            const user1 = await saveTestUserToDb();
            const user2 = await saveTestUserToDb();
            const newCharacter = createCharacterDto();

            const createResp = await characterClient.createCharacter(user1.username, newCharacter);

            expect(createResp.status).toBe(200);
            await assertUserCharacterList(user1.username, [newCharacter]);
            await assertUserCharacterList(user2.username, []);
        });

        it('when character already exists then should not be added', async () => {
            const user = await saveTestUserToDb();
            const user2 = await saveTestUserToDb();
            const newCharacter = createCharacterDto();

            await characterClient.createCharacter(user.username, newCharacter);

            const createResp = await characterClient.createCharacter(user.username, newCharacter);
            expect(createResp.status).toBe(409);
            expect(createResp.body).toStrictEqual({ errorCode: 'CHARACTER_ALREADY_EXISTS' });
            await assertUserCharacterList(user.username, [newCharacter]);

            const anotherUserCreateResp = await characterClient.createCharacter(user2.username, newCharacter);
            expect(anotherUserCreateResp.status).toBe(409);
            expect(anotherUserCreateResp.body).toStrictEqual({ errorCode: 'CHARACTER_ALREADY_EXISTS' });
            await assertUserCharacterList(user2.username, []);
        });
    });
});