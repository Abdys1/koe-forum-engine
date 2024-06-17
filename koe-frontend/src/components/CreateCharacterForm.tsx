export default function CreateCharacterForm() {
    return (
        <>
            <form>
                <div>
                    <h1>Karakter létrehozása</h1>
                    <ul>
                        <li>
                            <div>1</div>
                            <h6>Alapok</h6>
                        </li>
                        <li>
                            <div>2</div>
                            <h6>Felszerelés</h6>
                        </li>
                        <li>
                            <div>3</div>
                            <h6>Karakterkép</h6>
                        </li>
                        <li>
                            <div>4</div>
                            <h6>Áttekintés</h6>
                        </li>
                    </ul>
                </div>
                <div>
                    <div>
                        <div>
                            <label>Karakter neve</label>
                            <input type="text" />
                        </div>
                        <div>
                            <img src="/images/ryldan2.png" alt="sötételf" />
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
                        <li>
                            <img src="/images/ryldan2.png" alt="sötételf" />
                            <span>Sötételf</span>
                        </li>
                        <li>
                            <img src="/images/ryldan2.png" alt="sötételf" />
                            <span>Ember</span>
                        </li>
                        <li>
                            <img src="/images/ryldan2.png" alt="sötételf" />
                            <span>Ork</span>
                        </li>
                        <li>
                            <img src="/images/ryldan2.png" alt="sötételf" />
                            <span>Elf</span>
                        </li>
                        <li>
                            <img src="/images/ryldan2.png" alt="sötételf" />
                            <span>Törp</span>
                        </li>
                        <li>
                            <img src="/images/ryldan2.png" alt="sötételf" />
                            <span>Cica</span>
                        </li>
                        <li>
                            <img src="/images/ryldan2.png" alt="sötételf" />
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