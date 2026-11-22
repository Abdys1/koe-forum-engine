import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import Button from "@/components/atoms/Button/Button";
import StatusMessage from "@/components/molecules/StatusMessage/StatusMessage";
import { CreateCharacterWizardDemo } from "@/components/organisms/character/CreateCharacterForm/CreateCharacterWizard.stories";

import CreateCharacterTemplate from "./CreateCharacterTemplate";

const meta = {
    component: CreateCharacterTemplate,
    args: { children: <CreateCharacterWizardDemo onSubmit={fn()}/> },
    parameters: { layout: "fullscreen" },
} satisfies Meta<typeof CreateCharacterTemplate>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Form: Story = {};

export const Loading: Story = { args: { children: <StatusMessage role="status">Betöltés…</StatusMessage> } };

export const Error: Story = {
    args: {
        children: (
            <StatusMessage role="alert">
                <p>Nem sikerült betölteni a karakteralkotáshoz szükséges adatokat.</p>
                <Button title="Újrapróbálás" variant="outline" size="medium" onClick={fn()}/>
            </StatusMessage>
        ),
    },
};
