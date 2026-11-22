import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import IconButton from "@/components/atoms/IconButton/IconButton";

import PanelHeading from "./PanelHeading";

const meta = {
    component: PanelHeading,
    args: { title: "Külső megjelenés" },
    decorators: [Story => <div style={{ width: "32rem" }}><Story /></div>],
} satisfies Meta<typeof PanelHeading>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TitleOnly: Story = {};

export const WithAction: Story = {
    args: { action: <IconButton icon="edit" label="Külső megjelenés szerkesztése" onClick={fn()}/> },
};
