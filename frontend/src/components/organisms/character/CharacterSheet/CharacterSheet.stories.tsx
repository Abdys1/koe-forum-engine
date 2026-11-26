import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { gearOverviewFor } from "@/features/equipment/model/__fixtures__/gearOverview";

import CharacterSheet from "./CharacterSheet";

const meta = {
    component: CharacterSheet,
    args: {
        character: {
            id: "1",
            name: "Ryldan Dolzack",
            imageUrl: "/images/ryldan2.png",
            raceName: "Sötételf",
            sex: "ferfi",
            appearance: "Magas, szikár alak, sötét köpenyben.\n\nA bal arcán régi heg húzódik.",
            quote: { text: "Sosem hátrál meg, ha egy barátja bajban van.", locationId: "fogado-a-feher-siralyhoz", postNumber: 12 },
        },
        activity: {
            postCount: 1234,
            lastPost: { locationId: "fogado-a-feher-siralyhoz", createdAt: "2026-11-01T18:30:00.000Z" },
            activeGames: [
                { title: "Egy pohár rum", locationId: "fogado-a-feher-siralyhoz", postCount: 14, lastPostAt: "2026-11-01T18:30:00.000Z" },
            ],
        },
        gearOverview: gearOverviewFor([100, 103]),
        canEdit: false,
        canViewPrivate: false,
    },
    parameters: { layout: "fullscreen" },
} satisfies Meta<typeof CharacterSheet>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Visitor: Story = {};

export const Owner: Story = { args: { canEdit: true, canViewPrivate: true } };
