import PostService from "src/infrastructure/services/postService";
import { Post } from "src/domain/entities/post";
import { UpdatePostDto } from "src/presentation/dto/postDto";
import { BadRequestError } from "src/presentation/utils/customError";

export default class UpdatePost {
  constructor(private postService: PostService) {}

  async execute(post: UpdatePostDto): Promise<Post> {
    const existingPost = await this.postService.get(post.id);

    if (!existingPost) {
      throw new BadRequestError(`Post ${post.id} not found`);
    }

    const updatedPost = Post.update({
      createdAt: existingPost.createdAt,
      id: existingPost.id,
      content: post.content,
      description: post.description,
      title: post.title,
      imageUrl: post.imageUrl,
    });

    const result = await this.postService.update(updatedPost);
    if (!result) {
      throw new BadRequestError("An error occurred while updating");
    }
    return result;
  }
}
