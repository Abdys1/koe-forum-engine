import { Character, CharacterDao, CharacterEntity, Sex } from "@src/components/character/types";
import { describe } from "vitest";
import { fromEntity } from "@src/components/character/character.mapper";
import { saveTestUserToDb } from "@test/utils/test-data-generator";
import CharacterDaoImpl from "@src/components/character/character.dao";
import { db } from "@src/prisma-client";

async function saveCharactersToDb(user: { id: number, username: string }): Promise<Character[]> {
    const entity: CharacterEntity = await db.character.create({
        data: {
            name: 'Legolas',
            sex: Sex.FEMALE,
            race: 'elf',
            imageUrl: '/legolas.jpg',
            user: { connect: { id: user.id } }
        }
    });
    return [fromEntity(user.username, entity)];
}

describe('Character dao', () => {
    let characterDao: CharacterDao;

    beforeEach(() => {
        characterDao = new CharacterDaoImpl(db);
    });

    afterEach(async () => {
        await db.character.deleteMany({});
        await db.forumUser.deleteMany({});
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

            expect(await db.character.count()).toBe(0);
            await characterDao.save(expected);
            const character = await db.character.findFirstOrThrow({ where: { name: 'test' } });
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

            expect(characterDao.save(expected)).rejects.toThrowError('An operation failed because it depends on one or more records that were required but not found.');
        })
    });
});