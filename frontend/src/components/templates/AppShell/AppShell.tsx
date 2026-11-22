import { ReactNode } from "react";

import Footer from "@/components/organisms/navigation/Footer/Footer";
import Header from "@/components/organisms/navigation/Header/Header";
import type { SocialLinkData } from "@/features/community/model/socialLinks";

import * as styles from "./AppShell.css";

type AppShellProps = {
    sidebar: ReactNode,
    socialLinks: SocialLinkData[],
    children: ReactNode
}

export default function AppShell({ sidebar, socialLinks, children }: AppShellProps) {
    return (
        <>
            <Header />
            <div className={styles.body}>
                {sidebar}
                <div className={styles.content}>{children}</div>
            </div>
            <Footer socialLinks={socialLinks} />
        </>
    );
}
