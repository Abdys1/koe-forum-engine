import type { SelectableSex } from "@/components/MultiStepForm/CreateCharacterForm/CharacterBasicsStep/CharacterBasicsStep";
import { CharacterDetails, Sex } from "@/lib/api/character/types";
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

export const sexMapping: Record<SelectableSex, Sex> = {
    ferfi: Sex.MALE,
    no: Sex.FEMALE
};

const selectableSexMapping: Record<Sex, SelectableSex> = {
    [Sex.MALE]: "ferfi",
    [Sex.FEMALE]: "no"
};

export function toCharacter(details: CharacterDetails, equipmentIds: number[]): Character {
    return {
        id: String(details.id),
        name: details.name,
        imageUrl: details.imageUrl,
        raceId: details.race,
        sex: selectableSexMapping[details.sex],
        equipmentIds
    };
}
