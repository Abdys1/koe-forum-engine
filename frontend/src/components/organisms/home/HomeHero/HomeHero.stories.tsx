import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import LoginFormPanel from "@/components/organisms/auth/LoginForm/LoginFormPanel";
import { homePageData } from "@/features/home/model/__fixtures__/homePageData";

import HomeHero from "./HomeHero";

const meta = {
    component: HomeHero,
    args: { slides: homePageData.heroSlides, stats: homePageData.activityStats, latestActivity: homePageData.latestActivity, login: <LoginFormPanel loginFailed={false} onSubmit={fn(async () => {})}/> },
    parameters: { layout: "fullscreen" },
} satisfies Meta<typeof HomeHero>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
