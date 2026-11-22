import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useForm } from "react-hook-form";
import { fn } from "storybook/test";

import MultiStepForm from "./MultiStepForm";

type DemoValues = {
    name: string
}

function MultiStepFormDemo({ onSubmit }: { onSubmit: (values: DemoValues) => void }) {
    const form = useForm<DemoValues>({ defaultValues: { name: "" } });

    return (
        <MultiStepForm form={form} onSubmit={onSubmit}>
            <MultiStepForm.Step label="Első lépés">
                <p style={{ color: "white" }}>Az első lépés tartalma.</p>
            </MultiStepForm.Step>
            <MultiStepForm.Step label="Második lépés">
                <p style={{ color: "white" }}>A második lépés tartalma.</p>
            </MultiStepForm.Step>
            <MultiStepForm.Step label="Áttekintés">
                <button type="submit">Beküldés</button>
            </MultiStepForm.Step>
        </MultiStepForm>
    );
}

const meta = {
    title: "organisms/form/MultiStepForm",
    component: MultiStepFormDemo,
    args: { onSubmit: fn() },
    parameters: { layout: "fullscreen" },
} satisfies Meta<typeof MultiStepFormDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
