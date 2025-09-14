import CharacterEntity from "@src/components/character/models/character";
import { CharacterCollectionDetails, CharacterCollectionOutput } from "@src/components/character/usecases/collection/types";

export function toOutput(characters: CharacterEntity[]): CharacterCollectionOutput {
    return characters.map(toDetails);
}

function toDetails(character: CharacterEntity): CharacterCollectionDetails {
    return {
        id: character.id,
        name: character.name,
        sex: character.sex,
        race: character.race,
        equipment: {
            helmet: character.helmetId,
            primaryWeapon: character.primaryWeaponId,
            secondaryWeapon: character.secondaryWeaponId,
            bodyArmor: character.bodyArmorId,
            secondaryArmor: character.secondaryArmorId,
            shield: character.shieldId
        },
        imageUrl: character.imageUrl
    }
}