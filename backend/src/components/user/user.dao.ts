import { PrismaClient } from '@prisma/client';
import { ForumUser, UserDao } from '@src/components/user/types';

class UserDaoImpl implements UserDao {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  public async findPwdByUsername(username: string): Promise<string> {
    const result = await this.db.forumUser.findFirstOrThrow({ select: { password: true }, where: { username } });
    return result.password;
  }

  public async existsByUsername(username: string): Promise<boolean> {
    const count = await this.db.forumUser.count({ where: { username } });
    return count > 0;
  }

  public async save(user: ForumUser): Promise<void> {
    await this.db.forumUser.create({
      data: {
        username: user.username,
        password: user.password
      }
    });
  }
}

export default UserDaoImpl;