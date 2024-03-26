import { Post, PostCreateAttributes } from "src/domain/entities/post";
import { PostRepository } from "src/domain/repositories/postRepository";

export default class CreatePost {
  constructor(private readonly postRepository: PostRepository) {}

  async execute(post: PostCreateAttributes): Promise<Post> {
    const newPost = Post.create(post);
    return await this.postRepository.create(newPost);
  }
}
