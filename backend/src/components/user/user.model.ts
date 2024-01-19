import mongoose from 'mongoose';
import { ForumUser } from '@src/components/user/types';

const userSchema = new mongoose.Schema<ForumUser>({
  username: String,
  password: String,
});

export default mongoose.model<ForumUser>('ForumUser', userSchema);
