import { CharacterRepository } from '@src/components/character/repositories/types';
import { Sex } from '@src/components/character/types';
import { CharacterEquipmentValidationResult, CharacterEquipmentValidationUseCase } from '@src/components/character/usecases/equipment_validation/types';
import CharacterUpdateValidatorUseCaseImpl from '@src/components/character/usecases/update_validator/character-update-validator';
import { CharacterUpdateValidatorUseCase, ValidateCharacterUpdateInput, ValidateCharacterUpdateResult } from '@src/components/character/usecases/update_validator/types';
import { fakeRepositoryProvider } from '@test/utils/fake-repository-provider';
import { beforeEach, describe, expect, it, Mocked, vi } from 'vitest';

describe('CharacterUpdateValidatorUseCase', () => {
    let characterRepository: Mocked<CharacterRepository>;
    let characterEquipmentValidation: Mocked<CharacterEquipmentValidationUseCase>;
    let characterUpdateValidator: CharacterUpdateValidatorUseCase;

    beforeEach(() => {
        characterRepository = {
            create: vi.fn(),
            findById: vi.fn(),
            findAllCharacterByUserId: vi.fn(),
            existsByCharacterName: vi.fn().mockResolvedValue(false),
        };
        characterEquipmentValidation = { execute: vi.fn().mockResolvedValue(CharacterEquipmentValidationResult.VALID) };
        characterUpdateValidator = new CharacterUpdateValidatorUseCaseImpl(fakeRepositoryProvider(characterRepository), characterEquipmentValidation);
    });

    describe('execute()', () => {
        it('should return VALID when the name is free and the equipment list is valid', async () => {
            const result = await characterUpdateValidator.execute(inputWithEquipmentIds([1, 2]));

            expect(result.status).toBe(ValidateCharacterUpdateResult.VALID);
        });

        it('should return ALREADY_EXISTS when the character name is taken', async () => {
            characterRepository.existsByCharacterName.mockResolvedValue(true);

            const result = await characterUpdateValidator.execute(inputWithEquipmentIds([1]));

            expect(result.status).toBe(ValidateCharacterUpdateResult.ALREADY_EXISTS);
        });

        it('should not validate the equipment when the character name is taken', async () => {
            characterRepository.existsByCharacterName.mockResolvedValue(true);

            await characterUpdateValidator.execute(inputWithEquipmentIds([1]));

            expect(characterEquipmentValidation.execute).not.toHaveBeenCalled();
        });

        it('should pass the raw equipment id list to the equipment validation', async () => {
            await characterUpdateValidator.execute(inputWithEquipmentIds([4, 4, 7]));

            expect(characterEquipmentValidation.execute).toHaveBeenCalledWith([4, 4, 7]);
        });

        it('should return EQUIPMENT_NOT_EXISTS when the equipment validation finds a missing equipment', async () => {
            characterEquipmentValidation.execute.mockResolvedValue(CharacterEquipmentValidationResult.EQUIPMENT_NOT_EXISTS);

            const result = await characterUpdateValidator.execute(inputWithEquipmentIds([1, -1]));

            expect(result.status).toBe(ValidateCharacterUpdateResult.EQUIPMENT_NOT_EXISTS);
        });

        it('should return SLOT_CAPACITY_EXCEEDED when the equipment validation finds a slot overflow', async () => {
            characterEquipmentValidation.execute.mockResolvedValue(CharacterEquipmentValidationResult.SLOT_CAPACITY_EXCEEDED);

            const result = await characterUpdateValidator.execute(inputWithEquipmentIds([1, 2, 3]));

            expect(result.status).toBe(ValidateCharacterUpdateResult.SLOT_CAPACITY_EXCEEDED);
        });
    });

    function inputWithEquipmentIds(equipmentIds: number[]): ValidateCharacterUpdateInput {
        return {
            owner: { id: 1, username: 'test_user' },
            name: 'Aragorn a Kósza',
            sex: Sex.MALE,
            race: 'human',
            equipmentIds
        };
    }
});
