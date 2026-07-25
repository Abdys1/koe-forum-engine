import { EquipmentTypeRepository } from '@src/components/equipment-type/repositories/types';
import EquipmentTypeCollectionImpl from '@src/components/equipment-type/usecases/collection/equipment-type-collection';
import { EquipmentTypeCollection } from '@src/components/equipment-type/usecases/collection/types';
import EquipmentTypeCreationImpl from '@src/components/equipment-type/usecases/creation/equipment-type-creation';
import { EquipmentTypeCreation, EquipmentTypeCreationResult } from '@src/components/equipment-type/usecases/creation/types';
import EquipmentTypeModificationImpl from '@src/components/equipment-type/usecases/modification/equipment-type-modification';
import { EquipmentTypeModification, EquipmentTypeModificationResult } from '@src/components/equipment-type/usecases/modification/types';
import EquipmentTypeRemovalImpl from '@src/components/equipment-type/usecases/removal/equipment-type-removal';
import { EquipmentTypeRemoval, EquipmentTypeRemovalResult } from '@src/components/equipment-type/usecases/removal/types';
import { beforeEach, describe, expect, it, Mocked, vi } from 'vitest';

describe('equipment-type use cases', () => {
    let equipmentTypeRepository: Mocked<EquipmentTypeRepository>;

    beforeEach(() => {
        equipmentTypeRepository = {
            findAll: vi.fn().mockResolvedValue([]),
            findById: vi.fn().mockResolvedValue(null),
            findByLabelIgnoreCase: vi.fn().mockResolvedValue(null),
            countEquipmentByTypeId: vi.fn().mockResolvedValue(0),
            create: vi.fn().mockImplementation(async (entity) => ({ id: 1, ...entity })),
            update: vi.fn().mockImplementation(async (id, label) => ({ id, label })),
            delete: vi.fn().mockResolvedValue(undefined),
        };
    });

    describe('EquipmentTypeCollection', () => {
        let equipmentTypeCollection: EquipmentTypeCollection;

        beforeEach(() => {
            equipmentTypeCollection = new EquipmentTypeCollectionImpl(equipmentTypeRepository);
        });

        it('should return the types provided by the database', async () => {
            equipmentTypeRepository.findAll.mockResolvedValue([
                { id: 2, label: 'Fejvédő' },
                { id: 1, label: 'Pajzs' },
            ]);

            const result = await equipmentTypeCollection.execute();

            expect(result).toStrictEqual([
                { id: 2, label: 'Fejvédő' },
                { id: 1, label: 'Pajzs' },
            ]);
        });

        it('should return an empty list when there is no type', async () => {
            const result = await equipmentTypeCollection.execute();

            expect(result).toStrictEqual([]);
        });
    });

    describe('EquipmentTypeCreation', () => {
        let equipmentTypeCreation: EquipmentTypeCreation;

        beforeEach(() => {
            equipmentTypeCreation = new EquipmentTypeCreationImpl(equipmentTypeRepository);
        });

        it('should create the type and return CREATED', async () => {
            const result = await equipmentTypeCreation.execute({ label: 'Gyűrű' });

            expect(result.status).toBe(EquipmentTypeCreationResult.CREATED);
            expect(result.equipmentType).toStrictEqual({ id: 1, label: 'Gyűrű' });
        });

        it('should return ALREADY_EXISTS when the label is taken', async () => {
            equipmentTypeRepository.findByLabelIgnoreCase.mockResolvedValue({ id: 5, label: 'Gyűrű' });

            const result = await equipmentTypeCreation.execute({ label: 'Gyűrű' });

            expect(result.status).toBe(EquipmentTypeCreationResult.ALREADY_EXISTS);
            expect(equipmentTypeRepository.create).not.toHaveBeenCalled();
        });

        it('should trim the label before saving it', async () => {
            await equipmentTypeCreation.execute({ label: '  Gyűrű  ' });

            expect(equipmentTypeRepository.create).toHaveBeenCalledWith({ label: 'Gyűrű' });
        });

        it('should check uniqueness with the trimmed label', async () => {
            equipmentTypeRepository.findByLabelIgnoreCase.mockResolvedValue({ id: 5, label: 'Gyűrű' });
            await equipmentTypeCreation.execute({ label: '  Gyűrű  ' });

            expect(equipmentTypeRepository.create).not.toHaveBeenCalledWith({ label: 'Gyűrű' });
        });

        it('should return ALREADY_EXISTS when only the casing differs', async () => {
            equipmentTypeRepository.findByLabelIgnoreCase.mockResolvedValue({ id: 5, label: 'Pajzs' });

            const result = await equipmentTypeCreation.execute({ label: 'pajzs' });

            expect(result.status).toBe(EquipmentTypeCreationResult.ALREADY_EXISTS);
        });
    });

    describe('EquipmentTypeModification', () => {
        let equipmentTypeModification: EquipmentTypeModification;

        beforeEach(() => {
            equipmentTypeModification = new EquipmentTypeModificationImpl(equipmentTypeRepository);
        });

        it('should update the label and return UPDATED', async () => {
            equipmentTypeRepository.findById.mockResolvedValue({ id: 3, label: 'Régi név' });

            const result = await equipmentTypeModification.execute({ id: 3, label: 'Új név' });

            expect(result.status).toBe(EquipmentTypeModificationResult.UPDATED);
            expect(equipmentTypeRepository.update).toHaveBeenCalledWith(3, 'Új név');
        });

        it('should return NOT_FOUND when the type does not exist', async () => {
            equipmentTypeRepository.findById.mockResolvedValue(null);

            const result = await equipmentTypeModification.execute({ id: 404, label: 'Bármi' });

            expect(result.status).toBe(EquipmentTypeModificationResult.NOT_FOUND);
            expect(equipmentTypeRepository.update).not.toHaveBeenCalled();
        });

        it('should return ALREADY_EXISTS when another type has the label', async () => {
            equipmentTypeRepository.findById.mockResolvedValue({ id: 3, label: 'Régi név' });
            equipmentTypeRepository.findByLabelIgnoreCase.mockResolvedValue({ id: 9, label: 'Pajzs' });

            const result = await equipmentTypeModification.execute({ id: 3, label: 'Pajzs' });

            expect(result.status).toBe(EquipmentTypeModificationResult.ALREADY_EXISTS);
            expect(equipmentTypeRepository.update).not.toHaveBeenCalled();
        });

        it('should return UPDATED when the type keeps its own label', async () => {
            equipmentTypeRepository.findById.mockResolvedValue({ id: 3, label: 'Pajzs' });
            equipmentTypeRepository.findByLabelIgnoreCase.mockResolvedValue({ id: 3, label: 'Pajzs' });

            const result = await equipmentTypeModification.execute({ id: 3, label: 'Pajzs' });

            expect(result.status).toBe(EquipmentTypeModificationResult.UPDATED);
        });

        it('should trim the label before saving it', async () => {
            equipmentTypeRepository.findById.mockResolvedValue({ id: 3, label: 'Régi név' });

            await equipmentTypeModification.execute({ id: 3, label: '  Új név  ' });

            expect(equipmentTypeRepository.update).toHaveBeenCalledWith(3, 'Új név');
        });
    });

    describe('EquipmentTypeRemoval', () => {
        let equipmentTypeRemoval: EquipmentTypeRemoval;

        beforeEach(() => {
            equipmentTypeRemoval = new EquipmentTypeRemovalImpl(equipmentTypeRepository);
        });

        it('should delete the type and return DELETED', async () => {
            equipmentTypeRepository.findById.mockResolvedValue({ id: 3, label: 'Pajzs' });

            const result = await equipmentTypeRemoval.execute({ id: 3 });

            expect(result.status).toBe(EquipmentTypeRemovalResult.DELETED);
            expect(equipmentTypeRepository.delete).toHaveBeenCalledWith(3);
        });

        it('should return NOT_FOUND when the type does not exist', async () => {
            equipmentTypeRepository.findById.mockResolvedValue(null);

            const result = await equipmentTypeRemoval.execute({ id: 404 });

            expect(result.status).toBe(EquipmentTypeRemovalResult.NOT_FOUND);
            expect(equipmentTypeRepository.delete).not.toHaveBeenCalled();
        });

        it('should return IN_USE when an equipment references the type', async () => {
            equipmentTypeRepository.findById.mockResolvedValue({ id: 3, label: 'Pajzs' });
            equipmentTypeRepository.countEquipmentByTypeId.mockResolvedValue(1);

            const result = await equipmentTypeRemoval.execute({ id: 3 });

            expect(result.status).toBe(EquipmentTypeRemovalResult.IN_USE);
            expect(equipmentTypeRepository.delete).not.toHaveBeenCalled();
        });

        it('should return IN_USE regardless of how many equipment reference the type', async () => {
            equipmentTypeRepository.findById.mockResolvedValue({ id: 3, label: 'Pajzs' });
            equipmentTypeRepository.countEquipmentByTypeId.mockResolvedValue(17);

            const result = await equipmentTypeRemoval.execute({ id: 3 });

            expect(result.status).toBe(EquipmentTypeRemovalResult.IN_USE);
        });
    });
});
