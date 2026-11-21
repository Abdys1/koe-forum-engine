import { auth } from "@/app/api/auth/[...nextauth]/auth";
import SidebarPanel from "@/components/Navigation/SidebarPanel";
import { characterClient } from "@/lib/api/character";
import { CharacterDetails } from "@/lib/api/character/types";

export default async function Sidebar() {
    const session = await auth();
    if (!session || session.error) {
        return null;
    }

    const characters = await loadOwnCharacters();
    return <SidebarPanel characters={characters} />;
}

async function loadOwnCharacters(): Promise<CharacterDetails[]> {
    try {
        return await characterClient.getOwnCharacters();
    } catch (error: unknown) {
        console.error(error);
        return [];
    }
}
