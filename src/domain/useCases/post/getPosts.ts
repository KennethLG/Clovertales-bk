import PostService from "src/app/services/postService";

export default class GetPosts {
  constructor(private postService: PostService) {}

  async execute() {
    const posts = await this.postService.getAll();
    return posts;
  }
}
