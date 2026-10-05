import Image from "next/image";
import * as styles from "./CharacterTeasers.css";

type FeaturedCharacter = {
    id: string,
    name: string,
    imageUrl: string,
    role: string,
    quote: string
}

type CharacterTeasersProps = {
    characters: FeaturedCharacter[]
}

export default function CharacterTeasers({ characters }: CharacterTeasersProps) {
    return (
        <div className={styles.teasers}>
            <div className={styles.glow} />
            <p className={styles.caption}>Néhány aktív kalandor</p>
            <ul className={styles.cards}>
                {characters.map(character => (
                    <li key={character.id} className={styles.card}>
                        <div className={styles.imageWrap}>
                            <Image src={character.imageUrl} alt={character.name} fill
                                sizes="(max-width: 640px) 70vw, (max-width: 1024px) 30vw, 14vw"
                                className={styles.image} />
                        </div>
                        <div className={styles.body}>
                            <span className={styles.role}>{character.role}</span>
                            <h3 className={styles.name}>{character.name}</h3>
                            <blockquote className={styles.quote}>{character.quote}</blockquote>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
