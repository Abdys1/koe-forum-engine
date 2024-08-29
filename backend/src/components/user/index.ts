import UserDaoImpl from '@src/components/user/user.dao';
import { db } from '@src/prisma-client';

const userDao = new UserDaoImpl(db);

export { userDao };
