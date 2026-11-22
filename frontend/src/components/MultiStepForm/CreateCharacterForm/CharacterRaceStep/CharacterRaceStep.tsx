"use client"

import { useWatch } from "react-hook-form";

import Button from "@/components/Button/Button";
import CharacterRaceFilmstrip from "@/components/MultiStepForm/CreateCharacterForm/CharacterRaceFilmstrip/CharacterRaceFilmstrip";
import { useMultiStepFormContext } from "@/components/MultiStepForm/MultiStepFormContext";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import { findRace } from "@/dummydata/races";

import * as styles from "./CharacterRaceStep.css";

export default function CharacterRaceStep() {
    const { control } = useMultiStepFormContext().form;
    const raceId = useWatch({ control, name: "raceId" });
    const selectedRace = findRace(raceId);

    return (
        <div className={styles.content}>
            <div className={styles.stage}>
                <div className={styles.detail}>
                    <SectionHeading title="Származás"/>
                    <article key={selectedRace.id} className={styles.infoPanel}>
                        <h3 className={styles.raceTitle}>{selectedRace.title}</h3>
                        <p className={styles.teaser}>{selectedRace.teaser}</p>
                        <p className={styles.raceDesc}>{selectedRace.desc}</p>
                        <Button href="#" variant="outline" size="medium" title="Részletes ismertető"/>
                    </article>
                </div>
            </div>
            <CharacterRaceFilmstrip/>
        </div>
    );
}
