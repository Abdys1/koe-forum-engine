'use client'

import PrimaryButton from "@/components/PrimaryButton";
import { useRouter } from "next/navigation";

export default function LoginLink() {
    const router = useRouter();
    return (
        <PrimaryButton onClick={() => router.push('/auth/login')}>
            Belépek
        </PrimaryButton>
    );
}