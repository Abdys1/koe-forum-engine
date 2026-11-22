import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Showcase from "./Showcase";

const meta = {
    component: Showcase,
    args: {
        label: "Játszható városok",
        showcaseElements: [
            {
                id: "szelfok",
                name: "Szélfok",
                imageUrl: "/images/szelfok.jpg",
                imageAlt: "Havas, fagerendás házakkal teli városi utca alkonyatkor",
                description: "Az északi hágók kapujában álló kereskedőváros.",
            },
            {
                id: "nor-lothan",
                name: "Nor Lothan",
                imageUrl: "/images/nor-lothan.jpg",
                imageAlt: "Vörös csúcsú erődtorony egy tengerbe nyúló sziklafokon",
                description: "A tenger bástyája, a hajósok menedéke.",
            },
        ],
    },
    decorators: [Story => <div style={{ width: "36rem" }}><Story /></div>],
} satisfies Meta<typeof Showcase>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
