import PostService from "src/app/services/postService";
import { Post } from "src/domain/entities/post";
import { CreatePostDto } from "src/presentation/dto/postDto";

export default class CreatePost {
  constructor(private postService: PostService) {}

  async execute(input: CreatePostDto): Promise<Post> {
    const newPost = await this.postService.create(input);

    return newPost;
  }
}