import type { SelectableSex } from "@/components/MultiStepForm/CreateCharacterForm/CharacterBasicsStep/CharacterBasicsStep";
import type { Character } from "@/dummydata/characters";
import { CharacterDetails, Sex } from "@/lib/api/character/types";

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
