import MultiStepBar from "@/components/MultiStepBar";
import MultiStepPagination from "@/components/MultiStepPagination";
import SelectableOptionBtn from "@/components/SelectableOptionBtn";
import PanelNavBtn from "@/components/PanelNavBtn";
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
                        <div className="relative w-full flex justify-center items-start flex-col">
                            <div className="relative w-full mb-2 flex justify-center items-start">
                                <SelectableOptionBtn title="Fegyverek" onClick={() => handleGearOption("fegyver")} active={activeGearOption === "fegyver"}/>
                                <SelectableOptionBtn title="Páncél" onClick={() => handleGearOption("pancel")} active={activeGearOption === "pancel"}/>
                            </div>
                            <div className="relative w-full max-w-5xl flex justify-center items-start flex-col">
                                <nav className="fixed top-0 left-0 w-full h-24 flex justify-between items-center bg-cardMediumBg opacity-90">
                                    <PanelNavBtn title="1. Fegyver"/>
                                    <PanelNavBtn title="2. Fegyver"/>
                                    <PanelNavBtn title="Pajzs"/>
                                </nav>
                                <ul>
                                    <li>
                                        Fattyúkard
                                        <button>
                                            Kiválaszt
                                        </button>
                                    </li>
                                </ul>
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