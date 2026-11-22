"use client"

import clsx from "clsx";
import Image from "next/image";
import { Control, useWatch } from "react-hook-form";

import { sexLabels } from "@/components/MultiStepForm/CreateCharacterForm/CharacterBasicsStep/CharacterBasicsStep";
import type { CharacterInputs } from "@/components/MultiStepForm/CreateCharacterForm/CreateCharacterForm/CreateCharacterForm";
import { useObjectUrl } from "@/hooks/useObjectUrl";

import * as styles from "./CharacterPreview.css";

type CharacterPreviewProps = {
    control: Control<CharacterInputs>
}

export default function CharacterPreview({ control }: CharacterPreviewProps) {
    const values = useWatch({ control });
    const image = values.characterImg?.[0];
    const imageUrl = useObjectUrl(image);

    const characterName = values.characterName?.trim();

    return (
        <section className={styles.strip} aria-label="Karakter előnézet">
            <div className={styles.portrait}>
                {imageUrl
                    ? <span key={imageUrl} className={clsx(styles.portraitInner, styles.portraitReveal)}>
                        <Image src={imageUrl} alt="Karakterkép" fill sizes="2.25rem" className={styles.portraitImg}/>
                      </span>
                    : <span className={clsx("material-icons", styles.portraitIcon)} aria-hidden="true">person</span>
                }
            </div>
            <div className={styles.identity}>
                <h3 key={characterName} className={clsx(styles.name, characterName ? styles.reveal : styles.namePlaceholder)}>
                    {characterName || "Névtelen vándor"}
                </h3>
                <p className={styles.traits}>
                    <span key={values.raceTitle} className={styles.reveal}>{values.raceTitle}</span>
                    <span className={styles.separator} aria-hidden="true">·</span>
                    <span key={values.characterSex} className={styles.reveal}>
                        {values.characterSex && sexLabels[values.characterSex]}
                    </span>
                </p>
            </div>
        </section>
    );
}
