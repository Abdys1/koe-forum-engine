'use client'

import SelectableOptionBtn from "@/components/SelectableOptionBtn/SelectableOptionBtn";
import TabbedListPanel, { ListOption } from "@/components/TabbedListPanel/TabbedListPanel";
import SelectedGearElement from "@/components/SelectedGearElement/SelectedGearElement";
import StepHeading from "@/components/StepHeading/StepHeading";
import { useState } from "react";
import { useMultiStepFormContext } from "@/components/MultiStepForm/MultiStepFormContext";
import { glassBox } from "@/styles/shared.css";
import clsx from "clsx";
import * as styles from "./CharacterGearStep.css";

type GearOption = "fegyver" | "pancel";

export const DEFAULT_GEAR_OPTION = "Nincs";

export default function CharacterGearStep() {
    const formContext = useMultiStepFormContext();
    const { register, getValues, setValue } = formContext.form;

    const [activeGearOption, setActiveGearOption] = useState<GearOption>("fegyver");
    const [primaryWeapon, setPrimaryWeapon] = useState(getValues("primaryWeaponTitle"));
    const [secondaryWeapon, setSecondaryWeapon] = useState(getValues("secondaryWeaponTitle"));
    const [shield, setShield] = useState(getValues("shieldTitle"));
    const [bodyArmor, setBodyArmor] = useState(getValues("bodyArmorTitle"));
    const [secondaryArmor, setSecondaryArmor] = useState(getValues("secondaryArmorTitle"));
    const [helmet, setHelmet] = useState(getValues("helmetTitle"));

    const weapons: ListOption[] = [
        {
            name: "Elsődleges",
            onChooseElement: handlePrimaryWeapon,
            elements: [
                { title: "Hosszúkard", desc: "A hosszúkard lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora." },
                { title: "Rövidkard", desc: "Rövidkard ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora." },
                { title: "Fokos", desc: "A fokos lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora." },
                { title: "Pöröly", desc: "A pöröly lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora." },
                { title: "Csatabárd", desc: "Csatabárddal lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora." },
                { title: "Lándzsa", desc: "A lándzsa lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora." },
                { title: "Szegecses kesztyű", desc: "Vedd fel a kesztyűt vagy lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora." }
            ]
        },
        {
            name: "Másodlagos",
            onChooseElement: handleSecondaryWeapon,
            elements: [
                { title: "Szablya", desc: "A szablya lorem ipsum dolor sit amet consectetur, adipisicing elit." },
                { title: "Rövidkard", desc: "Rövidkard ipsum dolor sit amet consectetur, adipisicing elit." },
                { title: "Fokos", desc: "A fokos lorem ipsum dolor sit amet consectetur, adipisicing elit." },
                { title: "Pöröly", desc: "A pöröly lorem ipsum dolor sit amet consectetur, adipisicing elit." },
                { title: "Csatabárd", desc: "Csatabárddal lorem ipsum dolor sit amet consectetur, adipisicing elit." },
                { title: "Lándzsa", desc: "A lándzsa lorem ipsum dolor sit amet consectetur, adipisicing elit." },
                { title: "Szegecses kesztyű", desc: "Vedd fel a kesztyűt vagy lorem ipsum dolor sit amet consectetur, adipisicing elit." }
            ]
        },
        {
            name: "Pajzs",
            onChooseElement: handleShield,
            elements: [
                { title: "Kerek fapajzs", desc: "Kerek fapajzs lorem ipsum dolor sit amet consectetur, adipisicing elit." },
                { title: "Ökölpajzs", desc: "Ökölpajzs lorem ipsum dolor sit amet consectetur, adipisicing elit." }
            ]
        }
    ];

    const armors: ListOption[] = [
        {
            name: "Testpáncél",
            onChooseElement: handleBodyArmor,
            elements: [
                { title: "Sodronying", desc: "A sordonying lorem ipsum dolor sit amet consectetur, adipisicing elit." },
                { title: "Gambeson", desc: "A gambeson adipisicing elit." },
                { title: "Rákozott bőrvért", desc: "A bőrvért lorem ipsum dolor sit amet consectetur, adipisicing elit." },
                { title: "Rákozott bőrvért csataszoknyával", desc: "A bőrvért szoknyával is lorem ipsum dolor sit amet consectetur, adipisicing elit." },
                { title: "Rákozott bőrvért vállvérttel", desc: "A bőrvért vállvérttel is lorem ipsum dolor sit amet consectetur, adipisicing elit." },
                { title: "Pikkelyes bőrvért", desc: "A pikkelyes lorem ipsum dolor sit amet consectetur, adipisicing elit." },
                { title: "Pikkelyes bőrvért vállvérttel", desc: "A pikkelyes váll orrupti esse repudiandae saepe." },
                { title: "Lamellás vért", desc: "A lamellás lorem ipsum dolor sit amet consectetur, adipisicing elit." },
                { title: "Lemezvért", desc: "Lemezes lorem ipsum dolor sit amet consectetur, adipisicing elit." },
                { title: "Rákozott lemezvért", desc: "Rákozott lorem ipsum dolor sit amet consectetur, adipisicing elit." },
                { title: "Rákozott lemezvért csataszoknyával", desc: "Rákozott lemez szoknyával adipisicing elit." },
                { title: "Teljes gyalogos páncél", desc: "Valaki nagyon kemény talpas lorem ipsum dolor sit amet consectetur, adipisicing elit." },
                { title: "Teljes lovagi páncél", desc: "A lova se bírja el lorem ipsum dolor sit amet consectetur, adipisicing elit." }
            ]
        },
        {
            name: "Kéz és lábvért",
            onChooseElement: handleSecondaryArmor,
            elements: [
                { title: "Bőr alkarvért", desc: "Alkaron bőr lorem ipsum dolor sit amet consectetur, adipisicing elit." },
                { title: "Bőr lábvért", desc: "Lábszáron bőr lorem ipsum dolor sit amet consectetur, adipisicing elit." },
                { title: "Bőr alkar és lábvért", desc: "Mindenhol bőr lorem ipsum dolor sit amet consectetur, adipisicing elit." },
                { title: "Fém alkarvért", desc: "Alkaron fém lorem ipsum dolor sit amet consectetur, adipisicing elit." },
                { title: "Fém lábvért", desc: "A lábszáron fém lorem ipsum dolor sit amet consectetur, adipisicing elit." },
                { title: "Fém alkar és lábvért", desc: "Mindenhol fém lorem ipsum dolor sit amet consectetur, adipisicing elit." }
            ]
        },
        {
            name: "Sisak",
            onChooseElement: handleHelmet,
            elements: [
                { title: "Nyitott bőrsisak", desc: "A nyitott lorem ipsum dolor sit amet consectetur, adipisicing elit." },
                { title: "Bőrsisak orrvédővel", desc: "Orrvédős lorem ipsum dolor sit amet consectetur, adipisicing elit." },
                { title: "Nyitott fémsisak", desc: "A nyitott fém lorem ipsum dolor sit amet consectetur, adipisicing elit." },
                { title: "Nyitott fémsisak orrvédővel", desc: "A fém orr lorem ipsum dolor sit amet consectetur, adipisicing elit." },
                { title: "Fazéksisak", desc: "A fazék lorem ipsum dolor sit amet consectetur, adipisicing elit." },
                { title: "Vaskalap", desc: "Vaskalapos lorem ipsum dolor sit amet consectetur, adipisicing elit." },
                { title: "Rákfarkas sisak", desc: "Most akkor rák vagy farkas lorem ipsum dolor sit amet consectetur, adipisicing elit." }
            ]
        }
    ];

    function handleGearOption(gear: GearOption): void { setActiveGearOption(gear); }
    function handlePrimaryWeapon(title: string) { setPrimaryWeapon(title); setValue("primaryWeaponTitle", title); }
    function handleSecondaryWeapon(title: string) { setSecondaryWeapon(title); setValue("secondaryWeaponTitle", title); }
    function handleShield(title: string) { setShield(title); setValue("shieldTitle", title); }
    function handleBodyArmor(title: string) { setBodyArmor(title); setValue("bodyArmorTitle", title); }
    function handleSecondaryArmor(title: string) { setSecondaryArmor(title); setValue("secondaryArmorTitle", title); }
    function handleHelmet(title: string) { setHelmet(title); setValue("helmetTitle", title); }

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <StepHeading title="3. Válassz fegyverzetet:" />
                <div className={styles.gearRow}>
                    <div className={styles.selectorPanel}>
                        <div className={styles.optionBtns}>
                            <SelectableOptionBtn title="Fegyver" onClick={() => handleGearOption("fegyver")} active={activeGearOption === "fegyver"}/>
                            <SelectableOptionBtn title="Páncél" onClick={() => handleGearOption("pancel")} active={activeGearOption === "pancel"}/>
                        </div>
                        {activeGearOption === "fegyver" && <TabbedListPanel options={weapons}/>}
                        {activeGearOption === "pancel" && <TabbedListPanel options={armors}/>}
                    </div>
                    <div className={styles.summaryPanel}>
                        <div className={clsx(styles.glassPanel, glassBox)}>
                            <h3 className={styles.gearSummaryTitle}>Karakter felszerelése:</h3>
                            <div className={styles.gearColumns}>
                                <div className={styles.gearColumn}>
                                    <SelectedGearElement optionTitle="Elsődleges fegyver" gearTitle={primaryWeapon} onClear={() => handlePrimaryWeapon(DEFAULT_GEAR_OPTION)} isActiveClearBtn={primaryWeapon !== DEFAULT_GEAR_OPTION}/>
                                    <input type="hidden" {...register("primaryWeaponTitle", {value: primaryWeapon})}/>
                                    <SelectedGearElement optionTitle="Másodlagos fegyver" gearTitle={secondaryWeapon} onClear={() => handleSecondaryWeapon(DEFAULT_GEAR_OPTION)} isActiveClearBtn={secondaryWeapon !== DEFAULT_GEAR_OPTION}/>
                                    <input type="hidden" {...register("secondaryWeaponTitle", {value: secondaryWeapon})}/>
                                    <SelectedGearElement optionTitle="Pajzs" gearTitle={shield} onClear={() => handleShield(DEFAULT_GEAR_OPTION)} isActiveClearBtn={shield !== DEFAULT_GEAR_OPTION}/>
                                    <input type="hidden" {...register("shieldTitle", {value: shield})}/>
                                </div>
                                <div className={styles.gearColumn}>
                                    <SelectedGearElement optionTitle="Testpáncél" gearTitle={bodyArmor} onClear={() => handleBodyArmor(DEFAULT_GEAR_OPTION)} isActiveClearBtn={bodyArmor !== DEFAULT_GEAR_OPTION}/>
                                    <input type="hidden" {...register("bodyArmorTitle", {value: bodyArmor})}/>
                                    <SelectedGearElement optionTitle="Kéz és lábvért" gearTitle={secondaryArmor} onClear={() => handleSecondaryArmor(DEFAULT_GEAR_OPTION)} isActiveClearBtn={secondaryArmor !== DEFAULT_GEAR_OPTION}/>
                                    <input type="hidden" {...register("secondaryArmorTitle", {value: secondaryArmor})}/>
                                    <SelectedGearElement optionTitle="Sisak" gearTitle={helmet} onClear={() => handleHelmet(DEFAULT_GEAR_OPTION)} isActiveClearBtn={helmet !== DEFAULT_GEAR_OPTION}/>
                                    <input type="hidden" {...register("helmetTitle", {value: helmet})}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
