import CharacterSheet from "@/components/CharacterSheet/CharacterSheet/CharacterSheet";
import { characterClient } from "@/lib/api/character";
import { equipmentClient } from "@/lib/api/equipment";
import { postsClient } from "@/lib/api/posts";
import { toCharacter } from "@/lib/character";
import { buildEquipmentCatalog } from "@/lib/equipmentCatalog";
import { toGearOverview } from "@/lib/gearOverview";
import * as styles from "./character.css";

export default async function CharacterPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const characterId = Number(id);
    const details = Number.isInteger(characterId) ? await characterClient.getById(characterId) : null;

    if (!details) {
        return (
            <main className={styles.page}>
                <h1 className={styles.notFound}>A karakter nem található</h1>
            </main>
        );
    }

    const [equipmentIds, activity, equipmentCatalogData] = await Promise.all([
        characterClient.getEquipmentIds(details.id),
        postsClient.getCharacterActivity(String(details.id)),
        equipmentClient.getCatalogData()
    ]);
    const character = toCharacter(details, equipmentIds);
    const equipmentCatalog = buildEquipmentCatalog(equipmentCatalogData);
    const gearOverview = toGearOverview(
        equipmentCatalog.getEquipmentTypeRoots(),
        equipmentCatalog.getSlotPoolUsages(character.equipmentIds)
    );

    return (
        <main className={styles.page}>
            <CharacterSheet character={character} activity={activity} gearOverview={gearOverview} canEdit={false} canViewPrivate={false}/>
        </main>
    );
}
