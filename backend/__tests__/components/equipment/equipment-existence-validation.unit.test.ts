import { EquipmentRepository } from '@src/components/equipment/repositories/types';
import EquipmentExistenceValidationImpl from '@src/components/equipment/usecases/validation/equipment-existence-validation';
import { EquipmentExistenceValidation } from '@src/components/equipment/usecases/validation/types';
import { beforeEach, describe, expect, it, Mocked, vi } from 'vitest';

describe('EquipmentExistenceValidation', () => {
    let equipmentRepository: Mocked<EquipmentRepository>;
    let equipmentExistenceValidation: EquipmentExistenceValidation;

    beforeEach(() => {
        equipmentRepository = {
            findAll: vi.fn(),
            findAllByIds: vi.fn(),
            findById: vi.fn(),
            findByNameAndTypeId: vi.fn(),
            countAssignmentsByEquipmentId: vi.fn(),
            findSlotUsageByIds: vi.fn(),
            create: vi.fn(),
            update: vi.fn(),
            delete: vi.fn(),
        };
        equipmentExistenceValidation = new EquipmentExistenceValidationImpl(equipmentRepository);
    });

    describe('execute()', () => {
        it('should return true when all ids exist', async () => {
            equipmentRepository.findAllByIds.mockResolvedValue([
                { id: 1, name: 'Sword', typeId: 1, description: '', slotCost: 1 },
                { id: 2, name: 'Shield', typeId: 2, description: '', slotCost: 1 },
            ]);

            const result = await equipmentExistenceValidation.execute([1, 2]);

            expect(result).toBe(true);
        });

        it('should return false when some ids do not exist', async () => {
            equipmentRepository.findAllByIds.mockResolvedValue([
                { id: 1, name: 'Sword', typeId: 1, description: '', slotCost: 1 },
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

        it('should return true when an existing id is repeated', async () => {
            equipmentRepository.findAllByIds.mockResolvedValue([
                { id: 4, name: 'Gyógyító ital', typeId: 1, description: '', slotCost: 1 },
                { id: 7, name: 'Ezüstgyűrű', typeId: 2, description: '', slotCost: 1 },
            ]);

            const result = await equipmentExistenceValidation.execute([4, 4, 7]);

            expect(result).toBe(true);
        });

        it('should return true when the same id is repeated many times', async () => {
            equipmentRepository.findAllByIds.mockResolvedValue([
                { id: 4, name: 'Gyógyító ital', typeId: 1, description: '', slotCost: 1 },
            ]);

            const result = await equipmentExistenceValidation.execute([4, 4, 4, 4, 4]);

            expect(result).toBe(true);
        });

        it('should return false when a repeated list contains a non-existent id', async () => {
            equipmentRepository.findAllByIds.mockResolvedValue([
                { id: 4, name: 'Gyógyító ital', typeId: 1, description: '', slotCost: 1 },
            ]);

            const result = await equipmentExistenceValidation.execute([4, 4, 999]);

            expect(result).toBe(false);
        });

        it('should call repository with deduplicated ids', async () => {
            equipmentRepository.findAllByIds.mockResolvedValue([
                { id: 4, name: 'Gyógyító ital', typeId: 1, description: '', slotCost: 1 },
                { id: 7, name: 'Ezüstgyűrű', typeId: 2, description: '', slotCost: 1 },
            ]);

            await equipmentExistenceValidation.execute([4, 4, 7, 4]);

            expect(equipmentRepository.findAllByIds).toHaveBeenCalledWith([4, 7]);
        });
    });
});
