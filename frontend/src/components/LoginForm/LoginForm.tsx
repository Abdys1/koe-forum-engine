'use client'

import PasswordField from "@/components/Inputs/PasswordField/PasswordField";
import TextField from "@/components/Inputs/TextField/TextField";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as styles from "./LoginForm.css";

interface LoginInputs {
    username: string;
    password: string;
}

export default function LoginForm() {
    const router = useRouter();
    const [loginError, setLoginError] = useState<boolean>(false);
    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm<LoginInputs>();

    const onSubmit = handleSubmit(async ({ username, password }) => {
        const response = await signIn("credentials", {
            username,
            password,
            redirect: false
        });
        if (response?.ok) {
            router.push('/character/create');
        } else {
            setLoginError(true);
        }
    });

    return (
        <form onSubmit={onSubmit} className={styles.form}>
            {loginError && <div className={styles.errorMsg}>Hibás felhasználónév vagy jelszó!</div>}
            <TextField {...register('username', { required: "A felhasználónév kitöltése kötelező!" })} label="Felhasználónév" errors={errors}/>
            <PasswordField {...register('password', { required: "A jelszó kitöltése kötelező!" })} errors={errors}/>
            <button type="submit" className={styles.submitBtn}>Bejelentkezem</button>
            <button type="button" className={styles.submitBtn} onClick={async () => await signOut()}>Kijelentkezem</button>
        </form>
    );
}
