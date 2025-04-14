import { PostRepository } from "src/domain/repositories/postRepository";
import { BadRequestError } from "src/presentation/utils/customError";

export default class DeletePost {
  constructor(private readonly postRepository: PostRepository) {}

  async execute(id: string, createdAt: string): Promise<void> {
    const post = await this.postRepository.get(createdAt);

    if (!post || post.id !== id) {
      throw new BadRequestError(`Post ${id} not found`);
    }

    return await this.postRepository.deleteComposite(id, createdAt);
  }
}
