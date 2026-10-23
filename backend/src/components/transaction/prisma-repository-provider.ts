import PrismaTransactionContext, { RepositoryFactory } from "@src/components/transaction/prisma-transaction-context";
import { RepositoryProvider, TransactionContext } from "@src/components/transaction/types";
import { DbClient } from "@src/prisma-client";

export default class PrismaRepositoryProvider<R> implements RepositoryProvider<R> {
    private instance?: R;

    constructor(private readonly db: DbClient, private readonly factory: RepositoryFactory<R>) {}

    public get = (): R => {
        this.instance ??= this.factory(this.db);
        return this.instance;
    };

    public inTransaction = (context: TransactionContext): R => PrismaTransactionContext.from(context).get(this.factory);
}
