-- AlterTable
ALTER TABLE "EquipmentType" ADD COLUMN     "icon" VARCHAR(32),
ADD COLUMN     "parentId" INTEGER,
ADD COLUMN     "sortOrder" INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "EquipmentType" ADD CONSTRAINT "EquipmentType_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "EquipmentType"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
