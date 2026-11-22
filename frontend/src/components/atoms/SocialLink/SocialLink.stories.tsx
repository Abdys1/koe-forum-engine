import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import SocialLink from "./SocialLink";

const meta = {
    component: SocialLink,
    args: { network: "discord", label: "Discord", href: "#" },
} satisfies Meta<typeof SocialLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Discord: Story = {};

export const Instagram: Story = { args: { network: "instagram", label: "Instagram" } };
