"use client"

import MultiStepLabel from "@/components/MultiStepLabel";
import CharacterRaceBtn from "@/components/CharacterRaceBtn";
import SelectableOptionBtn from "@/components/SelectableOptionBtn";
import MultiStepNavBtn from "@/components/MultiStepNavBtn";
import { useState } from "react";
import Link from "next/link";
import TextField from "@/components/inputs/TextField";

type SelectableRace = "sotetelf" | "ember" | "ork" | "elf" | "torp" | "felszerzet";
type SelectableSex = "ferfi" | "no";

export default function CreateCharacterForm() {
    const [selectedRace, setSelectedRace] = useState<SelectableRace>("sotetelf");
    const [selectedSex, setSelectedSex] = useState<SelectableSex>("ferfi");

    function selectRace(race: SelectableRace) {
        setSelectedRace(race);
    }

    function selectSex(sex: SelectableSex) {
        setSelectedSex(sex);
    }

    return (
        <>
            <form className="relative w-full h-full flex justify-center items-center flex-col m-8 py-4 px-8 bg-cardBlackBg rounded shadow-md shadow-[rgba(0,0,0,0.4)] overflow-hidden
                            before:content-[''] before:absolute before:bottom-0 before:left-0 before:h-full before:w-full before:bg-[url('/images/ryldan-nobg.png')] before:bg-no-repeat before:bg-left-bottom before:bg-contain before:opacity-60
                            after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-full after:bg-[url('/images/wave.svg')] after:bg-no-repeat after:bg-left-bottom after:bg-contain after:z-0">
                <div className="relative w-full mb-2 flex justify-center items-center flex-col z-10">
                    <h1 className={`relative w-full mb-2 text-white font-poppins font-medium text-start text-xl uppercase tracking-widest`}>Karakter létrehozása</h1>
                    <ul className={`relative w-full max-w-3xl px-16 flex justify-between items-center
                                   before:content-[''] before:absolute before:top-[26%] before:left-20 before:w-[calc(100%-11rem)] before:h-1 before:bg-cardMediumBg
                                   after:content-[''] after:absolute after:top-[26%] after:left-20 after:w-[calc((100%-11rem)/4*1)] after:h-1 after:bg-mainHover`}>
                        <MultiStepLabel label="Faj" stepNum={1} status="done" />
                        <MultiStepLabel label="Alapadatok" stepNum={2} status="active" />
                        <MultiStepLabel label="Felszerelés" stepNum={3} status="unfinished" />
                        <MultiStepLabel label="Karakterkép" stepNum={4} status="unfinished" />
                        <MultiStepLabel label="Áttekintés" stepNum={5} status="unfinished" />
                    </ul>
                </div>
                <div className="relative mt-2 w-full flex justify-end items-start z-10">
                    <div className="relative w-full max-w-[50%] flex justify-start items-start flex-col mr-14">
                        <div className="relative w-full p-4 m-4 mt-0 flex justify-center items-start flex-col  
                         glassBox border-l-8 border-mainHover rounded">
                            <h3 className="relative pb-0.5 mb-2 text-mainHover uppercase tracking-widest font-poppins font-semibold ">
                                Sötételf
                            </h3>
                            <p className="relative mb-2 font-poppins text-white">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora. Tempora voluptas, quis explicabo officiis similique numquam nihil nulla? Vel, quia? Cumque corporis earum autem qui explicabo nobis.
                            </p>
                            <Link href="#"
                                className="relative p-1 border-solid  tracking-widest font-poppins font-medium text-sm text-secondaryMedium hover:text-secondaryDark">
                                Fajokról bővebben
                            </Link>
                        </div>
                        <div className="relative w-full max-w-2xl h-full p-4 m-4 flex justify-start items-center flex-col
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
                                
                                
                        </div>
                    </div>
                    <ul className="relative pb-2 flex justify-start items-end flex-col bg-gradient-to-t from-transparent to-[rgba(0,0,0,0.3)]">
                        <h3 className="relative mb-4 py-1 px-2 w-full flex justify-center items-center bg-cardBlackBg text-secondary border-solid border-b-2 border-secondary font-poppins text-base font-medium tracking-widest uppercase">Válassz fajt:</h3>
                        <CharacterRaceBtn title="Sötételf" onClick={() => selectRace("sotetelf")} active={selectedRace === "sotetelf"} />
                        <CharacterRaceBtn title="Ember" onClick={() => selectRace("ember")} active={selectedRace === "ember"} />
                        <CharacterRaceBtn title="Ork" onClick={() => selectRace("ork")} active={selectedRace === "ork"} />
                        <CharacterRaceBtn title="Elf" onClick={() => selectRace("elf")} active={selectedRace === "elf"} />
                        <CharacterRaceBtn title="Törp" onClick={() => selectRace("torp")} active={selectedRace === "torp"} />
                        <CharacterRaceBtn title="Félszerzet" onClick={() => selectRace("felszerzet")} active={selectedRace === "felszerzet"} />
                    </ul>
                </div>
                <div className="relative py-2 w-full flex justify-between items-center z-10">
                    <div className="relative">
                        <MultiStepNavBtn type="button" title="Vissza" status="disabled" />
                    </div>
                    <div className="relative flex justify-end items-center">
                        <MultiStepNavBtn type="button" title="Tovább" status="hidden" />
                        <MultiStepNavBtn type="submit" title="Létrehozás" status="active" />
                    </div>
                </div>
            </form >
        </>
    );
};