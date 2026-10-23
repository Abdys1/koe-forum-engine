import SlotRepositoryImpl from "@src/components/slot/repositories/slot.repository";
import { SlotRepository } from "@src/components/slot/repositories/types";
import PrismaRepositoryProvider from "@src/components/transaction/prisma-repository-provider";
import { RepositoryProvider } from "@src/components/transaction/types";
import { db } from "@src/prisma-client";

const slotRepositories: RepositoryProvider<SlotRepository> = new PrismaRepositoryProvider(
    db,
    (client) => new SlotRepositoryImpl(client)
);

export { slotRepositories };
