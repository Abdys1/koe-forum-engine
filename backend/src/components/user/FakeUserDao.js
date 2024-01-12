class FakeUserDao {
  static actualUserId = 0;

  constructor() {
    this.fakeUsers = [];
  }

  static createTestUser() {
    FakeUserDao.actualUserId += 1;
    return { username: `test_user_${FakeUserDao.actualUserId}`, password: `test_pwd_${FakeUserDao.actualUserId}` };
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
