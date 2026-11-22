import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import SectionHeading from "./SectionHeading";

const meta = {
    component: SectionHeading,
    args: { title: "A tornyok fénye elhalványult" },
} satisfies Meta<typeof SectionHeading>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TitleOnly: Story = {};

export const WithEyebrow: Story = { args: { eyebrow: "A világ" } };
