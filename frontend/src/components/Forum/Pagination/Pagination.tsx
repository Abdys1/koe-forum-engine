"use client"

import clsx from "clsx";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useId } from "react";
import DropdownSelect from "@/components/Inputs/DropdownSelect/DropdownSelect";
import { DEFAULT_POST_PAGE_SIZE, POST_PAGE_SIZES, PostPageSize } from "@/lib/api/posts/types";
import * as styles from "./Pagination.css";

type PaginationProps = {
    page: number,
    pageSize: PostPageSize,
    totalPages: number,
    anchorId?: string
}

type PageItem = number | "ellipsis";

const PAGE_SIZE_OPTIONS = POST_PAGE_SIZES.map(size => ({ value: size, label: size }));

function getPageItems(page: number, totalPages: number): PageItem[] {
    const visiblePages = Array.from(new Set([1, page - 1, page, page + 1, totalPages]))
        .filter(visiblePage => visiblePage >= 1 && visiblePage <= totalPages)
        .sort((a, b) => a - b);

    return visiblePages.flatMap<PageItem>((visiblePage, index) =>
        index > 0 && visiblePage - visiblePages[index - 1] > 1 ? ["ellipsis", visiblePage] : [visiblePage]
    );
}

export default function Pagination({ page, pageSize, totalPages, anchorId }: PaginationProps) {
    const pageSizeLabelId = useId();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const createHref = (targetPage: number, targetPageSize: PostPageSize = pageSize) => {
        const params = new URLSearchParams(searchParams.toString());
        if (targetPage === 1) {
            params.delete("page");
        } else {
            params.set("page", String(targetPage));
        }
        if (targetPageSize === DEFAULT_POST_PAGE_SIZE) {
            params.delete("pageSize");
        } else {
            params.set("pageSize", String(targetPageSize));
        }
        const query = params.toString();
        return `${pathname}${query ? `?${query}` : ""}${anchorId ? `#${anchorId}` : ""}`;
    };

    const changePageSize = (newPageSize: PostPageSize) => router.push(createHref(1, newPageSize));

    const renderStepLink = (targetPage: number, icon: string, label: string) => {
        const isDisabled = targetPage < 1 || targetPage > totalPages;
        return isDisabled ? (
            <span className={clsx(styles.pageBtn, styles.pageBtnDisabled)} aria-hidden="true">
                <span className="material-icons">{icon}</span>
            </span>
        ) : (
            <Link href={createHref(targetPage)} className={styles.pageBtn} aria-label={label} title={label}>
                <span className="material-icons">{icon}</span>
            </Link>
        );
    };

    return (
        <nav className={styles.pagination} aria-label="Lapozás">
            <div className={styles.pages}>
                {renderStepLink(page - 1, "chevron_left", "Előző oldal")}
                {getPageItems(page, totalPages).map((item, index) =>
                    item === "ellipsis" ? (
                        <span key={`ellipsis-${index}`} className={styles.ellipsis}>…</span>
                    ) : item === page ? (
                        <span key={item} className={clsx(styles.pageBtn, styles.pageBtnActive)} aria-current="page">
                            {item}
                        </span>
                    ) : (
                        <Link key={item} href={createHref(item)} className={styles.pageBtn}>{item}</Link>
                    )
                )}
                {renderStepLink(page + 1, "chevron_right", "Következő oldal")}
            </div>
            <div className={styles.pageSize}>
                <span id={pageSizeLabelId}>Hozzászólás / oldal</span>
                <DropdownSelect options={PAGE_SIZE_OPTIONS} value={pageSize} labelId={pageSizeLabelId}
                    onChange={changePageSize} />
            </div>
        </nav>
    );
}
