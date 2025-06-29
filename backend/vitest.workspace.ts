import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
    {
        extends: './vitest.config.ts',
        test: {
            name: 'unit',
            include: ['**/*.unit.test.ts'],
            exclude: ['config/**']
        },
    },
    {
        extends: './vitest.config.ts',
        test: {
            name: 'integration',
            include: ['**/*.integration.test.ts'],
            exclude: ['config/**'],
            globals: true,
            globalSetup: ['./__tests__/setup/setup-test-database.ts'],
            setupFiles: ['./__tests__/setup/clean-test-database.ts']
        },
    }
]);