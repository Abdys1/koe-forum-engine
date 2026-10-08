import { EquipmentRepository } from '@src/components/equipment/repositories/types';
import SlotCapacityValidationImpl from '@src/components/equipment/usecases/validation/slot-capacity-validation';
import { SlotCapacityValidation } from '@src/components/equipment/usecases/validation/types';
import { beforeEach, describe, expect, it, Mocked, vi } from 'vitest';

describe('SlotCapacityValidation', () => {
    let equipmentRepository: Mocked<EquipmentRepository>;
    let slotCapacityValidation: SlotCapacityValidation;

    beforeEach(() => {
        equipmentRepository = {
            findAll: vi.fn(),
            findAllByIds: vi.fn(),
            findById: vi.fn(),
            findByNameAndTypeId: vi.fn(),
            countAssignmentsByEquipmentId: vi.fn(),
            findSlotUsageByIds: vi.fn().mockResolvedValue([]),
            create: vi.fn(),
            update: vi.fn(),
            delete: vi.fn(),
        };
        slotCapacityValidation = new SlotCapacityValidationImpl(equipmentRepository);
    });

    describe('execute()', () => {
        it('should return true when the equipment id list is empty', async () => {
            const result = await slotCapacityValidation.execute([]);

            expect(result).toBe(true);
            expect(equipmentRepository.findSlotUsageByIds).not.toHaveBeenCalled();
        });

        it('should return true when the combined slot cost is within capacity', async () => {
            equipmentRepository.findSlotUsageByIds.mockResolvedValue([
                { id: 1, slotCost: 1, slotId: 10, slotMaxCapacity: 2 },
                { id: 2, slotCost: 1, slotId: 10, slotMaxCapacity: 2 },
            ]);

            const result = await slotCapacityValidation.execute([1, 2]);

            expect(result).toBe(true);
        });

        it('should return false when the combined slot cost exceeds the capacity', async () => {
            equipmentRepository.findSlotUsageByIds.mockResolvedValue([
                { id: 1, slotCost: 1, slotId: 10, slotMaxCapacity: 2 },
                { id: 2, slotCost: 1, slotId: 10, slotMaxCapacity: 2 },
                { id: 3, slotCost: 1, slotId: 10, slotMaxCapacity: 2 },
            ]);

            const result = await slotCapacityValidation.execute([1, 2, 3]);

            expect(result).toBe(false);
        });

        it('should not count equipment whose type has no slot', async () => {
            equipmentRepository.findSlotUsageByIds.mockResolvedValue([
                { id: 1, slotCost: 1, slotId: null, slotMaxCapacity: null },
                { id: 2, slotCost: 1, slotId: null, slotMaxCapacity: null },
                { id: 3, slotCost: 1, slotId: null, slotMaxCapacity: null },
            ]);

            const result = await slotCapacityValidation.execute([1, 2, 3]);

            expect(result).toBe(true);
        });

        it('should sum the slot cost of a repeated equipment id per occurrence', async () => {
            equipmentRepository.findSlotUsageByIds.mockResolvedValue([
                { id: 1, slotCost: 1, slotId: 10, slotMaxCapacity: 2 },
            ]);

            const withinCapacity = await slotCapacityValidation.execute([1, 1]);
            expect(withinCapacity).toBe(true);

            const exceedsCapacity = await slotCapacityValidation.execute([1, 1, 1]);
            expect(exceedsCapacity).toBe(false);
        });

        it('should account for equipment with a slot cost greater than one', async () => {
            equipmentRepository.findSlotUsageByIds.mockResolvedValue([
                { id: 1, slotCost: 2, slotId: 10, slotMaxCapacity: 2 },
            ]);

            const result = await slotCapacityValidation.execute([1]);

            expect(result).toBe(true);
        });

        it('should track capacity separately per slot', async () => {
            equipmentRepository.findSlotUsageByIds.mockResolvedValue([
                { id: 1, slotCost: 1, slotId: 10, slotMaxCapacity: 1 },
                { id: 2, slotCost: 1, slotId: 20, slotMaxCapacity: 1 },
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
