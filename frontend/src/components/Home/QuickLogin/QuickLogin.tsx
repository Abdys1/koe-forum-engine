'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@/components/Button/Button";
import PasswordField from "@/components/Inputs/PasswordField/PasswordField";
import TextField from "@/components/Inputs/TextField/TextField";
import * as styles from "./QuickLogin.css";

interface LoginInputs {
    username: string;
    password: string;
}

export default function QuickLogin() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [loginError, setLoginError] = useState(false);
    const {
        register,
        formState: { errors, isSubmitting },
        handleSubmit
    } = useForm<LoginInputs>();

    const onSubmit = handleSubmit(async ({ username, password }) => {
        const response = await signIn("credentials", {
            username,
            password,
            redirect: false
        });
        if (response?.ok) {
            setLoginError(false);
            router.refresh();
        } else {
            setLoginError(true);
        }
    });

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
            <form onSubmit={onSubmit} className={styles.form} noValidate>
                {loginError && <div role="alert" className={styles.errorMsg}>Hibás felhasználónév vagy jelszó!</div>}
                <TextField {...register('username', { required: "A felhasználónév kitöltése kötelező!" })}
                    label="Felhasználónév" errors={errors} />
                <PasswordField {...register('password', { required: "A jelszó kitöltése kötelező!" })}
                    errors={errors} />
                <Link href="/auth/forgot-password" className={styles.forgotLink}>Elfelejtettem a jelszavam</Link>
                <Button type="submit" size="medium" disabled={isSubmitting}
                    title={isSubmitting ? "Belépés…" : "Belépés"} />
            </form>
            <p className={styles.register}>
                Még nincs fiókod?{" "}
                <Link href="/auth/registration" className={styles.registerLink}>Regisztrálj</Link>
            </p>
        </div>
    );
}
