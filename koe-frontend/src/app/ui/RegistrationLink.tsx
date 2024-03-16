'use client'

import SecondaryButton from "@/components/SecondaryButton"
import { useRouter } from "next/navigation";

export default function RegistrationLink() {
    const router = useRouter();
    return (
        <SecondaryButton onClick={() => router.push('/auth/registration')}>
            Regisztrálok
        </SecondaryButton>
    );
}