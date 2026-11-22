import Eyebrow from "@/components/atoms/Eyebrow/Eyebrow";

import * as styles from "./SectionHeading.css";

type SectionHeadingProps = {
    eyebrow?: string,
    title: string
}

export default function SectionHeading({ eyebrow, title }: SectionHeadingProps) {
    return (
        <>
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            <h2 className={styles.title}>{title}</h2>
        </>
    );
}
