import MultiStepBar from "@/components/MultiStepBar";
import MultiStepPagination from "@/components/MultiStepPagination";
import SelectableOptionBtn from "@/components/SelectableOptionBtn";
import PanelNavBtn from "@/components/PanelNavBtn";
import PanelListElement from "@/components/PanelListElement";
import { useState } from "react";

type GearOption = "fegyver" | "pancel";

export default function CharacterGearStep() {
    const [activeGearOption, setActiveGearOption] = useState<GearOption>("fegyver");

    function handleGearOption(gear: GearOption) :void {
        setActiveGearOption(gear);
    }

    return (
        <form className={`relative w-full h-[calc(100vh - 4rem)] flex justify-between items-center flex-col m-8 py-4 px-8 bg-cardBlackBg rounded shadow-md shadow-[rgba(0,0,0,0.4)] overflow-hidden
            after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-full after:bg-[url('/images/wave.svg')] after:bg-no-repeat after:bg-left-bottom after:bg-contain after:z-0`}>
                <div className="relative w-full mb-2 flex justify-center items-center flex-col z-10">
                    <h1 className={`relative w-full mb-2 text-secondaryLight font-poppins font-medium text-start text-xl uppercase tracking-widest`}>Karakter létrehozása</h1>
                    <MultiStepBar />
                </div>
                <div className="relative mt-2 w-full flex justify-start items-start flex-col z-10">
                    <h2 className="relative py-2 px-5 w-full flex justify-start items-center text-secondary font-poppins text-2xl font-semibold tracking-widest">
                        3. Válassz fegyverzetet:
                    </h2>
                    <div className="relative w-full justify-between items-start">
                        <div className="relative w-full max-w-[50%] flex justify-center items-start flex-col">
                            <div className="relative w-full mb-2 flex justify-center items-start">
                                <SelectableOptionBtn title="Fegyverek" onClick={() => handleGearOption("fegyver")} active={activeGearOption === "fegyver"}/>
                                <SelectableOptionBtn title="Páncél" onClick={() => handleGearOption("pancel")} active={activeGearOption === "pancel"}/>
                            </div>
                            <div className="relative w-full max-w-lg h-60 flex justify-center items-start flex-col">
                                <nav className="absolute top-0 left-0 w-full h-9 flex justify-between items-center bg-cardMediumBg z-20 border-b-[0.5px] border-solid border-[rgba(255,255,255,0.3)]">
                                    <PanelNavBtn title="1. Fegyver"/>
                                    <PanelNavBtn title="2. Fegyver"/>
                                    <PanelNavBtn title="Pajzs"/>
                                </nav>
                                <div className="relative w-full h-full mt-9 flex justify-start items-center flex-col bg-gradient-to-b from-black to-transparent overflow-y-auto z-10 scrollbar-thumb-rounded-full scrollbar-thin scrollbar-track-transparent scrollbar-thumb-mainLight">
                                    <ul className="relative w-full">
                                        <PanelListElement title="Fattyúkard" btnTitle="Kiválaszt"/>
                                        <PanelListElement title="Rövidkard" btnTitle="Kiválaszt"/>
                                        <PanelListElement title="1 Fokos" btnTitle="Kiválaszt"/>
                                        <PanelListElement title="2 Fokos" btnTitle="Kiválaszt"/>
                                        <PanelListElement title="3 Fokos" btnTitle="Kiválaszt"/>
                                        <PanelListElement title="4 Fokos" btnTitle="Kiválaszt"/>
                                        <PanelListElement title="5 Fokos" btnTitle="Kiválaszt"/>
                                        <PanelListElement title="6 Fokos" btnTitle="Kiválaszt"/>
                                    </ul> 
                                </div>
                            </div>
                        </div>
                        <div>

                        </div>
                    </div>

                </div>
                <MultiStepPagination/>
        </form>
    );
}