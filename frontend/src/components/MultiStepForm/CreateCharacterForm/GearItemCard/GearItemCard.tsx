import clsx from "clsx";
import { SelectionResult } from "@/lib/equipment";
import { visuallyHidden } from "@/styles/shared.css";
import * as styles from "./GearItemCard.css";

type GearItemCardProps = {
    name: string,
    count: number,
    status: SelectionResult["kind"],
    onSelect: () => void,
    onRemove: () => void,
    onPreview: (isActive: boolean) => void
}

const hints: Record<SelectionResult["kind"], string> = {
    add: "Felveszem",
    replace: "Csere",
    blocked: "Nincs elég slot"
};

export default function GearItemCard({ name, count, status, onSelect, onRemove, onPreview }: GearItemCardProps) {
    const isBlocked = status === "blocked";
    const hint = status === "add" && count > 0 ? "Még egy" : hints[status];

    return (
        <li className={clsx(styles.card, count > 0 && styles.cardSelected, isBlocked && styles.cardBlocked)}>
            <button type="button" className={styles.selectBtn} aria-disabled={isBlocked}
                    onClick={isBlocked ? undefined : onSelect}
                    onMouseEnter={() => onPreview(true)} onMouseLeave={() => onPreview(false)}
                    onFocus={() => onPreview(true)} onBlur={() => onPreview(false)}>
                <span className={styles.name}>{name}</span>
                <span className={clsx(styles.hint, isBlocked && styles.hintBlocked)}>{hint}</span>
                {count > 0 &&
                    <span key={count} className={styles.countBadge}>
                        <span className={visuallyHidden}>kiválasztva: </span>×{count}
                    </span>
                }
            </button>
            {count > 0 &&
                <button type="button" className={styles.removeBtn} onClick={onRemove} aria-label={`Egy ${name} eltávolítása`}>
                    <span className={clsx("material-icons", styles.removeIcon)} aria-hidden="true">remove</span>
                </button>
            }
        </li>
    );
}
