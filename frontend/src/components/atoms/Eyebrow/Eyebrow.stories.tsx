import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Eyebrow from "./Eyebrow";

const meta = {
    component: Eyebrow,
    args: { children: "Fórumos szerepjáték" },
} satisfies Meta<typeof Eyebrow>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
