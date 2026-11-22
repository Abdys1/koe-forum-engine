import CreateCharacterForm from "@/components/organisms/character/CreateCharacterForm/CreateCharacterForm";
import CreateCharacterTemplate from "@/components/templates/CreateCharacterTemplate/CreateCharacterTemplate";
import { getEquipmentCatalogData } from "@/features/equipment/queries/getEquipmentCatalogData";

export default async function CharacterCreatePage() {
    const equipmentCatalogData = await getEquipmentCatalogData();

    return (
        <CreateCharacterTemplate>
            <CreateCharacterForm equipmentCatalogData={equipmentCatalogData}/>
        </CreateCharacterTemplate>
    );
}
