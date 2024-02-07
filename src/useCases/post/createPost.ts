import { Post } from "src/domain/entities/post";
import { CreatePostDto } from "src/presentation/dto/postDto";
import { IPostRepository } from "src/domain/repositories/dbClient";

export default class CreatePost {
  constructor(private readonly postRepository: IPostRepository) {}

  async execute(post: CreatePostDto): Promise<Post> {
    const newPost = Post.create(post);
    return await this.postRepository.create(newPost);
  }
}
