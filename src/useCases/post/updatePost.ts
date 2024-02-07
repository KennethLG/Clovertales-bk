import { Post, PostUdpateAttributes } from "src/domain/entities/post";
import { BadRequestError } from "src/presentation/utils/customError";
import { IPostRepository } from "src/domain/repositories/dbClient";

export default class UpdatePost {
  constructor(private readonly postRepository: IPostRepository) {}

  async execute(id: string, post: PostUdpateAttributes): Promise<Post> {
    const existingPost = await this.postRepository.get(id);

    if (!existingPost) {
      throw new BadRequestError(`Post ${id} not found`);
    }

    const updatedPost = Post.update(existingPost, {
      content: post.content,
      description: post.description,
      title: post.title,
      imageUrl: post.imageUrl,
      available: true,
    });

    const result = await this.postRepository.update(id, updatedPost);
    if (!result) {
      throw new BadRequestError("An error occurred while updating");
    }
    return result;
  }
}
