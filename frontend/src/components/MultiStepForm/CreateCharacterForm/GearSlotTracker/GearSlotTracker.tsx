'use client'

import clsx from "clsx";
import { KeyboardEvent, useRef } from "react";

import GearTypeIcon from "@/components/MultiStepForm/CreateCharacterForm/GearTypeIcon/GearTypeIcon";
import SlotPips from "@/components/MultiStepForm/CreateCharacterForm/SlotPips/SlotPips";
import { EquipmentCatalog, SlotPoolUsage } from "@/features/equipment/model/equipmentCatalog";
import { visuallyHidden } from "@/styles/shared.css";

import * as styles from "./GearSlotTracker.css";

export const GEAR_CATALOG_ID = "gear-catalog";
export const gearTabId = (rootId: number) => `gear-tab-${rootId}`;

type GearSlotTrackerProps = {
    equipmentCatalog: EquipmentCatalog,
    activeRootId: number,
    usages: Map<number, SlotPoolUsage>,
    previewId: number | null,
    onSelectRoot: (rootId: number) => void,
    onRemove: (index: number) => void
}

export default function GearSlotTracker({ equipmentCatalog, activeRootId, usages, previewId, onSelectRoot, onRemove }: GearSlotTrackerProps) {
    const tabRefs = useRef<Record<number, HTMLButtonElement | null>>({});
    const equipmentTypeRoots = equipmentCatalog.getEquipmentTypeRoots();

    const previewEntry = previewId !== null ? equipmentCatalog.findEquipment(previewId) : undefined;
    const previewResult = previewId !== null ? equipmentCatalog.resolveSelection(previewId, usages) : undefined;
    const activeRoot = equipmentTypeRoots.find(root => root.id === activeRootId) ?? equipmentTypeRoots[0];
    const activeUsage = equipmentCatalog.getRootUsage(activeRoot.id, usages);

    function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
        if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
        event.preventDefault();
        const step = event.key === "ArrowRight" ? 1 : -1;
        const nextRoot = equipmentTypeRoots[(index + step + equipmentTypeRoots.length) % equipmentTypeRoots.length];
        onSelectRoot(nextRoot.id);
        tabRefs.current[nextRoot.id]?.focus();
    }

    return (
        <aside className={styles.tracker} aria-label="Felszerelés slotok">
            <div role="tablist" aria-label="Felszerelés típusok" className={styles.tabs}>
                {equipmentTypeRoots.map((root, index) => {
                    const isActive = root.id === activeRoot.id;
                    const { used, capacity } = equipmentCatalog.getRootUsage(root.id, usages);
                    const previewCost = isActive && previewEntry && previewResult?.kind === "add" ? previewEntry.cost : 0;
                    return (
                        <button key={root.id} type="button" role="tab" id={gearTabId(root.id)}
                                ref={element => { tabRefs.current[root.id] = element; }}
                                aria-selected={isActive} aria-controls={GEAR_CATALOG_ID} tabIndex={isActive ? 0 : -1}
                                className={clsx(styles.tab, isActive && styles.tabActive)}
                                onClick={() => onSelectRoot(root.id)}
                                onKeyDown={event => handleTabKeyDown(event, index)}>
                            <span className={styles.tabLabel}>
                                <GearTypeIcon icon={root.icon} className={styles.tabIcon}/>
                                {root.label}
                            </span>
                            <span className={styles.tabCount}>
                                <span className={clsx(styles.freeNumber, previewCost > 0 && styles.freeNumberPreview)}>
                                    {capacity - used - previewCost}
                                </span>
                                <span className={styles.countMeta}>szabad</span>
                            </span>
                            <SlotPips total={capacity} filled={used} preview={previewCost}/>
                        </button>
                    );
                })}
            </div>

            <div className={styles.racks}>
                {equipmentCatalog.getRootSlotPools(activeRoot.id).map(pool => {
                    const usage = usages.get(pool.id);
                    if (!usage) return null;
                    const isPreviewPool = previewEntry?.slotPool === pool;
                    const ghostCost = isPreviewPool && previewResult?.kind === "add" ? previewEntry.cost : 0;
                    const replacedIndices = isPreviewPool && previewResult?.kind === "replace" ? previewResult.indices : [];
                    const emptyCount = Math.max(pool.capacity - usage.used - ghostCost, 0);
                    return (
                        <div key={pool.id} className={styles.rackGroup}>
                            {!pool.isRootSlotPool &&
                                <div className={styles.rackHeader}>
                                    <span className={styles.rackLabel}>{pool.label}</span>
                                    <span className={styles.rackCount}>{usage.used} / {pool.capacity}</span>
                                </div>
                            }
                            <ul className={styles.rack} aria-label={`${pool.label} slotjai`}>
                                {usage.occupants.map(({ entry, index }) => {
                                    const isReplaced = replacedIndices.includes(index);
                                    return (
                                        <li key={index} className={styles.rackItem} style={{ gridRow: `span ${entry.cost}` }}>
                                            <button type="button" onClick={() => onRemove(index)}
                                                    aria-label={`${entry.item.name} eltávolítása`}
                                                    className={clsx(styles.occupant, isReplaced && styles.occupantReplaced)}>
                                                <span className={styles.occupantName}>{entry.item.name}</span>
                                                {isReplaced && previewEntry
                                                    ? <span className={styles.replaceHint}>
                                                        <span className={clsx("material-icons", styles.replaceIcon)} aria-hidden="true">swap_horiz</span>
                                                        <span className={styles.replaceName}>{previewEntry.item.name}</span>
                                                      </span>
                                                    : <SlotPips total={entry.cost} size="small"/>
                                                }
                                                <span className={clsx("material-icons", styles.occupantIcon)} aria-hidden="true">close</span>
                                            </button>
                                        </li>
                                    );
                                })}
                                {ghostCost > 0 && previewEntry &&
                                    <li className={styles.ghost} style={{ gridRow: `span ${ghostCost}` }} aria-hidden="true">
                                        + {previewEntry.item.name}
                                    </li>
                                }
                                {Array.from({ length: emptyCount }, (_, index) => (
                                    <li key={`empty-${index}`} className={styles.emptyCell}>{activeRoot.label} slot</li>
                                ))}
                            </ul>
                            {isPreviewPool && previewEntry && previewResult?.kind === "blocked" &&
                                <p className={styles.blockedMsg}>
                                    Nincs elég slot: {previewEntry.cost} kellene, {previewResult.free} szabad.
                                </p>
                            }
                        </div>
                    );
                })}
            </div>

            <p className={visuallyHidden} aria-live="polite">
                {activeRoot.label}: {activeUsage.capacity - activeUsage.used} szabad slot, összesen {activeUsage.capacity}.
            </p>
        </aside>
    );
}
