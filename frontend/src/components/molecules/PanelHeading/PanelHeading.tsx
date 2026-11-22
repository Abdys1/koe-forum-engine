import { ReactNode } from "react";

import * as styles from "./PanelHeading.css";

type PanelHeadingProps = {
    title: string,
    id?: string,
    action?: ReactNode
}

export default function PanelHeading({ title, id, action }: PanelHeadingProps) {
    return (
        <div className={styles.heading}>
            <h2 id={id} className={styles.headingTitle}>{title}</h2>
            {action && <span className={styles.headingAction}>{action}</span>}
        </div>
    );
}
