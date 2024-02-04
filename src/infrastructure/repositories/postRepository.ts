import { Post } from "src/domain/entities/post";
import { DbClient, IPostRepository } from "src/domain/repositories/dbClient";
import PostRepository from "src/domain/repositories/postRepository";
import { DbClientWrapper } from "../common/dbClientWrapper";

export default class PostRepositoryImpl
  extends DbClientWrapper<Post>
  implements IPostRepository
{
  constructor(protected dbClient: IPostRepository) {
    super(dbClient);
  }

  async getAllPaginated(
    limit?: number | undefined,
    startKey?: string | undefined
  ): Promise<{ items: Post[]; lastEvaluatedKey?: string | undefined }> {
    return await this.dbClient.getAllPaginated(limit, startKey);
  }
}
