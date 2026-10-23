import CharacterEquipmentValidationUseCaseImpl from '@src/components/character/usecases/equipment_validation/character-equipment-validation';
import { CharacterEquipmentValidationResult, CharacterEquipmentValidationUseCase } from '@src/components/character/usecases/equipment_validation/types';
import { EquipmentExistenceValidationUseCase, SlotCapacityValidationUseCase } from '@src/components/equipment/usecases/validation/types';
import { beforeEach, describe, expect, it, Mocked, vi } from 'vitest';

describe('CharacterEquipmentValidationUseCase', () => {
    let equipmentExistenceValidation: Mocked<EquipmentExistenceValidationUseCase>;
    let slotCapacityValidation: Mocked<SlotCapacityValidationUseCase>;
    let characterEquipmentValidation: CharacterEquipmentValidationUseCase;

    beforeEach(() => {
        equipmentExistenceValidation = { execute: vi.fn().mockResolvedValue(true) };
        slotCapacityValidation = { execute: vi.fn().mockResolvedValue(true) };
        characterEquipmentValidation = new CharacterEquipmentValidationUseCaseImpl(equipmentExistenceValidation, slotCapacityValidation);
    });

    describe('execute()', () => {
        it('should return VALID when every equipment exists and fits into its slot', async () => {
            expect(await characterEquipmentValidation.execute([1, 2])).toBe(CharacterEquipmentValidationResult.VALID);
        });

        it('should return VALID when the equipment id list is empty', async () => {
            expect(await characterEquipmentValidation.execute([])).toBe(CharacterEquipmentValidationResult.VALID);
        });

        it('should return VALID when the same equipment id is repeated', async () => {
            expect(await characterEquipmentValidation.execute([4, 4, 7])).toBe(CharacterEquipmentValidationResult.VALID);
        });

        it('should pass the raw list including duplicates to both validations', async () => {
            await characterEquipmentValidation.execute([4, 4, 7]);

            expect(equipmentExistenceValidation.execute).toHaveBeenCalledWith([4, 4, 7]);
            expect(slotCapacityValidation.execute).toHaveBeenCalledWith([4, 4, 7]);
        });

        it('should return EQUIPMENT_NOT_EXISTS when an equipment id does not exist', async () => {
            equipmentExistenceValidation.execute.mockResolvedValue(false);

            expect(await characterEquipmentValidation.execute([1, -1])).toBe(CharacterEquipmentValidationResult.EQUIPMENT_NOT_EXISTS);
        });

        it('should not check slot capacity when an equipment does not exist', async () => {
            equipmentExistenceValidation.execute.mockResolvedValue(false);

            await characterEquipmentValidation.execute([1, -1]);

            expect(slotCapacityValidation.execute).not.toHaveBeenCalled();
        });

        it('should return SLOT_CAPACITY_EXCEEDED when the equipment list exceeds a slot capacity', async () => {
            slotCapacityValidation.execute.mockResolvedValue(false);

            expect(await characterEquipmentValidation.execute([1, 2, 3])).toBe(CharacterEquipmentValidationResult.SLOT_CAPACITY_EXCEEDED);
        });
    });
});
