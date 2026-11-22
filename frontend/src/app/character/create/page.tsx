import CreateCharacterForm from "@/components/MultiStepForm/CreateCharacterForm/CreateCharacterForm/CreateCharacterForm";
import { getEquipmentCatalogData } from "@/features/equipment/queries/getEquipmentCatalogData";

import * as styles from "./create.css";

export default async function CharacterCreatePage() {
    const equipmentCatalogData = await getEquipmentCatalogData();

    return (
        <section className={styles.page}>
            <CreateCharacterForm equipmentCatalogData={equipmentCatalogData}/>
        </section>
    );
};
