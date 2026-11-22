import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn, userEvent, within } from "storybook/test";

import { SIDEBAR_MENU_ITEMS } from "./menuItems";
import SidebarPanel from "./SidebarPanel";

const characters = [
    { id: 1, name: "Ryldan Dolzack", imageUrl: "/images/ryldan2.png" },
    { id: 2, name: "Aerin Valcourt", imageUrl: "/images/knight-withoutbg.png" },
];

const meta = {
    component: SidebarPanel,
    args: {
        characters,
        activeCharacter: characters[0],
        selectionFailed: false,
        menuItems: SIDEBAR_MENU_ITEMS,
        pathname: "/",
        onSelectCharacter: fn(),
        onLogout: fn(),
    },
    parameters: { layout: "fullscreen" },
    decorators: [Story => <div style={{ display: "flex", minHeight: "100vh" }}><Story /></div>],
} satisfies Meta<typeof SidebarPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

const openSidebar: Story["play"] = async ({ canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole("button", { name: "Menüsáv kinyitása" }));
};

export const Collapsed: Story = {};

export const Open: Story = { play: openSidebar };

export const SelectionFailed: Story = { args: { selectionFailed: true }, play: openSidebar };

export const WithoutCharacter: Story = { args: { characters: [], activeCharacter: undefined }, play: openSidebar };
