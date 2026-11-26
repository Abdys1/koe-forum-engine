"use client"

import Button from "@/components/atoms/Button/Button";
import SectionHeading from "@/components/atoms/SectionHeading/SectionHeading";
import CharacterRaceFilmstrip from "@/components/organisms/character/CreateCharacterForm/steps/CharacterRaceFilmstrip/CharacterRaceFilmstrip";
import type { Race } from "@/lib/api/race/types";

import * as styles from "./CharacterRaceStep.css";

type CharacterRaceStepProps = {
    races: Race[],
    selectedRace: Race | undefined
}

export default function CharacterRaceStep({ races, selectedRace }: CharacterRaceStepProps) {

    return (
        <div className={styles.content}>
            <div className={styles.stage}>
                <div className={styles.detail}>
                    <SectionHeading title="Származás"/>
                    {selectedRace && (
                        <article key={selectedRace.id} className={styles.infoPanel}>
                            <h3 className={styles.raceTitle}>{selectedRace.name}</h3>
                            <p className={styles.teaser}>{selectedRace.teaser}</p>
                            <p className={styles.raceDesc}>{selectedRace.description}</p>
                            <Button href="#" variant="outline" size="medium" title="Részletes ismertető"/>
                        </article>
                    )}
                </div>
            </div>
            <CharacterRaceFilmstrip races={races}/>
        </div>
    );
}
