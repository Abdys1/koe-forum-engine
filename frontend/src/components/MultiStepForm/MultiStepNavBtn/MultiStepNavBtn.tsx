import clsx from "clsx";
import * as styles from "./MultiStepNavBtn.css";

type MultiStepNavBtnProps = {
    title: string,
    type: "button" | "submit",
    disabled?: boolean,
    onClick?: React.MouseEventHandler<HTMLElement>
};

export default function MultiStepNavBtn(props: MultiStepNavBtnProps) {
    return (
        <button
            className={clsx(styles.btn, props.disabled ? styles.btnDisabled : styles.btnEnabled)}
            type={props.type}
            onClick={props.onClick}>
            {props.title}
        </button>
    );
}
