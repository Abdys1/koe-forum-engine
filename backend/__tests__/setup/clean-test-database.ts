import { db } from "@test/utils/test-container";

beforeEach(async () => {
    await db.$transaction([
        db.characterEquipment.deleteMany(),
        db.character.deleteMany(),
        db.race.deleteMany(),
        db.forumUser.deleteMany(),
        db.equipment.deleteMany(),
        db.equipmentType.deleteMany(),
        db.slot.deleteMany()
    ]);
});
