import { CharacterRepository } from '@src/components/character/repositories/types';
import CharacterDetailsUseCaseImpl from '@src/components/character/usecases/details/character-details';
import { CharacterDetailsResult, CharacterDetailsUseCase } from '@src/components/character/usecases/details/types';
import { fakeRepositoryProvider } from '@test/utils/fake-repository-provider';
import { beforeEach, describe, expect, it, Mocked, vi } from 'vitest';

describe('CharacterDetailsUseCase', () => {
    let characterRepository: Mocked<CharacterRepository>;
    let characterDetails: CharacterDetailsUseCase;

    beforeEach(() => {
        characterRepository = {
            create: vi.fn(),
            findById: vi.fn().mockResolvedValue({ id: 3, userId: 7, name: 'Aragorn', race: 'ember', sex: 1, imageUrl: '/a.jpg' }),
            findAllCharacterByUserId: vi.fn(),
            existsByCharacterName: vi.fn(),
        };
        characterDetails = new CharacterDetailsUseCaseImpl(fakeRepositoryProvider(characterRepository));
    });

    describe('execute()', () => {
        it('should return the details of the character', async () => {
            const result = await characterDetails.execute({ characterId: 3 });

            expect(result).toEqual({
                status: CharacterDetailsResult.FOUND,
                character: { id: 3, name: 'Aragorn', sex: 1, race: 'ember', imageUrl: '/a.jpg' }
            });
            expect(characterRepository.findById).toHaveBeenCalledWith(3);
        });

        it('should return NOT_FOUND when the character does not exist', async () => {
            characterRepository.findById.mockResolvedValue(null);

            const result = await characterDetails.execute({ characterId: 3 });

            expect(result).toEqual({ status: CharacterDetailsResult.NOT_FOUND });
        });
    });
});
