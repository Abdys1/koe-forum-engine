import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { homePageData } from "@/features/home/model/__fixtures__/homePageData";

import ActivityBar from "./ActivityBar";

const meta = {
    component: ActivityBar,
    args: { stats: homePageData.activityStats, latestActivity: homePageData.latestActivity },
    parameters: { layout: "padded" },
} satisfies Meta<typeof ActivityBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
