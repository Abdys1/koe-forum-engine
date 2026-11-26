import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { gearOverviewFor } from "@/features/equipment/model/__fixtures__/gearOverview";

import CharacterTemplate from "./CharacterTemplate";

const meta = {
    component: CharacterTemplate,
    args: {
        characterSheet: {
            character: {
                id: "1",
                name: "Ryldan Dolzack",
                imageUrl: "/images/ryldan2.png",
                raceId: "sotetelf",
                sex: "ferfi",
            },
            activity: { postCount: 42, activeGames: [] },
            gearOverview: gearOverviewFor([100, 103]),
        },
        canEdit: false,
        canViewPrivate: false,
    },
    parameters: { layout: "fullscreen" },
} satisfies Meta<typeof CharacterTemplate>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const NotFound: Story = { args: { characterSheet: null } };
