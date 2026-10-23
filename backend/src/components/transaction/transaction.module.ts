import PrismaRepositoryProvider from "@src/components/transaction/prisma-repository-provider";
import { RepositoryFactory } from "@src/components/transaction/prisma-transaction-context";
import PrismaTransactionManager from "@src/components/transaction/prisma-transaction-manager";
import { RepositoryProvider } from "@src/components/transaction/types";
import { DbClient } from "@src/prisma-client";
import { asClass, asFunction } from "awilix";

export const transactionModule = {
    transactionManager: asClass(PrismaTransactionManager).singleton(),
};

export const repositoryProvider = <R>(factory: RepositoryFactory<R>) =>
    asFunction(({ db }: { db: DbClient }): RepositoryProvider<R> => new PrismaRepositoryProvider(db, factory)).singleton().proxy();
