import PostService from "src/infrastructure/services/postService";
import CreatePost from "src/useCases/post/createPost";
import DeletePost from "src/useCases/post/deletePost";
import GetPost from "src/useCases/post/getPost";
import GetPosts from "src/useCases/post/getPosts";
import GetPostsPaginated from "src/useCases/post/getPostsPaginated";
import UpdatePost from "src/useCases/post/updatePost";
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

export const getPostsPaginatedUseCaseFactory = () => {
  const postService = postServiceFactory();
  const getPosts = new GetPostsPaginated(postService);
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
