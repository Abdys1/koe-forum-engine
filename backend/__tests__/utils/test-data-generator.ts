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
