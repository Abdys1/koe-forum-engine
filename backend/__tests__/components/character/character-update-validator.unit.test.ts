import { CharacterRepository } from '@src/components/character/repositories/types';
import { Sex } from '@src/components/character/types';
import CharacterUpdateValidatorImpl from '@src/components/character/usecases/update_validator/character-update-validator';
import { CharacterUpdateValidator, ValidateCharacterUpdateInput, ValidateCharacterUpdateResult } from '@src/components/character/usecases/update_validator/types';
import { EquipmentExistenceValidation } from '@src/components/equipment/usecases/validation/types';
import { beforeEach, describe, expect, it, Mocked, vi } from 'vitest';

describe('CharacterUpdateValidator', () => {
    let characterRepository: Mocked<CharacterRepository>;
    let equipmentExistenceValidation: Mocked<EquipmentExistenceValidation>;
    let characterUpdateValidator: CharacterUpdateValidator;

    beforeEach(() => {
        characterRepository = {
            create: vi.fn(),
            findAllCharacterByUserId: vi.fn(),
            existsByCharacterName: vi.fn().mockResolvedValue(false),
        };
        equipmentExistenceValidation = { execute: vi.fn().mockResolvedValue(true) };
        characterUpdateValidator = new CharacterUpdateValidatorImpl(characterRepository, equipmentExistenceValidation);
    });

    describe('execute()', () => {
        it('should return VALID when the name is free and every equipment exists', async () => {
            const result = await characterUpdateValidator.execute(inputWithEquipmentIds([1, 2]));

            expect(result.status).toBe(ValidateCharacterUpdateResult.VALID);
        });

        it('should return ALREADY_EXISTS when the character name is taken', async () => {
            characterRepository.existsByCharacterName.mockResolvedValue(true);

            const result = await characterUpdateValidator.execute(inputWithEquipmentIds([1]));

            expect(result.status).toBe(ValidateCharacterUpdateResult.ALREADY_EXISTS);
        });

        it('should return EQUIPMENT_NOT_EXISTS when an equipment id does not exist', async () => {
            equipmentExistenceValidation.execute.mockResolvedValue(false);

            const result = await characterUpdateValidator.execute(inputWithEquipmentIds([1, -1]));

            expect(result.status).toBe(ValidateCharacterUpdateResult.EQUIPMENT_NOT_EXISTS);
        });

        it('should return VALID when the equipment id list is empty', async () => {
            const result = await characterUpdateValidator.execute(inputWithEquipmentIds([]));

            expect(result.status).toBe(ValidateCharacterUpdateResult.VALID);
        });

        it('should pass the equipment id list to the existence validation', async () => {
            await characterUpdateValidator.execute(inputWithEquipmentIds([3, 8]));

            expect(equipmentExistenceValidation.execute).toHaveBeenCalledWith([3, 8]);
        });

        it('should return VALID when the same equipment id is repeated', async () => {
            const result = await characterUpdateValidator.execute(inputWithEquipmentIds([4, 4, 7]));

            expect(result.status).toBe(ValidateCharacterUpdateResult.VALID);
        });

        it('should return VALID when the whole list is the same equipment id', async () => {
            const result = await characterUpdateValidator.execute(inputWithEquipmentIds([4, 4, 4]));

            expect(result.status).toBe(ValidateCharacterUpdateResult.VALID);
        });

        it('should pass the raw list including duplicates to the existence validation', async () => {
            await characterUpdateValidator.execute(inputWithEquipmentIds([4, 4, 7]));

            expect(equipmentExistenceValidation.execute).toHaveBeenCalledWith([4, 4, 7]);
        });

        it('should return EQUIPMENT_NOT_EXISTS when a repeated list contains a non-existent id', async () => {
            equipmentExistenceValidation.execute.mockResolvedValue(false);

            const result = await characterUpdateValidator.execute(inputWithEquipmentIds([4, 4, -1]));

            expect(result.status).toBe(ValidateCharacterUpdateResult.EQUIPMENT_NOT_EXISTS);
        });
    });

    function inputWithEquipmentIds(equipmentIds: number[]): ValidateCharacterUpdateInput {
        return {
            owner: { id: 1, username: 'test_user' },
            name: 'Aragorn a Kósza',
            sex: Sex.MALE,
            race: 'human',
            equipmentIds,
            imageUrl: '/aragorn.jpg'
        };
    }
});
