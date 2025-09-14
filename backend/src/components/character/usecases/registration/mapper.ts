import CharacterEntity from "@src/components/character/models/character";
import { CreateCharacterInput } from "@src/components/character/usecases/registration/types";

export function fromInput(dto: CreateCharacterInput): CharacterEntity {
    return {
        userId: dto.owner.id,
        name: dto.name,
        race: dto.race,
        sex: dto.sex,
        helmetId: dto.equipment.helmet,
        primaryWeaponId: dto.equipment.primaryWeapon,
        secondaryWeaponId: dto.equipment.secondaryWeapon,
        bodyArmorId: dto.equipment.bodyArmor,
        secondaryArmorId: dto.equipment.secondaryArmor,
        shieldId: dto.equipment.shield,
        imageUrl: dto.imageUrl
    };
}