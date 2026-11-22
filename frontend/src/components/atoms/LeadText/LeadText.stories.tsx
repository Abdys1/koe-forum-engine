import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import LeadText from "./LeadText";

const meta = {
    component: LeadText,
    args: { children: "Már semmi nem ugyanaz. A mágia kiszámíthatatlanabb, az erdők szeszélyesebbek." },
} satisfies Meta<typeof LeadText>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
