import clsx from "clsx";
import * as styles from "./PanelNavBtn.css";

type PanelNavBtnProps = {
    title: string,
    active?: boolean,
    onClick?: React.MouseEventHandler<HTMLElement>
}

export default function PanelNavBtn(props: PanelNavBtnProps) {
    return (
        <span className={clsx(styles.base, props.active ? styles.navBtnActive : styles.navBtnInactive)}
              onClick={props.onClick}>
            {props.title}
        </span>
    );
}
