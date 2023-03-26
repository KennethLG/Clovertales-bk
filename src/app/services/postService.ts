import { Post } from "src/domain/entities/post";
import PostRepository from "src/domain/repositories/postRepository";
import { CreatePostDto, UpdatePostDto } from "src/presentation/dto/postDto";
import { NotFoundError, BadRequestError } from "src/presentation/utils/customError";
import { v4 as uuidv4 } from "uuid";

export default class PostService {
  constructor(private postRepository: PostRepository) {}

  async create(post: CreatePostDto): Promise<Post> {
    const newPost = new Post();
    newPost.createdAt = new Date().toISOString();
    newPost.updatedAt = new Date().toISOString();
    newPost.id = uuidv4();
    newPost.content = post.content;
    newPost.description = post.description;
    newPost.title = post.title;

    const result = await this.postRepository.create(newPost);
    return result;
  }

  async get(id: string): Promise<Post> {
    const result = await this.postRepository.get(id);

    if (!result) {
      throw new NotFoundError(`Post ${id} not found`);
    }

    return result;
  }

  async getAll(): Promise<Post[]> {
    return await this.postRepository.getAll();
  }

  async delete(id: string): Promise<void> {
    return await this.postRepository.delete(id);
  }

  async update(post: UpdatePostDto): Promise<Post> {

    const newPost = new Post();
    newPost.updatedAt = new Date().toISOString();
    newPost.content = post.content;
    newPost.title = post.title;
    newPost.description = post.description;
    newPost.imageUrl = post.imageUrl;

    const result = await this.postRepository.update(post.id, newPost);

    if (!result) {
      throw new BadRequestError("An error occurred while updating");
    }

    return result;
  }
}
