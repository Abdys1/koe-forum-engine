import { CharacterRepository } from '@src/components/character/repositories/types';
import { Sex } from '@src/components/character/types';
import CharacterRegistrationUseCaseImpl from '@src/components/character/usecases/registration/character-registration';
import { CharacterRegistrationUseCase, CreateCharacterInput } from '@src/components/character/usecases/registration/types';
import { EquipmentRepository } from '@src/components/equipment/repositories/types';
import { fakeRepositoryProvider } from '@test/utils/fake-repository-provider';
import { fakeTransactionManager } from '@test/utils/fake-transaction-manager';
import { beforeEach, describe, expect, it, Mocked, vi } from 'vitest';

describe('CharacterRegistrationUseCase', () => {
    const CREATED_ID = 11;
    let characterRepository: Mocked<CharacterRepository>;
    let equipmentRepository: Mocked<EquipmentRepository>;
    let characterRegistration: CharacterRegistrationUseCase;

    beforeEach(() => {
        characterRepository = {
            create: vi.fn().mockImplementation(async (character) => ({ ...character, id: CREATED_ID })),
            findById: vi.fn(),
            findAllCharacterByUserId: vi.fn(),
            existsByCharacterName: vi.fn(),
        };
        equipmentRepository = {
            findAll: vi.fn(),
            findAllByIds: vi.fn(),
            findAllByCharacterId: vi.fn(),
            replaceAllByCharacterId: vi.fn().mockResolvedValue(undefined),
            findById: vi.fn(),
            findByNameAndTypeId: vi.fn(),
            countAssignmentsById: vi.fn(),
            findSlotUsageByIds: vi.fn(),
            create: vi.fn(),
            update: vi.fn(),
            delete: vi.fn(),
        };
        characterRegistration = new CharacterRegistrationUseCaseImpl(
            fakeTransactionManager(),
            fakeRepositoryProvider(characterRepository),
            fakeRepositoryProvider(equipmentRepository)
        );
    });

    describe('execute()', () => {
        it('should create the character of the owner', async () => {
            await characterRegistration.execute(inputWithEquipmentIds([]));

            expect(characterRepository.create).toHaveBeenCalledWith({
                userId: 1,
                name: 'Aragorn a Kósza',
                race: 'human',
                sex: Sex.MALE,
                imageUrl: '/aragorn.jpg'
            });
        });

        it('should assign the equipment to the created character', async () => {
            await characterRegistration.execute(inputWithEquipmentIds([4, 4, 7]));

            expect(equipmentRepository.replaceAllByCharacterId).toHaveBeenCalledWith(CREATED_ID, [4, 4, 7]);
        });

        it('should propagate the error when the equipment assignment fails', async () => {
            equipmentRepository.replaceAllByCharacterId.mockRejectedValue(new Error('db hiba'));

            await expect(characterRegistration.execute(inputWithEquipmentIds([1]))).rejects.toThrowError('db hiba');
        });
    });

    function inputWithEquipmentIds(equipmentIds: number[]): CreateCharacterInput {
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
