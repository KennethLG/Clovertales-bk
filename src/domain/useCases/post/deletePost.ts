import PostService from "src/app/services/postService";

export default class DeletePost {
  constructor(private postService: PostService) {}

  async execute(id: string): Promise<void> {
    return await this.postService.delete(id);
  }
}
