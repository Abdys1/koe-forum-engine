'use client'

import clsx from "clsx";
import { useMemo } from "react";
import Button from "@/components/Button/Button";
import { sexLabels, SelectableSex } from "@/components/MultiStepForm/CreateCharacterForm/CharacterBasicsStep/CharacterBasicsStep";
import CharacterPortraitFrame from "@/components/MultiStepForm/CreateCharacterForm/CharacterPortraitFrame/CharacterPortraitFrame";
import GearTypeIcon from "@/components/MultiStepForm/CreateCharacterForm/GearTypeIcon/GearTypeIcon";
import SlotPips from "@/components/MultiStepForm/CreateCharacterForm/SlotPips/SlotPips";
import { useMultiStepFormContext } from "@/components/MultiStepForm/MultiStepFormContext";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import { useObjectUrl } from "@/hooks/useObjectUrl";
import { discordLink } from "@/lib/socialLinks";
import { compactSelection, equipmentRoots, getPoolUsages, getRootUsage, groupSelectionBySlot } from "@/lib/equipment";
import { stepContent, stepIntro } from "@/components/MultiStepForm/CreateCharacterForm/characterStep.css";
import * as styles from "./CharacterSummaryStep.css";

type EditButtonProps = {
    label: string,
    onClick: () => void
}

function EditButton({ label, onClick }: EditButtonProps) {
    return (
        <button type="button" className={styles.editBtn} onClick={onClick} aria-label={label} title={label}>
            <span className={clsx("material-icons", styles.editIcon)} aria-hidden="true">edit</span>
        </button>
    );
}

export default function CharacterSummaryStep() {
    const { form, steps, goToStep } = useMultiStepFormContext();
    const { getValues } = form;

    const characterName: string = getValues("characterName");
    const raceTitle: string = getValues("raceTitle");
    const characterSex: SelectableSex = getValues("characterSex");
    const characterImage = useObjectUrl(getValues("characterImg")?.[0]);

    const selectedIds = useMemo(() => compactSelection(getValues("equipmentIds")), [getValues]);
    const usages = useMemo(() => getPoolUsages(selectedIds), [selectedIds]);

    const openStep = (label: string) => () => goToStep(steps.indexOf(label));

    return (
        <div className={stepContent}>
            <SectionHeading eyebrow="5. lépés" title="Vár az út"/>
            <p className={stepIntro}>
                Ellenőrizd az adatokat, mielőtt életre kelted a karaktered.
            </p>

            <div className={styles.sheetRow}>
                <CharacterPortraitFrame imageUrl={characterImage} onClick={openStep("Karakterkép")} label="Karakterkép cseréje"
                    overlay={{ icon: "swap_horiz", text: "Kép cseréje" }}/>

                <article className={styles.sheet} aria-label="Karakterlap">
                    <header className={styles.identity}>
                        <div className={styles.nameRow}>
                            <h3 className={styles.name}>{characterName}</h3>
                            <EditButton label="Név módosítása" onClick={openStep("Identitás")}/>
                        </div>
                        <div className={styles.seals}>
                            <button type="button" className={styles.seal} onClick={openStep("Faj")} aria-label={`Faj: ${raceTitle}. Módosítás`}>
                                <span className={styles.sealLabel}>Faj</span>
                                {raceTitle}
                                <span className={clsx("material-icons", styles.sealIcon)} aria-hidden="true">edit</span>
                            </button>
                            <button type="button" className={styles.seal} onClick={openStep("Identitás")} aria-label={`Nem: ${sexLabels[characterSex]}. Módosítás`}>
                                <span className={styles.sealLabel}>Nem</span>
                                {sexLabels[characterSex]}
                                <span className={clsx("material-icons", styles.sealIcon)} aria-hidden="true">edit</span>
                            </button>
                        </div>
                    </header>

                    <section className={styles.gear} aria-labelledby="summary-gear-title">
                        <div className={styles.sectionHeader}>
                            <h4 id="summary-gear-title" className={styles.sectionTitle}>Felszerelés</h4>
                            <EditButton label="Felszerelés módosítása" onClick={openStep("Felszerelés")}/>
                        </div>
                        <div className={styles.gearRoots}>
                            {equipmentRoots.map(root => {
                                const gearRows = groupSelectionBySlot(selectedIds, root.id);
                                const { used, capacity } = getRootUsage(root.id, usages);
                                return (
                                    <div key={root.id} className={styles.rootCard}>
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
                                            : <p className={styles.emptyGear}>Nincs kiválasztva</p>
                                        }
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                </article>

                <aside className={styles.infoPanel} aria-label="Információk">
                    <div className={styles.infoStatus} role="note">
                        <div className={styles.infoHeader}>
                            <span className={clsx("material-icons", styles.infoIcon)} aria-hidden="true">check</span>
                            <p className={styles.infoTitle}>Elkészültél a karaktered elsődleges adataival</p>
                        </div>
                        <p className={styles.infoText}>
                            Külső leírás és háttértörténet megadására a létrehozás után lesz lehetőséged.
                        </p>
                    </div>
                    <div className={styles.helpSection}>
                        <h4 className={styles.helpTitle}>Jól jönne némi segítség?</h4>
                        <p className={styles.infoText}>Nézd meg a karakteralkotási segédletet.</p>
                        <Button href="#" variant="outline" size="medium" title="Segédlet" className={styles.helpBtn}/>
                        <p className={styles.infoText}>Ha nem találod a választ, chaten vagy discordon elérhetsz minket.</p>
                    </div>
                    <div className={styles.contactLinks}>
                        <a href="#" className={styles.contactLink} aria-label="Chat" title="Chat">
                            <span className={clsx("material-icons", styles.contactIcon)} aria-hidden="true">chat</span>
                        </a>
                        <a href="#" className={styles.contactLink} aria-label={discordLink.label} title={discordLink.label}>
                            {discordLink.icon}
                        </a>
                    </div>
                </aside>
            </div>

            <p className={styles.closing}>
                A világ nyitva áll előtted. Ha készen állsz, lépd át a küszöbét.
            </p>
        </div>
    );
}
