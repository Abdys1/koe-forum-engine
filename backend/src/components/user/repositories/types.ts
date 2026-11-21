import UserProfile from "@src/components/user/models/user-profile";

export interface UserRepository {
    findProfileById: (userId: number) => Promise<UserProfile | null>;
    setActiveCharacter: (userId: number, characterId: number) => Promise<void>;
}
