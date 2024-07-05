'use server'

import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";

// TODO értelmes típust találni neki
export async function login(formData) {
    try {
        const response = await signIn("credentials", {
            usernema: formData.get('username'),
            password: formData.get('password'),
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
