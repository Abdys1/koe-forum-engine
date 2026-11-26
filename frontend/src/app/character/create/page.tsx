import CreateCharacterForm from "@/components/organisms/character/CreateCharacterForm/CreateCharacterForm";
import CreateCharacterTemplate from "@/components/templates/CreateCharacterTemplate/CreateCharacterTemplate";
import { getRaces } from "@/features/character/queries/getRaces";
import { getEquipment } from "@/features/equipment/queries/getEquipment";
import { getEquipmentTypes } from "@/features/equipment/queries/getEquipmentTypes";

export default async function CharacterCreatePage() {
    const [races, equipmentTypes, equipment] = await Promise.all([getRaces(), getEquipmentTypes(), getEquipment()]);

    return (
        <CreateCharacterTemplate>
            <CreateCharacterForm races={races} equipmentTypes={equipmentTypes} equipment={equipment}/>
        </CreateCharacterTemplate>
    );
}
