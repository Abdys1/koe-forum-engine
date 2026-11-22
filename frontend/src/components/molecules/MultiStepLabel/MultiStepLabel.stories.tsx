import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import MultiStepLabel from "./MultiStepLabel";

const meta = {
    component: MultiStepLabel,
    args: { label: "Identitás", stepNum: 2, status: "active" },
    decorators: [Story => <ul style={{ listStyle: "none" }}><Story /></ul>],
} satisfies Meta<typeof MultiStepLabel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Active: Story = {};

export const Done: Story = { args: { status: "done" } };

export const Unfinished: Story = { args: { status: "unfinished" } };
