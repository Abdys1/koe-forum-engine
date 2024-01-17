import { generateUsername, generatePassword } from '#test/utils/test-data-generator.js';

class FakeUserDao {
  constructor() {
    this.fakeUsers = [];
  }

  static createTestUser() {
    return { username: generateUsername(), password: generatePassword() };
  }

  async findPwdByUsername(username) {
    if (!username) {
      throw new Error('Username undefined!');
    }
    const result = this.fakeUsers.find((user) => user.username === username);
    return result?.password;
  }

  async existsByUsername(username) {
    return this.fakeUsers.some((user) => user.username === username);
  }

  async save(user) {
    this.fakeUsers.push(user);
  }

  isUserSaved(user) {
    return this.fakeUsers.some(
      (fakeUser) => user.username === fakeUser.username && user.password === fakeUser.password,
    );
  }
}

export default FakeUserDao;
