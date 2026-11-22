import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import PostCard from "./PostCard";

const meta = {
    component: PostCard,
    args: {
        postNumber: 42,
        post: {
            gameTitle: "Egy pohár rum",
            content: "A fogadó ajtaja nyikorogva tárult ki, és a sós szél behordta a kikötő zaját.",
            createdAt: "2026-11-01T18:30:00.000Z",
            character: { name: "Ryldan Dolzack", imageUrl: "/images/ryldan2.png", postCount: 12 },
        },
    },
    parameters: { layout: "padded" },
} satisfies Meta<typeof PostCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
