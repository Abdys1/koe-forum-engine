'use server'

import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";

export async function login(formData) {
    const { username, password } = Object.fromEntries(formData);

    try {
        const response = await signIn("credentials", {
            username,
            password,
            redirect: false
        });

        if (response?.ok) {
            redirect('/character/create');
        } else {
            throw new Error('Cannot login!');
        }
    } catch (error: unknown) {

    }
}
