import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { equipmentCatalogData } from "@/features/equipment/model/__fixtures__/equipmentCatalogData";
import { buildEquipmentCatalog } from "@/features/equipment/model/equipmentCatalog";
import { toGearOverview } from "@/features/equipment/model/gearOverview";

import GearOverview from "./GearOverview";

const catalog = buildEquipmentCatalog(equipmentCatalogData);
const overview = (selectedIds: number[]) => toGearOverview(catalog.getEquipmentTypeRoots(), catalog.getSlotPoolUsages(selectedIds));

const meta = {
    component: GearOverview,
    args: { roots: overview([100, 100, 102, 103]) },
    decorators: [Story => <div style={{ width: "36rem" }}><Story /></div>],
} satisfies Meta<typeof GearOverview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Card: Story = {};

export const Tinted: Story = { args: { variant: "tinted" } };

export const Empty: Story = { args: { roots: overview([]), emptyText: "Nincs felszerelés" } };
