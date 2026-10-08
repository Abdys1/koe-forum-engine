-- AlterTable
ALTER TABLE "Equipment" ADD COLUMN     "slotCost" INTEGER;

-- CreateTable
CREATE TABLE "Slot" (
    "id" SERIAL NOT NULL,
    "label" VARCHAR(128) NOT NULL,
    "maxCapacity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Slot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Slot_label_key" ON "Slot"("label");

-- AlterTable
ALTER TABLE "EquipmentType" ADD COLUMN     "slotId" INTEGER;

-- AddForeignKey
ALTER TABLE "EquipmentType" ADD CONSTRAINT "EquipmentType_slotId_fkey" FOREIGN KEY ("slotId") REFERENCES "Slot"("id") ON DELETE SET NULL ON UPDATE CASCADE;
