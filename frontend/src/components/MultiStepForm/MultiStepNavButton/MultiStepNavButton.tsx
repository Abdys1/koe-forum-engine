import clsx from "clsx";

import * as styles from "./MultiStepNavButton.css";

type NavDirection = keyof typeof styles.circleVariants;

const icons: Record<NavDirection, string> = {
    prev: "chevron_left",
    next: "chevron_right",
    summary: "fact_check"
};

const actionLabels: Record<NavDirection, string> = {
    prev: "Vissza",
    next: "Tovább",
    summary: "Vissza"
};

type MultiStepNavButtonProps = {
    direction: NavDirection,
    label: string,
    onClick: React.MouseEventHandler<HTMLButtonElement>,
    disabled?: boolean
}

export default function MultiStepNavButton({ direction, label, onClick, disabled = false }: MultiStepNavButtonProps) {
    return (
        <button type="button" className={styles.navButton} onClick={onClick} disabled={disabled}
                aria-label={`${actionLabels[direction]}: ${label}`}>
            <span className={clsx("material-icons", styles.circle, styles.circleVariants[direction])} aria-hidden="true">
                {icons[direction]}
            </span>
            <span className={clsx(styles.label, direction === "next" && styles.labelNext)} aria-hidden="true">
                {label}
            </span>
        </button>
    );
}
