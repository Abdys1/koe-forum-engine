import { CharacterRepository } from '@src/components/character/repositories/types';
import { UserRepository } from '@src/components/user/repositories/types';
import ActiveCharacterSelectionUseCaseImpl from '@src/components/user/usecases/active_character_selection/active-character-selection';
import {
    ActiveCharacterSelectionResult,
    ActiveCharacterSelectionUseCase
} from '@src/components/user/usecases/active_character_selection/types';
import { fakeRepositoryProvider } from '@test/utils/fake-repository-provider';
import { beforeEach, describe, expect, it, Mocked, vi } from 'vitest';

describe('ActiveCharacterSelectionUseCase', () => {
    let userRepository: Mocked<UserRepository>;
    let characterRepository: Mocked<CharacterRepository>;
    let activeCharacterSelection: ActiveCharacterSelectionUseCase;

    beforeEach(() => {
        userRepository = {
            findProfileById: vi.fn(),
            setActiveCharacter: vi.fn().mockResolvedValue(undefined),
        };
        characterRepository = {
            create: vi.fn(),
            findById: vi.fn().mockResolvedValue({ id: 3, userId: 7, name: 'Aragorn', race: { id: 1, name: 'Ember' }, sex: 1, imageUrl: '/a.jpg' }),
            findAllCharacterByUserId: vi.fn(),
            existsByCharacterName: vi.fn(),
        };
        activeCharacterSelection = new ActiveCharacterSelectionUseCaseImpl(
            fakeRepositoryProvider(userRepository),
            fakeRepositoryProvider(characterRepository)
        );
    });

    describe('execute()', () => {
        it('should select the character when it belongs to the user', async () => {
            const result = await activeCharacterSelection.execute({ userId: 7, characterId: 3 });

            expect(result).toEqual({ status: ActiveCharacterSelectionResult.SELECTED });
            expect(characterRepository.findById).toHaveBeenCalledWith(3);
            expect(userRepository.setActiveCharacter).toHaveBeenCalledWith(7, 3);
        });

        it('should return NOT_OWNED and not select when the character belongs to another user', async () => {
            characterRepository.findById.mockResolvedValue({ id: 3, userId: 8, name: 'Legolas', race: { id: 2, name: 'Elf' }, sex: 1, imageUrl: '/l.jpg' });

            const result = await activeCharacterSelection.execute({ userId: 7, characterId: 3 });

            expect(result).toEqual({ status: ActiveCharacterSelectionResult.NOT_OWNED });
            expect(userRepository.setActiveCharacter).not.toHaveBeenCalled();
        });

        it('should return NOT_FOUND and not select when the character does not exist', async () => {
            characterRepository.findById.mockResolvedValue(null);

            const result = await activeCharacterSelection.execute({ userId: 7, characterId: 3 });

            expect(result).toEqual({ status: ActiveCharacterSelectionResult.NOT_FOUND });
            expect(userRepository.setActiveCharacter).not.toHaveBeenCalled();
        });
    });
});
