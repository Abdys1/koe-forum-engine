import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import PortraitFrame from "./PortraitFrame";

const meta = {
    component: PortraitFrame,
    args: {
        onClick: fn(),
        label: "Karakterkép cseréje",
        overlay: { icon: "swap_horiz", text: "Kép cseréje" },
    },
} satisfies Meta<typeof PortraitFrame>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithImage: Story = { args: { imageUrl: "/images/ryldan2.png", imageAlt: "Ryldan" } };

export const Large: Story = { args: { imageUrl: "/images/ryldan2.png", imageAlt: "Ryldan", size: "large" } };

export const Invalid: Story = { args: { imageUrl: "/images/ryldan2.png", imageAlt: "Ryldan", invalid: true } };

export const Placeholder: Story = { args: { placeholder: { icon: "add_photo_alternate", text: "Kép feltöltése" } } };
