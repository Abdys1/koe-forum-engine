import EquipmentValidationServiceImpl from '@src/components/equipment/services/equipment-validation.service.impl';
import { EquipmentValidationService } from '@src/components/equipment/services/equipment-validation.service';
import { EquipmentRepository } from '@src/components/equipment/repositories/types';
import { beforeEach, describe, expect, it, vi, Mocked } from 'vitest';

describe('EquipmentValidationService', () => {
    let equipmentRepository: Mocked<EquipmentRepository>;
    let equipmentValidationService: EquipmentValidationService;

    beforeEach(() => {
        equipmentRepository = {
            findAll: vi.fn(),
            findAllByIds: vi.fn(),
            create: vi.fn(),
        };
        equipmentValidationService = new EquipmentValidationServiceImpl(equipmentRepository);
    });

    describe('allExist()', () => {
        it('should return true when all ids exist', async () => {
            equipmentRepository.findAllByIds.mockResolvedValue([
                { id: 1, name: 'Sword', type: 'PRIMARY_WEAPON' as any, description: '' },
                { id: 2, name: 'Shield', type: 'SHIELD' as any, description: '' },
            ]);

            const result = await equipmentValidationService.allExist([1, 2]);

            expect(result).toBe(true);
        });

        it('should return false when some ids do not exist', async () => {
            equipmentRepository.findAllByIds.mockResolvedValue([
                { id: 1, name: 'Sword', type: 'PRIMARY_WEAPON' as any, description: '' },
            ]);

            const result = await equipmentValidationService.allExist([1, 99]);

            expect(result).toBe(false);
        });

        it('should return false when no ids exist', async () => {
            equipmentRepository.findAllByIds.mockResolvedValue([]);

            const result = await equipmentValidationService.allExist([99, 100]);

            expect(result).toBe(false);
        });

        it('should return true when ids list is empty', async () => {
            equipmentRepository.findAllByIds.mockResolvedValue([]);

            const result = await equipmentValidationService.allExist([]);

            expect(result).toBe(true);
        });

        it('should call repository with the provided ids', async () => {
            equipmentRepository.findAllByIds.mockResolvedValue([]);
            const ids = [1, 2, 3];

            await equipmentValidationService.allExist(ids);

            expect(equipmentRepository.findAllByIds).toHaveBeenCalledWith(ids);
        });
    });
});
