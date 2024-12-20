"use client"

import CharacterRaceBtn from "@/components/multi-step-form/create-character-form/CharacterRaceBtn";
import { useState } from "react";
import Link from "next/link";
import MultiStepBar from "@/components/multi-step-form/MultiStepBar";
import MultiStepPagination from "@/components/multi-step-form/MultiStepPagination";
import ComponentHeading from "@/components/ComponentHeading";
import StepHeading from "@/components/StepHeading";
import { useMultiStepFormContext } from "@/components/multi-step-form/MultiStepFormContext";

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
        desc: 'Félszerzetek lorem ipsum dolor sit amet consecteturreprehenderit assumenda mollitia tempora.',
        img: '/images/ryldan-nobg.png',
        buttonImg: '/images/ryldan-nobg.png'
    },
];

export default function CharacterRaceStep() {
     const formContext = useMultiStepFormContext();
     const {
        register,
        getValues,
        setValue
    } = formContext.form;

    const [selectedRace, setSelectedRace] = useState<SelectableRace>(getActualRace());

    /*useEffect(() => {
        let actualRace: SelectableRace | undefined;
        const raceId = getValues("raceId");
        if(raceId) {
            actualRace = raceElements.find((element) => {
                return element.id === raceId;
            });
        } else {
            actualRace = raceElements[0];
        }
        if(!actualRace) {
           throw Error("Hiba a kiválasztott faj betöltése során!"); 
        }
        selectRace(actualRace);
    }, []);*/

    function getActualRace() {
        let actualRace: SelectableRace | undefined;
        const raceId = getValues("raceId");
        if(raceId) {
            actualRace = raceElements.find((element) => {
                return element.id === raceId;
            });
        } else {
            actualRace = raceElements[0];
        }
        if(!actualRace) {
           throw Error("Hiba a kiválasztott faj betöltése során!"); 
        }
        return actualRace;
    }

    function selectRace(race:SelectableRace): void {
        setSelectedRace(race);
        setValue("raceId", race.id);
        setValue("raceTitle", race.title);
    }

    return (
        <div className="relative w-full h-[calc(100vh - 4rem)] flex justify-between items-center flex-col m-8 py-4 px-8 overflow-hidden">
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
                <input type="hidden" {...register("raceId", {value: raceElements[0].id})}/>
                <input type="hidden" {...register("raceTitle", {value: raceElements[0].title})}/>
            </div>
        </div>
    );
}