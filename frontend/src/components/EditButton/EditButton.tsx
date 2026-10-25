import clsx from "clsx";
import * as styles from "./EditButton.css";

type EditButtonProps = {
    label: string,
    onClick: () => void
}

export default function EditButton({ label, onClick }: EditButtonProps) {
    return (
        <button type="button" className={styles.editBtn} onClick={onClick} aria-label={label} title={label}>
            <span className={clsx("material-icons", styles.editIcon)} aria-hidden="true">edit</span>
        </button>
    );
}
