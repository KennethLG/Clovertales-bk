import { IPostRepository } from "src/domain/repositories/dbClient";

export default class GetPostsPaginated {
  constructor(private readonly postRepository: IPostRepository) {}

  async execute(limit: number, startKey?: { id: string; createdAt: string }) {
    const posts = await this.postRepository.getAllPaginated(limit, startKey);
    return posts;
  }
}
