import { fileURLToPath } from "node:url";

import type { StorybookConfig } from "@storybook/nextjs-vite";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { mergeConfig } from "vite";

const config: StorybookConfig = {
    framework: "@storybook/nextjs-vite",
    stories: ["../src/**/*.stories.@(ts|tsx)"],
    staticDirs: ["../public"],
    core: { disableTelemetry: true },
    viteFinal: async viteConfig => mergeConfig(viteConfig, {
        plugins: [vanillaExtractPlugin()],
        resolve: {
            alias: {
                "@": fileURLToPath(new URL("../src", import.meta.url)),
            },
        },
    }),
};

export default config;
