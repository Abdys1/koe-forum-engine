import { RepositoryProvider } from '@src/components/transaction/types';

export function fakeRepositoryProvider<R>(repository: R): RepositoryProvider<R> {
    return { get: () => repository, inTransaction: () => repository };
}
