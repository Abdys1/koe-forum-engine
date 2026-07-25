import CreateCharacterForm from "@/components/MultiStepForm/CreateCharacterForm/CreateCharacterForm/CreateCharacterForm";
import * as styles from "./create.css";

export default function CharacterCreatePage() {
    return (
        <section className={styles.page}>
            <CreateCharacterForm />
        </section>
    );
};
