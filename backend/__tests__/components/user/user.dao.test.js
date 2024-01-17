import mongoose from 'mongoose';
import {
  beforeAll, beforeEach, describe, expect, it,
} from 'vitest';

import logger from '#src/components/logger/logger.js';
import { userDao } from '#src/components/user/index.js';
import UserModel from '#src/components/user/user.model.js';
import config from '#src/Config.js';

describe('User dao ', () => {
  beforeAll(async () => {
    await mongoose.connect(config.database.url);
  });

  beforeEach(async () => {
    try {
      await UserModel.collection.drop();
    } catch (err) {
      logger.error(err);
    }
    await UserModel.create({ username: 'test_user', password: 'alma' });
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

  describe('save()', () => {
    it('should create a new entry on user collection', async () => {
      const newUser = { username: 'test_user_2', password: 'alma_2' };
      await userDao.save(newUser);
      const savedUser = await UserModel.findOne({ username: newUser.username });
      expect(savedUser).toBeTruthy();
      expect(savedUser.password).toBe(newUser.password);
    });
  });
});
