import {
  afterAll, beforeAll, describe, expect, it,
} from 'vitest';
import { verify } from 'argon2';
import UserDao from '#src/user/UserDao.js';
import db from '#src/db/index.js';

describe('User dao findPwdByUsername()', () => {
  let userDao;

  beforeAll(async () => {
    await db.migrate.latest();
    await db.seed.run();
    userDao = new UserDao(db);
  });

  it('should return password hash when has user', async () => {
    const pwd = await userDao.findPwdByUsername('admin');
    expect(await verify(pwd, 'alma')).toBeTruthy();
  });

  it('should return undefined when has not user with username', async () => {
    const pwd = await userDao.findPwdByUsername('fake_admin');
    expect(pwd).toBeUndefined();
  });

  afterAll(async () => {
    await db.migrate.down();
  });
});
