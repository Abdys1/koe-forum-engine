"use client"

import CharacterRaceBtn from "@/components/MultiStepForm/CreateCharacterForm/CharacterRaceBtn/CharacterRaceBtn";
import { useState } from "react";
import Link from "next/link";
import StepHeading from "@/components/StepHeading/StepHeading";
import { useMultiStepFormContext } from "@/components/MultiStepForm/MultiStepFormContext";
import { glassBox } from "@/styles/shared.css";
import clsx from "clsx";
import * as styles from "./CharacterRaceStep.css";

interface SelectableRace {
    id: string,
    title: string,
    desc: string,
    img: string,
    buttonImg: string
}

const raceElements: SelectableRace[] = [
    {
        id: 'sotetelf',
        title: 'Sötételf',
        desc: 'A sötételfek lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora. Tempora voluptas, quis explicabo officiis similique numquam nihil nulla? Vel, quia? Cumque corporis earum autem qui explicabo nobis. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.',
        img: '/images/ryldan-nobg.png',
        buttonImg: '/images/ryldan-nobg.png'
    },
    {
        id: 'ember',
        title: 'Ember',
        desc: 'Az emberek lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora. Tempora voluptas, quis explicabo officiis similique numquam nihil nulla? Vel, quia? Cumque corporis earum autem qui explicabo nobis. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.',
        img: '/images/ryldan-nobg.png',
        buttonImg: '/images/ryldan-nobg.png'
    },
    {
        id: 'ork',
        title: 'Ork',
        desc: 'Orkok lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora. Tempora voluptas, quis explicabo officiis similique numquam nihil nulla? Vel, quia? Cumque corporis earum autem qui explicabo nobis. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.',
        img: '/images/ryldan-nobg.png',
        buttonImg: '/images/ryldan-nobg.png'
    },
    {
        id: 'elf',
        title: 'Elf',
        desc: 'Elf lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora. Tempora voluptas, quis explicabo officiis similique numquam nihil nulla? Vel, quia? Cumque corporis earum autem qui explicabo nobis. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.',
        img: '/images/ryldan-nobg.png',
        buttonImg: '/images/ryldan-nobg.png'
    },
    {
        id: 'torp',
        title: 'Törp',
        desc: 'Törpök lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora. Tempora voluptas, quis explicabo officiis similique numquam nihil nulla? Vel, quia? Cumque corporis earum autem qui explicabo nobis. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.',
        img: '/images/ryldan-nobg.png',
        buttonImg: '/images/ryldan-nobg.png'
    },
    {
        id: 'felszerzet',
        title: 'Félszerzet',
        desc: 'Félszerzetek lorem ipsum dolor sit amet consecteturreprehenderit assumenda mollitia tempora.',
        img: '/images/ryldan-nobg.png',
        buttonImg: '/images/ryldan-nobg.png'
    },
];

export default function CharacterRaceStep() {
    const formContext = useMultiStepFormContext();
    const { register, getValues, setValue } = formContext.form;

    const [selectedRace, setSelectedRace] = useState<SelectableRace>(getActualRace());

    function getActualRace() {
        const raceId = getValues("raceId");
        const found = raceId ? raceElements.find(e => e.id === raceId) : raceElements[0];
        if (!found) throw Error("Hiba a kiválasztott faj betöltése során!");
        return found;
    }

    function selectRace(race: SelectableRace): void {
        setSelectedRace(race);
        setValue("raceId", race.id);
        setValue("raceTitle", race.title);
    }

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.infoPanel}>
                    <StepHeading title="1. Válaszd ki a karaktered faját:"/>
                    <div className={clsx(styles.glassPanel, glassBox)}>
                        <h3 className={styles.raceTitle}>{selectedRace.title}</h3>
                        <p className={styles.raceDesc}>{selectedRace.desc}</p>
                        <Link href="#" className={styles.moreLink}>Fajokról bővebben</Link>
                    </div>
                </div>
                <ul className={styles.raceList}>
                    {raceElements.map((raceElement) => (
                        <CharacterRaceBtn
                            key={raceElement.id}
                            title={raceElement.title}
                            img={raceElement.buttonImg}
                            onClick={() => selectRace(raceElement)}
                            active={selectedRace.id === raceElement.id}
                        />
                    ))}
                </ul>
                <input type="hidden" {...register("raceId", {value: raceElements[0].id})}/>
                <input type="hidden" {...register("raceTitle", {value: raceElements[0].title})}/>
            </div>
        </div>
    );
}
