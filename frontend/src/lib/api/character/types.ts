import type { components, paths } from "@/lib/api/schema";

type CreateCharacterRequestBody = paths["/characters"]["post"]["requestBody"]["content"]["multipart/form-data"];

export type Sex = CreateCharacterRequestBody["sex"];

export const Sex = {
    MALE: 1,
    FEMALE: 2
} as const satisfies Record<string, Sex>;

export type CreateCharacterRequest = Omit<CreateCharacterRequestBody, "equipmentIds[]"> & {
    equipmentIds: number[]
};

export type ErrorCode = components["schemas"]["ErrorCode"];

export type ValidationErrors = components["schemas"]["ValidationErrors"];

export interface CharacterClient {
    create: (reqData: CreateCharacterRequest) => Promise<void>
};
