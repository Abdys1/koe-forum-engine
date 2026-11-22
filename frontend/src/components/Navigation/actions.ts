"use server"

import { getServerSession } from "next-auth";

import { userClient } from "@/lib/api/user";
import { config } from "@/lib/auth/auth";

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
