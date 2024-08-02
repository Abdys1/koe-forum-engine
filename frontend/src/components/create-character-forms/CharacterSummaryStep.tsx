import MultiStepBar from "@/components/MultiStepBar";
import MultiStepPagination from "@/components/MultiStepPagination";

export default function CharacterSummaryStep() {
    return (
        <form className="relative w-full h-[calc(100vh - 4rem)] flex justify-between items-center flex-col m-8 py-4 px-8 bg-cardBlackBg rounded shadow-md shadow-[rgba(0,0,0,0.4)] overflow-hidden
            after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-full after:bg-[url('/images/wave.svg')] after:bg-no-repeat after:bg-left-bottom after:bg-contain after:z-0">
            <div className="relative w-full mb-2 flex justify-center items-center flex-col z-10">
                <h1 className={`relative w-full mb-2 text-secondaryLight font-poppins font-medium text-start text-xl uppercase tracking-widest`}>Karakter létrehozása</h1>
                <MultiStepBar />
            </div>
            <div className="relative mt-2 w-full flex justify-start items-start flex-col z-10">
                <h2 className="relative py-2 px-5 mb-2 w-full flex justify-start items-center text-secondary font-poppins text-2xl font-semibold tracking-widest">
                    5. Utolsó lépés! Tekintsd át karaktered adatait:
                </h2>
                <div className="relative w-full flex justify-between items-start">
                    {/*<div className="relative w-full max-w-xs px-4 py-2 mb-2 mr-8 flex justify-center items-start flex-col z-10 
                        glassBox border-l-8 border-mainHover rounded">
                        <p className="relative text-sm font-roboto text-white tracking-wide">
                            <span className="text-mainHover font-medium uppercase mr-0.5">
                                Fontos!
                            </span>
                                Mindjárt elkészülsz! Mielőtt befejeznéd a karakteralkotást, kérlek győződj meg arról, hogy minden adatot jól adtál meg. Ha mindent rendben találsz, kattints a "Létrehozás" gombra.
                        </p>
                    </div>*/}
                    <div className="relative w-full flex justify-start items-start">
                        <div className="relative w-full flex justify-start items-start">
                            <div className="relative w-[185px] h-[308px] mr-4 flex justify-center items-center rounded-sm bg-[rgba(255,255,255,0.02)] border-[2px] border-solid border-mainLight outline outline-1 outline-offset-2 outline-mainLight cursor-pointer">
                                <img src="/images/ryldan2.png" alt="Az általad kiválasztott karakterkép"
                                    className="relative w-full h-full object-cover z-40"
                                />
                            </div>
                            <div className="relative flex justify-start items-start flex-col w-full max-w-xl p-4 mb-2 z-10 
                                glassBox border-l-8 border-mainLight rounded">
                                <h3 className="relative pb-2 text-mainLight uppercase tracking-widest font-poppins font-semibold">
                                    Ryldan Dolzack
                                </h3>
                                <h4 className="relative text-white font-poppins font-medium tracking-widest">
                                    <span>sötételf</span>, <span>férfi</span>
                                </h4>

                            </div>
                        </div>
                        
                    </div>
                    
                </div>
            </div>
            <MultiStepPagination/>
        </form>
    );
}