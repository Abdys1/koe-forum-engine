-- CreateTable
CREATE TABLE "ForumUser" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "ForumUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Character" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" VARCHAR(64) NOT NULL,
    "sex" SMALLINT NOT NULL,
    "race" VARCHAR(64) NOT NULL,
    "primaryWeapon" VARCHAR(255),
    "secondaryWeapon" VARCHAR(255),
    "helmet" VARCHAR(255),
    "bodyArmor" VARCHAR(255),
    "secondaryArmor" VARCHAR(255),
    "shield" VARCHAR(255),
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ForumUser_username_key" ON "ForumUser"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Character_name_key" ON "Character"("name");

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_userId_fkey" FOREIGN KEY ("userId") REFERENCES "ForumUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
