import {
  afterAll,
  beforeAll, describe, expect, it,
} from 'vitest';
import UserModel from '#src/components/user/UserModel.js';
import { userDao } from '#src/components/user/index.js';
import mongoose from 'mongoose';
import config from '#src/Config.js';

describe('User dao ', () => {
  beforeAll(async () => {
    await mongoose.connect(config.database.url);
    const testUser = new UserModel({ username: 'test_user', password: 'alma' });
    await testUser.save();
  });

  describe('findPwdByUsername()', () => {
    it('should return password hash when has user', () => {
      expect(userDao.findPwdByUsername('test_user')).resolves.toBe('alma');
    });

    it('should return undefined when has not user with username', () => {
      expect(userDao.findPwdByUsername('fake_user')).resolves.toBeUndefined();
    });
  });

  describe('existsByUsername()', () => {
    it('should return true when username exists', () => {
      expect(userDao.existsByUsername('test_user')).resolves.toBe(true);
    });

    it('should return false when username doesnt exists', () => {
      expect(userDao.existsByUsername('fake_user')).resolves.toBe(false);
    });

    it('should return false when username empty', () => {
      expect(userDao.existsByUsername('')).resolves.toBe(false);
    });

    it('should return false when username null or undefined', () => {
      expect(userDao.existsByUsername(null)).resolves.toBe(false);
      expect(userDao.existsByUsername()).resolves.toBe(false);
    });
  });

  afterAll(async () => {
    await UserModel.deleteOne({ username: 'test_user' });
    await mongoose.connection.close();
  });
});
