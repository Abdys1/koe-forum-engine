import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import LoginFormPanel from "@/components/organisms/auth/LoginForm/LoginFormPanel";
import { homePageData } from "@/features/home/model/__fixtures__/homePageData";

import AuthTemplate from "./AuthTemplate";

const meta = {
    component: AuthTemplate,
    args: {
        slides: homePageData.heroSlides,
        title: "Bejelentkezés",
        lead: "Lépj be, és folytasd a történetet ott, ahol abbahagytad.",
        children: <LoginFormPanel loginFailed={false} onSubmit={fn(async () => {})}/>,
    },
    parameters: { layout: "fullscreen" },
} satisfies Meta<typeof AuthTemplate>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Login: Story = {};
