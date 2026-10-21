import clsx from "clsx";
import * as styles from "./SlotPips.css";

type SlotPipsProps = {
    total: number,
    filled?: number,
    preview?: number,
    size?: keyof typeof styles.pipSize
}

export default function SlotPips({ total, filled = total, preview = 0, size = "medium" }: SlotPipsProps) {
    return (
        <span className={styles.pips} aria-hidden="true">
            {Array.from({ length: total }, (_, index) => (
                <span key={index} className={clsx(styles.pip, styles.pipSize[size],
                    index < filled && styles.filled,
                    index >= filled && index < filled + preview && styles.preview
                )}/>
            ))}
        </span>
    );
}
