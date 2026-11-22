import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useId } from "react";

import Icon from "@/components/atoms/Icon/Icon";
import DropdownSelect from "@/components/molecules/DropdownSelect/DropdownSelect";

import * as styles from "./Sidebar.css";

export interface SidebarCharacter {
    id: number,
    name: string,
    imageUrl: string
}

type SidebarCharacterBlockProps = {
    characters: SidebarCharacter[],
    activeCharacter: SidebarCharacter | undefined,
    isOpen: boolean,
    selectionFailed: boolean,
    onOpen: () => void,
    onSelectCharacter: (characterId: number) => void
}

export default function SidebarCharacterBlock(
    { characters, activeCharacter, isOpen, selectionFailed, onOpen, onSelectCharacter }: SidebarCharacterBlockProps
) {
    const characterSelectLabelId = useId();
    const characterOptions = characters.map(character => ({ value: character.id, label: character.name }));

    return (
        <div className={styles.characterBlock}>
            <div className={styles.characterHeader}>
                <button type="button" className={styles.avatarBtn} disabled={isOpen}
                    aria-expanded={isOpen} aria-label="Menüsáv kinyitása"
                    onClick={onOpen}>
                    {activeCharacter ? (
                        <Image src={activeCharacter.imageUrl} alt={activeCharacter.name} width={128} height={128}
                            className={styles.avatar} />
                    ) : (
                        <Icon name="person_add" className={clsx(styles.avatar, styles.avatarPlaceholder)}/>
                    )}
                </button>
                {isOpen && (
                    <div className={styles.characterInfo}>
                        {activeCharacter ? (
                            <>
                                <Link href={`/character/${activeCharacter.id}`} className={styles.characterName}
                                    title="Karakterlap megnyitása">
                                    {activeCharacter.name}
                                </Link>
                                <Link href="/character" className={styles.myCharactersBtn}>
                                    Karaktereim
                                </Link>
                            </>
                        ) : (
                            <Link href="/character/create" className={styles.myCharactersBtn}>
                                Karakter létrehozása
                            </Link>
                        )}
                    </div>
                )}
            </div>
            {isOpen && activeCharacter && (
                <div className={styles.characterSwitch}>
                    <span id={characterSelectLabelId} className={styles.characterSwitchLabel}>
                        Karakterváltás
                    </span>
                    <DropdownSelect options={characterOptions} value={activeCharacter.id}
                        labelId={characterSelectLabelId} onChange={onSelectCharacter} size="large" />
                    {selectionFailed && (
                        <p role="alert" className={styles.characterSwitchError}>
                            Nem sikerült karaktert váltani, próbáld újra!
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}
