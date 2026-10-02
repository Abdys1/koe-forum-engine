import { DEFAULT_POST_PAGE_SIZE, POST_PAGE_SIZES, PageRequest, PostPageSize } from "@/lib/api/posts/types";

type SearchParams = Record<string, string | string[] | undefined>;

const firstValue = (value: string | string[] | undefined) => Array.isArray(value) ? value[0] : value;

export const isPostPageSize = (value: number): value is PostPageSize =>
    (POST_PAGE_SIZES as readonly number[]).includes(value);

export function parsePageRequest(searchParams: SearchParams): PageRequest {
    const page = Number(firstValue(searchParams.page));
    const pageSize = Number(firstValue(searchParams.pageSize));

    return {
        page: Number.isInteger(page) && page >= 1 ? page : 1,
        pageSize: isPostPageSize(pageSize) ? pageSize : DEFAULT_POST_PAGE_SIZE
    };
}
