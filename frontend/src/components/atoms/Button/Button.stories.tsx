import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Button from "./Button";

const meta = {
    component: Button,
    args: { title: "Regisztráció" },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Ghost: Story = { args: { variant: "ghost" } };

export const Gold: Story = { args: { variant: "gold" } };

export const OutlineMedium: Story = { args: { variant: "outline", size: "medium" } };

export const WithIcon: Story = { args: { variant: "soft", size: "small", icon: "swap_horiz", title: "Kép cseréje" } };

export const AsLink: Story = { args: { href: "/character/create", title: "Karakteralkotás" } };
