import UserProfile from "@src/components/user/models/user-profile";
import { UserRepository } from "@src/components/user/repositories/types";
import { DbClient } from "@src/prisma-client";

export default class UserRepositoryImpl implements UserRepository {
    constructor(private readonly db: DbClient) {}

    public async findProfileById(userId: number): Promise<UserProfile | null> {
        return this.db.forumUser.findUnique({
            select: { id: true, username: true, activeCharacterId: true },
            where: { id: userId }
        });
    }

    public async setActiveCharacter(userId: number, characterId: number): Promise<void> {
        await this.db.forumUser.update({
            where: { id: userId },
            data: { activeCharacterId: characterId }
        });
    }
}
