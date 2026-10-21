'use client'

import { useMemo, useState } from "react";
import { useWatch } from "react-hook-form";
import GearTypeIcon from "@/components/MultiStepForm/CreateCharacterForm/GearTypeIcon/GearTypeIcon";
import GearItemCard from "@/components/MultiStepForm/CreateCharacterForm/GearItemCard/GearItemCard";
import GearSlotTracker, { GEAR_CATALOG_ID, gearTabId } from "@/components/MultiStepForm/CreateCharacterForm/GearSlotTracker/GearSlotTracker";
import SlotPips from "@/components/MultiStepForm/CreateCharacterForm/SlotPips/SlotPips";
import { useMultiStepFormContext } from "@/components/MultiStepForm/MultiStepFormContext";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import { applySelection, equipmentRoots, getPoolUsages, getRootSections, getRootUsage, resolveSelection } from "@/lib/equipment";
import { stepContent, stepIntro } from "@/components/MultiStepForm/CreateCharacterForm/characterStep.css";
import * as styles from "./CharacterGearStep.css";

const EMPTY_SELECTION: string[] = [];

export default function CharacterGearStep() {
    const { control, setValue } = useMultiStepFormContext().form;
    const selectedIds: string[] = useWatch({ control, name: "equipmentIds" }) ?? EMPTY_SELECTION;

    const [activeRootId, setActiveRootId] = useState(equipmentRoots[0].id);
    const [previewId, setPreviewId] = useState<string | null>(null);

    const usages = useMemo(() => getPoolUsages(selectedIds), [selectedIds]);
    const counts = useMemo(() => selectedIds.reduce((map, itemId) => map.set(itemId, (map.get(itemId) ?? 0) + 1),
        new Map<string, number>()), [selectedIds]);

    const activeRoot = equipmentRoots.find(root => root.id === activeRootId) ?? equipmentRoots[0];
    const activeUsage = getRootUsage(activeRoot.id, usages);

    function updateSelection(nextIds: string[]) {
        setValue("equipmentIds", nextIds, { shouldDirty: true });
    }

    function selectItem(itemId: string) {
        updateSelection(applySelection(itemId, selectedIds, resolveSelection(itemId, usages)));
    }

    function removeAt(index: number) {
        updateSelection(selectedIds.filter((_, selectedIndex) => selectedIndex !== index));
    }

    function selectRoot(rootId: string) {
        setActiveRootId(rootId);
        setPreviewId(null);
    }

    function handlePreview(itemId: string, isActive: boolean) {
        setPreviewId(current => isActive ? itemId : current === itemId ? null : current);
    }

    return (
        <div className={stepContent}>
            <SectionHeading eyebrow="3. lépés" title="Kezdő felszerelés"/>
            <p className={stepIntro}>
                Minden felszerelés slotot foglal. Válogass szabadon, amíg van szabad helyed a keretben.
            </p>
            <div className={styles.layout}>
                <GearSlotTracker activeRootId={activeRootId} usages={usages} previewId={previewId}
                                 onSelectRoot={selectRoot} onRemove={removeAt}/>
                <div key={activeRoot.id} id={GEAR_CATALOG_ID} role="tabpanel" aria-labelledby={gearTabId(activeRoot.id)}
                     className={styles.catalog}>
                    <header className={styles.catalogHeader}>
                        <GearTypeIcon icon={activeRoot.icon} className={styles.catalogIcon}/>
                        <h3 className={styles.catalogTitle}>{activeRoot.label}</h3>
                        <span className={styles.catalogMeta}>
                            {activeUsage.capacity - activeUsage.used} / {activeUsage.capacity} slot szabad
                        </span>
                    </header>
                    {getRootSections(activeRoot.id).map(section => {
                        const usage = usages.get(section.pool.type.id);
                        const hasOwnPool = section.pool.type.id === section.type.id;
                        const headingId = `gear-section-${section.type.id}`;
                        return (
                            <section key={section.type.id} className={styles.section} aria-labelledby={headingId}>
                                <header className={styles.sectionHeader}>
                                    <h4 id={headingId} className={styles.sectionTitle}>{section.label}</h4>
                                    <span className={styles.badge}>
                                        <SlotPips total={section.cost} size="small"/>
                                        {section.cost} slot / db
                                    </span>
                                    {hasOwnPool && usage &&
                                        <span className={styles.poolMeta}>Keret: {usage.used} / {section.pool.capacity}</span>
                                    }
                                </header>
                                <ul className={styles.grid}>
                                    {section.items.map(item => (
                                        <GearItemCard key={item.id} name={item.name}
                                                      count={counts.get(item.id) ?? 0}
                                                      status={resolveSelection(item.id, usages).kind}
                                                      onSelect={() => selectItem(item.id)}
                                                      onRemove={() => removeAt(selectedIds.lastIndexOf(item.id))}
                                                      onPreview={isActive => handlePreview(item.id, isActive)}/>
                                    ))}
                                </ul>
                            </section>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
