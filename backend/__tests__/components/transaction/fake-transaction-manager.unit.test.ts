import { rollback } from '@src/components/transaction/types';
import { fakeTransactionManager } from '@test/utils/fake-transaction-manager';
import { describe, expect, it } from 'vitest';

describe('fakeTransactionManager', () => {
    it('should return the result of the work', async () => {
        expect(await fakeTransactionManager().execute(async () => 'COMMITTED')).toBe('COMMITTED');
    });

    it('should unwrap the result of a rollback', async () => {
        expect(await fakeTransactionManager().execute(async () => rollback('ROLLED_BACK'))).toBe('ROLLED_BACK');
    });
});
