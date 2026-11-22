import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { gearOverviewFor } from "@/features/equipment/model/__fixtures__/gearOverview";

import GearOverview from "./GearOverview";

const meta = {
    component: GearOverview,
    args: { roots: gearOverviewFor([100, 100, 102, 103]) },
    decorators: [Story => <div style={{ width: "36rem" }}><Story /></div>],
} satisfies Meta<typeof GearOverview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Card: Story = {};

export const Tinted: Story = { args: { variant: "tinted" } };

export const Empty: Story = { args: { roots: gearOverviewFor([]), emptyText: "Nincs felszerelés" } };
