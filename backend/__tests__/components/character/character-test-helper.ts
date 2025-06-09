import CharacterEntity from "@src/components/character/models/character";
import { Sex } from "@src/components/character/types";

export function createCharacterEntity(charName: string, userId: number): CharacterEntity {
    return {
        name: charName,
        userId: userId,
        sex: Sex.MALE,
        race: 'human',
        helmet: 'Helmet',
        primaryWeapon: 'Sword',
        secondaryWeapon: 'Longbow',
        shield: 'Shield',
        bodyArmor: 'Leather',
        secondaryArmor: 'Wrist',
        imageUrl: '/aragorn.jpg'
    };
}