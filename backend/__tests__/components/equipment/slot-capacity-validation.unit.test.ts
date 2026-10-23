import { EquipmentRepository } from '@src/components/equipment/repositories/types';
import SlotCapacityValidationUseCaseImpl from '@src/components/equipment/usecases/validation/slot-capacity-validation';
import { SlotCapacityValidationUseCase } from '@src/components/equipment/usecases/validation/types';
import { fakeRepositoryProvider } from '@test/utils/fake-repository-provider';
import { beforeEach, describe, expect, it, Mocked, vi } from 'vitest';

describe('SlotCapacityValidationUseCase', () => {
    let equipmentRepository: Mocked<EquipmentRepository>;
    let slotCapacityValidation: SlotCapacityValidationUseCase;

    beforeEach(() => {
        equipmentRepository = {
            findAll: vi.fn(),
            findAllByIds: vi.fn(),
            findAllByCharacterId: vi.fn(),
            replaceAllByCharacterId: vi.fn(),
            findById: vi.fn(),
            findByNameAndTypeId: vi.fn(),
            countAssignmentsById: vi.fn(),
            findSlotUsageByIds: vi.fn().mockResolvedValue([]),
            create: vi.fn(),
            update: vi.fn(),
            delete: vi.fn(),
        };
        slotCapacityValidation = new SlotCapacityValidationUseCaseImpl(fakeRepositoryProvider(equipmentRepository));
    });

    describe('execute()', () => {
        it('should return true when the equipment id list is empty', async () => {
            const result = await slotCapacityValidation.execute([]);

            expect(result).toBe(true);
            expect(equipmentRepository.findSlotUsageByIds).not.toHaveBeenCalled();
        });

        it('should return true when the combined slot cost is within capacity', async () => {
            equipmentRepository.findSlotUsageByIds.mockResolvedValue([
                { id: 1, slot: { slotId: 10, maxCapacity: 2, cost: 1 } },
                { id: 2, slot: { slotId: 10, maxCapacity: 2, cost: 1 } },
            ]);

            const result = await slotCapacityValidation.execute([1, 2]);

            expect(result).toBe(true);
        });

        it('should return false when the combined slot cost exceeds the capacity', async () => {
            equipmentRepository.findSlotUsageByIds.mockResolvedValue([
                { id: 1, slot: { slotId: 10, maxCapacity: 2, cost: 1 } },
                { id: 2, slot: { slotId: 10, maxCapacity: 2, cost: 1 } },
                { id: 3, slot: { slotId: 10, maxCapacity: 2, cost: 1 } },
            ]);

            const result = await slotCapacityValidation.execute([1, 2, 3]);

            expect(result).toBe(false);
        });

        it('should not count equipment whose type has no slot', async () => {
            equipmentRepository.findSlotUsageByIds.mockResolvedValue([
                { id: 1, slot: null },
                { id: 2, slot: null },
                { id: 3, slot: null },
            ]);

            const result = await slotCapacityValidation.execute([1, 2, 3]);

            expect(result).toBe(true);
        });

        it('should sum the slot cost of a repeated equipment id per occurrence', async () => {
            equipmentRepository.findSlotUsageByIds.mockResolvedValue([
                { id: 1, slot: { slotId: 10, maxCapacity: 2, cost: 1 } },
            ]);

            const withinCapacity = await slotCapacityValidation.execute([1, 1]);
            expect(withinCapacity).toBe(true);

            const exceedsCapacity = await slotCapacityValidation.execute([1, 1, 1]);
            expect(exceedsCapacity).toBe(false);
        });

        it('should account for equipment with a slot cost greater than one', async () => {
            equipmentRepository.findSlotUsageByIds.mockResolvedValue([
                { id: 1, slot: { slotId: 10, maxCapacity: 2, cost: 2 } },
            ]);

            const result = await slotCapacityValidation.execute([1]);

            expect(result).toBe(true);
        });

        it('should track capacity separately per slot', async () => {
            equipmentRepository.findSlotUsageByIds.mockResolvedValue([
                { id: 1, slot: { slotId: 10, maxCapacity: 1, cost: 1 } },
                { id: 2, slot: { slotId: 20, maxCapacity: 1, cost: 1 } },
            ]);

            const result = await slotCapacityValidation.execute([1, 2]);

            expect(result).toBe(true);
        });

        it('should query the repository with deduplicated ids', async () => {
            await slotCapacityValidation.execute([1, 1, 2]);

            expect(equipmentRepository.findSlotUsageByIds).toHaveBeenCalledWith([1, 2]);
        });
    });
});
