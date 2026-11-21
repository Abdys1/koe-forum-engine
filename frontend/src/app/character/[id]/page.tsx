import CharacterSheet from "@/components/CharacterSheet/CharacterSheet/CharacterSheet";
import { findCharacter } from "@/dummydata/characters";
import { equipmentClient } from "@/lib/api/equipment";
import { postsClient } from "@/lib/api/posts";
import { buildEquipmentCatalog } from "@/lib/equipmentCatalog";
import { toGearOverview } from "@/lib/gearOverview";
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

    const [activity, equipmentCatalogData] = await Promise.all([
        postsClient.getCharacterActivity(character.id),
        equipmentClient.getCatalogData()
    ]);
    const equipmentCatalog = buildEquipmentCatalog(equipmentCatalogData);
    const gearOverview = toGearOverview(
        equipmentCatalog.getEquipmentTypeRoots(),
        equipmentCatalog.getSlotPoolUsages(character.equipmentIds)
    );

    return (
        <main className={styles.page}>
            <CharacterSheet character={character} activity={activity} gearOverview={gearOverview} canEdit canViewPrivate/>
        </main>
    );
}
