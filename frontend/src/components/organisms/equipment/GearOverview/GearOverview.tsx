import clsx from "clsx";

import GearTypeIcon from "@/components/atoms/GearTypeIcon/GearTypeIcon";
import SlotPips from "@/components/atoms/SlotPips/SlotPips";
import { GearOverviewRoot } from "@/features/equipment/model/gearOverview";

import * as styles from "./GearOverview.css";

type GearOverviewProps = {
    roots: GearOverviewRoot[],
    emptyText?: string,
    variant?: keyof typeof styles.rootVariants
}

export default function GearOverview({ roots, emptyText = "Nincs kiválasztva", variant = "card" }: GearOverviewProps) {
    return (
        <div className={styles.gearRoots}>
            {roots.map(({ id, label, icon, used, capacity, rows }) => (
                <div key={id} className={clsx(styles.rootCard, styles.rootVariants[variant])}>
                    <div className={styles.rootHeader}>
                        <span className={styles.rootLabel}>
                            <GearTypeIcon icon={icon} className={styles.rootIcon}/>
                            {label}
                        </span>
                        <span className={styles.rootCount}>{used} / {capacity} slot</span>
                    </div>
                    {capacity > 0 && <SlotPips total={capacity} filled={used} size="small"/>}
                    {rows.length > 0
                        ? <dl className={styles.gearList}>
                            {rows.map(row => (
                                <div key={row.id} className={styles.gearRow}>
                                    <dt className={styles.gearType}>{row.label}</dt>
                                    <dd className={styles.gearItems}>
                                        {row.items.length > 0
                                            ? row.items.map(({ id: itemId, name, count }) => (
                                                <span key={itemId} className={styles.gearName}>
                                                    {name}{count > 1 && ` ×${count}`}
                                                </span>
                                            ))
                                            : <span className={styles.gearEmpty}>-</span>
                                        }
                                    </dd>
                                </div>
                            ))}
                        </dl>
                        : <p className={styles.emptyGear}>{emptyText}</p>
                    }
                </div>
            ))}
        </div>
    );
}
