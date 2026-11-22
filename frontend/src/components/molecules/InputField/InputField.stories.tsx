import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import InputField from "./InputField";

const meta = {
    component: InputField,
    args: { label: "Felhasználónév", name: "username" },
    decorators: [Story => <div style={{ width: "22rem" }}><Story /></div>],
} satisfies Meta<typeof InputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Password: Story = { args: { label: "Jelszó", name: "password", type: "password" } };

export const WithError: Story = { args: { error: "A felhasználónév kitöltése kötelező!" } };
