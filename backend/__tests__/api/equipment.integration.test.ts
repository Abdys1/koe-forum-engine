import { EquipmentEntity, EquipmentType } from "@src/components/equipment/models/equipment";
import { EquipmentCollectionDetails } from "@src/components/equipment/usecases/collection/types";
import { db } from "@src/prisma-client";
import EquipmentClient from "@test/clients/equipment-client";
import { describe, it } from "vitest";

describe('/api/equipment', () => {
    let equipmentClient: EquipmentClient;

    beforeAll(async () => {
        equipmentClient = new EquipmentClient();
    });

    it('when get all equipment then should return the equipment list from database', async () => {
        const equipmentList = await populateTestEquipments();

        const resp = await equipmentClient.getAllEquipment();

        expect(resp.status).toBe(200);
        expect(resp.body.equipments).toBeInstanceOf(Array);
        expect(resp.body.equipments.length).toBe(equipmentList.length);
        resp.body.equipments.forEach((equipment: EquipmentCollectionDetails) => {
            const expectedEquipment = equipmentList.filter(eq => eq.name === equipment.name);
            expect(expectedEquipment.length).toBe(1);
            expect(equipment.id).toBeDefined();
            expect(equipment.name).toBe(expectedEquipment[0].name);
            expect(equipment.type).toBe(expectedEquipment[0].type);
            expect(equipment.description).toBe(expectedEquipment[0].description);
        });
    });

    async function populateTestEquipments(): Promise<EquipmentEntity[]> {
        const equipmentList: EquipmentEntity[] = [];

        const numberOfEquipments = Math.floor(Math.random() * 10) + 1;
        for (let i = 0; i < numberOfEquipments; i++) {
            const randomKey = Math.floor(Date.now() * Math.random());
            equipmentList.push({
                name: `equipment_${randomKey}`,
                type: Object.values(EquipmentType)[Math.floor(Math.random() * Object.values(EquipmentType).length)],
                description: `This is the ${randomKey} equipment`
            });
        }

        await db.equipment.createMany({ data: equipmentList });

        return equipmentList;
    }
});