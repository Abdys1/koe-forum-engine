import { Prisma } from "@prisma/client";
import { TransactionContext } from "@src/components/transaction/types";
import { DbClient } from "@src/prisma-client";

export type RepositoryFactory<R> = (db: DbClient) => R;

export default class PrismaTransactionContext {
    private readonly repositories = new Map<RepositoryFactory<unknown>, unknown>();

    constructor(private readonly client: Prisma.TransactionClient) {}

    public static from = (context: TransactionContext): PrismaTransactionContext => context as unknown as PrismaTransactionContext;

    public asTransactionContext = (): TransactionContext => this as unknown as TransactionContext;

    public get = <R>(factory: RepositoryFactory<R>): R => {
        if (!this.repositories.has(factory)) {
            this.repositories.set(factory, factory(this.client));
        }
        return this.repositories.get(factory) as R;
    };
}
