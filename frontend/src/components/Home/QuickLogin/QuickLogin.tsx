'use client'

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import Button from "@/components/Button/Button";
import LoginForm from "@/components/LoginForm/LoginForm";

import * as styles from "./QuickLogin.css";

export default function QuickLogin() {
    const router = useRouter();
    const { data: session, status } = useSession();

    if (status === "authenticated") {
        return (
            <div className={styles.card}>
                <span className={styles.eyebrow}>Üdv újra, kalandor!</span>
                <h2 className={styles.title}>{session.user.username}</h2>
                <p className={styles.welcomeText}>A történeted ott folytatódik, ahol abbahagytad.</p>
                <div className={styles.welcomeActions}>
                    <Button href="/roleplay-area" size="medium" title="Tovább a játéktérre" />
                    <Button href="/character/create" variant="outline" size="medium" title="Új karakter" />
                </div>
            </div>
        );
    }

    return (
        <div className={styles.card}>
            <LoginForm onSuccess={() => router.refresh()} />
        </div>
    );
}
