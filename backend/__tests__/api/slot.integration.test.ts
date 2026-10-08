import { ErrorMessages } from "@src/messages";
import SlotClient from "@test/clients/slot-client";
import { generateSlotLabel, saveSlotToDb } from "@test/utils/test-data-generator";
import { describe, it } from "vitest";

interface SlotResponseItem {
    id: number;
    label: string;
    maxCapacity: number;
}

describe('/api/equipment/slot', () => {
    let slotClient: SlotClient;

    beforeAll(async () => {
        slotClient = new SlotClient();
    });

    describe('GET /', () => {
        it('when there is no slot then should return an empty list', async () => {
            const resp = await slotClient.getAllSlots();

            expect(resp.status).toBe(200);
            expect(resp.body.slots).toStrictEqual([]);
        });

        it('when there are slots then should return them with their label and max capacity', async () => {
            const slot = await saveSlotToDb({ label: 'Fegyver', maxCapacity: 2 });

            const resp = await slotClient.getAllSlots();

            expect(resp.status).toBe(200);
            expect(resp.body.slots).toStrictEqual([
                { id: slot.id, label: 'Fegyver', maxCapacity: 2 }
            ]);
        });
    });

    describe('POST /', () => {
        it('when create a slot then it should appear in the list', async () => {
            const label = generateSlotLabel();

            const createResp = await slotClient.createSlot({ label, maxCapacity: 2 });

            expect(createResp.status).toBe(201);
            const listResp = await slotClient.getAllSlots();
            expect(listResp.body.slots.map((item: SlotResponseItem) => item.id)).toContain(createResp.body.id);
        });

        it('when create a slot then should return the created slot with its id', async () => {
            const label = generateSlotLabel();

            const createResp = await slotClient.createSlot({ label, maxCapacity: 2 });

            expect(createResp.status).toBe(201);
            expect(createResp.body.id).toBeDefined();
            expect(createResp.body.label).toBe(label);
            expect(createResp.body.maxCapacity).toBe(2);
        });

        it('when create a slot with an already used label then should return already exists error', async () => {
            const existing = await saveSlotToDb();

            const createResp = await slotClient.createSlot({ label: existing.label, maxCapacity: 3 });

            expect(createResp.status).toBe(409);
            expect(createResp.body).toStrictEqual({
                errorCode: ErrorMessages.SLOT_ALREADY_EXISTS
            });
        });

        it('when create a slot without a label then should return validation error', async () => {
            const createResp = await slotClient.createSlot({ maxCapacity: 1 });

            expect(createResp.status).toBe(400);
        });

        it('when create a slot with a max capacity below one then should return validation error', async () => {
            const createResp = await slotClient.createSlot({ label: generateSlotLabel(), maxCapacity: 0 });

            expect(createResp.status).toBe(400);
        });
    });

    describe('DELETE /:id', () => {
        it('when delete a slot then it should disappear from the list', async () => {
            const slot = await saveSlotToDb();

            const deleteResp = await slotClient.deleteSlot(slot.id);

            expect(deleteResp.status).toBe(204);
            const listResp = await slotClient.getAllSlots();
            expect(listResp.body.slots).toStrictEqual([]);
        });

        it('when delete a non-existent slot then should return not exists error', async () => {
            const deleteResp = await slotClient.deleteSlot(-1);

            expect(deleteResp.status).toBe(404);
            expect(deleteResp.body).toStrictEqual({
                errorCode: ErrorMessages.SLOT_NOT_EXISTS
            });
        });
    });
});
