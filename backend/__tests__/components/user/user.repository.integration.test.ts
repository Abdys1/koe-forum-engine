import { db, userRepositories } from '@test/utils/test-container';
import { saveTestUserToDb } from '@test/utils/test-data-generator';
import { describe, expect, it } from 'vitest';

describe('UserRepository', () => {
    const userRepository = userRepositories.get();

    describe('setActiveCharacter()', () => {
        it('should set the active character of the user', async () => {
            const user = await saveTestUserToDb();
            const characterId = await saveCharacterToDb(user.id);

            await userRepository.setActiveCharacter(user.id, characterId);

            expect(await userRepository.findProfileById(user.id))
                .toEqual({ id: user.id, username: user.username, activeCharacterId: characterId });
        });
    });

    describe('findProfileById()', () => {
        it('should return null when the user does not exist', async () => {
            expect(await userRepository.findProfileById(-1)).toBeNull();
        });

        it('should clear the active character when the character is deleted', async () => {
            const user = await saveTestUserToDb();
            const characterId = await saveCharacterToDb(user.id);
            await userRepository.setActiveCharacter(user.id, characterId);

            await db.character.delete({ where: { id: characterId } });

            expect((await userRepository.findProfileById(user.id))?.activeCharacterId).toBeNull();
        });
    });

    async function saveCharacterToDb(userId: number): Promise<number> {
        const character = await db.character.create({
            data: { userId, name: 'Aragorn', race: 'human', sex: 1, imageUrl: '/character.jpg' }
        });
        return character.id;
    }
});
