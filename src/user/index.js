import db from '../db/index.js';
import UserDao from './UserDao.js';

const userDao = new UserDao(db);

export default userDao;
