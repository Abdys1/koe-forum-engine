/*
  Warnings:

  - Changed the type of `type` on the `Equipment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "EquipmentType" AS ENUM ('PRIMARY_WEAPON', 'SECONDARY_WEAPON', 'HELMET', 'BODY_ARMOR', 'SECONDARY_ARMOR', 'SHIELD');

-- AlterTable
ALTER TABLE "Equipment" DROP COLUMN "type",
ADD COLUMN     "type" "EquipmentType" NOT NULL;
