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
}

export default UserDao;
