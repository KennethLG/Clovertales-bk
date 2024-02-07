import { Post } from "src/domain/entities/post";
import { BadRequestError } from "src/presentation/utils/customError";
import { IPostRepository } from "src/domain/repositories/dbClient";

export default class GetPost {
  constructor(private readonly postRepository: IPostRepository) {}

  async execute(id: string): Promise<Post> {
    const post = await this.postRepository.get(id);
    if (!post) {
      throw new BadRequestError(`Post ${id} not found`);
    }

    return post;
  }
}
