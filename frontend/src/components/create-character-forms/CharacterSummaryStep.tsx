import MultiStepBar from "@/components/MultiStepBar";
import MultiStepPagination from "@/components/MultiStepPagination";
import SelectedGearElement from "@/components/SelectedGearElement";
import ComponentHeading from "@/components/ComponentHeading";
import StepHeading from "@/components/StepHeading";
import { UseFormReturn } from "react-hook-form";
import { CharacterInputs } from "@/components/CreateCharacterForm";

interface CharacterSummaryStepProps {
    form: UseFormReturn<CharacterInputs, any, undefined>
}

export default function CharacterSummaryStep(props:CharacterSummaryStepProps) {

    const {
        getValues
    } = props.form;

    const characterName = getValues("characterName");
    const characterRace = getValues("raceTitle");
    const characterSex = getCharSex();
    const selectedPrimaryWeapon = getValues("primaryWeaponTitle");
    const selectedSecondaryWeapon = getValues("secondaryWeaponTitle");
    const selectedShield = getValues("shieldTitle");
    const selectedBodyArmor = getValues("bodyArmorTitle");
    const selectedSecondaryArmor = getValues("secondaryArmorTitle");
    const selectedHelmet = getValues("helmetTitle");
    const characterImage = createCharacterImgUrl();

    function getCharSex() {
        let charSex;
        const sex = getValues("charaterSex");
        if(sex === "ferfi") {
            charSex = "férfi";
        }
        else {
            charSex = "nő";
        }
        return charSex;
    }

    function createCharacterImgUrl() {
        const files = getValues("characterImg");
        const imgUrl = URL.createObjectURL(files[0]);
        return imgUrl;
    }

    return (
        <form className="relative w-full h-[calc(100vh - 4rem)] flex justify-between items-center flex-col m-8 py-4 px-8 bg-cardBlackBg rounded shadow-md shadow-[rgba(0,0,0,0.4)] overflow-hidden
            after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-full after:bg-[url('/images/wave.svg')] after:bg-no-repeat after:bg-left-bottom after:bg-contain after:z-0">
            <div className="relative w-full mb-2 flex justify-center items-center flex-col z-10">
                <ComponentHeading title="Karakter létrehozása"/>
                <MultiStepBar />
            </div>
            <div className="relative mt-2 w-full flex justify-start items-start flex-col z-10">
                <StepHeading title="5. Utolsó lépés! Tekintsd át karaktered adatait:"/>
                    {/*<div className="relative w-full max-w-xs px-4 py-2 mb-2 mr-8 flex justify-center items-start flex-col z-10 
                        glassBox border-l-8 border-mainHover rounded">
                        <p className="relative text-sm font-roboto text-white tracking-wide">
                            <span className="text-mainHover font-medium uppercase mr-0.5">
                                Fontos!
                            </span>
                                Mindjárt elkészülsz! Mielőtt befejeznéd a karakteralkotást, kérlek győződj meg arról, hogy minden adatot jól adtál meg. Ha mindent rendben találsz, kattints a "Létrehozás" gombra.
                        </p>
                    </div>*/}
                        <div className="relative w-full mt-2 flex justify-center items-start flex-row-reverse">
                            <div className="relative w-[185px] h-[308px] flex justify-center items-center rounded-sm bg-[rgba(255,255,255,0.02)] border-[2px] border-solid border-mainLight outline outline-1 outline-offset-2 outline-mainLight cursor-pointer">
                                <img src={characterImage} alt="Az általad kiválasztott karakterkép"
                                    className="relative w-full h-full object-cover z-40"
                                />
                            </div>
                            <div className="relative mr-16 flex justify-start items-start flex-col w-full max-w-2xl p-4 mb-2 z-10 
                                glassBox border-l-8 border-mainLight rounded">
                                <div className="relative w-full flex justify-start items-start flex-col">
                                    <h3 className="relative mb-2 text-mainLight text-lg tracking-wide font-poppins font-semibold">
                                    {characterName}
                                    </h3>
                                    <h4 className="relative min-w-fit mb-4 text-white text-sm font-poppins font-medium tracking-widest uppercase">
                                        <span>{characterRace}</span>, <span>{characterSex}</span>
                                    </h4>
                                </div>
                                <div className="relative w-full flex justify-between items-start mr-2">
                                    <div className="relative w-full max-w-[50%] flex justify-start items-start flex-col">
                                        <SelectedGearElement optionTitle="Elsődleges fegyver" gearTitle={selectedPrimaryWeapon} isActiveClearBtn={false}/>
                                        <SelectedGearElement optionTitle="Másodlagos fegyver" gearTitle={selectedSecondaryWeapon} isActiveClearBtn={false}/>
                                        <SelectedGearElement optionTitle="Pajzs" gearTitle={selectedShield} isActiveClearBtn={false}/>
                                    </div>
                                    <div className="relative w-full max-w-[50%] flex flex-col">
                                        <SelectedGearElement optionTitle="Testpáncél" gearTitle={selectedBodyArmor} isActiveClearBtn={false}/>
                                        <SelectedGearElement optionTitle="Kéz és lábvért" gearTitle={selectedSecondaryArmor} isActiveClearBtn={false}/>
                                        <SelectedGearElement optionTitle="Sisak" gearTitle={selectedHelmet} isActiveClearBtn={false}/>
                                    </div>
                                </div>

                            </div>
                        </div>
            </div>
            <MultiStepPagination/>
        </form>
    );
}