class UserDao {
  #db;

  constructor(db) {
    this.#db = db;
  }

  async findPwdByUsername(username) {
    const result = await this.#db('forum_user')
      .where('username', username)
      .first('password');
    return result?.password;
  }

  async existsByUsername(username) {
    const result = await this.#db('forum_user')
      .where('username', username)
      .count();
    return Number(result[0].count) > 0;
  }
}

export default UserDao;
