import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import BackgroundSlideshow from "./BackgroundSlideshow";

const meta = {
    component: BackgroundSlideshow,
    args: {
        slides: [
            { src: "/images/dummybg1.jpg", alt: "Kivilágított vártorony egy sötét földalatti csatorna felett" },
            { src: "/images/dummybg2.jpg", alt: "Gyertyafényes szentély egy szárnyas őrzővel" },
            { src: "/images/dummybg3.jpg", alt: "Elhagyatott katedrális egy hatalmas szoborral" },
        ],
        interval: 3000,
    },
    parameters: { layout: "fullscreen" },
    decorators: [Story => <div style={{ position: "relative", height: "100vh" }}><Story /></div>],
} satisfies Meta<typeof BackgroundSlideshow>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SingleSlide: Story = { args: { slides: [{ src: "/images/dummybg1.jpg", alt: "Kivilágított vártorony" }] } };
