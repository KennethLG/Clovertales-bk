import { Post } from "../entities/post";
import { DbClient } from "./dbClient";

export abstract class PostRepository extends DbClient<Post> {
  abstract update(
    createdAt: string,
    updateData: Omit<Post, "id" | "createdAt">
  ): Promise<Post | undefined>;
}
