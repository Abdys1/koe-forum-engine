"use client"

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import Header from "@/components/Navigation/Header";
import Footer from "@/components/Main/Footer";
import Sidebar from "@/components/Navigation/Sidebar";
import * as styles from "./Provider.css";

interface ProviderProps {
    children: ReactNode,
    session: Session | null | undefined
}

export function Provider({ children, session }: ProviderProps) {
    return (
        <SessionProvider session={session}>
            <Header />
            <div className={styles.body}>
                <Sidebar />
                <div className={styles.content}>{children}</div>
            </div>
            <Footer />
        </SessionProvider>
    );
}