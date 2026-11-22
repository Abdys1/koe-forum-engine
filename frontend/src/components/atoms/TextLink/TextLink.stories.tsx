import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import TextLink from "./TextLink";

const meta = {
    component: TextLink,
    args: { href: "/roleplay-area/locations/fogado-a-feher-siralyhoz", children: "Fogadó a Fehér Sirályhoz" },
} satisfies Meta<typeof TextLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Gold: Story = {};

export const Accent: Story = { args: { variant: "accent" } };

export const Muted: Story = { args: { variant: "muted", children: "Elfelejtetted a jelszavad?" } };
