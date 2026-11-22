import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import NotFoundMessage from "@/components/atoms/NotFoundMessage/NotFoundMessage";
import { SIDEBAR_MENU_ITEMS } from "@/components/organisms/navigation/Sidebar/menuItems";
import SidebarPanel from "@/components/organisms/navigation/Sidebar/SidebarPanel";

import AppShell from "./AppShell";

const character = { id: 1, name: "Ryldan Dolzack", imageUrl: "/images/ryldan2.png" };

const meta = {
    component: AppShell,
    args: {
        sidebar: <SidebarPanel characters={[character]} activeCharacter={character} selectionFailed={false}
            menuItems={SIDEBAR_MENU_ITEMS} pathname="/" onSelectCharacter={fn()} onLogout={fn()}/>,
        socialLinks: [
            { network: "discord", label: "Discord" },
            { network: "instagram", label: "Instagram" },
            { network: "facebook", label: "Facebook" },
        ],
        children: <div style={{ minHeight: "60vh" }}><NotFoundMessage message="Oldal tartalma"/></div>,
    },
    parameters: { layout: "fullscreen" },
} satisfies Meta<typeof AppShell>;

export default meta;

type Story = StoryObj<typeof meta>;

export const LoggedIn: Story = {};

export const LoggedOut: Story = { args: { sidebar: null } };
