"use client"

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface ProviderProps {
    children: ReactNode,
    session: Session | null | undefined
}

export function Provider({ children, session }: ProviderProps) {
    return (
        <SessionProvider session={session}>{children}</SessionProvider>
    );
}