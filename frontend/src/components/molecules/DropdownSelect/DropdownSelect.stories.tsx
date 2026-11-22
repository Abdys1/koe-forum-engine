import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";

import DropdownSelect, { DropdownOption } from "./DropdownSelect";

const options: DropdownOption<number>[] = [
    { value: 1, label: "Ryldan Dolzack" },
    { value: 2, label: "Aerin Valcourt" },
    { value: 3, label: "Rovéna O'mera Phorwentar" },
];

function DropdownSelectDemo({ size }: { size?: "medium" | "large" }) {
    const [value, setValue] = useState(1);
    return (
        <div style={{ width: "16rem", color: "white" }}>
            <span id="dropdown-demo-label">Karakterváltás</span>
            <DropdownSelect options={options} value={value} labelId="dropdown-demo-label" onChange={setValue} size={size}/>
        </div>
    );
}

const meta = {
    component: DropdownSelectDemo,
} satisfies Meta<typeof DropdownSelectDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Medium: Story = {};

export const Large: Story = { args: { size: "large" } };
