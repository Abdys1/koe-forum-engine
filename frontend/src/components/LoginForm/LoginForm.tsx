'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@/components/Button/Button";
import PasswordField from "@/components/Inputs/PasswordField/PasswordField";
import TextField from "@/components/Inputs/TextField/TextField";
import * as styles from "./LoginForm.css";

interface LoginInputs {
    username: string;
    password: string;
}

type LoginFormProps = {
    onSuccess?: () => void,
    callbackUrl?: string
}

function toSameOriginPath(url: string | undefined): string {
    if (!url) {
        return '/';
    }
    try {
        const target = new URL(url, window.location.origin);
        return target.origin === window.location.origin ? `${target.pathname}${target.search}${target.hash}` : '/';
    } catch {
        return '/';
    }
}

export default function LoginForm({ onSuccess, callbackUrl }: LoginFormProps) {
    const router = useRouter();
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
            if (onSuccess) {
                onSuccess();
            } else {
                router.push(toSameOriginPath(callbackUrl));
                router.refresh();
            }
        } else {
            setLoginError(true);
        }
    });

    return (
        <>
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
        </>
    );
}
