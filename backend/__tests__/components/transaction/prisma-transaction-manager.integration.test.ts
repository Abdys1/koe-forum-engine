import Character from '@src/components/character/models/character';
import { NestedTransactionError, rollback } from '@src/components/transaction/types';
import { characterRepositories, db, equipmentRepositories, transactionManager } from '@test/utils/test-container';
import { saveEquipmentToDb, saveTestUserToDb } from '@test/utils/test-data-generator';
import { describe, expect, it } from 'vitest';

describe('PrismaTransactionManager', () => {
    describe('execute()', () => {
        it('should commit the changes and return the result of the work', async () => {
            const user = await saveTestUserToDb();

            const created = await transactionManager.execute((context) =>
                characterRepositories.inTransaction(context).create(characterOf(user.id))
            );

            expect(created.id).toBeDefined();
            expect(await db.character.count({ where: { id: created.id } })).toBe(1);
        });

        it('should roll back every change when the work throws', async () => {
            const user = await saveTestUserToDb();
            const potion = await saveEquipmentToDb();

            await expect(transactionManager.execute(async (context) => {
                const character = await characterRepositories.inTransaction(context).create(characterOf(user.id));
                await equipmentRepositories.inTransaction(context).replaceAllByCharacterId(character.id!, [potion.id]);
                throw new Error('Szándékos hiba');
            })).rejects.toThrowError('Szándékos hiba');

            expect(await db.character.count({ where: { userId: user.id } })).toBe(0);
            expect(await db.characterEquipment.count({ where: { equipmentId: potion.id } })).toBe(0);
        });

        it('should roll back the character when the equipment assignment fails', async () => {
            const user = await saveTestUserToDb();

            await expect(transactionManager.execute(async (context) => {
                const character = await characterRepositories.inTransaction(context).create(characterOf(user.id));
                await equipmentRepositories.inTransaction(context).replaceAllByCharacterId(character.id!, [-1]);
            })).rejects.toThrow();

            expect(await db.character.count({ where: { userId: user.id } })).toBe(0);
        });

        it('should roll back every change and return the rollback result when the work asks for a rollback', async () => {
            const user = await saveTestUserToDb();
            const potion = await saveEquipmentToDb();

            const result = await transactionManager.execute(async (context) => {
                const character = await characterRepositories.inTransaction(context).create(characterOf(user.id));
                await equipmentRepositories.inTransaction(context).replaceAllByCharacterId(character.id!, [potion.id]);
                return rollback('ROLLED_BACK');
            });

            expect(result).toBe('ROLLED_BACK');
            expect(await db.character.count({ where: { userId: user.id } })).toBe(0);
            expect(await db.characterEquipment.count({ where: { equipmentId: potion.id } })).toBe(0);
        });

        it('should commit when the work decides not to roll back', async () => {
            const user = await saveTestUserToDb();
            const shouldRollBack = (): boolean => false;

            const result = await transactionManager.execute(async (context) => {
                await characterRepositories.inTransaction(context).create(characterOf(user.id));
                return shouldRollBack() ? rollback('ROLLED_BACK') : 'COMMITTED';
            });

            expect(result).toBe('COMMITTED');
            expect(await db.character.count({ where: { userId: user.id } })).toBe(1);
        });

        it('should return the same repository instance for the same provider within a transaction', async () => {
            await transactionManager.execute(async (context) => {
                expect(characterRepositories.inTransaction(context)).toBe(characterRepositories.inTransaction(context));
            });
        });

        it('should reject a transaction started inside another transaction', async () => {
            await expect(transactionManager.execute(async () => {
                await transactionManager.execute(async () => 'INNER');
            })).rejects.toThrowError(NestedTransactionError);
        });

        it('should roll back the outer transaction when a nested transaction is attempted', async () => {
            const user = await saveTestUserToDb();

            await expect(transactionManager.execute(async (context) => {
                await characterRepositories.inTransaction(context).create(characterOf(user.id));
                await transactionManager.execute(async () => 'INNER');
            })).rejects.toThrowError(NestedTransactionError);

            expect(await db.character.count({ where: { userId: user.id } })).toBe(0);
        });

        it('should allow a new transaction after the previous one has finished', async () => {
            const user = await saveTestUserToDb();
            await transactionManager.execute(async () => 'FIRST');

            const created = await transactionManager.execute((context) =>
                characterRepositories.inTransaction(context).create(characterOf(user.id))
            );

            expect(await db.character.count({ where: { id: created.id } })).toBe(1);
        });

        it('should allow independent transactions to run in parallel', async () => {
            const [first, second] = await Promise.all([
                transactionManager.execute(async () => 'FIRST'),
                transactionManager.execute(async () => 'SECOND')
            ]);

            expect([first, second]).toStrictEqual(['FIRST', 'SECOND']);
        });
    });

    function characterOf(userId: number): Character {
        return { userId, name: 'Aragorn a Kósza', race: 'human', sex: 1, imageUrl: '/aragorn.jpg' };
    }
});
