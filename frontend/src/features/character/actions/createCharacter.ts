"use server"

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";

import {
    CHARACTER_IMAGE_REQUIRED,
    CreateCharacterResult,
    parseCreateCharacterFormData,
    toCreateCharacterErrorCodes,
    UNAUTHORIZED,
    UNKNOWN_ERROR
} from "@/features/character/model/createCharacter";
import { characterClient } from "@/lib/api/character";
import { ApiResponseError } from "@/lib/api/client/api-response.error";
import { config } from "@/lib/auth/auth";

export async function createCharacter(formData: FormData): Promise<CreateCharacterResult> {
    const session = await getServerSession(config);
    if (!session?.user?.accessToken || session.error) {
        return { success: false, errorCodes: [UNAUTHORIZED] };
    }

    const request = parseCreateCharacterFormData(formData);
    if (!request) {
        return { success: false, errorCodes: [CHARACTER_IMAGE_REQUIRED] };
    }

    try {
        const character = await characterClient.create(request);
        revalidatePath("/", "layout");
        return { success: true, characterId: character.id };
    } catch (error: unknown) {
        if (error instanceof ApiResponseError) {
            return { success: false, errorCodes: toCreateCharacterErrorCodes(error.resp.status, error.body) };
        }
        console.error(error);
        return { success: false, errorCodes: [UNKNOWN_ERROR] };
    }
}
