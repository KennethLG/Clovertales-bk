import { Post } from "src/domain/entities/post";
import { UpdatePostDto } from "src/presentation/dto/postDto";
import { BadRequestError } from "src/presentation/utils/customError";
import { IPostRepository } from "src/domain/repositories/dbClient";

export default class UpdatePost {
  constructor(private readonly postRepository: IPostRepository) {}

  async execute(post: UpdatePostDto): Promise<Post> {
    const existingPost = await this.postRepository.get(post.id);

    if (!existingPost) {
      throw new BadRequestError(`Post ${post.id} not found`);
    }

    const updatedPost = Post.update(existingPost, {
      content: post.content,
      description: post.description,
      title: post.title,
      imageUrl: post.imageUrl,
      available: true,
    });

    const result = await this.postRepository.update(post.id, updatedPost);
    if (!result) {
      throw new BadRequestError("An error occurred while updating");
    }
    return result;
  }
}
