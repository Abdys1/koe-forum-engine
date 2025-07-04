import { CharacterRegistrationRequestDto, Sex } from "@src/components/character/types";
import { ErrorMessages } from "@src/messages";
import CharacterClient from "@test/clients/character-client";
import { saveTestUserToDb } from "@test/utils/test-data-generator";
import { assertFieldError } from '@test/utils/validator-test-helper';
import { Response } from "supertest";
import { describe, it } from "vitest";

describe('/api/characters', () => {
    let characterClient: CharacterClient;

    beforeAll(async () => {
        characterClient = new CharacterClient();
    });

    describe('POST /', () => {
        it('when create a new character then should be in the user character list', async () => {
            const user = await saveTestUserToDb();
            const newCharacter = createCharacterRegistrationReq();

            const createResp = await characterClient.createCharacter(user.username, newCharacter);

            expect(createResp.status).toBe(200);
            await assertUserCharacterList(user.username, [newCharacter]);
        });

        it('when create a new character then should be only in user own character list', async () => {
            const user1 = await saveTestUserToDb();
            const user2 = await saveTestUserToDb();
            const newCharacter = createCharacterRegistrationReq();

            const createResp = await characterClient.createCharacter(user1.username, newCharacter);

            expect(createResp.status).toBe(200);
            await assertUserCharacterList(user1.username, [newCharacter]);
            await assertUserCharacterList(user2.username, []);
        });

        it('when create character without equipement then should save character without equipement', async () => {
            const user = await saveTestUserToDb();
            const newCharacter = createCharacterRegistrationReq();
            newCharacter.equipement = {
                helmet: null,
                primaryWeapon: null,
                secondaryWeapon: null,
                shield: null,
                bodyArmor: null,
                secondaryArmor: null
            };

            const createResp = await characterClient.createCharacter(user.username, newCharacter);

            expect(createResp.status).toBe(200);
            await assertUserCharacterList(user.username, [newCharacter]);
        });

        it('when character already exists then should not be added', async () => {
            const user = await saveTestUserToDb();
            const user2 = await saveTestUserToDb();
            const newCharacter = createCharacterRegistrationReq();

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

        it('when try create character without character name then should return character name required error', async () => {
            const character = createCharacterRegistrationReqWithName('');
            const resp = await createCharacterToRandomUser(character);
            assertFieldError(resp, 'name', [ErrorMessages.CHARACTER_NAME_INVALID_LENGTH]);
        });

        it('when try create character with too short character name then should return character name too short error', async () => {
            const character = createCharacterRegistrationReqWithName('as');
            const resp = await createCharacterToRandomUser(character);
            assertFieldError(resp, 'name', [ErrorMessages.CHARACTER_NAME_INVALID_LENGTH]);
        });

        it('when try create character with too long character name then should return character name too long error', async () => {
            const character = createCharacterRegistrationReqWithName('a'.repeat(65));
            const resp = await createCharacterToRandomUser(character);
            assertFieldError(resp, 'name', [ErrorMessages.CHARACTER_NAME_INVALID_LENGTH]);
        });

        it('when try create character with invalid character name then should return character name invalid error', async () => {
            const character = createCharacterRegistrationReqWithName('$Aragorn%');
            const resp = await createCharacterToRandomUser(character);
            assertFieldError(resp, 'name', [ErrorMessages.CHARACTER_NAME_INVALID_LETTERS]);
        });

        it('when try create character with invalid sex number then should return character sex invalid error', async () => {
            const character = createCharacterRegistrationReq();
            character.sex = 3;
            const resp = await createCharacterToRandomUser(character);
            assertFieldError(resp, 'sex', [ErrorMessages.CHARACTER_SEX_INVALID]);
        });

        it('when try create character with string sex then should return character sex invalid error', async () => {
            const character = createCharacterRegistrationReq();
            character.sex = 'INVALID_VALUE';
            const resp = await createCharacterToRandomUser(character);
            assertFieldError(resp, 'sex', [ErrorMessages.CHARACTER_SEX_INVALID]);
        });

        it('when try create character without sex then should return character sex sex invalid error', async () => {
            const character = createCharacterRegistrationReq();
            delete character.sex;
            const resp = await createCharacterToRandomUser(character);
            assertFieldError(resp, 'sex', [ErrorMessages.CHARACTER_SEX_INVALID]);
        });

        it('when try create character without race then should return character race required error', async () => {
            const character = createCharacterRegistrationReq();
            character.race = '';
            const resp = await createCharacterToRandomUser(character);
            assertFieldError(resp, 'race', [ErrorMessages.CHARACTER_RACE_REQUIRED]);
        });

        it('when try create character with not existent race then should return character race not exists error', async () => {
            // TODO: ha kész lesz a fajokat listázó végpont, akkor ezt a validációt is be kell kötni
            /*const character = createCharacterRegistrationReq();
            character.race = 'NOT_EXISTENT_RACE';
            const resp = await createCharacterToRandomUser(character);
            assertFieldError(resp, 'race', [ErrorMessages.CHARACTER_RACE_NOT_EXISTS]);*/
        });

        it('when try create character with non-existent equipement then should return equipement not exists error', async () => {
            // TODO: ha kész lesz a felszerelést listázó végpont, akkor ezt a validációt is be kell kötni, bár ez már inkább unit tesztelendő
            // Illetve talán az lenne a legjobb, ha a felszerelések id-ját mentenénk, nem csak a nevét
        });

        it('when try create character without image url then should return character image url required error', async () => {
            const character = createCharacterRegistrationReq();
            character.imageUrl = '';
            const resp = await createCharacterToRandomUser(character);
            assertFieldError(resp, 'imageUrl', [ErrorMessages.CHARACTER_IMAGE_URL_REQUIRED]);
        });
    });

    async function createCharacterToRandomUser(req: CharacterRegistrationRequestDto): Promise<Response> {
        const user = await saveTestUserToDb();
        return characterClient.createCharacter(user.username, req);
    }

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
            expect(character.equipement).toStrictEqual(expectedCharacter.equipement);
            expect(character.imageUrl).toBe(expectedCharacter.imageUrl);
        }
    }
});

function createCharacterRegistrationReq(): CharacterRegistrationRequestDto {
    return createCharacterRegistrationReqWithName('Aragorn a Kósza');
}

function createCharacterRegistrationReqWithName(characterName: string): CharacterRegistrationRequestDto {
    return {
        name: characterName,
        sex: Sex.MALE,
        race: 'human',
        equipement: {
            helmet: 'Helmet',
            primaryWeapon: 'Sword',
            secondaryWeapon: 'Longbow',
            shield: 'Shield',
            bodyArmor: 'Leather',
            secondaryArmor: 'Leather'
        },
        imageUrl: '/aragorn.jpg'
    };
}