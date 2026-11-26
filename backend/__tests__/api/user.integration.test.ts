import { ErrorMessages } from "@src/messages";
import UserClient from "@test/clients/user-client";
import { db } from "@test/utils/test-container";
import { saveRaceToDb, saveTestUserToDb } from "@test/utils/test-data-generator";
import { assertFieldError } from "@test/utils/validator-test-helper";
import { describe, expect, it } from "vitest";

describe("/api/users", () => {
  let userClient: UserClient;

  beforeAll(() => {
    userClient = new UserClient();
  });

  describe("GET /me", () => {
    it("should return the current user without active character", async () => {
      const user = await saveTestUserToDb();

      const resp = await userClient.getCurrentUser(user.username);

      expect(resp.status).toBe(200);
      expect(resp.body).toStrictEqual({ id: user.id, username: user.username, activeCharacterId: null });
    });
  });

  describe("PUT /me/active-character", () => {
    it("when select an own character then it should be the active character of the user", async () => {
      const user = await saveTestUserToDb();
      const character = await db.character.create({
        data: { userId: user.id, name: "Aragorn", raceId: (await saveRaceToDb()).id, sex: 1, imageUrl: "/aragorn.jpg" }
      });

      const resp = await userClient.setActiveCharacter(user.username, character.id);

      expect(resp.status).toBe(204);
      const currentUser = await userClient.getCurrentUser(user.username);
      expect(currentUser.body.activeCharacterId).toBe(character.id);
    });

    it("when select a character of another user then should return 403", async () => {
      const user = await saveTestUserToDb();
      const other = await saveTestUserToDb();
      const character = await db.character.create({
        data: { userId: other.id, name: "Legolas", raceId: (await saveRaceToDb()).id, sex: 1, imageUrl: "/legolas.jpg" }
      });

      const resp = await userClient.setActiveCharacter(user.username, character.id);

      expect(resp.status).toBe(403);
      expect(resp.body).toStrictEqual({ errorCode: ErrorMessages.CHARACTER_NOT_OWNED });
    });

    it("when select a not existing character then should return 404", async () => {
      const user = await saveTestUserToDb();

      const resp = await userClient.setActiveCharacter(user.username, 999999);

      expect(resp.status).toBe(404);
      expect(resp.body).toStrictEqual({ errorCode: ErrorMessages.CHARACTER_NOT_EXISTS });
    });

    it("when the character id is not an integer then should return 400", async () => {
      const user = await saveTestUserToDb();

      const resp = await userClient.setActiveCharacter(user.username, "abc");

      expect(resp.status).toBe(400);
      assertFieldError(resp, "characterId", [ErrorMessages.CHARACTER_ID_INVALID]);
    });
  });
});
