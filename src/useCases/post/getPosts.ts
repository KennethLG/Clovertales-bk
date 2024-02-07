import { IPostRepository } from "src/domain/repositories/dbClient";

export default class GetPosts {
  constructor(private readonly postRepository: IPostRepository) {}

  async execute() {
    const posts = await this.postRepository.getAll();
    return posts;
  }
}
