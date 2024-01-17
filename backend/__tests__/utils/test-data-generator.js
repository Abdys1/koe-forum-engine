let usernameNumber = 0;
let passwordNumber = 0;

function generateUsername() {
  usernameNumber += 1;
  return `test_user_${usernameNumber}`;
}

function generatePassword() {
  passwordNumber += 1;
  return `test_pwd_${passwordNumber}`;
}

export {
  generateUsername,
  generatePassword,
};
