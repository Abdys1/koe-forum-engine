"use client"

import CharacterRaceBtn from "@/components/CharacterRaceBtn";
import { useState } from "react";
import Link from "next/link";
import MultiStepBar from "@/components/MultiStepBar";
import MultiStepPagination from "@/components/MultiStepPagination";
import ComponentHeading from "@/components/ComponentHeading";
import StepHeading from "@/components/StepHeading";
import { UseFormReturn } from "react-hook-form";
import { CharacterInputs } from "@/components/CreateCharacterForm";

interface SelectableRace {
    id: string,
    title: string,
    desc: string,
    img: string,
    buttonImg: string
}

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

interface CharacterRaceStepProps {
    form: UseFormReturn<CharacterInputs, any, undefined>
}

export default function CharacterRaceStep(props: CharacterRaceStepProps) {
    const [selectedRace, setSelectedRace] = useState<SelectableRace>(raceElements[0]);

    const {
        register
    } = props.form;

    function selectRace(race:SelectableRace): void {
        setSelectedRace(race);
    }

    return (
        <form style={{'--imgUrl': `url(${selectedRace.img})`} as React.CSSProperties} className={`relative w-full h-[calc(100vh - 4rem)] flex justify-between items-center flex-col m-8 py-4 px-8 bg-cardBlackBg rounded shadow-md shadow-[rgba(0,0,0,0.4)] overflow-hidden
            before:content-[''] before:absolute before:bottom-0 before:left-0 before:h-full before:w-full before:bg-[image:var(--imgUrl)] before:bg-no-repeat before:bg-left-bottom before:bg-contain before:opacity-60
            after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-full after:bg-[url('/images/wave.svg')] after:bg-no-repeat after:bg-left-bottom after:bg-contain after:z-0`}>
            <div className="relative w-full mb-2 flex justify-center items-center flex-col z-10">
                <ComponentHeading title="Karakter létrehozása" />
                <MultiStepBar />
            </div>
            <div className="relative mt-2 w-full flex justify-end items-start z-10">
                <div className="relative w-full max-w-[50%] flex justify-start items-start flex-col mr-14">
                    <StepHeading title="1. Válaszd ki a karaktered faját:"/>
                    <div className="relative w-full p-4 m-4 mt-2 flex justify-center items-start flex-col z-10 
                    glassBox border-l-8 border-mainHover rounded">
                        <h3 className="relative pb-0.5 mb-2 text-mainHover uppercase tracking-widest font-poppins font-semibold ">
                            {selectedRace.title}
                        </h3>
                        <p className="relative mb-2 font-poppins text-white">
                            {selectedRace.desc}
                        </p>
                        <Link href="#"
                            className="relative p-1 mb-1 border-solid  tracking-widest font-poppins font-medium text-sm text-secondaryMedium hover:text-secondaryDark
                            before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-secondaryDark transition-all before:hover:w-full duration-300 ease-in-out">
                            Fajokról bővebben
                        </Link>
                    </div>
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
                <input type="hidden" {...register("raceId", {value: selectedRace.id})}/>
                <input type="hidden" {...register("raceTitle", {value: selectedRace.title})}/>
            </div>
            <MultiStepPagination/>
            <p className="absolute bottom-24 left-10 text-gray-400 text-xs font-poppins tracking-widest">
                    * illusztráció a kiválasztott fajról
            </p>
        </form >
    );
}