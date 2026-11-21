-- AlterTable
ALTER TABLE "ForumUser" ADD COLUMN     "activeCharacterId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "ForumUser_activeCharacterId_key" ON "ForumUser"("activeCharacterId");

-- AddForeignKey
ALTER TABLE "ForumUser" ADD CONSTRAINT "ForumUser_activeCharacterId_fkey" FOREIGN KEY ("activeCharacterId") REFERENCES "Character"("id") ON DELETE SET NULL ON UPDATE CASCADE;

