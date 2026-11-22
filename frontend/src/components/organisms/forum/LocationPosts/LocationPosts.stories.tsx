import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import type { LocationPost } from "@/lib/api/posts/types";

import LocationPosts from "./LocationPosts";

const author = { id: "1", name: "Ryldan Dolzack", imageUrl: "/images/ryldan2.png" };

const posts: LocationPost[] = [1, 2, 3].map(index => ({
    id: `post-${index}`,
    locationId: "fogado-a-feher-siralyhoz",
    gameTitle: "Egy pohár rum",
    content: "A fogadó ajtaja nyikorogva tárult ki, és a sós szél behordta a kikötő zaját.",
    createdAt: `2026-11-0${index}T18:30:00.000Z`,
    character: { ...author, postCount: 12 },
}));

const meta = {
    component: LocationPosts,
    args: {
        locationId: "fogado-a-feher-siralyhoz",
        author,
        postsPage: { items: posts, page: 2, pageSize: 20, totalItems: 43, totalPages: 3 },
    },
    parameters: {
        layout: "padded",
        nextjs: { navigation: { pathname: "/roleplay-area/locations/fogado-a-feher-siralyhoz" } },
    },
} satisfies Meta<typeof LocationPosts>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
