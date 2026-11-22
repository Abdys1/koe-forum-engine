import { characterClient } from "@/lib/api/character";
import { CharacterDetails } from "@/lib/api/character/types";
import { auth } from "@/lib/auth/auth";

export async function getOwnCharacters(): Promise<CharacterDetails[]> {
    const session = await auth();
    if (!session || session.error) {
        return [];
    }
    try {
        return await characterClient.getOwnCharacters();
    } catch (error: unknown) {
        console.error(error);
        return [];
    }
}
