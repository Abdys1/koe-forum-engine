'use client'

import InputField from "@/components/InputField";
import { signIn, signOut } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        await signIn("credentials", {
            username,
            password,
            redirect: false
        });
    }

    return (
        <>
            <form onSubmit={handleLogin} className="flex flex-col gap-8">
                <InputField label="Felhasználónév" name="username" type="text" onChange={val => setUsername(val)}/>
                <InputField label="Jelszó" name="password" type="password" onChange={val => setPassword(val)}/>
                <button type="submit">Bejelentkezem</button>
                <button type="button" onClick={async () => await signOut()}>Kijelentkezem</button>
            </form>
        </>
    );
}