'use client'

import Link from "next/link";
import { useForm } from "react-hook-form";

import AlertMessage from "@/components/atoms/AlertMessage/AlertMessage";
import Button from "@/components/atoms/Button/Button";
import InputField from "@/components/molecules/InputField/InputField";
import type { LoginInputs } from "@/features/auth/model/login";

import * as styles from "./LoginFormPanel.css";

type LoginFormPanelProps = {
    loginFailed: boolean,
    onSubmit: (inputs: LoginInputs) => Promise<void>
}

export default function LoginFormPanel({ loginFailed, onSubmit }: LoginFormPanelProps) {
    const {
        register,
        formState: { errors, isSubmitting },
        handleSubmit
    } = useForm<LoginInputs>();

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>
                {loginFailed && <AlertMessage className={styles.errorMsg}>Hibás felhasználónév vagy jelszó!</AlertMessage>}
                <InputField {...register('username', { required: "A felhasználónév kitöltése kötelező!" })}
                    label="Felhasználónév" error={errors.username?.message} />
                <InputField {...register('password', { required: "A jelszó kitöltése kötelező!" })}
                    label="Jelszó" type="password" error={errors.password?.message} />
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
