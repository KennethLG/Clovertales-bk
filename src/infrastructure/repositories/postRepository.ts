import { Post } from "src/domain/entities/post";
import DbClient from "src/domain/repositories/dbClient";
import PostRepository from "src/domain/repositories/postRepository";

export default class PostRepositoryImpl implements PostRepository {
  private dbClient: DbClient<Post>;
  constructor(db: DbClient<Post>) {
    this.dbClient = db;
  }

  async create(post: Post) {
    const result = await this.dbClient.create(post);
    return result;
  }

  async get(id: string) {
    const result = await this.dbClient.get(id);
    return result;
  }
}
