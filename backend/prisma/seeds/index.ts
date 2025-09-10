import { db } from "@src/prisma-client";
import { seedEquipment } from "prisma/seeds/equipment";

async function main() {
  await seedEquipment();
}

main()
  .then(async () => {
    console.log("Seeding completed successfully.");
    await db.$disconnect();
    process.exit(0);
  })
  .catch(async (error) => {
    console.error("Error during seeding:", error);
    await db.$disconnect();
    process.exit(1);
  });
