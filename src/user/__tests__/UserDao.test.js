import {
  beforeAll, describe, expect, it,
} from 'vitest';
import UserDao from '#src/user/UserDao.js';
import db from '#src/db/index.js';
import migrateDatabase from '#src/__tests__/utils/migrations.js';

describe('User dao findPwdByUsername()', () => {
  let userDao;

  beforeAll(async () => {
    await migrateDatabase();
    await db('forum_user').insert({ username: 'test_user', password: 'alma' });
    userDao = new UserDao(db);
  });

  it('should return password hash when has user', async () => {
    const pwd = await userDao.findPwdByUsername('test_user');
    expect(pwd).toBe('alma');
  });

  it('should return undefined when has not user with username', async () => {
    const pwd = await userDao.findPwdByUsername('fake_user');
    expect(pwd).toBeUndefined();
  });
});
