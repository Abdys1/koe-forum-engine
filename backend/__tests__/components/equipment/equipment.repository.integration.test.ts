import { equipmentRepositories } from '@src/components/equipment/repositories';
import { db } from '@src/prisma-client';
import { saveEquipmentListToDb, saveTestUserToDb } from '@test/utils/test-data-generator';
import { describe, expect, it } from 'vitest';

describe('EquipmentRepository', () => {
    const equipmentRepository = equipmentRepositories.get();

    describe('replaceAllByCharacterId()', () => {
        it('should replace every assignment of the character', async () => {
            const characterId = await saveCharacterToDb();
            const [potion, ring, sword] = await saveEquipmentListToDb(3);
            await equipmentRepository.replaceAllByCharacterId(characterId, [potion.id, ring.id]);

            await equipmentRepository.replaceAllByCharacterId(characterId, [sword.id, sword.id]);

            const equipment = await equipmentRepository.findAllByCharacterId(characterId);
            expect(equipment.map((item) => item.id)).toStrictEqual([sword.id, sword.id]);
        });

        it('should keep the previous assignments when inserting the new ones fails', async () => {
            const characterId = await saveCharacterToDb();
            const [potion] = await saveEquipmentListToDb(1);
            await equipmentRepository.replaceAllByCharacterId(characterId, [potion.id]);

            await expect(equipmentRepository.replaceAllByCharacterId(characterId, [-1])).rejects.toThrow();

            const equipment = await equipmentRepository.findAllByCharacterId(characterId);
            expect(equipment.map((item) => item.id)).toStrictEqual([potion.id]);
        });
    });

    async function saveCharacterToDb(): Promise<number> {
        const user = await saveTestUserToDb();
        const character = await db.character.create({
            data: { userId: user.id, name: 'Aragorn a Kósza', race: 'human', sex: 1, imageUrl: '/aragorn.jpg' }
        });
        return character.id;
    }
});
