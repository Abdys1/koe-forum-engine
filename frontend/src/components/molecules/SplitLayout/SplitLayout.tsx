import clsx from "clsx";
import { ReactNode } from "react";

import * as styles from "./SplitLayout.css";

type SplitLayoutProps = {
    text: ReactNode,
    media: ReactNode,
    reverse?: boolean,
    className?: string
}

export default function SplitLayout({ text, media, reverse = false, className }: SplitLayoutProps) {
    return (
        <div className={clsx(styles.split, reverse && styles.splitReverse, className)}>
            <div className={styles.sectionText}>{text}</div>
            {media}
        </div>
    );
}
