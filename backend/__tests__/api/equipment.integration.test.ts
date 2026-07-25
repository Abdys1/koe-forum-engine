import { Sex } from "@src/components/character/types";
import { ErrorMessages } from "@src/messages";
import { db } from "@src/prisma-client";
import CharacterClient from "@test/clients/character-client";
import EquipmentClient from "@test/clients/equipment-client";
import {
    generateEquipmentName,
    saveEquipmentListToDb,
    saveEquipmentToDb,
    saveEquipmentTypeToDb,
    saveTestUserToDb
} from "@test/utils/test-data-generator";
import { describe, it } from "vitest";

interface EquipmentResponseItem {
    id: number;
    name: string;
    description: string;
    type: { id: number; label: string };
}

describe('/api/equipment', () => {
    let equipmentClient: EquipmentClient;
    let characterClient: CharacterClient;

    beforeAll(async () => {
        equipmentClient = new EquipmentClient();
        characterClient = new CharacterClient();
    });

    describe('GET /', () => {
        it('when get all equipment then should return the equipment list from database', async () => {
            const type = await saveEquipmentTypeToDb();
            const equipmentList = await saveEquipmentListToDb(5, type.id);

            const resp = await equipmentClient.getAllEquipment();

            expect(resp.status).toBe(200);
            expect(resp.body.equipments).toBeInstanceOf(Array);
            expect(resp.body.equipments.length).toBe(equipmentList.length);
            resp.body.equipments.forEach((equipment: EquipmentResponseItem) => {
                const expectedEquipment = equipmentList.filter(eq => eq.name === equipment.name);
                expect(expectedEquipment.length).toBe(1);
                expect(equipment.id).toBe(expectedEquipment[0].id);
                expect(equipment.description).toBe(expectedEquipment[0].description);
            });
        });

        it('when get all equipment then every item should contain its type object', async () => {
            const type = await saveEquipmentTypeToDb('Pajzs');
            await saveEquipmentToDb({ typeId: type.id });

            const resp = await equipmentClient.getAllEquipment();

            expect(resp.status).toBe(200);
            expect(resp.body.equipments.length).toBe(1);
            expect(resp.body.equipments[0].type).toStrictEqual({ id: type.id, label: 'Pajzs' });
        });

        it('when there is no equipment then should return an empty list', async () => {
            const resp = await equipmentClient.getAllEquipment();

            expect(resp.status).toBe(200);
            expect(resp.body.equipments).toStrictEqual([]);
        });
    });

    describe('POST /', () => {
        it('when create equipment then should be returned by the list endpoint', async () => {
            const type = await saveEquipmentTypeToDb();
            const name = generateEquipmentName();

            const createResp = await equipmentClient.createEquipment({
                name,
                typeId: type.id,
                description: 'Egy vadonatúj felszerelés'
            });

            expect(createResp.status).toBe(201);
            const listResp = await equipmentClient.getAllEquipment();
            const created = listResp.body.equipments.find((item: EquipmentResponseItem) => item.name === name);
            expect(created).toBeDefined();
            expect(created.description).toBe('Egy vadonatúj felszerelés');
            expect(created.type).toStrictEqual({ id: type.id, label: type.label });
        });

        it('when create equipment then should return the created equipment with its id', async () => {
            const type = await saveEquipmentTypeToDb();
            const name = generateEquipmentName();

            const createResp = await equipmentClient.createEquipment({
                name,
                typeId: type.id,
                description: 'Leírás'
            });

            expect(createResp.status).toBe(201);
            expect(createResp.body.id).toBeDefined();
            expect(createResp.body.name).toBe(name);
        });

        it('when create equipment with a non-existent type then should return equipment type not exists error', async () => {
            const createResp = await equipmentClient.createEquipment({
                name: generateEquipmentName(),
                typeId: -1,
                description: 'Leírás'
            });

            expect(createResp.status).toBe(400);
            expect(createResp.body).toStrictEqual({
                errorCode: ErrorMessages.EQUIPMENT_TYPE_NOT_EXISTS
            });
        });

        it('when create equipment with an already used name and type then should return already exists error', async () => {
            const type = await saveEquipmentTypeToDb();
            const existing = await saveEquipmentToDb({ typeId: type.id });

            const createResp = await equipmentClient.createEquipment({
                name: existing.name,
                typeId: type.id,
                description: 'Másik leírás'
            });

            expect(createResp.status).toBe(409);
            expect(createResp.body).toStrictEqual({
                errorCode: ErrorMessages.EQUIPMENT_ALREADY_EXISTS
            });
        });

        it('when create equipment with the same name but a different type then should be accepted', async () => {
            const firstType = await saveEquipmentTypeToDb();
            const secondType = await saveEquipmentTypeToDb();
            const existing = await saveEquipmentToDb({ typeId: firstType.id });

            const createResp = await equipmentClient.createEquipment({
                name: existing.name,
                typeId: secondType.id,
                description: 'Más típus, ugyanaz a név'
            });

            expect(createResp.status).toBe(201);
        });

        it('when create equipment without name then should return validation error', async () => {
            const type = await saveEquipmentTypeToDb();

            const createResp = await equipmentClient.createEquipment({
                name: '',
                typeId: type.id,
                description: 'Leírás'
            });

            expect(createResp.status).toBe(400);
        });

        it('when create equipment without type id then should return validation error', async () => {
            const createResp = await equipmentClient.createEquipment({
                name: generateEquipmentName(),
                description: 'Leírás'
            });

            expect(createResp.status).toBe(400);
        });

        it('when create equipment with a non-numeric type id then should return validation error', async () => {
            const createResp = await equipmentClient.createEquipment({
                name: generateEquipmentName(),
                typeId: 'nem-szam',
                description: 'Leírás'
            });

            expect(createResp.status).toBe(400);
        });
    });

    describe('PUT /:id', () => {
        it('when update equipment then the list endpoint should return the new values', async () => {
            const type = await saveEquipmentTypeToDb();
            const equipment = await saveEquipmentToDb({ typeId: type.id });
            const newName = generateEquipmentName();

            const updateResp = await equipmentClient.updateEquipment(equipment.id, {
                name: newName,
                typeId: type.id,
                description: 'Frissített leírás'
            });

            expect(updateResp.status).toBe(200);
            const listResp = await equipmentClient.getAllEquipment();
            expect(listResp.body.equipments.length).toBe(1);
            expect(listResp.body.equipments[0].name).toBe(newName);
            expect(listResp.body.equipments[0].description).toBe('Frissített leírás');
        });

        it('when update equipment to another type then the response should contain the new type', async () => {
            const firstType = await saveEquipmentTypeToDb();
            const secondType = await saveEquipmentTypeToDb();
            const equipment = await saveEquipmentToDb({ typeId: firstType.id });

            const updateResp = await equipmentClient.updateEquipment(equipment.id, {
                name: equipment.name,
                typeId: secondType.id,
                description: equipment.description
            });

            expect(updateResp.status).toBe(200);
            const listResp = await equipmentClient.getAllEquipment();
            expect(listResp.body.equipments[0].type).toStrictEqual({ id: secondType.id, label: secondType.label });
        });

        it('when update a non-existent equipment then should return not exists error', async () => {
            const type = await saveEquipmentTypeToDb();

            const updateResp = await equipmentClient.updateEquipment(-1, {
                name: generateEquipmentName(),
                typeId: type.id,
                description: 'Leírás'
            });

            expect(updateResp.status).toBe(404);
            expect(updateResp.body).toStrictEqual({
                errorCode: ErrorMessages.EQUIPMENT_NOT_EXISTS
            });
        });

        it('when update equipment to a non-existent type then should return equipment type not exists error', async () => {
            const equipment = await saveEquipmentToDb();

            const updateResp = await equipmentClient.updateEquipment(equipment.id, {
                name: equipment.name,
                typeId: -1,
                description: equipment.description
            });

            expect(updateResp.status).toBe(400);
            expect(updateResp.body).toStrictEqual({
                errorCode: ErrorMessages.EQUIPMENT_TYPE_NOT_EXISTS
            });
        });
    });

    describe('DELETE /:id', () => {
        it('when delete equipment then it should disappear from the list', async () => {
            const equipment = await saveEquipmentToDb();

            const deleteResp = await equipmentClient.deleteEquipment(equipment.id);

            expect(deleteResp.status).toBe(204);
            const listResp = await equipmentClient.getAllEquipment();
            expect(listResp.body.equipments).toStrictEqual([]);
        });

        it('when delete a non-existent equipment then should return not exists error', async () => {
            const deleteResp = await equipmentClient.deleteEquipment(-1);

            expect(deleteResp.status).toBe(404);
            expect(deleteResp.body).toStrictEqual({
                errorCode: ErrorMessages.EQUIPMENT_NOT_EXISTS
            });
        });

        it('when delete equipment assigned to a character then should return in use error', async () => {
            const user = await saveTestUserToDb();
            const equipment = await saveEquipmentToDb();
            await characterClient.createCharacter(user.username, {
                name: 'Aragorn a Kósza',
                sex: Sex.MALE,
                race: 'human',
                equipmentIds: [equipment.id],
                imageUrl: '/aragorn.jpg'
            });

            const deleteResp = await equipmentClient.deleteEquipment(equipment.id);

            expect(deleteResp.status).toBe(409);
            expect(deleteResp.body).toStrictEqual({
                errorCode: ErrorMessages.EQUIPMENT_IN_USE
            });
            expect(await db.equipment.count({ where: { id: equipment.id } })).toBe(1);
        });

        it('when delete equipment assigned to a character multiple times then should return in use error', async () => {
            const user = await saveTestUserToDb();
            const equipment = await saveEquipmentToDb();
            await characterClient.createCharacter(user.username, {
                name: 'Aragorn a Kósza',
                sex: Sex.MALE,
                race: 'human',
                equipmentIds: [equipment.id, equipment.id, equipment.id],
                imageUrl: '/aragorn.jpg'
            });

            const deleteResp = await equipmentClient.deleteEquipment(equipment.id);

            expect(deleteResp.status).toBe(409);
            expect(deleteResp.body).toStrictEqual({
                errorCode: ErrorMessages.EQUIPMENT_IN_USE
            });
        });
    });
});
