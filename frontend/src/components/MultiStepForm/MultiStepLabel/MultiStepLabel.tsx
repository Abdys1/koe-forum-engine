import clsx from "clsx";
import * as styles from "./MultiStepLabel.css";

type MultiStepLabelProps = {
    label: string,
    stepNum: number,
    status: "active" | "done" | "unfinished"
};

export default function MultiStepLabel(props: MultiStepLabelProps) {
    const circleClass = clsx(styles.circle, {
        [styles.circleDone]: props.status === "done",
        [styles.circleActive]: props.status === "active",
        [styles.circleUnfinished]: props.status === "unfinished",
    });

    const labelClass = clsx(styles.label, {
        [styles.labelDone]: props.status === "done",
        [styles.labelActive]: props.status === "active",
        [styles.labelUnfinished]: props.status === "unfinished",
    });

    return (
        <li className={styles.item}>
            <div className={circleClass}>{props.stepNum}</div>
            <h6 className={labelClass}>{props.label}</h6>
        </li>
    );
}
