import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import CharacterTeasers from "./CharacterTeasers";

const meta = {
    component: CharacterTeasers,
    args: {
        characters: [
            { id: "5", name: "Rasdeher Clion", imageUrl: "/images/rasdeher2.png", role: "Bűnöző", quote: "A végzet, ami eljön érted. És mosolyog." },
            { id: "3", name: "Rovéna O'mera Phorwentar", imageUrl: "/images/rovena.jpg", role: "Dalnok", quote: "Néha a legillatosabb virág a legmérgezőbb." },
            { id: "2", name: "Aerin Valcourt", imageUrl: "/images/knight-withoutbg.png", role: "Paladin", quote: "Amíg benned van erkölcs, addig nem halt ki a világból." },
        ],
    },
    parameters: { layout: "padded" },
} satisfies Meta<typeof CharacterTeasers>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
