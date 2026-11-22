import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import LocationHeader from "./LocationHeader";

const meta = {
    component: LocationHeader,
    args: {
        location: {
            id: "fogado-a-feher-siralyhoz",
            name: "Fogadó a Fehér Sirályhoz",
            description: "A dokkok közelében álló, mindig nyüzsgő épület. Matrózok, kereskedők és kalandorok kedvelt találkozóhelye.",
        },
    },
    parameters: { layout: "fullscreen" },
} satisfies Meta<typeof LocationHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
