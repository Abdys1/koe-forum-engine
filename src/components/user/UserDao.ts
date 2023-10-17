import { Knex } from "knex";

class UserDao {
  #db;

  constructor(db: Knex) {
    this.#db = db;
  }

  async findPwdByUsername(username: string | undefined | null) {
    const result = await this.#db('forum_user')
      .where('username', username)
      .first('password');
    return result?.password;
  }
}

export default UserDao;
