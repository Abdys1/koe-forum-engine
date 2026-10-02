import DummyPostsClient from "@/lib/api/posts/posts.dummy-client";
import { PostsClient } from "@/lib/api/posts/types";

const postsClient: PostsClient = new DummyPostsClient();

export { postsClient };
