import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import SectionHeading from "@/components/atoms/SectionHeading/SectionHeading";

import PageSection from "./PageSection";

const meta = {
    component: PageSection,
    args: { children: <SectionHeading eyebrow="Élő krónika" title="Most történik"/> },
    parameters: { layout: "fullscreen" },
} satisfies Meta<typeof PageSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
