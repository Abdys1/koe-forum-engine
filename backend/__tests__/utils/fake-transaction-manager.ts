import { Rollback, TransactionContext, TransactionManager } from '@src/components/transaction/types';

export function fakeTransactionManager(): TransactionManager {
    return {
        execute: async (work) => {
            const result = await work({} as TransactionContext);
            return result instanceof Rollback ? result.result : result;
        }
    };
}
