import db from 'db/index.js';
import UserDao from 'components/user/UserDao.js';

const userDao = new UserDao(db);

export { userDao };
