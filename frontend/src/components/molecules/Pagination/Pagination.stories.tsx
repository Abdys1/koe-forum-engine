import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Pagination from "./Pagination";

const meta = {
    component: Pagination,
    args: {
        page: 5,
        totalPages: 10,
        pageSize: 20,
        pageSizeOptions: [20, 50, 100],
        defaultPageSize: 20,
        pageSizeLabel: "Hozzászólás / oldal",
    },
    parameters: {
        nextjs: { navigation: { pathname: "/roleplay-area/locations/fogado-a-feher-siralyhoz" } },
    },
} satisfies Meta<typeof Pagination<number>>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Middle: Story = {};

export const FirstPage: Story = { args: { page: 1 } };

export const LastPage: Story = { args: { page: 10 } };

export const SinglePage: Story = { args: { page: 1, totalPages: 1 } };
