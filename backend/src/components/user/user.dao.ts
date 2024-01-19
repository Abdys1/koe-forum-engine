import UserModel from '@src/components/user/user.model';
import { ForumUser, UserDao } from '@src/components/user/types';

class UserDaoImpl implements UserDao {

  public constructor() {}
  
  public async findPwdByUsername(username: string): Promise<string | null | undefined> {
    const result = await UserModel.findOne({ username }, { password: true });
    return result?.password;
  }
  
  public async existsByUsername(username: string): Promise<boolean> {
    return !!(await UserModel.exists({ username }));
  }
  
  public async save(user: ForumUser): Promise<void> {
    await UserModel.create(user);
  }
}

export default UserDaoImpl;