import { AsyncLocalStorage } from "node:async_hooks";

import { PrismaClient } from "@prisma/client";
import PrismaTransactionContext from "@src/components/transaction/prisma-transaction-context";
import { NestedTransactionError, Rollback, TransactionContext, TransactionManager } from "@src/components/transaction/types";

class RollbackSignal<T> extends Error {
    constructor(readonly result: T) {
        super("Transaction rolled back");
    }
}

export default class PrismaTransactionManager implements TransactionManager {
    private readonly activeTransaction = new AsyncLocalStorage<true>();

    constructor(private readonly db: PrismaClient) {}

    public execute = async <T>(work: (context: TransactionContext) => Promise<T | Rollback<T>>): Promise<T> => {
        if (this.activeTransaction.getStore()) {
            throw new NestedTransactionError();
        }
        try {
            return await this.db.$transaction((tx) => this.activeTransaction.run(true, async () => {
                const result = await work(new PrismaTransactionContext(tx).asTransactionContext());
                if (result instanceof Rollback) {
                    throw new RollbackSignal(result.result);
                }
                return result;
            }));
        } catch (error) {
            if (error instanceof RollbackSignal) {
                return error.result as T;
            }
            throw error;
        }
    };
}
