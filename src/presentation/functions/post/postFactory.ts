import CreatePost from "src/useCases/post/createPost";
import DeletePost from "src/useCases/post/deletePost";
import GetPost from "src/useCases/post/getPost";
import GetPosts from "src/useCases/post/getPosts";
import GetPostsPaginated from "src/useCases/post/getPostsPaginated";
import UpdatePost from "src/useCases/post/updatePost";
import { DynamoDbPostClient } from "src/infrastructure/database/dynamodbPost";
import PostRepositoryImpl from "src/infrastructure/repositories/postRepository";
import { ResponseHandler } from "src/presentation/utils/responses";

const postRepositoryFactory = () => {
  const dbClient = new DynamoDbPostClient();
  return new PostRepositoryImpl(dbClient);
};

export const responseHandlerFactory = () => {
  return new ResponseHandler();
};

export const createPostUseCaseFactory = () => {
  const postRepository = postRepositoryFactory();
  const createPost = new CreatePost(postRepository);
  return createPost;
};

export const getPostUseCaseFactory = () => {
  const postRepository = postRepositoryFactory();
  const createPost = new GetPost(postRepository);
  return createPost;
};

export const getPostsUseCaseFactory = () => {
  const postRepository = postRepositoryFactory();
  const getPosts = new GetPosts(postRepository);
  return getPosts;
};

export const getPostsPaginatedUseCaseFactory = () => {
  const postRepository = postRepositoryFactory();
  const getPosts = new GetPostsPaginated(postRepository);
  return getPosts;
};

export const deletePostUseCaseFactory = () => {
  const postRepository = postRepositoryFactory();
  const createPost = new DeletePost(postRepository);
  return createPost;
};

export const updatePostUseCaseFactory = () => {
  const postRepository = postRepositoryFactory();
  const createPost = new UpdatePost(postRepository);
  return createPost;
};
