import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import MultiStepNavButton from "./MultiStepNavButton";

const meta = {
    component: MultiStepNavButton,
    args: { direction: "next", label: "Felszerelés", onClick: fn() },
} satisfies Meta<typeof MultiStepNavButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Next: Story = {};

export const Prev: Story = { args: { direction: "prev", label: "Faj" } };

export const Summary: Story = { args: { direction: "summary", label: "Áttekintés" } };

export const Disabled: Story = { args: { disabled: true } };
