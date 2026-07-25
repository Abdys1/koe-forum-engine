import clsx from "clsx";
import { useState } from "react";
import * as styles from "./PanelListElement.css";

type PanelListElementProps = {
    title: string,
    desc: string,
    onClick: React.MouseEventHandler<HTMLElement>
};

export default function PanelListElement(props: PanelListElementProps) {
    const [isActiveDesc, setIsActiveDesc] = useState(false);

    function descToggle() {
        setIsActiveDesc(!isActiveDesc);
    }

    return (
        <li className={styles.listItem}>
            <div className={clsx(styles.row, isActiveDesc ? styles.rowActive : styles.rowInactive)}
                 onClick={descToggle}>
                {props.title}
                <button type="button" onClick={props.onClick} className={styles.selectBtn}>
                    Kiválaszt
                </button>
            </div>

            <div className={clsx(styles.desc, isActiveDesc ? styles.descVisible : styles.descHidden)}>
                {props.desc}
            </div>
        </li>
    );
}
