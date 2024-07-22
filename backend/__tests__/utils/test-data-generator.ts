import UserModel from "@src/components/user/user.model";
import { UserEntity } from "@src/components/user/types";

let usernameNumber = 0;
let passwordNumber = 0;

export function generateUsername(): string {
  usernameNumber += 1;
  return `test_user_${usernameNumber}`;
}

export function generatePassword(): string {
  passwordNumber += 1;
  return `Test_pwd_${passwordNumber}`;
}

export async function saveTestUserToDb(): Promise<UserEntity> {
  return await UserModel.create({ username: generateUsername(), password: generatePassword() });
}