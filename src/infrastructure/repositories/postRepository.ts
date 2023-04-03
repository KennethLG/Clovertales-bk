import { Post } from "src/domain/entities/post";
import { DbClient } from "src/domain/repositories/dbClient";
import PostRepository from "src/domain/repositories/postRepository";
import { DbClientWrapper } from "../common/dbClientWrapper";

export default class PostRepositoryImpl
  extends DbClientWrapper<Post>
  implements PostRepository
{
  constructor(db: DbClient<Post>) {
    super(db);
  }
}
