import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import GearItemCard from "./GearItemCard";

const meta = {
    component: GearItemCard,
    args: {
        name: "Rövidkard",
        count: 0,
        status: "add",
        onSelect: fn(),
        onRemove: fn(),
        onPreview: fn(),
    },
    decorators: [Story => <ul style={{ listStyle: "none", width: "14rem" }}><Story /></ul>],
} satisfies Meta<typeof GearItemCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Available: Story = {};

export const WithCost: Story = { args: { cost: 2 } };

export const Selected: Story = { args: { count: 2 } };

export const Replace: Story = { args: { name: "Kétkezes kard", cost: 4, status: "replace" } };

export const Blocked: Story = { args: { name: "Tőr", cost: 2, status: "blocked" } };
