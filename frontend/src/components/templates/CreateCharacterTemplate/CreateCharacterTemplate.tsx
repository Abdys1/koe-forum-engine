import { ReactNode } from "react";

import * as styles from "./CreateCharacterTemplate.css";

type CreateCharacterTemplateProps = {
    children: ReactNode
}

export default function CreateCharacterTemplate({ children }: CreateCharacterTemplateProps) {
    return <section className={styles.page}>{children}</section>;
}
