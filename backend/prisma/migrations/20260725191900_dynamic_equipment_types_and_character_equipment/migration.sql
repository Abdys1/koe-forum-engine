-- 1. Az enum oszlop szöveggé alakítása, hogy az enum típus felszabaduljon.
ALTER TABLE "Equipment" ALTER COLUMN "type" TYPE TEXT USING "type"::TEXT;

-- 2. A felszabadult enum eldobása (a nevére a táblának van szüksége).
DROP TYPE "EquipmentType";

-- 3. Az EquipmentType tábla.
CREATE TABLE "EquipmentType" (
    "id" SERIAL NOT NULL,
    "label" VARCHAR(128) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EquipmentType_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "EquipmentType_label_key" ON "EquipmentType"("label");

ALTER TABLE "Equipment" ADD COLUMN "typeId" INTEGER;

ALTER TABLE "Equipment" ALTER COLUMN "typeId" SET NOT NULL;

-- 4. A régi `type` oszlop és a rá épülő unique constraint leváltása.
DROP INDEX "Equipment_name_type_key";

ALTER TABLE "Equipment" DROP COLUMN "type";

CREATE UNIQUE INDEX "Equipment_name_typeId_key" ON "Equipment"("name", "typeId");

ALTER TABLE "Equipment" ADD CONSTRAINT "Equipment_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "EquipmentType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- 5. A CharacterEquipment join tábla.
CREATE TABLE "CharacterEquipment" (
    "id" SERIAL NOT NULL,
    "characterId" INTEGER NOT NULL,
    "equipmentId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CharacterEquipment_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "CharacterEquipment_characterId_idx" ON "CharacterEquipment"("characterId");

CREATE INDEX "CharacterEquipment_equipmentId_idx" ON "CharacterEquipment"("equipmentId");

-- 6. A 6 slot oszlop eldobása; a DROP COLUMN a rájuk mutató FK-kat is elviszi.
ALTER TABLE "Character" DROP COLUMN "primaryWeaponId",
DROP COLUMN "secondaryWeaponId",
DROP COLUMN "helmetId",
DROP COLUMN "bodyArmorId",
DROP COLUMN "secondaryArmorId",
DROP COLUMN "shieldId";

-- 7. A join tábla idegen kulcsai. A characterId CASCADE: karakter törlésekor a
--     hozzárendelések is törlődnek, de az Equipment rekord megmarad.
ALTER TABLE "CharacterEquipment" ADD CONSTRAINT "CharacterEquipment_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "CharacterEquipment" ADD CONSTRAINT "CharacterEquipment_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
