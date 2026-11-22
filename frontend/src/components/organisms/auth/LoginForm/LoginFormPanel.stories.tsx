import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn, userEvent, within } from "storybook/test";

import LoginFormPanel from "./LoginFormPanel";

const meta = {
    component: LoginFormPanel,
    args: { loginFailed: false, onSubmit: fn(async () => {}) },
    decorators: [Story => <div style={{ width: "24rem" }}><Story /></div>],
} satisfies Meta<typeof LoginFormPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LoginFailed: Story = { args: { loginFailed: true } };

export const MissingFields: Story = {
    play: async ({ canvasElement }) => {
        await userEvent.click(within(canvasElement).getByRole("button", { name: "Belépés" }));
    },
};
