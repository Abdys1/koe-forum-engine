import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import SlotPips from "./SlotPips";

const meta = {
    component: SlotPips,
    args: { total: 6 },
} satisfies Meta<typeof SlotPips>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Full: Story = {};

export const PartlyFilled: Story = { args: { filled: 3 } };

export const WithPreview: Story = { args: { filled: 2, preview: 2 } };

export const Small: Story = { args: { total: 2, size: "small" } };
