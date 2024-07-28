import { Character, CharacterDao, CharacterEntity, Sex } from "@src/components/character/types";
import { CharacterModel } from "@src/components/character/character.model";
import { UserModel } from "@src/components/user/user.model";
import { describe } from "vitest";
import { UserEntity } from "@src/components/user/types";
import { fromEntity } from "@src/components/character/character.mapper";
import { saveTestUserToDb } from "@test/utils/test-data-generator";
import CharacterDaoImpl from "@src/components/character/character.dao";
import UserNotFoundError from "@src/components/user/user-not-found.error";

async function saveCharactersToDb(user: UserEntity): Promise<Character[]> {
    const entities: CharacterEntity[] = [
        {
            name: 'Legolas',
            sex: Sex.FEMALE,
            race: 'elf',
            imageUrl: '/legolas.jpg',
            userRef: user._id
        }
    ];
    await CharacterModel.create(entities);
    return entities.map(entity => fromEntity(user.username, entity));
}

describe('Character dao', () => {
    let characterDao: CharacterDao;

    beforeEach(async () => {
        characterDao = new CharacterDaoImpl();
        await UserModel.deleteMany({});
        await CharacterModel.deleteMany({});
    });

    describe('findAllCharacterByUsername()', () => {
        it('should return an empty array when not exists user', () => {
            expect(characterDao.findAllCharacterByUsername('not-exists')).resolves.toStrictEqual([]);
        });

        it('should return an empty array when not exists characters for user', async () => {
            const newUser = await saveTestUserToDb();
            expect(characterDao.findAllCharacterByUsername(newUser.username)).resolves.toStrictEqual([]);
        });

        it('should return characters for user', async () => {
            const user = await saveTestUserToDb();
            const characters = await saveCharactersToDb(user);
            expect(characterDao.findAllCharacterByUsername(user.username)).resolves.toStrictEqual(characters);
        });
    });


    describe('existByCharacterName()', () => {
        it('should return false when not exists character', () => {
            expect(characterDao.existsByCharacterName('not-exists')).resolves.toBe(false);
        });

        it('should return true when exists character', async () => {
            const user = await saveTestUserToDb();
            const characters = await saveCharactersToDb(user);
            expect(characterDao.existsByCharacterName(characters[0].name)).resolves.toBe(true);
        });
    });

    describe('save()', () => {
        it('should save character to db', async () => {
            const user = await saveTestUserToDb();
            const expected: Character = {
                name: 'test',
                sex: Sex.MALE,
                race: 'human',
                imageUrl: 'test',
                owner: user.username
            }

            expect(await CharacterModel.countDocuments()).toBe(0);
            await characterDao.save(expected);
            const character = await CharacterModel.findOne({ name: 'test' });
            assert(!!character);
            expect(fromEntity(user.username, character)).toStrictEqual(expected);
        });

        it('should throw error when user not exists', () => {
            const expected: Character = {
                name: 'test',
                sex: Sex.MALE,
                race: 'human',
                imageUrl: 'test',
                owner: 'not-exists'
            }

            expect(characterDao.save(expected)).rejects.toThrowError(
                new UserNotFoundError('User with username ' + expected.owner + ' not found!')
            );
        })
    });
});