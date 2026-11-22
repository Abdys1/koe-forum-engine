import CreateCharacterForm from "@/components/MultiStepForm/CreateCharacterForm/CreateCharacterForm/CreateCharacterForm";
import { equipmentClient } from "@/lib/api/equipment";

import * as styles from "./create.css";

export default async function CharacterCreatePage() {
    const equipmentCatalogData = await equipmentClient.getCatalogData();

    return (
        <section className={styles.page}>
            <CreateCharacterForm equipmentCatalogData={equipmentCatalogData}/>
        </section>
    );
};
