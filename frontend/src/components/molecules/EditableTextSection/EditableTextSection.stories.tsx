import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn, userEvent, within } from "storybook/test";

import EditableTextSection from "./EditableTextSection";

const meta = {
    component: EditableTextSection,
    args: {
        title: "Külső megjelenés",
        emptyText: "Ennek a karakternek még nincs külső leírása.",
        canEdit: false,
        onSave: fn(),
    },
    decorators: [Story => <div style={{ width: "40rem" }}><Story /></div>],
} satisfies Meta<typeof EditableTextSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Empty: Story = {};

export const WithText: Story = {
    args: { value: "Magas, szikár alak, sötét köpenyben.\n\nA bal arcán régi heg húzódik." },
};

export const Private: Story = {
    args: { value: "Egy régi adósság elől menekül.", info: "A karaktered titkait rajtad kívül csak a mesélők láthatják." },
};

export const Editing: Story = {
    args: { canEdit: true, minLength: 200, editHint: "Fogalmazd meg néhány mondatban, mit láthat egy másik karakter." },
    play: async ({ canvasElement }) => {
        await userEvent.click(within(canvasElement).getByRole("button", { name: "Külső megjelenés szerkesztése" }));
    },
};
