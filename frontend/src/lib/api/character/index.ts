import CharacterClientImpl from "@/lib/api/character/character.client";
import { CharacterClient } from "@/lib/api/character/types";
import { createAuthenticatedApiClient } from "@/lib/api/client/authenticated-api-client";

const characterClient: CharacterClient = new CharacterClientImpl(createAuthenticatedApiClient());

export { characterClient };
