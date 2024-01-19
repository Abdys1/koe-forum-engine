import { generateUsername, generatePassword } from '@test/utils/test-data-generator';
import { ForumUser, UserDao } from '@src/components/user/types';

class FakeUserDao implements UserDao {
  private fakeUsers: ForumUser[];

  public constructor() {
    this.fakeUsers = [];
  }

  public static createTestUser(): ForumUser {
    return { username: generateUsername(), password: generatePassword() };
  }

  public async findPwdByUsername(username: string): Promise<string | undefined> {
    if (!username) {
      throw new Error('Username undefined!');
    }
    const result = this.fakeUsers.find((user) => user.username === username);
    return result?.password;
  }

  public async existsByUsername(username: string): Promise<boolean> {
    return this.fakeUsers.some((user) => user.username === username);
  }

  public async save(user: ForumUser): Promise<void> {
    this.fakeUsers.push(user);
  }

  public isUserSaved(user: ForumUser): boolean {
    return this.fakeUsers.some(
      (fakeUser) => user.username === fakeUser.username && user.password === fakeUser.password,
    );
  }
}

export default FakeUserDao;
