import { UserEntity } from '@src/components/user/types';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema<UserEntity>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const UserModel = mongoose.model<UserEntity>('ForumUser', userSchema);
