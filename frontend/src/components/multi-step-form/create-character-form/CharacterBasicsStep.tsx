'use client'

import TextField from "@/components/inputs/TextField";
import SelectableOptionBtn from "@/components/SelectableOptionBtn";
import StepHeading from "@/components/StepHeading";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useMultiStepFormContext } from "@/components/multi-step-form/MultiStepFormContext";

export type SelectableSex = "ferfi" | "no";

export default function CharacterBasicsStep() {
    const formContext = useMultiStepFormContext();
    const {
        register,
        getValues,
        setValue,
        formState: {errors}
    } = formContext.form;
    const [selectedSex, setSelectedSex] = useState<SelectableSex>(getValues("charaterSex"));

    function selectSex(sex: SelectableSex): void {
        setSelectedSex(sex);
        setValue("charaterSex", sex);
    }

    return (
        <form className={`relative w-full h-[calc(100vh - 4rem)] flex justify-between items-center flex-col m-8 py-4 px-8 overflow-hidden`}>
            <div className="relative mt-2 w-full flex justify-end items-start z-10">
                <div className="relative w-full max-w-[70%] flex justify-start items-start flex-col mr-14">
                    <StepHeading title="2. Nevezd el karaktered és válaszd ki a nemét:" />
                    <div className="relative w-full p-4 m-4 mt-2 flex justify-center items-start flex-col z-10 
                    glassBox border-l-8 border-mainHover rounded">
                        <div className="relative w-full flex justify-start items-center">
                            <TextField label="Karakternév" {...register("characterName", {required: "A mező kitöltése kötelező!"})} errors={errors}/>
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
                            <SelectableOptionBtn title="Férfi" onClick={() => selectSex("ferfi")} active={selectedSex === "ferfi"}/>
                            <SelectableOptionBtn title="Nő" onClick={() => selectSex("no")} active={selectedSex === "no"} />
                                <input type="hidden" {...register("characterSex")}/>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}