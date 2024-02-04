import PostService from "src/app/services/postService";
import CreatePost from "src/domain/useCases/post/createPost";
import DeletePost from "src/domain/useCases/post/deletePost";
import GetPost from "src/domain/useCases/post/getPost";
import GetPosts from "src/domain/useCases/post/getPosts";
import UpdatePost from "src/domain/useCases/post/updatePost";
import { DynamoDbPostClient } from "src/infrastructure/database/dynamodbPost";
import PostRepositoryImpl from "src/infrastructure/repositories/postRepository";
import { ResponseHandler } from "src/presentation/utils/responses";

export const postServiceFactory = () => {
  const dbClient = new DynamoDbPostClient();
  const postRepository = new PostRepositoryImpl(dbClient);
  const postService = new PostService(postRepository);
  return postService;
};

export const responseHandlerFactory = () => {
  return new ResponseHandler();
};

export const createPostUseCaseFactory = () => {
  const postService = postServiceFactory();
  const createPost = new CreatePost(postService);
  return createPost;
};

export const getPostUseCaseFactory = () => {
  const postService = postServiceFactory();
  const createPost = new GetPost(postService);
  return createPost;
};

export const getPostsUseCaseFactory = () => {
  const postService = postServiceFactory();
  const getPosts = new GetPosts(postService);
  return getPosts;
};

export const deletePostUseCaseFactory = () => {
  const postService = postServiceFactory();
  const createPost = new DeletePost(postService);
  return createPost;
};

export const updatePostUseCaseFactory = () => {
  const postService = postServiceFactory();
  const createPost = new UpdatePost(postService);
  return createPost;
};
