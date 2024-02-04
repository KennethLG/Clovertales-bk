import { Post } from "../entities/post";

export default interface PostRepository {
  create: (post: Post) => Promise<Post>;
  get: (id: string) => Promise<Post | undefined>;
  getAll(
    limit?: number,
    startKey?: string
  ): Promise<{ items: Post[]; lastEvaluatedKey?: string | undefined }>;
  delete: (id: string) => Promise<void>;
  update: (id: string, updateData: Partial<Post>) => Promise<Post | undefined>;
}
