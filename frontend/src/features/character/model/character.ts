import type { SelectableSex } from "@/features/character/model/sex";
import { toSelectableSex } from "@/features/character/model/sex";
import { CharacterDetails } from "@/lib/api/character/types";
import { PostCharacter } from "@/lib/api/posts/types";

export interface CharacterQuote {
    text: string,
    locationId: string,
    postNumber: number
}

export interface Character extends PostCharacter {
    raceId: string,
    sex: SelectableSex,
    equipmentIds: number[],
    appearance?: string,
    backstory?: string,
    secrets?: string,
    notes?: string,
    quote?: CharacterQuote
}

export function toCharacter(details: CharacterDetails, equipmentIds: number[]): Character {
    return {
        id: String(details.id),
        name: details.name,
        imageUrl: details.imageUrl,
        raceId: details.race,
        sex: toSelectableSex(details.sex),
        equipmentIds
    };
}
