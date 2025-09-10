-- AlterTable
ALTER TABLE "Character" DROP COLUMN "bodyArmor",
DROP COLUMN "helmet",
DROP COLUMN "primaryWeapon",
DROP COLUMN "secondaryArmor",
DROP COLUMN "secondaryWeapon",
DROP COLUMN "shield",
ADD COLUMN     "bodyArmorId" INTEGER,
ADD COLUMN     "helmetId" INTEGER,
ADD COLUMN     "primaryWeaponId" INTEGER,
ADD COLUMN     "secondaryArmorId" INTEGER,
ADD COLUMN     "secondaryWeaponId" INTEGER,
ADD COLUMN     "shieldId" INTEGER;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_primaryWeaponId_fkey" FOREIGN KEY ("primaryWeaponId") REFERENCES "Equipment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_secondaryWeaponId_fkey" FOREIGN KEY ("secondaryWeaponId") REFERENCES "Equipment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_helmetId_fkey" FOREIGN KEY ("helmetId") REFERENCES "Equipment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_bodyArmorId_fkey" FOREIGN KEY ("bodyArmorId") REFERENCES "Equipment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_secondaryArmorId_fkey" FOREIGN KEY ("secondaryArmorId") REFERENCES "Equipment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_shieldId_fkey" FOREIGN KEY ("shieldId") REFERENCES "Equipment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
