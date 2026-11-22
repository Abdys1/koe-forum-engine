import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import LocationTemplate from "./LocationTemplate";

const author = { id: "1", name: "Ryldan Dolzack", imageUrl: "/images/ryldan2.png" };

const meta = {
    component: LocationTemplate,
    args: {
        locationPage: {
            location: {
                id: "fogado-a-feher-siralyhoz",
                name: "Fogadó a Fehér Sirályhoz",
                description: "A dokkok közelében álló, mindig nyüzsgő épület.",
            },
            author,
            postsPage: {
                items: [{
                    id: "post-1",
                    locationId: "fogado-a-feher-siralyhoz",
                    gameTitle: "Egy pohár rum",
                    content: "A fogadó ajtaja nyikorogva tárult ki, és a sós szél behordta a kikötő zaját.",
                    createdAt: "2026-11-01T18:30:00.000Z",
                    character: { ...author, postCount: 12 },
                }],
                page: 1,
                pageSize: 20,
                totalItems: 1,
                totalPages: 1,
            },
        },
    },
    parameters: {
        layout: "fullscreen",
        nextjs: { navigation: { pathname: "/roleplay-area/locations/fogado-a-feher-siralyhoz" } },
    },
} satisfies Meta<typeof LocationTemplate>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const NotFound: Story = { args: { locationPage: null } };
