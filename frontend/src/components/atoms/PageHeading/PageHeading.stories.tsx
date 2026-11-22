import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import PageHeading from "./PageHeading";

const meta = {
    component: PageHeading,
    args: { title: "Karakteralkotás" },
    parameters: { layout: "padded" },
} satisfies Meta<typeof PageHeading>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
