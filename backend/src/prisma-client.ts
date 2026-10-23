import { Prisma, PrismaClient } from "@prisma/client";

export type DbClient = PrismaClient | Prisma.TransactionClient;

export const createDbClient = () => new PrismaClient({
    //log: ["query", "error", "warn", "info"],
});
