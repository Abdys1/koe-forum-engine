import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Icon from "./Icon";

const meta = {
    component: Icon,
    args: { name: "auto_stories" },
    decorators: [Story => <div style={{ color: "white", fontSize: "2rem" }}><Story /></div>],
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Gallery: Story = {
    render: () => (
        <div style={{ display: "flex", gap: "1rem" }}>
            {["edit", "mail", "notifications", "logout", "person_add", "swap_horiz", "chevron_left", "chevron_right"]
                .map(name => <Icon key={name} name={name}/>)}
        </div>
    ),
};
