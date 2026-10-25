import clsx from "clsx";
import { useMemo } from "react";
import GearTypeIcon from "@/components/MultiStepForm/CreateCharacterForm/GearTypeIcon/GearTypeIcon";
import SlotPips from "@/components/MultiStepForm/CreateCharacterForm/SlotPips/SlotPips";
import { equipmentRoots, getPoolUsages, getRootUsage, groupSelectionBySlot } from "@/lib/equipment";
import * as styles from "./GearOverview.css";

type GearOverviewProps = {
    selectedIds: string[],
    emptyText?: string,
    variant?: keyof typeof styles.rootVariants
}

export default function GearOverview({ selectedIds, emptyText = "Nincs kiválasztva", variant = "card" }: GearOverviewProps) {
    const usages = useMemo(() => getPoolUsages(selectedIds), [selectedIds]);

    return (
        <div className={styles.gearRoots}>
            {equipmentRoots.map(root => {
                const gearRows = groupSelectionBySlot(selectedIds, root.id);
                const { used, capacity } = getRootUsage(root.id, usages);
                return (
                    <div key={root.id} className={clsx(styles.rootCard, styles.rootVariants[variant])}>
                        <div className={styles.rootHeader}>
                            <span className={styles.rootLabel}>
                                <GearTypeIcon icon={root.icon} className={styles.rootIcon}/>
                                {root.label}
                            </span>
                            <span className={styles.rootCount}>{used} / {capacity} slot</span>
                        </div>
                        {capacity > 0 && <SlotPips total={capacity} filled={used} size="small"/>}
                        {gearRows.length > 0
                            ? <dl className={styles.gearList}>
                                {gearRows.map(row => (
                                    <div key={row.type.id} className={styles.gearRow}>
                                        <dt className={styles.gearType}>{row.type.label}</dt>
                                        <dd className={styles.gearItems}>
                                            {row.groups.length > 0
                                                ? row.groups.map(({ entry, count }) => (
                                                    <span key={entry.item.id} className={styles.gearName}>
                                                        {entry.item.name}{count > 1 && ` ×${count}`}
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
                );
            })}
        </div>
    );
}
