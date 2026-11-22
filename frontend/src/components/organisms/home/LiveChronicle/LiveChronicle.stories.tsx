import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { homePageData } from "@/features/home/model/__fixtures__/homePageData";

import LiveChronicle from "./LiveChronicle";

const meta = {
    component: LiveChronicle,
    args: { latestActivity: homePageData.latestActivity, newestCharacter: homePageData.newestCharacter, news: homePageData.news },
    parameters: { layout: "fullscreen" },
} satisfies Meta<typeof LiveChronicle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
