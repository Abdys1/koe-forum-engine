import { describe, expect, it } from "vitest";

import { addLocalPost, canSubmitNewPost, isPostContentLengthValid, POST_CONTENT_MAX_LENGTH, POST_CONTENT_MIN_LENGTH } from "@/features/forum/model/post";
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

describe("isPostContentLengthValid", () => {
    it("accepts content between the minimum and the maximum length, inclusive", () => {
        expect(isPostContentLengthValid("a".repeat(POST_CONTENT_MIN_LENGTH))).toBe(true);
        expect(isPostContentLengthValid("a".repeat(POST_CONTENT_MAX_LENGTH))).toBe(true);
    });

    it("rejects too short and too long content", () => {
        expect(isPostContentLengthValid("a".repeat(POST_CONTENT_MIN_LENGTH - 1))).toBe(false);
        expect(isPostContentLengthValid("a".repeat(POST_CONTENT_MAX_LENGTH + 1))).toBe(false);
    });
});

describe("canSubmitNewPost", () => {
    const content = "a".repeat(POST_CONTENT_MIN_LENGTH);

    it("allows submitting a post with a game title and valid content", () => {
        expect(canSubmitNewPost({ gameTitle: "Vihar", content })).toBe(true);
    });

    it("requires a non-blank game title", () => {
        expect(canSubmitNewPost({ gameTitle: "   ", content })).toBe(false);
    });

    it("requires valid content", () => {
        expect(canSubmitNewPost({ gameTitle: "Vihar", content: "rövid" })).toBe(false);
    });
});
