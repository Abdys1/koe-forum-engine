import UserModel from '#src/components/user/UserModel.js';

async function findPwdByUsername(username) {
  const result = await UserModel.findOne({ username }, { password: true }).exec();
  return result?.password;
}

async function existsByUsername(username) {
  return !!(await UserModel.exists({ username }).exec());
}

function save() {

}

export default {
  findPwdByUsername,
  existsByUsername,
  save,
};
