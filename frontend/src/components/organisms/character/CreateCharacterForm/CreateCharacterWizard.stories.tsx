import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn, userEvent, within } from "storybook/test";

import { useCharacterCreation } from "@/features/character/hooks/useCharacterCreation";
import type { CharacterInputs } from "@/features/character/model/createCharacter";
import { equipmentCatalogData } from "@/features/equipment/model/__fixtures__/equipmentCatalogData";

import CreateCharacterWizard from "./CreateCharacterWizard";

export function CreateCharacterWizardDemo({ onSubmit }: { onSubmit: (values: CharacterInputs) => void }) {
    const creation = useCharacterCreation(equipmentCatalogData);
    return <CreateCharacterWizard creation={creation} onSubmit={onSubmit}/>;
}

const meta = {
    title: "organisms/character/CreateCharacterWizard",
    component: CreateCharacterWizardDemo,
    excludeStories: ["CreateCharacterWizardDemo"],
    args: { onSubmit: fn() },
    parameters: { layout: "fullscreen" },
} satisfies Meta<typeof CreateCharacterWizardDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const RaceStep: Story = {};

export const IdentityStep: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await userEvent.click(canvas.getByRole("button", { name: "Tovább: Identitás" }));
    },
};

export const GearStep: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await userEvent.click(canvas.getByRole("button", { name: "Tovább: Identitás" }));
        await userEvent.type(canvas.getByLabelText("Hogyan szólíthatlak, utazó?"), "Ryldan Dolzack");
        await userEvent.click(canvas.getByRole("button", { name: "Tovább: Felszerelés" }));
    },
};
