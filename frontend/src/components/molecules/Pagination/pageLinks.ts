export type PageItem = number | "ellipsis";

export function getPageItems(page: number, totalPages: number): PageItem[] {
    const visiblePages = Array.from(new Set([1, page - 1, page, page + 1, totalPages]))
        .filter(visiblePage => visiblePage >= 1 && visiblePage <= totalPages)
        .sort((a, b) => a - b);

    return visiblePages.flatMap<PageItem>((visiblePage, index) =>
        index > 0 && visiblePage - visiblePages[index - 1] > 1 ? ["ellipsis", visiblePage] : [visiblePage]
    );
}

export interface PageHrefOptions {
    pathname: string,
    searchParams: string,
    page: number,
    pageSize: number,
    defaultPageSize: number,
    anchorId?: string
}

export function buildPageHref({ pathname, searchParams, page, pageSize, defaultPageSize, anchorId }: PageHrefOptions): string {
    const params = new URLSearchParams(searchParams);
    if (page === 1) {
        params.delete("page");
    } else {
        params.set("page", String(page));
    }
    if (pageSize === defaultPageSize) {
        params.delete("pageSize");
    } else {
        params.set("pageSize", String(pageSize));
    }
    const query = params.toString();
    return `${pathname}${query ? `?${query}` : ""}${anchorId ? `#${anchorId}` : ""}`;
}
