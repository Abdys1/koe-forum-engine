import { caveat, sumana } from "@/app/fonts";

export default function CreateCharacterForm() {
    return (
        <>
            <form className="relative w-full min-h-screen flex justify-center items-center flex-col m-8 py-4 px-8 bg-gradient-to-bl from-brownCardBlackBg to-brownDarkBrown rounded-xl shadow-lg shadow-black">
                <div className="relative w-full flex justify-center items-center flex-col mb-4">
                    <h1 className={`relative w-full text-brownMainHover ${caveat.className} text-center text-3xl mb-2`}>Karakter létrehozása</h1>
                    <ul className={`relative w-full max-w-3xl px-16 flex justify-between items-center
                                    before:content-[''] before:absolute before:top-[30%] before:left-16 before:w-[calc(100%-9rem)] before:h-1.5 before:bg-blackBorder`}>
                        <li className="relative flex justify-center items-center flex-col">
                            <div className={`relative text-xl w-14 h-14 flex justify-center items-center mb-2 bg-brownDarkBtn text-white font-bold border-solid border-4 border-blackBorder rounded-[50%] ${sumana.className}`}>
                                1
                            </div>
                            <h6 className={`relative text-lg text-white ${caveat.className}`}>
                                Alapok
                            </h6>
                        </li>
                        <li>
                            <div className={`relative text-xl w-14 h-14 flex justify-center items-center mb-2 bg-brownMainHover text-brownCardBlackBg font-bold border-solid border-4 border-blackBorder rounded-[50%] ${sumana.className}`}>
                                2
                            </div>
                            <h6 className={`relative text-lg text-brownMainHover ${caveat.className}`}>
                                Felszerelés
                            </h6>
                        </li>
                        <li>
                            <div className={`relative text-xl w-14 h-14 flex justify-center items-center mb-2 bg-brownDarkBtn text-brownCardBlackBg font-bold border-solid border-4 border-blackBorder rounded-[50%] ${sumana.className}`}>
                                3
                            </div>
                            <h6 className={`relative text-lg text-brownDarkBtn ${caveat.className}`}>
                                Karakterkép
                            </h6>
                        </li>
                        <li>
                            <div className={`relative text-xl w-14 h-14 flex justify-center items-center mb-2 bg-brownDarkBtn text-brownCardBlackBg font-bold border-solid border-4 border-blackBorder rounded-[50%] ${sumana.className}`}>
                                4
                            </div>
                            <h6 className={`relative text-lg text-brownDarkBtn ${caveat.className}`}>
                                Áttekintés
                            </h6>
                        </li>
                    </ul>
                </div>
                <div className="relative w-full flex justify-center items-center">
                    <div>
                        <div>
                            <label>Karakter neve</label>
                            <input type="text" />
                        </div>
                        <div>
                            <img src="/images/ryldan2.png" alt="sötételf" 
                                className="max-h-96"
                                />
                        </div>
                        <div>
                            <input type="radio" name="gender" value="male"/>
                            <label>Férfi</label>
                        </div>
                        <div>
                            <input type="radio" name="gender" value="female"/>
                            <label>Nő</label>
                        </div>
                    </div>
                    <div>
                        <h3>Sötételf</h3>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora. Tempora voluptas, quis explicabo officiis similique numquam nihil nulla? Vel, quia? Cumque corporis earum autem qui explicabo nobis.
                        </p>
                    </div>
                    <ul>
                        <li className="relative flex justify-center items-center">
                            <img src="/images/ryldan2.png" alt="sötételf" 
                                className="max-h-20"
                                />
                            <span>Sötételf</span>
                        </li>
                        <li className="relative flex justify-center items-center">
                            <img src="/images/ryldan2.png" alt="sötételf" 
                                className="max-h-20"
                                />
                            <span>Ember</span>
                        </li>
                        <li className="relative flex justify-center items-center">
                            <img src="/images/ryldan2.png" alt="sötételf" 
                                className="max-h-20"
                                />
                            <span>Ork</span>
                        </li>
                        <li className="relative flex justify-center items-center">
                            <img src="/images/ryldan2.png" alt="sötételf" 
                                className="max-h-20"
                                />
                            <span>Elf</span>
                        </li>
                        <li className="relative flex justify-center items-center">
                            <img src="/images/ryldan2.png" alt="sötételf" 
                                className="max-h-20"
                                />
                            <span>Törp</span>
                        </li>
                        <li className="relative flex justify-center items-center">
                            <img src="/images/ryldan2.png" alt="sötételf" 
                                className="max-h-20"
                                />
                            <span>Cica</span>
                        </li>
                        <li className="relative flex justify-center items-center">
                            <img src="/images/ryldan2.png" alt="sötételf" 
                                className="max-h-20"
                                />
                            <span>Kutya</span>
                        </li>
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