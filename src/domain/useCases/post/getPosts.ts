import PostService from "src/app/services/postService";
import { Post } from "src/domain/entities/post";

export default class GetPosts {
  constructor(private postService: PostService) {}

  async execute(
    limit: number,
    startKey?: string
  ): Promise<{ items: Post[]; lastEvaluatedKey?: string | undefined }> {
    const posts = await this.postService.getAllPaginated(limit, startKey);
    return posts;
  }
}
