import { Post, PostUdpateAttributes } from "src/domain/entities/post";
import { PostRepository } from "src/domain/repositories/postRepository";
import { BadRequestError } from "src/presentation/utils/customError";

export default class UpdatePost {
  constructor(private readonly postRepository: PostRepository) {}

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
      available: post.available,
    });

    const result = await this.postRepository.update(id, {
      updatedAt: updatedPost.updatedAt,
      available: updatedPost.available,
      content: updatedPost.content,
      description: updatedPost.description,
      imageUrl: updatedPost.imageUrl,
      title: updatedPost.title,
    });
    if (!result) {
      throw new BadRequestError("An error occurred while updating");
    }
    return result;
  }
}
