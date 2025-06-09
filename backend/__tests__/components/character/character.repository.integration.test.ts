import CharacterEntity from "@src/components/character/models/character";
import CharacterRepositoryImpl from "@src/components/character/repositories/character.repository";
import { CharacterRepository } from "@src/components/character/repositories/types";
import { Sex } from "@src/components/character/types";
import { db } from "@src/prisma-client";
import { createCharacterEntity } from "@test/components/character/character-test-helper";
import { saveTestUserToDb } from "@test/utils/test-data-generator";
import { describe } from "vitest";

async function saveCharactersToDb(user: { id: number, username: string }): Promise<CharacterEntity[]> {
    const entity: CharacterEntity = await db.character.create({
        data: {
            name: 'Legolas',
            sex: Sex.FEMALE,
            race: 'elf',
            imageUrl: '/legolas.jpg',
            helmet: 'cap',
            primaryWeapon: 'bow',
            secondaryWeapon: 'dagger',
            bodyArmor: 'leatherArmor',
            secondaryArmor: 'wrist',
            shield: 'wooden',
            user: { connect: { id: user.id } }
        }
    });
    return [entity];
}

describe('Character repository', () => {
    let characterDao: CharacterRepository;

    beforeEach(async () => {
        characterDao = new CharacterRepositoryImpl(db);

        const deleteCharacters = db.character.deleteMany();
        const deleteUsers = db.forumUser.deleteMany();

        await db.$transaction([deleteCharacters, deleteUsers]);
    });

    describe('findAllCharacterByUserId()', () => {
        it('should return an empty array when not exists user', async () => {
            expect(await characterDao.findAllCharacterByUserId(-1)).toStrictEqual([]);
        });

        it('should return an empty array when not exists characters for user', async () => {
            const newUser = await saveTestUserToDb();
            expect(await characterDao.findAllCharacterByUserId(newUser.id)).toStrictEqual([]);
        });

        it('should return characters for user', async () => {
            const user = await saveTestUserToDb();
            const characters = await saveCharactersToDb(user);
            expect(await characterDao.findAllCharacterByUserId(user.id)).toStrictEqual(characters);
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

    describe('create()', () => {
        it('should save character to db', async () => {
            const user = await saveTestUserToDb();
            const newCharacter = createCharacterEntity('test', user.id);

            expect(await db.character.count()).toBe(0);
            await characterDao.create(newCharacter);
            const character = await db.character.findFirstOrThrow({ where: { name: 'test' } });
            expect(character.name).toBe(newCharacter.name);
            expect(character.sex).toBe(newCharacter.sex);
            expect(character.race).toBe(newCharacter.race);
            expect(character.imageUrl).toBe(newCharacter.imageUrl);
            expect(character.primaryWeapon).toBe(newCharacter.primaryWeapon);
            expect(character.secondaryWeapon).toBe(newCharacter.secondaryWeapon);
            expect(character.bodyArmor).toBe(newCharacter.bodyArmor);
            expect(character.secondaryArmor).toBe(newCharacter.secondaryArmor);
            expect(character.shield).toBe(newCharacter.shield);
            expect(character.userId).toBe(user.id);
        });

        it('should throw error when user not exists', () => {
            const newCharacter = createCharacterEntity('test', -1);
            expect(characterDao.create(newCharacter)).rejects.toThrowError('An operation failed because it depends on one or more records that were required but not found.');
        });
    });
});