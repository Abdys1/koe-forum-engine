import { CharacterRepository } from '@src/components/character/repositories/types';
import CharacterEquipmentCollectionUseCaseImpl from '@src/components/character/usecases/equipment_collection/character-equipment-collection';
import { CharacterEquipmentCollectionResult, CharacterEquipmentCollectionUseCase } from '@src/components/character/usecases/equipment_collection/types';
import { EquipmentRepository } from '@src/components/equipment/repositories/types';
import { beforeEach, describe, expect, it, Mocked, vi } from 'vitest';

describe('CharacterEquipmentCollectionUseCase', () => {
    let characterRepository: Mocked<CharacterRepository>;
    let equipmentRepository: Mocked<EquipmentRepository>;
    let characterEquipmentCollection: CharacterEquipmentCollectionUseCase;

    beforeEach(() => {
        characterRepository = {
            create: vi.fn(),
            findById: vi.fn().mockResolvedValue({ id: 3, userId: 7, name: 'Aragorn', race: 'human', sex: 1, imageUrl: '/a.jpg' }),
            findAllCharacterByUserId: vi.fn(),
            existsByCharacterName: vi.fn(),
        };
        equipmentRepository = {
            findAll: vi.fn(),
            findAllByIds: vi.fn(),
            findAllByCharacterId: vi.fn().mockResolvedValue([]),
            findById: vi.fn(),
            findByNameAndTypeId: vi.fn(),
            countAssignmentsById: vi.fn(),
            findSlotUsageByIds: vi.fn(),
            create: vi.fn(),
            update: vi.fn(),
            delete: vi.fn(),
        };
        characterEquipmentCollection = new CharacterEquipmentCollectionUseCaseImpl(characterRepository, equipmentRepository);
    });

    describe('execute()', () => {
        it('should return the equipment of the character', async () => {
            equipmentRepository.findAllByCharacterId.mockResolvedValue([
                { id: 5, name: 'Gyógyító ital', typeId: 2, description: 'Gyógyít', slotCost: null, type: { id: 2, label: 'Bájital' } }
            ]);

            const result = await characterEquipmentCollection.execute({ characterId: 3 });

            expect(result.status).toBe(CharacterEquipmentCollectionResult.FOUND);
            expect(result.equipment).toHaveLength(1);
            expect(result.equipment?.[0].id).toBe(5);
            expect(equipmentRepository.findAllByCharacterId).toHaveBeenCalledWith(3);
        });

        it('should return NOT_FOUND when the character does not exist', async () => {
            characterRepository.findById.mockResolvedValue(null);

            const result = await characterEquipmentCollection.execute({ characterId: 3 });

            expect(result.status).toBe(CharacterEquipmentCollectionResult.NOT_FOUND);
            expect(equipmentRepository.findAllByCharacterId).not.toHaveBeenCalled();
        });
    });
});
