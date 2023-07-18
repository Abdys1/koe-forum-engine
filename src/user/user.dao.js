class UserDao {
  #db;

  constructor(db) {
    this.#db = db;
  }

  async findPwdByUsername(username) {
    return this.#db('forum_users')
      .where('username', username)
      .first('password');
  }
}

export default UserDao;
