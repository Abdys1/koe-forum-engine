import {
  CharacterRegistrationRequestDto,
  Sex,
} from "@src/components/character/types";
import { ErrorMessages } from "@src/messages";
import { db } from "@src/prisma-client";
import CharacterClient from "@test/clients/character-client";
import {
  saveEquipmentListToDb,
  saveEquipmentToDb,
  saveEquipmentTypeToDb,
  saveTestUserToDb,
} from "@test/utils/test-data-generator";
import { assertFieldError } from "@test/utils/validator-test-helper";
import { Response } from "supertest";
import { describe, it } from "vitest";

interface EquipmentResponseItem {
  assignmentId: number;
  id: number;
  name: string;
  description: string;
  type: { id: number; label: string };
}

describe("/api/characters", () => {
  let characterClient: CharacterClient;

  beforeAll(async () => {
    characterClient = new CharacterClient();
  });

  describe("POST /", () => {
    it("when create a new character then should be in the user character list", async () => {
      const user = await saveTestUserToDb();
      const equipment = await saveEquipmentListToDb(2);
      const newCharacter = characterReq({
        equipmentIds: equipment.map((item) => item.id),
      });

      const createResp = await characterClient.createCharacter(
        user.username,
        newCharacter,
      );

      expect(createResp.status).toBe(200);
      await assertUserCharacterList(user.username, [newCharacter]);
    });

    it("when create a new character then should be only in user own character list", async () => {
      const user1 = await saveTestUserToDb();
      const user2 = await saveTestUserToDb();
      const equipment = await saveEquipmentListToDb(2);
      const newCharacter = characterReq({
        equipmentIds: equipment.map((item) => item.id),
      });

      const createResp = await characterClient.createCharacter(
        user1.username,
        newCharacter,
      );

      expect(createResp.status).toBe(200);
      await assertUserCharacterList(user1.username, [newCharacter]);
      await assertUserCharacterList(user2.username, []);
    });

    it("when create character with an empty equipment id list then should save character without equipment", async () => {
      const user = await saveTestUserToDb();
      const newCharacter = characterReq({ equipmentIds: [] });

      const createResp = await characterClient.createCharacter(
        user.username,
        newCharacter,
      );

      expect(createResp.status).toBe(200);
      const equipment = await getCharacterEquipment(user.username);
      expect(equipment).toStrictEqual([]);
    });

    it("when create character without equipment id list then should save character without equipment", async () => {
      const user = await saveTestUserToDb();
      const newCharacter = characterReq({ equipmentIds: [] });
      // @ts-expect-error az equipmentIds opcionális, tehát a bodyból kimaradhat
      delete newCharacter.equipmentIds;

      const createResp = await characterClient.createCharacter(
        user.username,
        newCharacter,
      );

      expect(createResp.status).toBe(200);
      const equipment = await getCharacterEquipment(user.username);
      expect(equipment).toStrictEqual([]);
    });

    it("when create character with the same equipment twice then should store two assignments", async () => {
      const user = await saveTestUserToDb();
      const [potion, ring] = await saveEquipmentListToDb(2);
      const newCharacter = characterReq({
        equipmentIds: [potion.id, potion.id, ring.id],
      });

      const createResp = await characterClient.createCharacter(
        user.username,
        newCharacter,
      );

      expect(createResp.status).toBe(200);
      const equipment = await getCharacterEquipment(user.username);
      expect(equipment.length).toBe(3);
      expect(equipment.map((item) => item.id).sort()).toStrictEqual(
        [potion.id, potion.id, ring.id].sort(),
      );
    });

    it("when create character with the same equipment twice then the assignment ids should be unique", async () => {
      const user = await saveTestUserToDb();
      const potion = await saveEquipmentToDb();
      const newCharacter = characterReq({
        equipmentIds: [potion.id, potion.id],
      });

      await characterClient.createCharacter(user.username, newCharacter);

      const equipment = await getCharacterEquipment(user.username);
      expect(equipment.length).toBe(2);
      const assignmentIds = equipment.map((item) => item.assignmentId);
      expect(assignmentIds.every((id) => id !== undefined && id !== null)).toBe(true);
      expect(new Set(assignmentIds).size).toBe(2);
    });

    it("when create character with the same equipment twice then should write two join rows", async () => {
      const user = await saveTestUserToDb();
      const potion = await saveEquipmentToDb();

      await characterClient.createCharacter(
        user.username,
        characterReq({ equipmentIds: [potion.id, potion.id] }),
      );

      const joinRowCount = await db.characterEquipment.count({
        where: { equipmentId: potion.id },
      });
      expect(joinRowCount).toBe(2);
    });

    it("when create character with five of the same equipment then should store five assignments", async () => {
      const user = await saveTestUserToDb();
      const potion = await saveEquipmentToDb();
      const equipmentIds = [potion.id, potion.id, potion.id, potion.id, potion.id];

      const createResp = await characterClient.createCharacter(
        user.username,
        characterReq({ equipmentIds }),
      );

      expect(createResp.status).toBe(200);
      const equipment = await getCharacterEquipment(user.username);
      expect(equipment.length).toBe(5);
    });

    it("when create character with many equipment of mixed types then should store all of them", async () => {
      const user = await saveTestUserToDb();
      const equipment = await saveEquipmentListToDb(12);
      const equipmentIds = equipment.map((item) => item.id);

      const createResp = await characterClient.createCharacter(
        user.username,
        characterReq({ equipmentIds }),
      );

      expect(createResp.status).toBe(200);
      const storedEquipment = await getCharacterEquipment(user.username);
      expect(storedEquipment.length).toBe(12);
      expect(new Set(storedEquipment.map((item) => item.type.id)).size).toBe(12);
    });

    it("when create character then the equipment response should contain the type of every assignment", async () => {
      const user = await saveTestUserToDb();
      const type = await saveEquipmentTypeToDb("Bájital");
      const potion = await saveEquipmentToDb({
        name: "Gyógyító ital",
        description: "Gyógyít",
        typeId: type.id,
      });

      await characterClient.createCharacter(
        user.username,
        characterReq({ equipmentIds: [potion.id] }),
      );

      const equipment = await getCharacterEquipment(user.username);
      expect(equipment.length).toBe(1);
      expect(equipment[0].id).toBe(potion.id);
      expect(equipment[0].name).toBe("Gyógyító ital");
      expect(equipment[0].description).toBe("Gyógyít");
      expect(equipment[0].type).toStrictEqual({ id: type.id, label: "Bájital" });
    });

    it("when character already exists then should not be added", async () => {
      const user = await saveTestUserToDb();
      const user2 = await saveTestUserToDb();
      const equipment = await saveEquipmentToDb();
      const newCharacter = characterReq({ equipmentIds: [equipment.id] });

      await characterClient.createCharacter(user.username, newCharacter);

      const createResp = await characterClient.createCharacter(
        user.username,
        newCharacter,
      );
      expect(createResp.status).toBe(409);
      expect(createResp.body).toStrictEqual({
        errorCode: ErrorMessages.CHARACTER_ALREADY_EXISTS,
      });
      await assertUserCharacterList(user.username, [newCharacter]);

      const anotherUserCreateResp = await characterClient.createCharacter(
        user2.username,
        newCharacter,
      );
      expect(anotherUserCreateResp.status).toBe(409);
      expect(anotherUserCreateResp.body).toStrictEqual({
        errorCode: ErrorMessages.CHARACTER_ALREADY_EXISTS,
      });
      await assertUserCharacterList(user2.username, []);
    });

    it("when try create character without character name then should return character name required error", async () => {
      const character = characterReq({ name: "" });
      const resp = await createCharacterToRandomUser(character);
      assertFieldError(resp, "name", [
        ErrorMessages.CHARACTER_NAME_INVALID_LENGTH,
      ]);
    });

    it("when try create character with too short character name then should return character name too short error", async () => {
      const character = characterReq({ name: "as" });
      const resp = await createCharacterToRandomUser(character);
      assertFieldError(resp, "name", [
        ErrorMessages.CHARACTER_NAME_INVALID_LENGTH,
      ]);
    });

    it("when try create character with too long character name then should return character name too long error", async () => {
      const character = characterReq({ name: "a".repeat(65) });
      const resp = await createCharacterToRandomUser(character);
      assertFieldError(resp, "name", [
        ErrorMessages.CHARACTER_NAME_INVALID_LENGTH,
      ]);
    });

    it("when try create character with invalid character name then should return character name invalid error", async () => {
      const character = characterReq({ name: "$Aragorn%" });
      const resp = await createCharacterToRandomUser(character);
      assertFieldError(resp, "name", [
        ErrorMessages.CHARACTER_NAME_INVALID_LETTERS,
      ]);
    });

    it("when try create character with invalid sex number then should return character sex invalid error", async () => {
      const character = characterReq();
      // @ts-expect-error tesztelni kell, hogy mi van ha nem jó érték jön
      character.sex = 3;
      const resp = await createCharacterToRandomUser(character);
      assertFieldError(resp, "sex", [ErrorMessages.CHARACTER_SEX_INVALID]);
    });

    it("when try create character with string sex then should return character sex invalid error", async () => {
      const character = characterReq();
      // @ts-expect-error tesztelni kell, hogy mi van ha nem jó érték jön
      character.sex = "INVALID_VALUE";
      const resp = await createCharacterToRandomUser(character);
      assertFieldError(resp, "sex", [ErrorMessages.CHARACTER_SEX_INVALID]);
    });

    it("when try create character without sex then should return character sex sex invalid error", async () => {
      const character = characterReq();
      // @ts-expect-error tesztelni kell, hogy mi van ha nem jön érték
      delete character.sex;
      const resp = await createCharacterToRandomUser(character);
      assertFieldError(resp, "sex", [ErrorMessages.CHARACTER_SEX_INVALID]);
    });

    it("when try create character without race then should return character race required error", async () => {
      const character = characterReq({ race: "" });
      const resp = await createCharacterToRandomUser(character);
      assertFieldError(resp, "race", [ErrorMessages.CHARACTER_RACE_REQUIRED]);
    });

    it("when try create character with not existent race then should return character race not exists error", async () => {
      // TODO: ha kész lesz a fajokat listázó végpont, akkor ezt a validációt is be kell kötni
      /*const character = characterReq({ race: 'NOT_EXISTENT_RACE' });
            const resp = await createCharacterToRandomUser(character);
            assertFieldError(resp, 'race', [ErrorMessages.CHARACTER_RACE_NOT_EXISTS]);*/
    });

    it("when try create character with non-existent equipment then should return equipment not exists error", async () => {
      const character = characterReq({ equipmentIds: [-1] });
      const resp = await createCharacterToRandomUser(character);
      expect(resp.status).toBe(400);
      expect(resp.body).toStrictEqual({
        errorCode: ErrorMessages.EQUIPMENT_NOT_EXISTS,
      });
    });

    it("when try create character with a non-existent equipment among duplicates then should return equipment not exists error", async () => {
      const potion = await saveEquipmentToDb();
      const character = characterReq({
        equipmentIds: [potion.id, potion.id, -1],
      });
      const resp = await createCharacterToRandomUser(character);
      expect(resp.status).toBe(400);
      expect(resp.body).toStrictEqual({
        errorCode: ErrorMessages.EQUIPMENT_NOT_EXISTS,
      });
    });

    it("when try create character with non-existent equipment then should not save the character", async () => {
      const user = await saveTestUserToDb();
      const character = characterReq({ equipmentIds: [-1] });

      await characterClient.createCharacter(user.username, character);

      await assertUserCharacterList(user.username, []);
    });

    it("when try create character with a non-array equipment id list then should return equipment ids invalid error", async () => {
      const character = characterReq();
      // @ts-expect-error tesztelni kell, hogy mi van ha nem tömb jön
      character.equipmentIds = 5;
      const resp = await createCharacterToRandomUser(character);
      assertFieldError(resp, "equipmentIds", [
        ErrorMessages.CHARACTER_EQUIPMENT_IDS_INVALID,
      ]);
    });

    it("when try create character with a non-numeric equipment id then should return validation error", async () => {
      const character = characterReq();
      // @ts-expect-error tesztelni kell, hogy mi van ha nem szám elem jön
      character.equipmentIds = ["nem-szam"];
      const resp = await createCharacterToRandomUser(character);
      assertEquipmentIdsValidationError(resp);
    });

    it("when try create character with too many equipment ids then should return equipment ids invalid error", async () => {
      const potion = await saveEquipmentToDb();
      const character = characterReq({
        equipmentIds: new Array(101).fill(potion.id),
      });
      const resp = await createCharacterToRandomUser(character);
      assertEquipmentIdsValidationError(resp);
    });

    it("when try create character without image url then should return character image url required error", async () => {
      const character = characterReq({ imageUrl: "" });
      const resp = await createCharacterToRandomUser(character);
      assertFieldError(resp, "imageUrl", [
        ErrorMessages.CHARACTER_IMAGE_URL_REQUIRED,
      ]);
    });
  });

  describe("DELETE /:id", () => {
    it("when a character is deleted then all of its equipment assignments are removed", async () => {
      const user = await saveTestUserToDb();
      const potion = await saveEquipmentToDb();
      await characterClient.createCharacter(
        user.username,
        characterReq({ equipmentIds: [potion.id, potion.id, potion.id] }),
      );
      const character = await db.character.findFirstOrThrow({
        where: { userId: user.id },
      });
      expect(
        await db.characterEquipment.count({ where: { characterId: character.id } }),
      ).toBe(3);

      await db.character.delete({ where: { id: character.id } });

      expect(
        await db.characterEquipment.count({ where: { characterId: character.id } }),
      ).toBe(0);
      expect(await db.equipment.count({ where: { id: potion.id } })).toBe(1);
    });
  });

  async function createCharacterToRandomUser(
    req: CharacterRegistrationRequestDto,
  ): Promise<Response> {
    const user = await saveTestUserToDb();
    return characterClient.createCharacter(user.username, req);
  }

  async function getCharacterEquipment(
    username: string,
  ): Promise<EquipmentResponseItem[]> {
    const resp = await characterClient.getCharacters(username);
    expect(resp.status).toBe(200);
    expect(resp.body.length).toBeGreaterThan(0);
    return resp.body[0].equipment;
  }

  async function assertUserCharacterList(
    username: string,
    expectedCharacters: CharacterRegistrationRequestDto[],
  ): Promise<void> {
    const resp = await characterClient.getCharacters(username);
    expect(resp.status).toBe(200);
    expect(resp.body).toBeInstanceOf(Array);
    expect(resp.body.length).toBe(expectedCharacters.length);
    for (let i = 0; i < expectedCharacters.length; i++) {
      const character = resp.body[i];
      const expectedCharacter = expectedCharacters[i];
      expect(character.id).toBeDefined();
      expect(character.name).toBe(expectedCharacter.name);
      expect(character.sex).toBe(expectedCharacter.sex);
      expect(character.race).toBe(expectedCharacter.race);
      expect(character.imageUrl).toBe(expectedCharacter.imageUrl);
      expect(character.equipment).toBeInstanceOf(Array);
      expect(character.equipment.length).toBe(
        expectedCharacter.equipmentIds.length,
      );
      expect(
        character.equipment.map((item: EquipmentResponseItem) => item.id).sort(),
      ).toStrictEqual([...expectedCharacter.equipmentIds].sort());
    }
  }

  function assertEquipmentIdsValidationError(resp: Response): void {
    expect(resp.status).toBe(400);
    expect(resp.body).toHaveProperty("errors");
    const equipmentIdErrors = resp.body.errors.filter(
      (error: { path: string }) => error.path.startsWith("equipmentIds"),
    );
    expect(equipmentIdErrors.length).toBeGreaterThan(0);
  }
});

function characterReq(
  overrides: Partial<CharacterRegistrationRequestDto> = {},
): CharacterRegistrationRequestDto {
  return {
    name: "Aragorn a Kósza",
    sex: Sex.MALE,
    race: "human",
    equipmentIds: [],
    imageUrl: "/aragorn.jpg",
    ...overrides,
  };
}
