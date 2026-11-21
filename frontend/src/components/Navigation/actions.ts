"use server"

import { getServerSession } from "next-auth";
import { config } from "@/app/api/auth/[...nextauth]/auth";
import { userClient } from "@/lib/api/user";

export type SelectActiveCharacterResult = { success: boolean };

export async function selectActiveCharacter(characterId: number): Promise<SelectActiveCharacterResult> {
    const session = await getServerSession(config);
    if (!session?.user?.accessToken || session.error) {
        return { success: false };
    }

    try {
        await userClient.setActiveCharacter(characterId);
        return { success: true };
    } catch (error: unknown) {
        console.error(error);
        return { success: false };
    }
}
