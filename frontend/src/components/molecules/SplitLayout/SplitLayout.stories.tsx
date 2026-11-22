import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import LeadText from "@/components/atoms/LeadText/LeadText";
import SectionHeading from "@/components/atoms/SectionHeading/SectionHeading";

import SplitLayout from "./SplitLayout";

const media = <div style={{ height: "16rem", border: "1px dashed rgba(255,255,255,0.3)", borderRadius: "0.75rem" }}/>;

const meta = {
    component: SplitLayout,
    args: {
        text: <>
            <SectionHeading eyebrow="A világ" title="A tornyok fénye elhalványult"/>
            <LeadText>Már semmi nem ugyanaz. A mágia kiszámíthatatlanabb, az erdők szeszélyesebbek.</LeadText>
        </>,
        media,
    },
    parameters: { layout: "padded" },
} satisfies Meta<typeof SplitLayout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TextFirst: Story = {};

export const Reversed: Story = { args: { reverse: true } };
