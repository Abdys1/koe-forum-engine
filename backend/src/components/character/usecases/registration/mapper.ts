import CharacterEntity from "@src/components/character/models/character";
import { CreateCharacterInput } from "@src/components/character/usecases/registration/types";

export function fromInput(dto: CreateCharacterInput): CharacterEntity {
    return {
        userId: dto.owner.id,
        name: dto.name,
        race: dto.race,
        sex: dto.sex,
        helmet: dto.equipement.helmet,
        primaryWeapon: dto.equipement.primaryWeapon,
        secondaryWeapon: dto.equipement.secondaryWeapon,
        bodyArmor: dto.equipement.bodyArmor,
        secondaryArmor: dto.equipement.secondaryArmor,
        shield: dto.equipement.shield,
        imageUrl: dto.imageUrl
    };
}