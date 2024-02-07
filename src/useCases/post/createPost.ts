import PostService from "src/infrastructure/services/postService";
import { Post } from "src/domain/entities/post";
import { CreatePostDto } from "src/presentation/dto/postDto";

export default class CreatePost {
  constructor(private postService: PostService) {}

  async execute(post: CreatePostDto): Promise<Post> {
    const newPost = Post.create(post);
    return await this.postService.create(newPost);
  }
}
