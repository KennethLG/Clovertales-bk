import { PostRepository } from "src/domain/repositories/postRepository";

export default class GetPostsPaginated {
  constructor(private readonly postRepository: PostRepository) {}

  async execute(limit: number, startKey?: { id: string; createdAt: string }) {
    const posts = await this.postRepository.getAllPaginated("POST", limit, startKey);
    return posts;
  }
}
