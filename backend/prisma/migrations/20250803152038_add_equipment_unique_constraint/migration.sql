/*
  Warnings:

  - A unique constraint covering the columns `[name,type]` on the table `Equipment` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Equipment_name_type_key" ON "Equipment"("name", "type");
