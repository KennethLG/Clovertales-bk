import { Post } from "src/domain/entities/post";
import { PostRepository } from "src/domain/repositories/postRepository";
import { BadRequestError } from "src/presentation/utils/customError";

export default class GetPost {
  constructor(private readonly postRepository: PostRepository) {}

  async execute(id: string): Promise<Post> {
    const post = await this.postRepository.get(id);
    if (!post) {
      throw new BadRequestError(`Post ${id} not found`);
    }

    return post;
  }
}
