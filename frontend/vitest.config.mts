import { fileURLToPath } from "node:url";

import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { defineConfig } from "vitest/config";

export default defineConfig({
    plugins: [vanillaExtractPlugin()],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    test: {
        include: ["src/**/*.unit.test.{ts,tsx}"],
        environment: "node",
    },
});
