import MultiStepBar from "@/components/MultiStepBar";
import MultiStepPagination from "@/components/MultiStepPagination";
import { useState } from "react";
import Link from "next/link";

export default function CharacterImageStep() {
    const IMAGE_PLACEHOLDER = "";
    const [characterImage, setCharacterImage] = useState(IMAGE_PLACEHOLDER);

    function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
        const images = event.target.files;
        if(!images) {
            throw new Error('No image');
        }
        if(images.length === 0) {
            return;
        }
        setCharacterImage(URL.createObjectURL(images[0]));
    }

    return (
        <form className="relative w-full h-[calc(100vh - 4rem)] flex justify-between items-center flex-col m-8 py-4 px-8 bg-cardBlackBg rounded shadow-md shadow-[rgba(0,0,0,0.4)] overflow-hidden
            after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-full after:bg-[url('/images/wave.svg')] after:bg-no-repeat after:bg-left-bottom after:bg-contain after:z-0">
            <div className="relative w-full mb-2 flex justify-center items-center flex-col z-10">
                <h1 className={`relative w-full mb-2 text-secondaryLight font-poppins font-medium text-start text-xl uppercase tracking-widest`}>Karakter létrehozása</h1>
                <MultiStepBar />
            </div>
            <div className="relative mt-2 w-full flex justify-start items-start flex-col z-10">
                <h2 className="relative py-2 px-5 mb-2 w-full flex justify-start items-center text-secondary font-poppins text-2xl font-semibold tracking-widest">
                    4. Töltsd fel karakterképed:
                </h2>
                <div className="relative w-full flex justify-evenly items-start">
                    {/*<div className="relative w-[50%] flex justify-center items-start">*/}
                        <label htmlFor="characterImg" 
                            className="relative w-[185px] h-[308px] mr-4 flex justify-center items-center rounded-sm bg-[rgba(255,255,255,0.02)] border-[2px] border-solid border-secondaryLight outline outline-1 outline-offset-2 outline-secondaryLight cursor-pointer"
                        >
                            { characterImage === IMAGE_PLACEHOLDER && 
                                <div className="relative w-full h-full flex justify-center item flex-col pb-4">
                                    <span className="relative w-full mb-2 flex justify-center items-center text-6xl font-poppins font-medium text-secondaryLight">
                                        +
                                    </span>
                                    <span className="relative w-full flex justify-center items-center font-poppins font-medium text-secondaryLight tracking-wider uppercase">
                                        Kép feltöltése
                                    </span>
                                </div>
                            }
                            { characterImage !== IMAGE_PLACEHOLDER &&
                                <>
                                    <img src={characterImage} alt="karaktered képe"
                                        className="relative w-full h-full object-cover"
                                    />
                                    <span className="absolute top-0 left-0 w-full h-full pb-2 flex justify-center items-center bg-[rgba(0,0,0,0.5)] text-secondaryLight text-md font-medium font-poppins uppercase tracking-wider opacity-0 hover:opacity-100 transition-all duration-300 ease-out">
                                        Kép módosítása
                                    </span>
                                </>
                            }
                        </label>
                        <input onChange={handleImageChange} type="file" id="characterImg" className="hidden"/>
                    {/*</div>*/}
                    {/*<div className="relative w-[50%] flex justify-start items-start">*/}
                            <div className="relative w-full max-w-2xl p-4 mb-2 flex justify-center items-start flex-col z-10 
                                glassBox border-l-8 border-mainLight rounded">
                                    <h3 className="relative w-full pb-2 text-mainLight uppercase tracking-widest font-poppins font-semibold">
                                        Segédlet képfeltöltéséhez:
                                    </h3>
                                    <p className="relative mb-2 text-sm font-roboto text-white tracking-wide">
                                    A megjelenített kép mérete <span className="text-mainHover">186px</span> x <span className="text-mainHover">308px</span>, az optimális képarány <span className="text-mainHover">3 : 5</span>. A sikeres feltöltéshez használj <span className="text-mainHover">png</span>, <span className="text-mainHover">jpg</span> vagy <span className="text-mainHover">jpeg</span> formátumú képet.
                                    </p>
                                    <p className="relative mb-1 text-sm font-roboto text-white tracking-wide">
                                        <span className="text-mainHover font-medium uppercase mr-0.5">
                                            Fontos!
                                        </span>
                                        A karakteredhez választott kép <span className="text-mainHover">nem</span> lehet létező személyt ábrázoló kép (pl. híresség, vagy a szelfid sem). Továbbá <span className="text-mainHover">ne válassz</span> közismert történetek szereplőiről készült illusztrációt saját karakterednek. Olyan képet válassz, ami illik az általad korábban megadott paraméterekhez (karakter faja, neme).
                                    </p>
                                    <Link href="#"
                                        className="relative p-1 mb-1 border-solid  tracking-widest font-poppins font-medium text-sm text-secondaryMedium hover:text-secondaryDark
                                        before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-secondaryDark transition-all before:hover:w-full duration-300 ease-in-out">
                                        Karakterképről bővebben
                                    </Link>
                            </div>
                    {/*</div>*/}
                </div>
            </div>
            <MultiStepPagination/>
        </form>
    );
}