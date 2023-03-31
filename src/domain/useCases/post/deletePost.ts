import PostService from "src/app/services/postService";
import { BadRequestError } from "src/presentation/utils/customError";

export default class DeletePost {
  constructor(private postService: PostService) {}

  async execute(id: string): Promise<void> {

    const post = await this.postService.get(id);

    if (!post) {
      throw new BadRequestError(`Post ${id} not found`);
    }

    return await this.postService.delete(id);
  }
}
