import PostService from "src/app/services/postService";
import { Post } from "src/domain/entities/post";
import { CreatePostDto } from "src/presentation/dto/postDto";

export default class GetPost {
  constructor(private postService: PostService) {}

  async execute(id: string): Promise<Post> {
    const post = await this.postService.get(id);
    return post;
  }
}
