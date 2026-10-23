import {
  CharacterRegistrationRequestDto,
  Sex,
} from "@src/components/character/types";
import { ErrorMessages } from "@src/messages";
import CharacterClient from "@test/clients/character-client";
import { db } from "@test/utils/test-container";
import {
  saveEquipmentListToDb,
  saveEquipmentToDb,
  saveEquipmentTypeToDb,
  saveSlotToDb,
  saveTestUserToDb,
} from "@test/utils/test-data-generator";
import { assertFieldError } from "@test/utils/validator-test-helper";
import { Response } from "supertest";
import { describe, it } from "vitest";

interface EquipmentResponseItem {
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
      const newCharacter = characterReq();

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
      const newCharacter = characterReq();

      const createResp = await characterClient.createCharacter(
        user1.username,
        newCharacter,
      );

      expect(createResp.status).toBe(200);
      await assertUserCharacterList(user1.username, [newCharacter]);
      await assertUserCharacterList(user2.username, []);
    });

    it("when create character with equipment then the equipment should be assigned to it", async () => {
      const user = await saveTestUserToDb();
      const equipment = await saveEquipmentListToDb(2);
      const equipmentIds = equipment.map((item) => item.id);

      const createResp = await characterClient.createCharacter(user.username, characterReq({ equipmentIds }));

      expect(createResp.status).toBe(200);
      const stored = await getCharacterEquipment(user.username, await getCharacterIdOf(user.id));
      expect(stored.map((item) => item.id).sort()).toStrictEqual([...equipmentIds].sort());
    });

    it("when create character with an empty equipment id list then should save character without equipment", async () => {
      const user = await saveTestUserToDb();

      const createResp = await characterClient.createCharacter(user.username, characterReq({ equipmentIds: [] }));

      expect(createResp.status).toBe(200);
      expect(await getCharacterEquipment(user.username, await getCharacterIdOf(user.id))).toStrictEqual([]);
    });

    it("when create character without equipment id list then should save character without equipment", async () => {
      const user = await saveTestUserToDb();

      const createResp = await characterClient.createCharacter(user.username, characterReq());

      expect(createResp.status).toBe(200);
      expect(await getCharacterEquipment(user.username, await getCharacterIdOf(user.id))).toStrictEqual([]);
    });

    it("when create character with the same equipment twice then should store two assignments", async () => {
      const user = await saveTestUserToDb();
      const [potion, ring] = await saveEquipmentListToDb(2);

      const createResp = await characterClient.createCharacter(
        user.username,
        characterReq({ equipmentIds: [potion.id, potion.id, ring.id] }),
      );

      expect(createResp.status).toBe(200);
      const stored = await getCharacterEquipment(user.username, await getCharacterIdOf(user.id));
      expect(stored.map((item) => item.id).sort()).toStrictEqual([potion.id, potion.id, ring.id].sort());
    });

    it("when create character with the same equipment twice then should write two join rows", async () => {
      const user = await saveTestUserToDb();
      const potion = await saveEquipmentToDb();

      await characterClient.createCharacter(user.username, characterReq({ equipmentIds: [potion.id, potion.id] }));

      expect(await db.characterEquipment.count({ where: { equipmentId: potion.id } })).toBe(2);
    });

    it("when create character with many equipment of mixed types then should store all of them", async () => {
      const user = await saveTestUserToDb();
      const equipment = await saveEquipmentListToDb(12);

      const createResp = await characterClient.createCharacter(
        user.username,
        characterReq({ equipmentIds: equipment.map((item) => item.id) }),
      );

      expect(createResp.status).toBe(200);
      const stored = await getCharacterEquipment(user.username, await getCharacterIdOf(user.id));
      expect(stored.length).toBe(12);
      expect(new Set(stored.map((item) => item.type.id)).size).toBe(12);
    });

    it("when character already exists then should not be added", async () => {
      const user = await saveTestUserToDb();
      const user2 = await saveTestUserToDb();
      const newCharacter = characterReq();

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
      const resp = await createCharacterToRandomUser(characterReq({ equipmentIds: [-1] }));

      expect(resp.status).toBe(422);
      expect(resp.body).toStrictEqual({ errorCode: ErrorMessages.EQUIPMENT_NOT_EXISTS });
    });

    it("when try create character with a non-existent equipment among duplicates then should return equipment not exists error", async () => {
      const potion = await saveEquipmentToDb();

      const resp = await createCharacterToRandomUser(characterReq({ equipmentIds: [potion.id, potion.id, -1] }));

      expect(resp.status).toBe(422);
      expect(resp.body).toStrictEqual({ errorCode: ErrorMessages.EQUIPMENT_NOT_EXISTS });
    });

    it("when try create character with non-existent equipment then should not save the character", async () => {
      const user = await saveTestUserToDb();

      await characterClient.createCharacter(user.username, characterReq({ equipmentIds: [-1] }));

      await assertUserCharacterList(user.username, []);
    });

    it("when try create character with a non-array equipment id list then should return equipment ids invalid error", async () => {
      const character = characterReq();
      // @ts-expect-error tesztelni kell, hogy mi van ha nem tömb jön
      character.equipmentIds = 5;

      const resp = await createCharacterToRandomUser(character);

      assertFieldError(resp, "equipmentIds", [ErrorMessages.CHARACTER_EQUIPMENT_IDS_INVALID]);
    });

    it("when try create character with a non-numeric equipment id then should return validation error", async () => {
      const character = characterReq();
      // @ts-expect-error tesztelni kell, hogy mi van ha nem szám elem jön
      character.equipmentIds = ["nem-szam"];

      const resp = await createCharacterToRandomUser(character);

      assertEquipmentIdsValidationError(resp);
    });

    it("when try create character with too many equipment ids then should return validation error", async () => {
      const potion = await saveEquipmentToDb();

      const resp = await createCharacterToRandomUser(characterReq({ equipmentIds: new Array(101).fill(potion.id) }));

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

  describe("PUT /:id/equipment", () => {
    it("when set the equipment of the character then should return and store the new list", async () => {
      const user = await saveTestUserToDb();
      const equipment = await saveEquipmentListToDb(2);
      const characterId = await createCharacterOf(user);
      const equipmentIds = equipment.map((item) => item.id);

      const resp = await characterClient.setCharacterEquipment(user.username, characterId, equipmentIds);

      expect(resp.status).toBe(200);
      expect(resp.body.map((item: EquipmentResponseItem) => item.id).sort()).toStrictEqual([...equipmentIds].sort());
      const stored = await getCharacterEquipment(user.username, characterId);
      expect(stored.map((item) => item.id).sort()).toStrictEqual([...equipmentIds].sort());
    });

    it("when set the equipment again then the previous list should be replaced", async () => {
      const user = await saveTestUserToDb();
      const [potion, ring, sword] = await saveEquipmentListToDb(3);
      const characterId = await createCharacterOf(user);
      await characterClient.setCharacterEquipment(user.username, characterId, [potion.id, ring.id]);

      const resp = await characterClient.setCharacterEquipment(user.username, characterId, [sword.id]);

      expect(resp.status).toBe(200);
      const stored = await getCharacterEquipment(user.username, characterId);
      expect(stored.map((item) => item.id)).toStrictEqual([sword.id]);
    });

    it("when set an empty list then every equipment should be removed", async () => {
      const user = await saveTestUserToDb();
      const potion = await saveEquipmentToDb();
      const characterId = await createCharacterOf(user);
      await characterClient.setCharacterEquipment(user.username, characterId, [potion.id]);

      const resp = await characterClient.setCharacterEquipment(user.username, characterId, []);

      expect(resp.status).toBe(200);
      expect(resp.body).toStrictEqual([]);
      expect(await db.characterEquipment.count({ where: { characterId } })).toBe(0);
    });

    it("when set the same equipment twice then should store two assignments", async () => {
      const user = await saveTestUserToDb();
      const [potion, ring] = await saveEquipmentListToDb(2);
      const characterId = await createCharacterOf(user);

      const resp = await characterClient.setCharacterEquipment(user.username, characterId, [potion.id, potion.id, ring.id]);

      expect(resp.status).toBe(200);
      const stored = await getCharacterEquipment(user.username, characterId);
      expect(stored.map((item) => item.id).sort()).toStrictEqual([potion.id, potion.id, ring.id].sort());
    });

    it("when set the same equipment twice then should write two join rows", async () => {
      const user = await saveTestUserToDb();
      const potion = await saveEquipmentToDb();
      const characterId = await createCharacterOf(user);

      await characterClient.setCharacterEquipment(user.username, characterId, [potion.id, potion.id]);

      expect(await db.characterEquipment.count({ where: { equipmentId: potion.id } })).toBe(2);
    });

    it("when set five of the same equipment then should store five assignments", async () => {
      const user = await saveTestUserToDb();
      const potion = await saveEquipmentToDb();
      const characterId = await createCharacterOf(user);

      const resp = await characterClient.setCharacterEquipment(user.username, characterId, new Array(5).fill(potion.id));

      expect(resp.status).toBe(200);
      expect((await getCharacterEquipment(user.username, characterId)).length).toBe(5);
    });

    it("when set many equipment of mixed types then should store all of them", async () => {
      const user = await saveTestUserToDb();
      const equipment = await saveEquipmentListToDb(12);
      const characterId = await createCharacterOf(user);

      const resp = await characterClient.setCharacterEquipment(user.username, characterId, equipment.map((item) => item.id));

      expect(resp.status).toBe(200);
      const stored = await getCharacterEquipment(user.username, characterId);
      expect(stored.length).toBe(12);
      expect(new Set(stored.map((item) => item.type.id)).size).toBe(12);
    });

    it("when set the equipment then the response should contain the type of every equipment", async () => {
      const user = await saveTestUserToDb();
      const type = await saveEquipmentTypeToDb("Bájital");
      const potion = await saveEquipmentToDb({ name: "Gyógyító ital", description: "Gyógyít", typeId: type.id });
      const characterId = await createCharacterOf(user);

      const resp = await characterClient.setCharacterEquipment(user.username, characterId, [potion.id]);

      expect(resp.status).toBe(200);
      expect(resp.body.length).toBe(1);
      expect(resp.body[0].id).toBe(potion.id);
      expect(resp.body[0].name).toBe("Gyógyító ital");
      expect(resp.body[0].description).toBe("Gyógyít");
      expect(resp.body[0].type).toStrictEqual({ id: type.id, label: "Bájital", slotId: null });
    });

    it("when the character belongs to another user then should return character not owned error", async () => {
      const owner = await saveTestUserToDb();
      const otherUser = await saveTestUserToDb();
      const potion = await saveEquipmentToDb();
      const characterId = await createCharacterOf(owner);

      const resp = await characterClient.setCharacterEquipment(otherUser.username, characterId, [potion.id]);

      expect(resp.status).toBe(403);
      expect(resp.body).toStrictEqual({ errorCode: ErrorMessages.CHARACTER_NOT_OWNED });
      expect(await db.characterEquipment.count({ where: { characterId } })).toBe(0);
    });

    it("when the character does not exist then should return character not exists error", async () => {
      const user = await saveTestUserToDb();

      const resp = await characterClient.setCharacterEquipment(user.username, 999999, []);

      expect(resp.status).toBe(404);
      expect(resp.body).toStrictEqual({ errorCode: ErrorMessages.CHARACTER_NOT_EXISTS });
    });

    it("when the id is not an integer then should return validation error", async () => {
      const user = await saveTestUserToDb();

      const resp = await characterClient.setCharacterEquipment(user.username, "nem-szam", []);

      expect(resp.status).toBe(400);
    });

    it("when set non-existent equipment then should return equipment not exists error", async () => {
      const user = await saveTestUserToDb();
      const characterId = await createCharacterOf(user);

      const resp = await characterClient.setCharacterEquipment(user.username, characterId, [-1]);

      expect(resp.status).toBe(422);
      expect(resp.body).toStrictEqual({ errorCode: ErrorMessages.EQUIPMENT_NOT_EXISTS });
    });

    it("when set a non-existent equipment among duplicates then should return equipment not exists error", async () => {
      const user = await saveTestUserToDb();
      const potion = await saveEquipmentToDb();
      const characterId = await createCharacterOf(user);

      const resp = await characterClient.setCharacterEquipment(user.username, characterId, [potion.id, potion.id, -1]);

      expect(resp.status).toBe(422);
      expect(resp.body).toStrictEqual({ errorCode: ErrorMessages.EQUIPMENT_NOT_EXISTS });
    });

    it("when set non-existent equipment then the previous equipment should be kept", async () => {
      const user = await saveTestUserToDb();
      const potion = await saveEquipmentToDb();
      const characterId = await createCharacterOf(user);
      await characterClient.setCharacterEquipment(user.username, characterId, [potion.id]);

      await characterClient.setCharacterEquipment(user.username, characterId, [-1]);

      const stored = await getCharacterEquipment(user.username, characterId);
      expect(stored.map((item) => item.id)).toStrictEqual([potion.id]);
    });

    it("when the equipment id list is missing then should return equipment ids invalid error", async () => {
      const user = await saveTestUserToDb();
      const characterId = await createCharacterOf(user);

      const resp = await characterClient.setCharacterEquipment(user.username, characterId, undefined);

      assertFieldError(resp, "equipmentIds", [ErrorMessages.CHARACTER_EQUIPMENT_IDS_INVALID]);
    });

    it("when the equipment id list is not an array then should return equipment ids invalid error", async () => {
      const user = await saveTestUserToDb();
      const characterId = await createCharacterOf(user);

      const resp = await characterClient.setCharacterEquipment(user.username, characterId, 5);

      assertFieldError(resp, "equipmentIds", [ErrorMessages.CHARACTER_EQUIPMENT_IDS_INVALID]);
    });

    it("when an equipment id is not numeric then should return validation error", async () => {
      const user = await saveTestUserToDb();
      const characterId = await createCharacterOf(user);

      const resp = await characterClient.setCharacterEquipment(user.username, characterId, ["nem-szam"]);

      assertEquipmentIdsValidationError(resp);
    });

    it("when there are too many equipment ids then should return validation error", async () => {
      const user = await saveTestUserToDb();
      const potion = await saveEquipmentToDb();
      const characterId = await createCharacterOf(user);

      const resp = await characterClient.setCharacterEquipment(user.username, characterId, new Array(101).fill(potion.id));

      assertEquipmentIdsValidationError(resp);
    });
  });

  describe("slot capacity", () => {
    it("when equipment is within its slot capacity then the equipment should be set", async () => {
      const slot = await saveSlotToDb({ maxCapacity: 2 });
      const type = await saveEquipmentTypeToDb(undefined, slot.id);
      const equipment = await saveEquipmentListToDb(2, type.id);
      const equipmentIds = equipment.map((item) => item.id);

      const resp = await setEquipmentOfNewCharacter(equipmentIds);

      expect(resp.status).toBe(200);
    });

    it("when equipment exceeds its slot capacity then should return slot capacity exceeded error", async () => {
      const slot = await saveSlotToDb({ maxCapacity: 2 });
      const type = await saveEquipmentTypeToDb(undefined, slot.id);
      const equipment = await saveEquipmentListToDb(3, type.id);
      const equipmentIds = equipment.map((item) => item.id);

      const resp = await setEquipmentOfNewCharacter(equipmentIds);

      expect(resp.status).toBe(422);
      expect(resp.body).toStrictEqual({
        errorCode: ErrorMessages.CHARACTER_SLOT_CAPACITY_EXCEEDED,
      });
    });

    it("when equipment exceeds its slot capacity then should not save the equipment", async () => {
      const slot = await saveSlotToDb({ maxCapacity: 1 });
      const type = await saveEquipmentTypeToDb(undefined, slot.id);
      const equipment = await saveEquipmentListToDb(2, type.id);
      const equipmentIds = equipment.map((item) => item.id);

      const user = await saveTestUserToDb();
      const characterId = await createCharacterOf(user);

      await characterClient.setCharacterEquipment(user.username, characterId, equipmentIds);

      expect(await db.characterEquipment.count({ where: { characterId } })).toBe(0);
    });

    it("when the same equipment repeated exceeds its slot capacity then should return slot capacity exceeded error", async () => {
      const slot = await saveSlotToDb({ maxCapacity: 2 });
      const type = await saveEquipmentTypeToDb(undefined, slot.id);
      const potion = await saveEquipmentToDb({ typeId: type.id });
      const equipmentIds = [potion.id, potion.id, potion.id];

      const resp = await setEquipmentOfNewCharacter(equipmentIds);

      expect(resp.status).toBe(422);
      expect(resp.body).toStrictEqual({
        errorCode: ErrorMessages.CHARACTER_SLOT_CAPACITY_EXCEEDED,
      });
    });

    it("when equipment with a slot cost above one is combined with another item then it should count accordingly toward the capacity", async () => {
      const slot = await saveSlotToDb({ maxCapacity: 2 });
      const type = await saveEquipmentTypeToDb(undefined, slot.id);
      const twoHanded = await saveEquipmentToDb({ typeId: type.id, slotCost: 2 });
      const oneHanded = await saveEquipmentToDb({ typeId: type.id, slotCost: 1 });
      const equipmentIds = [twoHanded.id, oneHanded.id];

      const resp = await setEquipmentOfNewCharacter(equipmentIds);

      expect(resp.status).toBe(422);
      expect(resp.body).toStrictEqual({
        errorCode: ErrorMessages.CHARACTER_SLOT_CAPACITY_EXCEEDED,
      });
    });

    it("when two different equipment types share the same slot then their slot costs pool together", async () => {
      const slot = await saveSlotToDb({ maxCapacity: 2 });
      const primaryWeaponType = await saveEquipmentTypeToDb(undefined, slot.id);
      const secondaryWeaponType = await saveEquipmentTypeToDb(undefined, slot.id);
      const sword = await saveEquipmentToDb({ typeId: primaryWeaponType.id, slotCost: 1 });
      const dagger = await saveEquipmentToDb({ typeId: secondaryWeaponType.id, slotCost: 1 });
      const equipmentIds = [sword.id, dagger.id];

      const resp = await setEquipmentOfNewCharacter(equipmentIds);

      expect(resp.status).toBe(200);
    });

    it("when two different equipment types share the same slot then exceeding the pooled capacity is rejected", async () => {
      const slot = await saveSlotToDb({ maxCapacity: 2 });
      const primaryWeaponType = await saveEquipmentTypeToDb(undefined, slot.id);
      const secondaryWeaponType = await saveEquipmentTypeToDb(undefined, slot.id);
      const sword = await saveEquipmentToDb({ typeId: primaryWeaponType.id, slotCost: 1 });
      const axe = await saveEquipmentToDb({ typeId: primaryWeaponType.id, slotCost: 1 });
      const dagger = await saveEquipmentToDb({ typeId: secondaryWeaponType.id, slotCost: 1 });
      const equipmentIds = [sword.id, axe.id, dagger.id];

      const resp = await setEquipmentOfNewCharacter(equipmentIds);

      expect(resp.status).toBe(422);
      expect(resp.body).toStrictEqual({
        errorCode: ErrorMessages.CHARACTER_SLOT_CAPACITY_EXCEEDED,
      });
    });

    it("when the initial equipment of a new character exceeds its slot capacity then should return slot capacity exceeded error", async () => {
      const slot = await saveSlotToDb({ maxCapacity: 2 });
      const type = await saveEquipmentTypeToDb(undefined, slot.id);
      const equipment = await saveEquipmentListToDb(3, type.id);

      const resp = await createCharacterToRandomUser(characterReq({ equipmentIds: equipment.map((item) => item.id) }));

      expect(resp.status).toBe(422);
      expect(resp.body).toStrictEqual({ errorCode: ErrorMessages.CHARACTER_SLOT_CAPACITY_EXCEEDED });
    });

    it("when the initial equipment of a new character exceeds its slot capacity then should not save the character", async () => {
      const user = await saveTestUserToDb();
      const slot = await saveSlotToDb({ maxCapacity: 1 });
      const type = await saveEquipmentTypeToDb(undefined, slot.id);
      const equipment = await saveEquipmentListToDb(2, type.id);

      await characterClient.createCharacter(user.username, characterReq({ equipmentIds: equipment.map((item) => item.id) }));

      await assertUserCharacterList(user.username, []);
    });

    it("when the initial equipment of a new character is within its slot capacity then the character should be created", async () => {
      const slot = await saveSlotToDb({ maxCapacity: 2 });
      const type = await saveEquipmentTypeToDb(undefined, slot.id);
      const equipment = await saveEquipmentListToDb(2, type.id);

      const resp = await createCharacterToRandomUser(characterReq({ equipmentIds: equipment.map((item) => item.id) }));

      expect(resp.status).toBe(200);
    });

    it("when an equipment type has no slot then there should be no capacity limit on it", async () => {
      const equipment = await saveEquipmentListToDb(5);
      const equipmentIds = equipment.map((item) => item.id);

      const resp = await setEquipmentOfNewCharacter(equipmentIds);

      expect(resp.status).toBe(200);
    });
  });

  describe("GET /:id/equipment", () => {
    it("when the character belongs to another user then should still return its equipment", async () => {
      const owner = await saveTestUserToDb();
      const otherUser = await saveTestUserToDb();
      const equipment = await saveEquipmentListToDb(2);
      const characterId = await createCharacterOf(owner);
      await characterClient.setCharacterEquipment(owner.username, characterId, equipment.map((item) => item.id));

      const resp = await characterClient.getCharacterEquipment(otherUser.username, characterId);

      expect(resp.status).toBe(200);
      expect(
        resp.body.map((item: EquipmentResponseItem) => item.id).sort(),
      ).toStrictEqual(equipment.map((item) => item.id).sort());
    });

    it("when the character has equipment then should return the equipment without assignment ids", async () => {
      const user = await saveTestUserToDb();
      const potion = await saveEquipmentToDb();
      const characterId = await createCharacterOf(user);
      await characterClient.setCharacterEquipment(user.username, characterId, [potion.id, potion.id]);

      const resp = await characterClient.getCharacterEquipment(user.username, characterId);

      expect(resp.status).toBe(200);
      expect(resp.body.map((item: EquipmentResponseItem) => item.id)).toStrictEqual([potion.id, potion.id]);
      for (const item of resp.body) {
        expect(item).not.toHaveProperty("assignmentId");
      }
    });

    it("when the character does not exist then should return character not exists error", async () => {
      const user = await saveTestUserToDb();

      const resp = await characterClient.getCharacterEquipment(
        user.username,
        999999,
      );

      expect(resp.status).toBe(404);
      expect(resp.body.errorCode).toBe(ErrorMessages.CHARACTER_NOT_EXISTS);
    });

    it("when the id is not an integer then should return validation error", async () => {
      const user = await saveTestUserToDb();

      const resp = await characterClient.getCharacterEquipment(
        user.username,
        "nem-szam",
      );

      expect(resp.status).toBe(400);
    });
  });

  describe("DELETE /:id", () => {
    it("when a character is deleted then all of its equipment assignments are removed", async () => {
      const user = await saveTestUserToDb();
      const potion = await saveEquipmentToDb();
      const characterId = await createCharacterOf(user);
      await characterClient.setCharacterEquipment(user.username, characterId, [potion.id, potion.id, potion.id]);
      expect(
        await db.characterEquipment.count({ where: { characterId: characterId } }),
      ).toBe(3);

      await db.character.delete({ where: { id: characterId } });

      expect(
        await db.characterEquipment.count({ where: { characterId: characterId } }),
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

  async function createCharacterOf(user: { id: number; username: string }): Promise<number> {
    const resp = await characterClient.createCharacter(user.username, characterReq());
    expect(resp.status).toBe(200);
    return getCharacterIdOf(user.id);
  }

  async function getCharacterIdOf(userId: number): Promise<number> {
    const character = await db.character.findFirstOrThrow({ where: { userId } });
    return character.id;
  }

  async function setEquipmentOfNewCharacter(equipmentIds: number[]): Promise<Response> {
    const user = await saveTestUserToDb();
    const characterId = await createCharacterOf(user);
    return characterClient.setCharacterEquipment(user.username, characterId, equipmentIds);
  }

  async function getCharacterEquipment(
    username: string,
    characterId: number,
  ): Promise<EquipmentResponseItem[]> {
    const resp = await characterClient.getCharacterEquipment(username, characterId);
    expect(resp.status).toBe(200);
    return resp.body;
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
      expect(character).not.toHaveProperty("equipment");
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
    imageUrl: "/aragorn.jpg",
    ...overrides,
  };
}
