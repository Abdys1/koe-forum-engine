import * as styles from "./PageHeading.css";

type PageHeadingProps = {
    title: string
}

export default function PageHeading({ title }: PageHeadingProps) {
    return <h1 className={styles.heading}>{title}</h1>;
}
