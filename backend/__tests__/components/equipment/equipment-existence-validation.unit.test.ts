import EquipmentExistenceValidationImpl from '@src/components/equipment/usecases/validation/equipment-existence-validation';
import { EquipmentExistenceValidation } from '@src/components/equipment/usecases/validation/types';
import { EquipmentRepository } from '@src/components/equipment/repositories/types';
import { beforeEach, describe, expect, it, vi, Mocked } from 'vitest';

describe('EquipmentExistenceValidation', () => {
    let equipmentRepository: Mocked<EquipmentRepository>;
    let equipmentExistenceValidation: EquipmentExistenceValidation;

    beforeEach(() => {
        equipmentRepository = {
            findAll: vi.fn(),
            findAllByIds: vi.fn(),
            create: vi.fn(),
        };
        equipmentExistenceValidation = new EquipmentExistenceValidationImpl(equipmentRepository);
    });

    describe('execute()', () => {
        it('should return true when all ids exist', async () => {
            equipmentRepository.findAllByIds.mockResolvedValue([
                { id: 1, name: 'Sword', type: 'PRIMARY_WEAPON' as any, description: '' },
                { id: 2, name: 'Shield', type: 'SHIELD' as any, description: '' },
            ]);

            const result = await equipmentExistenceValidation.execute([1, 2]);

            expect(result).toBe(true);
        });

        it('should return false when some ids do not exist', async () => {
            equipmentRepository.findAllByIds.mockResolvedValue([
                { id: 1, name: 'Sword', type: 'PRIMARY_WEAPON' as any, description: '' },
            ]);

            const result = await equipmentExistenceValidation.execute([1, 99]);

            expect(result).toBe(false);
        });

        it('should return false when no ids exist', async () => {
            equipmentRepository.findAllByIds.mockResolvedValue([]);

            const result = await equipmentExistenceValidation.execute([99, 100]);

            expect(result).toBe(false);
        });

        it('should return true when ids list is empty', async () => {
            equipmentRepository.findAllByIds.mockResolvedValue([]);

            const result = await equipmentExistenceValidation.execute([]);

            expect(result).toBe(true);
        });

        it('should call repository with the provided ids', async () => {
            equipmentRepository.findAllByIds.mockResolvedValue([]);
            const ids = [1, 2, 3];

            await equipmentExistenceValidation.execute(ids);

            expect(equipmentRepository.findAllByIds).toHaveBeenCalledWith(ids);
        });
    });
});
