import PostService from "src/app/services/postService";

export default class GetPosts {
  constructor(private postService: PostService) {}

  async execute(
    limit: number,
    startKey?: { id: string; createdAt: string } | undefined
  ) {
    const posts = await this.postService.getAllPaginated(limit, startKey);
    return posts;
  }
}
