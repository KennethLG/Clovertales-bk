import { Post } from "src/domain/entities/post";
import { IPostRepository } from "src/domain/repositories/dbClient";

export default class PostService {
  constructor(private postRepository: IPostRepository) {}

  async create(post: Post): Promise<Post> {
    const result = await this.postRepository.create(post);
    return result;
  }

  async get(id: string): Promise<Post | undefined> {
    const result = await this.postRepository.get(id);
    return result;
  }

  async getAll() {
    const result = await this.postRepository.getAll();
    return result;
  }

  async getAllPaginated(
    limit: number,
    startKey?: { id: string; createdAt: string }
  ) {
    return await this.postRepository.getAllPaginated(limit, startKey);
  }

  async delete(id: string): Promise<void> {
    return await this.postRepository.delete(id);
  }

  async update(post: Post): Promise<Post | undefined> {
    const result = await this.postRepository.update(post.createdAt, {
      title: post.title,
      description: post.description,
      imageUrl: post.imageUrl,
      content: post.content,
      available: true,
      updatedAt: post.updatedAt,
    });
    return result;
  }
}
