import clsx from "clsx";
import { ReactNode } from "react";

import * as styles from "./PageSection.css";

type PageSectionProps = {
    id?: string,
    className?: string,
    children: ReactNode
}

export default function PageSection({ id, className, children }: PageSectionProps) {
    return <section id={id} className={clsx(styles.section, className)}>{children}</section>;
}
