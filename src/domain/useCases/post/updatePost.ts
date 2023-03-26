import PostService from "src/app/services/postService";
import { Post } from "src/domain/entities/post";
import { UpdatePostDto } from "src/presentation/dto/postDto";

export default class UpdatePost {
  constructor(private postService: PostService) {}

  async execute(post: UpdatePostDto): Promise<Post> {
    return await this.postService.update(post);
  }
}
