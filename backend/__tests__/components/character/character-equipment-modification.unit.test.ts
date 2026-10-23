import { CharacterRepository } from '@src/components/character/repositories/types';
import CharacterEquipmentModificationUseCaseImpl from '@src/components/character/usecases/equipment_modification/character-equipment-modification';
import { CharacterEquipmentModificationResult, CharacterEquipmentModificationUseCase, ModifyCharacterEquipmentInput } from '@src/components/character/usecases/equipment_modification/types';
import { CharacterEquipmentValidationResult, CharacterEquipmentValidationUseCase } from '@src/components/character/usecases/equipment_validation/types';
import { EquipmentRepository } from '@src/components/equipment/repositories/types';
import { fakeRepositoryProvider } from '@test/utils/fake-repository-provider';
import { beforeEach, describe, expect, it, Mocked, vi } from 'vitest';

describe('CharacterEquipmentModificationUseCase', () => {
    const OWNER_ID = 7;
    const CHARACTER_ID = 3;
    let characterRepository: Mocked<CharacterRepository>;
    let equipmentRepository: Mocked<EquipmentRepository>;
    let characterEquipmentValidation: Mocked<CharacterEquipmentValidationUseCase>;
    let characterEquipmentModification: CharacterEquipmentModificationUseCase;

    beforeEach(() => {
        characterRepository = {
            create: vi.fn(),
            findById: vi.fn().mockResolvedValue({ id: CHARACTER_ID, userId: OWNER_ID, name: 'Aragorn', race: 'human', sex: 1, imageUrl: '/a.jpg' }),
            findAllCharacterByUserId: vi.fn(),
            existsByCharacterName: vi.fn(),
        };
        equipmentRepository = {
            findAll: vi.fn(),
            findAllByIds: vi.fn(),
            findAllByCharacterId: vi.fn().mockResolvedValue([]),
            replaceAllByCharacterId: vi.fn().mockResolvedValue(undefined),
            findById: vi.fn(),
            findByNameAndTypeId: vi.fn(),
            countAssignmentsById: vi.fn(),
            findSlotUsageByIds: vi.fn(),
            create: vi.fn(),
            update: vi.fn(),
            delete: vi.fn(),
        };
        characterEquipmentValidation = { execute: vi.fn().mockResolvedValue(CharacterEquipmentValidationResult.VALID) };
        characterEquipmentModification = new CharacterEquipmentModificationUseCaseImpl(
            fakeRepositoryProvider(characterRepository),
            fakeRepositoryProvider(equipmentRepository),
            characterEquipmentValidation
        );
    });

    describe('execute()', () => {
        it('should replace the equipment of the character and return the new list', async () => {
            equipmentRepository.findAllByCharacterId.mockResolvedValue([
                { id: 5, name: 'Gyógyító ital', typeId: 2, description: 'Gyógyít', slotCost: null, type: { id: 2, label: 'Bájital' } }
            ]);

            const result = await characterEquipmentModification.execute(inputWithEquipmentIds([5]));

            expect(result.status).toBe(CharacterEquipmentModificationResult.UPDATED);
            expect(equipmentRepository.replaceAllByCharacterId).toHaveBeenCalledWith(CHARACTER_ID, [5]);
            expect(result.equipment?.map((item) => item.id)).toStrictEqual([5]);
        });

        it('should replace with an empty list to remove every equipment', async () => {
            const result = await characterEquipmentModification.execute(inputWithEquipmentIds([]));

            expect(result.status).toBe(CharacterEquipmentModificationResult.UPDATED);
            expect(equipmentRepository.replaceAllByCharacterId).toHaveBeenCalledWith(CHARACTER_ID, []);
        });

        it('should validate and store the raw list including duplicates', async () => {
            await characterEquipmentModification.execute(inputWithEquipmentIds([4, 4, 7]));

            expect(characterEquipmentValidation.execute).toHaveBeenCalledWith([4, 4, 7]);
            expect(equipmentRepository.replaceAllByCharacterId).toHaveBeenCalledWith(CHARACTER_ID, [4, 4, 7]);
        });

        it('should return NOT_FOUND when the character does not exist', async () => {
            characterRepository.findById.mockResolvedValue(null);

            const result = await characterEquipmentModification.execute(inputWithEquipmentIds([1]));

            expect(result.status).toBe(CharacterEquipmentModificationResult.NOT_FOUND);
            expect(equipmentRepository.replaceAllByCharacterId).not.toHaveBeenCalled();
        });

        it('should return NOT_OWNED when the character belongs to another user', async () => {
            const result = await characterEquipmentModification.execute({ ...inputWithEquipmentIds([1]), userId: OWNER_ID + 1 });

            expect(result.status).toBe(CharacterEquipmentModificationResult.NOT_OWNED);
            expect(characterEquipmentValidation.execute).not.toHaveBeenCalled();
            expect(equipmentRepository.replaceAllByCharacterId).not.toHaveBeenCalled();
        });

        it('should return EQUIPMENT_NOT_EXISTS when the validation finds a missing equipment', async () => {
            characterEquipmentValidation.execute.mockResolvedValue(CharacterEquipmentValidationResult.EQUIPMENT_NOT_EXISTS);

            const result = await characterEquipmentModification.execute(inputWithEquipmentIds([1, -1]));

            expect(result.status).toBe(CharacterEquipmentModificationResult.EQUIPMENT_NOT_EXISTS);
            expect(equipmentRepository.replaceAllByCharacterId).not.toHaveBeenCalled();
        });

        it('should return SLOT_CAPACITY_EXCEEDED when the validation finds a slot overflow', async () => {
            characterEquipmentValidation.execute.mockResolvedValue(CharacterEquipmentValidationResult.SLOT_CAPACITY_EXCEEDED);

            const result = await characterEquipmentModification.execute(inputWithEquipmentIds([1, 2, 3]));

            expect(result.status).toBe(CharacterEquipmentModificationResult.SLOT_CAPACITY_EXCEEDED);
            expect(equipmentRepository.replaceAllByCharacterId).not.toHaveBeenCalled();
        });

        it('should propagate the error when the replacement fails', async () => {
            equipmentRepository.replaceAllByCharacterId.mockRejectedValue(new Error('db hiba'));

            await expect(characterEquipmentModification.execute(inputWithEquipmentIds([1]))).rejects.toThrowError('db hiba');
        });
    });

    function inputWithEquipmentIds(equipmentIds: number[]): ModifyCharacterEquipmentInput {
        return { characterId: CHARACTER_ID, userId: OWNER_ID, equipmentIds };
    }
});
