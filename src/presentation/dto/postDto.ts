import { Post } from "src/domain/entities/post";

export type CreatePostDto = Pick<
  Post,
  "title" | "description" | "content" | "imageUrl"
>;


export type UpdatePostDto = Pick<
  Post,
  "id" | "title" | "description" | "content" | "imageUrl"
>;