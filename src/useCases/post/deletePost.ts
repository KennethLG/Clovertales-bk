import { PostRepository } from "src/domain/repositories/postRepository";
import { BadRequestError } from "src/presentation/utils/customError";

export default class DeletePost {
  constructor(private readonly postRepository: PostRepository) {}

  async execute(id: string): Promise<void> {
    const post = await this.postRepository.get(id);

    if (!post) {
      throw new BadRequestError(`Post ${id} not found`);
    }

    return await this.postRepository.delete(id);
  }
}
