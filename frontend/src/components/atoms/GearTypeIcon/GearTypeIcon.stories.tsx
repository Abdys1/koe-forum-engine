import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import GearTypeIcon from "./GearTypeIcon";

const meta = {
    component: GearTypeIcon,
    args: { icon: "swords" },
    decorators: [Story => <div style={{ color: "white", fontSize: "2rem" }}><Story /></div>],
} satisfies Meta<typeof GearTypeIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Swords: Story = {};

export const MaterialIcon: Story = { args: { icon: "checkroom" } };

export const Fallback: Story = { args: { icon: null } };
