import { ReactNode } from "react";

import * as styles from "./LeadText.css";

type LeadTextProps = {
    children: ReactNode
}

export default function LeadText({ children }: LeadTextProps) {
    return <p className={styles.sectionLead}>{children}</p>;
}
