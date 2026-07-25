import clsx from "clsx";
import * as styles from "./SelectableOptionBtn.css";

type SelectableOptionBtnProps = {
    title: string,
    active?: boolean,
    onClick?: React.MouseEventHandler<HTMLElement>
};

export default function SelectableOptionBtn(props: SelectableOptionBtnProps) {
    return (
        <button type="button"
            className={clsx(styles.base,
                props.active ? styles.active : styles.inactive
            )}
            onClick={props.onClick}>
            {props.title}
        </button>
    );
}
