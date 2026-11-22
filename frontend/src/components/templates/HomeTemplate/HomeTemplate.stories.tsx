import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import LoginFormPanel from "@/components/organisms/auth/LoginForm/LoginFormPanel";
import { homePageData } from "@/features/home/model/__fixtures__/homePageData";

import HomeTemplate from "./HomeTemplate";

const meta = {
    component: HomeTemplate,
    args: { data: homePageData, login: <LoginFormPanel loginFailed={false} onSubmit={fn(async () => {})}/> },
    parameters: { layout: "fullscreen" },
} satisfies Meta<typeof HomeTemplate>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
