import { db } from "@src/prisma-client";

export async function saveTestUserToDb(): Promise<{ id: number, username: string, password: string }> {
  return db.forumUser.create({ data: createRandomUser() });
}

export function createRandomUser(): { username: string, password: string } {
  return { username: generateUsername(), password: generatePassword() };
}

export function generateUsername(): string {
  return `test_user_${Math.floor(Date.now() * Math.random())}`;
}

export function generatePassword(): string {
  return `Test_pwd_${Math.floor(Date.now() * Math.random())}`;
}