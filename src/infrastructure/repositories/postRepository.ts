import { Post } from "src/domain/entities/post";
import { DbClient } from "src/domain/repositories/dbClient";
import PostRepository from "src/domain/repositories/postRepository";

export default class PostRepositoryImpl implements PostRepository {
  private dbClient: DbClient<Post>;
  constructor(db: DbClient<Post>) {
    this.dbClient = db;
  }
  async delete(id: string) {
    await this.dbClient.delete(id);
  }

  async create(post: Post) {
    const result = await this.dbClient.create(post);
    return result;
  }

  async get(id: string) {
    const result = await this.dbClient.get(id);
    return result;
  }

  async getAll() {
    const result = await this.dbClient.getAll();
    return result;
  }

  async update(
    id: string,
    updateData: Partial<Post>
  ): Promise<Post | undefined> {
    return this.dbClient.update(id, updateData);
  }
}
