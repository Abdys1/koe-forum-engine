import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import NotFoundMessage from "./NotFoundMessage";

const meta = {
    component: NotFoundMessage,
    args: { message: "A karakter nem található" },
} satisfies Meta<typeof NotFoundMessage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
