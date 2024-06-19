type CharacterRaceBtnProps = {
    title: string
};

export default function CharacterRaceBtn(props: CharacterRaceBtnProps) {
    return (
        <li className="relative flex justify-center items-center">
            <img src="/images/ryldan2.png" alt="sötételf"
                className="max-h-16"
            />
            <span>{props.title}</span>
        </li>
    );
};