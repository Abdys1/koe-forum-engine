'use client'

import InputField from "@/components/InputField";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
    const router = useRouter();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showError, setShowError] = useState(false);
    console.log(showError);

    async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
        try {
            setShowError(false);
            e.preventDefault();
            const res = await signIn("credentials", {
                username,
                password,
                redirect: false
            });
            if (res?.ok) {
                router.push('/character/create');
            } else {
                setShowError(true);
            }
        } catch (error: unknown) {
            setShowError(true);
        }
    }

    return (
        <>
            <form onSubmit={handleLogin} className="flex flex-col gap-8">
                {showError && <span>Hibás felhasználónév vagy jelszó!</span>}
                <InputField label="Felhasználónév" name="username" type="text" onChange={val => setUsername(val)}/>
                <InputField label="Jelszó" name="password" type="password" onChange={val => setPassword(val)}/>
                <button type="submit">Bejelentkezem</button>
                <button type="button" onClick={async () => await signOut()}>Kijelentkezem</button>
            </form>
        </>
    );
}