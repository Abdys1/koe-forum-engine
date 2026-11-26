import { CharacterRepository } from '@src/components/character/repositories/types';
import CharacterNameAvailabilityUseCaseImpl from '@src/components/character/usecases/name_availability/character-name-availability';
import { CharacterNameAvailabilityResult, CharacterNameAvailabilityUseCase } from '@src/components/character/usecases/name_availability/types';
import { fakeRepositoryProvider } from '@test/utils/fake-repository-provider';
import { beforeEach, describe, expect, it, Mocked, vi } from 'vitest';

describe('CharacterNameAvailabilityUseCase', () => {
    let characterRepository: Mocked<CharacterRepository>;
    let characterNameAvailability: CharacterNameAvailabilityUseCase;

    beforeEach(() => {
        characterRepository = {
            create: vi.fn(),
            findById: vi.fn(),
            findAllCharacterByUserId: vi.fn(),
            existsByCharacterName: vi.fn().mockResolvedValue(false),
        };
        characterNameAvailability = new CharacterNameAvailabilityUseCaseImpl(fakeRepositoryProvider(characterRepository));
    });

    describe('execute()', () => {
        it('should return AVAILABLE when no character has the name', async () => {
            const result = await characterNameAvailability.execute('Aragorn a Kósza');

            expect(result).toBe(CharacterNameAvailabilityResult.AVAILABLE);
            expect(characterRepository.existsByCharacterName).toHaveBeenCalledWith('Aragorn a Kósza');
        });

        it('should return TAKEN when a character already has the name', async () => {
            characterRepository.existsByCharacterName.mockResolvedValue(true);

            const result = await characterNameAvailability.execute('Aragorn a Kósza');

            expect(result).toBe(CharacterNameAvailabilityResult.TAKEN);
        });
    });
});
