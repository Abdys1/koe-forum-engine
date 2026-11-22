"use client"

import clsx from "clsx";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useId } from "react";

import Icon from "@/components/atoms/Icon/Icon";
import DropdownSelect from "@/components/molecules/DropdownSelect/DropdownSelect";

import { buildPageHref, getPageItems } from "./pageLinks";
import * as styles from "./Pagination.css";

type PaginationProps<PageSize extends number> = {
    page: number,
    totalPages: number,
    pageSize: PageSize,
    pageSizeOptions: readonly PageSize[],
    defaultPageSize: PageSize,
    pageSizeLabel: string,
    anchorId?: string
}

export default function Pagination<PageSize extends number>(
    { page, totalPages, pageSize, pageSizeOptions, defaultPageSize, pageSizeLabel, anchorId }: PaginationProps<PageSize>
) {
    const pageSizeLabelId = useId();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const createHref = (targetPage: number, targetPageSize: PageSize = pageSize) => buildPageHref({
        pathname,
        searchParams: searchParams.toString(),
        page: targetPage,
        pageSize: targetPageSize,
        defaultPageSize,
        anchorId
    });

    const changePageSize = (newPageSize: PageSize) => router.push(createHref(1, newPageSize));

    const renderStepLink = (targetPage: number, icon: string, label: string) => {
        const isDisabled = targetPage < 1 || targetPage > totalPages;
        return isDisabled ? (
            <span className={clsx(styles.pageBtn, styles.pageBtnDisabled)} aria-hidden="true">
                <Icon name={icon}/>
            </span>
        ) : (
            <Link href={createHref(targetPage)} className={styles.pageBtn} aria-label={label} title={label}>
                <Icon name={icon}/>
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
                <span id={pageSizeLabelId}>{pageSizeLabel}</span>
                <DropdownSelect options={pageSizeOptions.map(size => ({ value: size, label: size }))} value={pageSize} labelId={pageSizeLabelId}
                    onChange={changePageSize} />
            </div>
        </nav>
    );
}
