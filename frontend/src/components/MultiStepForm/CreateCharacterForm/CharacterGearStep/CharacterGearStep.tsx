'use client'

import { useMemo, useState } from "react";
import { useWatch } from "react-hook-form";

import { stepContent, stepIntro } from "@/components/MultiStepForm/CreateCharacterForm/characterStep.css";
import GearItemCard from "@/components/MultiStepForm/CreateCharacterForm/GearItemCard/GearItemCard";
import GearSlotTracker, { GEAR_CATALOG_ID, gearTabId } from "@/components/MultiStepForm/CreateCharacterForm/GearSlotTracker/GearSlotTracker";
import GearTypeIcon from "@/components/MultiStepForm/CreateCharacterForm/GearTypeIcon/GearTypeIcon";
import SlotPips from "@/components/MultiStepForm/CreateCharacterForm/SlotPips/SlotPips";
import { useMultiStepFormContext } from "@/components/MultiStepForm/MultiStepFormContext";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import { EquipmentCatalog } from "@/features/equipment/model/equipmentCatalog";
import { applySelection } from "@/features/equipment/model/selection";

import * as styles from "./CharacterGearStep.css";

const EMPTY_SELECTION: number[] = [];

type CharacterGearStepProps = {
    equipmentCatalog: EquipmentCatalog
}

export default function CharacterGearStep({ equipmentCatalog }: CharacterGearStepProps) {
    const { control, setValue } = useMultiStepFormContext().form;
    const selectedIds: number[] = useWatch({ control, name: "equipmentIds" }) ?? EMPTY_SELECTION;
    const equipmentTypeRoots = equipmentCatalog.getEquipmentTypeRoots();

    const [activeRootId, setActiveRootId] = useState(equipmentTypeRoots[0]?.id);
    const [previewId, setPreviewId] = useState<number | null>(null);

    const usages = useMemo(() => equipmentCatalog.getSlotPoolUsages(selectedIds), [equipmentCatalog, selectedIds]);
    const counts = useMemo(() => selectedIds.reduce((map, itemId) => map.set(itemId, (map.get(itemId) ?? 0) + 1),
        new Map<number, number>()), [selectedIds]);

    const activeRoot = equipmentTypeRoots.find(root => root.id === activeRootId) ?? equipmentTypeRoots[0];

    if (!activeRoot) {
        return (
            <div className={stepContent}>
                <SectionHeading title="Kezdő felszerelés"/>
                <p className={stepIntro}>Jelenleg nincs választható felszerelés.</p>
            </div>
        );
    }

    const activeUsage = equipmentCatalog.getRootUsage(activeRoot.id, usages);

    function updateSelection(nextIds: number[]) {
        setValue("equipmentIds", nextIds, { shouldDirty: true });
    }

    function selectItem(itemId: number) {
        updateSelection(applySelection(itemId, selectedIds, equipmentCatalog.resolveSelection(itemId, usages)));
    }

    function removeAt(index: number) {
        updateSelection(selectedIds.filter((_, selectedIndex) => selectedIndex !== index));
    }

    function selectRoot(rootId: number) {
        setActiveRootId(rootId);
        setPreviewId(null);
    }

    function handlePreview(itemId: number, isActive: boolean) {
        setPreviewId(current => isActive ? itemId : current === itemId ? null : current);
    }

    return (
        <div className={stepContent}>
            <SectionHeading title="Kezdő felszerelés"/>
            <p className={stepIntro}>
                Minden felszerelés slotot foglal. Válogass szabadon, amíg van szabad helyed a keretben.
            </p>
            <div className={styles.layout}>
                <GearSlotTracker equipmentCatalog={equipmentCatalog} activeRootId={activeRootId} usages={usages} previewId={previewId}
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
                    {equipmentCatalog.getRootSections(activeRoot.id).map(section => {
                        const usage = usages.get(section.slotPool.id);
                        const costs = new Set(section.entries.map(entry => entry.cost));
                        const uniformCost = costs.size === 1 ? section.entries[0].cost : undefined;
                        const headingId = `gear-section-${section.type.id}`;
                        return (
                            <section key={section.type.id} className={styles.section} aria-labelledby={headingId}>
                                <header className={styles.sectionHeader}>
                                    <h4 id={headingId} className={styles.sectionTitle}>{section.label}</h4>
                                    {uniformCost !== undefined &&
                                        <span className={styles.badge}>
                                            <SlotPips total={uniformCost} size="small"/>
                                            {uniformCost} slot / db
                                        </span>
                                    }
                                    {!section.slotPool.isRootSlotPool && usage &&
                                        <span className={styles.poolMeta}>Keret: {usage.used} / {section.slotPool.capacity}</span>
                                    }
                                </header>
                                <ul className={styles.grid}>
                                    {section.entries.map(({ item, cost }) => (
                                        <GearItemCard key={item.id} name={item.name}
                                                      cost={uniformCost === undefined ? cost : undefined}
                                                      count={counts.get(item.id) ?? 0}
                                                      status={equipmentCatalog.resolveSelection(item.id, usages).kind}
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
