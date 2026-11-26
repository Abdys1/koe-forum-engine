import clsx from "clsx";
import { ReactNode } from "react";

import * as styles from "./AlertMessage.css";

type AlertMessageProps = {
    id?: string,
    className?: string,
    children: ReactNode
}

export default function AlertMessage({ id, className, children }: AlertMessageProps) {
    return <div id={id} role="alert" className={clsx(styles.alert, className)}>{children}</div>;
}
