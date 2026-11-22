import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { homePageData } from "@/features/home/model/__fixtures__/homePageData";

import CharacterCreationSection from "./CharacterCreationSection";

const meta = {
    component: CharacterCreationSection,
    args: { steps: homePageData.characterSteps, featuredCharacters: homePageData.featuredCharacters },
    parameters: { layout: "fullscreen" },
} satisfies Meta<typeof CharacterCreationSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
