import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import AlertMessage from "./AlertMessage";

const meta = {
    component: AlertMessage,
    args: { children: "Hibás felhasználónév vagy jelszó!" },
} satisfies Meta<typeof AlertMessage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
