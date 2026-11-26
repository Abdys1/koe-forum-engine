import clsx from "clsx";

import Icon from "@/components/atoms/Icon/Icon";

import * as styles from "./IconButton.css";

type IconButtonProps = {
    icon: string,
    label: string,
    onClick: () => void,
    invalid?: boolean,
    className?: string
}

export default function IconButton({ icon, label, onClick, invalid = false, className }: IconButtonProps) {
    return (
        <button type="button" className={clsx(styles.button, invalid && styles.invalid, className)} onClick={onClick} aria-label={label} title={label}>
            <Icon name={icon} className={styles.icon}/>
        </button>
    );
}
