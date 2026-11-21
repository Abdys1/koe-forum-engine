export interface UserClient {
    setActiveCharacter: (characterId: number) => Promise<void>
};
