import { Character, toCharacter } from "@/features/character/model/character";
import { buildCharacterGearOverview, GearOverviewRoot } from "@/features/equipment/model/gearOverview";
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

    const [equipment, activity, equipmentTypes] = await Promise.all([
        characterClient.getEquipment(details.id),
        postsClient.getCharacterActivity(String(details.id)),
        equipmentClient.getEquipmentTypes()
    ]);
    const character = toCharacter(details);
    const gearOverview = buildCharacterGearOverview(equipmentTypes, equipment);

    return { character, activity, gearOverview };
}
