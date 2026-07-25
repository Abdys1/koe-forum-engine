import clsx from "clsx";
import * as styles from "./SelectedGearElement.css";

type SelectedGearElementProps = {
    optionTitle: string,
    gearTitle: string,
    onClear?: React.MouseEventHandler<HTMLElement>,
    isActiveClearBtn: boolean
}

export default function SelectedGearElement(props: SelectedGearElementProps) {
    return (
        <div className={styles.container}>
            <h4 className={styles.optionTitle}>
                {props.optionTitle}
            </h4>
            <div className={styles.valueRow}>
                <span className={styles.gearTitle}>
                    {props.gearTitle}
                </span>
                <button onClick={props.onClear} type="button"
                    className={clsx(styles.clearBtn,
                        props.isActiveClearBtn ? styles.clearBtnVisible : styles.clearBtnHidden
                    )}>
                    <span className="material-icons">
                        cancel
                    </span>
                </button>
            </div>
        </div>
    );
}
