import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import NewPostForm from "./NewPostForm";

const meta = {
    component: NewPostForm,
    args: { onSubmit: fn() },
    parameters: { layout: "padded" },
} satisfies Meta<typeof NewPostForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
