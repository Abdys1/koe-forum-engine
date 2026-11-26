import CreateCharacterForm from "@/components/organisms/character/CreateCharacterForm/CreateCharacterForm";
import CreateCharacterTemplate from "@/components/templates/CreateCharacterTemplate/CreateCharacterTemplate";
import { getEquipment } from "@/features/equipment/queries/getEquipment";
import { getEquipmentTypes } from "@/features/equipment/queries/getEquipmentTypes";

export default async function CharacterCreatePage() {
    const [equipmentTypes, equipment] = await Promise.all([getEquipmentTypes(), getEquipment()]);

    return (
        <CreateCharacterTemplate>
            <CreateCharacterForm equipmentTypes={equipmentTypes} equipment={equipment}/>
        </CreateCharacterTemplate>
    );
}
