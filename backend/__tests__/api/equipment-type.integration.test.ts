import { Sex } from "@src/components/character/types";
import { ErrorMessages } from "@src/messages";
import { db } from "@src/prisma-client";
import CharacterClient from "@test/clients/character-client";
import EquipmentClient from "@test/clients/equipment-client";
import EquipmentTypeClient from "@test/clients/equipment-type-client";
import {
    generateEquipmentName,
    generateEquipmentTypeLabel,
    saveEquipmentToDb,
    saveEquipmentTypeToDb,
    saveSlotToDb,
    saveTestUserToDb
} from "@test/utils/test-data-generator";
import { describe, it } from "vitest";

interface EquipmentTypeResponseItem {
    id: number;
    label: string;
}

describe('/api/equipment/type', () => {
    let equipmentTypeClient: EquipmentTypeClient;
    let equipmentClient: EquipmentClient;
    let characterClient: CharacterClient;

    beforeAll(async () => {
        equipmentTypeClient = new EquipmentTypeClient();
        equipmentClient = new EquipmentClient();
        characterClient = new CharacterClient();
    });

    describe('GET /', () => {
        it('when there is no type then should return an empty list', async () => {
            const resp = await equipmentTypeClient.getAllEquipmentTypes();

            expect(resp.status).toBe(200);
            expect(resp.body.equipmentTypes).toStrictEqual([]);
        });

        it('when there are types then should return all of them with id and label', async () => {
            const type = await saveEquipmentTypeToDb('Pajzs');

            const resp = await equipmentTypeClient.getAllEquipmentTypes();

            expect(resp.status).toBe(200);
            expect(resp.body.equipmentTypes).toStrictEqual([{ id: type.id, label: 'Pajzs', slotId: null }]);
        });

        /*
         * sortOrder mező nincs, a sorrend a label szerinti ábécésorrend.
         */
        it('when there are multiple types then should return them ordered by label', async () => {
            await saveEquipmentTypeToDb('Pajzs');
            await saveEquipmentTypeToDb('Fejvédő');
            await saveEquipmentTypeToDb('Testpáncél');

            const resp = await equipmentTypeClient.getAllEquipmentTypes();

            expect(resp.status).toBe(200);
            expect(resp.body.equipmentTypes.map((item: EquipmentTypeResponseItem) => item.label))
                .toStrictEqual(['Fejvédő', 'Pajzs', 'Testpáncél']);
        });
    });

    describe('POST /', () => {
        it('when create a type then it should appear in the list', async () => {
            const label = generateEquipmentTypeLabel();

            const createResp = await equipmentTypeClient.createEquipmentType({ label });

            expect(createResp.status).toBe(201);
            const listResp = await equipmentTypeClient.getAllEquipmentTypes();
            expect(listResp.body.equipmentTypes.map((item: EquipmentTypeResponseItem) => item.label))
                .toContain(label);
        });

        it('when create a type then should return the created type with its id', async () => {
            const label = generateEquipmentTypeLabel();

            const createResp = await equipmentTypeClient.createEquipmentType({ label });

            expect(createResp.status).toBe(201);
            expect(createResp.body.id).toBeDefined();
            expect(createResp.body.label).toBe(label);
        });

        it('when create a type with an already used label then should return already exists error', async () => {
            const existing = await saveEquipmentTypeToDb();

            const createResp = await equipmentTypeClient.createEquipmentType({ label: existing.label });

            expect(createResp.status).toBe(409);
            expect(createResp.body).toStrictEqual({
                errorCode: ErrorMessages.EQUIPMENT_TYPE_ALREADY_EXISTS
            });
        });

        /*
         * A label egyszerre azonosító és megjelenített név, ezért a csak kis-nagybetűben
         * vagy körülvevő szóközben eltérő értékek nem hozhatnak létre új típust —
         * különben a UI-n megkülönböztethetetlen duplikátumok keletkeznek.
         */
        it('when create a type differing only in casing then should return already exists error', async () => {
            await saveEquipmentTypeToDb('Pajzs');

            const createResp = await equipmentTypeClient.createEquipmentType({ label: 'pajzs' });

            expect(createResp.status).toBe(409);
            expect(createResp.body).toStrictEqual({
                errorCode: ErrorMessages.EQUIPMENT_TYPE_ALREADY_EXISTS
            });
        });

        it('when create a type with surrounding whitespace then should store the trimmed label', async () => {
            const createResp = await equipmentTypeClient.createEquipmentType({ label: '  Gyűrű  ' });

            expect(createResp.status).toBe(201);
            expect(createResp.body.label).toBe('Gyűrű');
            const stored = await db.equipmentType.findFirst({ where: { label: 'Gyűrű' } });
            expect(stored).not.toBeNull();
        });

        it('when create a type differing only in surrounding whitespace then should return already exists error', async () => {
            await saveEquipmentTypeToDb('Gyűrű');

            const createResp = await equipmentTypeClient.createEquipmentType({ label: '  Gyűrű  ' });

            expect(createResp.status).toBe(409);
            expect(createResp.body).toStrictEqual({
                errorCode: ErrorMessages.EQUIPMENT_TYPE_ALREADY_EXISTS
            });
        });

        it('when create a type without label then should return validation error', async () => {
            const createResp = await equipmentTypeClient.createEquipmentType({});

            expect(createResp.status).toBe(400);
        });

        it('when create a type with an empty label then should return validation error', async () => {
            const createResp = await equipmentTypeClient.createEquipmentType({ label: '' });

            expect(createResp.status).toBe(400);
        });

        it('when create a type with a whitespace only label then should return validation error', async () => {
            const createResp = await equipmentTypeClient.createEquipmentType({ label: '   ' });

            expect(createResp.status).toBe(400);
        });

        it('when create a type with a too long label then should return validation error', async () => {
            const createResp = await equipmentTypeClient.createEquipmentType({ label: 'a'.repeat(129) });

            expect(createResp.status).toBe(400);
        });

        it('when create a type with an existing slotId then it should be assigned to that slot', async () => {
            const slot = await saveSlotToDb();

            const createResp = await equipmentTypeClient.createEquipmentType({ label: generateEquipmentTypeLabel(), slotId: slot.id });

            expect(createResp.status).toBe(201);
            expect(createResp.body.slotId).toBe(slot.id);
        });

        it('when create a type with a non-existent slotId then should return not exists error', async () => {
            const createResp = await equipmentTypeClient.createEquipmentType({ label: generateEquipmentTypeLabel(), slotId: -1 });

            expect(createResp.status).toBe(422);
            expect(createResp.body).toStrictEqual({
                errorCode: ErrorMessages.SLOT_NOT_EXISTS
            });
        });

        it('when two types are created with the same slotId then both should be assigned to it', async () => {
            const slot = await saveSlotToDb();

            const firstResp = await equipmentTypeClient.createEquipmentType({ label: generateEquipmentTypeLabel(), slotId: slot.id });
            const secondResp = await equipmentTypeClient.createEquipmentType({ label: generateEquipmentTypeLabel(), slotId: slot.id });

            expect(firstResp.status).toBe(201);
            expect(secondResp.status).toBe(201);
            expect(firstResp.body.slotId).toBe(slot.id);
            expect(secondResp.body.slotId).toBe(slot.id);
        });
    });

    describe('PUT /:id', () => {
        it('when rename a type then the list should return the new label', async () => {
            const type = await saveEquipmentTypeToDb('Régi név');

            const updateResp = await equipmentTypeClient.updateEquipmentType(type.id, { label: 'Új név' });

            expect(updateResp.status).toBe(200);
            const listResp = await equipmentTypeClient.getAllEquipmentTypes();
            expect(listResp.body.equipmentTypes).toStrictEqual([{ id: type.id, label: 'Új név', slotId: null }]);
        });

        /*
         * Az átnevezés nem érinti a típusra hivatkozó felszereléseket, mert a
         * hivatkozás alapja az id, nem a label.
         */
        it('when rename a type then the equipment referencing it should keep the reference', async () => {
            const type = await saveEquipmentTypeToDb('Régi név');
            const equipment = await saveEquipmentToDb({ typeId: type.id });

            const updateResp = await equipmentTypeClient.updateEquipmentType(type.id, { label: 'Új név' });

            expect(updateResp.status).toBe(200);
            const listResp = await equipmentClient.getAllEquipment();
            const found = listResp.body.equipments.find((item: { id: number }) => item.id === equipment.id);
            expect(found.type).toStrictEqual({ id: type.id, label: 'Új név', slotId: null });
        });

        it('when save a type with its own unchanged label then should not be a conflict', async () => {
            const type = await saveEquipmentTypeToDb('Pajzs');

            const updateResp = await equipmentTypeClient.updateEquipmentType(type.id, { label: 'Pajzs' });

            expect(updateResp.status).toBe(200);
        });

        it('when rename a type to a label used by another type then should return already exists error', async () => {
            const first = await saveEquipmentTypeToDb('Pajzs');
            const second = await saveEquipmentTypeToDb('Fejvédő');

            const updateResp = await equipmentTypeClient.updateEquipmentType(second.id, { label: first.label });

            expect(updateResp.status).toBe(409);
            expect(updateResp.body).toStrictEqual({
                errorCode: ErrorMessages.EQUIPMENT_TYPE_ALREADY_EXISTS
            });
        });

        it('when rename a type to another label differing only in casing then should return already exists error', async () => {
            await saveEquipmentTypeToDb('Pajzs');
            const second = await saveEquipmentTypeToDb('Fejvédő');

            const updateResp = await equipmentTypeClient.updateEquipmentType(second.id, { label: 'PAJZS' });

            expect(updateResp.status).toBe(409);
        });

        it('when rename a non-existent type then should return not exists error', async () => {
            const updateResp = await equipmentTypeClient.updateEquipmentType(-1, { label: 'Bármi' });

            expect(updateResp.status).toBe(404);
            expect(updateResp.body).toStrictEqual({
                errorCode: ErrorMessages.EQUIPMENT_TYPE_NOT_EXISTS
            });
        });

        it('when rename a type with an empty label then should return validation error', async () => {
            const type = await saveEquipmentTypeToDb();

            const updateResp = await equipmentTypeClient.updateEquipmentType(type.id, { label: '' });

            expect(updateResp.status).toBe(400);
        });
    });

    describe('DELETE /:id', () => {
        it('when delete an unused type then it should disappear from the list', async () => {
            const type = await saveEquipmentTypeToDb();

            const deleteResp = await equipmentTypeClient.deleteEquipmentType(type.id);

            expect(deleteResp.status).toBe(204);
            const listResp = await equipmentTypeClient.getAllEquipmentTypes();
            expect(listResp.body.equipmentTypes).toStrictEqual([]);
        });

        it('when delete a non-existent type then should return not exists error', async () => {
            const deleteResp = await equipmentTypeClient.deleteEquipmentType(-1);

            expect(deleteResp.status).toBe(404);
            expect(deleteResp.body).toStrictEqual({
                errorCode: ErrorMessages.EQUIPMENT_TYPE_NOT_EXISTS
            });
        });

        /*
         * A Prisma default Restrict amúgy is megakadályozná, de nyers DB-hiba helyett
         * explicit 409-et kell adni a use case rétegből.
         */
        it('when delete a type referenced by an equipment then should return in use error', async () => {
            const type = await saveEquipmentTypeToDb();
            await saveEquipmentToDb({ typeId: type.id });

            const deleteResp = await equipmentTypeClient.deleteEquipmentType(type.id);

            expect(deleteResp.status).toBe(409);
            expect(deleteResp.body).toStrictEqual({
                errorCode: ErrorMessages.EQUIPMENT_TYPE_IN_USE
            });
        });

        it('when delete a type referenced by an equipment then the type should remain', async () => {
            const type = await saveEquipmentTypeToDb();
            await saveEquipmentToDb({ typeId: type.id });

            await equipmentTypeClient.deleteEquipmentType(type.id);

            expect(await db.equipmentType.count({ where: { id: type.id } })).toBe(1);
        });

        it('when the referencing equipment is deleted then the type becomes deletable', async () => {
            const type = await saveEquipmentTypeToDb();
            const equipment = await saveEquipmentToDb({ typeId: type.id });
            await equipmentClient.deleteEquipment(equipment.id);

            const deleteResp = await equipmentTypeClient.deleteEquipmentType(type.id);

            expect(deleteResp.status).toBe(204);
        });
    });

    /*
     * A feature lényege: új felszerelés-típus vehető fel kódmódosítás és deploy
     * nélkül, és az azonnal végig használható a felszerelés- és karakter-létrehozásban.
     */
    describe('új típus végponton keresztül, kódmódosítás nélkül', () => {
        it('when a new type is created via the api then a character can be created with equipment of that type', async () => {
            const label = generateEquipmentTypeLabel();
            const createTypeResp = await equipmentTypeClient.createEquipmentType({ label });
            expect(createTypeResp.status).toBe(201);
            const typeId = createTypeResp.body.id;

            const listTypesResp = await equipmentTypeClient.getAllEquipmentTypes();
            expect(listTypesResp.body.equipmentTypes.map((item: EquipmentTypeResponseItem) => item.label))
                .toContain(label);

            const equipmentName = generateEquipmentName();
            const createEquipmentResp = await equipmentClient.createEquipment({
                name: equipmentName,
                typeId,
                description: 'Az új típusba tartozó felszerelés',
                slotCost: 1
            });
            expect(createEquipmentResp.status).toBe(201);
            const equipmentId = createEquipmentResp.body.id;

            const user = await saveTestUserToDb();
            const createCharacterResp = await characterClient.createCharacter(user.username, {
                name: 'Aragorn a Kósza',
                sex: Sex.MALE,
                race: 'human',
                equipmentIds: [equipmentId, equipmentId],
                imageUrl: '/aragorn.jpg'
            });

            expect(createCharacterResp.status).toBe(200);
            const charactersResp = await characterClient.getCharacters(user.username);
            const equipment = charactersResp.body[0].equipment;
            expect(equipment.length).toBe(2);
            equipment.forEach((item: { type: EquipmentTypeResponseItem }) => {
                expect(item.type).toStrictEqual({ id: typeId, label, slotId: null });
            });
        });
    });
});
