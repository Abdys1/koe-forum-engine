import UserModel from '#src/components/user/UserModel.js';

async function findPwdByUsername(username) {
  const result = await UserModel.findOne({ username }, { password: true });
  return result?.password;
}

async function existsByUsername(username) {
  return !!(await UserModel.exists({ username }));
}

async function save(user) {
  await UserModel.create(user);
}

export default {
  findPwdByUsername,
  existsByUsername,
  save,
};
