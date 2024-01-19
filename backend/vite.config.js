import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  test: {
    globals: true,
    globalSetup: ['./__tests__/setup/setup-test-database.ts']
  },
  plugins: [tsconfigPaths()]
});
