"use server"

import { getServerSession } from "next-auth";

import { CharacterNameCheckResult } from "@/features/character/model/characterValidation";
import { toCreateCharacterErrorCodes, UNAUTHORIZED, UNKNOWN_ERROR } from "@/features/character/model/createCharacter";
import { characterClient } from "@/lib/api/character";
import { ApiResponseError } from "@/lib/api/client/api-response.error";
import { config } from "@/lib/auth/auth";

export async function checkCharacterName(name: string): Promise<CharacterNameCheckResult> {
    const session = await getServerSession(config);
    if (!session?.user?.accessToken || session.error) {
        return { success: false, errorCodes: [UNAUTHORIZED] };
    }

    try {
        await characterClient.validateName(name);
        return { success: true };
    } catch (error: unknown) {
        if (error instanceof ApiResponseError) {
            return { success: false, errorCodes: toCreateCharacterErrorCodes(error.resp.status, error.body) };
        }
        console.error(error);
        return { success: false, errorCodes: [UNKNOWN_ERROR] };
    }
}
