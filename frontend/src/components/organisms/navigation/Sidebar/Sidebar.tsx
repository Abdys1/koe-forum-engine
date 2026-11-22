"use client"

import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

import { useActiveCharacterSwitch } from "@/features/character/hooks/useActiveCharacterSwitch";
import type { CharacterDetails } from "@/lib/api/character/types";

import { SIDEBAR_MENU_ITEMS } from "./menuItems";
import SidebarPanel from "./SidebarPanel";

type SidebarProps = {
    characters: CharacterDetails[]
}

export default function Sidebar({ characters }: SidebarProps) {
    const { data: session, status } = useSession();
    const pathname = usePathname();

    if (status !== "authenticated" || session.error || pathname.startsWith("/auth/")) {
        return null;
    }

    return <AuthenticatedSidebar characters={characters} pathname={pathname}/>;
}

function AuthenticatedSidebar({ characters, pathname }: SidebarProps & { pathname: string }) {
    const { activeCharacter, selectCharacter, selectionFailed } = useActiveCharacterSwitch(characters);

    return (
        <SidebarPanel characters={characters} activeCharacter={activeCharacter} selectionFailed={selectionFailed}
            menuItems={SIDEBAR_MENU_ITEMS} pathname={pathname} onSelectCharacter={selectCharacter}
            onLogout={() => signOut()}/>
    );
}
