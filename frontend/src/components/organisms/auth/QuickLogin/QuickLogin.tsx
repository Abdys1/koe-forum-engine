'use client'

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import LoginForm from "@/components/organisms/auth/LoginForm/LoginForm";
import WelcomeBackCard from "@/components/organisms/auth/QuickLogin/WelcomeBackCard";

export default function QuickLogin() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const username = status === "authenticated" ? session.user.username : undefined;

    return <WelcomeBackCard username={username} loginForm={<LoginForm onSuccess={() => router.refresh()}/>}/>;
}
