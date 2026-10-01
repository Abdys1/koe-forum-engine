"use client"

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import Header from "@/components/Navigation/Header";
import Footer from "@/components/Main/Footer";

interface ProviderProps {
    children: ReactNode,
    session: Session | null | undefined
}

export function Provider({ children, session }: ProviderProps) {
    return (
        <SessionProvider session={session}>
            <Header />
            {children}
            <Footer />
        </SessionProvider>
    );
}