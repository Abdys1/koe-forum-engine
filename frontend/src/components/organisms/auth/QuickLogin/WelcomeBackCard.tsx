import { ReactNode } from "react";

import Button from "@/components/atoms/Button/Button";

import * as styles from "./WelcomeBackCard.css";

type WelcomeBackCardProps = {
    username?: string,
    loginForm: ReactNode
}

export default function WelcomeBackCard({ username, loginForm }: WelcomeBackCardProps) {
    if (username === undefined) {
        return <div className={styles.card}>{loginForm}</div>;
    }

    return (
        <div className={styles.card}>
            <span className={styles.eyebrow}>Üdv újra, kalandor!</span>
            <h2 className={styles.title}>{username}</h2>
            <p className={styles.welcomeText}>A történeted ott folytatódik, ahol abbahagytad.</p>
            <div className={styles.welcomeActions}>
                <Button href="/roleplay-area" size="medium" title="Tovább a játéktérre" />
                <Button href="/character/create" variant="outline" size="medium" title="Új karakter" />
            </div>
        </div>
    );
}
