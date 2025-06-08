import { Sex } from "@src/components/character/types";
import { describe } from "vitest";
import { saveTestUserToDb } from "@test/utils/test-data-generator";
import { db } from "@src/prisma-client";
import { CharacterRepository } from "@src/components/character/repositories/types";
import CharacterEntity from "@src/components/character/models/character";
import CharacterRepositoryImpl from "@src/components/character/repositories/character.repository";

async function saveCharactersToDb(user: { id: number, username: string }): Promise<CharacterEntity[]> {
    const entity: CharacterEntity = await db.character.create({
        data: {
            name: 'Legolas',
            sex: Sex.FEMALE,
            race: 'elf',
            imageUrl: '/legolas.jpg',
            user: { connect: { id: user.id } }
        }
    });
    return [entity];
}

describe('Character dao', () => {
    let characterDao: CharacterRepository;

    beforeEach(async () => {
        characterDao = new CharacterRepositoryImpl(db);

        const deleteCharacters = db.character.deleteMany();
        const deleteUsers = db.forumUser.deleteMany();

        await db.$transaction([deleteCharacters, deleteUsers]);
    });

    describe('findAllCharacterByUsername()', () => {
        it('should return an empty array when not exists user', async () => {
            expect(await characterDao.findAllCharacterByUsername('not-exists')).toStrictEqual([]);
        });

        it('should return an empty array when not exists characters for user', async () => {
            const newUser = await saveTestUserToDb();
            expect(await characterDao.findAllCharacterByUsername(newUser.username)).toStrictEqual([]);
        });

        it('should return characters for user', async () => {
            const user = await saveTestUserToDb();
            const characters = await saveCharactersToDb(user);
            expect(await characterDao.findAllCharacterByUsername(user.username)).toStrictEqual(characters);
        });
    });

    describe('existByCharacterName()', () => {
        it('should return false when not exists character', async () => {
            expect(await characterDao.existsByCharacterName('not-exists')).toBe(false);
        });

        it('should return true when exists character', async () => {
            const user = await saveTestUserToDb();
            const characters = await saveCharactersToDb(user);
            expect(await characterDao.existsByCharacterName(characters[0].name)).toBe(true);
        });
    });

    describe('save()', () => {
        it('should save character to db', async () => {
            const user = await saveTestUserToDb();
            const newCharacter = {
                name: 'test',
                sex: Sex.MALE,
                race: 'human',
                imageUrl: 'test',
                userId: user.id
            };

            expect(await db.character.count()).toBe(0);
            await characterDao.save(newCharacter);
            const character = await db.character.findFirstOrThrow({ where: { name: 'test' } });
            expect(character.name).toBe(newCharacter.name);
            expect(character.sex).toBe(newCharacter.sex);
            expect(character.race).toBe(newCharacter.race);
            expect(character.imageUrl).toBe(newCharacter.imageUrl);
            expect(character.userId).toBe(user.id);
        });

        it('should throw error when user not exists', () => {
            const newCharacter = {
                name: 'test',
                sex: Sex.MALE,
                race: 'human',
                imageUrl: 'test',
                userId: -1
            }

            expect(characterDao.save(newCharacter)).rejects.toThrowError('An operation failed because it depends on one or more records that were required but not found.');
        })
    });
});