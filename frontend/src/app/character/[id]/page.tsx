import CharacterSheet from "@/components/CharacterSheet/CharacterSheet/CharacterSheet";
import { getCharacterSheet } from "@/features/character/queries/getCharacterSheet";

import * as styles from "./character.css";

export default async function CharacterPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const characterSheet = await getCharacterSheet(id);

    if (!characterSheet) {
        return (
            <main className={styles.page}>
                <h1 className={styles.notFound}>A karakter nem található</h1>
            </main>
        );
    }

    return (
        <main className={styles.page}>
            <CharacterSheet {...characterSheet} canEdit={false} canViewPrivate={false}/>
        </main>
    );
}
