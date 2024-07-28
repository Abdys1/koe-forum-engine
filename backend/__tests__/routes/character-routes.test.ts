import supertest, { Response } from "supertest";
import { describe, it } from "vitest";
import app from '@src/app';
import { UserModel } from "@src/components/user/user.model";
import { ForumUser } from "@src/components/user/types";
import { generatePassword, generateUsername } from "@test/utils/test-data-generator";
import CharacterClient from "@test/routes/character-client";
import { CreateCharacterRequestDto, Sex } from "@src/components/character/types";
import { CharacterModel } from "@src/components/character/character.model";

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

async function saveTestUser(): Promise<ForumUser> {
    return await UserModel.create({ username: generateUsername(), password: generatePassword() });
}

describe('Character api', () => {
    let characterClient: CharacterClient;

    beforeAll(async () => {
        characterClient = new CharacterClient(supertest(app));
    });

    beforeEach(async () => {
        await UserModel.deleteMany({});
        await CharacterModel.deleteMany({});
    });

    it('when create a new character then should be in the user character list', async () => {
        const user = await saveTestUser();
        const newCharacter = createCharacterDto();

        const createResp = await characterClient.createCharacter(user.username, newCharacter);

        expect(createResp.status).toBe(200);

        const charListResp = await characterClient.getCharacters(user.username);

        assertCharacterList(charListResp, [newCharacter]);
    });

    it('when create a new character then should be only in user own character list', async () => {
        const user1 = await saveTestUser();
        const user2 = await saveTestUser();
        const newCharacter = createCharacterDto();

        const createResp = await characterClient.createCharacter(user1.username, newCharacter);

        expect(createResp.status).toBe(200);

        const user1CharResp = await characterClient.getCharacters(user1.username);

        assertCharacterList(user1CharResp, [newCharacter]);

        const user2CharResp = await characterClient.getCharacters(user2.username);

        assertCharacterList(user2CharResp, []);
    });
});