declare const transactionContextBrand: unique symbol;

export interface TransactionContext {
    readonly [transactionContextBrand]: true;
}

export class Rollback<T> {
    constructor(readonly result: T) {}
}

export const rollback = <T>(result: T): Rollback<T> => new Rollback(result);

export class NestedTransactionError extends Error {
    constructor() {
        super("A transaction cannot be started inside another transaction");
    }
}

export interface TransactionManager {
    execute: <T>(work: (context: TransactionContext) => Promise<T | Rollback<T>>) => Promise<T>;
}

export interface RepositoryProvider<R> {
    get: () => R;
    inTransaction: (context: TransactionContext) => R;
}
