"use client"

import { caveat, sumana } from "@/app/fonts";
import MultiStepLabel from "@/components/MultiStepLabel";
import CharacterRaceBtn from "@/components/CharacterRaceBtn";
import SelectableOptionBtn from "@/components/SelectableOptionBtn";
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
                            before:content-[''] before:absolute before:bottom-0 before:left-0 before:h-full before:w-full before:bg-[url('/images/ryldan-nobg.png')] before:bg-no-repeat before:bg-left-bottom before:bg-contain before:opacity-60">
                <div className="relative w-full flex justify-center items-center flex-col mb-4">
                    <h1 className={`relative w-full text-white font-poppins font-medium text-start text-xl uppercase tracking-widest mb-4`}>Karakter létrehozása</h1>
                    <ul className={`relative w-full max-w-3xl px-16 flex justify-between items-center
                                   before:content-[''] before:absolute before:top-[30%] before:left-20 before:w-[calc(100%-11rem)] before:h-1.5 before:bg-blackBorder`}>
                        <MultiStepLabel label="Alapok" stepNum={1} status="done" />
                        <MultiStepLabel label="Felszerelés" stepNum={2} status="active" />
                        <MultiStepLabel label="Karakterkép" stepNum={3} status="unfinished" />
                        <MultiStepLabel label="Áttekintés" stepNum={4} status="unfinished" />
                    </ul>
                </div>
                <div className="relative w-full flex justify-between items-start">
                    <div className="relative w-full h-full flex justify-start items-center flex-col">
                        <div className="relative flex justify-center items-center">
                            <TextField label="Karakternév" name="characterName"/>
                        </div>
                        <div className="relative w-full flex justify-center items-center">
                            <SelectableOptionBtn title="Férfi" onClick={() => selectSex("ferfi")} active={selectedSex === "ferfi"} />
                            <SelectableOptionBtn title="Nő" onClick={() => selectSex("no")} active={selectedSex === "no"} />
                        </div>
                    </div>
                    <div className="relative p-2 flex justify-center items-start flex-col w-full max-w-96">
                        <h3 className="relative pb-0.5 mb-2 text-mainHover uppercase tracking-widest font-poppins font-semibold border-b-2 border-mainHover">
                            Sötételf
                        </h3>
                        <p className="relative mb-2 font-poppins text-white">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora. Tempora voluptas, quis explicabo officiis similique numquam nihil nulla? Vel, quia? Cumque corporis earum autem qui explicabo nobis.
                        </p>
                        <Link href="#"
                            className="relative p-1 border-solid border-b-2 border-mainLight tracking-widest font-poppins font-medium text-mainLight text-sm hover:text-mainHover hover:border-mainHover">
                            Fajokról bővebben
                        </Link>
                    </div>
                    <ul className="relative flex justify-start items-end flex-col">
                        <CharacterRaceBtn title="Sötételf" onClick={() => selectRace("sotetelf")} active={selectedRace === "sotetelf"} />
                        <CharacterRaceBtn title="Ember" onClick={() => selectRace("ember")} active={selectedRace === "ember"} />
                        <CharacterRaceBtn title="Ork" onClick={() => selectRace("ork")} active={selectedRace === "ork"} />
                        <CharacterRaceBtn title="Elf" onClick={() => selectRace("elf")} active={selectedRace === "elf"} />
                        <CharacterRaceBtn title="Törp" onClick={() => selectRace("torp")} active={selectedRace === "torp"} />
                        <CharacterRaceBtn title="Félszerzet" onClick={() => selectRace("felszerzet")} active={selectedRace === "felszerzet"} />
                    </ul>
                </div>
                <div>
                    <button type="button">Vissza</button>
                    <button type="button">Tovább</button>
                    <button type="submit">Létrehozás</button>
                </div>
            </form >
        </>
    );
};