'use client'

import InputField from "@/components/inputs/InputField";
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
            <TextField label="Felhasználónév" {...register('username', { required: true })}
                error={errors.username?.type === 'required' ? 'A felhasználónév kitöltése kötelező' : undefined}/>
            <PasswordField {...register('password', { required: true })}
                error={errors.password?.type === 'required' ? 'A jelszó kitöltése kötelező' : undefined}/>
            <button type="submit" className="text-mainLight">Bejelentkezem</button>
            <button type="button" className="text-mainLight" onClick={async () => await signOut()}>Kijelentkezem</button>
        </form>
    );
}