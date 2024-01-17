import UserModel from '#src/components/user/user.model';

async function findPwdByUsername(username: string) {
  const result = await UserModel.findOne({ username }, { password: true });
  return result?.password;
}

async function existsByUsername(username: string) {
  return !!(await UserModel.exists({ username }));
}

// TODO normális típust neki
async function save(user: any) {
  await UserModel.create(user);
}

export default {
  findPwdByUsername,
  existsByUsername,
  save,
};
