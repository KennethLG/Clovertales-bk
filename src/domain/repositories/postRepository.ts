import { Post } from "../entities/post";

export default interface PostRepository {

  create: (post: Post) => Promise<Post>;
  get: (id: string) => Promise<Post | undefined>;
  getAll: () => Promise<Post[]>;
  delete: (id: string) => Promise<void>;
}