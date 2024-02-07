import PostService from "src/infrastructure/services/postService";

export default class GetPostsPaginated {
  constructor(private postService: PostService) {}

  async execute(limit: number, startKey?: { id: string; createdAt: string }) {
    const posts = await this.postService.getAllPaginated(limit, startKey);
    return posts;
  }
}
