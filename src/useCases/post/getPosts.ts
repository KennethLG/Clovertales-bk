import { PostRepository } from "src/domain/repositories/postRepository";

export default class GetPosts {
  constructor(private readonly postRepository: PostRepository) {}

  async execute() {
    const posts = await this.postRepository.getAll();
    return posts;
  }
}
