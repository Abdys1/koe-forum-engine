import { db } from "@src/prisma-client";
import argon2 from "argon2";

const users = [
	{
		username: "user1",
		password: "Alma1234567",
	},
	{
		username: "user2",
		password: "Alma1234567",
	},
	{
		username: "user3",
		password: "Alma1234567",
	},
];

export async function seedUsers() {
	for (const user of users) {
		const hashedPassword = await argon2.hash(user.password);
		await db.forumUser.upsert({
			where: { username: user.username },
			update: {},
			create: {
				username: user.username,
				password: hashedPassword,
			},
		});
	}
}