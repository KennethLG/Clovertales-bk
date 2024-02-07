import { Post, PostCreateAttributes } from "src/domain/entities/post";
import { IPostRepository } from "src/domain/repositories/dbClient";

export default class CreatePost {
  constructor(private readonly postRepository: IPostRepository) {}

  async execute(post: PostCreateAttributes): Promise<Post> {
    const newPost = Post.create(post);
    return await this.postRepository.create(newPost);
  }
}
