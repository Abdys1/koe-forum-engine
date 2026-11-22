"use client"

import { useRouter } from "next/navigation";
import { startTransition } from "react";

import Button from "@/components/atoms/Button/Button";

import * as styles from "./create.css";

export default function CharacterCreateError({ reset }: { error: Error & { digest?: string }, reset: () => void }) {
    const router = useRouter();

    function retry() {
        startTransition(() => {
            router.refresh();
            reset();
        });
    }

    return (
        <section className={styles.page}>
            <div className={styles.status} role="alert">
                <p>Nem sikerült betölteni a karakteralkotáshoz szükséges adatokat.</p>
                <Button title="Újrapróbálás" variant="outline" size="medium" onClick={retry}/>
            </div>
        </section>
    );
}
