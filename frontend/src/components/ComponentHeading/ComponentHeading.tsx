import * as styles from "./ComponentHeading.css";

type ComponentHeadingProps = {
    title: string
}

export default function ComponentHeading(props: ComponentHeadingProps) {
    return (
        <h1 className={styles.heading}>
            {props.title}
        </h1>
    );
}
