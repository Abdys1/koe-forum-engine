import createClient from "openapi-fetch";
import type { paths } from "@/lib/api/schema";

// TODO legyen egy config fájl, amiből szedjük
const baseUrl = process.env.API_BASE_URL || '';

export type ApiClient = ReturnType<typeof createClient<paths>>;

export function createApiClient(): ApiClient {
    return createClient<paths>({ baseUrl });
}
