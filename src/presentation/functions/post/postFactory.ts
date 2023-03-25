import PostService from "src/app/services/postService";
import { Post } from "src/domain/entities/post";
import CreatePost from "src/domain/useCases/post/createPost";
import GetPost from "src/domain/useCases/post/getPost";
import { DynamoDbClient } from "src/infrastructure/database/dynamodb";
import PostRepositoryImpl from "src/infrastructure/repositories/postRepository";
import { ResponseHandler } from "src/presentation/utils/responses";

export const postServiceFactory = () => {
  const dbClient = new DynamoDbClient<Post>("PostsTable");
  const postRepository = new PostRepositoryImpl(dbClient);
  const postService = new PostService(postRepository);
  return postService;
}

export const responseHandlerFactory = () => {
  return new ResponseHandler();
}

export const createPostUseCaseFactory = () => {
  const postService = postServiceFactory();
  const createPost = new CreatePost(postService);
  return createPost;
}

export const getPostUseCaseFactory = () => {
  const postService = postServiceFactory();
  const createPost = new GetPost(postService);
  return createPost;
}