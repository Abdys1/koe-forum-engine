import { Character, toCharacter } from "@/features/character/model/character";
import { buildEquipmentCatalog } from "@/features/equipment/model/equipmentCatalog";
import { GearOverviewRoot, toGearOverview } from "@/features/equipment/model/gearOverview";
import { characterClient } from "@/lib/api/character";
import { equipmentClient } from "@/lib/api/equipment";
import { postsClient } from "@/lib/api/posts";
import { CharacterActivity } from "@/lib/api/posts/types";

export interface CharacterSheetData {
    character: Character,
    activity: CharacterActivity,
    gearOverview: GearOverviewRoot[]
}

export async function getCharacterSheet(id: string): Promise<CharacterSheetData | null> {
    const characterId = Number(id);
    const details = Number.isInteger(characterId) ? await characterClient.getById(characterId) : null;
    if (!details) {
        return null;
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

    return { character, activity, gearOverview };
}
