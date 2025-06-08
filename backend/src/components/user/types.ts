export interface UserDao {
    findPwdByUsername: (username: string) => Promise<string>;
    findByUsername: (username: string) => Promise<ForumUser>;
    existsByUsername: (username: string) => Promise<boolean>;
    save: (user: ForumUser) => Promise<void>;
}

export interface ForumUser {
    id?: number;
    username: string;
    password: string;
}