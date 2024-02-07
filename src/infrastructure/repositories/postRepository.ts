import { Post } from "src/domain/entities/post";
import { IPostRepository } from "src/domain/repositories/dbClient";
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
    startKey?: { id: string; createdAt: string } | undefined
  ): Promise<{
    items: Post[];
    lastEvaluatedKey?: { id: string; createdAt: string } | undefined;
  }> {
    return await this.dbClient.getAllPaginated(limit, startKey);
  }
}
