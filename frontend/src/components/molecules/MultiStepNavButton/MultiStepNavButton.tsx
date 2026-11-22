import clsx from "clsx";

import Icon from "@/components/atoms/Icon/Icon";

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
            <Icon name={icons[direction]} className={clsx(styles.circle, styles.circleVariants[direction])}/>
            <span className={clsx(styles.label, direction === "next" && styles.labelNext)} aria-hidden="true">
                {label}
            </span>
        </button>
    );
}
