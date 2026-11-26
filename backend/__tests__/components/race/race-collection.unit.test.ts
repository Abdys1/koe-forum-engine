import { RaceRepository } from '@src/components/race/repositories/types';
import RaceCollectionUseCaseImpl from '@src/components/race/usecases/collection/race-collection';
import { RaceCollectionUseCase } from '@src/components/race/usecases/collection/types';
import { fakeRepositoryProvider } from '@test/utils/fake-repository-provider';
import { beforeEach, describe, expect, it, Mocked, vi } from 'vitest';

describe('RaceCollectionUseCase', () => {
    let raceRepository: Mocked<RaceRepository>;
    let raceCollection: RaceCollectionUseCase;

    beforeEach(() => {
        raceRepository = {
            findAll: vi.fn().mockResolvedValue([]),
            existsById: vi.fn(),
        };
        raceCollection = new RaceCollectionUseCaseImpl(fakeRepositoryProvider(raceRepository));
    });

    it('should return the races provided by the database in the same order', async () => {
        const human = { id: 2, name: 'Ember', teaser: 'Teaser', description: 'Leírás', imageUrl: '/ember.png', buttonImageUrl: '/ember-btn.png' };
        const elf = { id: 1, name: 'Elf', teaser: 'Teaser', description: 'Leírás', imageUrl: '/elf.png', buttonImageUrl: '/elf-btn.png' };
        raceRepository.findAll.mockResolvedValue([human, elf]);

        const result = await raceCollection.execute();

        expect(result).toStrictEqual([human, elf]);
    });

    it('should return an empty list when there is no race', async () => {
        const result = await raceCollection.execute();

        expect(result).toStrictEqual([]);
    });
});
