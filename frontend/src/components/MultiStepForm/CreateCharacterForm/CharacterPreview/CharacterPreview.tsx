"use client"

import clsx from "clsx";
import Image from "next/image";
import { useMemo } from "react";
import { Control, useWatch } from "react-hook-form";
import { sexLabels } from "@/components/MultiStepForm/CreateCharacterForm/CharacterBasicsStep/CharacterBasicsStep";
import type { CharacterInputs } from "@/components/MultiStepForm/CreateCharacterForm/CreateCharacterForm/CreateCharacterForm";
import { useObjectUrl } from "@/hooks/useObjectUrl";
import { compactSelection, equipmentRoots, getPoolUsages, getRootUsage, groupSelectionByType } from "@/lib/equipment";
import * as styles from "./CharacterPreview.css";

type CharacterPreviewProps = {
    control: Control<CharacterInputs>
}

export default function CharacterPreview({ control }: CharacterPreviewProps) {
    const values = useWatch({ control });
    const image = values.characterImg?.[0];
    const imageUrl = useObjectUrl(image);

    const characterName = values.characterName?.trim();

    const selectedIds = useMemo(() => compactSelection(values.equipmentIds), [values.equipmentIds]);
    const usages = useMemo(() => getPoolUsages(selectedIds), [selectedIds]);

    return (
        <section className={styles.sheet} aria-label="Karakter előnézet">
            <h3 key={characterName} className={clsx(styles.name, characterName ? styles.reveal : styles.namePlaceholder)}>
                {characterName || "Névtelen vándor"}
            </h3>
            <div className={styles.identity}>
                <div className={styles.portrait}>
                    {imageUrl
                        ? <span key={imageUrl} className={clsx(styles.portraitInner, styles.portraitReveal)}>
                            <Image src={imageUrl} alt="Karakterkép" fill sizes="14rem" className={styles.portraitImg}/>
                          </span>
                        : <>
                            <span className={clsx("material-icons", styles.portraitIcon)} aria-hidden="true">person</span>
                            <span className={styles.portraitHint}>Karakterkép: 4. lépés</span>
                          </>
                    }
                </div>
                <dl className={styles.traits}>
                    <div className={styles.trait}>
                        <dt className={styles.traitLabel}>Faj</dt>
                        <dd key={values.raceTitle} className={clsx(styles.traitValue, styles.reveal)}>{values.raceTitle}</dd>
                    </div>
                    <div className={styles.trait}>
                        <dt className={styles.traitLabel}>Nem</dt>
                        <dd key={values.characterSex} className={clsx(styles.traitValue, styles.reveal)}>
                            {values.characterSex && sexLabels[values.characterSex]}
                        </dd>
                    </div>
                </dl>
            </div>
            {equipmentRoots.map(root => {
                const typeGroups = groupSelectionByType(selectedIds, root.id);
                const { used, capacity } = getRootUsage(root.id, usages);
                return (
                    <div key={root.id} className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <h4 className={styles.sectionTitle}>{root.label}</h4>
                            <span className={styles.sectionMeta}>{used} / {capacity} slot</span>
                        </div>
                        {typeGroups.length > 0
                            ? <dl className={styles.gearList}>
                                {typeGroups.map(({ type, groups }) => (
                                    <div key={type.id} className={styles.gearRow}>
                                        <dt className={styles.gearLabel}>{type.label}</dt>
                                        <dd className={styles.gearItems}>
                                            {groups.map(({ entry, count }) => (
                                                <span key={`${entry.item.id}-${count}`} className={clsx(styles.gearValue, styles.reveal)}>
                                                    {entry.item.name}{count > 1 && ` ×${count}`}
                                                </span>
                                            ))}
                                        </dd>
                                    </div>
                                ))}
                              </dl>
                            : <p className={clsx(styles.gearValue, styles.emptyValue)}>Nincs kiválasztva</p>
                        }
                    </div>
                );
            })}
        </section>
    );
}
