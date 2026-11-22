import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import Button from "@/components/atoms/Button/Button";

import StatusMessage from "./StatusMessage";

const meta = {
    component: StatusMessage,
    args: { role: "status", children: "Betöltés…" },
} satisfies Meta<typeof StatusMessage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Loading: Story = {};

export const Error: Story = {
    args: {
        role: "alert",
        children: <>
            <p>Nem sikerült betölteni a karakteralkotáshoz szükséges adatokat.</p>
            <Button title="Újrapróbálás" variant="outline" size="medium" onClick={fn()}/>
        </>,
    },
};
