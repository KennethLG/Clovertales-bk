import { Post } from "src/domain/entities/post";
import { DbClientWrapper } from "../common/dbClientWrapper";
import { PostRepository } from "src/domain/repositories/postRepository";

export default class PostRepositoryImpl
  extends DbClientWrapper<Post>
  implements PostRepository
{
  constructor(protected dbClient: PostRepository) {
    super(dbClient);
  }

}
