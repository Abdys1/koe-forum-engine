import MultiStepBar from "@/components/MultiStepBar";
import MultiStepPagination from "@/components/MultiStepPagination";
import { useState } from "react";
import clsx from "clsx";

export default function CharacterImageStep() {
    const [characterImage, setCharacterImage] = useState("");

    function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
        const images = event.target.files;
        if(!images) {
            throw new Error('No image');
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
                <div className="relative w-full flex justify-between items-start">
                    <div className="relative w-[50%] flex justify-start items-start">
                        <label htmlFor="characterImg" 
                            className="relative w-[185px] h-[308px] ml-16 flex justify-center items-center rounded-sm bg-[rgba(255,255,255,0.02)] border-[2px] border-solid border-secondaryLight outline outline-1 outline-offset-2 outline-secondaryLight cursor-pointer"
                        >
                            <div className="relative w-full h-full flex justify-center item flex-col pb-4">
                                <span className="relative w-full mb-2 flex justify-center items-center text-6xl font-poppins font-medium text-secondaryLight">
                                    +
                                </span>
                                <span className="relative w-full flex justify-center items-center font-poppins font-medium text-secondaryLight tracking-wider uppercase">
                                    Kép feltöltése
                                </span>
                            </div>

                            <img src={characterImage} alt="karaktered képe"
                                className={clsx(`hidden relative w-full h-full object-cover`)}
                            />
                        </label>
                        <input onChange={handleImageChange} type="file" id="characterImg" className="hidden"/>
                    </div>
                </div>
            </div>
            <MultiStepPagination/>
        </form>
    );
}