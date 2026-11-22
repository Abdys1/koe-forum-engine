import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import LoginFormPanel from "@/components/organisms/auth/LoginForm/LoginFormPanel";

import WelcomeBackCard from "./WelcomeBackCard";

const meta = {
    component: WelcomeBackCard,
    args: { loginForm: <LoginFormPanel loginFailed={false} onSubmit={fn(async () => {})}/> },
    decorators: [Story => <div style={{ width: "26rem" }}><Story /></div>],
} satisfies Meta<typeof WelcomeBackCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const LoggedOut: Story = {};

export const LoggedIn: Story = { args: { username: "ryldan" } };
