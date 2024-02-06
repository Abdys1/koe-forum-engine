import mongoose from 'mongoose';
import { ForumUser } from '@src/components/user/types';

const userSchema = new mongoose.Schema<ForumUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export default mongoose.model<ForumUser>('ForumUser', userSchema);
