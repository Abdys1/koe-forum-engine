import {
  beforeAll, describe, expect, it,
} from 'vitest';
import UserDao from 'components/user/UserDao';
import db from 'db/index';
import migrateDatabase from '__tests__/test-utils/migrations';

describe('User dao ', () => {
  let userDao: UserDao;

  beforeAll(async () => {
    await migrateDatabase();
    await db('forum_user').insert({ username: 'test_user', password: 'alma' });
    userDao = new UserDao(db);
  });

  describe('findPwdByUsername()', () => {
    it('should return password hash when has user', async () => {
      const pwd = await userDao.findPwdByUsername('test_user');
      expect(pwd).toBe('alma');
    });

    it('should return undefined when has not user with username', async () => {
      const pwd = await userDao.findPwdByUsername('fake_user');
      expect(pwd).toBeUndefined();
    });
  });
});
