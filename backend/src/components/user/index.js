import db from '#src/db/index.js';
import UserDao from '#src/components/user/UserDao.js';

const userDao = new UserDao(db);

export { userDao };
