import { db } from "@src/prisma-client";

beforeEach(async () => {
    await db.$transaction([
        db.character.deleteMany(),
        db.forumUser.deleteMany()
    ]);
});