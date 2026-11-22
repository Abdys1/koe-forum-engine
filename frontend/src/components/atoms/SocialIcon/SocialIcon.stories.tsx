import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import SocialIcon from "./SocialIcon";

const meta = {
    component: SocialIcon,
    args: { network: "discord" },
    decorators: [Story => <div style={{ color: "white" }}><Story /></div>],
} satisfies Meta<typeof SocialIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Discord: Story = {};

export const Instagram: Story = { args: { network: "instagram" } };

export const Facebook: Story = { args: { network: "facebook" } };
