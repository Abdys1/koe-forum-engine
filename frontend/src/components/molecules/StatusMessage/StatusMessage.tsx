import { ReactNode } from "react";

import * as styles from "./StatusMessage.css";

type StatusMessageProps = {
    role: "status" | "alert",
    children: ReactNode
}

export default function StatusMessage({ role, children }: StatusMessageProps) {
    return <div className={styles.status} role={role}>{children}</div>;
}
