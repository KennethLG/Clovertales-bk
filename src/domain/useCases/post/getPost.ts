import PostService from "src/app/services/postService";
import { Post } from "src/domain/entities/post";

export default class GetPost {
  constructor(private postService: PostService) {}

  async execute(id?: string): Promise<Post | Post[]> {
    if (id) {
      return await this.postService.get(id);
    }
    return await this.postService.getAll();
  }
}
