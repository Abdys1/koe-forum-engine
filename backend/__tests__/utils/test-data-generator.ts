import { UserModel } from "@src/components/user/user.model";
import { UserEntity } from "@src/components/user/types";

export function generateUsername(): string {
  return `test_user_${Math.floor(Date.now() * Math.random())}`;
}

export function generatePassword(): string {
  return `Test_pwd_${Math.floor(Date.now() * Math.random())}`;
}

export async function saveTestUserToDb(): Promise<UserEntity> {
  return await UserModel.create({ username: generateUsername(), password: generatePassword() });
}