import { db } from "@src/prisma-client";

beforeEach(async () => {
    await db.$transaction([
        db.characterEquipment.deleteMany(),
        db.character.deleteMany(),
        db.forumUser.deleteMany(),
        db.equipment.deleteMany(),
        db.equipmentType.deleteMany(),
        db.slot.deleteMany()
    ]);
});
