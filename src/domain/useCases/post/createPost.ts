import PostService from "src/app/services/post/postService";
import { Post } from "src/domain/entities/post";
import { CreatePostDto } from "src/presentation/functions/post/createPostDto";

export default class CreatePost {
  constructor(private postService: PostService) {}

  async execute(input: CreatePostDto): Promise<Post> {
    const newPost = await this.postService.createPost(input);

    return newPost;
  }
}