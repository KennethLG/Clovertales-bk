import PostService from "src/app/services/post/postService";
import { Post } from "src/domain/entities/post";
import CreatePost from "src/domain/useCases/post/createPost";
import { DynamoDbClient } from "src/infrastructure/database/dynamodb";
import PostRepositoryImpl from "src/infrastructure/repositories/postRepository";

export function createPostDependencies() {
  const dbClient = new DynamoDbClient<Post>("PostsTable");
  const postRepository = new PostRepositoryImpl(dbClient);
  const postService = new PostService(postRepository);
  const createPost = new CreatePost(postService);

  return { postRepository, postService, createPost };
}
