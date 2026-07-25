import CharacterEntity, { CharacterEquipmentAssignmentEntity } from "@src/components/character/models/character";
import { CharacterCollectionDetails, CharacterCollectionOutput, CharacterEquipmentDetails } from "@src/components/character/usecases/collection/types";
import { toEquipmentDetails } from "@src/components/equipment/usecases/collection/mapper";

export function toOutput(characters: CharacterEntity[]): CharacterCollectionOutput {
    return characters.map(toDetails);
}

function toDetails(character: CharacterEntity): CharacterCollectionDetails {
    return {
        id: character.id,
        name: character.name,
        sex: character.sex,
        race: character.race,
        equipment: (character.equipment ?? []).map(toAssignmentDetails),
        imageUrl: character.imageUrl
    }
}

/**
 * A hozzárendeléseket NEM vonjuk össze: ha ugyanaz a felszerelés kétszer van
 * hozzárendelve, két elemként kell megjelennie, eltérő `assignmentId`-val.
 */
function toAssignmentDetails(assignment: CharacterEquipmentAssignmentEntity): CharacterEquipmentDetails {
    return {
        assignmentId: assignment.assignmentId,
        ...toEquipmentDetails(assignment.equipment)
    };
}
