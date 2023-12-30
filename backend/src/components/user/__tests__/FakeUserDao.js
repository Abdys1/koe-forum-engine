class FakeUserDao {
  FakeUserDao(...users) {
    this.fakeUsers = users;
  }

  async findPwdByUsername(username) {
    if (!username) {
      throw new Error('Username undefined!');
    }
    const result = this.fakeUsers.find((user) => user.username === username);
    return result?.passwd;
  }

  async existsByUsername(username) {
    return this.fakeUsers.some((user) => user.username === username);
  }

  async save(user) {
    this.fakeUsers.push(user);
  }

  // TODO ezt inkább a tesztnek kellene tudnia
  isUserSaved(username, pwd) {
    return this.fakeUsers
      .some((fakeUser) => username === fakeUser.username && pwd === fakeUser.password);
  }
}

export default FakeUserDao;
