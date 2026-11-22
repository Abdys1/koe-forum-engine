import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Footer from "./Footer";

const meta = {
    component: Footer,
    args: {
        socialLinks: [
            { network: "discord", label: "Discord" },
            { network: "instagram", label: "Instagram" },
            { network: "facebook", label: "Facebook" },
        ],
    },
    parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Footer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
