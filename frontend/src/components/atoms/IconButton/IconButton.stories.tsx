import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import IconButton from "./IconButton";

const meta = {
    component: IconButton,
    args: { icon: "edit", label: "Szerkesztés", onClick: fn() },
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Edit: Story = {};

export const Delete: Story = { args: { icon: "delete", label: "Törlés" } };

export const Invalid: Story = { args: { invalid: true } };
