import NotFoundMessage from "@/components/atoms/NotFoundMessage/NotFoundMessage";
import CharacterSheet from "@/components/organisms/character/CharacterSheet/CharacterSheet";
import type { CharacterSheetData } from "@/features/character/queries/getCharacterSheet";

import * as styles from "./CharacterTemplate.css";

type CharacterTemplateProps = {
    characterSheet: CharacterSheetData | null,
    canEdit: boolean,
    canViewPrivate: boolean
}

export default function CharacterTemplate({ characterSheet, canEdit, canViewPrivate }: CharacterTemplateProps) {
    return (
        <main className={styles.page}>
            {characterSheet
                ? <CharacterSheet {...characterSheet} canEdit={canEdit} canViewPrivate={canViewPrivate}/>
                : <NotFoundMessage message="A karakter nem található"/>
            }
        </main>
    );
}
