import clsx from "clsx";
import { EquipmentType } from "@/dummydata/equipment";
import * as styles from "./GearTypeIcon.css";

type GearTypeIconProps = {
    icon: EquipmentType["icon"],
    className?: string
}

export default function GearTypeIcon({ icon, className }: GearTypeIconProps) {
    if (icon === "swords") {
        return (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
                 strokeLinejoin="round" className={clsx(styles.icon, className)} aria-hidden="true">
                <path d="M14.5 17.5 3 6V3h3l11.5 11.5"/>
                <path d="m13 19 6-6"/>
                <path d="m16 16 4 4"/>
                <path d="m19 21 2-2"/>
                <path d="M14.5 6.5 18 3h3v3l-3.5 3.5"/>
                <path d="m5 14 4 4"/>
                <path d="m7 17-3 3"/>
                <path d="m3 19 2 2"/>
            </svg>
        );
    }
    return <span className={clsx("material-icons", styles.icon, className)} aria-hidden="true">{icon ?? "category"}</span>;
}
