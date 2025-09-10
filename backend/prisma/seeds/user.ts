import { db } from "@src/prisma-client";
import argon2 from "argon2";

const users = [
	{
		username: "testuser1",
		password: "alma",
	},
	{
		username: "testuser2",
		password: "alma",
	},
	{
		username: "testuser3",
		password: "alma",
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