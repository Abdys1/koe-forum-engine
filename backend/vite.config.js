import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    globalSetup: ['./__tests__/setup/setup-test-database.js'],
  },
});
