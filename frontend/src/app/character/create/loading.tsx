import * as styles from "./create.css";

export default function CharacterCreateLoading() {
    return (
        <section className={styles.page}>
            <p className={styles.status} role="status">Betöltés…</p>
        </section>
    );
}
