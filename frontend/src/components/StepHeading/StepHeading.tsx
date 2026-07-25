import * as styles from "./StepHeading.css";

type StepHeadingProps = {
    title: string
}

export default function StepHeading(props: StepHeadingProps) {
    return (
        <h2 className={styles.heading}>
            {props.title}
        </h2>
    );
}
