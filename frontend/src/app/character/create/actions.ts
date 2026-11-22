"use server"

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";

import { characterClient } from "@/lib/api/character";
import { CreateCharacterRequest, ErrorCode, Sex, ValidationErrors } from "@/lib/api/character/types";
import { ApiResponseError } from "@/lib/api/client/api-response.error";
import { config } from "@/lib/auth/auth";

export type CreateCharacterResult =
    | { success: true, characterId: number }
    | { success: false, errorCodes: string[] };

export async function createCharacter(formData: FormData): Promise<CreateCharacterResult> {
    const session = await getServerSession(config);
    if (!session?.user?.accessToken || session.error) {
        return { success: false, errorCodes: ['UNAUTHORIZED'] };
    }

    const image = formData.get('image');
    if (!(image instanceof File)) {
        return { success: false, errorCodes: ['CHARACTER_IMAGE_REQUIRED'] };
    }

    const request: CreateCharacterRequest = {
        name: String(formData.get('name') ?? ''),
        sex: Number(formData.get('sex')) as Sex,
        race: String(formData.get('race') ?? ''),
        image,
        equipmentIds: formData.getAll('equipmentIds').map(Number)
    };

    try {
        const character = await characterClient.create(request);
        revalidatePath("/", "layout");
        return { success: true, characterId: character.id };
    } catch (error: unknown) {
        if (error instanceof ApiResponseError) {
            return { success: false, errorCodes: toErrorCodes(error) };
        }
        console.error(error);
        return { success: false, errorCodes: ['UNKNOWN_ERROR'] };
    }
}

function toErrorCodes(error: ApiResponseError): string[] {
    if (error.resp.status === 401 || error.resp.status === 403) {
        return ['UNAUTHORIZED'];
    }
    const body = error.body as Partial<ErrorCode & ValidationErrors> | undefined;
    if (body?.errorCode) {
        return [body.errorCode];
    }
    if (body?.errors) {
        return body.errors.map(validationError => validationError.msg);
    }
    return ['UNKNOWN_ERROR'];
}
