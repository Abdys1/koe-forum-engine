import CharacterRepositoryImpl from "@src/components/character/repositories/character.repository";
import { CharacterRepository } from "@src/components/character/repositories/types";
import PrismaRepositoryProvider from "@src/components/transaction/prisma-repository-provider";
import { RepositoryProvider } from "@src/components/transaction/types";
import { db } from "@src/prisma-client";

const characterRepositories: RepositoryProvider<CharacterRepository> = new PrismaRepositoryProvider(
    db,
    (client) => new CharacterRepositoryImpl(client)
);

export { characterRepositories };
