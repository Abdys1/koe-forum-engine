import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { equipmentCatalogData } from "@/features/equipment/model/__fixtures__/equipmentCatalogData";
import { buildEquipmentCatalog } from "@/features/equipment/model/equipmentCatalog";
import { toGearOverview } from "@/features/equipment/model/gearOverview";

import CharacterSheet from "./CharacterSheet";

const catalog = buildEquipmentCatalog(equipmentCatalogData);

const meta = {
    component: CharacterSheet,
    args: {
        character: {
            id: "1",
            name: "Ryldan Dolzack",
            imageUrl: "/images/ryldan2.png",
            raceId: "sotetelf",
            sex: "ferfi",
            equipmentIds: [100, 103],
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
        gearOverview: toGearOverview(catalog.getEquipmentTypeRoots(), catalog.getSlotPoolUsages([100, 103])),
        canEdit: false,
        canViewPrivate: false,
    },
    parameters: { layout: "fullscreen" },
} satisfies Meta<typeof CharacterSheet>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Visitor: Story = {};

export const Owner: Story = { args: { canEdit: true, canViewPrivate: true } };
