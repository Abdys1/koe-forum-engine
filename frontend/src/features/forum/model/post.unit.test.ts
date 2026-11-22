import { describe, expect, it } from "vitest";

import { addLocalPost } from "@/features/forum/model/post";
import { LocationPost } from "@/lib/api/posts/types";

const author = { id: "1", name: "Ryldan", imageUrl: "/ryldan.png" };
const other = { id: "2", name: "Mira", imageUrl: "/mira.png" };
const meta = { id: "new", locationId: "fogado", createdAt: "2026-11-22T12:00:00.000Z" };

const post = (id: string, character: typeof author, postCount: number): LocationPost => ({
    id,
    locationId: "fogado",
    gameTitle: "Egy pohár rum",
    content: "...",
    createdAt: "2026-11-01T12:00:00.000Z",
    character: { ...character, postCount }
});

describe("addLocalPost", () => {
    it("prepends the new post with the trimmed game title", () => {
        const [newPost] = addLocalPost([], { gameTitle: "  Vihar  ", content: "Szöveg" }, author, meta);

        expect(newPost).toEqual({ ...meta, gameTitle: "Vihar", content: "Szöveg", character: { ...author, postCount: 1 } });
    });

    it("increments the author's post count on every post of the author", () => {
        const posts = [post("a", author, 3), post("b", other, 7), post("c", author, 3)];

        const result = addLocalPost(posts, { gameTitle: "Vihar", content: "Szöveg" }, author, meta);

        expect(result.map(item => [item.id, item.character.postCount])).toEqual([["new", 4], ["a", 4], ["b", 7], ["c", 4]]);
    });
});
