import { userDao } from '@src/components/user/index';
import { db } from '@src/prisma-client';
import { generateUsername } from '@test/utils/test-data-generator';
import {
  describe, expect, it
} from 'vitest';

describe('User dao ', () => {

  beforeEach(async () => {
    await db.character.deleteMany({});
    await db.forumUser.deleteMany({});
    await db.forumUser.create({
      data: { username: 'test_user', password: 'alma' }
    });
  });

  describe('findPwdByUsername()', () => {
    it('should return password hash when has user', () => {
      expect(userDao.findPwdByUsername('test_user')).resolves.toBe('alma');
    });

    it('should throw error when has not user with username', () => {
      expect(userDao.findPwdByUsername('fake_user')).rejects.toThrowError(new Error('No ForumUser found'));
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
  });

  describe('save()', () => {
    it('should create a new entry on user collection', async () => {
      const newUser = { username: generateUsername(), password: 'alma_2' };
      await userDao.save(newUser);
      const savedUser = await db.forumUser.findFirstOrThrow({ where: { username: newUser.username } });
      expect(savedUser).toBeTruthy();
      expect(savedUser.password).toBe(newUser.password);
    });
  });
});
