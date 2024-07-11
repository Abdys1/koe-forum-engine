"use client"

import MultiStepLabel from "@/components/MultiStepLabel";
import CharacterRaceBtn from "@/components/CharacterRaceBtn";
import SelectableOptionBtn from "@/components/SelectableOptionBtn";
import MultiStepNavBtn from "@/components/MultiStepNavBtn";
import { useState } from "react";
import Link from "next/link";
import TextField from "@/components/inputs/TextField";

type SelectableSex = "ferfi" | "no";
interface SelectableRace {
    id: string,
    title: string,
    desc: string,
    img: string,
    buttonImg: string
}

const multiStepLabels:string[] = ["Faj", "Alapok", "Felszerelés", "Karakterkép", "Áttekintés"];

const raceElements:SelectableRace[] = [
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
        desc: 'Félszerzetek lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora. Tempora voluptas, quis explicabo officiis similique numquam nihil nulla? Vel, quia? Cumque corporis earum autem qui explicabo nobis. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora.',
        img: '/images/ryldan-nobg.png',
        buttonImg: '/images/ryldan-nobg.png'
    },
];

export default function CreateCharacterForm() {
    const [selectedRace, setSelectedRace] = useState<SelectableRace>(raceElements[0]);
    const [selectedSex, setSelectedSex] = useState<SelectableSex>("ferfi");
    const [actualStep, setActualStep] = useState(2);

    function selectRace(race:SelectableRace): void {
        setSelectedRace(race);
    }

    function selectSex(sex: SelectableSex): void {
        setSelectedSex(sex);
    }

    function getStepStatus(stepIndex: number): "active" | "done" | "unfinished" {
        if(stepIndex === actualStep) {
            return "active";
        } else if(stepIndex < actualStep) {
            return "done";
        } else {
            return "unfinished";
        }
    }

    return (
        <>
            <form style={{'--imgUrl': `url(${selectedRace.img})`, '--progressLine': `${(100 / (multiStepLabels.length - 1)) * actualStep}%`} as React.CSSProperties} className={`relative w-full h-full flex justify-center items-center flex-col m-8 py-4 px-8 bg-cardBlackBg rounded shadow-md shadow-[rgba(0,0,0,0.4)] overflow-hidden
                            before:content-[''] before:absolute before:bottom-0 before:left-0 before:h-full before:w-full before:bg-[image:var(--imgUrl)] before:bg-no-repeat before:bg-left-bottom before:bg-contain before:opacity-60
                            after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-full after:bg-[url('/images/wave.svg')] after:bg-no-repeat after:bg-left-bottom after:bg-contain after:z-0`}>
                <div className="relative w-full mb-2 flex justify-center items-center flex-col z-10">
                    <h1 className={`relative w-full mb-2 text-secondaryLight font-poppins font-medium text-start text-xl uppercase tracking-widest`}>Karakter létrehozása</h1>
                    <ul className={`relative w-full max-w-xl mb-6 flex justify-between items-center
                                   before:content-[''] before:absolute before:top-[50%] before:w-full before:h-[4px] before:translate-y-[-50%] before:bg-cardMediumBg
                                   after:content-[''] after:absolute after:top-[50%] after:left-0 after:w-[var(--progressLine)] after:h-[4px] after:translate-y-[-50%] after:bg-mainHover`}>
                        {
                            multiStepLabels.map((label, i) => {
                                return(
                                    <MultiStepLabel key={i} label={label} stepNum={i + 1} status={getStepStatus(i)} />
                                );
                            })
                        }
                    </ul>
                </div>
                <div className="relative mt-2 w-full flex justify-end items-start z-10">
                    <div className="relative w-full max-w-[50%] flex justify-start items-start flex-col mr-14">
                        <h2 className="relative py-2 px-5 w-full flex justify-start items-center text-secondary font-poppins text-2xl font-semibold tracking-widest">
                            1. Válaszd ki a karaktered faját:
                        </h2>
                        <div className="relative w-full p-4 m-4 mt-2 flex justify-center items-start flex-col z-10 
                         glassBox border-l-8 border-mainHover rounded">
                            <h3 className="relative pb-0.5 mb-2 text-mainHover uppercase tracking-widest font-poppins font-semibold ">
                                {selectedRace.title}
                            </h3>
                            <p className="relative mb-2 font-poppins text-white">
                                {selectedRace.desc}
                            </p>
                            <Link href="#"
                                className="relative p-1 border-solid  tracking-widest font-poppins font-medium text-sm text-secondaryMedium hover:text-secondaryDark">
                                Fajokról bővebben
                            </Link>
                        </div>
                        {/*<div className="relative w-full max-w-2xl h-full p-4 m-4 flex justify-start items-center flex-col
                            glassBox border-l-8 border-mainMedium rounded">
                                <p className="relative mb-2 w-full text-start text-mainLight text-xs font-poppins font-medium tracking-wide">
                                    Nevezd el karaktered és válaszd ki a nemét:
                                </p>
                                <div className="relative w-full flex justify-start items-center">
                                    <TextField label="Karakternév" name="characterName" />
                                </div>
                                <div className="relative flex justify-between items-start flex-col">
                                    <p className="relative mb-1 text-sm font-roboto text-white tracking-wide">
                                        <span className="text-mainHover font-medium uppercase mr-0.5">
                                            Fontos!
                                        </span>
                                        Karaktered neve általad alkotott <span className="text-mainHover">fantasy név</span> legyen. <span className="text-mainHover">Nem</span> lehet már létező valós vagy fiktív személy neve. <span className="text-mainHover">Minimum két részből álljon</span>, és ne tartalmazzon idegen nyelvű szavakat. A magyar abc kis és nagy betűin kívül ä, ë illetve ' szerepelhet benne.
                                    </p>
                                    <Link href="#"
                                        className="relative p-1 mb-1 border-solid  tracking-widest font-poppins font-medium text-sm text-secondaryMedium hover:text-secondaryDark
                                        before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-secondaryDark transition-all before:hover:w-full duration-300 ease-in-out">
                                        Névalkotásról bővebben
                                    </Link>
                                </div>
                                <div className="relative py-2 w-full flex justify-start items-center">
                                    <span className="relative mr-4 text-start text-mainLight text-sm font-poppins font-medium tracking-wide">
                                        Karakter neme:
                                    </span>
                                    <SelectableOptionBtn title="Férfi" onClick={() => selectSex("ferfi")} active={selectedSex === "ferfi"} />
                                    <SelectableOptionBtn title="Nő" onClick={() => selectSex("no")} active={selectedSex === "no"} />
                                </div>
                                
                                
                        </div>*/}
                    </div>
                    <ul className="relative px-2 flex justify-start items-end flex-col">
                        {
                            raceElements.map((raceElement) => {
                                return (
                                    <CharacterRaceBtn key={raceElement.id} title={raceElement.title} img={raceElement.buttonImg} onClick={() => selectRace(raceElement)} active={selectedRace.id === raceElement.id} />
                                );
                            })
                        }
                    </ul>
                </div>
                <div className="relative py-2 w-full flex justify-between items-center z-10">
                    <div className="relative">
                        <MultiStepNavBtn type="button" title="Vissza" disabled />
                    </div>
                    <div className="relative flex justify-end items-center">
                        <MultiStepNavBtn type="button" title="Tovább" />
                        <div className="hidden">
                            <MultiStepNavBtn type="submit" title="Létrehozás"/>
                        </div>
                    </div>
                </div>
            </form >
        </>
    );
};