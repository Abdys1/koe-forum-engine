import db from '#src/db/index.js';
import UserDao from '#src/user/UserDao.js';

const userDao = new UserDao(db);

export { userDao };
