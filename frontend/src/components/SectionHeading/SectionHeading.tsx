import { eyebrow } from "@/styles/shared.css";
import * as styles from "./SectionHeading.css";

type SectionHeadingProps = {
    eyebrow: string,
    title: string
}

export default function SectionHeading(props: SectionHeadingProps) {
    return (
        <>
            <span className={eyebrow}>{props.eyebrow}</span>
            <h2 className={styles.title}>{props.title}</h2>
        </>
    );
}
