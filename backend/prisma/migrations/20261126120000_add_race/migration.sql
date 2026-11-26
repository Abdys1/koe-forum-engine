/*
  Warnings:

  - You are about to drop the column `race` on the `Character` table. All the data in the column will be lost.
  - Added the required column `raceId` to the `Character` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Character" DROP COLUMN "race",
ADD COLUMN     "raceId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Race" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(128) NOT NULL,
    "teaser" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "buttonImageUrl" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Race_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Race_name_key" ON "Race"("name");

-- CreateIndex
CREATE INDEX "Character_raceId_idx" ON "Character"("raceId");

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_raceId_fkey" FOREIGN KEY ("raceId") REFERENCES "Race"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
