import { Types } from "mongoose";

export interface UserDao {
    findPwdByUsername: (username: string) => Promise<string | null | undefined>;
    existsByUsername: (username: string) => Promise<boolean>;
    save: (user: ForumUser) => Promise<void>;
}

export interface ForumUser {
    username: string;
    password: string;
}

export interface UserEntity {
    _id: Types.ObjectId,
    username: string,
    password: string
}