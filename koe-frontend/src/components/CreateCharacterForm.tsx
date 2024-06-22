import MultiStepLabel from "@/components/MultiStepLabel";
import CharacterRaceBtn from "@/components/CharacterRaceBtn";
import InputField from "@/components/InputField";

export default function CreateCharacterForm() {
    return (
        <>
            <form className="relative w-full min-h-screen flex justify-center items-center flex-col m-8 py-4 px-8 bg-gradient-to-bl from-brownCardBlackBg to-brownDarkBrown rounded-xl shadow-lg shadow-black">
                <div className="relative w-full flex justify-center items-center flex-col mb-4">
                    <h1 className={`relative w-full text-brownMainHover font-caveat text-start text-5xl mb-6`}>Karakter létrehozása</h1>
                    <ul className={`relative w-full max-w-3xl px-16 flex justify-between items-center
                                    before:content-[''] before:absolute before:top-[30%] before:left-20 before:w-[calc(100%-11rem)] before:h-1.5 before:bg-blackBorder`}>
                        <MultiStepLabel label="Alapok" stepNum={1} status="done" />
                        <MultiStepLabel label="Felszerelés" stepNum={2} status="active" />
                        <MultiStepLabel label="Karakterkép" stepNum={3} status="unfinished" />
                        <MultiStepLabel label="Áttekintés" stepNum={4} status="unfinished" />
                    </ul>
                </div>
                <div className="relative w-full flex justify-center items-center">
                    <div className="relative w-full flex justify-center items-center flex-col">
                        <div className="relative flex justify-center items-center">
                            <InputField label="Karakternév" name="name" type="text" />
                        </div>
                        <div>
                            <img src="/images/ryldan2.png" alt="sötételf"
                                className="max-h-96"
                            />
                        </div>
                        <div>
                            <span>
                                <input type="radio" name="gender" value="male" />
                                <label>Férfi</label>
                            </span>
                            <span>
                                <input type="radio" name="gender" value="female" />
                                <label>Nő</label>
                            </span>
                        </div>
                    </div>
                    <div>
                        <h3>Sötételf</h3>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora. Tempora voluptas, quis explicabo officiis similique numquam nihil nulla? Vel, quia? Cumque corporis earum autem qui explicabo nobis.
                        </p>
                    </div>
                    <ul>
                        <CharacterRaceBtn title="Sötételf" />
                        <CharacterRaceBtn title="Ember" />
                        <CharacterRaceBtn title="Ork" />
                        <CharacterRaceBtn title="Elf" />
                        <CharacterRaceBtn title="Törp" />
                        <CharacterRaceBtn title="Cica" />
                        <CharacterRaceBtn title="Kutya" />
                    </ul>
                </div>
                <div>
                    <button type="button">Vissza</button>
                    <button type="button">Tovább</button>
                    <button type="submit">Létrehozás</button>
                </div>
            </form>
        </>
    );
};