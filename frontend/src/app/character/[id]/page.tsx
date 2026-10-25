import CharacterSheet from "@/components/CharacterSheet/CharacterSheet/CharacterSheet";
import { findCharacter } from "@/dummydata/characters";
import { postsClient } from "@/lib/api/posts";
import * as styles from "./character.css";

export default async function CharacterPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const character = findCharacter(id);

    if (!character) {
        return (
            <main className={styles.page}>
                <h1 className={styles.notFound}>A karakter nem található</h1>
            </main>
        );
    }

    const activity = await postsClient.getCharacterActivity(character.id);

    return (
        <main className={styles.page}>
            <CharacterSheet character={character} activity={activity} canEdit canViewPrivate/>
        </main>
    );
}
