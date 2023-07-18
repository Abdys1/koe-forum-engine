import db from '../db/index.js';
import UserDao from './user.dao.js';

const userDao = new UserDao(db);

export default userDao;
