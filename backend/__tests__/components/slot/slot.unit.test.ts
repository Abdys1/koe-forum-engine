import { SlotRepository } from '@src/components/slot/repositories/types';
import SlotCollectionImpl from '@src/components/slot/usecases/collection/slot-collection';
import { SlotCollection } from '@src/components/slot/usecases/collection/types';
import SlotCreationImpl from '@src/components/slot/usecases/creation/slot-creation';
import { SlotCreation, SlotCreationResult } from '@src/components/slot/usecases/creation/types';
import SlotRemovalImpl from '@src/components/slot/usecases/removal/slot-removal';
import { SlotRemoval, SlotRemovalResult } from '@src/components/slot/usecases/removal/types';
import { beforeEach, describe, expect, it, Mocked, vi } from 'vitest';

describe('slot use cases', () => {
    let slotRepository: Mocked<SlotRepository>;

    beforeEach(() => {
        slotRepository = {
            findAll: vi.fn().mockResolvedValue([]),
            findById: vi.fn().mockResolvedValue(null),
            findByLabelIgnoreCase: vi.fn().mockResolvedValue(null),
            create: vi.fn().mockImplementation(async (entity) => ({ id: 1, ...entity })),
            delete: vi.fn().mockResolvedValue(undefined),
        };
    });

    describe('SlotCollection', () => {
        let slotCollection: SlotCollection;

        beforeEach(() => {
            slotCollection = new SlotCollectionImpl(slotRepository);
        });

        it('should return the slots provided by the database', async () => {
            slotRepository.findAll.mockResolvedValue([
                { id: 1, label: 'Fegyver', maxCapacity: 2 },
            ]);

            const result = await slotCollection.execute();

            expect(result).toStrictEqual([
                { id: 1, label: 'Fegyver', maxCapacity: 2 },
            ]);
        });

        it('should return an empty list when there is no slot', async () => {
            const result = await slotCollection.execute();

            expect(result).toStrictEqual([]);
        });
    });

    describe('SlotCreation', () => {
        let slotCreation: SlotCreation;

        beforeEach(() => {
            slotCreation = new SlotCreationImpl(slotRepository);
        });

        it('should create the slot and return CREATED', async () => {
            const result = await slotCreation.execute({ label: 'Fegyver', maxCapacity: 2 });

            expect(result.status).toBe(SlotCreationResult.CREATED);
            expect(slotRepository.create).toHaveBeenCalledWith({ label: 'Fegyver', maxCapacity: 2 });
        });

        it('should return ALREADY_EXISTS when the label is taken', async () => {
            slotRepository.findByLabelIgnoreCase.mockResolvedValue({ id: 5, label: 'Fegyver', maxCapacity: 1 });

            const result = await slotCreation.execute({ label: 'Fegyver', maxCapacity: 2 });

            expect(result.status).toBe(SlotCreationResult.ALREADY_EXISTS);
            expect(slotRepository.create).not.toHaveBeenCalled();
        });

        it('should trim the label before saving it', async () => {
            await slotCreation.execute({ label: '  Fegyver  ', maxCapacity: 2 });

            expect(slotRepository.create).toHaveBeenCalledWith({ label: 'Fegyver', maxCapacity: 2 });
        });

        it('should return ALREADY_EXISTS when only the casing differs', async () => {
            slotRepository.findByLabelIgnoreCase.mockResolvedValue({ id: 5, label: 'fegyver', maxCapacity: 1 });

            const result = await slotCreation.execute({ label: 'Fegyver', maxCapacity: 2 });

            expect(result.status).toBe(SlotCreationResult.ALREADY_EXISTS);
        });
    });

    describe('SlotRemoval', () => {
        let slotRemoval: SlotRemoval;

        beforeEach(() => {
            slotRemoval = new SlotRemovalImpl(slotRepository);
        });

        it('should delete the slot and return DELETED', async () => {
            slotRepository.findById.mockResolvedValue({ id: 3, label: 'Fegyver', maxCapacity: 1 });

            const result = await slotRemoval.execute({ id: 3 });

            expect(result.status).toBe(SlotRemovalResult.DELETED);
            expect(slotRepository.delete).toHaveBeenCalledWith(3);
        });

        it('should return NOT_FOUND when the slot does not exist', async () => {
            slotRepository.findById.mockResolvedValue(null);

            const result = await slotRemoval.execute({ id: 404 });

            expect(result.status).toBe(SlotRemovalResult.NOT_FOUND);
            expect(slotRepository.delete).not.toHaveBeenCalled();
        });
    });
});
