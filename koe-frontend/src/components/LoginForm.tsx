'use client'

import PasswordField from "@/components/inputs/PasswordField";
import TextField from "@/components/inputs/TextField";
import { login } from "@/lib/actions/auth/login";
import { signOut } from "next-auth/react";
import { useForm } from "react-hook-form";

type LoginInputs = {
    username: string;
    password: string;
}

export default function LoginForm() {
    const {
        register,
        formState: { errors }, 
        handleSubmit
    } = useForm<LoginInputs>();

    return (
        <form onSubmit={handleSubmit(login)} className="flex flex-col gap-8">
            {/*errors.username?.type === "required" && <span>Hibás felhasználónév vagy jelszó!</span>*/}
            <TextField label="Felhasználónév" {...register('username', { required: true })}/>
            {errors.username?.type === "required" && <span className="text-red-600">A felhasználónév megadaása kötelező!</span>}
            <PasswordField {...register('password', { required: true })}/>
            {errors.password?.type === "required" && <span className="text-red-600">A jelszó megadaása kötelező!</span>}
            <button type="submit" className="text-mainLight">Bejelentkezem</button>
            <button type="button" className="text-mainLight" onClick={async () => await signOut()}>Kijelentkezem</button>
        </form>
    );
}