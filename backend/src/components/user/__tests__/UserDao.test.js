import {
  beforeAll, describe, expect, it,
} from 'vitest';
import UserDao from '#src/components/user/UserDao.js';
import db from '#src/db/index.js';
import migrateTestDatabase from '#src/__tests__/test-utils/migrations.js';

describe('User dao ', () => {
  let userDao;

  beforeAll(async () => {
    await migrateTestDatabase();
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

  describe('existsByUsername()', () => {
    it('should return true when username exists', () => {
      expect(userDao.existsByUsername('test_user')).resolves.toBe(true);
    });

    it('should return false when username doesnt exists', () => {
      expect(userDao.existsByUsername('test_user2')).resolves.toBe(false);
    });
  });
});
