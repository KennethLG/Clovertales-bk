import PostService from "src/infrastructure/services/postService";
import { Post } from "src/domain/entities/post";
import { BadRequestError } from "src/presentation/utils/customError";

export default class GetPost {
  constructor(private postService: PostService) {}

  async execute(id: string): Promise<Post> {
    const post = await this.postService.get(id);
    if (!post) {
      throw new BadRequestError(`Post ${id} not found`);
    }

    return post;
  }
}
