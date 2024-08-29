import { db } from "@src/prisma-client";

export function generateUsername(): string {
  return `test_user_${Math.floor(Date.now() * Math.random())}`;
}

export function generatePassword(): string {
  return `Test_pwd_${Math.floor(Date.now() * Math.random())}`;
}

export async function saveTestUserToDb(): Promise<{ id: number, username: string, password: string }> {
  return db.forumUser.create({ data: { username: generateUsername(), password: generatePassword() } });
}