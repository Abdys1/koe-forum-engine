import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
    {
        extends: './vitest.config.ts',
        test: {
            name: 'unit',
            include: ['**/*.unit.test.ts']
        },
    },
    {
        extends: './vitest.config.ts',
        test: {
            name: 'integration',
            include: ['**/*.integration.test.ts'],
            globals: true,
            globalSetup: ['./__tests__/api/setup/setup-test-database.ts']
        },
    }
]);