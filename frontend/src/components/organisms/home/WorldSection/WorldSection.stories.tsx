import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { homePageData } from "@/features/home/model/__fixtures__/homePageData";

import WorldSection from "./WorldSection";

const meta = {
    component: WorldSection,
    args: { cities: homePageData.cities },
    parameters: { layout: "fullscreen" },
} satisfies Meta<typeof WorldSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
